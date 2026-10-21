import { SITE_URL } from "./site";
import { offices, practice, type Office } from "./nav";
import {
  doximityUrl,
  healthgradesUrl,
  linkedInUrl,
  npiRegistryUrl,
  txTopDocsUrl,
  vitalsUrl,
  webmdUrl,
} from "./social";

/**
 * Stable @id values so every JSON-LD node on the site refers to the same
 * entities instead of re-describing them. Page-level nodes point back at these.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/dr-edward-baumgartner#physician`;
export const NURSE_PRACTITIONER_ID = `${SITE_URL}/allison-turner#person`;

export const clinicId = (office: Office) => `${SITE_URL}${office.pageHref}#clinic`;

/** Stable @id for a charity the practice supports; entries live in src/lib/community.ts. */
export const supportedOrgId = (slug: string) => `${SITE_URL}/community/${slug}#organization`;

export const absolute = (path: string) => `${SITE_URL}${path}`;

/**
 * schema.org/medicalSpecialty prefers a MedicalSpecialty enumeration member.
 * Pain medicine has no member of its own. Anesthesiology uses the Anesthesia
 * URL. The physician node also names "Pain Medicine" in text, and both
 * specialties are repeated in `knowsAbout`.
 */
export const MEDICAL_SPECIALTY = "https://schema.org/Anesthesia";

export const KNOWS_ABOUT = [
  "Interventional pain medicine",
  "Pain Medicine",
  "Anesthesiology",
  "Radiofrequency ablation",
  "Genicular nerve block",
  "Spinal cord stimulation",
  "Epidural steroid injection",
  "Peripheral nerve block",
  "Vertebral augmentation",
  "Sacroiliac joint fusion",
  "Joint injection",
  "Platelet-rich plasma therapy",
];

export const mapsHref = (office: Office) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`;

/** NPPES individual NPI. Primary taxonomy 208VP0000X, Pain Medicine. */
export const PHYSICIAN_NPI = "1548402407";

export const foundingYear = "2018";

/**
 * Hospitals named on the physician page. Houston Methodist is the Willowbrook
 * campus. St. Luke's Health and Townsen Memorial Hospital are the other
 * affiliations already stated on that page.
 */
export const hospitalAffiliations = [
  "Townsen Memorial Hospital",
  "Houston Methodist Willowbrook",
  "St. Luke's Health",
] as const;

/**
 * The founder as one Physician node. Physician is a Person, so blog posts can
 * name him as author with this @id. Spanish is intentionally absent: staff
 * speak Spanish, and that language lives on the organization and the clinics.
 */
export function physicianNode() {
  return {
    "@type": ["Physician", "Person"],
    "@id": FOUNDER_ID,
    name: "Edward Baumgartner Jr., MD",
    givenName: "Edward",
    familyName: "Baumgartner",
    honorificSuffix: "MD",
    jobTitle: "Founding Physician",
    url: `${SITE_URL}/dr-edward-baumgartner`,
    image: `${SITE_URL}/images/dr-baumgartner.webp`,
    telephone: practice.phoneHref.replace(/^tel:/, ""),
    usNPI: PHYSICIAN_NPI,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "NPI",
      value: PHYSICIAN_NPI,
    },
    worksFor: { "@id": ORG_ID },
    workLocation: offices.map((office) => ({ "@id": clinicId(office) })),
    // Anesthesiology uses the schema.org enumeration. Pain Medicine has no
    // member of its own, so it is named in text beside that URL.
    medicalSpecialty: [MEDICAL_SPECIALTY, "Pain Medicine"],
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: ["English"],
    award: "Texas Top Doctor",
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Texas A&M University" },
      { "@type": "CollegeOrUniversity", name: "University of Texas Health Science Center at Houston" },
      { "@type": "CollegeOrUniversity", name: "Rush University Medical Center" },
    ],
    affiliation: [{ "@type": "Organization", name: "Rush Health System" }],
    hospitalAffiliation: hospitalAffiliations.map((name) => ({ "@type": "Hospital", name })),
    sameAs: [npiRegistryUrl, healthgradesUrl, vitalsUrl, webmdUrl, doximityUrl, linkedInUrl, txTopDocsUrl],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Board Certification",
        name: "Board Certified in Anesthesiology",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Board Certification",
        name: "Board Certified in Pain Medicine",
      },
    ],
  };
}
