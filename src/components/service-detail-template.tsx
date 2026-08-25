import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import FaqAccordion from "@/components/faq-accordion";
import { IconBadge, InfoCard } from "@/components/icon-badge";
import SectionHeading from "@/components/section-heading";
import type { ServiceDetail } from "@/lib/service-details";
import { practice } from "@/lib/nav";

export default function ServiceDetailTemplate({ data }: { data: ServiceDetail }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: data.title },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            {data.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            {data.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">{data.leadLine}</p>
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

      {/* Treatment overview */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:items-start lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <IconBadge icon="bolt" tone="cyan" />
            <SectionHeading
              eyebrow="Treatment Overview"
              title="Built around the patient — not the procedure."
              lead={data.intro}
            />
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-32 grid gap-4">
              <div className="rounded-2xl border border-line bg-off-white p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                  Quick Facts
                </p>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
                    <dt className="font-medium text-muted">Setting</dt>
                    <dd className="font-semibold text-navy">Outpatient</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
                    <dt className="font-medium text-muted">Anesthesia</dt>
                    <dd className="font-semibold text-navy">Local + light sedation</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
                    <dt className="font-medium text-muted">Recovery</dt>
                    <dd className="font-semibold text-navy">Same / next day</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="font-medium text-muted">Provided by</dt>
                    <dd className="text-right font-semibold text-navy">Dr. Baumgartner</dd>
                  </div>
                </dl>
                <Link
                  href="/request-appointment"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-off-white hover:bg-navy"
                >
                  Schedule Consultation
                </Link>
              </div>
              <div className="relative isolate aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                <Image
                  src={`/images/${data.heroImage}`}
                  alt={data.heroImageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-step */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="mt-10">
          <h3 className="font-serif text-xl text-navy">A clear, step-by-step approach.</h3>
          <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.steps.map((step, i) => (
              <li key={step} className="border-t-2 border-brass pt-4">
                <span className="font-serif text-2xl text-brass-deep">{i + 1}</span>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-line pt-10 md:grid-cols-3">
          <InfoCard icon="shield" tone="cyan" title="Who is it for" items={data.whoIsItFor} />
          <InfoCard icon="shield" tone="cyan" title="What to expect" items={data.whatToExpect} />
          <InfoCard icon="shield" tone="cyan" title="Recovery & results" items={data.recoveryResults} />
        </div>
      </section>

      {/* Risks */}
      <section className="bg-off-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                <span className="h-px w-8 bg-current opacity-50" />
                Risks & Side Effects
              </span>
              <h3 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                Honest about what to expect.
              </h3>
              <p className="mt-5 text-base leading-relaxed text-charcoal-soft">{data.risksIntro}</p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-3">
                {data.risks.map((risk) => (
                  <li
                    key={risk}
                    className="flex items-start gap-4 rounded-2xl border border-line bg-pearl p-5 text-sm leading-relaxed text-charcoal-soft"
                  >
                    <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-brass/10 text-brass-text">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                <span className="h-px w-8 bg-current opacity-50" />
                FAQ
              </span>
              <h3 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                Direct answers — no jargon.
              </h3>
              <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                If your question isn&rsquo;t here, ask us at your consultation. We will give you the
                same answer in plain English.
              </p>
            </div>
            <div className="lg:col-span-7">
              <FaqAccordion faqs={data.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-10 rounded-2xl border border-line bg-pearl p-10 sm:p-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
              <span className="h-px w-8 bg-current opacity-50" />
              Cost, Insurance &amp; Financing
            </span>
            <h3 className="mt-5 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
              We verify your benefits before your visit.
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-soft">
              {data.insuranceBlurb}
            </p>
            <Link
              href="/insurance"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-off-white hover:bg-navy"
            >
              Insurance &amp; financing details
            </Link>
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
              Quick answers
            </h3>
            <dl className="mt-4 grid gap-3 text-sm leading-relaxed text-charcoal-soft">
              <div>
                <span className="font-semibold text-navy">Will my insurance cover this?</span> We
                check before your visit.
              </div>
              <div>
                <span className="font-semibold text-navy">Self-pay options?</span> Yes, with
                transparent pricing.
              </div>
              <div>
                <span className="font-semibold text-navy">Financing?</span> CareCredit and similar
                programs available.
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="Expertise"
          title={`The standard of ${data.eyebrow.toLowerCase()} care, raised to where it belongs.`}
        />
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-charcoal-soft">
          {data.expertiseBlurb}
        </p>
      </section>

      {/* Testimonial */}
      {data.testimonial && (
        <section className="border-t border-line bg-off-white">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10 lg:py-24">
            <IconBadge icon="shield" tone="brass" />
            <blockquote className="mt-6 text-pretty font-serif text-2xl italic leading-snug text-navy sm:text-3xl">
              &ldquo;{data.testimonial.quote}&rdquo;
            </blockquote>
            <p className="mt-5 text-sm uppercase tracking-[0.18em] text-brass-text">
              {data.testimonial.attribution} · {data.testimonial.role}
            </p>
            <p className="mt-3 text-xs text-muted">
              Patient testimonial. Individual results may vary.
            </p>
          </div>
        </section>
      )}

      {/* Related services */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                <span className="h-px w-8 bg-current opacity-50" />
                Related Treatments
              </span>
              <h3 className="mt-3 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                Other treatments we offer.
              </h3>
            </div>
            <Link href="/services" className="text-sm font-medium text-navy underline">
              See all services
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.relatedServices.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-off-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-50 text-cyan-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                    <path d="M13 2 4 13h7l-1 9 9-11h-7Z" />
                  </svg>
                </span>
                <h3 className="mt-5 font-serif text-lg leading-tight text-navy">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-soft">{service.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-brass-text">
                  Learn more
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Medically reviewed + final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 pt-10 text-center lg:px-10">
          <p className="font-sans text-xs uppercase tracking-wide text-off-white/60">
            Medically Reviewed
          </p>
          <p className="mt-1 text-sm text-off-white/70">
            Reviewed by Dr. Edward Baumgartner, MD. Information on this page is not medical
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
