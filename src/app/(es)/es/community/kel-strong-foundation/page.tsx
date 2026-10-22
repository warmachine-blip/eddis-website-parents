import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import FaqAccordion from "@/components/faq-accordion";
import SectionHeading from "@/components/section-heading";
import SupportedOrgSchema from "@/components/supported-org-schema";
import { IconBadge } from "@/components/icon-badge";
import { orgBySlug } from "@/lib/community";
import { spanishPageMetadata } from "@/lib/spanish";

const org = orgBySlug("kel-strong-foundation")!;

const SCHEMA_DESCRIPTION =
  "Organización 501(c)(3) fundada en 2020 por Kel Mabatah, sobreviviente de una lesión cerebral traumática. Financia becas de rehabilitación, defensa y ayuda para la recuperación de personas con lesión cerebral traumática y de sus familias.";

export const metadata: Metadata = spanishPageMetadata({
  title: "Kel Strong Foundation",
  description:
    "La ‘Kel Strong’ Mabatah Foundation financia rehabilitación por lesión cerebral traumática. HTx Pain Institute la apoya y asistió a su gala.",
  en: "/community/kel-strong-foundation",
  es: "/es/community/kel-strong-foundation",
});

const faqs = [
  {
    q: "¿Qué es la ‘Kel Strong’ Mabatah Foundation?",
    a: "La ‘Kel Strong’ Mabatah Foundation es una organización 501(c)(3) sin fines de lucro, fundada en 2020 por Kel Mabatah, sobreviviente de una lesión cerebral traumática. Ofrece becas de rehabilitación, defensa y ayuda para la recuperación a personas que viven con una lesión cerebral traumática y a sus familias. La fundación informa que, desde 2020, ha recaudado más de $350,000.",
  },
  {
    q: "¿Qué es la beca de rehabilitación ‘Kel Strong’?",
    a: "La beca se creó en colaboración con TIRR Memorial Hermann Rehabilitation y la Memorial Hermann Foundation. Existe para cubrir el tramo en el que la cobertura del seguro se termina, se niega o nunca existió. Cubre terapia y equipo médico para que la recuperación no se detenga por razones económicas. Los beneficiarios se eligen cada año.",
  },
  {
    q: "¿Cómo apoya HTx Pain Institute a la fundación?",
    a: "HTx Pain Institute apoya a la fundación económicamente y asistió a su gala anual de recaudación de fondos. La fundación organiza dos eventos al año, un día anual de tenis y una gala anual, y los dos financian la beca de rehabilitación ‘Kel Strong’.",
  },
  {
    q: "¿Cómo puedo apoyar a la fundación de forma directa?",
    a: "Visite kelstrongfoundation.com para donar, conocer la beca de rehabilitación o ver los detalles del día anual de tenis y de la gala anual.",
  },
];

const events = [
  {
    icon: "bolt" as const,
    name: "Día anual de tenis",
    body: "Kel llegó a un ranking nacional juvenil entre los diez primeros, jugó tenis de División I en Purdue y en TCU, y hoy vuelve a jugar, con la mano izquierda. Quienes apoyan, las familias, los patrocinadores y los voluntarios pasan el día en la cancha.",
  },
  {
    icon: "sparkles" as const,
    name: "Gala anual de recaudación",
    body: "Una noche que reúne a sobrevivientes, familias, personas que apoyan, profesionales de la salud y líderes de la comunidad. HTx Pain Institute asistió.",
  },
];

