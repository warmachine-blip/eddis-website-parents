import Image from "next/image";
import { practice } from "@/lib/nav";

/**
 * The only navigation an ad landing page carries: the logo, anchors to this
 * page's own sections, and a tap-to-call number.
 *
 * Deliberately not SiteHeader. The site menu is built from src/lib/nav.ts, and
 * rendering it would put every service label into the landing page's HTML —
 * which is the whole reason these pages exist.
 *
 * The logo is a plain <a>, not next/link, for the same reason. next/link
 * prefetches a static route *and all its data* as soon as it enters the
 * viewport, and the logo is at the top of the page — so a Link here would pull
 * the homepage's RSC payload, nav data and all, into the browser on every
 * landing page view. `prefetch={false}` would also stop that, but an <a> keeps
 * the router out of it entirely and cannot regress if prefetch defaults change.
 * Leaving a bare landing page for the full site is a full page load anyway.
 *
 * Section anchors live in one array so they cannot drift from the ids the
 * template renders.
 */
export const LP_SECTIONS = [
  { id: "causes", label: "Causes" },
  { id: "treatments", label: "Treatments" },
  { id: "dr-baumgartner", label: "Dr. Baumgartner" },
  { id: "schedule", label: "Schedule" },
] as const;

export default function LpTopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-off-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 px-5 py-2 sm:px-8 lg:px-10">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the full
            page load is the point; see the note above. */}
        <a href="/" className="shrink-0" aria-label={`${practice.name} home`}>
          <Image
            src="/images/htx-pain-institute-logo.png"
            alt={practice.name}
            width={144}
            height={96}
            sizes="108px"
            className="h-14 w-auto lg:h-16"
            priority
          />
        </a>

        {/*
          order-last + w-full drops the anchors onto their own line below the
          logo on narrow screens. They wrap rather than scroll: all four fit on
          two lines at 390px, where a scrolling strip would have hidden
          "Schedule" off the right edge with nothing to show it was there. On lg
          they sit inline between the logo and the phone number.
        */}
        <nav
          aria-label="On this page"
          className="order-last w-full pb-1.5 lg:order-none lg:w-auto lg:flex-1 lg:pb-0"
        >
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-0.5 lg:flex-nowrap lg:justify-center lg:gap-x-7">
            {LP_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-h-9 items-center whitespace-nowrap font-sans text-[12.5px] font-medium uppercase tracking-[0.08em] text-charcoal-soft transition-colors hover:text-brass-text lg:min-h-11"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={practice.phoneHref}
          data-phone={practice.phone}
          className="ml-auto inline-flex min-h-11 shrink-0 items-center gap-2 border border-line px-3.5 font-sans text-sm font-semibold tabular-nums text-navy transition-colors hover:border-brass sm:px-5 lg:ml-0 phone"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z" />
          </svg>
          <span className="sr-only sm:not-sr-only">{practice.phone}</span>
        </a>
      </div>
    </header>
  );
}
