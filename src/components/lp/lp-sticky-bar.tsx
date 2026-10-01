import { practice } from "@/lib/nav";

/**
 * Sticky Call / Schedule bar, mobile only — the same pattern the ad landing
 * pages on the main site carry (src/components/booking-actions.tsx), with one
 * difference: Schedule anchors to the scheduler embedded further down this page
 * instead of linking to /request-appointment. Bookings stay on the page, so the
 * booking listener fires here.
 *
 * No right-side padding for a chat bubble: the LeadConnector widget is part of
 * the site chrome and does not load on these pages.
 *
 * The spacer keeps the bar from covering the last line of the footer.
 */
export default function LpStickyBar() {
  return (
    <>
      <div aria-hidden="true" className="h-[76px] lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-off-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <a
            href={practice.phoneHref}
            data-phone={practice.phone}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line px-3 font-sans text-sm font-semibold tabular-nums text-navy phone"
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
            Call
          </a>
          <a
            href="#schedule"
            className="inline-flex min-h-11 flex-[1.4] items-center justify-center rounded-full border border-brass bg-brass px-3 font-sans text-sm font-semibold text-navy-deep"
          >
            Schedule
          </a>
        </div>
      </div>
    </>
  );
}
