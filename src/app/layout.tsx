import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { JsonLd } from "@/components/JsonLd";
import { REPO_URL, SITE_NAME, SITE_URL } from "@/lib/site";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const description =
  "A free, open-source directory of trading RSS feeds for crypto, forex, stocks and macro, with the latest headlines from each one.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RealMarketFeed: trading RSS feeds for crypto, forex, stocks and macro",
    template: "%s | RealMarketFeed",
  },
  description,
  applicationName: SITE_NAME,
  keywords: [
    "trading RSS feeds",
    "market news RSS",
    "crypto RSS feed",
    "forex RSS feed",
    "stock market RSS",
    "central bank RSS",
    "OPML",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "RealMarketFeed: latest market headlines" }],
      "text/x-opml": [{ url: "/opml.xml", title: "All RealMarketFeed feeds (OPML)" }],
    },
  },
  openGraph: {
    siteName: SITE_NAME,
    title: "RealMarketFeed: trading RSS feeds, sorted",
    description,
    type: "website",
    locale: "en_US",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "RealMarketFeed: market news, by the feed" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RealMarketFeed: trading RSS feeds, sorted",
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ff8126" },
    { media: "(prefers-color-scheme: dark)", color: "#121211" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${schibsted.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            description,
            isAccessibleForFree: true,
            publisher: { "@type": "Organization", name: "RealMarketAPI", url: "https://realmarketapi.com" },
            sameAs: [REPO_URL],
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
