import type { Metadata } from "next";
import { practice } from "./nav.ts";

/**
 * English pages that have a Spanish twin. Anything else sends the ES control
 * to the Spanish homepage, because a translation of that page does not exist.
 * x-default is the English URL: English is the site default.
 */
export const SPANISH_ROUTES = [
  { en: "/", es: "/es" },
  { en: "/about-us", es: "/es/about-us" },
  { en: "/dr-edward-baumgartner", es: "/es/dr-edward-baumgartner" },
  { en: "/allison-turner", es: "/es/allison-turner" },
  { en: "/tatyana-baumgartner-cpa", es: "/es/tatyana-baumgartner-cpa" },
  { en: "/request-appointment", es: "/es/request-appointment" },
  { en: "/appointment-confirmed", es: "/es/appointment-confirmed" },
  { en: "/insurance", es: "/es/insurance" },
  { en: "/intracept-procedure", es: "/es/intracept-procedure" },
  { en: "/patients", es: "/es/patients" },
  { en: "/contact", es: "/es/contact" },
  { en: "/locations", es: "/es/locations" },
  { en: "/locations/northwest-houston", es: "/es/locations/northwest-houston" },
  { en: "/locations/humble", es: "/es/locations/humble" },
  { en: "/locations/spring-tx", es: "/es/locations/spring-tx" },
  { en: "/locations/the-woodlands", es: "/es/locations/the-woodlands" },
  { en: "/locations/cypress", es: "/es/locations/cypress" },
  { en: "/locations/tomball", es: "/es/locations/tomball" },
  { en: "/locations/klein", es: "/es/locations/klein" },
  { en: "/locations/champions", es: "/es/locations/champions" },
  { en: "/locations/kingwood", es: "/es/locations/kingwood" },
  { en: "/locations/atascocita", es: "/es/locations/atascocita" },
  { en: "/community", es: "/es/community" },
  { en: "/community/imas-home", es: "/es/community/imas-home" },
  { en: "/community/kel-strong-foundation", es: "/es/community/kel-strong-foundation" },
  { en: "/community/houston-tennis-academy", es: "/es/community/houston-tennis-academy" },
  { en: "/terms-of-use", es: "/es/terms-of-use" },
  { en: "/hipaa-notice", es: "/es/hipaa-notice" },
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

/**
 * Same card as the English site (`public/images/og/htx-pain-institute-card.jpg`).
 * A page `openGraph` object replaces the layout's, so the image has to live
 * here or /es ships with no share image. Alt text is for the Spanish pages.
 */
const SPANISH_SHARE_IMAGE = {
  url: "/images/og/htx-pain-institute-card.jpg",
  width: 1200,
  height: 630,
  alt: "Edward Baumgartner Jr., MD, junto al logotipo de HTx Pain Institute",
};

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
      type: "website",
      siteName: practice.name,
      locale: "es_US",
      url: opts.es,
      images: [SPANISH_SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      images: [SPANISH_SHARE_IMAGE],
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
