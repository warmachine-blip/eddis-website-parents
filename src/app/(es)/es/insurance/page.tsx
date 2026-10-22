import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import EsFinalCta from "@/components/es-final-cta";
import { CheckBullet, IconBadge } from "@/components/icon-badge";
import SectionHeading from "@/components/section-heading";
import { insuranceGroups, otherPaymentOptions } from "@/lib/insurance";
import { practice } from "@/lib/nav";
import { CONFIRM_BENEFITS_ES, spanishPageMetadata, STAFF_NOTE_ES } from "@/lib/spanish";

export const metadata: Metadata = spanishPageMetadata({
  title: "Seguros en Houston",
  description:
    "Vea los planes que HTx Pain Institute puede verificar, como Medicare, Medicaid y seguros comerciales. Llame al (832) 960-7160 para confirmar sus beneficios.",
  en: "/insurance",
  es: "/es/insurance",
});

const groupNames: Record<string, string> = {
  Medicare: "Medicare",
  "Medicare Advantage": "Medicare Advantage",
  Military: "Planes militares",
  Medicaid: "Medicaid",
  Commercial: "Seguros comerciales",
  "Workers' Compensation": "Compensación laboral",
};

const planNames: Record<string, string> = {
  "Original Medicare (Texas)": "Medicare original (Texas)",
  "Railroad Medicare": "Railroad Medicare",
  "Medicare supplement plans: Medico, UnitedHealthcare":
    "Planes suplementarios de Medicare: Medico, UnitedHealthcare",
  "Aetna Medicare (PPO and HMO)": "Aetna Medicare (PPO y HMO)",
  "Blue Cross Medicare Advantage": "Blue Cross Medicare Advantage",
  "Cigna HealthSpring": "Cigna HealthSpring",
  "Devoted Health": "Devoted Health",
  Humana: "Humana",
  "UnitedHealthcare Medicare Advantage": "UnitedHealthcare Medicare Advantage",
  WellMed: "WellMed",
  "Wellpoint (formerly Amerigroup)": "Wellpoint (antes Amerigroup)",
  "Medical groups: ViCare Health, Van Lang IPA, Verda Healthcare":
    "Grupos médicos: ViCare Health, Van Lang IPA, Verda Healthcare",
  "US Family Health Plan (TRICARE Prime through CHRISTUS)":
    "US Family Health Plan (TRICARE Prime por medio de CHRISTUS)",
  "Texas Medicaid (TMHP)": "Texas Medicaid (TMHP)",
  "UnitedHealthcare Community Plan": "UnitedHealthcare Community Plan",
  Aetna: "Aetna",
  "Blue Cross Blue Shield of Texas": "Blue Cross Blue Shield of Texas",
  Cigna: "Cigna",
  "GEHA (federal employees)": "GEHA (empleados federales)",
  "Meritain Health (Aetna)": "Meritain Health (Aetna)",
  "UMR (UnitedHealthcare employer plans)": "UMR (planes de empleador de UnitedHealthcare)",
  "UnitedHealthcare, including Golden Rule and Surest": "UnitedHealthcare, incluidos Golden Rule y Surest",
  "Employer plan administrators: Allegiance, Allied Administrators, Boon, Entrust, Gravie, Sana Benefits":
    "Administradores de planes de empleador: Allegiance, Allied Administrators, Boon, Entrust, Gravie, Sana Benefits",
  "Texas Mutual": "Texas Mutual",
  Sedgwick: "Sedgwick",
  "Gallagher Bassett": "Gallagher Bassett",
  "Liberty Mutual": "Liberty Mutual",
  "Texas Association of School Boards (TASB)": "Texas Association of School Boards (TASB)",
  "Department of Labor": "Department of Labor",
  "Berkshire Hathaway Homestate": "Berkshire Hathaway Homestate",
  Broadspire: "Broadspire",
  CorVel: "CorVel",
  CCMSI: "CCMSI",
  ESIS: "ESIS",
  "Tristar Risk Management": "Tristar Risk Management",
  Zurich: "Zurich",
  "Accident Fund": "Accident Fund",
  "Personal injury": "Lesiones personales",
  "Self pay": "Pago por cuenta propia",
};

const steps = [
  {
    title: "Comparta la información de su seguro",
    body: "Cuando le llamemos para confirmar la cita, tenga a mano su tarjeta del seguro. Reunimos lo necesario para verificar sus beneficios.",
  },
  {
    title: "Verificamos antes de su visita",
    body: "Nuestro equipo se comunica con su aseguradora para confirmar la cobertura, los copagos, los deducibles y cualquier autorización previa, antes de que usted llegue.",
  },
  {
    title: "Le explicamos las cifras con palabras claras",
    body: "Usted sabrá cuánto debe, qué cubre el plan y qué autorizaciones previas hacen falta, si es que hace falta alguna. Sin sorpresas al momento de pagar.",
  },
  {
    title: "Financiamiento si lo necesita",
    body: "Para servicios de pago por cuenta propia o procedimientos con un gasto mayor de su bolsillo, ofrecemos opciones de financiamiento claras por medio de CareCredit y programas similares.",
  },
];

