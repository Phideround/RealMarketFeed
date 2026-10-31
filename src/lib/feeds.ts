import entries from "../../data/feeds.json";
import { Category, Feed, FeedEntry } from "@/types/feed";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const feeds: Feed[] = (entries as FeedEntry[]).map((f) => ({
  ...f,
  slug: slugify(f.name),
}));

export function getFeeds(): Feed[] {
  return feeds;
}

export function getFeedBySlug(slug: string): Feed | undefined {
  return feeds.find((f) => f.slug === slug);
}

export function getFeedsByCategory(category: Category): Feed[] {
  return feeds.filter((f) => f.category === category);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  feeds.forEach((f) => f.tags.forEach((t) => tags.add(t)));
  return [...tags].sort();
}
