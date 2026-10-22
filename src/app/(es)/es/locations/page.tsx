import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import EsFinalCta from "@/components/es-final-cta";
import OfficeMap from "@/components/office-map";
import SectionHeading from "@/components/section-heading";
import { spanishLocation } from "@/lib/location-details-es";
import { locationDetails } from "@/lib/location-details";
import { offices, practice } from "@/lib/nav";
import { HOURS_CLOSED_ES, HOURS_ES_STANDALONE, spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";

const communities = Object.keys(locationDetails).map((slug) => {
  const page = spanishLocation(slug)!;
  return {
    slug,
    label: page.city === "Northwest Houston" ? page.city : `${page.city}, TX`,
    commute: page.commuteShort,
  };
});

export const metadata: Metadata = spanishPageMetadata({
  title: "Oficinas en Houston y Humble",
  description:
    "HTx Pain Institute atiende Houston, Humble, Spring, The Woodlands, Cypress, Tomball, Kingwood, Atascocita y comunidades cercanas.",
  en: "/locations",
  es: "/es/locations",
});

export default function SpanishLocationsPage() {
  return (
    <div>
      <section className="border-b border-line bg-pearl">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">Oficinas</p>
          <h1 className="mx-auto mt-3 max-w-2xl text-balance font-serif text-4xl leading-tight text-navy sm:text-5xl">
            Oficinas de la clínica de dolor en Houston y Humble.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-charcoal-soft">
            Dos oficinas en el área de Houston, fáciles de alcanzar. A menudo hay citas en la misma semana, aceptamos
            la mayoría de los seguros y hay estacionamiento amplio en las dos.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-charcoal-soft">{STAFF_NOTE_ES}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <Breadcrumb ariaLabel="Migas de pan" items={[{ label: "Inicio", href: "/es" }, { label: "Oficinas" }]} />
        <SectionHeading eyebrow="Nuestras oficinas" title="Dos oficinas en el área de Houston." />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {offices.map((office) => (
            <div key={office.key} className="border border-line p-7">
              <OfficeMap office={office} height={200} />
              <h3 className="mt-6 font-serif text-xl text-navy">{office.label}</h3>
              <address className="mt-3 not-italic text-sm leading-relaxed text-charcoal-soft">
                {office.addressLine1}
                <br />
                {office.addressLine2}
                <br />
                <a
                  href={practice.phoneHref}
                  data-phone={practice.phone}
                  data-analytics-location="locations"
                  className="inline-flex min-h-11 items-center tabular-nums underline underline-offset-4 hover:text-brass-text phone"
                >
                  {practice.phone}
                </a>
              </address>
              <p className="mt-3 text-sm text-charcoal-soft">
                {HOURS_ES_STANDALONE}
                <br />
                {HOURS_CLOSED_ES}
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center border border-navy px-5 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:bg-navy hover:text-off-white"
                >
                  Cómo llegar
                </a>
                <a
                  href={practice.phoneHref}
                  data-phone={practice.phone}
                  data-analytics-location="locations"
                  className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:border-brass phone"
                >
                  Llamar a esta oficina
                </a>
                <Link
                  href={`/es${office.pageHref}`}
                  className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:border-brass"
                >
                  Página de la oficina
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="areas-we-serve" className="border-y border-line bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Zonas que atendemos"
            title="Zonas que atendemos"
            lead="HTx Pain Institute es una opción cercana para pacientes del área metropolitana de Houston: norte, noroeste y noreste."
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {communities.map((c) => (
              <Link
                key={c.slug}
                href={`/es/locations/${c.slug}`}
                className="group flex min-h-11 flex-col justify-center border border-line bg-off-white p-4 transition-colors hover:border-brass sm:p-5"
              >
                <h3 className="font-serif text-base text-navy group-hover:text-brass-text">{c.label}</h3>
                <p className="mt-1.5 font-sans text-xs uppercase tracking-wide text-muted">{c.commute}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EsFinalCta />
    </div>
  );
}