const faqs = [
  {
    q: "¿Aceptan Medicare?",
    a: "Los planes de Medicare, los suplementarios de Medicare y los de Medicare Advantage de esta página son planes que podemos verificar. Llame a la oficina para confirmar su plan específico antes de la visita.",
  },
  {
    q: "¿Y la compensación laboral?",
    a: "Podemos verificar las aseguradoras de compensación laboral de esta página y coordinar con los coordinadores del caso. Llame a la oficina para confirmar su reclamo.",
  },
  {
    q: "¿Y si mi plan no está en la lista?",
    a: "Llame a la oficina. Un plan que no está en esta página igual necesita una verificación de beneficios, y un plan que sí está en la lista no es una promesa de cobertura.",
  },
];

const groups = [
  ...insuranceGroups.map((group) => ({
    name: groupNames[group.name] ?? group.name,
    plans: group.plans.map((plan) => planNames[plan] ?? plan),
  })),
  {
    name: "Lesiones personales y pago por cuenta propia",
    plans: otherPaymentOptions.map((plan) => planNames[plan] ?? plan),
  },
];

function groupId(name: string) {
  return `plans-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export default function SpanishInsurancePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            items={[
              { label: "Inicio", href: "/es" },
              { label: "Pacientes", href: "/patients" },
              { label: "Seguros y financiamiento" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Seguros y financiamiento
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Seguros y financiamiento para el cuidado del dolor
            <br />
            <em className="italic text-brass-light">en Houston y Humble.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Díganos qué plan tiene. Nuestro equipo verifica sus beneficios antes de la visita y le explica lo que dice
            el plan.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-off-white/80">{STAFF_NOTE_ES}</p>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Seguros que podemos verificar"
              title="Medicare, Medicaid, seguros comerciales y compensación laboral."
              lead={`La cobertura depende de su plan específico. ${CONFIRM_BENEFITS_ES}`}
            />
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-soft">
              Nuestro equipo verifica los beneficios durante el ingreso de pacientes nuevos.
            </p>
            <div className="mt-8 grid gap-10">
              {groups.map((group) => (
                <section key={group.name} aria-labelledby={groupId(group.name)}>
                  <h3 id={groupId(group.name)} className="font-serif text-xl leading-tight text-navy">
                    {group.name}
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {group.plans.map((plan) => (
                      <li key={plan} className="flex items-start gap-3 rounded-xl border border-line bg-off-white px-5 py-4">
                        <CheckBullet tone="brass" />
                        <span className="text-sm leading-relaxed text-charcoal-soft">{plan}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grid gap-4 lg:sticky lg:top-32">
              <div className="rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-7 text-off-white shadow-md">
                <IconBadge icon="bolt" tone="brassSolid" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-brass-light">
                  Verifique sus beneficios
                </p>
                <p className="mt-2 font-serif text-2xl leading-tight text-off-white">
                  Llámenos. Nosotros nos encargamos del resto.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-off-white/80">{CONFIRM_BENEFITS_ES}</p>
                <a
                  href={practice.phoneHref}
                  data-phone={practice.phone}
                  data-analytics-location="insurance-verify"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-semibold text-navy-deep hover:bg-brass-light phone"
                >
                  {practice.phone}
                </a>
              </div>
              <div className="rounded-2xl border border-line bg-off-white p-7 shadow-sm">
                <IconBadge icon="shield" tone="dark" />
                <p className="mt-4 font-serif text-xl leading-tight text-navy">
                  ¿Necesita una carta de protección (Letter of Protection)?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                  En casos de accidente de auto y de lesión de trabajo, trabajamos con aseguradoras, abogados y
                  coordinadores del caso, y aceptamos cartas de protección. Díganoslo cuando llame.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
          <span className="h-px w-8 bg-current opacity-50" />
          Cómo funciona la verificación
        </span>
        <h2 className="mt-5 max-w-3xl text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
          Cuatro pasos. Sin sorpresas al momento de pagar.
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="h-full rounded-2xl border border-line bg-pearl p-6">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-deep font-serif text-sm text-off-white">
                {index + 1}
              </span>
              <h3 className="mt-5 font-serif text-lg leading-tight text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 rounded-2xl border border-line bg-off-white p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
            <div className="lg:col-span-7">
              <IconBadge icon="shield" tone="brass" />
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                Pago por cuenta propia y financiamiento
              </h2>
              <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                Algunos servicios, en particular las terapias regenerativas electivas como el PRP y ciertos programas
                de bienestar, no los cubre la mayoría de los seguros. Damos{" "}
                <span className="font-semibold text-navy">precios claros de pago por cuenta propia</span> desde el
                principio y ofrecemos <span className="font-semibold text-navy">financiamiento con CareCredit</span> a
                quien prefiera repartir el pago en el tiempo.
              </p>
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">Preguntas frecuentes</p>
              <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-charcoal-soft">
                {faqs.map((faq) => (
                  <li key={faq.q}>
                    <span className="font-semibold text-navy">{faq.q}</span> {faq.a}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-soft">{CONFIRM_BENEFITS_ES}</p>
              <Link
                href="/es/request-appointment"
                data-analytics-location="insurance"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-off-white hover:bg-navy-deep"
              >
                Pedir cita
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EsFinalCta />
    </div>
  );
}
