import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AcceptedInsuranceList from "@/components/accepted-insurance-list";
import Breadcrumb from "@/components/breadcrumb";
import EsFinalCta from "@/components/es-final-cta";
import { IconBadge } from "@/components/icon-badge";
import RescheduleCallout from "@/components/reschedule-callout";
import SectionHeading from "@/components/section-heading";
import { CONFIRM_BENEFITS_ES, spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";
import { practice } from "@/lib/nav";

export const metadata: Metadata = spanishPageMetadata({
  title: "Recursos para pacientes",
  description:
    "Antes, durante y después de su visita a HTx Pain Institute: seguros, qué esperar y formularios. El personal habla español.",
  en: "/patients",
  es: "/es/patients",
});

const resourceCards = [
  {
    title: "Videoteca",
    body: "Entrevistas con el médico, educación para pacientes e historias del consultorio. Esta sección está en inglés.",
    linkLabel: "Ver la videoteca (en inglés)",
    href: "/video-library",
    icon: "bolt",
    tone: "dark",
  },
  {
    title: "Pedir una cita",
    body: "Por lo general hay consultas en la misma semana. Aceptamos la mayoría de los seguros principales.",
    linkLabel: "Pedir cita",
    href: "/es/request-appointment",
    icon: "alert",
    tone: "dark",
    booking: true,
  },
  {
    title: "Pedir una segunda opinión",
    body: "¿Está considerando una cirugía? ¿Lleva mucho tiempo con medicamentos? Esta página explica la consulta. Está en inglés.",
    linkLabel: "Conocer la segunda opinión (en inglés)",
    href: "/second-opinion",
    icon: "shield",
    tone: "dark",
  },
] as const;

const steps = [
  {
    number: "01",
    title: "Consulta inicial",
    body: "Una revisión sin prisa de su historia, el examen, los estudios y los tratamientos previos. Primero escuchamos.",
  },
  {
    number: "02",
    title: "Plan personalizado",
    body: "Un plan por pasos, con base en la evidencia, ajustado a su dolor, a sus metas y a su vida.",
  },
  {
    number: "03",
    title: "Procedimiento y recuperación",
    body: "La mayoría de los procedimientos son ambulatorios. Explicamos todo antes, durante y después.",
  },
  {
    number: "04",
    title: "Seguimiento y ajustes",
    body: "Revisamos cómo responde y ajustamos el plan si hace falta. Los resultados varían.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SpanishPatientsPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark ariaLabel="Migas de pan" items={[{ label: "Inicio", href: "/es" }, { label: "Pacientes" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Recursos para pacientes
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Lo que necesita antes, durante y después de su visita.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Recursos para que el cuidado aquí se sienta claro y responsable. Si necesita algo que no está en esta
            página, llámenos y se lo enviamos.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-off-white/80">{STAFF_NOTE_ES}</p>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resourceCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                data-analytics-location={"booking" in card ? "patients-resources" : undefined}
                data-analytics-label={"booking" in card ? "Pedir cita" : undefined}
                className="group flex h-full flex-col rounded-2xl border border-line bg-off-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <IconBadge icon={card.icon} tone={card.tone} />
                <h2 className="mt-7 font-serif text-xl leading-tight text-navy">{card.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-soft">{card.body}</p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-text">
                  {card.linkLabel}
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <RescheduleCallout locale="es" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="Su primera visita"
          title="Qué esperar."
          lead="Un camino claro, en cuatro pasos, desde la primera llamada hasta el seguimiento."
          align="center"
        />
        <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="h-full rounded-2xl border border-line bg-pearl p-7">
              <span className="font-serif text-4xl text-brass-deep">{step.number}</span>
              <h3 className="mt-5 font-serif text-lg leading-tight text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                <span className="h-px w-8 bg-current opacity-50" />
                Seguros y facturación
              </span>
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                Planes que podemos verificar antes de su visita.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                El equipo revisa sus beneficios antes de la cita y le llama si algo necesita atención.
              </p>
              <p className="mt-3 text-base leading-relaxed text-navy">{CONFIRM_BENEFITS_ES}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href={practice.phoneHref}
                  data-phone={practice.phone}
                  data-analytics-location="patients-insurance"
                  className="rounded-full border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light phone"
                >
                  Verificar beneficios: {practice.phone}
                </a>
                <Link href="/es/contact" className="text-sm font-medium text-navy underline">
                  Envíenos una pregunta
                </Link>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-soft">
                <Link href="/es/insurance" className="font-semibold text-brass-text hover:underline">
                  Cómo verificamos los beneficios
                </Link>
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-6 text-off-white shadow-md sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-light">Formularios</p>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-off-white">
                  ¿Es paciente nuevo? Ahorre tiempo en el registro.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-off-white/90">
                  Llene los formularios de ingreso antes de su cita. También podemos enviárselos por correo electrónico
                  o por correo postal, como usted prefiera.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${practice.email}?subject=${encodeURIComponent("Solicitud de formularios para pacientes")}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-navy-deep hover:bg-brass-light"
                  >
                    Pedir los formularios
                    <ArrowIcon />
                  </a>
                  <Link
                    href="/es/request-appointment"
                    data-analytics-location="patients-forms"
                    className="text-sm font-semibold text-off-white underline-offset-4 hover:underline"
                  >
                    Prefiero pedir la cita
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <AcceptedInsuranceList locale="es" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-line">
              <Image
                src="/images/lobby.webp"
                alt="El vestíbulo de recepción de HTx Pain Institute en Houston"
                fill
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="El espacio"
              title="Un lugar acogedor, pensado para su comodidad."
              lead="Tranquilo y sin prisa, del registro al seguimiento. Las citas duran lo suficiente para revisar su historia, el examen y sus preguntas."
            />
          </div>
        </div>
      </section>

      <EsFinalCta />
    </div>
  );
}
