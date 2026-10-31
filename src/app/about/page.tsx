import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageBand } from "@/components/PageBand";
import { REPO_URL, SISTER_SITES, utm } from "@/lib/site";
import ticker from "../../../public/archive/edison-ticker.jpg";

export const metadata: Metadata = {
  title: "About RealMarketFeed",
  description:
    "Why RealMarketFeed exists: a free, open-source list of trading RSS feeds that you read in your own reader, with no account and no algorithm.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageBand
        title="Why RSS, still"
        field="var(--field-2)"
        crumbs={[{ href: "/about", label: "About" }]}
        standfirst="A trader in 1870 read prices off a paper tape, in order, as they arrived. RSS gives you the same thing for news: every story from the sources you chose, newest first."
      />

      <section aria-labelledby="what-title" className="px-[var(--margin)] py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[var(--axis)_1fr]">
          <figure>
            <Image src={ticker} alt="Edison's Universal stock printer under its glass dome, with paper tape around the type wheel" sizes="(min-width: 768px) 35vw, 100vw" className="aspect-[4/5] w-full object-cover grayscale md:max-w-md" />
            <figcaption className="mt-2 text-[length:var(--step-small)] text-muted">
              Edison&apos;s Universal stock printer, Gold & Stock Telegraph Co. National Museum of American History.
            </figcaption>
          </figure>
          <div className="max-w-[62ch] space-y-5">
            <h2 id="what-title" className="head">What this is</h2>
            <p>
              RealMarketFeed is a short, hand-checked list of RSS feeds for people who trade or follow markets: crypto
              newsrooms, forex desks, stock market wires and central banks. Each feed has a page with its URL, its latest
              stories and one-click links for Feedly and Inoreader. You can take the whole list into any reader as one OPML
              file.
            </p>
            <p>
              There is no account, no paywall and no ranking algorithm. The site is rebuilt from a JSON file on GitHub, and
              anyone can add a feed with a pull request.
            </p>
            <h2 className="head pt-8">Why RSS</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>You pick the sources; nothing is reordered for engagement.</li>
              <li>Stories arrive in time order, so you see the news when it breaks.</li>
              <li>It works in any reader, on any device, and no one needs your email.</li>
              <li>Central banks and exchanges publish feeds too, so you hear it first-hand.</li>
            </ul>
            <h2 className="head pt-8">Who keeps it</h2>
            <p>
              The directory is MIT licensed and{" "}
              <a href={REPO_URL} className="underline">open on GitHub</a>. It is looked after by the team behind{" "}
              <a href={utm("https://realmarketapi.com", "about")} className="underline">RealMarketAPI</a>, a market data API
              for forex, gold and crypto prices. The directory is a separate, free project and doesn&apos;t need the API.
            </p>
            <p>
              Not sure which feed to start with? Open the <Link href="/feeds" className="underline">directory</Link>, or
              try one of the other free tools:
            </p>
            <ul className="space-y-2">
              {SISTER_SITES.slice(1).map((s) => (
                <li key={s.url}>
                  <a href={utm(s.url, "about")} className="font-semibold underline">{s.name}</a>
                  <span className="text-muted">: {s.blurb}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
