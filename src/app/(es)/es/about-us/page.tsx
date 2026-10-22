import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import EsFinalCta from "@/components/es-final-cta";
import { IconBadge } from "@/components/icon-badge";
import SectionHeading from "@/components/section-heading";
import { spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";

export const metadata: Metadata = spanishPageMetadata({
  title: "Quiénes somos",
  description:
    "Edward Baumgartner Jr., MD, fundó HTx Pain Institute en 2018. El equipo, las oficinas y la misión siguen iguales desde Texas Interventional Pain Specialists.",
  en: "/about-us",
  es: "/es/about-us",
});

const pillars = [
  {
    title: "El paciente primero",
    body: "Tiempo, escucha y un plan individual.",
    icon: "pulse",
  },
  {
    title: "Con base en la evidencia",
    body: "Procedimientos respaldados por resultados publicados.",
    icon: "shield",
  },
  {
    title: "Herramientas de precisión",
    body: "De la ablación del nervio basivertebral (BVN) al procedimiento MILD y a la estimulación de la médula espinal.",
    icon: "bolt",
  },
] as const;

const team = [
  {
    name: "Edward Baumgartner Jr., MD",
    role: "Médico fundador · Doble certificación · Texas Top Doctor",
    bio: "Médico fundador, con doble certificación en anestesiología y medicina del dolor, y Texas Top Doctor. Nació en Houston y tiene más de quince años de experiencia en medicina intervencionista del dolor. Se dedica a procedimientos avanzados de mínima invasión, entre ellos la ablación del nervio basivertebral (BVN), la estimulación de la médula espinal, la ablación por radiofrecuencia y la fusión de la articulación SI, con atención particular a pacientes a quienes les dijeron que la única opción era una cirugía de columna. Opera en Townsen Memorial Hospital, Houston Methodist y St. Luke's Health. Atiende en inglés.",
    image: "dr-baumgartner.webp",
    alt: "Edward Baumgartner Jr., MD, fundador de HTx Pain Institute",
    href: "/es/dr-edward-baumgartner",
  },
  {
    name: "Allison Turner, DNP, APRN, FNP-C",
    role: "Doctora en práctica de enfermería",
    bio: "Nació en Luisiana y es doctora en práctica de enfermería, con un interés profundo en ayudar a los pacientes a manejar el dolor. Es quien mantiene unido el cuidado en HTx Pain Institute: coordina consultas, seguimientos después de los procedimientos y los planes, junto al Dr. Baumgartner.",
    image: "allison-turner.webp",
    alt: "Allison Turner, DNP, APRN, FNP-C, de HTx Pain Institute",
    href: "/es/allison-turner",
  },
  {
    name: "Tatyana Baumgartner, CPA",
    role: "Directora de operaciones · Miembro de la junta",
    bio: "Directora de operaciones y miembro de la junta directiva de Ima's Home for Children. Dirige las operaciones y el trabajo comunitario de HTx Pain Institute. Trabaja con el Dr. Baumgartner para construir un consultorio con disciplina de instituto y calidez de familia. Doce años de apoyo a Ima's Home, los últimos cinco como patrocinador principal de su carrera anual de 5K.",
    image: "tatyana-baumgartner-portrait.webp",
    alt: "Tatyana Baumgartner, CPA, directora de operaciones de HTx Pain Institute, en retrato de hombros con blusa verde oscuro, frente a una pared crema con luz de sol.",
    href: "/es/tatyana-baumgartner-cpa",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SpanishAboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark ariaLabel="Migas de pan" items={[{ label: "Inicio", href: "/es" }, { label: "Quiénes somos" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Sobre HTx Pain Institute
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Cuidado cercano, <em className="not-italic text-brass-light">medicina de precisión.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Precisión. Alivio duradero. En HTx Pain Institute, cada paciente merece un enfoque personal y cercano
            para el manejo del dolor. Edward Baumgartner Jr., MD, fundó el consultorio en 2018. La misión es poner
            al paciente primero y elevar el nivel de cuidado en la medicina del dolor.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-off-white/80">{STAFF_NOTE_ES}</p>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <figure>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-line sm:aspect-[16/9]">
              <Image
                src="/images/htx-pain-institute-team-front-desk.webp"
                alt="Ocho integrantes del equipo, la mayoría en uniforme clínico, de pie bajo el letrero dorado de htx pain institute. Edward Baumgartner Jr., MD, con uniforme azul marino, es el cuarto desde la izquierda."
                fill
                sizes="(min-width: 1280px) 1200px, 92vw"
                className="object-cover object-bottom"
                priority
              />
            </div>
            <figcaption className="mt-4 text-[13px] leading-relaxed text-muted">
              El equipo de HTx Pain Institute en la recepción.
            </figcaption>
          </figure>

          <div className="mt-14 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-line">
                <Image
                  src="/images/allison-turner-and-dr-baumgartner-front-desk.webp"
                  alt="Allison Turner, DNP, y Edward Baumgartner Jr., MD, con uniforme azul marino, de pie en la recepción, bajo el letrero dorado de htx pain institute."
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-5 rounded-2xl bg-off-white p-5 shadow-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">Fundado</p>
                  <p className="font-serif text-3xl text-navy">2018</p>
                </div>
                <p className="border-l border-line pl-5 text-[13px] leading-snug text-charcoal-soft">
                  Casi una década en Houston, con tres nombres y la misma misión.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:pl-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                <span className="h-px w-8 bg-current opacity-50" />
                Nuestra historia
              </span>
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                La idea detrás de HTx Pain Institute.
              </h2>
              <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-charcoal-soft">
                <p>
                  El consultorio empezó en 2018 como Texas Interventional Pain Specialists, fundado por Edward
                  Baumgartner Jr., MD. A principios de 2025 pasó a llamarse HTx Pain Care y, en 2026, HTx Pain
                  Institute, para reflejar un alcance clínico más amplio y una capacidad de nivel de instituto. En
                  cada cambio de nombre siguieron iguales el equipo, las oficinas y la misión: cuidado preciso.
                </p>
                <p>
                  Después de cinco años como director médico de US Pain &amp; Spine Hospital, y de ver las
                  ineficiencias de un consultorio en grupo, el Dr. Baumgartner quiso un modelo más centrado en el
                  paciente. Su idea era clara: elevar el nivel de cuidado, poner el bienestar del paciente primero y
                  ofrecer un manejo del dolor amplio.
                </p>
                <p>
                  HTx Pain Institute parte de una convicción: la medicina intervencionista del dolor, aplicada con
                  cuidado, de forma individual y con criterio clínico, puede ayudar a las personas a retomar lo que
                  les importa, muchas veces con menos dependencia de medicamentos a largo plazo. El resultado de cada
                  persona es distinto.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {pillars.map((p) => (
                  <div key={p.title} className="rounded-xl border border-line bg-off-white p-5">
                    <IconBadge icon={p.icon} tone="brass" />
                    <p className="mt-4 font-semibold text-navy">{p.title}</p>
                    <p className="mt-1 text-[13px] text-charcoal-soft">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Dirección"
            title="Personas que eligieron este trabajo por las razones correctas."
            lead="Un equipo pequeño y enfocado. Conocemos a cada paciente. El personal habla español. El Dr. Baumgartner atiende en inglés."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Link
                key={member.href}
                href={member.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-pearl p-7 transition-all hover:-translate-y-0.5 hover:bg-off-white hover:shadow-md"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-line">
                  <Image
                    src={`/images/${member.image}`}
                    alt={member.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="mt-7 font-serif text-xl leading-tight text-navy">{member.name}</h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brass-text">{member.role}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal-soft">{member.bio}</p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-text">
                  Leer la biografía
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-6 text-off-white sm:p-10 lg:grid-cols-12 lg:items-center lg:p-14">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
                <span className="h-px w-8 bg-current opacity-70" />
                Nuestro compromiso
              </span>
              <h3 className="mt-5 text-balance font-serif text-3xl leading-tight sm:text-4xl">
                Desde la primera llamada hasta el seguimiento, con cuidado y de forma personal.
              </h3>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base leading-relaxed text-off-white/90">
                Desde la consulta inicial hasta el seguimiento, el equipo busca que la experiencia sea clara. El
                objetivo es un plan personalizado, pensado para usted. Los resultados varían de una persona a otra.
              </p>
              <Link
                href="/es/request-appointment"
                data-analytics-location="about"
                className="group mt-7 inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-brass px-5 py-3.5 text-sm font-semibold text-navy-deep transition-all hover:bg-brass-light sm:px-7"
              >
                Pedir una consulta
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EsFinalCta />
    </div>
  );
}
