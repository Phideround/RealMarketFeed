import Link from "next/link";
import { CATEGORIES } from "@/types/feed";
import { REPO_URL, SISTER_SITES, utm } from "@/lib/site";

const PICTURES = [
  {
    title: "Thomas Edison stock ticker",
    by: "Jaclyn Nash, NMAH",
    licence: "public domain",
    page: "https://commons.wikimedia.org/wiki/File:Thomas_Edison_stock_ticker_NMAH-JN2014-3625.jpg",
  },
  {
    title: "Customers' room, 25 Broad Street, 1902 (two views)",
    by: "J.L. McLean & Co., Wall Street guide",
    licence: "no known copyright restrictions",
    page: "https://commons.wikimedia.org/wiki/File:Wall_Street_guide_-_(1902)_(14597816588).jpg",
  },
  {
    title: "Western Daily Press printing press, 1908",
    by: "Samuel Loxton",
    licence: "public domain",
    page: "https://commons.wikimedia.org/wiki/File:Western_Daily_Press_printing_press_1908.jpg",
  },
];

export function Footer() {
  return (
    <footer className="field overflow-hidden bg-field-3 px-[var(--margin)] pb-8 pt-16">
      <p aria-hidden="true" className="display -ml-[0.04em] whitespace-nowrap text-[clamp(2.75rem,12.4vw,13rem)]">
        RealMarketFeed
      </p>

      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <h2 className="mb-4 text-[length:var(--step-small)] font-semibold">From the same family</h2>
          <ul className="space-y-2">
            {SISTER_SITES.map((s) => (
              <li key={s.url}>
                <a
                  href={utm(s.url, "footer")}
                  className="group block text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-extrabold leading-tight tracking-[-0.035em] text-accent"
                >
                  <span className="group-hover:underline">{s.name}</span>
                  <span className="block text-[length:var(--step-small)] font-normal tracking-normal text-[#111]">{s.blurb}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 text-[length:var(--step-small)] md:col-span-6 md:grid-cols-3">
          <div>
            <h2 className="mb-3 font-semibold">Desks</h2>
            <ul className="space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.value}>
                  <Link href={`/category/${c.value}`} className="hover:underline">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-semibold">Site</h2>
            <ul className="space-y-2">
              <li><Link href="/feeds" className="hover:underline">Directory</Link></li>
              <li><Link href="/submit" className="hover:underline">Contribute</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><a href="/feed.xml" className="hover:underline">Headlines RSS</a></li>
              <li><a href="/opml.xml" className="hover:underline">OPML export</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-semibold">Open source</h2>
            <ul className="space-y-2">
              <li><a href={REPO_URL} className="hover:underline">GitHub</a></li>
              <li><a href={`${REPO_URL}/blob/main/CONTRIBUTING.md`} className="hover:underline">Contributing</a></li>
              <li><a href="https://www.linkedin.com/in/pham-trung-phi-thanh/" className="hover:underline">Maintainer</a></li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-16 max-w-4xl text-[length:var(--step-small)]">
        Pictures:{" "}
        {PICTURES.map((p, i) => (
          <span key={p.page}>
            <a href={p.page} className="underline">{p.title}</a>, {p.by}, {p.licence}, via Wikimedia Commons
            {i < PICTURES.length - 1 ? "; " : "."}
          </span>
        ))}{" "}
        Headlines belong to their publishers and link to the original stories.
      </p>

      <div className="mt-6 flex flex-wrap justify-between gap-4 text-[length:var(--step-small)]">
        <p>
          &copy; {new Date().getFullYear()} RealMarketFeed. Free and MIT licensed. Powered by{" "}
          <a href={utm("https://realmarketapi.com", "footer_powered_by")} className="underline">RealMarketAPI</a>.
        </p>
        <a href="#main" className="underline">Back to top</a>
      </div>
    </footer>
  );
}
