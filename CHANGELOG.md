# Changelog

## Unreleased

### Added

- Sort the directory A to Z, Z to A, or by desk. Alphabetical views are grouped under letter headings with a jump-to-letter index, and the chosen order is kept in the URL.
- 8 new feeds: The Defiant, Blockworks, CNBC Investing, FT Markets, Bank of England, Bank of Japan, Bank of Canada, BIS Central Bankers' Speeches.
- `npm run feeds:check` and `npm run feeds:sort`. The check runs before every build and fails when `data/feeds.json` or a README table is out of A to Z order, out of sync, or breaks the entry rules.
- README: review policy, disclaimer, MIT license details and support contacts.

### Changed

- `data/feeds.json` and the README tables are now in alphabetical order by name, and new entries must be added in that order to be merged (README, CONTRIBUTING.md and the Submit page say so).

### Removed

- Yahoo Finance: its feed URL returns 404.

## 0.2.0 (2026-10-31)

A redesign around what the directory is for: reading feeds, and adding them.

### Added

- Latest headlines from every feed, read at build time. The home page shows them as one wire you can filter by desk.
- A page per feed (`/feeds/<slug>`) with the feed URL, its latest stories, copy, Feedly and Inoreader links, and the other feeds on its desk.
- A page per desk: `/category/crypto`, `/category/forex`, `/category/stocks`, `/category/macro`.
- `/opml.xml` with every feed, grouped by desk, and an OPML download of just the feeds you filtered in the directory.
- `/feed.xml`: one RSS feed of the newest headlines across all sources.
- Two ways to contribute from the site: a prefilled GitHub issue ("paste a link"), or editing `data/feeds.json` in GitHub's web editor. Every feed page links to improving its entry or reporting a problem.
- Directory filters (search, desk, tag, order) are kept in the URL so a filtered view can be shared.
- The RealMarketFeed logo and favicon set, a web manifest, and a 404 page.

### Changed

- New look: flat orange, sky, lime and black fields, Schibsted Grotesk throughout, and archival pictures of the first market wires (Edison's stock ticker, a 1902 Broad Street broker's room, a 1908 newspaper press), credited in the footer.
- The feed list is now rows with each feed's latest headline instead of a card grid.
- Header, footer, About and Submit pages rewritten. The footer links to RealMarketAPI, Learn, Calculators and the game with UTM tags.

### Fixed

- Canonical URLs, `sitemap.xml` and `robots.txt` pointed to `realmarketfeed.com`, which doesn't resolve. They now use `https://rss.realmarketapi.com`, and the sitemap lists every feed and desk page.
- Added Open Graph and Twitter images, JSON-LD (WebSite, ItemList, CollectionPage, BreadcrumbList) and RSS/OPML discovery links.
- Dark mode badges followed the OS setting instead of the theme toggle.
- On phones the filter panel and feed grid sat side by side; the mobile menu didn't close after tapping a link.
- Copying a feed URL failed silently when the clipboard was unavailable.
- Form labels, pressed states, a skip link and visible focus for keyboard and screen-reader users.

## 0.1.0 (2026-04-12)

- First release: a static directory of trading RSS feeds with search, category and tag filters.
