import Link from "next/link";
import { practice } from "@/lib/nav";
import {
  LEAD_FORM_SRC,
  LEAD_FORM_HEIGHT,
  LEAD_FORM_TITLE,
  leadFormConfigured,
} from "@/lib/lead-form";

/**
 * Booking affordances for the pages the Google Ads campaigns land on.
 *
 * These pages carry paid traffic with one job, so they get more ways to book
 * than the rest of the site: the hero button already above the fold, an inline
 * band after the clinical content, the closing band every page has, and a
 * sticky bar on mobile. Everything else on the site keeps the lighter pattern,
 * which is why this is opt-in per page rather than built into the templates.
 */

const PHONE_SVG = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path
      d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * The LeadConnector form, once the agency supplies it. Renders nothing until
 * then — see src/lib/lead-form.ts.
 */
export function LeadForm() {
  if (!leadFormConfigured) return null;
  return (
    <div className="mt-8 border-t border-line pt-8">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
        {LEAD_FORM_TITLE}
      </p>
      <iframe
        src={LEAD_FORM_SRC}
        title={LEAD_FORM_TITLE}
        loading="lazy"
        className="mt-4 w-full rounded-xl border border-line bg-off-white"
        style={{ height: LEAD_FORM_HEIGHT }}
      />
    </div>
  );
}

/**
 * Inline booking band, placed after the main content of an ad landing page.
 * Carries the form slot, so the form lands mid-page rather than below the fold
 * at the very bottom.
 */
export function InlineBooking({ lead }: { lead?: string }) {
  return (
    <section className="bg-pearl">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
        <div className="rounded-2xl border border-line bg-off-white p-7 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
                Ready when you are.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-charcoal-soft">
                {lead ??
                  "Same-week consultations are typically available, and most major insurance is accepted."}
              </p>
            </div>
            <div className="flex flex-none flex-wrap items-center gap-3">
              <Link
                href="/request-appointment"
                className="inline-flex min-h-11 items-center rounded-full border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
              >
                Schedule Appointment
              </Link>
              <a
                href={practice.phoneHref} data-phone={practice.phone}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-7 py-3.5 font-sans text-sm font-medium tracking-wide tabular-nums text-navy hover:border-brass phone"
              >
                {PHONE_SVG}
                {practice.phone}
              </a>
            </div>
          </div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

/**
 * Sticky booking bar, mobile only.
 *
 * The right padding clears the LeadConnector chat bubble, which is fixed in the
 * bottom-right corner and would otherwise sit on top of the Schedule button.
 * The spacer keeps the bar from covering the last of the footer.
 */
export function StickyBookingBar() {
  return (
    <>
      <div aria-hidden="true" className="h-[76px] lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-off-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2 px-4 pt-2.5 pr-[84px] pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <a
            href={practice.phoneHref} data-phone={practice.phone}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line px-3 font-sans text-sm font-semibold tabular-nums text-navy phone"
          >
            {PHONE_SVG}
            Call
          </a>
          <Link
            href="/request-appointment"
            className="inline-flex min-h-11 flex-[1.4] items-center justify-center rounded-full border border-brass bg-brass px-3 font-sans text-sm font-semibold text-navy-deep"
          >
            Schedule
          </Link>
        </div>
      </div>
    </>
  );
}
