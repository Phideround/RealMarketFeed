import { BUILT_AT, getWire } from "@/lib/rss";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** One RSS feed of the newest headlines across every source in the directory. */
export async function GET() {
  const items = await getWire(5, 80);
  const body = items
    .map(
      (h) => `    <item>
      <title>${esc(h.title)}</title>
      <link>${esc(h.link)}</link>
      <guid isPermaLink="true">${esc(h.link)}</guid>
      <source url="${esc(`${SITE_URL}/feeds/${h.feedSlug}`)}">${esc(h.feed)}</source>
      <category>${h.category}</category>${h.date ? `\n      <pubDate>${new Date(h.date).toUTCString()}</pubDate>` : ""}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RealMarketFeed: latest market headlines</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>The newest stories from every crypto, forex, stocks and macro feed in the RealMarketFeed directory.</description>
    <language>en</language>
    <lastBuildDate>${new Date(BUILT_AT).toUTCString()}</lastBuildDate>
${body}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
