import { SITE_URL } from "@/lib/site";
import { facebookUrl, instagramUrl } from "@/lib/social";
import { youtubeChannelUrl } from "@/lib/video-library";
import { offices, openingHours, practice, serviceAreas } from "@/lib/nav";
import {
  ORG_ID,
  WEBSITE_ID,
  FOUNDER_ID,
  clinicId,
  mapsHref,
  MEDICAL_SPECIALTY,
  KNOWS_ABOUT,
} from "@/lib/schema";
import JsonLd from "@/components/json-ld";

/**
 * The site-wide entity graph: the practice, the website, and one MedicalClinic
 * per office. Every fact derives from src/lib/nav.ts so structured data can
 * never drift from what the pages render.
 *
 * Emitted as an @graph with stable @id values, so page-level nodes (a
 * MedicalProcedure, a MedicalCondition, a Person) can reference these instead
 * of restating them.
 *
 * Deliberately absent: aggregateRating. The 5.0/647 figure in src/lib/reviews.ts
 * comes from a third-party widget, not from reviews collected on this site, and
 * Google's review-snippet policy forbids self-serving markup of that kind.
 */
export default function OrganizationSchema() {
  const telephone = practice.phoneHref.replace(/^tel:/, "");
  const openingHoursSpecification = openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
  const areaServed = serviceAreas.map((a) => ({ "@type": "City", name: a.label }));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: practice.name,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
      {
        "@type": "MedicalOrganization",
        "@id": ORG_ID,
        name: practice.name,
        alternateName: ["Texas Interventional Pain Specialists", "HTx Pain Care"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/htx-pain-institute-logo.png`,
          width: 576,
          height: 384,
        },
        image: `${SITE_URL}/images/htx-pain-institute-team-front-desk.webp`,
        telephone,
        email: practice.email,
        slogan: practice.tagline,
        medicalSpecialty: MEDICAL_SPECIALTY,
        knowsAbout: KNOWS_ABOUT,
        founder: { "@id": FOUNDER_ID },
        foundingDate: "2018",
        areaServed,
        // The organization's own profiles. The doctor's personal LinkedIn is
        // sameAs on his Person node, not here.
        sameAs: [facebookUrl, instagramUrl, youtubeChannelUrl],
        department: offices.map((office) => ({ "@id": clinicId(office) })),
      },
      ...offices.map((office) => ({
        "@type": "MedicalClinic",
        "@id": clinicId(office),
        name: office.label,
        url: `${SITE_URL}${office.pageHref}`,
        parentOrganization: { "@id": ORG_ID },
        address: {
          "@type": "PostalAddress",
          streetAddress: office.addressLine1,
          addressLocality: office.city,
          addressRegion: office.state,
          postalCode: office.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: office.geo.latitude,
          longitude: office.geo.longitude,
        },
        hasMap: mapsHref(office),
        telephone,
        email: practice.email,
        image: `${SITE_URL}/images/lobby.webp`,
        medicalSpecialty: MEDICAL_SPECIALTY,
        areaServed,
        openingHoursSpecification,
      })),
    ],
  };

  return <JsonLd data={data} />;
}
