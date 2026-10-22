import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConditionCard from "@/components/condition-card";
import EsFinalCta from "@/components/es-final-cta";
import EsHeroHeadline from "@/components/es-hero-headline";
import HeroBackground from "@/components/hero-background";
import { IconBadge } from "@/components/icon-badge";
import ScrollStroke from "@/components/scroll-stroke";
import SectionHeading from "@/components/section-heading";
import { TiltCard, TiltCardGroup } from "@/components/tilt-card";
import { conditions } from "@/lib/conditions";
import { offices, practice } from "@/lib/nav";
import { reviews } from "@/lib/reviews";
import { services, type Service } from "@/lib/services";
import { txTopDocsUrl } from "@/lib/social";
import { HOURS_CLOSED_ES, HOURS_ES, spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";
import { spanishLabel } from "@/lib/spanish-nav";

export const metadata: Metadata = {
  ...spanishPageMetadata({
    title: "Dolor en Houston y Humble",
    description:
      "Especialista en dolor con doble certificación: Dr. Edward Baumgartner Jr., MD, en Houston (Willowbrook) y Humble. A menudo hay consultas en la misma semana.",
    en: "/",
    es: "/es",
  }),
  title: { absolute: "HTx Pain Institute · Especialista en dolor en Houston, TX" },
};

const heroStats: { value: string; label: string; href?: string }[] = [
  { value: "15+", label: "Años de experiencia" },
  { value: "10K+", label: "Procedimientos" },
  { value: `${reviews.rating}★`, label: `${reviews.reviewCountFloor} opiniones`, href: "#reviews" },
];

const valueProps = [
  { title: "Con guía de imagen", subtitle: "Procedimientos de precisión" },
  { title: "La misma semana", subtitle: "Citas" },
  { title: "Atención personalizada", subtitle: "Para cada paciente" },
  { title: "Dentro de la red", subtitle: "Principales aseguradoras" },
];

const credentials = [
  {
    icon: "shield" as const,
    title: "Doble certificación",
    subtitle: "Anestesiología y medicina del dolor",
  },
  { icon: "cap" as const, title: "Rush University", subtitle: "Residencia y subespecialidad" },
  {
    icon: "award" as const,
    title: "Beca de investigación",
    subtitle: "Alpha Omega Alpha Research Fellowship, una beca de investigación",
  },
  {
    icon: "stethoscope" as const,
    title: "Director médico",
    subtitle: "US Pain & Spine Hospital, antes de fundar el consultorio",
  },
];

const whyHtx = [
  {
    title: "Doble certificación",
    body: "Anestesiología y medicina del dolor: una formación que refleja dominio técnico y una subespecialidad bien definida.",
  },
  {
    title: "El paciente primero",
    body: "El Dr. Baumgartner dejó el trabajo en un grupo médico para crear una clínica que da prioridad al tiempo, a escuchar y a los planes personalizados, por encima del volumen de pacientes.",
  },
  {
    title: "Tratamientos de vanguardia",
    body: "Estimulación de la médula espinal, ablación del nervio basivertebral (BVN), cifoplastia, ablación por radiofrecuencia (RFA) y PRP: las opciones más actuales, aplicadas con destreza.",
  },
  {
    title: "Enfoque no invasivo",
    body: "Enfoques con respaldo científico que reducen la dependencia de medicamentos y cuidan su calidad de vida.",
  },
];

const serviceCopy: Record<string, { title: string; summary: string }> = {
  "radiofrequency-ablation": {
    title: "Ablación por radiofrecuencia",
    summary: "Procedimiento ambulatorio que usa una corriente eléctrica precisa para calmar nervios dañados o inflamados.",
  },
  "injections-blocks-specialist": {
    title: "Inyecciones y bloqueos nerviosos",
    summary: "Inyecciones con guía de imagen que calman articulaciones, nervios y estructuras de la columna inflamados.",
  },
  "kyphoplasty-specialist": {
    title: "Cifoplastia",
    summary: "Procedimiento mínimamente invasivo que estabiliza fracturas vertebrales por compresión que causan dolor.",
  },
  "si-joint-fusions": {
    title: "Fusión de la articulación SI",
    summary: "Fusión mínimamente invasiva para la disfunción sacroilíaca que no ha mejorado con tratamiento conservador.",
  },
  "spinal-cord-stimulation-specialist": {
    title: "Estimulación de la médula espinal",
    summary:
      "Sistema implantable que envía campos eléctricos suaves para bloquear las señales de dolor antes de que lleguen al cerebro.",
  },
  "intracept-procedure": {
    title: "Ablación del nervio basivertebral (BVN)",
    summary: "Actúa sobre el nervio basivertebral para tratar el dolor lumbar crónico en su origen anatómico.",
  },
  "prp-procedure": {
    title: "PRP (plasma rico en plaquetas)",
    summary: "Terapia regenerativa no quirúrgica que usa sus propias plaquetas para acelerar la cicatrización.",
  },
  "mild-procedure": {
    title: "Procedimiento MILD",
    summary:
      "Descompresión lumbar mínimamente invasiva para aliviar el dolor al caminar (claudicación neurógena) por estenosis espinal.",
  },
  "minuteman-procedure": {
    title: "Fusión lumbar Minuteman",
    summary:
      "Implante interespinoso e interlaminar posterior que estabiliza un segmento lumbar doloroso de forma mínimamente invasiva.",
  },
  peptides: {
    title: "Bienestar y péptidos",
    summary:
      "Terapias con péptidos y programas de pérdida de peso supervisados por el médico. Pronto tendremos una página dedicada al bienestar.",
  },
};

const conditionCopy: Record<string, { title: string; summary: string }> = {
  "neuropathic-pain": {
    title: "Dolor neuropático",
    summary: "Dolor quemante, eléctrico o con hormigueo, causado por una lesión o una irritación de los propios nervios.",
  },
  "chronic-pain": {
    title: "Dolor crónico",
    summary: "Dolor que sigue después del tiempo esperado de cicatrización, y el plan completo que requiere.",
  },
  "joint-pain": {
    title: "Dolor de articulaciones",
    summary: "Del hombro a la cadera: cuidado con guía de imagen para las articulaciones que le permiten moverse.",
  },
  "knee-pain": {
    title: "Dolor de rodilla",
    summary:
      "Artritis, dolor de tendones y rodillas que siguen doliendo después de una cirugía, del cartílago a los nervios que llegan a la articulación.",
  },
  "neck-pain": {
    title: "Dolor de cuello",
    summary: "Cuidado de precisión para la columna cervical, sin apresurarse a una cirugía.",
  },
  "back-pain": {
    title: "Dolor de espalda",
    summary: "El motivo más frecuente por el que llegan los pacientes, y el área en la que más podemos ofrecer.",
  },
  "other-pain-conditions": {
    title: "Otros tipos de dolor",
    summary: "Dolores de cabeza, dolor abdominal, dolor después de una cirugía, síndrome de dolor regional complejo (CRPS) y más.",
  },
  sciatica: {
    title: "Ciática",
    summary: "Dolor que baja por la pierna por compresión o irritación del nervio ciático.",
  },
  "herniated-discs": {
    title: "Hernia de disco",
    summary: "Cuando el material blando del interior del disco atraviesa la pared externa e irrita un nervio.",
  },
  "spinal-stenosis": {
    title: "Estenosis espinal",
    summary: "Estrechamiento del canal espinal que comprime los nervios y limita la capacidad de caminar.",
  },
  "hip-pain": {
    title: "Dolor de cadera",
    summary: "De la bursitis a la osteoartritis: cuidado con guía de imagen para la articulación de la cadera.",
  },
  "shoulder-injuries": {
    title: "Lesiones de hombro",
    summary: "Problemas del manguito rotador, del labrum (cartílago del hombro) y de los tendones: diagnóstico preciso y tratamiento cuidadoso.",
  },
  migraines: {
    title: "Migraña y dolor de cabeza crónico",
    summary: "Más allá del manejo con medicamentos: opciones intervencionistas cuando el dolor de cabeza no responde.",
  },
  fibromyalgia: {
    title: "Fibromialgia",
    summary: "Una condición que afecta a toda la persona, y que se beneficia de un plan coordinado e individual.",
  },
  "sports-injuries": {
    title: "Lesiones deportivas",
    summary: "Vuelva a su deporte con estudios y terapias regenerativas que respetan el tiempo de recuperación.",
  },
  "post-surgical-pain": {
    title: "Dolor después de una cirugía",
    summary: "Cuando la cirugía resolvió el problema, pero el dolor siguió: opciones intervencionistas que pueden ayudar.",
  },
};

const injuries = [
  {
    title: "Lesiones y accidentes de trabajo",
    body: "Atención integral para lesiones en el trabajo, como distensiones de espalda y cuello, lesiones por esfuerzo repetitivo y dolor después de un accidente. Trabajamos con las aseguradoras de compensación laboral y con los administradores de casos.",
    href: "/work-injuries-accidents",
  },
  {
    title: "Lesiones por accidente de auto",
    body: "El latigazo cervical, los dolores de cabeza después de una conmoción y el dolor crónico de columna después de un choque están entre las lesiones que más vemos sin diagnosticar. Preparamos documentación detallada para su abogado.",
    href: "/motor-vehicle-injuries",
  },
];

const officeName: Record<string, string> = {
  houston: "Houston (Willowbrook)",
  humble: "Humble (FM 1960)",
};

function localizedService(service: Service): Service {
  const copy = serviceCopy[service.slug];
  return {
    ...service,
    title: spanishLabel(service.title),
    summary: copy?.summary ?? service.summary,
    href: service.slug === "intracept-procedure" ? "/es/intracept-procedure" : service.href,
  };
}

export default function SpanishHomePage() {
  const liveServices = services.filter((service) => !service.comingSoon).map(localizedService);
  const soonServices = services.filter((service) => service.comingSoon).map(localizedService);
  const liveConditions = conditions
    .filter((condition) => !condition.deEmphasized)
    .map((condition) => {
      const copy = conditionCopy[condition.slug];
      return copy ? { ...condition, title: spanishLabel(condition.title), summary: copy.summary } : condition;
    });

  return (
    <>
      <section className="relative flex items-center overflow-hidden bg-charcoal max-md:min-h-[70svh] max-md:flex-col md:min-h-[88svh]">
        <HeroBackground />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-[100px]">
          <div className="max-w-[520px] text-off-white">
            <div className="mb-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
              <span className="h-px w-8 bg-brass-light" aria-hidden="true" />
              Manejo del dolor en Houston y Humble, TX
            </div>
            <EsHeroHeadline />
            <p className="mb-6 max-w-[520px] text-[20px] leading-[1.6] text-off-white/85 max-md:text-[17px]">
              Manejo intervencionista avanzado del dolor y bienestar regenerativo, adaptado a su vida, a sus metas y a
              su cuerpo.
            </p>
            <p className="mb-11 max-w-[520px] text-sm leading-relaxed text-off-white/80">{STAFF_NOTE_ES}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/es/request-appointment"
                data-analytics-location="homepage-hero"
                className="border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep transition-colors hover:bg-brass-light"
              >
                Pedir cita
              </Link>
              <Link
                href="#services"
                className="border border-off-white bg-transparent px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white transition-colors hover:bg-off-white hover:text-navy-deep"
              >
                Ver los servicios
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 z-10 flex gap-10 rounded-sm border border-brass-deep/35 bg-pearl/95 px-8 py-[22px] backdrop-blur-[10px] max-md:static max-md:mx-5 max-md:mb-10 max-md:gap-5 max-md:bg-pearl max-md:px-5 max-md:py-[18px]">
          {heroStats.map((stat) => {
            const body = (
              <>
                <div className="mb-1 font-serif text-[32px] font-medium leading-none text-brass-deep max-md:text-[24px]">
                  {stat.value}
                </div>
                <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-charcoal-soft">{stat.label}</div>
              </>
            );
            return stat.href ? (
              <Link key={stat.label} href={stat.href} className="rounded-sm text-center transition-opacity hover:opacity-75">
                {body}
              </Link>
            ) : (
              <div key={stat.label} className="text-center">
                {body}
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line bg-navy-deep">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4 lg:px-10">
          {valueProps.map((item) => (
            <div key={item.title} className="text-center">
              <p className="font-serif text-lg text-brass-light">{item.title}</p>
              <p className="mt-1 font-sans text-xs uppercase tracking-wide text-off-white/60">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <ScrollStroke
        copy={{
          eyebrow: "Nuestra filosofía",
          title: (
            <>
              Un camino preciso,
              <br />
              trazado para usted.
            </>
          ),
          body: "No hay dos pacientes que sientan el dolor de la misma manera, así que los planes de tratamiento tampoco deberían ser iguales.",
        }}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="group relative aspect-[3/2] w-full overflow-hidden border border-line">
              <Image
                src="/images/dr-baumgartner.webp"
                alt="Edward Baumgartner Jr., MD, en HTx Pain Institute"
                fill
                sizes="(min-width: 1024px) 560px, calc(100vw - 48px)"
                className="object-cover object-[50%_18%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" aria-hidden="true" />
              <a
                href="https://www.youtube.com/watch?v=G9UXJJICk-w"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reproducir el video en inglés: Conozca al Dr. Edward Baumgartner, en YouTube"
                className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-charcoal/30 backdrop-blur-sm transition-transform hover:scale-105"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brass">
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-navy-deep" aria-hidden="true">
                    <path d="M8 5v14l11-7Z" />
                  </svg>
                </span>
              </a>
              <div className="absolute inset-x-0 bottom-0 hidden p-6 sm:block">
                <span className="inline-block bg-charcoal/70 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-off-white">
                  Conozca a su médico
                </span>
                <p className="mt-3 max-w-sm font-serif text-2xl leading-tight text-off-white">
                  Por qué fundé HTx Pain, y qué hace distinto el cuidado que damos.
                </p>
              </div>
            </div>
            <div className="mt-4 sm:hidden">
              <span className="inline-block bg-navy-deep px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-off-white">
                Conozca a su médico
              </span>
              <p className="mt-3 font-serif text-xl leading-tight text-navy">
                Por qué fundé HTx Pain, y qué hace distinto el cuidado que damos.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brass-text">
              <span className="h-px w-8 bg-brass" aria-hidden="true" />
              Conozca al Dr. Baumgartner
            </div>
            <h2 className="text-balance font-serif text-3xl leading-[1.15] text-navy sm:text-4xl lg:text-[2.75rem]">
              Criado en Houston. Formado en Chicago. De vuelta en casa para poner al paciente primero.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-soft">
              Edward Baumgartner Jr., MD, fundó HTx Pain Institute con una misión clara: traer a Houston el conjunto
              actual de tratamientos intervencionistas, con el tiempo, la precisión y el criterio que cada paciente
              merece. El mismo cuidado que él querría para su propia familia. Opera en Townsen Memorial Hospital, Houston
              Methodist Willowbrook y St. Luke&apos;s Health.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-charcoal-soft">{STAFF_NOTE_ES}</p>
            <TiltCardGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {credentials.map((item) => (
                <TiltCard
                  key={item.title}
                  id={item.title}
                  className="rounded-xl border border-card-border bg-white p-5 shadow-[0_1px_3px_rgba(26,39,64,0.06),0_8px_24px_-4px_rgba(26,39,64,0.08)]"
                >
                  <IconBadge icon={item.icon} tone="brass" />
                  <p className="mt-4 font-serif text-lg text-navy">{item.title}</p>
                  <p className="mt-1 text-sm text-charcoal-soft">{item.subtitle}</p>
                </TiltCard>
              ))}
            </TiltCardGroup>
            <p className="mt-5 text-sm leading-relaxed text-charcoal-soft">
              Reconocido como{" "}
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
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="/es/dr-edward-baumgartner"
                className="inline-flex items-center gap-2 bg-navy-deep px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-off-white transition-colors hover:bg-navy"
              >
                Leer la biografía
                <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                href="/es/request-appointment"
                data-analytics-location="homepage-physician"
                className="inline-flex min-h-11 items-center font-sans text-sm font-semibold text-navy underline decoration-brass decoration-2 underline-offset-4 hover:text-brass-text"
              >
                Pedir cita con el Dr. Baumgartner
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-t border-line bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <SectionHeading
            eyebrow="Qué tratamos"
            title="Cuidado intervencionista moderno, adaptado a su dolor."
            lead="Procedimientos con guía de imagen, terapias regenerativas y todas las opciones modernas de la medicina del dolor, aplicados con la precisión y el buen juicio que cada paciente merece."
          />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal-soft">
            Estas páginas están en inglés, excepto la de ablación del nervio basivertebral (BVN).
          </p>
          <TiltCardGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {liveServices.map((service) => (
              <TiltCard
                key={service.slug}
                id={service.slug}
                href={service.href}
                contentClassName="flex h-full flex-col justify-between"
                className="rounded-2xl border border-card-border bg-white p-6 transition-[border-color] duration-300 hover:border-brass-light shadow-[0_1px_3px_rgba(26,39,64,0.06),0_8px_24px_-4px_rgba(26,39,64,0.08)] hover:shadow-[0_4px_8px_rgba(26,39,64,0.06),0_20px_40px_-8px_rgba(26,39,64,0.12)]"
              >
                <div>
                  <IconBadge icon={service.icon} tone="brass" hover />
                  <h3 className="mt-5 font-serif text-xl text-navy">{service.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-charcoal-soft">{service.summary}</p>
                </div>
                <p className="mt-5 font-sans text-sm font-medium text-brass-text">
                  {service.href.startsWith("/es") ? "Ver más" : "Ver más, en inglés"}
                </p>
              </TiltCard>
            ))}
          </TiltCardGroup>
          {soonServices.map((service) => (
            <Link
              key={service.slug}
              href={service.href}
              className="mt-5 flex flex-col gap-2 rounded-2xl border border-card-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-serif text-lg text-navy">{service.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-soft">{service.summary}</p>
              </div>
              <span className="font-sans text-sm font-medium text-brass-text">Ver más, en inglés</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Centro del dolor"
          title="Las condiciones que tratamos, con el conocimiento especializado que requieren."
          lead="Del dolor neuropático al dolor crónico de espalda, el dolor de rodilla y más: encuentre el diagnóstico que corresponde y el camino a seguir."
        />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal-soft">Estas páginas están en inglés.</p>
        <TiltCardGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveConditions.map((condition) => (
            <ConditionCard key={condition.slug} condition={condition} />
          ))}
        </TiltCardGroup>
        <div className="mt-10 text-center">
          <Link
            href="/pain-center"
            className="inline-flex items-center gap-2 bg-navy-deep px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-off-white transition-colors hover:bg-navy"
          >
            Ver el centro del dolor, en inglés
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-navy-deep text-off-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <SectionHeading
            tone="dark"
            eyebrow="Por qué HTx Pain"
            title="Elevamos el estándar del cuidado del dolor."
            lead="Una clínica construida alrededor de la excelencia clínica y de la relación humana entre el médico y el paciente, sin ceder en ninguna de las dos."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyHtx.map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-xl text-brass-light">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-off-white/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <SectionHeading align="center" eyebrow="Opiniones de pacientes" title="Lo que dicen nuestros pacientes." />
          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-charcoal-soft">
            Las opiniones se recogen y se publican en Birdeye, en el idioma en que se escribieron. Si no cargan, puede{" "}
            <a href={reviews.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-brass-text underline">
              leerlas en Google
            </a>
            .
          </p>
          <div className="mx-auto mt-10 h-[720px] w-full max-w-[680px]">
            <iframe src={reviews.embedSrc} title="Opiniones de pacientes" width="100%" height="720" loading="lazy" className="h-full w-full border-0" />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <SectionHeading
            eyebrow="Lesiones"
            title="Lesiones, accidentes y la documentación que su caso necesita."
            lead="Cuidado especializado para lesiones de trabajo y accidentes de auto, coordinado con aseguradoras, abogados y administradores de casos."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {injuries.map((item) => (
              <Link key={item.href} href={item.href} className="group border border-line bg-off-white p-7 transition-colors hover:border-brass">
                <h3 className="font-serif text-xl text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">{item.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-brass-text">
                  Ver más, en inglés
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/injuries-pain"
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy underline decoration-brass decoration-2 underline-offset-4 hover:text-brass-text"
          >
            Ver todo el cuidado de lesiones y accidentes, en inglés
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Oficinas"
          title="Dos oficinas en el área de Houston, a las que es fácil llegar."
          lead="Citas en la misma semana. Aceptamos la mayoría de los seguros. Hay estacionamiento amplio en las dos oficinas."
        />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal-soft">{STAFF_NOTE_ES}</p>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {offices.map((office) => (
            <div key={office.key} className="border border-line p-7">
              <h3 className="font-serif text-xl text-navy">HTx Pain Institute, {officeName[office.key]}</h3>
              <address className="mt-3 not-italic text-sm leading-relaxed text-charcoal-soft">
                {office.addressLine1}
                <br />
                {office.addressLine2}
                <br />
                <a
                  href={practice.phoneHref}
                  data-phone={practice.phone}
                  data-analytics-location="homepage-locations"
                  className="inline-flex min-h-11 items-center tabular-nums underline underline-offset-4 hover:text-brass-text phone"
                >
                  {practice.phone}
                </a>
              </address>
              <p className="mt-3 text-sm text-charcoal-soft">
                {HOURS_ES}
                <br />
                {HOURS_CLOSED_ES}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center border border-navy px-5 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:bg-navy hover:text-off-white"
                >
                  Cómo llegar
                </a>
                <a
                  href={practice.phoneHref}
                  data-phone={practice.phone}
                  data-analytics-location="homepage-locations"
                  className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-sans text-sm font-medium tracking-wide text-navy hover:border-brass phone"
                >
                  Llamar a esta oficina
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <EsFinalCta />
    </>
  );
}
