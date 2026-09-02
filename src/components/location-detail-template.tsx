import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { IconBadge } from "@/components/icon-badge";
import SectionHeading from "@/components/section-heading";
import type { LocationDetail } from "@/lib/location-details";
import { offices, practice } from "@/lib/nav";

export default function LocationDetailTemplate({ data }: { data: LocationDetail }) {
  const office = offices.find((o) => o.key === data.nearestOfficeKey)!;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`;
  const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(office.mapsQuery)}&output=embed`;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: data.city },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Serving {data.city}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            {data.heroHeadline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">{data.heroIntro}</p>
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

      {/* About the area + nearest office */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="About the area" title={`Pain medicine, close to home for ${data.city}.`} />
            <div className="mt-6 space-y-4">
              {data.aboutParagraphs.map((p) => (
                <p key={p} className="text-pretty text-base leading-relaxed text-charcoal-soft">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-line bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                {data.patientsListIntro}
              </p>
              <ul className="mt-4 grid gap-2.5 text-sm leading-relaxed text-navy">
                {data.patientsList.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brass" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 grid gap-4">
              <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
                <IconBadge icon="pulse" tone="brass" />
                <p className="mt-4 font-serif text-xl leading-tight text-navy">
                  Nearest office: {office.city}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                  {office.addressLine1}
                  <br />
                  {office.addressLine2}
                </p>
                <p className="mt-4 text-sm text-charcoal-soft">{practice.hours}</p>
                <div className="mt-5 grid gap-2">
                  <a
                    href={practice.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-off-white hover:bg-navy"
                  >
                    {practice.phone}
                  </a>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-navy hover:border-navy"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-line bg-white">
                <iframe
                  src={mapsEmbedSrc}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map to HTx Pain Institute — ${office.city}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions we treat */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="Conditions we treat"
          title={`The conditions ${data.city} patients see us for most.`}
        />
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.commonConditions.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-pearl p-6 transition-all hover:-translate-y-0.5 hover:bg-off-white hover:shadow-md"
            >
              <span className="font-serif text-lg leading-tight text-navy">{c.title}</span>
              <span className="mt-2 line-clamp-2 text-sm text-charcoal-soft">{c.blurb}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-text">
                Learn more
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Common procedures */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="Treatment" title={`Common procedures for ${data.city} patients.`} />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.commonServices.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-off-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="font-serif text-base leading-tight text-navy">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-soft">{service.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brass-text">
                  Learn more
                  <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why HTx Pain Institute for this city */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-10 rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-10 text-off-white sm:p-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
              <span className="h-px w-8 bg-current opacity-70" />
              Why HTx Pain Institute for {data.city}
            </span>
            <h3 className="mt-5 text-balance font-serif text-2xl leading-tight sm:text-3xl">
              Institute-caliber care, minutes from {data.city}.
            </h3>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-off-white/90">{data.whyThisCityBlurb}</p>
          </div>
        </div>
      </section>

      {/* Medically reviewed + final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 pt-10 text-center lg:px-10">
          <p className="font-sans text-xs uppercase tracking-wide text-off-white/60">Medically Reviewed</p>
          <p className="mt-1 text-sm text-off-white/70">
            Reviewed by Dr. Edward Baumgartner, MD. Information on this page is not medical advice.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-20">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Ready When You Are
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl">
            {data.finalCtaHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-off-white/70">{data.commuteLine}</p>
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
