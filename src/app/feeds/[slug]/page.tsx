import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFeedBySlug, getFeeds, getFeedsByCategory } from "@/lib/feeds";
import { BUILT_AT, getSnapshot } from "@/lib/rss";
import { formatLong, hostOf } from "@/lib/format";
import { EDIT_FEEDS_URL, SITE_URL, reportFeedUrl } from "@/lib/site";
import { categoryInfo } from "@/types/feed";
import { PageBand } from "@/components/PageBand";
import { FeedActions } from "@/components/FeedActions";
import { HeadlineList } from "@/components/HeadlineList";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return getFeeds().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/feeds/[slug]">): Promise<Metadata> {
  const feed = getFeedBySlug((await params).slug);
  if (!feed) return {};
  const desk = categoryInfo(feed.category);
  return {
    title: `${feed.name} RSS feed`,
    description: `${feed.name} RSS feed URL for ${desk.label.toLowerCase()} traders, its latest headlines, and one-click subscribe links. ${feed.description}`,
    alternates: { canonical: `/feeds/${feed.slug}` },
    openGraph: { url: `/feeds/${feed.slug}`, title: `${feed.name} RSS feed` },
  };
}

export default async function FeedPage({ params }: PageProps<"/feeds/[slug]">) {
  const feed = getFeedBySlug((await params).slug);
  if (!feed) notFound();

  const desk = categoryInfo(feed.category);
  const snap = await getSnapshot(feed);
  const siblings = getFeedsByCategory(feed.category).filter((f) => f.slug !== feed.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: desk.label, item: `${SITE_URL}/category/${desk.value}` },
            { "@type": "ListItem", position: 3, name: feed.name, item: `${SITE_URL}/feeds/${feed.slug}` },
          ],
        }}
      />

      <PageBand
        title={feed.name}
        field={desk.field}
        crumbs={[
          { href: `/category/${desk.value}`, label: desk.label },
          { href: `/feeds/${feed.slug}`, label: feed.name },
        ]}
        standfirst={feed.description}
      >
        <p className="mb-5 break-all text-[length:var(--step-small)]">
          <span className="font-semibold">Feed URL </span>
          {feed.url}
        </p>
        <FeedActions url={feed.url} />
      </PageBand>

      <section aria-labelledby="latest-title" className="px-[var(--margin)] py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[var(--axis)_1fr]">
          <div>
            <h2 id="latest-title" className="head">Latest stories</h2>
            <p className="mt-5 max-w-[32ch] text-[length:var(--step-small)] text-muted">
              Read from {hostOf(feed.url)} at {formatLong(BUILT_AT)}. Tagged {feed.tags.join(", ")}.
            </p>
            <p className="mt-5 max-w-[32ch] text-[length:var(--step-small)]">
              This entry is open source.{" "}
              <a href={EDIT_FEEDS_URL} className="font-semibold underline">Improve it on GitHub</a> or{" "}
              <a href={reportFeedUrl(feed.name, feed.url)} className="font-semibold underline">report a problem</a>.
            </p>
          </div>
          {snap.ok ? (
            <HeadlineList items={snap.items} showSource={false} groupEvery={4} />
          ) : (
            <div className="bg-surface p-6 md:p-8">
              <h3 className="text-[length:var(--step-lead)] font-extrabold tracking-[-0.03em]">No stories to show right now</h3>
              <p className="mt-2 max-w-[48ch]">
                The feed didn&apos;t answer when the site was last built. Some publishers block automated readers but still
                work in Feedly, Inoreader or any desktop reader. If it stays empty for long,{" "}
                <a href={reportFeedUrl(feed.name, feed.url)} className="underline">
                  report it on GitHub
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {siblings.length > 0 && (
        <section aria-labelledby="more-title" className="bg-surface px-[var(--margin)] py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[var(--axis)_1fr]">
            <h2 id="more-title" className="head">More on the {desk.label.toLowerCase()} desk</h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {siblings.map((f) => (
                <li key={f.slug}>
                  <Link href={`/feeds/${f.slug}`} className="group block">
                    <span className="text-[length:var(--step-lead)] font-extrabold tracking-[-0.03em] group-hover:underline">{f.name}</span>
                    <span className="mt-1 block text-[length:var(--step-small)] text-muted">{f.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
