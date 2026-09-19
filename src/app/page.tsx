import Image from "next/image";
import Link from "next/link";
import HeroBackground from "@/components/hero-background";
import HeroHeadline from "@/components/hero-headline";
import SectionHeading from "@/components/section-heading";
import { IconBadge } from "@/components/icon-badge";
import ScrollStroke from "@/components/scroll-stroke";
import ServiceCard, { ServiceBanner } from "@/components/service-card";
import { TiltCard, TiltCardGroup } from "@/components/tilt-card";
import ConditionCard from "@/components/condition-card";
import ReviewsSection from "@/components/reviews-section";
import { services } from "@/lib/services";
import { conditions } from "@/lib/conditions";
import { reviews } from "@/lib/reviews";
import { txTopDocsUrl } from "@/lib/social";
import { offices, practice } from "@/lib/nav";
import FinalCta from "@/components/final-cta";

const heroStats: { value: string; label: string; href?: string }[] = [
  { value: "15+", label: "Years Experience" },
  { value: "10K+", label: "Procedures" },
  {
    value: `${reviews.rating}★`,
    label: `${reviews.reviewCountFloor} Reviews`,
    href: "#reviews",
  },
];

const valueProps = [
  { title: "Image-Guided", subtitle: "Precision Procedures" },
  { title: "Same-Week", subtitle: "Appointments" },
  { title: "Concierge", subtitle: "Patient Experience" },
  { title: "In-Network", subtitle: "Major Insurers" },
];

const credentials = [
  {
    icon: "shield" as const,
    title: "Double Board-Certified",
    subtitle: "Anesthesiology · Pain Medicine",
  },
  { icon: "cap" as const, title: "Rush University", subtitle: "Residency · Fellowship" },
  {
    icon: "award" as const,
    title: "Research Fellowship",
    subtitle: "Alpha Omega Alpha Research Fellowship, a research scholarship",
  },
  {
    icon: "stethoscope" as const,
    title: "Medical Director",
    subtitle: "US Pain & Spine Hospital, before founding the practice",
  },
];

const whyHtx = [
  {
    title: "Nothing To Gain",
    body: "Nothing about his recommendation depends on whether you have surgery. He is not the one who would perform it.",
  },
  {
    title: "Double Board-Certified",
    body: "Anesthesiology taught him the anatomy and the imaging. Pain Medicine taught him to work out which structure is causing the pain before anything gets treated.",
  },
  {
    title: "Time to Get It Right",
    body: "He left group practice to build a clinic where the diagnosis gets the hour it needs. The wrong procedure is not a small mistake.",
  },
  {
    title: "Treatment, Not Maintenance",
    body: "Genicular RFA for knees. PRP for tendons and joints. Intracept and spinal cord stimulation for the spine. All aimed at the source, so you are not left managing pain on medication.",
  },
];

