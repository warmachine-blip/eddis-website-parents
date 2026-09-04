import type { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import NimblrScheduler from "@/components/nimblr-scheduler";
import { practice } from "@/lib/nav";
import { scheduling } from "@/lib/scheduling";

export const metadata: Metadata = {
  title: "Request an Appointment",
  description:
    "Book an appointment at HTx Pain Institute in Houston or Humble online in a few minutes, or call us. Same-week consultations available.",
};

const nextSteps = [
  {
    number: "1",
    body: "Pick a time in the scheduler and you will receive a confirmation from our scheduling system.",
  },
  {
    number: "2",
    body: "We verify benefits and walk you through coverage.",
  },
  {
    number: "3",
    body: "You arrive, complete a brief intake, and meet with Dr. Baumgartner or Allison Turner, DNP.",
  },
  {
    number: "4",
    body: "Together we build your personalized plan.",
  },
];

export default function RequestAppointmentPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Request Appointment" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Request Appointment
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Schedule your consultation.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Same-week consultations are typically available. Pick a time in the
            scheduler below, or call us and our front desk will book you on the spot.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <NimblrScheduler />
          </div>

          <div className="space-y-8 lg:col-span-5">
            <div className="rounded-2xl border border-line bg-off-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                Faster?
              </p>
              <h2 className="mt-1.5 font-serif text-xl text-navy">Call us directly.</h2>
              <p className="mt-1.5 text-sm text-charcoal-soft">
                Our front desk can typically schedule you on the spot — and answer
                any questions about your visit.
              </p>
              <a
                href={practice.phoneHref}
                className="mt-5 inline-block rounded-full border border-brass bg-brass px-6 py-3 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
              >
                {practice.phone}
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-off-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                Already booked?
              </p>
              <h2 className="mt-1.5 font-serif text-xl text-navy">Reschedule an appointment.</h2>
              <p className="mt-1.5 text-sm text-charcoal-soft">
                Change or cancel an existing appointment through our scheduling system.
              </p>
              <a
                href={scheduling.manageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full border border-navy px-6 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:bg-navy hover:text-off-white"
              >
                Reschedule an appointment
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-pearl p-7">
              <h2 className="font-serif text-lg text-navy">What Happens Next</h2>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step) => (
                  <li key={step.number} className="flex gap-4">
                    <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-navy-deep font-sans text-xs font-semibold text-off-white">
                      {step.number}
                    </span>
                    <p className="text-sm leading-relaxed text-charcoal-soft">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-4 rounded-2xl border border-line bg-white p-7">
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-brass-text">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <p className="text-sm leading-relaxed text-charcoal-soft">
                  Booking runs through Nimblr, our online appointment scheduler. What you
                  enter there goes to Nimblr and to our office to book your visit, so
                  please save medical details for your call or visit.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-brass-text">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                <p className="text-sm leading-relaxed text-charcoal-soft">
                  Same-week consultations are typically available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
