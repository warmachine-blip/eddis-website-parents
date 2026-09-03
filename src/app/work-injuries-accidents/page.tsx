import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { IconBadge } from "@/components/icon-badge";
import SectionHeading from "@/components/section-heading";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Work Injuries & Accidents in Houston",
  description:
    "Comprehensive pain management for workplace injuries — back, neck, and joint pain after lifting, repetitive stress, falls, and on-the-job accidents. Houston and Humble.",
};

const commonInjuries = [
  "Lumbar and cervical strain",
  "Disc herniation",
  "Facet joint injury",
  "SI joint dysfunction",
  "Repetitive-stress syndromes",
  "Post-traumatic neuropathic pain",
];

const whatToExpect = [
  "Thorough initial evaluation",
  "Imaging review with you",
  "Stepwise treatment plan",
  "Clear documentation throughout",
  "Regular progress assessments",
];

const documentation = [
  "Detailed clinical notes",
  "Causation discussion when appropriate",
  "Progress and impairment notes",
  "Direct adjuster/case-manager contact",
];

const heroTitle = "Pain after a workplace injury — done right.";

function InfoGridCard({ icon, title, items }: { icon: "shield" | "pulse" | "alert"; title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <IconBadge icon={icon} tone="cyan" />
      <h3 className="mt-6 font-serif text-lg leading-tight text-navy">{title}</h3>
      <ul className="mt-5 grid gap-2.5 text-sm text-charcoal-soft">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 leading-relaxed">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass-deep" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WorkInjuriesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Injuries & Accidents", href: "/injuries-pain" }, { label: "Work Injuries & Accidents" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Work Injuries &amp; Accidents
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            {heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Workplace injuries are some of the most under-treated pain syndromes
            we see. The right plan starts with the right diagnosis — and the
            right documentation.
          </p>
        </div>
      </section>

      {/* Whole picture */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <div className="sticky top-32 grid gap-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/images/treatment-work-injuries-treatment.jpg"
                  alt="Workplace injury pain treatment at HTx Pain Institute"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="rounded-2xl border border-brass-deep/40 bg-white p-7">
                <h2 className="font-serif text-lg text-navy">
                  For Attorneys &amp; Adjusters
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">
                  Detailed records, timely reporting, and direct physician contact when
                  needed. Reach our office to coordinate.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-text"
                >
                  Contact us about a case
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-12">
              <div>
                <SectionHeading
                  eyebrow="Our Approach"
                  title="We treat the whole picture, not just the injury report."
                  lead="Workplace injuries are rarely as simple as the initial report suggests. A back strain may mask a facet injury or disc herniation. A repetitive-stress complaint may have neuropathic features that conventional treatment misses. Our first job is to listen — and to look."
                />
                <p className="mt-4 text-base leading-relaxed text-charcoal-soft">
                  Once we have a complete diagnosis, we build a stepwise plan: conservative
                  measures, image-guided diagnostic blocks, and — where appropriate —
                  durable interventional treatments like radiofrequency ablation or spinal
                  cord stimulation.
                </p>
              </div>

              <SectionHeading
                eyebrow="Coordination"
                title="Coordinated with your carrier and your case team."
                lead="We know that workers' compensation cases come with paperwork, deadlines, and adjuster expectations. We are equipped to meet those requirements without compromising the clinical care you actually need. Our staff has direct lines to adjusters and nurse case managers when needed."
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InfoGridCard icon="shield" title="Common Injuries" items={commonInjuries} />
                <InfoGridCard icon="pulse" title="What to Expect" items={whatToExpect} />
                <InfoGridCard icon="alert" title="Documentation" items={documentation} />
              </div>
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
