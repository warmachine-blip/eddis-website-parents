import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import EsFinalCta from "@/components/es-final-cta";
import FaqAccordion from "@/components/faq-accordion";
import { IconBadge, InfoCard } from "@/components/icon-badge";
import SectionHeading from "@/components/section-heading";
import { socialImage } from "@/lib/metadata";
import { practice } from "@/lib/nav";
import { spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";

const social = socialImage(
  "intracept-procedure",
  "Ablación del nervio basivertebral (BVN) para dolor lumbar vertebrogénico en HTx Pain Institute",
);

// Absolute: the procedure name plus Houston, Texas does not fit the title template.
const title = "Ablación del nervio basivertebral (BVN) en Houston, Texas";

export const metadata: Metadata = {
  ...spanishPageMetadata({
    title,
    description:
      "La ablación del nervio basivertebral (BVN), también llamada Intracept, trata el dolor lumbar vertebrogénico sin implante. Se ofrece en Houston, Texas y Humble.",
    en: "/intracept-procedure",
    es: "/es/intracept-procedure",
  }),
  title: { absolute: title },
  openGraph: {
    locale: "es_US",
    url: "/es/intracept-procedure",
    images: social.openGraph?.images,
  },
  twitter: social.twitter,
};

const steps = [
  "La resonancia magnética (MRI) confirma cambios de Modic tipo 1 o tipo 2 en los platillos vertebrales, el signo característico del dolor vertebrogénico.",
  "Por un punto de acceso pequeño, se guía una sonda hasta el cuerpo vertebral.",
  "Se realiza la ablación del nervio basivertebral con energía de radiofrecuencia controlada.",
  "No queda nada implantado. El hueso cicatriza alrededor de la zona tratada.",
];

const whoIsItFor = [
  "Dolor lumbar crónico de 6 meses o más.",
  "Cambios de Modic en la MRI, compatibles con dolor vertebrogénico.",
  "El tratamiento conservador, incluidas la terapia física y las inyecciones, no ha funcionado.",
  "Pacientes que consideran un procedimiento sin implante y sin fusión.",
];

const whatToExpect = [
  "El procedimiento dura aproximadamente 1 hora.",
  "Se hace con sedación y anestesia local.",
  "Es ambulatorio. La mayoría de los pacientes se van el mismo día.",
  "No queda ningún aparato ni implante en el cuerpo.",
];

const recovery = [
  "Actividad ligera en 1 a 2 días.",
  "El tiempo para volver al trabajo varía. Su médico le indicará según su trabajo y su recuperación.",
  "Su evolución se revisa durante los meses posteriores al tratamiento. Los resultados varían.",
  "Hay estudios que han seguido a pacientes hasta cinco años después de un solo tratamiento. Los resultados varían de una persona a otra.",
];

const risks = [
  "Molestia leve en la parte baja de la espalda, en el sitio de acceso, durante varios días.",
  "Aumento temporal del dolor durante las primeras 1 a 2 semanas, mientras avanza la cicatrización.",
  "Riesgo poco frecuente de infección, sangrado o lesión de un nervio.",
  "Es posible que el procedimiento no alivie el dolor si este no es realmente vertebrogénico. Por eso es importante elegir con cuidado a cada paciente.",
  "No hay complicaciones a largo plazo relacionadas con implantes, porque no los hay.",
];

const faqs = [
  {
    q: "¿En qué se diferencia de la ablación por radiofrecuencia?",
    a: "La ablación por radiofrecuencia habitual actúa sobre los pequeños nervios de la rama medial, fuera de la columna. La ablación del nervio basivertebral (BVN) actúa sobre otro nervio, el nervio basivertebral, que está dentro de la vértebra y lleva señales de dolor vertebrogénico que la ablación por radiofrecuencia tradicional no trata.",
  },
  {
    q: "¿Voy a necesitar una fusión después?",
    a: "La ablación del nervio basivertebral (BVN) no quita ni fusiona nada, así que deja la columna como está. Algunos pacientes que estaban considerando una fusión eligen este procedimiento primero. Que en el futuro necesite o no una fusión depende de su condición, y este procedimiento no descarta esa posibilidad.",
  },
  {
    q: "¿Qué son los cambios de Modic?",
    a: "Los cambios de Modic son cambios de señal en los platillos vertebrales que se ven en la resonancia magnética. Los tipos 1 y 2 se asocian con el dolor vertebrogénico, un dolor que nace en el platillo, y son el signo en la imagen que indica si la ablación del nervio basivertebral puede ser una opción.",
  },
  {
    q: "¿Queda algo en mi cuerpo después?",
    a: "No. La ablación del nervio basivertebral (BVN) no deja implante. El nervio basivertebral se trata con calor (ablación) mediante energía de radiofrecuencia controlada. No se quita ni se extirpa nada, y no queda ningún aparato. Con el tiempo, el hueso cicatriza alrededor de la zona tratada.",
  },
  {
    q: "¿Cuánto dura el alivio?",
    a: "Hay estudios que han seguido a pacientes hasta cinco años después de un solo tratamiento, y muchos informaron una mejoría duradera del dolor y de la función. Los resultados varían de una persona a otra.",
  },
  {
    q: "¿Se puede hacer la ablación del nervio basivertebral en varios niveles?",
    a: "Sí. Se puede hacer en uno o en varios niveles lumbares en un mismo procedimiento, según qué platillos muestren cambios de Modic en su MRI.",
  },
  {
    q: "¿El seguro cubre la ablación del nervio basivertebral?",
    a: "La cubren Medicare y una lista creciente de seguros comerciales, en particular cuando la imagen confirma cambios de Modic y el tratamiento conservador no ha funcionado. Nosotros nos encargamos de la autorización previa. Llame al (832) 960-7160 para confirmar sus beneficios.",
  },
  {
    q: "¿HTx Pain Institute ofrece la ablación del nervio basivertebral?",
    a: "Sí. El Dr. Baumgartner realiza la ablación del nervio basivertebral (BVN) en nuestro consultorio del área de Houston. Llame al (832) 960-7160 para preguntar si los resultados de su resonancia indican que podría ser una opción para usted.",
  },
];

const related = [
  {
    href: "/radiofrequency-ablation",
    title: "Ablación por radiofrecuencia",
    blurb: "Procedimiento ambulatorio que usa una corriente eléctrica precisa para calmar nervios dañados o inflamados.",
  },
  {
    href: "/injections-blocks-specialist",
    title: "Inyecciones y bloqueos nerviosos",
    blurb: "Inyecciones con guía de imagen que calman articulaciones, nervios y estructuras de la columna inflamados.",
  },
  {
    href: "/kyphoplasty-specialist",
    title: "Cifoplastia",
    blurb: "Procedimiento mínimamente invasivo que estabiliza fracturas vertebrales por compresión que causan dolor.",
  },
];

const conditions = [
  {
    href: "/back-pain",
    title: "Dolor de espalda",
    blurb: "El motivo más frecuente por el que llegan los pacientes, y el área en la que más podemos ofrecer.",
  },
  {
    href: "/chronic-pain",
    title: "Dolor crónico",
    blurb: "Dolor que sigue después del tiempo esperado de cicatrización, y el plan completo que requiere.",
  },
];

export default function SpanishIntraceptPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            ariaLabel="Migas de pan"
            items={[
              { label: "Inicio", href: "/es" },
              { label: "Servicios", href: "/services" },
              { label: "Ablación del nervio basivertebral (BVN)" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Ablación del nervio basivertebral (BVN)
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Ablación del nervio basivertebral (BVN)
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Un procedimiento autorizado por la FDA para el dolor lumbar vertebrogénico.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-off-white/80">{STAFF_NOTE_ES}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/es/request-appointment"
              data-analytics-location="service-hero"
              className="border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Pedir cita
            </Link>
            <a
              href={practice.phoneHref}
              data-phone={practice.phone}
              data-analytics-location="service-hero"
              className="border border-off-white/40 px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white phone"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:items-start lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <IconBadge icon="bolt" tone="cyan" />
            <SectionHeading
              eyebrow="Resumen del tratamiento"
              title="Pensado para el paciente, no para el procedimiento."
              lead="La ablación del nervio basivertebral (BVN) es un procedimiento autorizado por la FDA y sin implante para el dolor lumbar crónico de origen vertebrogénico, es decir, un dolor que nace en los platillos vertebrales (las superficies de arriba y de abajo de cada vértebra), y no en el disco ni en los músculos. Usa energía de radiofrecuencia para realizar la ablación del nervio basivertebral. También se conoce como Intracept. Los resultados varían de una persona a otra."
            />
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-32 grid gap-4">
              <div className="rounded-2xl border border-line bg-off-white p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">Datos breves</p>
                <dl className="mt-4 grid gap-3 text-sm">
                  {[
                    ["Lugar", "Ambulatorio, el mismo día"],
                    ["Anestesia", "Sedación y anestesia local"],
                    ["Recuperación", "El tiempo para retomar la actividad varía"],
                    ["Lo realiza", "Dr. Baumgartner"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-0.5 border-b border-line pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                      <dt className="font-medium text-muted">{label}</dt>
                      <dd className="font-semibold text-navy sm:text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href="/es/request-appointment"
                  data-analytics-location="service-quick-facts"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-off-white hover:bg-navy"
                >
                  Pedir cita
                </Link>
              </div>
              <div className="relative isolate aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                <Image
                  src="/images/treatment-intracept-procedure.jpg"
                  alt="Ablación del nervio basivertebral (BVN) para dolor lumbar vertebrogénico en HTx Pain Institute"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-[50%_35%]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-24">
        <h2 className="font-serif text-xl text-navy">Un enfoque claro, paso a paso.</h2>
        <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step} className="border-t-2 border-brass pt-4">
              <span className="font-serif text-2xl text-brass-deep">{index + 1}</span>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-line pt-10 md:grid-cols-3">
          <InfoCard icon="shield" tone="cyan" title="Para quién es" items={whoIsItFor} />
          <InfoCard icon="shield" tone="cyan" title="Qué puede esperar" items={whatToExpect} />
          <InfoCard icon="shield" tone="cyan" title="Recuperación y resultados" items={recovery} />
        </div>
      </section>

      <section className="bg-off-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                <span className="h-px w-8 bg-current opacity-50" />
                Riesgos y efectos secundarios
              </span>
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                Le hablamos con honestidad sobre lo que puede esperar.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                Todo procedimiento tiene algún riesgo. Lo explicamos con palabras claras en la consulta y otra vez el
                día del procedimiento, para que usted sepa qué es normal, qué debe vigilar y cuándo llamar.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-3">
                {risks.map((risk) => (
                  <li key={risk} className="rounded-2xl border border-line bg-pearl p-5 text-sm leading-relaxed text-charcoal-soft">
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                <span className="h-px w-8 bg-current opacity-50" />
                Preguntas frecuentes
              </span>
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                Respuestas directas, sin jerga.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                Si su pregunta no está aquí, hágala en su consulta y se la responderemos con palabras claras.
                {` ${STAFF_NOTE_ES}`}
              </p>
            </div>
            <div className="lg:col-span-7">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-10 rounded-2xl border border-line bg-pearl p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
              <span className="h-px w-8 bg-current opacity-50" />
              Costo, seguro y financiamiento
            </span>
            <h2 className="mt-5 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
              Verificamos sus beneficios antes de la visita.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-soft">
              Medicare y muchos seguros comerciales cubren la ablación del nervio basivertebral (BVN) cuando la resonancia magnética (MRI) muestra cambios de Modic tipo 1 o
              tipo 2 en los platillos vertebrales y el tratamiento conservador no ha funcionado. La cobertura y la autorización previa
              varían según el plan. Nuestro equipo se encarga del proceso. Llame al (832) 960-7160 para confirmar sus
              beneficios.
            </p>
            <Link
              href="/es/insurance"
              className="mt-6 inline-flex items-center rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-off-white hover:bg-navy"
            >
              Detalles de seguros y financiamiento
            </Link>
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">Respuestas breves</h3>
            <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-charcoal-soft">
              <li>
                <span className="font-semibold text-navy">¿Mi seguro lo cubre?</span> Lo verificamos antes de su visita.
                Llame al (832) 960-7160 para confirmar sus beneficios.
              </li>
              <li>
                <span className="font-semibold text-navy">¿Pago por cuenta propia?</span> Sí, con precios claros.
              </li>
              <li>
                <span className="font-semibold text-navy">¿Financiamiento?</span> Hay CareCredit y programas similares.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="Experiencia"
          title="Un alto estándar de cuidado en la ablación del nervio basivertebral (BVN)."
        />
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-charcoal-soft">
          El Dr. Baumgartner es uno de los médicos con experiencia en la ablación del nervio basivertebral en el área de
          Houston. Conoce los datos publicados del procedimiento y es cuidadoso al elegir a quién se lo ofrece. Se
          considera cuando el dolor es vertebrogénico, y no hacemos el procedimiento en pacientes que no cumplen los
          criterios.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-charcoal-soft">{STAFF_NOTE_ES}</p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <h2 className="text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
          Para qué se usa la ablación del nervio basivertebral (BVN).
        </h2>
        <p className="mt-3 text-sm text-charcoal-soft">Estas páginas están en inglés.</p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {conditions.map((condition) => (
            <Link key={condition.href} href={condition.href} className="rounded-2xl border border-line bg-pearl p-6">
              <h3 className="font-serif text-lg text-navy">{condition.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{condition.blurb}</p>
              <span className="mt-4 inline-flex text-sm font-medium text-brass-text">Ver más, en inglés</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <h2 className="text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
            Otros tratamientos que ofrecemos.
          </h2>
          <p className="mt-3 text-sm text-charcoal-soft">Estas páginas están en inglés.</p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((service) => (
              <Link key={service.href} href={service.href} className="rounded-2xl border border-line bg-off-white p-6">
                <h3 className="font-serif text-lg text-navy">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{service.blurb}</p>
                <span className="mt-4 inline-flex text-sm font-medium text-brass-text">Ver más, en inglés</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <h2 className="text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">Del blog.</h2>
          <Link
            href="/blog/intracept-procedure-for-chronic-low-back-pain"
            className="mt-8 block max-w-2xl rounded-2xl border border-line bg-pearl p-6"
          >
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
              Artículo en inglés
            </span>
            <h3 className="mt-3 font-serif text-lg leading-tight text-navy">
              Ablación del nervio basivertebral (BVN) para el dolor de espalda crónico
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
              El dolor vertebrogénico viene de los platillos vertebrales, no del disco ni de las articulaciones facetarias. La ablación del
              nervio basivertebral (BVN) actúa sobre el nervio basivertebral y no deja un implante.
            </p>
          </Link>
        </div>
      </section>

      <div className="bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 pt-10 text-center lg:px-10">
          <p className="font-sans text-xs uppercase tracking-wide text-off-white/60">Revisión médica</p>
          <p className="mt-1 text-sm text-off-white/70">
            Contenido médico revisado en inglés por Edward Baumgartner Jr., MD. Última revisión: 10 de septiembre de 2026. La información de esta
            página no sustituye el consejo médico. Consulte siempre a su médico.
          </p>
        </div>
        <EsFinalCta />
      </div>
    </div>
  );
}
