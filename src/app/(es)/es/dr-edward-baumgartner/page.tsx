import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import EsFinalCta from "@/components/es-final-cta";
import FaqAccordion from "@/components/faq-accordion";
import { CheckBullet } from "@/components/icon-badge";
import { offices, practice } from "@/lib/nav";
import { txTopDocsUrl } from "@/lib/social";
import { HOURS_CLOSED_ES, HOURS_ES, spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";

export const metadata: Metadata = {
  ...spanishPageMetadata({
    title: "Edward Baumgartner Jr., MD",
    description:
      "Doble certificación en anestesiología y medicina del dolor. De Houston, formado en Rush University, fundador de HTx Pain Institute en Houston y Humble.",
    en: "/dr-edward-baumgartner",
    es: "/es/dr-edward-baumgartner",
  }),
  title: { absolute: "Dr. Edward Baumgartner · Especialista en dolor en Houston" },
};

const facts = [
  { label: "Certificación", value: "Anestesiología" },
  { label: "Certificación", value: "Medicina del dolor" },
  { label: "Experiencia", value: "Más de 15 años" },
  { label: "Reconocimiento", value: "Texas Top Doctor" },
  { label: "Hospitales", value: "Townsen Memorial, Houston Methodist Willowbrook, St. Luke's Health" },
  { label: "Fundado", value: "2018" },
];

const education = [
  "Licenciatura en ciencias biomédicas, Texas A&M University, Magna Cum Laude, con honores de la universidad y de la fundación.",
  "Doctor en medicina (M.D.), University of Texas Health Science Center at Houston. Recibió la beca de investigación Alpha Omega Alpha Research Fellowship.",
  "Internado de cirugía general (2 años), University of Illinois at Chicago / Mount Sinai Hospital Medical Center.",
  "Residencia en anestesiología, Rush University Medical Center, Chicago.",
  "Subespecialidad (fellowship) en medicina del dolor, Rush University Medical Center, Chicago.",
  "Profesor adjunto, Rush Health System.",
];

const toolkit = [
  "Ablación del nervio basivertebral (BVN) para el dolor lumbar vertebrogénico.",
  "Estimulación de la médula espinal (prueba y implante permanente).",
  "Ablación por radiofrecuencia: cervical, lumbar, de la articulación sacroilíaca (SI) y de rodilla (nervios geniculares).",
  "Fusión de la articulación SI (LinQ y otros sistemas) y fusión interespinosa lumbar Minuteman.",
  "Cifoplastia para fracturas vertebrales por compresión.",
  "Procedimiento MILD para estenosis espinal lumbar.",
  "Inyecciones epidurales de esteroides y bloqueos nerviosos selectivos.",
  "Bloqueos de nervios periféricos, incluido el supraescapular para el hombro.",
  "Inyecciones de articulaciones con guía de ultrasonido: rodilla, cadera y hombro.",
  "Terapia con PRP para problemas de tendones (tendinopatía) y algunos tipos de dolor articular.",
];

const servicesProvided = [
  { label: "Ablación del nervio basivertebral (BVN)", href: "/es/intracept-procedure", english: false },
  { label: "Estimulación de la médula espinal", href: "/spinal-cord-stimulation-specialist", english: true },
  { label: "Ablación por radiofrecuencia", href: "/radiofrequency-ablation", english: true },
  { label: "Fusión lumbar Minuteman", href: "/minuteman-procedure", english: true },
  { label: "Fusión de la articulación SI (LinQ)", href: "/si-joint-fusions", english: true },
  { label: "Cifoplastia", href: "/kyphoplasty-specialist", english: true },
  { label: "Procedimiento MILD", href: "/mild-procedure", english: true },
  { label: "Inyecciones epidurales de esteroides", href: "/injections-blocks-specialist", english: true },
  { label: "Terapia con PRP", href: "/prp-procedure", english: true },
];

const physicianFaqs = [
  {
    q: "¿Dónde atiende el Dr. Baumgartner?",
    a: "En las dos oficinas de HTx Pain Institute: 13323 Dotson Rd, Suite 200, Houston, TX 77070 (área de Willowbrook) y 1485 FM 1960 Bypass Rd. E, Suite 100, Humble, TX 77338. Las dos abren de lunes a viernes, de 7:00 a.m. a 5:00 p.m.",
  },
  {
    q: "¿El Dr. Baumgartner tiene certificación de especialidad (board certified)?",
    a: "Sí. Está certificado en anestesiología y en medicina del dolor.",
  },
  {
    q: "¿Qué procedimientos realiza?",
    a: "Los procedimientos incluyen la ablación del nervio basivertebral (BVN), pruebas e implantes de estimulación de la médula espinal, ablación por radiofrecuencia, fusión de la articulación SI, fusión lumbar Minuteman, cifoplastia, el procedimiento MILD, inyecciones epidurales de esteroides, bloqueos nerviosos y PRP. Que un procedimiento sea adecuado para usted depende del examen y de los estudios de imagen.",
  },
  {
    q: "¿Qué seguros acepta el consultorio?",
    a: "Medicare, muchos planes de Medicare Advantage, Texas Medicaid, la mayoría de los principales planes comerciales y compensación laboral. Los planes cambian, así que llame al (832) 960-7160 para confirmar sus beneficios.",
  },
  {
    q: "¿En la oficina hablan español?",
    a: "Sí. El personal de la clínica puede ayudarle en español. El Dr. Baumgartner atiende en inglés.",
  },
  {
    q: "¿Cuál es su número NPI?",
    a: "1548402407. Puede consultarlo en el registro nacional NPPES.",
  },
  {
    q: "¿Dónde se formó?",
    a: "En Texas A&M University (licenciatura), en University of Texas Health Science Center at Houston (M.D.) y en Rush University Medical Center, en Chicago (residencia en anestesiología y subespecialidad en medicina del dolor).",
  },
];

const officeName: Record<string, string> = {
  houston: "Houston (Willowbrook), 13323 Dotson Rd, Suite 200",
  humble: "Humble (FM 1960), 1485 FM 1960 Bypass Rd. E, Suite 100",
};

export default function SpanishDoctorPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            items={[
              { label: "Inicio", href: "/es" },
              { label: "Quiénes somos", href: "/about-us" },
              { label: "Edward Baumgartner Jr., MD" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Médico fundador · Especialista en dolor
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Edward Baumgartner Jr., MD
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Doble certificación · Anestesiología y medicina del dolor
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-off-white/80">{STAFF_NOTE_ES}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/es/request-appointment"
              data-analytics-location="physician-hero"
              className="inline-flex min-h-11 items-center rounded-full border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Pedir cita
            </Link>
            <a
              href={practice.phoneHref}
              data-phone={practice.phone}
              data-analytics-location="physician-hero"
              className="inline-flex min-h-11 items-center rounded-full border border-off-white/30 px-7 py-3.5 font-sans text-sm font-medium tracking-wide tabular-nums text-off-white hover:border-off-white phone"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="relative aspect-[4/3] max-h-[60svh] w-full overflow-hidden rounded-2xl bg-line sm:aspect-[3/2] lg:aspect-[3/4] lg:max-h-none">
                <Image
                  src="/images/dr-baumgartner.webp"
                  alt="Edward Baumgartner Jr., MD, fundador de HTx Pain Institute"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-off-white p-6 shadow-sm">
                {facts.map((fact, index) => (
                  <div
                    key={`${fact.label}-${index}`}
                    className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{fact.label}</span>
                    <span className="text-right font-serif text-[15px] text-navy">{fact.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-line bg-off-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">Idioma</p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{STAFF_NOTE_ES}</p>
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-6 text-off-white shadow-md">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-light">Pedir una visita</p>
                <p className="mt-2 font-serif text-xl leading-tight text-off-white">
                  ¿Listo para hablar de su dolor?
                </p>
                <Link
                  href="/es/request-appointment"
                  data-analytics-location="physician-sidebar"
                  className="mt-5 inline-flex items-center rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-navy-deep hover:bg-brass-light"
                >
                  Pedir cita
                </Link>
                <a
                  href={practice.phoneHref}
                  data-phone={practice.phone}
                  data-analytics-location="physician-sidebar"
                  className="mt-3 flex min-h-11 items-center justify-center rounded-full border border-off-white/30 px-5 py-2.5 text-sm font-semibold tabular-nums text-off-white hover:border-off-white phone"
                >
                  {practice.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
              De Houston · Texas A&amp;M · UT Health Houston · Rush University
            </p>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-charcoal-soft">
              Edward Baumgartner Jr., MD, es de Houston y tiene doble certificación en anestesiología y en medicina del
              dolor, con más de quince años de experiencia en medicina intervencionista del dolor. Fue director médico
              de US Pain &amp; Spine Hospital de 2013 a 2018. Fundó el consultorio en 2018, primero como Texas
              Interventional Pain Specialists, luego HTx Pain Care y ahora HTx Pain Institute, para traer a Houston el
              conjunto actual de tratamientos mínimamente invasivos, con el tiempo, la precisión y el criterio que cada
              paciente merece. Opera en Townsen Memorial Hospital, Houston Methodist Willowbrook y St. Luke&apos;s Health.
            </p>

            <div className="mt-12 space-y-12">
              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Dónde atiende</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  Atiende en las dos oficinas de HTx Pain Institute. {HOURS_ES} {HOURS_CLOSED_ES}
                </p>
                <ul className="mt-5 grid gap-3">
                  {offices.map((office) => (
                    <li key={office.key} className="rounded-xl border border-line bg-off-white p-4 text-sm leading-relaxed text-charcoal-soft">
                      <span className="font-semibold text-navy">{officeName[office.key]}</span>
                      <br />
                      {office.addressLine2}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Formación</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  La formación del Dr. Baumgartner fue un recorrido deliberado por algunas de las instituciones más
                  respetadas de la medicina en Estados Unidos, para sumar profundidad académica y amplitud en los
                  procedimientos.
                </p>
                <ul className="mt-5 grid gap-3">
                  {education.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-off-white p-4">
                      <CheckBullet tone="cyan" />
                      <span className="text-sm leading-relaxed text-charcoal-soft">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-charcoal-soft">
                  El Dr. Baumgartner aparece como{" "}
                  <a
                    href={txTopDocsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brass-text underline decoration-brass decoration-2 underline-offset-4 hover:text-navy"
                  >
                    Texas Top Doctor
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Enfoque clínico</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    El Dr. Baumgartner pone una atención particular en los pacientes a quienes les han dicho que la
                    única opción que les queda es una cirugía de columna: personas que ya pasaron por terapia física,
                    inyecciones y otros tratamientos conservadores sin un alivio duradero, y que buscan otro camino.
                  </p>
                  <p>Su conjunto de procedimientos cubre el espectro actual de la medicina intervencionista del dolor:</p>
                </div>
                <ul className="mt-4 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                  {toolkit.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-charcoal-soft">
                      <CheckBullet tone="brass" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Filosofía de cuidado</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    El Dr. Baumgartner fundó el consultorio después de conocer de cerca cómo funciona un grupo médico y de
                    concluir que, para poner al paciente primero, tenía que construir otro tipo de consultorio desde
                    cero. Cree que la mejor medicina del dolor une la{" "}
                    <span className="font-semibold text-navy">excelencia técnica</span> con un{" "}
                    <span className="font-semibold text-navy">criterio clínico sin prisa</span>: el tiempo para entender
                    el cuadro completo antes de recomendar un plan.
                  </p>
                  <p className="font-serif text-xl italic leading-snug text-brass-text">
                    "Precisión. Alivio duradero." es más que un lema. Es el estándar que él se exige con cada paciente.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Comunidad</h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">Las páginas de la comunidad están en inglés.</p>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    El Dr. Baumgartner apoya de manera constante a{" "}
                    <Link href="/community/imas-home" className="font-semibold text-brass-text hover:text-navy">
                      Ima&apos;s Home for Children
                    </Link>
                    , una organización 501(c)(3) que cuida a niños huérfanos en Filipinas. El consultorio apoya a
                    Ima&apos;s Home desde hace doce años y ha sido el patrocinador principal de su carrera anual de 5K
                    durante los últimos cinco años. Su esposa, Tatyana, forma parte de la junta directiva.
                  </p>
                  <p>
                    El consultorio también apoya económicamente a la{" "}
                    <Link href="/community/kel-strong-foundation" className="font-semibold text-brass-text hover:text-navy">
                      &apos;Kel Strong&apos; Mabatah Foundation
                    </Link>
                    , una organización 501(c)(3) que financia rehabilitación para personas que sobrevivieron a una
                    lesión cerebral traumática, y asistió a su gala anual de recaudación de fondos.
                  </p>
                  <p>
                    También colabora con{" "}
                    <Link href="/community/houston-tennis-academy" className="font-semibold text-brass-text hover:text-navy">
                      Houston Tennis Academy
                    </Link>{" "}
                    en Club Westside en la prevención de lesiones de sus jugadores juveniles, con charlas para los
                    jugadores y para sus padres.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Fuera de la clínica</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  Houstoniano de toda la vida, el Dr. Baumgartner se formó en Chicago y volvió a casa para atender a su
                  comunidad. Fuera de la clínica, le gusta correr largas distancias y pasar tiempo con su familia.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-line bg-off-white p-7">
              <h3 className="font-serif text-xl text-navy">Servicios que ofrece el Dr. Baumgartner</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                La página de la ablación del nervio basivertebral (BVN) está en español. Las demás están en inglés.
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {servicesProvided.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="group flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium text-navy transition-colors hover:bg-line/50"
                    >
                      {service.label}
                      {service.english ? <span className="text-xs font-semibold uppercase tracking-wide text-brass-text">En inglés</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <h2 className="text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">Preguntas frecuentes</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-soft">{STAFF_NOTE_ES}</p>
          <div className="mt-8 max-w-3xl">
            <FaqAccordion faqs={physicianFaqs} />
          </div>
        </div>
      </section>

      <EsFinalCta />
    </div>
  );
}
