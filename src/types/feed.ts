export interface FeedEntry {
  name: string;
  url: string;
  category: "crypto" | "forex" | "stocks" | "macro";
  tags: string[];
  description: string;
}

export interface Feed extends FeedEntry {
  slug: string;
}

export type Category = Feed["category"];

export interface Headline {
  title: string;
  link: string;
  /** ISO date, or null when the feed gives none we can read */
  date: string | null;
  feed: string;
  feedSlug: string;
  category: Category;
}

export interface FeedSnapshot {
  ok: boolean;
  items: Headline[];
}

export const CATEGORIES: {
  value: Category;
  label: string;
  title: string;
  blurb: string;
  field: string;
}[] = [
  {
    value: "crypto",
    label: "Crypto",
    title: "Crypto news feeds",
    blurb: "Bitcoin, Ethereum, DeFi and the desks that cover them around the clock.",
    field: "var(--field-1)",
  },
  {
    value: "forex",
    label: "Forex",
    title: "Forex news feeds",
    blurb: "Currency pairs, central bank moves and the calendar that drives them.",
    field: "var(--field-2)",
  },
  {
    value: "stocks",
    label: "Stocks",
    title: "Stock market news feeds",
    blurb: "Earnings, movers, dividends and the market close, from the big newsrooms.",
    field: "var(--field-3)",
  },
  {
    value: "macro",
    label: "Macro",
    title: "Macro and central bank feeds",
    blurb: "Rates, inflation and policy, straight from the Fed, the ECB and the wires.",
    field: "var(--field-5)",
  },
];

export function categoryInfo(value: Category) {
  return CATEGORIES.find((c) => c.value === value)!;
}
