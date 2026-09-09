import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import SectionHeading from "@/components/section-heading";
import OfficeMap from "@/components/office-map";
import { offices, practice } from "@/lib/nav";
import { locationDetails } from "@/lib/location-details";

// Derived from the city pages so the index can never drift from them.
const communities = Object.values(locationDetails).map((l) => ({
  slug: l.slug,
  label: l.city === "Northwest Houston" ? l.city : `${l.city}, TX`,
  commute: l.commuteShort,
}));

export const metadata: Metadata = {
  title: "Houston & Humble Clinic Locations",
  description:
    "HTx Pain Institute serves Houston, Humble, Spring, The Woodlands, Cypress, Tomball, Kingwood, Atascocita, and surrounding communities.",
};

export default function LocationsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-pearl">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
            Locations
          </p>
          <h1 className="mx-auto mt-3 max-w-2xl text-balance font-serif text-4xl leading-tight text-navy sm:text-5xl">
            Pain clinic locations in Houston &amp; Humble.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-charcoal-soft">
            Two Houston-area offices, easy to reach. Same-week appointments, most
            insurance accepted, and ample parking at both locations.
          </p>
        </div>
      </section>

      {/* Office cards */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
        <SectionHeading eyebrow="Our Offices" title="Two offices in the Houston area." />
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
                <a href={practice.phoneHref} className="inline-flex min-h-11 items-center tabular-nums underline underline-offset-4 hover:text-brass-text">
                  {practice.phone}
                </a>
              </address>
              <p className="mt-3 text-sm text-charcoal-soft">
                {practice.hours}
                <br />
                {practice.hoursWeekend}
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
                <Link
                  href={office.pageHref}
                  className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:border-brass"
                >
                  Office page
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Areas we serve */}
      <section id="areas-we-serve" className="border-y border-line bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Areas We Serve"
            title="Areas we serve"
            lead="HTx Pain Institute is the convenient choice for patients across the Houston metro — north, northwest, and northeast."
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {communities.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="group flex min-h-11 flex-col justify-center border border-line bg-off-white p-4 transition-colors hover:border-brass sm:p-5"
              >
                <h3 className="font-serif text-base text-navy group-hover:text-brass-text">
                  {c.label}
                </h3>
                <p className="mt-1.5 font-sans text-xs uppercase tracking-wide text-muted">
                  {c.commute}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy-deep text-off-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-20">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-light">
            Ready When You Are
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance font-serif text-3xl leading-tight sm:text-4xl">
            Get the care you deserve. Schedule your consultation today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-off-white/70">
            Two Houston-area locations. Same-week consults available. Most
            insurance accepted.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/request-appointment"
              className="border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Request Appointment
            </Link>
            <a
              href={practice.phoneHref}
              className="border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
