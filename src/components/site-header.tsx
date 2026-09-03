"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { practice, primaryNav } from "@/lib/nav";
import ContactSocialReveal from "@/components/contact-social-reveal";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu on every navigation (link tap, logo tap, back/forward).
  // This is React's documented "adjust state when a prop changes" pattern.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setMobileGroup(null);
  }

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileGroup(null);
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      // Only move focus when the menu was actually open (its panel is in the DOM).
      if (document.getElementById("mobile-menu")) toggleRef.current?.focus();
      setMobileOpen(false);
      setMobileGroup(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-off-white/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:gap-6 lg:py-3.5">
        <Link href="/" className="shrink-0" onClick={closeMobile}>
          <Image
            src="/images/htx-pain-institute-logo.png"
            alt="HTx Pain Institute"
            width={144}
            height={96}
            className="h-14 w-auto"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-5 xl:gap-7">
          {primaryNav.map((group) => (
            <div key={group.label} className="group relative">
              <Link
                href={group.href}
                className="inline-flex items-center gap-1 py-2 font-sans text-[12.5px] font-medium uppercase tracking-[0.08em] text-charcoal-soft transition-colors hover:text-brass-text group-hover:text-brass-text group-focus-within:text-brass-text"
              >
                {group.label}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-3 w-3 opacity-60 transition-transform duration-200 group-hover:rotate-180"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>

              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="w-72 rounded-sm border border-line bg-off-white p-2 shadow-[0_18px_40px_-24px_rgba(15,26,46,0.35)]">
                  <div className="grid max-h-[min(70vh,44rem)] gap-0.5 overflow-y-auto">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-sm px-3 py-2 text-[13px] font-medium text-charcoal-soft transition-colors hover:bg-pearl hover:text-brass-text"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link
            href="/community/imas-home"
            className="py-2 font-sans text-[12.5px] font-medium uppercase tracking-[0.08em] text-charcoal-soft transition-colors hover:text-brass-text"
          >
            Community
          </Link>
          <ContactSocialReveal />
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/request-appointment"
            className="border border-brass bg-navy px-5 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-off-white transition-colors hover:bg-navy-deep"
          >
            Request Appointment
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-line text-navy lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
        >
          <svg viewBox="0 0 20 16" className="h-4 w-5" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M1 1l18 14M19 1L1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M0 1h20M0 8h20M0 15h20" stroke="currentColor" strokeWidth="1.6" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-line bg-off-white lg:hidden"
        >
          <ul className="divide-y divide-line px-6">
            {primaryNav.map((group) => {
              const subId = `mobile-sub-${slugify(group.label)}`;
              const expanded = mobileGroup === group.label;
              return (
                <li key={group.label}>
                  <div className="flex items-center justify-between py-3">
                    <Link
                      href={group.href}
                      className="font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-charcoal"
                      onClick={closeMobile}
                    >
                      {group.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Toggle ${group.label} submenu`}
                      aria-expanded={expanded}
                      aria-controls={subId}
                      onClick={() => setMobileGroup(expanded ? null : group.label)}
                      className="flex h-8 w-8 items-center justify-center text-navy"
                    >
                      <svg
                        viewBox="0 0 12 8"
                        className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  {expanded && (
                    <ul id={subId} className="pb-3 pl-2">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} onClick={closeMobile} className="block py-1.5 text-sm text-charcoal-soft">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
            <li>
              <Link
                href="/community/imas-home"
                className="block py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-charcoal"
                onClick={closeMobile}
              >
                Community
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-charcoal"
                onClick={closeMobile}
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-3 border-t border-line px-6 py-4">
            <a href={practice.phoneHref} className="text-center text-sm font-semibold tabular-nums text-navy">
              {practice.phone}
            </a>
            <Link
              href="/request-appointment"
              onClick={closeMobile}
              className="border border-brass bg-navy px-5 py-3 text-center font-sans text-sm font-semibold uppercase tracking-wide text-off-white"
            >
              Request Appointment
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
