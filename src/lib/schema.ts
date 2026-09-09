import { SITE_URL } from "./site";
import type { Office } from "./nav";

/**
 * Stable @id values so every JSON-LD node on the site refers to the same
 * entities instead of re-describing them. Page-level nodes point back at these.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/dr-edward-baumgartner#physician`;
export const NURSE_PRACTITIONER_ID = `${SITE_URL}/allison-turner#person`;

export const clinicId = (office: Office) => `${SITE_URL}${office.pageHref}#clinic`;

export const absolute = (path: string) => `${SITE_URL}${path}`;

/**
 * schema.org/medicalSpecialty takes a MedicalSpecialty enumeration member, not
 * free text. Pain medicine has no member of its own; it is an anesthesiology
 * subspecialty, so Anesthesia is the correct term. The human-readable
 * specialties live in `knowsAbout`, whose range is Text.
 */
export const MEDICAL_SPECIALTY = "https://schema.org/Anesthesia";

export const KNOWS_ABOUT = [
  "Interventional pain medicine",
  "Pain Medicine",
  "Anesthesiology",
  "Radiofrequency ablation",
  "Spinal cord stimulation",
  "Epidural steroid injection",
  "Vertebral augmentation",
  "Sacroiliac joint fusion",
  "Platelet-rich plasma therapy",
];

export const mapsHref = (office: Office) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`;
