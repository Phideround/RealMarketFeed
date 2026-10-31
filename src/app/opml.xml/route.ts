import { getFeeds } from "@/lib/feeds";
import { buildOpml } from "@/lib/opml";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildOpml(getFeeds()), {
    headers: { "content-type": "text/x-opml; charset=utf-8" },
  });
}
