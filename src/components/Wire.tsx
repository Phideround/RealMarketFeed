"use client";

import { useState } from "react";
import { CATEGORIES, Category, Headline } from "@/types/feed";
import { HeadlineList } from "./HeadlineList";

const SHOWN = 16;

/** The live thing on the home page: the newest headlines from every feed, filterable by desk. */
export function Wire({ items }: { items: Headline[] }) {
  const [desk, setDesk] = useState<Category | "all">("all");
  const shown = (desk === "all" ? items : items.filter((h) => h.category === desk)).slice(0, SHOWN);

  const options: { value: Category | "all"; label: string }[] = [
    { value: "all", label: "All desks" },
    ...CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
  ];

  return (
    <div>
      <div role="group" aria-label="Filter the wire by desk" className="mb-8 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => setDesk(o.value)}
            aria-pressed={desk === o.value}
            className="press min-h-11 bg-[#111]/10 px-4 text-[length:var(--step-small)] font-semibold aria-pressed:bg-[#111] aria-pressed:text-white"
          >
            {o.label}
          </button>
        ))}
      </div>

      {shown.length > 0 ? (
        <HeadlineList items={shown} />
      ) : (
        <p className="max-w-[40ch]">
          Nothing from this desk came through at the last update. The feeds are still listed in the
          directory; open one in your reader to see its latest stories.
        </p>
      )}
    </div>
  );
}
