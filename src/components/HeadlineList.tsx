import Link from "next/link";
import { Headline } from "@/types/feed";
import { formatStamp } from "@/lib/format";

/** Time, source, headline: one line per story, grouped by space rather than rules. */
export function HeadlineList({
  items,
  showSource = true,
  groupEvery = 4,
}: {
  items: Headline[];
  showSource?: boolean;
  groupEvery?: number;
}) {
  return (
    <ol className="tabular">
      {items.map((h, i) => (
        <li
          key={h.link + i}
          className={i > 0 && i % groupEvery === 0 ? "mt-6" : ""}
        >
          <div
            className={`grid grid-cols-[4.75rem_1fr] gap-x-4 py-1.5 ${showSource ? "sm:grid-cols-[6.5rem_9rem_1fr]" : "sm:grid-cols-[6.5rem_1fr]"}`}
          >
            <span className="pt-0.5 text-[length:var(--step-small)] opacity-75">
              {formatStamp(h.date) || "Undated"}
            </span>
            {showSource && (
              <Link
                href={`/feeds/${h.feedSlug}`}
                className="col-start-2 pt-0.5 text-[length:var(--step-small)] font-semibold hover:underline sm:col-start-auto"
              >
                {h.feed}
              </Link>
            )}
            <a
              href={h.link}
              target="_blank"
              rel="noopener noreferrer"
              className="col-start-2 text-[length:var(--step-body)] font-semibold leading-snug underline-offset-4 hover:underline sm:col-start-auto"
            >
              {h.title}
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only"> (opens the story on {h.feed})</span>
            </a>
          </div>
        </li>
      ))}
    </ol>
  );
}