export default function SpanishKelStrongPage() {
  return (
    <div>
      <SupportedOrgSchema org={org} description={SCHEMA_DESCRIPTION} founder="Kel Mabatah" />

      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            ariaLabel="Migas de pan"
            items={[
              { label: "Inicio", href: "/es" },
              { label: "Comunidad", href: "/es/community" },
              { label: "‘Kel Strong’ Mabatah Foundation" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Comunidad
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            La recuperación de una lesión cerebral rara vez termina cuando se acaba la cobertura.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            La ‘Kel Strong’ Mabatah Foundation existe para los meses y los años que vienen después. HTx Pain
            Institute apoya su trabajo, y estuvimos en la sala de la gala anual de recaudación.
          </p>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="La fundación"
              title="Una beca para la parte de la recuperación que nadie presupuesta."
              lead="La ‘Kel Strong’ Mabatah Foundation es una organización 501(c)(3) fundada en 2020. Financia becas de rehabilitación, defensa y ayuda para la recuperación de personas que viven con una lesión cerebral traumática, y de las familias que la cargan con ellas."
            />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-charcoal-soft">
              <p>
                La beca de rehabilitación ‘Kel Strong’ se creó en colaboración con TIRR Memorial Hermann
                Rehabilitation y la Memorial Hermann Foundation. Responde a un problema que la fundación vio de
                cerca: la rehabilitación sigue dando avances mucho después de que el seguro deja de pagarla, la
                niega o nunca estuvo.
              </p>
              <p>
                La beca cubre terapia y el equipo médico que mantiene esos avances en marcha. Los beneficiarios se
                eligen cada año, y la fundación informa que ha recaudado más de $350,000 desde 2020.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <IconBadge icon="shield" tone="brass" />
              <h2 className="mt-4 font-sans text-base font-medium text-navy">Apoye a la fundación</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                Las donaciones, la beca de rehabilitación y los dos eventos anuales están en el sitio de la
                fundación.
              </p>
              <a
                href={org.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full border border-brass bg-brass px-7 py-3 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
              >
                Visitar {org.websiteLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-off-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-4">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">Su fundador</p>
            <h3 className="mt-3 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
              Kel Mabatah fue primero un tenista.
            </h3>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-charcoal-soft lg:col-span-8">
            <p>
              Llegó a un ranking nacional juvenil entre los diez primeros por el sistema de la USTA en Texas, jugó
              tenis de División I en Purdue y después en TCU, y había empezado a competir de forma profesional cuando
              una lesión de codo lo terminó.
            </p>
            <p>
              En 2014 sobrevivió a un ataque que le dejó una lesión cerebral traumática grave. Pasó una semana en
              coma, tuvo cuatro cirugías de cerebro y lo trajeron de regreso a Houston, donde se rehabilitó en
              Memorial Hermann y después en TIRR Memorial Hermann Rehabilitation. Tuvo que volver a aprender a caminar
              y a hablar. Sigue viviendo con parálisis parcial del lado derecho y continúa la rehabilitación
              ambulatoria.
            </p>
            <p>Vuelve a jugar tenis. Lo juega con la mano izquierda.</p>
            <p>
              En 2020 fundó la organización que lleva su nombre, para que otros sobrevivientes tengan acceso a la
              recuperación por la que él tuvo que pelear.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Cómo recauda fondos"
            title="Dos eventos al año. El tenis no es un detalle."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {events.map((e) => (
              <div key={e.name} className="rounded-2xl border border-line bg-white p-7 shadow-sm">
                <IconBadge icon={e.icon} tone="brass" />
                <h3 className="mt-4 font-serif text-xl text-navy">{e.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{e.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-charcoal-soft">
            Las fechas, los boletos y los detalles de patrocinio de los dos eventos los publica la fundación en{" "}
            <a
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brass-text hover:underline"
            >
              {org.websiteLabel}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-off-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">Por qué esta causa</p>
          <h3 className="mt-3 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
            Pasamos los días con personas cuya recuperación duró más que su cobertura.
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-charcoal-soft">
            El dolor crónico y la lesión cerebral son condiciones distintas, pero comparten una forma: el tramo más
            difícil suele empezar cuando termina el cuidado agudo y se acaba el financiamiento. Ese es el tramo que
            esta fundación paga.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-charcoal-soft">
            También está cerca de un trabajo que ya hacemos. Atendemos{" "}
            <Link href="/sports-injuries" className="font-semibold text-brass-text hover:underline">
              lesiones deportivas (en inglés)
            </Link>{" "}
            en todos los niveles, y sabemos lo que significa para un atleta perder su deporte, y lo que cuesta
            recuperar alguna parte.
          </p>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="Preguntas" title="Preguntas frecuentes" />
          <div className="mt-10 max-w-3xl">
            <FaqAccordion faqs={faqs} allClosed />
          </div>
          <p className="mt-8 max-w-3xl text-center text-sm text-charcoal-soft">
            ¿Quiere apoyar a la fundación de forma directa? Visite{" "}
            <a
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brass-text hover:underline"
            >
              {org.websiteLabel}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
