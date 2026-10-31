import type { Metadata } from "next";
import { PageBand } from "@/components/PageBand";
import { EDIT_FEEDS_URL, REPO_URL, suggestFeedUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute: add a trading RSS feed",
  description:
    "RealMarketFeed is open source. Suggest a crypto, forex, stocks or macro RSS feed with a GitHub issue, or add it to feeds.json in GitHub's web editor.",
  alternates: { canonical: "/submit" },
};

const RULES = [
  ["A working feed", "The URL returns RSS or Atom today, not a web page."],
  ["The publisher's own", "Link the source's official feed, not a mirror or a scraper."],
  ["One desk", "crypto, forex, stocks or macro: the one that fits most of its stories."],
  ["Three tags at most", "Lowercase, specific words people would search for."],
  ["One plain sentence", "What the feed covers, in your words, without marketing."],
  ["Free to read", "Headlines open without a login, even if some stories are paywalled."],
];

export default function SubmitPage() {
  return (
    <>
      <PageBand
        title="Add a feed"
        field="var(--field-3)"
        crumbs={[{ href: "/submit", label: "Contribute" }]}
        standfirst="RealMarketFeed is open source and built by the people who read it. Adding a feed takes a GitHub account and about two minutes."
      />

      <section aria-labelledby="ways-title" className="px-[var(--margin)] py-20 md:py-28">
        <h2 id="ways-title" className="head">Two ways in</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col justify-between gap-8 bg-surface p-6 md:p-8">
            <div>
              <h3 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-extrabold leading-none tracking-[-0.04em]">Paste a link</h3>
              <p className="mt-4 max-w-[42ch]">
                Open an issue. The form is prefilled: add the feed URL, its name and its desk. A maintainer checks it and adds it
                to the directory for you.
              </p>
            </div>
            <a href={suggestFeedUrl()} className="press inline-flex min-h-12 items-center self-start bg-ink px-6 font-semibold text-bg">
              Suggest a feed
            </a>
          </div>
          <div className="flex flex-col justify-between gap-8 bg-surface p-6 md:p-8">
            <div>
              <h3 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-extrabold leading-none tracking-[-0.04em]">Edit one file</h3>
              <p className="mt-4 max-w-[42ch]">
                Open <code>data/feeds.json</code> in GitHub&apos;s editor and add your entry at the end. GitHub forks the repo and
                opens the pull request for you. Nothing to install.
              </p>
            </div>
            <a href={EDIT_FEEDS_URL} className="press inline-flex min-h-12 items-center self-start bg-accent px-6 font-semibold text-accent-ink">
              Edit feeds.json on GitHub
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="format-title" className="bg-field-4 px-[var(--margin)] py-20 text-field-4-ink md:py-28">
        <div className="grid gap-10 md:grid-cols-[var(--axis)_1fr]">
          <div>
            <h2 id="format-title" className="head">The format</h2>
            <p className="mt-5 max-w-[34ch]">
              One object per feed. The site builds its pages, the OPML file and the headline wire from these fields, so a new
              entry gets its own page on the next build.
            </p>
          </div>
          <pre className="overflow-x-auto bg-black/40 p-6 text-sm leading-relaxed">
{`{
  "name": "Feed Name",
  "url": "https://example.com/rss",
  "category": "crypto",
  "tags": ["btc", "news"],
  "description": "What the feed covers, in one sentence."
}`}
          </pre>
        </div>
      </section>

      <section aria-labelledby="rules-title" className="px-[var(--margin)] py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[var(--axis)_1fr]">
          <div>
            <h2 id="rules-title" className="head">What we check</h2>
            <p className="mt-5 max-w-[34ch]">
              Beyond feeds, fixes to the site are welcome too: see the{" "}
              <a href={`${REPO_URL}/blob/main/CONTRIBUTING.md`} className="underline">contributing guide</a> and the{" "}
              <a href={`${REPO_URL}/issues`} className="underline">open issues</a>.
            </p>
          </div>
          <dl className="grid gap-8 sm:grid-cols-2">
            {RULES.map(([term, detail]) => (
              <div key={term}>
                <dt className="text-[length:var(--step-lead)] font-extrabold tracking-[-0.03em]">{term}</dt>
                <dd className="mt-1">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
