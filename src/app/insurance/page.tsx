import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import SectionHeading from "@/components/section-heading";
import { CheckBullet, IconBadge } from "@/components/icon-badge";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Insurance & Financing — HTx Pain Institute Houston · HTx Pain Institute",
  description:
    "Most major insurance accepted at HTx Pain Institute. We verify your benefits before your visit and offer financing options. Call (832) 990-8600.",
};

const plans = [
  "Aetna",
  "Blue Cross Blue Shield (Texas)",
  "Cigna",
  "Humana",
  "Medicare",
  "Medicare Advantage plans",
  "TRICARE",
  "UnitedHealthcare",
  "Workers' Compensation (most carriers)",
  "Auto Liability / Letters of Protection",
];

const steps = [
  {
    title: "Share your insurance information",
    body: "When you request an appointment online or by phone, share your card details. We collect everything we need to verify your benefits.",
  },
  {
    title: "We verify before your visit",
    body: "Our team contacts your insurer to confirm coverage, copays, deductibles, and any prior-authorization requirements — before you walk in the door.",
  },
  {
    title: "We explain the numbers in plain English",
    body: "You'll know what you owe, what's covered, and what (if any) prior authorizations are needed. No surprises at checkout.",
  },
  {
    title: "Financing if you need it",
    body: "For self-pay services or larger out-of-pocket procedures, we offer transparent financing options through CareCredit and similar programs.",
  },
];

const faqs = [
  {
    q: "Do you take Medicare?",
    a: "Yes — including Medicare Advantage.",
  },
  {
    q: "What about workers’ comp?",
    a: "Yes, we accept most carriers and coordinate with case managers.",
  },
  {
    q: "What if my plan isn’t listed?",
    a: "Call us. The list is not exhaustive — verification is the reliable answer.",
  },
];

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function InsurancePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Patients", href: "/patients" },
              { label: "Insurance & Financing" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Insurance &amp; Financing
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            We verify your benefits
            <br />
            <em className="italic text-brass-light">before your visit.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            HTx Pain Institute is in-network with most major insurance carriers in
            the Houston market — and our team handles the legwork so you don&rsquo;t
            have to.
          </p>
        </div>
      </section>

      {/* Accepted insurance + verify card */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Accepted Insurance"
              title="Major commercial, Medicare, and government plans."
              lead="This is not a complete list — and individual plans within each carrier vary. The most reliable way to confirm in-network status for your specific plan is to call us. We verify benefits as part of the new-patient intake at no cost to you."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {plans.map((plan) => (
                <li
                  key={plan}
                  className="flex items-start gap-3 rounded-xl border border-line bg-off-white px-5 py-4"
                >
                  <CheckBullet tone="brass" />
                  <span className="text-sm leading-relaxed text-charcoal-soft">{plan}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-32 grid gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-7 text-off-white shadow-md">
                <IconBadge icon="bolt" tone="brassSolid" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-brass-light">
                  Verify your benefits
                </p>
                <p className="mt-2 font-serif text-2xl leading-tight text-off-white">
                  Call us — we&rsquo;ll handle the rest.
                </p>
                <a
                  href={practice.phoneHref}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-semibold text-navy-deep hover:bg-brass-light"
                >
                  <PhoneIcon />
                  {practice.phone}
                </a>
              </div>
              <div className="rounded-2xl border border-line bg-off-white p-7 shadow-sm">
                <IconBadge icon="shield" tone="dark" />
                <p className="mt-4 font-serif text-xl leading-tight text-navy">
                  Need a Letter of Protection?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                  For motor-vehicle and work-injury cases, we work with carriers,
                  attorneys, and case managers and accept Letters of Protection. Tell
                  us when you call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four steps */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
          <span className="h-px w-8 bg-current opacity-50" />
          How Verification Works
        </span>
        <h3 className="mt-5 max-w-3xl text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
          Four steps. No surprises at checkout.
        </h3>
        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="h-full rounded-2xl border border-line bg-pearl p-6">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-deep font-serif text-sm text-off-white">
                {i + 1}
              </span>
              <h4 className="mt-5 font-serif text-lg leading-tight text-navy">
                {step.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Self-pay & financing + common questions */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 rounded-2xl border border-line bg-off-white p-10 sm:p-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <IconBadge icon="shield" tone="brass" />
              <h3 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                Self-pay &amp; financing options
              </h3>
              <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                Some services — particularly elective regenerative therapies like PRP
                and certain wellness programs — are not covered by most insurance
                plans. We provide{" "}
                <span className="font-semibold text-navy">
                  transparent self-pay pricing
                </span>{" "}
                up front and offer{" "}
                <span className="font-semibold text-navy">CareCredit financing</span>{" "}
                for patients who would prefer to spread payment over time.
              </p>
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                Common questions
              </p>
              <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-charcoal-soft">
                {faqs.map((faq) => (
                  <li key={faq.q}>
                    <span className="font-semibold text-navy">{faq.q}</span> {faq.a}
                  </li>
                ))}
              </ul>
              <Link
                href="/request-appointment"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-off-white hover:bg-navy-deep"
              >
                Request Appointment
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-24">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Ready When You Are
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl">
            Get the care you deserve. Schedule your consultation today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-off-white/70">
            Two Houston-area locations. Same-week consults available. Most insurance
            accepted.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/request-appointment"
              className="rounded-full border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Request Appointment
            </Link>
            <a
              href={practice.phoneHref}
              className="rounded-full border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
