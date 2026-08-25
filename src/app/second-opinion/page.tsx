import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { CheckBullet, IconBadge } from "@/components/icon-badge";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Second Opinion Consultations · HTx Pain Institute",
  description:
    "Considering surgery or stuck on long-term medication? Get a thorough, evidence-based second opinion at HTx Pain Institute in Houston.",
};

const considerations = [
  "You've been told you need surgery and want a closer look.",
  "You've been on long-term opioids and want a real path off them.",
  "You're getting injections that haven't worked — or have stopped working.",
  "You have a diagnosis but doubt it's complete.",
  "You're considering an implanted device (e.g., spinal cord stimulator).",
];

const howItWorks = [
  {
    number: "1",
    title: "Records review",
    body: "We review your prior imaging, procedures, and notes — before you even arrive.",
  },
  {
    number: "2",
    title: "Comprehensive consultation",
    body: "Time-rich consultation with a focused physical exam and direct discussion.",
  },
  {
    number: "3",
    title: "Honest, written plan",
    body: "A clear written impression and recommendation — including referrals if needed.",
  },
];

const pillars = [
  {
    icon: "shield" as const,
    title: "Evidence-Based",
    body: "Our recommendations are grounded in current peer-reviewed evidence.",
  },
  {
    icon: "bolt" as const,
    title: "Modern Toolkit",
    body: "Access to procedures and devices that may not have been offered to you yet.",
  },
  {
    icon: "alert" as const,
    title: "Patient-First",
    body: "Your priorities — work, sleep, family, fitness — drive the plan.",
  },
];

export default function SecondOpinionPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Second Opinion" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Second Opinion
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Looking for a second opinion?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Experience exceptional care with our pain specialists. A second opinion
            is one of the highest-leverage decisions a chronic-pain patient can
            make.
          </p>
        </div>
      </section>

      {/* Why get a second opinion */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
              Why Get a Second Opinion
            </p>
            <h2 className="mt-3 max-w-2xl text-balance font-serif text-3xl leading-[1.1] text-navy sm:text-4xl lg:text-[2.75rem]">
              Pain medicine has changed. The plan you were given five — or even
              two — years ago may no longer be the best one for you.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-charcoal-soft">
              A second opinion is not adversarial — it&rsquo;s diligent.
              Bringing fresh eyes, a different framework, and current evidence
              to a long-running problem is one of the most responsible things
              a patient can do.
            </p>

            <ul className="mt-10 flex flex-col gap-4">
              {considerations.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white p-5 text-sm leading-relaxed text-charcoal-soft shadow-sm"
                >
                  <CheckBullet tone="cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 flex flex-col gap-6">
              <div className="rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-8 text-off-white sm:p-10">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-light">
                  <span className="h-px w-8 bg-current opacity-70" />
                  A Different Approach
                </span>
                <h3 className="mt-5 text-balance font-serif text-2xl leading-tight text-off-white sm:text-3xl">
                  Time. Listening. Honest plan.
                </h3>
                <p className="mt-4 text-pretty text-base leading-relaxed text-off-white/85">
                  Our second-opinion consultations are designed for the
                  realities of chronic pain. We block the time, we read the
                  records, and we give you a written plan you can act on.
                </p>
                <Link
                  href="/request-appointment"
                  className="mt-8 inline-flex rounded-full border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
                >
                  Request Second Opinion
                </Link>
              </div>

              <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
                  How It Works
                </p>
                <ol className="mt-6 flex flex-col gap-6">
                  {howItWorks.map((step) => (
                    <li key={step.number} className="flex items-start gap-4">
                      <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-navy-deep font-sans text-sm font-semibold text-off-white">
                        {step.number}
                      </span>
                      <div>
                        <h4 className="font-serif text-lg leading-tight text-navy">
                          {step.title}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl bg-pearl p-7">
              <IconBadge icon={pillar.icon} tone="dark" />
              <h3 className="mt-6 font-serif text-xl text-navy">{pillar.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-charcoal-soft">
                {pillar.body}
              </p>
            </div>
          ))}
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
            Bring fresh eyes to your pain. Schedule your second opinion today.
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
              Request Second Opinion
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
