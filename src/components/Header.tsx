"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const NAV = [
  { href: "/feeds", label: "Directory" },
  { href: "/category/crypto", label: "Desks" },
  { href: "/submit", label: "Contribute" },
  { href: "/about", label: "About" },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/category/crypto" ? pathname.startsWith("/category") : pathname.startsWith(href);

  return (
    <header className="relative z-50 text-[length:var(--step-small)] font-semibold">
      <div className="flex items-stretch">
        <Link
          href="/"
          className="flex items-center gap-2.5 bg-field-4 px-[var(--margin)] py-2 text-base font-extrabold tracking-[-0.03em] text-field-4-ink"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={32} height={32} className="size-8 rounded-full bg-white" />
          RealMarketFeed
        </Link>

        <nav aria-label="Main" className="field hidden flex-1 items-center gap-6 bg-field-2 px-6 md:flex lg:max-w-[calc(var(--axis)+8rem)]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="py-3 underline-offset-4 hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 pr-[var(--margin)] md:gap-4">
          <button
            onClick={toggle}
            className="press px-2 py-3 underline-offset-4 hover:underline"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <Link href="/submit" className="press hidden bg-accent px-4 py-2 text-accent-ink sm:inline-block">
            Add a feed
          </Link>
          <button
            className="px-2 py-3 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="field absolute inset-x-0 top-full bg-field-2 px-[var(--margin)] py-4 md:hidden">
          <ul className="flex flex-col gap-1 text-2xl font-extrabold tracking-[-0.03em]">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="/opml.xml" download className="block py-2">
                Download OPML
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
