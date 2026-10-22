import type { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import NimblrScheduler from "@/components/nimblr-scheduler";
import RescheduleCallout from "@/components/reschedule-callout";
import { practice } from "@/lib/nav";
import { HOURS_CLOSED_ES, HOURS_ES, spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";

export const metadata: Metadata = spanishPageMetadata({
  title: "Pedir cita en Houston",
  description:
    "Pida cita en la oficina de Houston o de Humble, o llame al (832) 960-7160. Por lo general hay consultas en la misma semana. El personal habla español.",
  en: "/request-appointment",
  es: "/es/request-appointment",
});

const nextSteps = [
  {
    number: "1",
    body: "Elija un horario en el calendario y recibirá una confirmación de nuestro sistema de citas.",
  },
  {
    number: "2",
    body: "Nuestro equipo verifica sus beneficios del seguro por adelantado, para que no haya sorpresas. Si hay un problema de cobertura, le llamamos antes de la cita.",
  },
  {
    number: "3",
    body: "Usted llega, completa un ingreso breve y se reúne con el Dr. Baumgartner o con Allison Turner, DNP.",
  },
  {
    number: "4",
    body: "Juntos preparamos su plan personalizado.",
  },
];

export default function SpanishRequestAppointmentPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Inicio", href: "/es" }, { label: "Pedir cita" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Pedir cita
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Programe su consulta.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Por lo general hay consultas en la misma semana. Elija un horario en el calendario de abajo, o llámenos y la
            recepción le agenda la cita en el momento.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-off-white/80">{STAFF_NOTE_ES}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-10 lg:pt-14">
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-charcoal-soft">
          ¿Ya tiene una cita? Para cambiarla o cancelarla, use el recuadro de abajo. Está en inglés. Si prefiere
          hacerlo por teléfono, el personal le ayuda en español.
        </p>
        <RescheduleCallout />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 text-sm leading-relaxed text-charcoal-soft">
              El calendario en línea está en inglés. Si prefiere ayuda en español, llame al {practice.phone}. El
              personal puede programar su cita y responder sus preguntas.
            </p>
            <NimblrScheduler />
          </div>

          <div className="space-y-8 lg:col-span-5">
            <div className="rounded-2xl border border-line bg-off-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">¿Más rápido?</p>
              <h2 className="mt-1.5 font-serif text-xl text-navy">Llámenos directamente.</h2>
              <p className="mt-1.5 text-sm text-charcoal-soft">
                La recepción por lo general puede agendarle la cita en el momento, y responder preguntas sobre su visita.
              </p>
              <a
                href={practice.phoneHref}
                data-phone={practice.phone}
                data-analytics-location="request-appointment"
                className="mt-5 inline-block rounded-full border border-brass bg-brass px-6 py-3 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light phone"
              >
                {practice.phone}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-soft">
                {HOURS_ES} {HOURS_CLOSED_ES} Willowbrook y Humble.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-pearl p-7">
              <h2 className="font-serif text-lg text-navy">Qué sigue</h2>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step) => (
                  <li key={step.number} className="flex gap-4">
                    <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-navy-deep font-sans text-xs font-semibold text-off-white">
                      {step.number}
                    </span>
                    <p className="text-sm leading-relaxed text-charcoal-soft">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-4 rounded-2xl border border-line bg-white p-7">
              <p className="text-sm leading-relaxed text-charcoal-soft">
                Las citas en línea se programan por Nimblr, nuestro calendario. Lo que usted escribe allí llega a Nimblr
                y a nuestra oficina para reservar la visita. Guarde los detalles médicos para la llamada o para la visita.
              </p>
              <p className="text-sm leading-relaxed text-charcoal-soft">
                Por lo general hay consultas en la misma semana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
