import type { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import ContactForm from "@/components/contact-form";
import { offices, practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach HTx Pain Institute by phone, email, or message. Two Houston-area locations — same-week appointments available.",
};

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h4l2 5-2.5 2a11 11 0 0 0 5.5 5.5l2-2.5 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2c-4.14 0-7.5 3.36-7.5 7.5 0 5.63 6.55 11.54 6.83 11.79a1 1 0 0 0 1.34 0c.28-.25 6.83-6.16 6.83-11.79C19.5 5.36 16.14 2 12 2Zm0 10.25a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Z" />
    </svg>
  );
}

function MapPlaceholder({ city }: { city: string }) {
  return (
    <div
      className="relative h-[120px] w-full rounded-t-2xl border-b border-line bg-pearl"
      style={{
        backgroundImage: "radial-gradient(var(--color-line) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-navy"
        fill="currentColor"
      >
        <path d="M12 2c-4.14 0-7.5 3.36-7.5 7.5 0 5.63 6.55 11.54 6.83 11.79a1 1 0 0 0 1.34 0c.28-.25 6.83-6.16 6.83-11.79C19.5 5.36 16.14 2 12 2Zm0 10.25a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Z" />
      </svg>
      <span className="absolute right-3 top-3 rounded-full bg-navy px-3 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-wide text-off-white">
        {city}
      </span>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Contact
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Get in touch with us.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            We&rsquo;re here to help you on your journey to pain relief. Send us a
            message — we typically respond within one business day.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <div className="space-y-8 lg:col-span-5">
          <div className="rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-7 text-off-white">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brass-light">
              Direct Lines
            </p>
            <h2 className="mt-2 font-serif text-xl text-off-white">
              The fastest way to reach us.
            </h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">Phone</dt>
                <PhoneIcon className="h-4 w-4 shrink-0 text-brass-light" />
                <dd>
                  <a href={practice.phoneHref} className="tabular-nums text-off-white hover:text-brass-light">
                    {practice.phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">Email</dt>
                <MailIcon className="h-4 w-4 shrink-0 text-brass-light" />
                <dd>
                  <a href={`mailto:${practice.email}`} className="text-off-white hover:text-brass-light">
                    {practice.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-2.5 pt-1 text-off-white/75">
                <ClockIcon className="h-4 w-4 shrink-0 text-brass-light" />
                <span>
                  {practice.hours}
                  <br />
                  {practice.hoursWeekend}
                </span>
              </div>
            </dl>
          </div>

          <div className="border border-line bg-off-white p-7">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-navy">
              <PinIcon className="h-3.5 w-3.5 shrink-0" />
              Visit Us
            </p>
            <h2 className="mt-2 font-serif text-lg text-navy">Two Houston-area locations.</h2>
            <div className="mt-4 space-y-5">
              {offices.map((office) => (
                <address key={office.key} className="not-italic text-sm leading-relaxed">
                  <span className="block font-medium text-navy">{office.city}</span>
                  <span className="text-charcoal-soft">
                    {office.addressLine1}
                    <br />
                    {office.addressLine2}
                  </span>
                </address>
              ))}
            </div>
          </div>

          <div className="border border-brass-deep/40 bg-pearl p-7">
            <h2 className="font-serif text-lg text-navy">Medical emergency?</h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
              If you are experiencing a medical emergency, call{" "}
              <a href="tel:911" className="font-semibold text-brass-text">
                911
              </a>{" "}
              or go to your nearest emergency department immediately. This form is
              not monitored 24/7.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-2xl border-t border-line pt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
          Our Practice
        </p>
        <h2 className="mt-2 font-serif text-3xl text-navy">
          A calm, modern space — built around you.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-charcoal-soft">
          From the moment you walk in, you&rsquo;ll find a quiet, welcoming
          environment designed for clear thinking and thoughtful conversation.
          We&rsquo;ve kept the practice intentionally focused so every patient gets
          the time they deserve.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {offices.map((office) => (
          <div key={office.key} className="overflow-hidden rounded-2xl border border-line bg-off-white">
            <MapPlaceholder city={office.city} />
            <div className="p-7">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-brass-text">
                {office.city}
              </span>
              <h3 className="mt-1 font-serif text-lg text-navy">{office.label}</h3>
              <address className="mt-2 not-italic text-sm leading-relaxed text-charcoal-soft">
                {office.addressLine1}
                <br />
                {office.addressLine2}
                <br />
                <a href={practice.phoneHref} className="tabular-nums hover:text-brass-text">
                  {practice.phone}
                </a>
              </address>
              <p className="mt-2 text-sm text-charcoal-soft">
                {practice.hours}
                <br />
                {practice.hoursWeekend}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-off-white hover:bg-navy-deep"
                >
                  Get Directions
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <a
                  href={practice.phoneHref}
                  className="font-sans text-xs font-medium tracking-wide text-navy underline underline-offset-2 hover:text-brass-text"
                >
                  Call this office
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
