import Link from "next/link";
import { practice } from "@/lib/nav";
import { STAFF_NOTE_ES } from "@/lib/spanish";

/** Closing band for Spanish pages. The shared FinalCta is English and stays untouched. */
export default function EsFinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-24">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
          <span className="h-px w-8 bg-current opacity-70" />
          Cuando usted esté listo
        </p>
        <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl">
          Reciba la atención que merece. Programe su consulta hoy.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-off-white/70">
          Dos oficinas en el área de Houston. Hay consultas en la misma semana. Aceptamos la mayoría de los
          seguros.
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm text-off-white/80">{STAFF_NOTE_ES}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/es/request-appointment"
            data-analytics-location="final-cta"
            className="rounded-full border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
          >
            Pedir cita
          </Link>
          <a
            href={practice.phoneHref}
            data-phone={practice.phone}
            data-analytics-location="final-cta"
            className="rounded-full border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white phone"
          >
            {practice.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
