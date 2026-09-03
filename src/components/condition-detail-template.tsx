import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import FaqAccordion from "@/components/faq-accordion";
import { IconBadge, InfoCard } from "@/components/icon-badge";
import SectionHeading from "@/components/section-heading";
import type { ConditionDetail } from "@/lib/condition-details";
import { practice } from "@/lib/nav";

export default function ConditionDetailTemplate({ data }: { data: ConditionDetail }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Pain Center", href: "/pain-center" },
              { label: data.title },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Pain Center
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            {data.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            {data.metaDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/request-appointment"
              className="border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Schedule Consultation
            </Link>
            <a
              href={practice.phoneHref}
              className="border border-off-white/40 px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Understanding */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <div className="sticky top-32 relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-line">
              <Image
                src={`/images/${data.heroImage}`}
                alt={data.heroImageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Overview" title={`Understanding ${data.title.toLowerCase()}.`} />
            {data.introParagraphs && data.introParagraphs.length > 0 ? (
              <div className="mt-6 space-y-4">
                {data.introParagraphs.map((p) => (
                  <p key={p} className="text-pretty text-base leading-relaxed text-charcoal-soft">
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-pretty text-base leading-relaxed text-charcoal-soft">{data.intro}</p>
            )}

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <InfoCard icon="pulse" tone="cyan" title="Common Symptoms" items={data.symptoms} />
              <InfoCard icon="pulse" tone="brass" title="Common Causes" items={data.causes} />
            </div>
          </div>
        </div>
      </section>

      {/* Approach / treatments */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
          <span className="h-px w-8 bg-current opacity-50" />
          Treatments at HTx Pain
        </span>
        <h2 className="mt-5 max-w-3xl text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
          {data.approachIntro}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.approachServices.map((service) => {
            const content = (
              <div className="group flex h-full flex-col rounded-2xl border border-line bg-pearl p-7 transition-all hover:-translate-y-0.5 hover:bg-off-white hover:shadow-md">
                <IconBadge icon="bolt" tone="brass" />
                <h3 className="mt-6 font-serif text-lg leading-tight text-navy">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-soft">{service.blurb}</p>
                {service.slug && (
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-text">
                    Learn more
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
            );
            return service.slug ? (
              <Link key={`${service.slug}-${service.title}`} href={`/${service.slug}`}>
                {content}
              </Link>
            ) : (
              <div key={service.title}>{content}</div>
            );
          })}
        </div>
      </section>

      {/* Diagnosis & workup / When to see a specialist */}
      {(data.diagnosisWorkup || data.whenToSeeSpecialist) && (
        <section className="bg-pearl">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {data.diagnosisWorkup && (
                <InfoCard icon="shield" tone="brass" title="Diagnosis & workup" items={data.diagnosisWorkup} />
              )}
              {data.whenToSeeSpecialist && (
                <InfoCard icon="alert" tone="navy" title="When to see a specialist" items={data.whenToSeeSpecialist} />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Recovery & outlook */}
      {data.recoveryOutlook && (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                <span className="h-px w-8 bg-current opacity-50" />
                Recovery & outlook
              </span>
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                What to expect over time.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base leading-relaxed text-charcoal-soft">{data.recoveryOutlook}</p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {data.faqs && (
        <section className="bg-navy-50">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                  <span className="h-px w-8 bg-current opacity-50" />
                  Common Questions
                </span>
                <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                  Direct answers — no jargon.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  If your question isn&rsquo;t here, ask us at your consultation.
                </p>
              </div>
              <div className="lg:col-span-7">
                <FaqAccordion faqs={data.faqs} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why HTx Pain Institute: philosophy */}
      {data.philosophyBlurb && (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-10 text-off-white sm:p-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
                <span className="h-px w-8 bg-current opacity-70" />
                Why HTx Pain Institute
              </span>
              <h2 className="mt-5 text-balance font-serif text-2xl leading-tight sm:text-3xl">
                {`How we treat ${data.title.toLowerCase()}, differently.`}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base leading-relaxed text-off-white/90">{data.philosophyBlurb}</p>
            </div>
          </div>
        </section>
      )}

      {/* Related conditions */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
            Other conditions we treat.
          </h2>
          <Link href="/pain-center" className="text-sm font-medium text-navy underline">
            See all conditions
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.relatedConditions.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-off-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="font-serif text-lg leading-tight text-navy">{c.title}</h3>
              <span className="mt-2 line-clamp-2 text-sm text-charcoal-soft">{c.blurb}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-text">
                Learn more
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Medically reviewed + final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 pt-10 text-center lg:px-10">
          <p className="font-sans text-xs uppercase tracking-wide text-off-white/60">Medically Reviewed</p>
          <p className="mt-1 text-sm text-off-white/70">
            Reviewed by Edward Baumgartner Jr., MD. Information on this page is not medical
            advice. Always consult your physician.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-20">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Ready When You Are
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl">
            Get the care you deserve. Schedule your consultation today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-off-white/70">
            Two Houston-area locations. Same-week consults available. Most insurance accepted.
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
