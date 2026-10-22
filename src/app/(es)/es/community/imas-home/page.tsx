import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import FaqAccordion from "@/components/faq-accordion";
import SectionHeading from "@/components/section-heading";
import SupportedOrgSchema from "@/components/supported-org-schema";
import { IconBadge } from "@/components/icon-badge";
import { orgBySlug } from "@/lib/community";
import { spanishPageMetadata } from "@/lib/spanish";

const org = orgBySlug("imas-home")!;

const SCHEMA_DESCRIPTION =
  "Organización 501(c)(3) fundada en 2013 que cuida a niños huérfanos y abandonados en Filipinas, con alimento, techo, educación, atención médica y un entorno de familia.";

export const metadata: Metadata = spanishPageMetadata({
  title: "Ima's Home for Children",
  description:
    "Ima's Home for Children cuida a 155 niños huérfanos en Filipinas. Doce años de apoyo de HTx Pain Institute, cinco como patrocinador del 5K.",
  en: "/community/imas-home",
  es: "/es/community/imas-home",
});

const quickLinks = [
  { label: "Inscribirse al 5K", sub: "imas5k.itsyourrace.com", href: "https://imas5k.itsyourrace.com", icon: "bolt" as const },
  { label: "Donar a Ima's Home", sub: "imashome.com/give", href: "https://imashome.com/give", icon: "shield" as const },
  { label: "Apadrinar a un niño", sub: "imashome.com", href: "https://imashome.com", icon: "pulse" as const },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const faqs = [
  {
    q: "¿Qué es Ima's Home for Children?",
    a: "Ima's Home for Children es una organización 501(c)(3) sin fines de lucro, fundada en 2013, que cuida a niños huérfanos y abandonados en Filipinas. En 2026, el hogar cuida a unos 155 niños y les da alimento, techo, educación, atención médica y un entorno de familia.",
  },
  {
    q: "¿Cómo participa HTx Pain Institute?",
    a: "HTx Pain Institute apoya a Ima's Home for Children desde hace doce años y ha sido el patrocinador principal de la carrera anual Ima's Home 5K durante los últimos cinco años consecutivos. Tatyana Baumgartner, directora de operaciones de HTx Pain Institute, forma parte de la junta directiva de Ima's Home for Children. La familia Baumgartner conoce a los fundadores por la iglesia y por lazos familiares desde hace años.",
  },
  {
    q: "¿Cuándo y dónde es el Ima's Home 5K?",
    a: "La carrera anual Ima's Home 5K se hace cada febrero en Walter Hall Park, en League City, Texas. El evento incluye la carrera de 5K y un 1K para niños. La meta de recaudación de 2026 es $140,000 para el hogar.",
  },
  {
    q: "¿Cómo puedo participar o donar?",
    a: "Puede inscribirse al 5K en imas5k.itsyourrace.com, donar en imashome.com/give o conocer el apadrinamiento en imashome.com. Cada dólar ayuda a cubrir alimento, techo, educación y cuidado de los niños.",
  },
];

export default function SpanishImasHomePage() {
  return (
    <div>
      <SupportedOrgSchema org={org} description={SCHEMA_DESCRIPTION} />

      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            ariaLabel="Migas de pan"
            items={[
              { label: "Inicio", href: "/es" },
              { label: "Comunidad", href: "/es/community" },
              { label: "Ima's Home for Children" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Comunidad
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Para la familia Baumgartner, apoyar a Ima&apos;s Home for Children es más que filantropía.
          </h1>
          <p className="mt-4 max-w-xl font-serif text-xl italic text-brass-light">
            Es familia. Doce años de apoyo, los últimos cinco como patrocinador principal. Un lugar en la junta. Una
            relación de años, en dos continentes.
          </p>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="La causa y los niños"
              title="155 niños. Un hogar construido alrededor de la dignidad."
              lead="Ima's Home for Children es una organización 501(c)(3) sin fines de lucro, fundada en 2013, que cuida a niños huérfanos y abandonados en Filipinas. En 2026, el hogar cuida a unos 155 niños. Muchos llegaron después de pobreza, maltrato o abandono."
            />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-charcoal-soft">
              <p>
                El hogar da lo que una familia debe dar: alimento, techo, educación, atención médica y la experiencia
                diaria de ser conocido y querido. La meta no es solo sobrevivir. Es criar niños que lleguen a ser
                adultos sanos, educados y que aporten.
              </p>
              <p>
                La meta de recaudación de 2026, anclada en la carrera anual de 5K, es $140,000. Cada dólar financia el
                día a día de un hogar para 155 niños al otro lado del mundo.
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <IconBadge icon="shield" tone="brass" />
              <h2 className="mt-4 font-sans text-base font-medium text-navy">Cómo participar</h2>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-lg bg-pearl px-4 py-3 text-sm font-medium text-navy transition-colors hover:bg-brass/10 hover:text-brass-text"
                    >
                      <span>
                        {l.label}
                        <span className="mt-0.5 block text-xs font-normal text-charcoal-soft">{l.sub}</span>
                      </span>
                      <ArrowIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-navy-deep p-6 text-center text-off-white">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-light">
                Doce años de apoyo
              </p>
              <p className="mt-2 text-sm leading-relaxed text-off-white/75">
                Doce años junto a Ima&apos;s Home, los últimos cinco como patrocinador principal de la carrera anual
                de 5K.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-off-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-4">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">Por qué esta causa</p>
            <h3 className="mt-3 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
              Una relación personal. Un compromiso que se sostiene.
            </h3>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-charcoal-soft lg:col-span-8">
            <p>
              La relación entre la familia Baumgartner e Ima&apos;s Home for Children empezó por la iglesia y por
              lazos familiares, mucho antes de que existiera HTx Pain Institute. Los fundadores de Ima&apos;s Home son
              familia, no en sentido figurado, sino en el sentido largo y ordinario de los años, las comidas y los
              niños que crecen juntos.
            </p>
            <p>
              Tatyana Baumgartner, nuestra directora de operaciones, forma parte de la junta directiva de Ima&apos;s
              Home for Children. Su lugar en la junta no es honorario. Ayuda a dirigir las operaciones de la
              organización con la misma precisión con la que lleva HTx Pain Institute.
            </p>
            <p>
              <Link href="/es/tatyana-baumgartner-cpa" className="font-semibold text-brass-text hover:text-navy">
                La biografía de Tatyana Baumgartner, CPA
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">El 5K</p>
            <h3 className="mt-3 max-w-xl text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
              Febrero en League City, el día en que todo lo demás se detiene.
            </h3>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-charcoal-soft">
              <p>
                La carrera anual Ima&apos;s Home 5K se hace cada febrero en Walter Hall Park, en League City, Texas.
                El evento incluye la carrera de 5K y un 1K para niños, a propósito, para que toda la familia pueda
                hacerlo junta.
              </p>
              <p>
                El equipo de HTx Pain Institute llega en fuerza cada año: médicos, enfermeras, personal de recepción,
                familiares y pacientes que corren con nosotros. Muchos de nuestros pacientes lo han hecho tradición.
                Ojalá la suya también lo sea.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {quickLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:border-brass"
                >
                  <IconBadge icon={l.icon} tone="brass" />
                  <p className="mt-4 text-sm font-semibold text-navy">{l.label}</p>
                  <p className="mt-1 text-xs text-charcoal-soft">{l.sub}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-navy-deep p-8 text-center text-off-white">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-light">Meta 2026</p>
              <p className="mt-3 font-serif text-5xl">$140,000</p>
              <p className="mt-4 text-sm leading-relaxed text-off-white/75">
                Cada dólar financia alimento, techo, educación, atención médica y la experiencia diaria de ser
                conocido y querido. Ayúdenos a llegar a la meta.
              </p>
              <a
                href="https://imashome.com/give"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full border border-brass bg-brass px-7 py-3 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
              >
                Donar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-off-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
            Doce años, y siguen
          </p>
          <h3 className="mt-3 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
            En cada cambio de nombre, el compromiso se ha profundizado.
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-charcoal-soft">
            Por eso el compromiso se sostuvo en cada cambio de nombre y en cada etapa de crecimiento del consultorio.
            De Texas Interventional Pain Specialists a HTx Pain Care y a HTx Pain Institute, el consultorio ha estado
            ahí, cada febrero, en League City, con el equipo en camisetas iguales. Los últimos cinco años lo ha hecho
            como patrocinador principal de la carrera anual de 5K.
          </p>
          <p className="mt-6 font-serif text-xl italic text-brass-text">Doce años, y siguen.</p>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="Preguntas" title="Preguntas frecuentes" />
          <div className="mt-10 max-w-3xl">
            <FaqAccordion faqs={faqs} allClosed />
          </div>
          <p className="mt-8 max-w-3xl text-center text-sm text-charcoal-soft">
            ¿Quiere apoyar a Ima&apos;s Home de forma directa? Visite{" "}
            <a
              href="https://imashome.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brass-text hover:underline"
            >
              imashome.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
