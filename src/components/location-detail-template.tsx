import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { IconBadge } from "@/components/icon-badge";
import SectionHeading from "@/components/section-heading";
import JsonLd from "@/components/json-ld";
import { formatReviewDate } from "@/lib/review";
import OfficeMap from "@/components/office-map";
import { SITE_URL } from "@/lib/site";
import { WEBSITE_ID, FOUNDER_ID, clinicId } from "@/lib/schema";
import { locationDetails, type LocationDetail } from "@/lib/location-details";
import { offices, practice } from "@/lib/nav";
import { HOURS_CLOSED_ES, HOURS_ES_STANDALONE, STAFF_NOTE_ES } from "@/lib/spanish";

export default function LocationDetailTemplate({
  data,
  locale = "en",
}: {
  data: LocationDetail;
  locale?: "en" | "es";
}) {
  const spanish = locale === "es";
  const office = offices.find((o) => o.key === data.nearestOfficeKey)!;
  const isThisOffice = office.pageHref === `/locations/${data.slug}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`;
  const url = `${SITE_URL}${spanish ? "/es" : ""}/locations/${data.slug}`;
  const bookHref = spanish ? "/es/request-appointment" : "/request-appointment";
  const areaHref = (slug: string) => `${spanish ? "/es" : ""}/locations/${slug}`;
  const topicHref = (slug: string) => (spanish && slug === "intracept-procedure" ? "/es/intracept-procedure" : `/${slug}`);

  /**
   * The other communities this same office serves. Before this, each city page
   * had exactly one inbound link on the whole site (the /locations index), so
   * the ten of them formed no mesh at all.
   */
  const nearby = Object.values(locationDetails)
    .filter((l) => l.slug !== data.slug && l.nearestOfficeKey === data.nearestOfficeKey)
    .slice(0, 5);

  /**
   * The city page points at the office that actually serves it, rather than
   * re-declaring a clinic — the sitewide graph already lists every city this
   * office serves.
   */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#webpage`,
        url,
        name: spanish ? `Especialista en dolor en ${data.city}` : `Pain Doctor in ${data.city}`,
        description: data.metaDescription,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": clinicId(office) },
        reviewedBy: { "@id": FOUNDER_ID },
        lastReviewed: data.lastReviewed,
        significantLink: `${SITE_URL}${spanish ? "/es" : ""}${office.pageHref}`,
      },
    ],
  };

  return (
    <div>
      <JsonLd data={schema} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
            <Breadcrumb
            dark
            ariaLabel={spanish ? "Migas de pan" : undefined}
            items={[
              { label: spanish ? "Inicio" : "Home", href: spanish ? "/es" : "/" },
              { label: spanish ? "Oficinas" : "Locations", href: spanish ? "/es/locations" : "/locations" },
              { label: data.city },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            {spanish ? `Atención en ${data.city}` : `Serving ${data.city}`}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            {data.heroHeadline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">{data.heroIntro}</p>
          {spanish ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-off-white/80">{STAFF_NOTE_ES}</p> : null}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={bookHref}
              data-analytics-location="location-hero"
              className="border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              {spanish ? "Pedir cita" : "Schedule Appointment"}
            </Link>
            <a
              href={practice.phoneHref} data-phone={practice.phone}
              data-analytics-location="location-hero"
              className="border border-off-white/40 px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white phone"
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
            <SectionHeading
              eyebrow={spanish ? "La zona" : "About the area"}
              title={spanish ? `Medicina del dolor, cerca de ${data.city}.` : `Pain medicine, close to home for ${data.city}.`}
            />
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
                  {spanish ? `Oficina más cercana: ${office.city}` : `Nearest office: ${office.city}`}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                  {office.addressLine1}
                  <br />
                  {office.addressLine2}
                </p>
                {isThisOffice ? (
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-soft" lang="es">
                    Hablamos español
                  </p>
                ) : null}
                <p className="mt-4 text-sm text-charcoal-soft">
                  {spanish ? HOURS_ES_STANDALONE : practice.hours}
                  <br />
                  {spanish ? HOURS_CLOSED_ES : practice.hoursWeekend}
                </p>
                <div className="mt-5 grid gap-2">
                  <a
                    href={practice.phoneHref} data-phone={practice.phone}
                    data-analytics-location="location-office"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-off-white hover:bg-navy phone"
                  >
                    {practice.phone}
                  </a>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-navy hover:border-navy"
                  >
                    {spanish ? "Cómo llegar" : "Get Directions"}
                  </a>
                </div>
              </div>
              <OfficeMap office={office} height={260} />
            </div>
          </div>
        </div>
      </section>

      {/* Getting here — the most city-specific copy on the page, and the only
          section that names the roads and landmarks a local actually searches. */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={spanish ? "Cómo llegar" : "Getting here"}
              title={
                spanish
                  ? `Cómo llegar de ${data.city} a la oficina de ${office.city}.`
                  : `Directions from ${data.city} to our ${office.city} office.`
              }
            />
            <p className="mt-6 text-pretty text-base leading-relaxed text-charcoal-soft">
              {data.directionsIntro}
            </p>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brass-text underline decoration-brass decoration-2 underline-offset-4 hover:text-navy"
            >
              {spanish
                ? `Abrir la ruta a ${office.addressLine1} en Google Maps`
                : `Open directions to ${office.addressLine1} in Google Maps`}
            </a>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-pearl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                {spanish ? "Referencias cerca de usted" : "Landmarks near you"}
              </p>
              <ul className="mt-4 grid gap-2.5 text-sm leading-relaxed text-navy">
                {data.landmarks.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brass" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions we treat */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow={spanish ? "Condiciones" : "Conditions we treat"}
          title={
            spanish
              ? `Las condiciones por las que más nos visitan desde ${data.city}.`
              : `The conditions ${data.city} patients see us for most.`
          }
        />
        {spanish ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal-soft">Estas páginas están en inglés.</p>
        ) : null}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.commonConditions.map((c) => (
            <Link
              key={c.slug}
              href={topicHref(c.slug)}
              className="group flex flex-col rounded-2xl border border-line bg-pearl p-6 transition-all hover:-translate-y-0.5 hover:bg-off-white hover:shadow-md"
            >
              <h3 className="font-serif text-lg leading-tight text-navy">{c.title}</h3>
              <span className="mt-2 line-clamp-2 text-sm text-charcoal-soft">{c.blurb}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-text">
                {spanish ? (c.slug === "intracept-procedure" ? "Ver más" : "Ver más, en inglés") : "Learn more"}
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
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
          <SectionHeading
            eyebrow={spanish ? "Tratamiento" : "Treatment"}
            title={spanish ? `Procedimientos frecuentes para pacientes de ${data.city}.` : `Common procedures for ${data.city} patients.`}
          />
          {spanish ? (
            <p className="mt-4 max-w-2xl text-sm text-charcoal-soft">
              Estas páginas están en inglés, excepto la de ablación del nervio basivertebral (BVN).
            </p>
          ) : null}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.commonServices.map((service) => (
              <Link
                key={service.slug}
                href={topicHref(service.slug)}
                className="group flex flex-col rounded-2xl border border-line bg-off-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="font-serif text-base leading-tight text-navy">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-soft">{service.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brass-text">
                  {spanish ? (service.slug === "intracept-procedure" ? "Ver más" : "Ver más, en inglés") : "Learn more"}
                  <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
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
        <div className="grid gap-10 rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-6 text-off-white sm:p-10 lg:grid-cols-12 lg:p-14">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
              <span className="h-px w-8 bg-current opacity-70" />
              {spanish ? `Por qué HTx Pain Institute en ${data.city}` : `Why HTx Pain Institute for ${data.city}`}
            </span>
            <h2 className="mt-5 text-balance font-serif text-2xl leading-tight sm:text-3xl">
              {spanish ? `Atención de nivel de instituto, a minutos de ${data.city}.` : `Institute-caliber care, minutes from ${data.city}.`}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-off-white/90">{data.whyThisCityBlurb}</p>
          </div>
        </div>
      </section>

      {/* Nearby areas — the interlink between sibling city pages */}
      {nearby.length > 0 && (
        <section className="border-t border-line bg-pearl">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
              {spanish ? `También atendemos, desde la oficina de ${office.city}` : `Also serving, from our ${office.city} office`}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {nearby.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={areaHref(l.slug)}
                    className="inline-flex min-h-11 items-center text-navy underline decoration-line underline-offset-4 hover:decoration-brass"
                  >
                    {spanish ? `Manejo del dolor en ${l.city}` : `Pain management in ${l.city}`}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={spanish ? "/es/locations" : "/locations"}
                  className="inline-flex min-h-11 items-center font-semibold text-brass-text underline decoration-brass decoration-2 underline-offset-4"
                >
                  {spanish ? "Todas las zonas" : "All service areas"}
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* Medically reviewed + final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 pt-10 text-center lg:px-10">
          <p className="font-sans text-xs uppercase tracking-wide text-off-white/60">
            {spanish ? "Revisión médica" : "Medically Reviewed"}
          </p>
          <p className="mt-1 text-sm text-off-white/70">
            {spanish ? (
              <>
                Revisado por Edward Baumgartner Jr., MD. Última revisión:{" "}
                <time dateTime={data.lastReviewed}>{formatReviewDate(data.lastReviewed, "es")}</time>. La información de
                esta página no es consejo médico.
              </>
            ) : (
              <>
                Reviewed by Edward Baumgartner Jr., MD &middot; Last reviewed{" "}
                <time dateTime={data.lastReviewed}>{formatReviewDate(data.lastReviewed)}</time>.
                Information on this page is not medical advice.
              </>
            )}
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-20">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            {spanish ? "Cuando usted esté listo" : "Ready When You Are"}
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl">
            {data.finalCtaHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-off-white/80">{data.commuteLine}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={bookHref}
              data-analytics-location="location-closing"
              className="rounded-full border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              {spanish ? "Pedir cita" : "Schedule Appointment"}
            </Link>
            <a
              href={practice.phoneHref} data-phone={practice.phone}
              data-analytics-location="location-closing"
              className="rounded-full border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white phone"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
