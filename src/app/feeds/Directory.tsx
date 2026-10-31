"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, Category, Feed, Headline, categoryInfo } from "@/types/feed";
import { formatStamp } from "@/lib/format";
import { CopyButton } from "@/components/FeedActions";
import { buildOpml } from "@/lib/opml";
import { suggestFeedUrl } from "@/lib/site";

export interface DirectoryRow extends Feed {
  ok: boolean;
  latest: Headline | null;
}

const isCategory = (v: string | null): v is Category => CATEGORIES.some((c) => c.value === v);

export function Directory({ rows, allTags }: { rows: DirectoryRow[]; allTags: string[] }) {
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("q") ?? "");
  const [desk, setDesk] = useState<Category | "all">(isCategory(params.get("desk")) ? (params.get("desk") as Category) : "all");
  const [tag, setTag] = useState(params.get("tag") ?? "all");
  const [sort, setSort] = useState<"default" | "az">(params.get("sort") === "az" ? "az" : "default");

  // Keep the filters in the address bar so a filtered view can be shared.
  useEffect(() => {
    const next = new URLSearchParams();
    if (search.trim()) next.set("q", search.trim());
    if (desk !== "all") next.set("desk", desk);
    if (tag !== "all") next.set("tag", tag);
    if (sort === "az") next.set("sort", "az");
    const qs = next.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [search, desk, tag, sort]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = rows.filter(
      (f) =>
        (desk === "all" || f.category === desk) &&
        (tag === "all" || f.tags.includes(tag)) &&
        (!q ||
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.tags.some((t) => t.includes(q)))
    );
    return sort === "az" ? [...result].sort((a, b) => a.name.localeCompare(b.name)) : result;
  }, [rows, search, desk, tag, sort]);

  const reset = () => {
    setSearch("");
    setDesk("all");
    setTag("all");
  };

  const downloadOpml = () => {
    const blob = new Blob([buildOpml(filtered, "RealMarketFeed: my picks")], { type: "text/x-opml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "realmarketfeed-picks.opml";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const control = "min-h-11 bg-surface px-3 text-[length:var(--step-small)] font-semibold text-ink";

  return (
    <section aria-label="Feeds" className="px-[var(--margin)] pb-20 pt-10 md:pb-28">
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-[var(--axis)_1fr]">
        {/* Filters, held to the left of the axis */}
        <div className="md:sticky md:top-6 md:self-start">
          <div className="grid gap-5">
            <div>
              <label htmlFor="search" className="mb-2 block text-[length:var(--step-small)] font-semibold">
                Search by name, topic or tag
              </label>
              <input
                id="search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="bitcoin, fed, dividends"
                className={`${control} w-full font-normal placeholder:text-muted`}
              />
            </div>

            <fieldset>
              <legend className="mb-2 text-[length:var(--step-small)] font-semibold">Desk</legend>
              <div className="flex flex-wrap gap-2">
                {[{ value: "all" as const, label: "All" }, ...CATEGORIES].map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setDesk(c.value)}
                    aria-pressed={desk === c.value}
                    className={`press ${control} aria-pressed:bg-ink aria-pressed:text-bg`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="tag" className="mb-2 block text-[length:var(--step-small)] font-semibold">Tag</label>
                <select id="tag" value={tag} onChange={(e) => setTag(e.target.value)} className={`${control} w-full`}>
                  <option value="all">Any tag</option>
                  {allTags.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sort" className="mb-2 block text-[length:var(--step-small)] font-semibold">Order</label>
                <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as "default" | "az")} className={`${control} w-full`}>
                  <option value="default">By desk</option>
                  <option value="az">A to Z</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
              <p aria-live="polite" className="text-[length:var(--step-small)]">
                {filtered.length} of {rows.length} feeds
              </p>
              <button
                onClick={downloadOpml}
                disabled={filtered.length === 0}
                className="press min-h-11 bg-accent px-4 text-[length:var(--step-small)] font-semibold text-accent-ink disabled:opacity-50"
              >
                Download these as OPML
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {filtered.length === 0 ? (
            <div className="bg-surface p-8">
              <h2 className="text-[length:var(--step-lead)] font-extrabold tracking-[-0.03em]">No feed matches that</h2>
              <p className="mt-2 max-w-[44ch]">
                Try a shorter word or another desk. If the source you want isn&apos;t listed, you can{" "}
                <a href={suggestFeedUrl()} className="underline">suggest it on GitHub</a> in a minute.
              </p>
              <button onClick={reset} className="press mt-5 min-h-11 bg-ink px-4 text-[length:var(--step-small)] font-semibold text-bg">
                Clear the filters
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {filtered.map((f) => (
                <li key={f.slug} className="bg-surface p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h2 className="text-[length:var(--step-lead)] font-extrabold tracking-[-0.03em]">
                      <Link href={`/feeds/${f.slug}`} className="hover:underline">{f.name}</Link>
                    </h2>
                    <Link href={`/category/${f.category}`} className="text-[length:var(--step-small)] font-semibold hover:underline">
                      <span aria-hidden="true" className="mr-2 inline-block size-2.5" style={{ backgroundColor: categoryInfo(f.category).field }} />
                      {categoryInfo(f.category).label}
                    </Link>
                  </div>
                  <p className="mt-1 max-w-[60ch]">{f.description}</p>
                  <p className="mt-1 text-[length:var(--step-small)] text-muted">Tagged {f.tags.join(", ")}</p>

                  <p className="mt-4 text-[length:var(--step-small)]">
                    {f.latest ? (
                      <>
                        <span className="font-semibold">Latest{f.latest.date ? `, ${formatStamp(f.latest.date)} UTC` : ""}: </span>
                        <a href={f.latest.link} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                          {f.latest.title}
                        </a>
                      </>
                    ) : (
                      <span className="text-muted">We couldn&apos;t read this feed at the last update. It may only open in a reader.</span>
                    )}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-[length:var(--step-small)]">
                    <CopyButton url={f.url} className="min-h-11 bg-accent px-4 font-semibold text-accent-ink" />
                    <Link href={`/feeds/${f.slug}`} className="press inline-flex min-h-11 items-center bg-ink px-4 font-semibold text-bg">
                      Headlines and subscribe
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
