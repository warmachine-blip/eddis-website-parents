import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { IconBadge } from "@/components/icon-badge";
import SectionHeading from "@/components/section-heading";
import { supportedOrgs } from "@/lib/community";
import { spanishPageMetadata } from "@/lib/spanish";

export const metadata: Metadata = spanishPageMetadata({
  title: "Comunidad",
  description:
    "Organizaciones que apoya HTx Pain Institute: Ima's Home for Children, la ‘Kel Strong’ Mabatah Foundation y Houston Tennis Academy.",
  en: "/community",
  es: "/es/community",
});

const copy: Record<string, { summary: string; involvement: string }> = {
  "imas-home": {
    summary: "Una organización 501(c)(3) que cuida a unos 155 niños huérfanos y abandonados en Filipinas.",
    involvement:
      "Doce años de apoyo, los últimos cinco como patrocinador principal de la carrera anual de 5K. Tatyana Baumgartner forma parte de la junta directiva.",
  },
  "kel-strong-foundation": {
    summary:
      "Una organización 501(c)(3) que financia rehabilitación y recuperación para personas con lesión cerebral traumática.",
    involvement:
      "HTx Pain Institute apoya a la fundación económicamente y asistió a su gala anual de recaudación de fondos.",
  },
  "houston-tennis-academy": {
    summary: "Un programa de tenis juvenil en Club Westside, al oeste de Houston, para jugadores de 5 a 18 años.",
    involvement:
      "HTx Pain Institute colabora con la academia en la prevención de lesiones, con charlas para jugadores y para padres.",
  },
};

export default function SpanishCommunityPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark ariaLabel="Migas de pan" items={[{ label: "Inicio", href: "/es" }, { label: "Comunidad" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Comunidad
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            El trabajo que apoyamos fuera de la clínica.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Dos organizaciones que ayudamos a financiar y una colaboración: un programa de tenis juvenil cuyo trabajo
            es mantener a los jugadores jóvenes fuera de la clínica desde el principio.
          </p>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Organizaciones y colaboradores"
            title="A quién apoyamos, con quién colaboramos y de qué manera."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supportedOrgs.map((org) => {
              const text = copy[org.slug];
              return (
                <article
                  key={org.slug}
                  className="flex flex-col rounded-2xl border border-line bg-off-white p-7 shadow-sm sm:p-9"
                >
                  <IconBadge icon={org.icon} tone="brass" />
                  <h2 className="mt-5 font-serif text-2xl leading-tight text-navy">
                    <Link href={`/es${org.href}`} className="hover:text-brass-text">
                      {org.name}
                    </Link>
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-charcoal-soft">{text.summary}</p>
                  <p className="mt-4 border-l-2 border-brass/40 pl-4 text-sm leading-relaxed text-charcoal-soft">
                    {text.involvement}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
                    <Link
                      href={`/es${org.href}`}
                      className="rounded-full border border-brass bg-brass px-6 py-3 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
                    >
                      Leer más
                    </Link>
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brass-text hover:underline"
                    >
                      {org.websiteLabel}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
