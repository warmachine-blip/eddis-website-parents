import Link from "next/link";
import { offices, openingHours, practice } from "@/lib/nav";
import { HOURS_CLOSED_ES, HOURS_ES } from "@/lib/spanish";
import { spanishHref } from "@/lib/spanish-nav";

/**
 * Plain-text visit notes for the booking pages. Every sentence is already
 * stated elsewhere on the site. Hours and addresses come from src/lib/nav.ts.
 */

function clock(time: string): string {
  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  const face = minute ? `${hour12}:${String(minute).padStart(2, "0")}` : `${hour12}`;
  return `${face} ${suffix}`;
}

function englishHours(): string {
  return openingHours
    .map((block) => {
      const days = `${block.days[0]} to ${block.days[block.days.length - 1]}`;
      return `${days}, ${clock(block.opens)} to ${clock(block.closes)}`;
    })
    .join(". ");
}

const bringEn = [
  "Your photo ID",
  "Your insurance card",
  "A list of your current medicines",
  "Imaging reports or discs, and records from past pain treatment",
  "The operative report, if you have had spine or joint surgery and you have it",
];

const bringEs = [
  "Su identificación con foto",
  "Su tarjeta del seguro",
  "Una lista de los medicamentos que toma ahora",
  "Informes o discos de sus estudios de imagen, y expedientes de tratamientos anteriores para el dolor",
  "El informe de la cirugía, si le han operado la columna o una articulación y lo tiene",
];

