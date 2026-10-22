import type { Metadata } from "next";
import Link from "next/link";
import { practice } from "@/lib/nav";
import { scheduling } from "@/lib/scheduling";
import { spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";

export const metadata: Metadata = {
  ...spanishPageMetadata({
    title: "Cita confirmada",
    description:
      "Su cita en HTx Pain Institute quedó confirmada. Esto es lo que sigue antes de su visita. El personal habla español.",
    en: "/appointment-confirmed",
    es: "/es/appointment-confirmed",
  }),
  robots: { index: false, follow: true },
};

const nextSteps = [
  {
    number: "1",
    title: "Revise su correo y su teléfono",
    body: "Va en camino una confirmación de nuestro sistema de citas, con la fecha, la hora y la dirección de la oficina. Los recordatorios llegan conforme se acerca la visita.",
  },
  {
    number: "2",
    title: "Verificamos sus beneficios",
    body: "El equipo verifica sus beneficios de seguro por adelantado, para que no haya sorpresas. Si hay un problema de cobertura, le llamamos antes de la cita.",
  },
  {
    number: "3",
    title: "Traiga algunas cosas",
    body: "Identificación con foto, su tarjeta del seguro, una lista de sus medicamentos actuales y los estudios o expedientes previos (resonancia, tomografía, radiografía) que pueda conseguir.",
  },
  {
    number: "4",
    title: "Conozca a su clínico",
    body: "Tendrá una consulta con tiempo de sobra con el Dr. Baumgartner o con Allison Turner, DNP, y se irá con un plan personalizado. El Dr. Baumgartner atiende en inglés.",
  },
];

export default function SpanishAppointmentConfirmedPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-brass shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-7 w-7 text-navy-deep"
            >
              <path d="m4 12.5 5 5L20 6.5" />
            </svg>
          </span>
          <p className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Cita confirmada
          </p>
          <h1 className="mt-5 text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Su cita quedó registrada. Nos vemos pronto.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-off-white/90">
            Gracias por elegir {practice.name}. Su solicitud ya está en nuestra agenda y le enviaremos una
            confirmación por correo y por mensaje de texto.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-off-white/70">
            Si algo de su cita no se ve bien, o si prefiere hablar con alguien, llámenos al{" "}
            <a
              href={practice.phoneHref}
              data-phone={practice.phone}
              data-analytics-location="appointment-confirmed"
              className="font-medium tabular-nums text-brass-light underline decoration-brass-light/50 underline-offset-4 hover:text-off-white phone"
            >
              {practice.phone}
            </a>{" "}
            y la recepción lo resuelve.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-off-white/80">{STAFF_NOTE_ES}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={practice.phoneHref}
              data-phone={practice.phone}
              data-analytics-location="appointment-confirmed"
              className="rounded-full border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light phone"
            >
              Llamar al {practice.phone}
            </a>
            <Link
              href="/es"
              className="rounded-full border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
            <span className="h-px w-8 bg-current opacity-50" />
            Qué sigue
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight text-navy">De aquí a su visita.</h2>

          <ol className="mt-10 space-y-6">
            {nextSteps.map((step) => (
              <li key={step.number} className="flex gap-5 rounded-2xl border border-line bg-off-white p-6 sm:p-7">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-navy-deep font-sans text-xs font-semibold text-off-white">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-navy">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-off-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">¿Necesita cambiarla?</p>
              <h3 className="mt-1.5 font-serif text-lg text-navy">Reprográmela o cancélela.</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">
                Administre su cita en línea cuando usted quiera, o llámenos y la movemos. El enlace abre una página en
                inglés.
              </p>
              <a
                href={scheduling.manageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full border border-navy px-6 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:bg-navy hover:text-off-white"
              >
                Administrar la cita
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-off-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">Antes de venir</p>
              <h3 className="mt-1.5 font-serif text-lg text-navy">Adelántese.</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">
                Formularios, qué traer y cómo funciona el seguro en el consultorio, todo en un solo lugar.
              </p>
              <Link
                href="/es/patients"
                className="mt-5 inline-block rounded-full border border-navy px-6 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:bg-navy hover:text-off-white"
              >
                Recursos para pacientes
              </Link>
            </div>
          </div>

          <p className="mt-10 text-sm leading-relaxed text-charcoal-soft">
            ¿No sabe en qué oficina quedó su cita? Las dos están, con indicaciones y horario, en la{" "}
            <Link href="/es/locations" className="font-medium text-brass-text underline underline-offset-2">
              página de oficinas
            </Link>
            . Si tiene una emergencia médica, llame al 911.
          </p>
        </div>
      </section>
    </div>
  );
}
