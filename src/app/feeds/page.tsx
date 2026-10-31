import type { Metadata } from "next";
import { Suspense } from "react";
import { getFeeds, getAllTags } from "@/lib/feeds";
import { getAllSnapshots } from "@/lib/rss";
import { PageBand } from "@/components/PageBand";
import { Directory, DirectoryRow } from "./Directory";

export const metadata: Metadata = {
  title: "Trading RSS feed directory",
  description:
    "Search every trading RSS feed in the directory by desk and tag: crypto, forex, stocks and macro. Copy a URL, subscribe in Feedly or Inoreader, or export OPML.",
  alternates: { canonical: "/feeds" },
};

export default async function FeedsPage() {
  const feeds = getFeeds();
  const snaps = await getAllSnapshots();
  const rows: DirectoryRow[] = feeds.map((f) => {
    const snap = snaps.get(f.slug);
    return { ...f, ok: snap?.ok ?? false, latest: snap?.items[0] ?? null };
  });

  return (
    <>
      <PageBand
        title="The directory"
        crumbs={[{ href: "/feeds", label: "Directory" }]}
        standfirst={
          <>
            {feeds.length} free feeds for traders. Filter by desk or tag, then copy a URL, subscribe in one click, or take
            the ones you picked as an OPML file.
          </>
        }
      />
      <Suspense>
        <Directory rows={rows} allTags={getAllTags()} />
      </Suspense>
    </>
  );
}
