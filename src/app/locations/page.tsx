import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import { offices, practice } from "@/lib/nav";

const communities = [
  { slug: "spring-tx", label: "Spring, TX", commute: "10–15 min from FM 1960" },
  { slug: "the-woodlands", label: "The Woodlands, TX", commute: "15–25 min from FM 1960" },
  { slug: "cypress", label: "Cypress, TX", commute: "15–25 min from TX-249" },
  { slug: "tomball", label: "Tomball, TX", commute: "10–15 min from TX-249" },
  { slug: "klein", label: "Klein, TX", commute: "10–15 min from TX-249" },
  { slug: "champions", label: "Champions, TX", commute: "10 min from TX-249" },
  { slug: "kingwood", label: "Kingwood, TX", commute: "10–15 min from FM 1960" },
  { slug: "atascocita", label: "Atascocita, TX", commute: "5–10 min from FM 1960" },
  { slug: "humble", label: "Humble, TX", commute: "About 5 min from FM 1960" },
  { slug: "northwest-houston", label: "Northwest Houston", commute: "10–20 min from TX-249" },
];

export const metadata: Metadata = {
  title: "Locations",
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
            Two Houston-area offices, easy to reach.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-charcoal-soft">
            Same-week appointments. Most insurance accepted. Ample parking at both
            locations.
          </p>
        </div>
      </section>

      {/* Office cards */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {offices.map((office) => (
            <div key={office.key} className="border border-line p-7">
              <h2 className="font-serif text-xl text-navy">{office.label}</h2>
              <address className="mt-3 not-italic text-sm leading-relaxed text-charcoal-soft">
                {office.addressLine1}
                <br />
                {office.addressLine2}
                <br />
                <a href={practice.phoneHref} className="tabular-nums hover:text-brass-text">
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
                  className="border border-navy px-5 py-2.5 font-sans text-xs font-medium tracking-wide text-navy hover:bg-navy hover:text-off-white"
                >
                  Get Directions
                </a>
                <a
                  href={practice.phoneHref}
                  className="border border-line px-5 py-2.5 font-sans text-xs font-medium tracking-wide text-navy hover:border-brass"
                >
                  Call this office
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Communities we serve */}
      <section className="border-y border-line bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Service Area"
            title="Communities we serve"
            lead="HTx Pain Institute is the convenient choice for patients across the Houston metro — north, northwest, and northeast."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {communities.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="group border border-line bg-off-white p-5 transition-colors hover:border-brass"
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
