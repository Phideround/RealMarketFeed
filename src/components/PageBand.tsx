import Link from "next/link";

/** The coloured opening band of every inner page: crumbs, the title on the axis, a standfirst. */
export function PageBand({
  title,
  standfirst,
  field = "var(--field-1)",
  crumbs = [],
  children,
}: {
  title: string;
  standfirst: React.ReactNode;
  field?: string;
  crumbs?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="field px-[var(--margin)] pb-14 pt-10 md:pb-20" style={{ backgroundColor: field }}>
      <div className="grid gap-y-6 md:grid-cols-[var(--axis)_1fr]">
        <nav aria-label="Breadcrumb" className="text-[length:var(--step-small)] font-semibold">
          <ol className="flex flex-wrap gap-x-2">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.href} className="before:mr-2 before:content-['/']">
                <Link href={c.href} className="hover:underline">{c.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        <div>
          <h1 className="display text-[clamp(2.75rem,1rem+6vw,6.5rem)]">{title}</h1>
          <div className="mt-6 max-w-[48ch] text-[length:var(--step-lead)] leading-snug">{standfirst}</div>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
