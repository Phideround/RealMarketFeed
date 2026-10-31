import Link from "next/link";

export default function NotFound() {
  return (
    <section className="field bg-field-1 px-[var(--margin)] py-24 md:py-36">
      <div className="grid gap-8 md:grid-cols-[var(--axis)_1fr]">
        <p className="text-[length:var(--step-small)] font-semibold">Error 404</p>
        <div>
          <h1 className="display text-[clamp(3rem,1rem+7vw,7rem)]">This page went off the wire</h1>
          <p className="mt-6 max-w-[40ch] text-[length:var(--step-lead)] leading-snug">
            The link may be old, or the feed may have left the directory.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/feeds" className="press inline-flex min-h-12 items-center bg-accent px-6 font-semibold text-accent-ink">
              Open the directory
            </Link>
            <Link href="/" className="press inline-flex min-h-12 items-center bg-[#111] px-6 font-semibold text-white">
              Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
