import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFeedsByCategory } from "@/lib/feeds";
import { getSnapshot } from "@/lib/rss";
import { SITE_URL, utm } from "@/lib/site";
import { CATEGORIES, Category } from "@/types/feed";
import { PageBand } from "@/components/PageBand";
import { HeadlineList } from "@/components/HeadlineList";
import { CopyButton } from "@/components/FeedActions";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.value }));
}

function find(value: string) {
  return CATEGORIES.find((c) => c.value === value);
}

export async function generateMetadata({ params }: PageProps<"/category/[category]">): Promise<Metadata> {
  const desk = find((await params).category);
  if (!desk) return {};
  return {
    title: `${desk.title}: the best ${desk.label.toLowerCase()} RSS feeds`,
    description: `${desk.blurb} Every ${desk.label.toLowerCase()} RSS feed in the directory, with its latest headlines and URL.`,
    alternates: { canonical: `/category/${desk.value}` },
    openGraph: { url: `/category/${desk.value}`, title: desk.title },
  };
}

// Where each desk points for live prices on the API side.
const API_LINK: Record<Category, { label: string; url: string }> = {
  crypto: { label: "Live BTCUSD and crypto prices", url: "https://realmarketapi.com" },
  forex: { label: "Live forex and XAUUSD prices", url: "https://realmarketapi.com" },
  stocks: { label: "Position size and risk calculators", url: "https://calculator.realmarketapi.com" },
  macro: { label: "How rates move currencies, explained", url: "https://learn.realmarketapi.com" },
};

export default async function CategoryPage({ params }: PageProps<"/category/[category]">) {
  const desk = find((await params).category);
  if (!desk) notFound();

  const feeds = getFeedsByCategory(desk.value);
  const snaps = await Promise.all(feeds.map(getSnapshot));
  const others = CATEGORIES.filter((c) => c.value !== desk.value);
  const api = API_LINK[desk.value];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: desk.title,
          url: `${SITE_URL}/category/${desk.value}`,
          description: desk.blurb,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: feeds.map((f, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/feeds/${f.slug}`,
              name: f.name,
            })),
          },
        }}
      />

      <PageBand
        title={desk.title}
        field={desk.field}
        crumbs={[{ href: `/category/${desk.value}`, label: desk.label }]}
        standfirst={
          <>
            {desk.blurb} {feeds.length} feed{feeds.length === 1 ? "" : "s"} on this desk.
          </>
        }
      >
        <nav aria-label="Other desks" className="flex flex-wrap gap-2 text-[length:var(--step-small)] font-semibold">
          {others.map((c) => (
            <Link key={c.value} href={`/category/${c.value}`} className="press inline-flex min-h-11 items-center bg-[#111]/10 px-4">
              {c.label}
            </Link>
          ))}
        </nav>
      </PageBand>

      {feeds.map((f, i) => (
        <section
          key={f.slug}
          aria-labelledby={`feed-${f.slug}`}
          className={`px-[var(--margin)] py-16 md:py-24 ${i % 2 === 1 ? "bg-surface" : ""}`}
        >
          <div className="grid gap-8 md:grid-cols-[var(--axis)_1fr]">
            <div className="md:pr-10">
              <h2 id={`feed-${f.slug}`} className="text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-extrabold leading-none tracking-[-0.045em]">
                <Link href={`/feeds/${f.slug}`} className="hover:underline">{f.name}</Link>
              </h2>
              <p className="mt-4 max-w-[36ch]">{f.description}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-[length:var(--step-small)]">
                <CopyButton url={f.url} className="min-h-11 bg-accent px-4 font-semibold text-accent-ink" />
                <Link href={`/feeds/${f.slug}`} className="press inline-flex min-h-11 items-center bg-ink px-4 font-semibold text-bg">
                  Feed page
                </Link>
              </div>
            </div>
            {snaps[i].ok ? (
              <HeadlineList items={snaps[i].items.slice(0, 5)} showSource={false} groupEvery={5} />
            ) : (
              <p className="self-center text-muted">
                No stories came through from this feed at the last update. It may only open in a reader app.
              </p>
            )}
          </div>
        </section>
      ))}

      <section aria-labelledby="api-title" className="bg-field-4 px-[var(--margin)] py-20 text-field-4-ink md:py-28">
        <div className="grid gap-8 md:grid-cols-[var(--axis)_1fr]">
          <h2 id="api-title" className="head">Headlines first, then the chart</h2>
          <div>
            <p className="max-w-[44ch] text-[length:var(--step-lead)] leading-snug">
              RealMarketFeed is free and stays free. When a story needs a price behind it, the same team runs a market data API
              and a few tools.
            </p>
            <a
              href={utm(api.url, `category_${desk.value}`)}
              className="press mt-8 inline-flex min-h-12 items-center bg-accent px-6 font-semibold text-accent-ink"
            >
              {api.label}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