const injuries = [
  {
    title: "Work Injuries & Accidents",
    body: "Comprehensive care for workplace injuries — back and neck strain, repetitive stress, and post-incident pain. We coordinate with workers' compensation carriers and case managers.",
    href: "/work-injuries-accidents",
  },
  {
    title: "Motor Vehicle Injuries",
    body: "Whiplash, post-concussive headaches, and chronic spine pain after a collision are among the most under-diagnosed injuries we see. We provide thorough documentation for legal counsel.",
    href: "/motor-vehicle-injuries",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center overflow-hidden bg-charcoal max-md:min-h-[70svh] max-md:flex-col md:min-h-[88svh]">
        <HeroBackground />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-[100px]">
          <div className="max-w-[480px] text-off-white">
            <div className="mb-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
              <span className="h-px w-8 bg-brass-light" aria-hidden="true" />
              {practice.tagline}
            </div>

            <HeroHeadline />

            <p className="mb-11 max-w-[520px] text-[20px] leading-[1.6] text-off-white/85 max-md:text-[17px]">
              Most back and joint pain never needs an operation. We find what is
              causing yours, treat it directly, and tell you plainly if surgery
              is the right answer.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/request-appointment"
                className="border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep transition-colors hover:bg-brass-light"
              >
                Book Consultation
              </Link>
              <Link
                href="#services"
                className="border border-off-white bg-transparent px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white transition-colors hover:bg-off-white hover:text-navy-deep"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 z-10 flex gap-10 rounded-sm border border-brass-deep/35 bg-pearl/95 px-8 py-[22px] backdrop-blur-[10px] max-md:static max-md:mx-5 max-md:mb-10 max-md:gap-5 max-md:bg-pearl max-md:px-5 max-md:py-[18px]">
          {heroStats.map((stat) => {
            const body = (
              <>
                <div className="mb-1 font-serif text-[32px] font-medium leading-none text-brass-deep max-md:text-[24px]">
                  {stat.value}
                </div>
                <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-charcoal-soft">
                  {stat.label}
                </div>
              </>
            );
            return stat.href ? (
              <Link
                key={stat.label}
                href={stat.href}
                className="rounded-sm text-center transition-opacity hover:opacity-75"
              >
                {body}
              </Link>
            ) : (
              <div key={stat.label} className="text-center">
                {body}
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line bg-navy-deep">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4 lg:px-10">
          {valueProps.map((v) => (
            <div key={v.title} className="text-center">
              <p className="font-serif text-lg text-brass-light">{v.title}</p>
              <p className="mt-1 font-sans text-xs uppercase tracking-wide text-off-white/60">
                {v.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ScrollStroke />

      {/* Physician */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="group relative aspect-[3/2] w-full overflow-hidden border border-line">
              <Image
                src="/images/dr-baumgartner.webp"
                alt="Edward Baumgartner Jr., MD at HTx Pain Institute"
                fill
                sizes="(min-width: 1024px) 560px, calc(100vw - 48px)"
                className="object-cover object-[50%_18%]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent"
                aria-hidden="true"
              />

              <a
                href="https://www.youtube.com/watch?v=G9UXJJICk-w"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Play video: Meet Dr. Edward Baumgartner, on YouTube"
                className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-charcoal/30 backdrop-blur-sm transition-transform hover:scale-105"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brass">
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-navy-deep" aria-hidden="true">
                    <path d="M8 5v14l11-7Z" />
                  </svg>
                </span>
              </a>

              {/* Overlay caption only from 640px up, where the photo is tall
                  enough to hold it clear of the centred play button. */}
              <div className="absolute inset-x-0 bottom-0 hidden p-6 sm:block">
                <span className="inline-block bg-charcoal/70 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-off-white">
                  Meet Your Physician
                </span>
                <p className="mt-3 max-w-sm font-serif text-2xl leading-tight text-off-white">
                  Why I founded HTx Pain — and what makes our care different.
                </p>
              </div>
            </div>

            {/* Phones: same caption, below the photo — legible, and it cannot
                collide with the play control however the text wraps. */}
            <div className="mt-4 sm:hidden">
              <span className="inline-block bg-navy-deep px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-off-white">
                Meet Your Physician
              </span>
              <p className="mt-3 font-serif text-xl leading-tight text-navy">
                Why I founded HTx Pain — and what makes our care different.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brass-text">
              <span className="h-px w-8 bg-brass" aria-hidden="true" />
              Meet Dr. Baumgartner
            </div>
            <h2 className="text-balance font-serif text-3xl leading-[1.15] text-navy sm:text-4xl lg:text-[2.75rem]">
              The physician you see before you agree to surgery.
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-charcoal-soft">
              <p>
                Edward Baumgartner Jr., MD does not perform joint replacements or
                open fusions. So when he tells you that you do not need one,
                there is nothing in it for him.
              </p>
              <p>
                He does operate: SI joint fusion, kyphoplasty and spinal cord
                stimulator implants, at Townsen Memorial Hospital. A Houston
                native, he founded this practice in 2018. Double board
                certification in Anesthesiology and Pain Medicine is what lets
                him find the structure causing your pain and treat it directly.
              </p>
            </div>

            <TiltCardGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {credentials.map((c) => (
                <TiltCard
                  key={c.title}
                  id={c.title}
                  className="rounded-xl border border-card-border bg-white p-5 shadow-[0_1px_3px_rgba(26,39,64,0.06),0_8px_24px_-4px_rgba(26,39,64,0.08)]"
                >
                  <IconBadge icon={c.icon} tone="brass" />
                  <p className="mt-4 font-serif text-lg text-navy">{c.title}</p>
                  <p className="mt-1 text-sm text-charcoal-soft">{c.subtitle}</p>
                </TiltCard>
              ))}
            </TiltCardGroup>

            {/* Third-party credential. Kept as a linked line rather than a fifth
                card so the 2x2 grid above stays balanced. */}
            <p className="mt-5 text-sm leading-relaxed text-charcoal-soft">
              Recognized as a{" "}
              <a
                href={txTopDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brass-text underline decoration-brass decoration-2 underline-offset-4 hover:text-navy"
              >
                Texas Top Doctor
              </a>
              .
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="/dr-edward-baumgartner"
                className="inline-flex items-center gap-2 bg-navy-deep px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-off-white transition-colors hover:bg-navy"
              >
                Read Full Bio
                <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                href="/request-appointment"
                className="inline-flex min-h-11 items-center font-sans text-sm font-semibold text-navy underline decoration-brass decoration-2 underline-offset-4 hover:text-brass-text"
              >
                Schedule with Dr. B
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-line bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <SectionHeading
            eyebrow="What We Treat"
            title="Modern interventional care, tailored to your pain."
            lead="Image-guided procedures, regenerative therapies, and the full modern pain-medicine toolkit — applied with the precision and judgment every patient deserves."
          />
          <TiltCardGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((service) => !service.comingSoon)
              .map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
          </TiltCardGroup>
          {services
            .filter((service) => service.comingSoon)
            .map((service) => (
              <div key={service.slug} className="mt-5">
                <ServiceBanner service={service} />
              </div>
            ))}
        </div>
      </section>

      {/* Pain Center */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Pain Center"
          title="The conditions we treat — with the expertise they require."
          lead="From neuropathic pain to chronic back pain, knee pain, and more — find the diagnosis that fits and the right path forward."
        />
        <TiltCardGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditions
            .filter((condition) => !condition.deEmphasized)
            .map((condition) => (
              <ConditionCard key={condition.slug} condition={condition} />
            ))}
        </TiltCardGroup>
        <div className="mt-10 text-center">
          <Link
            href="/pain-center"
            className="inline-flex items-center gap-2 bg-navy-deep px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-off-white transition-colors hover:bg-navy"
          >
            Explore the Pain Center
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Why HTx Pain */}
      <section className="border-t border-line bg-navy-deep text-off-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <SectionHeading
            tone="dark"
            eyebrow="Why HTx Pain"
            title="Why patients come here before they say yes to surgery."
            lead="Back and joint pain almost always has a specific source. Finding it takes time, imaging read properly, and a physician with no reason to reach for the operating room."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyHtx.map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-xl text-brass-light">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-off-white/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient reviews */}
      <ReviewsSection />

      {/* Injuries */}
      <section className="border-t border-line bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <SectionHeading
            eyebrow="Injuries"
            title="Injuries, accidents, and the documentation your case requires."
            lead="Specialized care for work injuries and motor vehicle accidents — coordinated with carriers, attorneys, and case managers."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {injuries.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group border border-line bg-off-white p-7 transition-colors hover:border-brass"
              >
                <h3 className="font-serif text-xl text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                  {item.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-brass-text">
                  Learn more
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
            <Link
              href="/injuries-pain"
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy underline decoration-brass decoration-2 underline-offset-4 hover:text-brass-text"
            >
              See all injury and accident care
            </Link>
        </div>
      </section>

      {/* Locations */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Locations"
          title="Two Houston-area offices, easy to reach."
          lead="Same-week appointments. Most insurance accepted. Ample parking at both locations."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {offices.map((office) => (
            <div key={office.key} className="border border-line p-7">
              <h3 className="font-serif text-xl text-navy">{office.label}</h3>
              <address className="mt-3 not-italic text-sm leading-relaxed text-charcoal-soft">
                {office.addressLine1}
                <br />
                {office.addressLine2}
                <br />
                <a href={practice.phoneHref} className="inline-flex min-h-11 items-center tabular-nums underline underline-offset-4 hover:text-brass-text">
                  {practice.phone}
                </a>
              </address>
              <p className="mt-3 text-sm text-charcoal-soft">
                {practice.hours}
                <br />
                {practice.hoursWeekend}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center border border-navy px-5 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:bg-navy hover:text-off-white"
                >
                  Get Directions
                </a>
                <a
                  href={practice.phoneHref}
                  className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:border-brass"
                >
                  Call this office
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <FinalCta surface="bordered" eyebrow="plain" />
    </>
  );
}
