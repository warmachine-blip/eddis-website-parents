import type { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import FaqAccordion from "@/components/faq-accordion";
import FirstVisitGuide from "@/components/first-visit-guide";
import NimblrScheduler from "@/components/nimblr-scheduler";
import RescheduleCallout from "@/components/reschedule-callout";
import { practice } from "@/lib/nav";
import { HOURS_CLOSED_ES, HOURS_ES, spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";

export const metadata: Metadata = spanishPageMetadata({
  title: "Cita de manejo del dolor en Houston",
  description:
    "Pida cita en línea en Houston (Willowbrook) o Humble, o llame al (832) 960-7160. A menudo hay consultas en la misma semana. El personal habla español.",
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
    body: "Nuestro equipo verifica sus beneficios del seguro por adelantado, para que no haya sorpresas. Si hay algún problema de cobertura, nos comunicaremos con usted antes de su cita.",
  },
  {
    number: "3",
    body: "Usted llega, llena unos formularios breves de registro y se reúne con el Dr. Baumgartner o con Allison Turner, DNP.",
  },
  {
    number: "4",
    body: "Juntos preparamos su plan personalizado.",
  },
];

const appointmentFaqs = [
  {
    q: "¿Qué debo llevar a la primera visita?",
    a: "Su identificación con foto, la tarjeta del seguro, una lista de sus medicamentos actuales y cualquier informe o disco (CD) de sus estudios de imagen, además de los expedientes de tratamientos anteriores para el dolor. Si le han operado la columna o una articulación, traiga el informe de la cirugía si lo tiene.",
  },
  {
    q: "¿Necesito un referido de mi médico?",
    a: "Algunos planes de seguro lo piden y muchos no. Nuestro equipo lo verifica cuando revisa sus beneficios antes de la visita. Llame al (832) 960-7160 para confirmar sus beneficios.",
  },
  {
    q: "¿Qué planes de seguro aceptan?",
    a: "Trabajamos con Medicare, planes de Medicare Advantage, Texas Medicaid, TRICARE Prime por medio de US Family Health Plan, la mayoría de los principales planes comerciales, compensación laboral y casos de lesiones personales. También se puede pagar por cuenta propia. Vea la lista completa en la página de seguros y llame al (832) 960-7160 para confirmar sus beneficios.",
  },
  {
    q: "¿Hablan español?",
    a: "Sí. La recepción puede ayudarle en español cuando llame al (832) 960-7160. El Dr. Baumgartner atiende en inglés.",
  },
  {
    q: "¿Qué oficina me conviene?",
    a: "Elija la que le quede más cerca. La oficina de Houston está en 13323 Dotson Rd, Suite 200, en el área de Willowbrook, y la de Humble en 1485 FM 1960 Bypass Rd. E, Suite 100. Las dos abren de lunes a viernes, de 7:00 a.m. a 5:00 p.m.",
  },
  {
    q: "Vivo fuera de Houston. ¿Pueden atenderme?",
    a: "Sí. Llámenos antes de reservar y le diremos qué expedientes médicos y estudios de imagen debe enviar con anticipación. La clínica puede revisar sus expedientes antes de que usted viaje, para que la primera visita se centre en el diagnóstico y el plan.",
  },
];

export default function SpanishRequestAppointmentPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark ariaLabel="Migas de pan" items={[{ label: "Inicio", href: "/es" }, { label: "Pedir cita" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Pedir cita
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Programe su consulta de manejo del dolor.
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
          ¿Ya tiene una cita? Para cambiarla o cancelarla, use el recuadro de abajo. El enlace abre una página en
          inglés. Si prefiere hacerlo por teléfono, el personal le ayuda en español.
        </p>
        <RescheduleCallout locale="es" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 text-sm leading-relaxed text-charcoal-soft">
              El calendario en línea está en inglés. Si prefiere ayuda en español, llame al {practice.phone}. El
              personal puede programar su cita y responder sus preguntas.
            </p>
            <NimblrScheduler locale="es" />
          </div>

          <div className="space-y-8 lg:col-span-5">
            <div className="rounded-2xl border border-line bg-off-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">¿Más rápido?</p>
              <h2 className="mt-1.5 font-serif text-xl text-navy">Llámenos directamente.</h2>
              <p className="mt-1.5 text-sm text-charcoal-soft">
                Por lo general, la recepción puede agendarle la cita en el momento y responder cualquier pregunta sobre su visita.
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
                Horario de ambas oficinas (Willowbrook y Humble): {HOURS_ES.toLowerCase()} {HOURS_CLOSED_ES}
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
                Las citas en línea se programan por medio de Nimblr, nuestro calendario. Lo que usted escriba allí llega a Nimblr
                y a nuestra oficina para reservar la visita. Por favor, no escriba detalles médicos allí. Puede compartirlos
                durante la llamada o en su visita.
              </p>
              <p className="text-sm leading-relaxed text-charcoal-soft">
                Por lo general hay consultas en la misma semana.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FirstVisitGuide locale="es" />

      <section className="bg-navy-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <h2 className="text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">Preguntas frecuentes</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-soft">{STAFF_NOTE_ES}</p>
          <div className="mt-8 max-w-3xl">
            <FaqAccordion faqs={appointmentFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
