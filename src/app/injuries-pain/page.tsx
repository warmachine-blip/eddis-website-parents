import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { IconBadge } from "@/components/icon-badge";
import SectionHeading from "@/components/section-heading";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Injury Pain — Work Injuries & Motor Vehicle Accidents · HTx Pain Institute",
  description:
    "Comprehensive interventional pain care for workplace injuries and motor vehicle accidents in Houston. Coordinated with workers' compensation carriers, attorneys, and case managers.",
};

const injuryTypes = [
  {
    title: "Work Injuries & Accidents",
    body: "Comprehensive care for workplace injuries — back and neck strain, repetitive stress, and post-incident pain. We coordinate with workers' compensation carriers and case managers.",
    href: "/work-injuries-accidents",
    icon: "shield",
  },
  {
    title: "Motor Vehicle Injuries",
    body: "Whiplash, post-concussive headaches, and chronic spine pain after a collision are among the most under-diagnosed injuries we see. We provide thorough documentation for legal counsel.",
    href: "/motor-vehicle-injuries",
    icon: "pulse",
  },
] as const;

const features = [
  {
    title: "Thorough Documentation",
    body: "Detailed clinical notes that meet the evidentiary standards expected by carriers and counsel.",
    icon: "shield",
  },
  {
    title: "Workers' Comp & PI Friendly",
    body: "We coordinate seamlessly with workers' compensation carriers and personal-injury attorneys.",
    icon: "pulse",
  },
  {
    title: "Case Manager Coordination",
    body: "Open communication with adjusters, nurse case managers, and treating attorneys.",
    icon: "bolt",
  },
  {
    title: "Patient-First, Always",
    body: "Your treatment plan is dictated by your clinical needs — not by the case file.",
    icon: "alert",
  },
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function InjuriesPainPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Injuries & Accidents" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Injuries &amp; Accidents
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Hurt at work or in a collision? We can help.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            A thorough, evidence-driven approach to injury-related pain —
            clinically rigorous, professionally documented, and always centered on
            the patient.
          </p>
        </div>
      </section>

      {/* Injury type cards */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {injuryTypes.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-line bg-off-white p-7 transition-all hover:-translate-y-0.5 hover:border-brass hover:shadow-md"
              >
                <span className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-pearl" />
                <IconBadge icon={item.icon} tone="dark" />
                <h3 className="relative mt-6 font-serif text-xl text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                  {item.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-brass-text">
                  Learn more
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical excellence */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="Case Support"
          title="Clinical excellence with the documentation rigor your case requires."
          lead="We know that injury cases come with both clinical and administrative demands. We are equipped for both."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <IconBadge icon={feature.icon} tone="dark" />
              <h3 className="mt-6 font-serif text-lg leading-tight text-navy">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                {feature.body}
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
            Don&rsquo;t Wait
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl">
            Earlier care leads to better outcomes — both clinical and legal.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-off-white/70">
            The sooner injury-related pain is professionally evaluated and
            documented, the better — for your recovery and your case.
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
