import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import EsFinalCta from "@/components/es-final-cta";
import { spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";

export const metadata: Metadata = spanishPageMetadata({
  title: "Tatyana Baumgartner, CPA",
  description:
    "Tatyana Baumgartner, CPA, dirige las operaciones y la comunidad en HTx Pain Institute y forma parte de la junta de Ima's Home for Children.",
  en: "/tatyana-baumgartner-cpa",
  es: "/es/tatyana-baumgartner-cpa",
});

const facts = [
  { label: "Puesto", value: "COO" },
  { label: "Título", value: "CPA" },
  { label: "Junta", value: "Ima's Home" },
  { label: "Idiomas", value: "Inglés y ruso" },
];

const responsibilities = [
  "Ciclo de ingresos y facturación: transparente, precisa y clara para el paciente.",
  "Tecnología y el expediente clínico electrónico en las dos oficinas.",
  "Flujo de pacientes y agenda: una experiencia tranquila y puntual.",
  "Normas y cumplimiento: HIPAA, OIG y requisitos del estado.",
  "Desarrollo del personal: contratación, capacitación y cultura del equipo.",
  "Crecimiento estratégico en las dos oficinas y más allá.",
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

export default function SpanishTatyanaPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            ariaLabel="Migas de pan"
            items={[
              { label: "Inicio", href: "/es" },
              { label: "Quiénes somos", href: "/es/about-us" },
              { label: "Tatyana Baumgartner, CPA" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Directora de operaciones · Miembro de la junta
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Tatyana Baumgartner, CPA
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Directora de operaciones · HTx Pain Institute
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
                  src="/images/tatyana-baumgartner-portrait.webp"
                  alt="Tatyana Baumgartner, CPA, directora de operaciones de HTx Pain Institute, en retrato de hombros con blusa verde oscuro, frente a una pared crema con luz de sol."
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
                  data-analytics-location="tatyana-sidebar"
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
              Moscú, Rusia → Houston, Texas · Junta directiva, Ima&apos;s Home for Children
            </p>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-charcoal-soft">
              Tatyana Baumgartner dirige las operaciones, la experiencia del paciente, el desarrollo del equipo y el
              trabajo comunitario de HTx Pain Institute. Trabaja con el Dr. Baumgartner para construir un consultorio
              con disciplina de instituto y calidez de familia. También forma parte de la junta directiva de Ima&apos;s
              Home for Children, una organización 501(c)(3) que el consultorio apoya desde hace doce años y cuya
              carrera anual de 5K ha presentado durante los últimos cinco.
            </p>

            <div className="mt-12 space-y-12">
              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Su papel en HTx Pain Institute</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  Como directora de operaciones, Tatyana dirige los sistemas que hacen posible el cuidado clínico. Su
                  responsabilidad cubre lo que el paciente no ve y lo que sí siente.
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
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Trayectoria</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  De Moscú al mundo financiero de Estados Unidos, Tatyana aporta experiencia amplia y una exigencia
                  clara de excelencia operativa en el cuidado de la salud. Su formación como CPA y su trayectoria en
                  finanzas le dan al consultorio una estructura que no es común en consultorios médicos independientes.
                </p>
                <p className="mt-4 text-base leading-relaxed text-charcoal-soft">
                  Su estándar de hospitalidad es parte de por qué HTx Pain Institute se siente distinto desde que usted
                  entra. Los pacientes casi nunca ven su trabajo de forma directa. Así está pensado.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">
                  Junta directiva · Ima&apos;s Home for Children
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    Tatyana forma parte de la junta directiva de Ima&apos;s Home for Children, una organización
                    501(c)(3) que cuida a 155 niños huérfanos en Filipinas. Su lugar en la junta nace de una relación
                    personal: la familia Baumgartner conoce a los fundadores por la iglesia y por lazos familiares
                    desde hace años.
                  </p>
                  <p>
                    El consultorio apoya a Ima&apos;s Home desde hace doce años y, bajo su dirección operativa, ha sido
                    el patrocinador principal de la carrera anual de 5K en Walter Hall Park, en League City, durante
                    los últimos cinco.
                  </p>
                  <p>
                    <Link href="/es/community/imas-home" className="font-semibold text-brass-text hover:text-navy">
                      La historia de Ima&apos;s Home for Children
                    </Link>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">En sus palabras</h2>
                <p className="mt-5 font-serif text-xl italic leading-snug text-brass-text">
                  &ldquo;Tratamos a cada paciente como si fuera de la familia, y llevamos este consultorio como
                  llevamos nuestra casa: con cuidado, precisión y una mirada de largo plazo sobre lo que
                  importa.&rdquo;
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Fuera de la clínica</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  Fuera del consultorio, a Tatyana le gusta viajar, el diseño y pasar tiempo con su familia. Sus
                  idiomas son el inglés y el ruso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EsFinalCta />
    </div>
  );
}
