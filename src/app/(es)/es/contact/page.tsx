import type { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import ContactForm from "@/components/contact-form";
import OfficeMap from "@/components/office-map";
import RescheduleCallout from "@/components/reschedule-callout";
import ReviewsSection from "@/components/reviews-section";
import { offices, practice } from "@/lib/nav";
import { HOURS_CLOSED_ES, HOURS_ES, spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";

export const metadata: Metadata = spanishPageMetadata({
  title: "Contacto en Houston y Humble",
  description:
    "Llame, escriba o envíe un mensaje a HTx Pain Institute en Houston o Humble. El personal habla español. El Dr. Baumgartner atiende en inglés.",
  en: "/contact",
  es: "/es/contact",
});

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

export default function SpanishContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark ariaLabel="Migas de pan" items={[{ label: "Inicio", href: "/es" }, { label: "Contacto" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Contacto
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Contacte nuestras oficinas de Houston y Humble.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Estamos para ayudarle. Envíenos un mensaje. Por lo general respondemos en un día hábil.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-off-white/80">{STAFF_NOTE_ES}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-10 lg:pt-14">
        <RescheduleCallout locale="es" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm locale="es" />
          </div>

          <div className="space-y-8 lg:col-span-5">
            <div className="rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-7 text-off-white">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brass-light">Teléfono y correo</p>
              <h2 className="mt-2 font-serif text-xl text-off-white">La forma más rápida de hablar con nosotros.</h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div>
                  <dt className="sr-only">Teléfono</dt>
                  <dd className="flex items-center gap-2.5">
                    <PhoneIcon className="h-4 w-4 shrink-0 text-brass-light" />
                    <a
                      href={practice.phoneHref}
                      data-phone={practice.phone}
                      data-analytics-location="contact"
                      className="inline-flex min-h-11 items-center tabular-nums text-off-white underline decoration-brass-light/50 underline-offset-4 hover:text-brass-light phone"
                    >
                      {practice.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Correo</dt>
                  <dd className="flex items-center gap-2.5">
                    <MailIcon className="h-4 w-4 shrink-0 text-brass-light" />
                    <a
                      href={`mailto:${practice.email}`}
                      className="inline-flex min-h-11 items-center break-all text-off-white underline decoration-brass-light/50 underline-offset-4 hover:text-brass-light"
                    >
                      {practice.email}
                    </a>
                  </dd>
                </div>
                <div className="pt-1 text-off-white/75">
                  <dt className="sr-only">Horario</dt>
                  <dd className="flex items-start gap-2.5">
                    <ClockIcon className="mt-1 h-4 w-4 shrink-0 text-brass-light" />
                    <span>
                      {HOURS_ES}
                      <br />
                      {HOURS_CLOSED_ES}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border border-line bg-off-white p-7">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-navy">
                <PinIcon className="h-3.5 w-3.5 shrink-0" />
                Visítenos
              </p>
              <h2 className="mt-2 font-serif text-lg text-navy">Dos oficinas en el área de Houston.</h2>
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
              <h2 className="font-serif text-lg text-navy">¿Es una emergencia médica?</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                Si tiene una emergencia médica, llame al{" "}
                <a href="tel:911" className="font-semibold text-brass-text">
                  911
                </a>{" "}
                o vaya de inmediato a la sala de emergencias más cercana. Los mensajes de esta página no se revisan
                las 24 horas.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-2xl border-t border-line pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">El consultorio</p>
          <h2 className="mt-2 font-serif text-3xl text-navy">Un espacio tranquilo y moderno, pensado para usted.</h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal-soft">
            Desde que entra, el ambiente es quieto y acogedor, pensado para conversar con calma. Mantenemos el
            consultorio a propósito pequeño, para que cada paciente tenga el tiempo que necesita.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {offices.map((office) => (
            <div key={office.key} className="overflow-hidden rounded-2xl border border-line bg-off-white">
              <OfficeMap office={office} height={180} />
              <div className="p-7">
                <span className="font-sans text-xs font-semibold uppercase tracking-wide text-brass-text">{office.city}</span>
                <h3 className="mt-1 font-serif text-lg text-navy">{office.label}</h3>
                <address className="mt-2 not-italic text-sm leading-relaxed text-charcoal-soft">
                  {office.addressLine1}
                  <br />
                  {office.addressLine2}
                  <br />
                  <a
                    href={practice.phoneHref}
                    data-phone={practice.phone}
                    data-analytics-location="contact"
                    className="inline-flex min-h-11 items-center tabular-nums underline underline-offset-4 hover:text-brass-text phone"
                  >
                    {practice.phone}
                  </a>
                </address>
                <p className="mt-2 text-sm text-charcoal-soft">
                  {HOURS_ES}
                  <br />
                  {HOURS_CLOSED_ES}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-5">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-navy px-5 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-off-white hover:bg-navy-deep"
                  >
                    Cómo llegar
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                  <a
                    href={practice.phoneHref}
                    data-phone={practice.phone}
                    data-analytics-location="contact"
                    className="inline-flex min-h-11 items-center font-sans text-sm font-medium tracking-wide text-navy underline underline-offset-4 hover:text-brass-text phone"
                  >
                    Llamar a esta oficina
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReviewsSection locale="es" className="border-t border-line bg-pearl" />
    </div>
  );
}
