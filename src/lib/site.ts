export const SITE_URL = "https://rss.realmarketapi.com";
export const SITE_NAME = "RealMarketFeed";
export const REPO_URL = "https://github.com/Phideround/RealMarketFeed";

/** Edit feeds.json straight in GitHub's web editor; GitHub forks and opens the pull request for you. */
export const EDIT_FEEDS_URL = `${REPO_URL}/edit/main/data/feeds.json`;

/** The no-code way in: an issue with the fields we need, prefilled. */
export function suggestFeedUrl(prefill = ""): string {
  const body = [
    `Feed URL: ${prefill}`,
    "Name:",
    "Desk (crypto, forex, stocks or macro):",
    "Why traders would want it:",
  ].join("\n");
  return `${REPO_URL}/issues/new?title=${encodeURIComponent("Add feed: ")}&labels=new-feed&body=${encodeURIComponent(body)}`;
}

export function reportFeedUrl(name: string, url: string): string {
  const body = `Feed: ${name}\nURL: ${url}\n\nWhat's wrong (broken, moved, paywalled, off-topic):`;
  return `${REPO_URL}/issues/new?title=${encodeURIComponent(`Feed problem: ${name}`)}&body=${encodeURIComponent(body)}`;
}

/** Adds the shared cross-site UTM tags to links into the RealMarketAPI family. */
export function utm(url: string, campaign: string): string {
  const u = new URL(url);
  u.searchParams.set("utm_source", "rss");
  u.searchParams.set("utm_medium", "referral");
  u.searchParams.set("utm_campaign", campaign);
  return u.toString();
}

export const SISTER_SITES = [
  { name: "RealMarketAPI", url: "https://realmarketapi.com", blurb: "Live forex, gold and crypto prices over REST and WebSocket" },
  { name: "Learn", url: "https://learn.realmarketapi.com", blurb: "Guides to indicators, timeframes and market data" },
  { name: "Calculators", url: "https://calculator.realmarketapi.com", blurb: "Position size, margin, profit and risk" },
  { name: "The game", url: "https://game.realmarketapi.com", blurb: "Guess the next candle" },
] as const;
