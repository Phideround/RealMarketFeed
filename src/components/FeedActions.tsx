"use client";

import { useState } from "react";

export function CopyButton({ url, className = "" }: { url: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <button onClick={copy} className={`press ${className}`} aria-live="polite">
      {state === "copied" ? "Copied" : state === "failed" ? "Press Ctrl+C" : "Copy feed URL"}
    </button>
  );
}

/** Copy, open, and one-click subscribe in the two readers most people use. */
export function FeedActions({ url }: { url: string }) {
  const encoded = encodeURIComponent(url);
  const link = "press inline-flex min-h-11 items-center px-4 font-semibold";

  return (
    <div className="flex flex-wrap gap-2 text-[length:var(--step-small)]">
      <CopyButton url={url} className={`${link} bg-accent text-accent-ink`} />
      <a href={url} target="_blank" rel="noopener noreferrer" className={`${link} bg-[#111] text-white`}>
        Open the raw feed
      </a>
      <a href={`https://feedly.com/i/subscription/feed/${encoded}`} target="_blank" rel="noopener noreferrer" className={`${link} bg-[#111]/10`}>
        Add to Feedly
      </a>
      <a href={`https://www.inoreader.com/?add_feed=${encoded}`} target="_blank" rel="noopener noreferrer" className={`${link} bg-[#111]/10`}>
        Add to Inoreader
      </a>
    </div>
  );
}
