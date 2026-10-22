import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import EsFinalCta from "@/components/es-final-cta";
import { CheckBullet } from "@/components/icon-badge";
import JsonLd from "@/components/json-ld";
import { NURSE_PRACTITIONER_ID, ORG_ID } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";

export const metadata: Metadata = spanishPageMetadata({
  title: "Allison Turner, DNP, FNP-C",
  description:
    "Allison Turner, DNP, APRN, FNP-C, coordina consultas, seguimientos y el plan de cuidado en HTx Pain Institute. El Dr. Baumgartner atiende en inglés.",
  en: "/allison-turner",
  es: "/es/allison-turner",
});

const facts = [
  { label: "Doctorado", value: "DNP" },
  { label: "Cert.", value: "FNP-C" },
  { label: "Licencia", value: "APRN-TX" },
  { label: "Enfoque", value: "El paciente primero" },
];

const credentials = [
  "Doctorado en práctica de enfermería (DNP): grado terminal de enfermería, centrado en la práctica clínica avanzada y en llevar la evidencia al cuidado.",
  "Certificación como enfermera familiar (FNP-C) por la American Academy of Nurse Practitioners (AANP).",
  "Licencia de Advanced Practice Registered Nurse (APRN) en el estado de Texas.",
  "Educación continua en medicina intervencionista del dolor, síndromes de dolor crónico y medicina de adicciones.",
  "Miembro activo de organizaciones profesionales de enfermería de práctica avanzada y de medicina del dolor.",
];

const responsibilities = [
  "Consultas de pacientes nuevos: historia clínica detallada, revisión de estudios de imagen y un plan explicado con claridad.",
  "Seguimiento después del procedimiento: revisión después de la ablación por radiofrecuencia, las pruebas de estimulación de la médula espinal, la ablación del nervio basivertebral (BVN), la cifoplastia y otros procedimientos, para ver cómo va la recuperación.",
  "Manejo de medicamentos: prescripción cuidadosa y conservadora de medicamentos de apoyo, con énfasis en reducir la dependencia de opioides a largo plazo.",
  "Coordinación del cuidado: comunicación con el médico de cabecera, los especialistas, los fisioterapeutas y los administradores de casos, para que nada se quede sin atender.",
  "Apoyo en procedimientos: asiste al Dr. Baumgartner durante los procedimientos y procura que cada paciente esté informado, cómodo y preparado.",
];

const expectations = [
  "Una visita de verdad: tiempo para hablar de sus síntomas, su historia y lo que ya ha intentado.",
  "Revisión de estudios: un recorrido por los hallazgos de su resonancia, radiografía o tomografía, para que entienda qué significan para las opciones de tratamiento.",
  "Un plan honesto: un plan de cuidado claro, por escrito, con expectativas realistas y los siguientes pasos. No es un discurso de venta.",
  "Seguimiento: acceso telefónico directo para preguntas entre visitas, y un seguimiento activo después de los procedimientos.",
  "Coordinación: ella habla con sus otros médicos cuando hace falta, para que usted no tenga que ser el mensajero.",
];

function LabeledItem({ text }: { text: string }) {
  const idx = text.indexOf(": ");
  if (idx === -1) return <>{text}</>;
  return (
    <>
      <span className="font-semibold text-navy">{text.slice(0, idx)}</span>
      {text.slice(idx)}
    </>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": NURSE_PRACTITIONER_ID,
  name: "Allison Turner, DNP, APRN, FNP-C",
  givenName: "Allison",
  familyName: "Turner",
  honorificSuffix: "DNP, APRN, FNP-C",
  jobTitle: "Doctora en práctica de enfermería",
  url: `${SITE_URL}/es/allison-turner`,
  image: `${SITE_URL}/images/allison-turner.webp`,
  worksFor: { "@id": ORG_ID },
  knowsAbout: ["Manejo del dolor", "Medicina intervencionista del dolor", "Enfermería familiar"],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Degree",
      name: "Doctor of Nursing Practice (DNP)",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Certification",
      name: "Family Nurse Practitioner, Board Certified (FNP-C)",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "License",
      name: "Advanced Practice Registered Nurse, Texas (APRN)",
    },
  ],
};

