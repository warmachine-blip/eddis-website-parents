import type { Metadata } from "next";

/**
 * English pages that have a Spanish twin. Anything else sends the ES control
 * to the Spanish homepage, because a translation of that page does not exist.
 * x-default is the English URL: English is the site default.
 */
export const SPANISH_ROUTES = [
  { en: "/", es: "/es" },
  { en: "/dr-edward-baumgartner", es: "/es/dr-edward-baumgartner" },
  { en: "/request-appointment", es: "/es/request-appointment" },
  { en: "/insurance", es: "/es/insurance" },
  { en: "/intracept-procedure", es: "/es/intracept-procedure" },
] as const;

export type SpanishRoute = (typeof SPANISH_ROUTES)[number];

/** Same on every Spanish page. Staff speak Spanish. Dr. Baumgartner does not. */
export const STAFF_NOTE_ES =
  "El Dr. Baumgartner atiende en inglés. El personal de la clínica habla español y puede ayudarle a programar la cita y a resolver sus preguntas.";

export const HOURS_ES = "Lunes a viernes, de 7:00 a.m. a 5:00 p.m.";
export const HOURS_CLOSED_ES = "Sábado y domingo: cerrado.";

/** The insurance-page requirement, in the Spanish patients actually use. */
export const CONFIRM_BENEFITS_ES =
  "Llame a la oficina para confirmar sus beneficios antes de su visita.";

export function languageAlternates(en: string, es: string): NonNullable<Metadata["alternates"]> {
  return {
    // Keep the English canonical. A languages-only object replaces the parent
    // alternates and would drop it.
    canonical: en === "/" ? "./" : en,
    languages: {
      en,
      es,
      "x-default": en,
    },
  };
}

export function spanishPageMetadata(opts: {
  title: string;
  description: string;
  en: string;
  es: string;
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      ...languageAlternates(opts.en, opts.es),
      canonical: opts.es,
    },
    openGraph: {
      locale: "es_US",
      url: opts.es,
    },
  };
}

/** Visible procedure name. The brand Intracept appears once, on the Spanish procedure page. */
export const BVN_TITLE_ES = "Ablación del nervio basivertebral (BVN)";

/**
 * On Spanish pages, show the Spanish procedure name and open the Spanish page.
 * English pages keep the shared label from the service list.
 */
export function spanishVisibleNavItem(
  href: string,
  label: string,
  isSpanish: boolean,
): { href: string; label: string; lang?: "es" } {
  if (isSpanish && href === "/intracept-procedure") {
    return { href: "/es/intracept-procedure", label: BVN_TITLE_ES, lang: "es" };
  }
  return { href, label };
}

export function localeSwitchTarget(pathname: string): {
  isSpanish: boolean;
  enHref: string;
  esHref: string;
  /** True when ES cannot point at a translation of this page. */
  esFallsBackToHome: boolean;
} {
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname || "/";
  const isSpanish = path === "/es" || path.startsWith("/es/");

  if (isSpanish) {
    const pair = SPANISH_ROUTES.find((route) => route.es === path);
    return {
      isSpanish: true,
      enHref: pair?.en ?? "/",
      esHref: path,
      esFallsBackToHome: false,
    };
  }

  const pair = SPANISH_ROUTES.find((route) => route.en === path);
  return {
    isSpanish: false,
    enHref: path,
    esHref: pair?.es ?? "/es",
    esFallsBackToHome: !pair,
  };
}
