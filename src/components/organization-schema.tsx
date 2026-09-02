import { SITE_URL } from "@/lib/site";
import { socialLinks } from "@/lib/social";
import { offices, openingHours, practice } from "@/lib/nav";

/**
 * JSON-LD for the practice. Name, contact details, both office addresses and
 * the opening hours all derive from src/lib/nav.ts so structured data can
 * never drift from what the pages render.
 */
export default function OrganizationSchema() {
  const telephone = practice.phoneHref.replace(/^tel:/, "");
  const openingHoursSpecification = openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: practice.name,
    alternateName: ["Texas Interventional Pain Specialists", "HTx Pain Care"],
    url: SITE_URL,
    logo: `${SITE_URL}/images/htx-pain-institute-logo.png`,
    telephone,
    email: practice.email,
    medicalSpecialty: "Pain Medicine",
    founder: {
      "@type": "Physician",
      name: "Edward Baumgartner Jr., MD",
      medicalSpecialty: ["Anesthesiology", "Pain Medicine"],
    },
    foundingDate: "2018",
    sameAs: socialLinks,
    location: offices.map((office) => ({
      "@type": "MedicalClinic",
      name: office.label,
      address: {
        "@type": "PostalAddress",
        streetAddress: office.addressLine1,
        addressLocality: office.city,
        addressRegion: office.state,
        postalCode: office.zip,
        addressCountry: "US",
      },
      telephone,
      openingHoursSpecification,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