export default function SpanishAllisonPage() {
  return (
    <div>
      <JsonLd data={personLd} />
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            ariaLabel="Migas de pan"
            items={[
              { label: "Inicio", href: "/es" },
              { label: "Quiénes somos", href: "/es/about-us" },
              { label: "Allison Turner, DNP, APRN, FNP-C" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Doctora en práctica de enfermería
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Allison Turner, DNP, APRN, FNP-C
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Enfermera familiar · Manejo del dolor
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-off-white/80">{STAFF_NOTE_ES}</p>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="relative aspect-[4/3] max-h-[60svh] w-full overflow-hidden rounded-2xl bg-line sm:aspect-[3/2] lg:aspect-[3/4] lg:max-h-none">
                <Image
                  src="/images/allison-turner.webp"
                  alt="Allison Turner, DNP, APRN, FNP-C, de HTx Pain Institute"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-off-white p-6 shadow-sm">
                {facts.map((f, i) => (
                  <div
                    key={`${f.label}-${i}`}
                    className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{f.label}</span>
                    <span className="text-right font-serif text-[15px] text-navy">{f.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-6 text-off-white shadow-md">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-light">Pedir una visita</p>
                <p className="mt-2 font-serif text-xl leading-tight text-off-white">¿Listo para hablar de su dolor?</p>
                <Link
                  href="/es/request-appointment"
                  data-analytics-location="allison-sidebar"
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-navy-deep hover:bg-brass-light"
                >
                  Pedir cita
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
              De Luisiana · DNP · Enfermera familiar · APRN en Texas
            </p>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-charcoal-soft">
              Allison Turner lleva a cada visita la calma de una clínica y la claridad de quien enseña. Como doctora
              en práctica de enfermería, con certificación de enfermera familiar, une una formación avanzada con la
              atención cercana que el dolor exige. Es quien mantiene unido el cuidado en HTx Pain Institute: la clínica
              que la mayoría de los pacientes ve en el seguimiento, la que conoce su historia y la que mantiene el
              plan en movimiento entre un procedimiento y otro.
            </p>

            <div className="mt-12 space-y-12">
              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Formación y credenciales</h2>
                <ul className="mt-5 grid gap-3">
                  {credentials.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-off-white p-4">
                      <CheckBullet tone="cyan" />
                      <span className="text-sm leading-relaxed text-charcoal-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Su papel en HTx Pain Institute</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  El papel de Allison es una de las razones por las que los pacientes describen el cuidado como
                  continuo y personal. No es una visita de trámite. Es la clínica que lleva su caso entre un
                  procedimiento y otro.
                </p>
                <ul className="mt-5 space-y-3">
                  {responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-charcoal-soft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass-deep" />
                      <span>
                        <LabeledItem text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Forma de trabajar</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    Su forma de trabajar se apoya en tres principios: escuchar primero, tomarse el tiempo para ver el
                    cuadro completo y explicar todo en lenguaje claro. Cree que el mejor cuidado del dolor crónico se
                    construye con pasos pequeños y responsables, y con una clínica que conoce su historia lo
                    suficiente para notar cuando algo cambió.
                  </p>
                  <p>
                    Los pacientes la describen como paciente, minuciosa y directa. No promete de más, y le dice cuando
                    una opción no le conviene, o cuando conviene hacer una pregunta de segunda opinión. Su objetivo no
                    es que usted vuelva sin necesidad. Es ayudarle a retomar su vida. Los resultados varían.
                  </p>
                  <p>
                    Trabaja de cerca con el Dr. Baumgartner en el plan de cada paciente. Los dos se comunican de forma
                    constante sobre quién necesita qué, cuándo y por qué. Eso forma parte de cómo funciona el
                    consultorio. El Dr. Baumgartner atiende en inglés.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Qué puede esperar</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">Cuando vea a Allison, espere esto:</p>
                <ul className="mt-5 space-y-3">
                  {expectations.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-charcoal-soft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass-deep" />
                      <span>
                        <LabeledItem text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Por qué la medicina del dolor</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    Allison eligió la medicina del dolor por la misma razón que muchos clínicos de este campo: el
                    dolor es una de las áreas más desatendidas y peor entendidas de la atención médica. A los
                    pacientes con dolor crónico a menudo se les descarta, se les atiende con prisa o se les dice que
                    aprendan a vivir con eso. Ella quiso estar del otro lado de esa conversación.
                  </p>
                  <p>
                    Sus intereses clínicos coinciden de cerca con los del Dr. Baumgartner: dolor intervencionista de
                    columna y articulaciones, dolor neuropático, dolor después de una cirugía, y los pacientes a
                    quienes les dijeron que la única opción es otra cirugía. También se compromete con el uso seguro
                    y conservador de los medicamentos, y acompaña a los pacientes en planes para reducirlos cuando se
                    puede.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EsFinalCta />
    </div>
  );
}
