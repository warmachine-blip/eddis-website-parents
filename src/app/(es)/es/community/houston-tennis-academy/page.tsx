import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import FaqAccordion from "@/components/faq-accordion";
import JsonLd from "@/components/json-ld";
import SectionHeading from "@/components/section-heading";
import { IconBadge } from "@/components/icon-badge";
import { orgBySlug } from "@/lib/community";
import { absolute, ORG_ID, supportedOrgId } from "@/lib/schema";
import { spanishPageMetadata } from "@/lib/spanish";

const org = orgBySlug("houston-tennis-academy")!;
const PAGE_URL = absolute("/es/community/houston-tennis-academy");

export const metadata: Metadata = spanishPageMetadata({
  title: "Houston Tennis Academy",
  description:
    "HTx Pain Institute colabora con Houston Tennis Academy en la prevención de lesiones y con la comunidad de tenis juvenil de Houston.",
  en: "/community/houston-tennis-academy",
  es: "/es/community/houston-tennis-academy",
});

const TALK_DATE = "Fecha por anunciar";

const events = [
  {
    icon: "bolt" as const,
    name: "Charla de prevención de lesiones",
    meta: `${TALK_DATE} · Houston Tennis Academy`,
    body: "Una introducción a la carga que el tenis juvenil pone en un cuerpo que crece, y a los hábitos que ayudan a los jugadores a adelantarse a esa carga.",
  },
  {
    icon: "pulse" as const,
    name: "Recuperación y rendimiento",
    body: "Charlas de recuperación y rendimiento: calentamiento, movilidad, sueño y recuperación entre partidos.",
  },
  {
    icon: "shield" as const,
    name: "Una noche para padres sobre la carga de entrenamiento",
    body: "Cuánto es demasiado para los jugadores jóvenes, y qué molestias conviene vigilar.",
  },
];

const faqs = [
  {
    q: "¿En qué consiste la colaboración entre HTx Pain Institute y Houston Tennis Academy?",
    a: "HTx Pain Institute colabora con Houston Tennis Academy y con su cofundador, Nikolay “Koko” Gantchev, para promover la prevención de lesiones y apoyar a la comunidad de tenis juvenil de Houston, con educación y eventos. No es una donación ni un patrocinio.",
  },
];

export default function SpanishHoustonTennisPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsOrganization",
        "@id": supportedOrgId(org.slug),
        name: org.name,
        url: org.website,
        sport: "Tenis",
        description:
          "Programa de tenis juvenil en Club Westside, al oeste de Houston, cofundado por Nikolay Gantchev e Ivan Ivanov, para jugadores de 5 a 18 años.",
        subjectOf: { "@id": `${PAGE_URL}#webpage` },
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Colaboración con Houston Tennis Academy",
        inLanguage: "es",
        about: { "@id": supportedOrgId(org.slug) },
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        inLanguage: "es",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            ariaLabel="Migas de pan"
            items={[
              { label: "Inicio", href: "/es" },
              { label: "Comunidad", href: "/es/community" },
              { label: "Houston Tennis Academy" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Comunidad
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Mantener sanos y en la cancha a los jóvenes tenistas de Houston.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            HTx Pain Institute colabora con Houston Tennis Academy en Club Westside y con su cofundador y director
            del programa, Nikolay &ldquo;Koko&rdquo; Gantchev. Compartimos una meta sencilla: ayudar a los jugadores
            jóvenes a entrenar con exigencia, cuidarse y seguir jugando.
          </p>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="La colaboración"
              title="Dos tipos de experiencia, apuntando al mismo problema."
            />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-charcoal-soft">
              <p>
                La colaboración se centra en la prevención de lesiones y en el apoyo a la comunidad de tenis de
                Houston. Koko aporta más de tres décadas de experiencia como entrenador, incluidos siete años como
                entrenador de tiempo completo en el circuito WTA. El Dr. Edward Baumgartner aporta la mirada de un
                médico sobre cómo la carga repetida afecta hombros, codos, espalda y rodillas, y sobre qué hacer
                cuando el dolor empieza a aparecer. El Dr. Baumgartner atiende en inglés.
              </p>
              <p>
                Esta es una colaboración, no una donación. HTx Pain Institute no financia ni patrocina a la academia.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/tennis-player-mid-swing-clay-court.jpg"
                alt="Un joven con ropa deportiva y gorra oscura golpea una raqueta de tenis con las dos manos en una cancha de arcilla al aire libre, con los pies bien abiertos."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="Eventos" title="Lo que estamos haciendo juntos." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <div key={e.name} className="flex h-full flex-col rounded-2xl border border-line bg-off-white p-7 shadow-sm">
                <IconBadge icon={e.icon} tone="brass" />
                <h3 className="mt-4 font-serif text-xl leading-tight text-navy">{e.name}</h3>
                {e.meta ? (
                  <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">{e.meta}</p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="Sobre Houston Tennis Academy" title="Un programa juvenil en Club Westside." />
          <div className="mt-6 grid max-w-5xl gap-x-14 gap-y-4 text-base leading-relaxed text-charcoal-soft lg:grid-cols-2">
            <p>
              Houston Tennis Academy es un programa de tenis juvenil en Club Westside, al oeste de Houston, cofundado
              por Nikolay Gantchev e Ivan Ivanov. La academia entrena jugadores de 5 a 18 años. Los programas van
              desde Quick Start, para los principiantes más pequeños, hasta Challenger y Super Champ, para juniors
              competitivos de más edad, y un programa semanal de Junior Development para jugadores de 11 años en
              adelante.
            </p>
            <p>
              Koko nació en Ruse, Bulgaria. Empezó a entrenar en Austria en 1992 y después dirigió el programa de
              tenis de Tennis Club Hard. De 1995 a 2002 fue entrenador de tiempo completo en el circuito WTA, antes
              de cofundar Houston Tennis Academy.
            </p>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-charcoal-soft">
            <a
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brass-text hover:underline"
            >
              Houston Tennis Academy
            </a>
            , {org.websiteLabel}
          </p>
        </div>
      </section>

      <section className="bg-off-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <p className="text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
            ¿Tiene un dolor que no cede?{" "}
            <Link
              href="/sports-injuries"
              className="text-brass-text underline decoration-brass decoration-2 underline-offset-4 hover:text-navy"
            >
              Conozca el cuidado de lesiones deportivas (en inglés)
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="Preguntas" title="Preguntas frecuentes" />
          <div className="mt-10 max-w-3xl">
            <FaqAccordion faqs={faqs} allClosed />
          </div>
        </div>
      </section>
    </div>
  );
}
