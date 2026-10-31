import Link from "next/link";
import Image from "next/image";
import { getFeeds, getFeedsByCategory } from "@/lib/feeds";
import { BUILT_AT, getWire } from "@/lib/rss";
import { formatLong } from "@/lib/format";
import { EDIT_FEEDS_URL, REPO_URL, SITE_URL, suggestFeedUrl } from "@/lib/site";
import { CATEGORIES } from "@/types/feed";
import { Wire } from "@/components/Wire";
import { JsonLd } from "@/components/JsonLd";

import roomA from "../../public/archive/wall-street-1902-a.jpg";
import roomB from "../../public/archive/wall-street-1902-b.jpg";
import ticker from "../../public/archive/edison-ticker.jpg";
import press from "../../public/archive/printing-press-1908.jpg";

const photo = "h-full w-full object-cover grayscale contrast-[1.05]";

export default async function HomePage() {
  const feeds = getFeeds();
  const wire = await getWire();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Trading RSS feeds",
          numberOfItems: feeds.length,
          itemListElement: feeds.map((f, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/feeds/${f.slug}`,
            name: f.name,
          })),
        }}
      />

      {/* Masthead: a gutterless mosaic of the old wire rooms and flat colour */}
      <div aria-hidden="true" className="grid h-[38svh] grid-cols-3 grid-rows-2 md:h-[52svh] md:grid-cols-6">
        <div className="col-span-2 col-start-1 row-start-1 overflow-hidden">
          <Image src={roomA} alt="" priority sizes="(min-width: 768px) 34vw, 67vw" className={`${photo} drift`} />
        </div>
        <div className="col-start-3 row-span-2 row-start-1 bg-field-1" />
        <div className="hidden overflow-hidden md:col-start-4 md:row-span-2 md:row-start-1 md:block">
          <Image src={ticker} alt="" priority sizes="17vw" className={`${photo} object-[50%_30%]`} />
        </div>
        <div className="hidden bg-field-2 md:col-start-5 md:row-start-1 md:block" />
        <div className="hidden overflow-hidden md:col-start-6 md:row-start-1 md:block">
          <Image src={press} alt="" sizes="17vw" className={photo} />
        </div>
        <div className="col-start-1 row-start-2 bg-field-3" />
        <div className="col-start-2 row-start-2 overflow-hidden">
          <Image src={roomB} alt="" sizes="(min-width: 768px) 17vw, 34vw" className={photo} />
        </div>
        <div className="hidden bg-field-4 md:col-span-2 md:col-start-5 md:row-start-2 md:block" />
      </div>

      {/* Title on the axis */}
      <section className="px-[var(--margin)] pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-[var(--axis)_1fr] md:gap-0">
          <div className="after-headline max-w-[30ch] md:pr-10 md:pt-3">
            <p className="text-[length:var(--step-lead)] leading-snug">
              {feeds.length} RSS feeds for crypto, forex, stocks and macro, with the latest headlines from each. Free, open
              source, and anyone can add one.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="/opml.xml" download className="press inline-flex min-h-12 items-center bg-accent px-6 font-semibold text-accent-ink">
                Download all as OPML
              </a>
              <Link href="/feeds" className="font-semibold underline underline-offset-4">
                Browse the directory
              </Link>
            </div>
          </div>
          <h1 className="display text-[length:var(--step-display)]">
            <span className="mask-line"><span>Market news,</span></span>
            <span className="mask-line"><span>by the feed</span></span>
          </h1>
        </div>
      </section>

      {/* The wire */}
      <section aria-labelledby="wire-title" className="field bg-field-2 px-[var(--margin)] py-20 md:py-28">
        <h2 id="wire-title" className="display enter max-w-5xl text-[clamp(2.5rem,1.2rem+4.5vw,4.5rem)] md:pl-[3vw]">
          <span>What the feeds published last</span>
        </h2>
        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12">
          <div className="hidden md:col-span-4 md:flex md:flex-col md:justify-between md:pr-8">
            <p className="max-w-[28ch] text-[length:var(--step-small)]">
              Read from every feed at {formatLong(BUILT_AT)}. Times are UTC; each headline opens the original story.
            </p>
            <Image src={ticker} alt="Thomas Edison's Universal stock ticker under a glass dome, about 1870" sizes="25vw" className="aspect-[4/5] w-[22vw] max-w-sm object-cover grayscale mix-blend-multiply" />
          </div>
          <div className="md:col-span-8">
            <Wire items={wire} />
            <p className="mt-8 text-[length:var(--step-small)] md:hidden">
              Read from every feed at {formatLong(BUILT_AT)}. Times are UTC.
            </p>
          </div>
        </div>
      </section>

      {/* The desks */}
      <section aria-labelledby="desks-title" className="bg-field-4 px-[var(--margin)] py-24 text-field-4-ink md:py-36">
        <div className="enter">
          <h2 id="desks-title" className="head">Four desks</h2>
          <p className="mt-6 max-w-[46ch] text-[length:var(--step-lead)] leading-snug">
            Every feed sits on one desk. Open a desk to see its sources side by side with what each one ran today.
          </p>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-12">
          <figure className="relative md:col-span-7">
            <Image src={roomB} alt="Customers' room at J.L. McLean & Co., 25 Broad Street, New York, 1902, with the quotation board on the far wall" sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[4/3] w-full object-cover grayscale md:aspect-[16/10]" />
            <figcaption className="bg-bg p-5 text-[length:var(--step-small)] text-ink md:absolute md:right-0 md:top-0 md:w-80">
              A broker&apos;s customers&apos; room on Broad Street, 1902. Traders sat here to read the quotation board and the
              ticker. An RSS reader does the same job from your desk.
            </figcaption>
          </figure>
          <ul className="flex flex-col gap-4 md:col-span-5">
            {CATEGORIES.map((c) => {
              const list = getFeedsByCategory(c.value);
              return (
                <li key={c.value} className="flex-1">
                  <Link href={`/category/${c.value}`} className="press field flex h-full flex-col justify-between gap-4 p-5" style={{ backgroundColor: c.field }}>
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-extrabold tracking-[-0.04em]">{c.label}</span>
                      <span className="text-[length:var(--step-small)] font-semibold">
                        {list.length} feed{list.length === 1 ? "" : "s"} →
                      </span>
                    </span>
                    <span className="text-[length:var(--step-small)]">{list.map((f) => f.name).join(", ")}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Every feed, as an index */}
      <section aria-labelledby="index-title" className="px-[var(--margin)] py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[var(--axis)_1fr]">
          <div className="enter">
            <h2 id="index-title" className="head">All {feeds.length} feeds</h2>
            <p className="mt-6 max-w-[34ch]">
              Every source in the directory. Each has its own page with the feed URL, one-click subscribe links and its
              latest stories.
            </p>
            <figure className="mt-10 hidden md:block">
              <Image src={press} alt="An Annand rotary press used to print the Western Daily Press, 1908" sizes="35vw" className="w-full grayscale" />
              <figcaption className="mt-2 text-[length:var(--step-small)] text-muted">The Daily Press, Bristol, printed on this in 1908.</figcaption>
            </figure>
          </div>
          <div className="columns-1 gap-10 sm:columns-2">
            {CATEGORIES.map((c) => (
              <div key={c.value} className="mb-10 break-inside-avoid">
                <h3 className="mb-3 text-[length:var(--step-lead)] font-extrabold tracking-[-0.03em]">
                  <Link href={`/category/${c.value}`} className="hover:underline">{c.label}</Link>
                </h3>
                <ul className="space-y-3">
                  {getFeedsByCategory(c.value).map((f) => (
                    <li key={f.slug}>
                      <Link href={`/feeds/${f.slug}`} className="group block">
                        <span className="font-semibold group-hover:underline">{f.name}</span>
                        <span className="block text-muted">{f.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close: the idea again, inverted */}
      <section aria-labelledby="close-title" className="bg-ink px-[var(--margin)] py-24 text-bg md:py-32">
        <h2 id="close-title" className="display enter max-w-6xl text-[clamp(3.25rem,1rem+8vw,9rem)]">
          <span>Open source. Add yours.</span>
        </h2>
        <p className="mt-8 max-w-[52ch] text-[length:var(--step-lead)] leading-snug">
          Every feed here was added by someone who reads it. The whole directory is one JSON file, so there are two ways in,
          and neither needs a local setup.
        </p>

        <div className="mt-16 grid gap-4 md:grid-cols-12">
          <div className="field flex flex-col justify-between gap-8 bg-field-3 p-6 md:col-span-5 md:p-8">
            <div>
              <h3 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-extrabold leading-none tracking-[-0.04em]">Paste a link</h3>
              <p className="mt-4 max-w-[36ch]">
                Open an issue with the feed URL and a line on why it&apos;s useful. We check it and add it for you. A GitHub
                account is all it takes.
              </p>
            </div>
            <a href={suggestFeedUrl()} className="press inline-flex min-h-12 items-center justify-center self-start bg-[#111] px-6 font-semibold text-white">
              Suggest a feed
            </a>
          </div>

          <div className="flex flex-col justify-between gap-8 bg-[#2a2a27] p-6 text-[#f2f2ee] md:col-span-7 md:p-8">
            <div>
              <h3 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-extrabold leading-none tracking-[-0.04em]">Edit one file</h3>
              <p className="mt-4 max-w-[46ch]">
                Add five lines to <code>data/feeds.json</code> in GitHub&apos;s editor. It forks the repo and opens the pull
                request for you; the feed goes live with the next build.
              </p>
              <pre className="mt-6 overflow-x-auto bg-black/40 p-4 text-sm leading-relaxed">
{`{
  "name": "Feed Name",
  "url": "https://example.com/rss",
  "category": "crypto",
  "tags": ["btc", "news"],
  "description": "What it covers, in one line."
}`}
              </pre>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={EDIT_FEEDS_URL} className="press inline-flex min-h-12 items-center bg-accent px-6 font-semibold text-accent-ink">
                Edit feeds.json on GitHub
              </a>
              <Link href="/submit" className="font-semibold underline underline-offset-4">
                What we check
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-[60ch]">
          Found a dead feed, a typo, or a better design idea? <a href={`${REPO_URL}/issues`} className="underline">Open an issue</a>{" "}
          or send a pull request: the site&apos;s code is <a href={REPO_URL} className="underline">MIT licensed on GitHub</a>.
        </p>
      </section>
    </>
  );
}
