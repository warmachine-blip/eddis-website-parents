import { SITE_URL } from "@/lib/site";
import { socialLinks } from "@/lib/social";
import { openingHours } from "@/lib/nav";

export default function OrganizationSchema() {
  const openingHoursSpecification = openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));

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
    sameAs: socialLinks,
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
        openingHoursSpecification,
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
        openingHoursSpecification,
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
