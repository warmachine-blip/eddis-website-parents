import { SPANISH_ROUTES } from "./spanish.ts";

/**
 * Spanish labels for the shared header and footer. English nav data stays the
 * source of truth; this map is applied only on /es routes.
 *
 * A label missing from the map is left as written (proper names, "Blog").
 * An internal href missing from SPANISH_ROUTES stays on the English page.
 */
const LABEL_ES: Record<string, string> = {
  About: "Nosotros",
  Services: "Servicios",
  Conditions: "Condiciones",
  Locations: "Oficinas",
  Patients: "Pacientes",
  Community: "Comunidad",
  Contact: "Contacto",
  Practice: "Consultorio",
  "For Patients": "Para pacientes",
  "Our Story": "Nuestra historia",
  "Patient Resources": "Recursos para pacientes",
  "Insurance & Financing": "Seguros y financiamiento",
  "Video Library": "Videoteca",
  "Second Opinion": "Segunda opinión",
  "Schedule Appointment": "Pedir cita",
  "Reschedule Appointment": "Reprogramar la cita",
  "All Services →": "Todos los servicios →",
  Privacy: "Privacidad",
  Terms: "Términos",
  "HIPAA Notice": "Aviso de HIPAA",
  Insurance: "Seguros",
  "Houston (Willowbrook) / Northwest Houston": "Houston (Willowbrook) / Noroeste de Houston",
  "Radiofrequency Ablation": "Ablación por radiofrecuencia",
  "Injections & Nerve Blocks": "Inyecciones y bloqueos nerviosos",
  Kyphoplasty: "Cifoplastia",
  "SI Joint Fusions": "Fusión de la articulación SI",
  "Spinal Cord Stimulation": "Estimulación de la médula espinal",
  "Basivertebral Nerve Ablation (BVN)": "Ablación del nervio basivertebral (BVN)",
  "PRP (Platelet-Rich Plasma)": "PRP (plasma rico en plaquetas)",
  "MILD Procedure": "Procedimiento MILD",
  "Minuteman Lumbar Fusion": "Fusión lumbar Minuteman",
  "Wellness & Peptides": "Bienestar y péptidos",
  "Neuropathic Pain": "Dolor neuropático",
  "Chronic Pain": "Dolor crónico",
  "Pelvic Pain": "Dolor pélvico",
  "Joint Pain": "Dolor de articulaciones",
  "Knee Pain": "Dolor de rodilla",
  "Neck Pain": "Dolor de cuello",
  "Back Pain": "Dolor de espalda",
  "Other Pain Conditions": "Otros tipos de dolor",
  Sciatica: "Ciática",
  "Herniated Discs": "Hernia de disco",
  "Spinal Stenosis": "Estenosis espinal",
  "Hip Pain": "Dolor de cadera",
  "Shoulder Injuries": "Lesiones de hombro",
  "Migraines & Chronic Headache": "Migraña y dolor de cabeza crónico",
  Fibromyalgia: "Fibromialgia",
  "Sports Injuries": "Lesiones deportivas",
  "Post-Surgical Pain": "Dolor después de una cirugía",
};

const SOCIAL_LABEL_ES: Record<string, string> = {
  facebook: "HTx Pain Institute en Facebook",
  instagram: "HTx Pain Institute en Instagram",
  youtube: "HTx Pain Institute en YouTube",
  linkedin: "Edward Baumgartner Jr., MD en LinkedIn",
};

const HREF_ES = new Map<string, string>(SPANISH_ROUTES.map((route) => [route.en, route.es]));

export function spanishLabel(english: string): string {
  return LABEL_ES[english] ?? english;
}

export function spanishSocialLabel(key: string, english: string): string {
  return SOCIAL_LABEL_ES[key] ?? english;
}

export function spanishHref(href: string): string {
  return HREF_ES.get(href) ?? href;
}

export type LocalizedNavLink = {
  label: string;
  href: string;
  note?: string;
  /** Internal page with no Spanish twin, or an external page whose UI is English. */
  englishOnly: boolean;
};

export function localizeNavLink(
  link: { label: string; href: string; note?: string },
  isSpanish: boolean,
): LocalizedNavLink {
  if (!isSpanish) return { label: link.label, href: link.href, note: link.note, englishOnly: false };
  const href = spanishHref(link.href);
  const internal = link.href.startsWith("/");
  return {
    label: spanishLabel(link.label),
    href,
    note: link.note === "Coming soon" ? "Pronto" : link.note,
    englishOnly: internal ? href === link.href : true,
  };
}
