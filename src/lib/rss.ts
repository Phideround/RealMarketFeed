import { XMLParser } from "fast-xml-parser";
import { Feed, FeedSnapshot, Headline } from "@/types/feed";
import { getFeeds } from "./feeds";

// Headlines are read once at build time; the site stays a static export.
const TIMEOUT_MS = 10_000;
const MAX_ITEMS = 12;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
  textNodeName: "#text",
});

type Node = Record<string, unknown>;

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function text(value: unknown): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object" && "#text" in (value as Node)) return text((value as Node)["#text"]);
  return "";
}

function decode(value: string): string {
  return value
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function atomLink(link: unknown): string {
  const links = asArray(link as Node | Node[]);
  const alt = links.find((l) => !l["@rel"] || l["@rel"] === "alternate") ?? links[0];
  return alt ? text(alt["@href"]) : "";
}

function isoDate(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export function parseFeed(xml: string, feed: Feed): Headline[] {
  const doc = parser.parse(xml) as Node;
  const rss = doc.rss as Node | undefined;
  const rdf = doc["rdf:RDF"] as Node | undefined;
  const atom = doc.feed as Node | undefined;

  let raw: { title: string; link: string; date: string }[] = [];
  if (rss || rdf) {
    const channel = (rss?.channel ?? rdf?.channel ?? {}) as Node;
    const items = asArray((channel.item ?? rdf?.item) as Node | Node[]);
    raw = items.map((i) => ({
      title: text(i.title),
      link: text(i.link) || text(i.guid),
      date: text(i.pubDate) || text(i["dc:date"]),
    }));
  } else if (atom) {
    raw = asArray(atom.entry as Node | Node[]).map((e) => ({
      title: text(e.title),
      link: atomLink(e.link),
      date: text(e.updated) || text(e.published),
    }));
  }

  return raw
    .map((r) => ({
      title: decode(r.title),
      link: r.link.trim(),
      date: isoDate(r.date.trim()),
      feed: feed.name,
      feedSlug: feed.slug,
      category: feed.category,
    }))
    .filter((h) => h.title && h.link.startsWith("http"))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .slice(0, MAX_ITEMS);
}

const cache = new Map<string, Promise<FeedSnapshot>>();

export function getSnapshot(feed: Feed): Promise<FeedSnapshot> {
  let pending = cache.get(feed.url);
  if (!pending) {
    pending = load(feed);
    cache.set(feed.url, pending);
    // Forget failures so a slow first try (common in dev) doesn't stick.
    pending.then((s) => !s.ok && cache.delete(feed.url));
  }
  return pending;
}

async function load(feed: Feed): Promise<FeedSnapshot> {
  try {
    const res = await fetch(feed.url, {
      cache: "force-cache",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; RealMarketFeed/1.0; +https://rss.realmarketapi.com)",
        accept: "application/rss+xml, application/atom+xml, application/xml;q=0.9, */*;q=0.8",
      },
    });
    if (!res.ok) return { ok: false, items: [] };
    const items = parseFeed(await res.text(), feed);
    return { ok: items.length > 0, items };
  } catch (err) {
    console.warn(`[rss] ${feed.name}: ${(err as Error).message}`); // shows which feeds the build could not read
    return { ok: false, items: [] };
  }
}

export async function getAllSnapshots(): Promise<Map<string, FeedSnapshot>> {
  const feeds = getFeeds();
  const snaps = await Promise.all(feeds.map(getSnapshot));
  return new Map(feeds.map((f, i) => [f.slug, snaps[i]]));
}

/** The newest headlines across every feed, a few per feed so no single source floods the wire. */
export async function getWire(perFeed = 4, limit = 60): Promise<Headline[]> {
  const snaps = await getAllSnapshots();
  return [...snaps.values()]
    .flatMap((s) => s.items.slice(0, perFeed))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .slice(0, limit);
}

export const BUILT_AT = new Date().toISOString();
