"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { practice, primaryNav } from "@/lib/nav";
import ContactSocialReveal from "@/components/contact-social-reveal";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-line bg-off-white/92 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:gap-6 lg:py-3.5">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/htx-pain-institute-logo.png"
            alt="HTx Pain Institute"
            width={168}
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
                className="inline-flex items-center gap-1 py-2 font-sans text-[12.5px] font-medium uppercase tracking-[0.08em] text-charcoal-soft transition-colors hover:text-brass group-hover:text-brass group-focus-within:text-brass"
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
                  <div className="grid max-h-80 gap-0.5 overflow-y-auto">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-sm px-3 py-2 text-[13px] font-medium text-charcoal-soft transition-colors hover:bg-pearl hover:text-brass-deep"
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
            className="py-2 font-sans text-[12.5px] font-medium uppercase tracking-[0.08em] text-charcoal-soft transition-colors hover:text-brass"
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
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-line lg:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg viewBox="0 0 20 16" className="h-4 w-5" fill="none">
            {mobileOpen ? (
              <path d="M1 1l18 14M19 1L1 15" stroke="#1a2740" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M0 1h20M0 8h20M0 15h20" stroke="#1a2740" strokeWidth="1.6" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-line bg-off-white lg:hidden">
          <ul className="divide-y divide-line px-6">
            {primaryNav.map((group) => (
              <li key={group.label}>
                <div className="flex items-center justify-between py-3">
                  <Link
                    href={group.href}
                    className="font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-charcoal"
                    onClick={() => setMobileOpen(false)}
                  >
                    {group.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`Toggle ${group.label} submenu`}
                    aria-expanded={mobileGroup === group.label}
                    onClick={() =>
                      setMobileGroup(mobileGroup === group.label ? null : group.label)
                    }
                    className="flex h-8 w-8 items-center justify-center text-navy"
                  >
                    <svg
                      viewBox="0 0 12 8"
                      className={`h-3 w-3 transition-transform ${
                        mobileGroup === group.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                    >
                      <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                {mobileGroup === group.label && (
                  <ul className="pb-3 pl-2">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm text-charcoal-soft"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <Link
                href="/community/imas-home"
                className="block py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-charcoal"
                onClick={() => setMobileOpen(false)}
              >
                Community
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-charcoal"
                onClick={() => setMobileOpen(false)}
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
              onClick={() => setMobileOpen(false)}
              className="border border-brass bg-navy px-5 py-3 text-center font-sans text-sm font-semibold uppercase tracking-wide text-off-white"
            >
              Request Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
