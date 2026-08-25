import { SITE_URL } from "@/lib/site";

export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "HTx Pain Institute",
    alternateName: ["Texas Interventional Pain Specialists", "HTx Pain Care"],
    url: SITE_URL,
    logo: `${SITE_URL}/images/htx-pain-institute-logo.png`,
    telephone: "+1-832-990-8600",
    email: "info@htxpaincare.com",
    medicalSpecialty: "Pain Medicine",
    founder: {
      "@type": "Physician",
      name: "Dr. Edward Baumgartner Jr., M.D.",
      medicalSpecialty: ["Anesthesiology", "Pain Medicine"],
    },
    foundingDate: "2018",
    sameAs: [],
    location: [
      {
        "@type": "MedicalClinic",
        name: "HTx Pain Institute — Houston (TX-249)",
        address: {
          "@type": "PostalAddress",
          streetAddress: "17314 Texas 249, Suite 100",
          addressLocality: "Houston",
          addressRegion: "TX",
          postalCode: "77064",
          addressCountry: "US",
        },
        telephone: "+1-832-990-8600",
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Thursday"], opens: "07:00", closes: "17:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "08:00", closes: "17:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:00", closes: "16:00" },
        ],
      },
      {
        "@type": "MedicalClinic",
        name: "HTx Pain Institute — Humble (FM 1960)",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1485 FM 1960 Bypass Rd. E, Suite 260",
          addressLocality: "Humble",
          addressRegion: "TX",
          postalCode: "77338",
          addressCountry: "US",
        },
        telephone: "+1-832-990-8600",
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Thursday"], opens: "07:00", closes: "17:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "08:00", closes: "17:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:00", closes: "16:00" },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
