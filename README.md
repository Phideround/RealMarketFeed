# 📡 RealMarketFeed

A free, open-source directory of trading RSS feeds for crypto, forex, stocks and macro markets. Every feed is checked by a person before it is listed.

🔗 **Live site:** [rss.realmarketapi.com](https://rss.realmarketapi.com)

## Table of Contents

- [What you get](#what-you-get)
- [Feed Directory](#feed-directory)
  - [Crypto](#-crypto)
  - [Forex](#-forex)
  - [Stocks](#-stocks)
  - [Macro](#-macro)
- [Contributing](#contributing)
- [Review policy](#review-policy)
- [Disclaimer](#disclaimer)
- [License](#license)
- [Support](#support)
- [Run it locally](#run-it-locally)

## What you get

Everything is built from one file, [`data/feeds.json`](data/feeds.json):

- a page per feed (`/feeds/<slug>`) with its latest headlines, the feed URL, and one-click Feedly / Inoreader links
- a page per desk (`/category/crypto`, `forex`, `stocks`, `macro`)
- `/opml.xml`: every feed as one OPML file to import into any reader (the directory can also export just the feeds you filtered)
- `/feed.xml`: one RSS feed of the newest headlines across all sources

Headlines are read from each feed at build time, so they are as fresh as the last deploy. A feed that can't be read at build time still gets its page, with a note instead of headlines.

No account, no tracking cookies, no paywall. The site is static: no database and no server-side code.

## Feed Directory

### ₿ Crypto

| Name | Feed URL | Tags |
|------|----------|------|
| Bitcoin Magazine | [RSS](https://bitcoinmagazine.com/.rss/full/) | `btc` `bitcoin` |
| Blockworks | [RSS](https://blockworks.co/feed) | `crypto` `institutional` `markets` |
| CoinDesk | [RSS](https://www.coindesk.com/arc/outboundfeeds/rss/) | `btc` `crypto` `news` |
| CoinTelegraph | [RSS](https://cointelegraph.com/rss) | `btc` `eth` `crypto` |
| Decrypt | [RSS](https://decrypt.co/feed) | `crypto` `web3` `defi` |
| The Block | [RSS](https://www.theblock.co/rss.xml) | `crypto` `institutional` |
| The Defiant | [RSS](https://thedefiant.io/api/feed) | `defi` `eth` `news` |

### 💱 Forex

| Name | Feed URL | Tags |
|------|----------|------|
| Investing.com Forex | [RSS](https://www.investing.com/rss/forex.rss) | `forex` `analysis` |

### 📈 Stocks

| Name | Feed URL | Tags |
|------|----------|------|
| Benzinga | [RSS](https://www.benzinga.com/feed) | `stocks` `options` `news` |
| CNBC Investing | [RSS](https://www.cnbc.com/id/15839069/device/rss/rss.html) | `stocks` `investing` `news` |
| FT Markets | [RSS](https://www.ft.com/markets?format=rss) | `markets` `equities` `bonds` |
| MarketWatch | [RSS](https://feeds.marketwatch.com/marketwatch/topstories/) | `stocks` `markets` `news` |
| Motley Fool | [RSS](https://www.fool.com/feeds/index.aspx) | `stocks` `investing` `analysis` |
| Seeking Alpha | [RSS](https://seekingalpha.com/market_currents.xml) | `stocks` `analysis` `dividends` |

### 🌐 Macro

| Name | Feed URL | Tags |
|------|----------|------|
| Bank of Canada | [RSS](https://www.bankofcanada.ca/content_type/press-releases/feed/) | `boc` `rates` `cad` |
| Bank of England | [RSS](https://www.bankofengland.co.uk/rss/news) | `boe` `rates` `gbp` |
| Bank of Japan | [RSS](https://www.boj.or.jp/en/rss/whatsnew.xml) | `boj` `rates` `jpy` |
| BIS Central Bankers' Speeches | [RSS](https://www.bis.org/doclist/cbspeeches.rss) | `central-banks` `rates` `policy` |
| Bloomberg Markets | [RSS](https://feeds.bloomberg.com/markets/news.rss) | `macro` `markets` `finance` |
| ECB Press Releases | [RSS](https://www.ecb.europa.eu/rss/press.html) | `macro` `ecb` `eur` |
| Federal Reserve | [RSS](https://www.federalreserve.gov/feeds/press_all.xml) | `macro` `fed` `rates` |
| Nasdaq Investing | [RSS](https://www.nasdaq.com/feed/rssoutbound?category=Investing) | `news` `analysis` `stock` |
| RealMarketAPI | [RSS](https://realmarketapi.com/feed.xml) | `forex` `commodities` `stock` |
| Zero Hedge | [RSS](https://feeds.feedburner.com/zerohedge/feed) | `macro` `gold` `contrarian` |

## Contributing

Anyone can suggest a feed. There are two ways in, and neither needs a local setup:

1. **Paste a link.** [Open an issue](https://github.com/Phideround/RealMarketFeed/issues/new?title=Add%20feed%3A%20) with the feed URL, its name, its desk, and one line on why traders would want it. A maintainer checks it and adds it for you.
2. **Edit one file.** Add your entry to [`data/feeds.json`](data/feeds.json) in GitHub's web editor, **in alphabetical order by name**, and add the same row to the matching table above, also in alphabetical order. GitHub forks the repo and opens the pull request for you.

One feed per pull request, and only `data/feeds.json` and `README.md` should change. See [CONTRIBUTING.md](CONTRIBUTING.md) for the exact format.

**Alphabetical order is required to merge.** Feeds are listed A to Z by name (ignoring case) in `feeds.json` and in each README table. Every build runs `npm run feeds:check`, which fails when an entry is out of order, so a pull request in the wrong order can't be merged. If you work locally, `npm run feeds:sort` puts both files in order for you.

Fixes to the site itself (bugs, accessibility, design) are welcome too: open an issue first for anything larger than a small fix.

## Review policy

**We check every source before we merge it.** A feed is only listed when we trust both the page and the publisher behind it. Before merging, a maintainer checks that:

- **The publisher is real and identifiable.** A known newsroom, a central bank, an exchange, a regulator, or an established analyst or blog with a named author, an about page and a track record.
- **The feed is the publisher's own.** The official RSS/Atom URL on the publisher's domain, not a mirror, scraper, aggregator or redirect.
- **It works today.** The URL returns valid RSS or Atom with recent stories, and the headlines are free to read (individual stories may be paywalled).
- **It is on topic.** It covers crypto, forex, stocks or macro for people who follow markets.
- **The entry is accurate.** The name, desk, tags and description say plainly what the feed is, with no marketing language.
- **It is in alphabetical order.** The entry sits in A to Z order by name in `feeds.json` and in its README table, and `npm run feeds:check` passes.

**We reject a submission when:**

- the content is **generated by AI** (machine-written articles, spun or rewritten news, auto-generated "signals" or summaries presented as reporting);
- it **may mislead or be misunderstood**: invented or unsourced figures, fake or impersonated publishers, clickbait headlines that misstate the story, undisclosed paid promotion, or "guaranteed profit" and pump-style content;
- it is mainly **advertising, affiliate or referral marketing**, or a feed for a single token, broker or product;
- the **source can't be verified**, or the publisher's identity is hidden;
- it duplicates a feed already in the directory.

Listed feeds are rechecked over time. A feed that breaks, moves behind a login, changes owner, or starts publishing content that falls under the rules above is removed. If you see a problem with a listed feed, [report it](https://github.com/Phideround/RealMarketFeed/issues/new?title=Feed%20problem%3A%20) or email [support](#support).

Maintainers have the final say on what is listed, and may decline a feed without listing every reason.

## Disclaimer

- **Not financial advice.** RealMarketFeed is a directory of news sources for information only. Nothing on the site or in this repository is investment, trading, legal or tax advice, or a recommendation to buy or sell anything. Trading carries risk; do your own research and talk to a licensed professional before making decisions.
- **Third-party content.** Headlines, links and feeds belong to their publishers. We don't write, edit or verify individual stories, and listing a feed is not an endorsement of every article it publishes. Each headline links to the original story on the publisher's site.
- **No warranty.** Feeds can change, break or go offline at any time. Headlines are as fresh as the last build and may be delayed or missing. The site is provided "as is", without warranty of any kind, as set out in the license.
- **Trademarks.** Publisher names and logos are the property of their owners and are used only to identify their feeds.
- **Removal requests.** If you publish a listed feed and want it removed or corrected, email us (see [Support](#support)) and we'll act on it promptly.

## License

The code and the directory data in this repository are released under the [MIT License](LICENSE), © 2026 Phideround. You may use, copy, modify and distribute them, including commercially, as long as the copyright and license notice are kept.

The MIT License covers this repository only. It does not cover the feeds, headlines or articles of the listed publishers, which remain under their own terms. The archival pictures used on the site are public domain or have no known copyright restrictions, and are credited in the site footer.

## Support

- 📧 [support@realmarketapi.com](mailto:support@realmarketapi.com)
- 📧 [realmarketapi@gmail.com](mailto:realmarketapi@gmail.com)
- 🐛 Bugs and feed problems: [GitHub issues](https://github.com/Phideround/RealMarketFeed/issues)

## Run it locally

Built with Next.js, TypeScript and Tailwind CSS, exported as a static site.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
npm run lint
```

On Windows behind a corporate or antivirus TLS proxy, start it with `NODE_OPTIONS=--use-system-ca` so the build can read the feeds.

---

Powered by [RealMarketAPI](https://realmarketapi.com)
