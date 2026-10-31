import { CATEGORIES, Feed } from "@/types/feed";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** OPML 2.0, one folder per desk, which every RSS reader can import. */
export function buildOpml(feeds: Feed[], title = "RealMarketFeed: trading RSS feeds"): string {
  const folders = CATEGORIES.map((c) => {
    const list = feeds.filter((f) => f.category === c.value);
    if (list.length === 0) return "";
    const outlines = list
      .map(
        (f) =>
          `      <outline type="rss" text="${esc(f.name)}" title="${esc(f.name)}" xmlUrl="${esc(f.url)}" description="${esc(f.description)}"/>`
      )
      .join("\n");
    return `    <outline text="${esc(c.label)}" title="${esc(c.label)}">\n${outlines}\n    </outline>`;
  })
    .filter(Boolean)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>${esc(title)}</title>
    <ownerName>RealMarketFeed</ownerName>
    <docs>https://opml.org/spec2.opml</docs>
  </head>
  <body>
${folders}
  </body>
</opml>
`;
}
