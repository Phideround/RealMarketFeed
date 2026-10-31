# 📡 RealMarketFeed

A curated, open-source directory of trading RSS feeds for crypto, forex, stocks, and macro markets.

🔗 **Live site:** [rss.realmarketapi.com](https://rss.realmarketapi.com)

Built with Next.js, TypeScript, and TailwindCSS. Static-first, no database — deploy anywhere.

What the site does with `data/feeds.json`:

- a page per feed (`/feeds/<slug>`) with its latest headlines, the feed URL, and one-click Feedly / Inoreader links
- a page per desk (`/category/crypto`, `forex`, `stocks`, `macro`)
- `/opml.xml`: every feed as one OPML file to import into any reader (the directory can also export just the feeds you filtered)
- `/feed.xml`: one RSS feed of the newest headlines across all sources

Headlines are read from each feed at build time, so they are as fresh as the last deploy. A feed that can't be read at build time still gets its page, with a note instead of headlines.

### Run it locally

```bash
npm install
npm run dev
```

On Windows behind a corporate or antivirus TLS proxy, start it with `NODE_OPTIONS=--use-system-ca` so the build can read the feeds.

## Table of Contents

- [Feed Directory](#feed-directory)
  - [Crypto](#-crypto)
  - [Forex](#-forex)
  - [Stocks](#-stocks)
  - [Macro](#-macro)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Feed Directory

### ₿ Crypto

| Name | Feed URL | Tags |
|------|----------|------|
| CoinDesk | [RSS](https://www.coindesk.com/arc/outboundfeeds/rss/) | `btc` `crypto` `news` |
| CoinTelegraph | [RSS](https://cointelegraph.com/rss) | `btc` `eth` `crypto` |
| Bitcoin Magazine | [RSS](https://bitcoinmagazine.com/.rss/full/) | `btc` `bitcoin` |
| Decrypt | [RSS](https://decrypt.co/feed) | `crypto` `web3` `defi` |
| The Block | [RSS](https://www.theblock.co/rss.xml) | `crypto` `institutional` |

### 💱 Forex

| Name | Feed URL | Tags |
|------|----------|------|
| Investing.com Forex | [RSS](https://www.investing.com/rss/forex.rss) | `forex` `analysis` |

### 📈 Stocks

| Name | Feed URL | Tags |
|------|----------|------|
| Yahoo Finance | [RSS](https://finance.yahoo.com/news/rssindex) | `stocks` `equities` `markets` |
| MarketWatch | [RSS](https://feeds.marketwatch.com/marketwatch/topstories/) | `stocks` `markets` `news` |
| Seeking Alpha | [RSS](https://seekingalpha.com/market_currents.xml) | `stocks` `analysis` `dividends` |
| Benzinga | [RSS](https://www.benzinga.com/feed) | `stocks` `options` `news` |
| Motley Fool | [RSS](https://www.fool.com/feeds/index.aspx) | `stocks` `investing` `analysis` |

### 🌐 Macro

| Name | Feed URL | Tags |
|------|----------|------|
| Bloomberg Markets | [RSS](https://feeds.bloomberg.com/markets/news.rss) | `macro` `markets` `finance` |
| Federal Reserve | [RSS](https://www.federalreserve.gov/feeds/press_all.xml) | `macro` `fed` `rates` |
| ECB Press Releases | [RSS](https://www.ecb.europa.eu/rss/press.html) | `macro` `ecb` `eur` |
| Zero Hedge | [RSS](https://feeds.feedburner.com/zerohedge/feed) | `macro` `gold` `contrarian` |
| RealMarketAPI | [RSS](https://realmarketapi.com/feed.xml) | `forex` `commodities` `stock` |
| Nasdaq Investing | [RSS](https://www.nasdaq.com/feed/rssoutbound?category=Investing) | `news` `analysis` `stock` |
| Bank of Canada | [RSS](https://www.bankofcanada.ca/content_type/press-releases/feed/) | `boc` `rates` `cad` |

## Contributing

Want to add a feed? The quickest way is to [open an issue](https://github.com/Phideround/RealMarketFeed/issues/new?title=Add%20feed%3A%20) with the feed URL. To add it yourself, edit [`data/feeds.json`](data/feeds.json) in GitHub's web editor; see [CONTRIBUTING.md](CONTRIBUTING.md) for the format and rules.

## License

Open source. See [LICENSE](LICENSE) for details.

---

Powered by [RealMarketAPI](https://realmarketapi.com)