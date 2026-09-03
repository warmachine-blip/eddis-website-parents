import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import SectionHeading from "@/components/section-heading";
import { CheckBullet, IconBadge } from "@/components/icon-badge";
import { practice } from "@/lib/nav";
import { acceptedPlans } from "@/lib/insurance";

export const metadata: Metadata = {
  title: "Patient Resources",
  description:
    "Everything you need before, during, and after your visit to HTx Pain Institute — insurance, what to expect, video library, and more.",
};

const resourceCards = [
  {
    title: "Video Library",
    body: "Physician interviews, patient education, and practice stories — visual where words fall short.",
    linkLabel: "Watch the library",
    href: "/video-library",
    icon: "bolt",
    tone: "dark",
  },
  {
    title: "Request an Appointment",
    body: "Same-week consultations are typically available. Most major insurance accepted.",
    linkLabel: "Request appointment",
    href: "/request-appointment",
    icon: "alert",
    tone: "dark",
  },
  {
    title: "Get a Second Opinion",
    body: "Considering surgery? Stuck on long-term medication? Our second-opinion consultations offer clarity.",
    linkLabel: "Learn about second opinions",
    href: "/second-opinion",
    icon: "shield",
    tone: "dark",
  },
] as const;

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    body: "An unhurried review of your history, exam, imaging, and prior treatments. We listen first.",
  },
  {
    number: "02",
    title: "Personalized Plan",
    body: "A stepwise, evidence-based plan tailored to your pain pattern, goals, and life.",
  },
  {
    number: "03",
    title: "Procedure & Recovery",
    body: "Most procedures are outpatient. We explain everything before, during, and after.",
  },
  {
    number: "04",
    title: "Follow-Up & Refinement",
    body: "We measure outcomes carefully and refine your plan as needed.",
  },
];

const plans = acceptedPlans;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PatientsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Patients" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Patient Resources
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Everything you need — before, during, and after your visit.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Resources designed to make care here feel clear, calm, and accountable.
            If you need anything that isn&rsquo;t here, call us — we&rsquo;ll send it
            your way.
          </p>
        </div>
      </section>

      {/* Resource cards */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resourceCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-off-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <IconBadge icon={card.icon} tone={card.tone} />
                <h2 className="mt-7 font-serif text-xl leading-tight text-navy">{card.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-soft">
                  {card.body}
                </p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-text">
                  {card.linkLabel}
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="Your First Visit"
          title="What to expect."
          lead="A clear, four-step path from your first call to lasting relief."
          align="center"
        />
        <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="h-full rounded-2xl border border-line bg-pearl p-7">
              <span className="font-serif text-4xl text-brass-deep">{step.number}</span>
              <h3 className="mt-5 font-serif text-lg leading-tight text-navy">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Insurance */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                <span className="h-px w-8 bg-current opacity-50" />
                Insurance &amp; Billing
              </span>
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                We work with most major plans.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                Insurance shouldn&rsquo;t be a barrier to care. Our team will verify
                benefits and walk you through your specific plan before any
                procedure. If we are out-of-network for your plan, we&rsquo;ll tell
                you immediately.
              </p>
              <ul className="mt-7 grid gap-3">
                {plans.map((plan) => (
                  <li key={plan} className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-soft">
                    <CheckBullet tone="cyan" />
                    {plan}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={practice.phoneHref}
                  className="rounded-full border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
                >
                  Verify Benefits — {practice.phone}
                </a>
                <Link href="/contact" className="text-sm font-medium text-navy underline">
                  Send us a question
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-10 text-off-white shadow-md">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-light">
                  Patient Forms
                </p>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-off-white">
                  New patient? Save time at check-in.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-off-white/90">
                  Complete your intake forms before your appointment. We can also
                  email or mail them to you — whichever you prefer.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${practice.email}?subject=${encodeURIComponent("Patient Forms Request")}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-navy-deep hover:bg-brass-light"
                  >
                    Request Forms
                    <ArrowIcon />
                  </a>
                  <Link
                    href="/request-appointment"
                    className="text-sm font-semibold text-off-white underline-offset-4 hover:underline"
                  >
                    Request appointment instead
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcoming space */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-line">
              <Image
                src="/images/lobby.webp"
                alt="The welcoming front lobby at HTx Pain Institute in Houston"
                fill
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our Environment"
              title="A welcoming space — designed for your comfort."
              lead="Our practice was intentionally designed to feel calm and unhurried — a quiet contrast to the high-volume clinics most pain patients have already endured. From check-in to follow-up, you'll find a team that has the time and the focus to truly listen."
            />
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