export default function FirstVisitGuide({ locale = "en" }: { locale?: "en" | "es" }) {
  const spanish = locale === "es";
  const insuranceHref = spanish ? "/es/insurance" : "/insurance";
  const hours = spanish ? `${HOURS_ES} ${HOURS_CLOSED_ES}` : `${englishHours()}. Saturday and Sunday are closed.`;

  return (
    <section className="border-t border-line bg-pearl">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <h2 className="max-w-3xl text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
          {spanish ? "Antes de su primera visita" : "Before your first visit"}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-line bg-off-white p-7">
            <h3 className="font-serif text-xl text-navy">
              {spanish ? "Cómo es la primera visita" : "What the first visit is like"}
            </h3>
            {spanish ? (
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal-soft">
                <p>
                  Usted llega y llena unos formularios breves de registro. También puede llenarlos antes de la cita. La
                  oficina puede enviárselos por correo electrónico o por correo postal.
                </p>
                <p>
                  Después se reúne con el Dr. Baumgartner o con Allison Turner, DNP. En la visita se revisan su
                  historia, el examen, los estudios de imagen y los tratamientos anteriores. La cita dura lo suficiente
                  para revisar eso y sus preguntas. Juntos preparamos su plan personalizado.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal-soft">
                <p>
                  You arrive and complete a brief intake. You can also complete the intake forms before the
                  appointment. The office can email or mail them to you.
                </p>
                <p>
                  You then meet with Dr. Baumgartner or Allison Turner, DNP. The visit includes a review of your
                  history, your exam, your imaging, and prior treatments. The appointment is long enough to go through
                  those and your questions. Together we build your personalized plan.
                </p>
              </div>
            )}
          </article>

          <article className="rounded-2xl border border-line bg-off-white p-7">
            <h3 className="font-serif text-xl text-navy">{spanish ? "Qué debe traer" : "What to bring"}</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-charcoal-soft">
              {(spanish ? bringEs : bringEn).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-charcoal-soft">
              {spanish
                ? "No necesita una resonancia magnética nueva antes de la primera visita. Traiga los estudios que ya tenga. Le diremos si hace falta alguno más."
                : "You do not need a new MRI before the first visit. Bring whatever imaging you already have, and we will tell you whether more is needed."}
            </p>
          </article>

          <article className="rounded-2xl border border-line bg-off-white p-7">
            <h3 className="font-serif text-xl text-navy">
              {spanish ? "Cómo revisamos el seguro" : "How insurance is checked"}
            </h3>
            {spanish ? (
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal-soft">
                <p>
                  Cuando le llamemos para confirmar la cita, tenga a mano su tarjeta del seguro. Reunimos lo necesario
                  para verificar sus beneficios. Nuestro equipo se comunica con su aseguradora antes de la visita para
                  confirmar la cobertura, los copagos, los deducibles y cualquier autorización previa. Si hay un
                  problema de cobertura, nos comunicamos con usted antes de la cita.
                </p>
                <p>
                  Algunos planes piden un referido y muchos no. Eso lo revisamos al verificar sus beneficios. Podemos
                  verificar Medicare, planes de Medicare Advantage, Texas Medicaid, TRICARE Prime por medio de US Family
                  Health Plan, la mayoría de los planes comerciales principales, compensación laboral y casos de
                  lesiones personales. También se puede pagar por cuenta propia. Que un plan aparezca en la lista no
                  garantiza la cobertura. La cobertura depende de su plan.
                </p>
                <p>
                  Llame al {practice.phone} para confirmar sus beneficios, o vea la lista completa en la{" "}
                  <Link href={insuranceHref} className="font-medium text-brass-text underline">
                    página de seguros
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal-soft">
                <p>
                  When we call to confirm your appointment, have your insurance card handy. We collect what we need to
                  verify your benefits. Our team contacts your insurer before the visit to confirm coverage, copays,
                  deductibles, and any prior authorization. If there is a coverage issue, we will reach out before your
                  appointment.
                </p>
                <p>
                  Some insurance plans require a referral and many do not. We check that when we verify your benefits.
                  We can check Medicare, Medicare Advantage plans, Texas Medicaid, TRICARE Prime through US Family
                  Health Plan, most major commercial plans, workers&rsquo; compensation, and personal injury cases.
                  Self-pay is also available. A plan on our list is not a promise of coverage. Coverage depends on your
                  specific plan.
                </p>
                <p>
                  Call {practice.phone} to confirm your benefits, or see the full list on our{" "}
                  <Link href={insuranceHref} className="font-medium text-brass-text underline">
                    insurance page
                  </Link>
                  .
                </p>
              </div>
            )}
          </article>

          <article className="rounded-2xl border border-line bg-off-white p-7">
            <h3 className="font-serif text-xl text-navy">
              {spanish ? "Horario y oficinas" : "Hours and offices"}
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal-soft">
              {spanish ? (
                <p>
                  HTx Pain Institute tiene dos oficinas. Horario de las dos: {HOURS_ES} {HOURS_CLOSED_ES} El teléfono de
                  las dos oficinas es{" "}
                  <a
                    href={practice.phoneHref}
                    data-phone={practice.phone}
                    data-analytics-location="request-appointment"
                    className="font-medium tabular-nums text-brass-text underline phone"
                  >
                    {practice.phone}
                  </a>
                  . Hay estacionamiento en las dos oficinas.
                </p>
              ) : (
                <p>
                  HTx Pain Institute has two offices. Both are open {hours} The phone number for both offices is{" "}
                  <a
                    href={practice.phoneHref}
                    data-phone={practice.phone}
                    data-analytics-location="request-appointment"
                    className="font-medium tabular-nums text-brass-text underline phone"
                  >
                    {practice.phone}
                  </a>
                  . There is parking at both offices.
                </p>
              )}
            </div>
            <ul className="mt-5 space-y-5">
              {offices.map((office) => {
                const pageHref = spanish ? spanishHref(office.pageHref) : office.pageHref;
                const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`;
                return (
                  <li key={office.key}>
                    <h4 className="font-serif text-base text-navy">
                      <Link href={pageHref} className="underline decoration-brass/60 underline-offset-2">
                        {spanish ? `Oficina de ${office.shortLabel}` : `${office.shortLabel} office`}
                      </Link>
                    </h4>
                    <address className="mt-1 not-italic text-sm leading-relaxed text-charcoal-soft">
                      {office.addressLine1}
                      <br />
                      {office.addressLine2}
                    </address>
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex text-sm font-medium text-brass-text underline"
                    >
                      {spanish ? "Cómo llegar" : "Get directions"}
                    </a>
                  </li>
                );
              })}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
