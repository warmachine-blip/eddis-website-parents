import type { Metadata } from "next";
import Link from "next/link";
import BookingConversion from "@/components/booking-conversion";
import { practice } from "@/lib/nav";
import { scheduling } from "@/lib/scheduling";

export const metadata: Metadata = {
  title: "Appointment Confirmed",
  description:
    "Your appointment with HTx Pain Institute is confirmed. Here is what happens next before your visit.",
  // A booking end-point, not a landing page: it should never rank or be
  // crawled, but its links back into the site are still worth following.
  robots: { index: false, follow: true },
  alternates: { canonical: "/appointment-confirmed" },
};

const nextSteps = [
  {
    number: "1",
    title: "Check your email and phone",
    body: "A confirmation from our scheduling system is on its way, with your date, time, and office address. Reminders follow as your visit approaches.",
  },
  {
    number: "2",
    title: "We verify your benefits",
    body: "Our team confirms your coverage ahead of time and calls you if anything needs clarifying — so there are no surprises at the desk.",
  },
  {
    number: "3",
    title: "Bring a few things with you",
    body: "Photo ID, your insurance card, a list of current medications, and any prior imaging or records (MRI, CT, X-ray) you can get hold of.",
  },
  {
    number: "4",
    title: "Meet your clinician",
    body: "You will have a time-rich consultation with Dr. Baumgartner or Allison Turner, DNP, and leave with a personalized plan.",
  },
];

export default function AppointmentConfirmedPage() {
  return (
    <div>
      <BookingConversion />

      {/* Confirmation */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-brass shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-7 w-7 text-navy-deep"
            >
              <path d="m4 12.5 5 5L20 6.5" />
            </svg>
          </span>
          <p className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Appointment Confirmed
          </p>
          <h1 className="mt-5 text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            You&rsquo;re booked. We&rsquo;ll see you soon.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-off-white/90">
            Thank you for choosing {practice.name}. Your request is in our
            schedule and a confirmation is on its way to you by email and text.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-off-white/70">
            If anything about your booking doesn&rsquo;t look right — or you
            simply want to speak to someone — call us at{" "}
            <a
              href={practice.phoneHref}
              className="font-medium tabular-nums text-brass-light underline decoration-brass-light/50 underline-offset-4 hover:text-off-white"
            >
              {practice.phone}
            </a>{" "}
            and our front desk will sort it out.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={practice.phoneHref}
              className="rounded-full border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Call {practice.phone}
            </a>
            <Link
              href="/"
              className="rounded-full border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white"
            >
              Back to the site
            </Link>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
            <span className="h-px w-8 bg-current opacity-50" />
            What Happens Next
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight text-navy">
            Between now and your visit.
          </h2>

          <ol className="mt-10 space-y-6">
            {nextSteps.map((step) => (
              <li
                key={step.number}
                className="flex gap-5 rounded-2xl border border-line bg-off-white p-6 sm:p-7"
              >
                <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-navy-deep font-sans text-xs font-semibold text-off-white">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-navy">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-off-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                Need to change it?
              </p>
              <h3 className="mt-1.5 font-serif text-lg text-navy">
                Reschedule or cancel.
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">
                Manage your appointment online at any time, or call us and
                we&rsquo;ll move it for you.
              </p>
              <a
                href={scheduling.manageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full border border-navy px-6 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:bg-navy hover:text-off-white"
              >
                Manage appointment
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-off-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                Before you come in
              </p>
              <h3 className="mt-1.5 font-serif text-lg text-navy">
                Get a head start.
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">
                Patient forms, what to bring, and how insurance works at our
                practice — all in one place.
              </p>
              <Link
                href="/patients"
                className="mt-5 inline-block rounded-full border border-navy px-6 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:bg-navy hover:text-off-white"
              >
                Patient resources
              </Link>
            </div>
          </div>

          <p className="mt-10 text-sm leading-relaxed text-charcoal-soft">
            Not sure which office you booked? Both are listed with directions and
            hours on our{" "}
            <Link href="/locations" className="font-medium text-brass-text underline underline-offset-2">
              locations page
            </Link>
            . If you are experiencing a medical emergency, call 911.
          </p>
        </div>
      </section>
    </div>
  );
}
