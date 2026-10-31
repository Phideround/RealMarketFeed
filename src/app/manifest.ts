import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RealMarketFeed",
    short_name: "MarketFeed",
    description: "Free, open-source directory of trading RSS feeds.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f4f1",
    theme_color: "#ff8126",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
