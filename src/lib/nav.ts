import { services } from "./services";
import { conditions } from "./conditions";

export type NavLink = {
  label: string;
  href: string;
  note?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  items: NavLink[];
};

export const servicesNav: NavLink[] = services.map((s) => ({
  label: s.title,
  href: s.href,
  note: s.comingSoon ? "Coming soon" : undefined,
}));

export const conditionsNav: NavLink[] = conditions.map((c) => ({
  label: c.title,
  href: c.href,
}));

export const locationsNav: NavLink[] = [
  { label: "Northwest Houston", href: "/locations/northwest-houston" },
  { label: "Humble", href: "/locations/humble" },
  { label: "Spring, TX", href: "/locations/spring-tx" },
  { label: "The Woodlands", href: "/locations/the-woodlands" },
  { label: "Cypress", href: "/locations/cypress" },
  { label: "Tomball", href: "/locations/tomball" },
  { label: "Klein", href: "/locations/klein" },
  { label: "Champions", href: "/locations/champions" },
  { label: "Kingwood", href: "/locations/kingwood" },
  { label: "Atascocita", href: "/locations/atascocita" },
];

export const aboutNav: NavLink[] = [
  { label: "Our Story", href: "/about-us" },
  { label: "Dr. Edward Baumgartner Jr.", href: "/dr-edward-baumgartner" },
  { label: "Tatyana Baumgartner", href: "/tatyana-baumgartner-cpa" },
  { label: "Allison Turner, DNP", href: "/allison-turner" },
];

export const patientsNav: NavLink[] = [
  { label: "Patient Resources", href: "/patients" },
  { label: "Insurance & Financing", href: "/insurance" },
  { label: "Blog", href: "/blog" },
  { label: "Video Library", href: "/video-library" },
  { label: "Second Opinion", href: "/second-opinion" },
];

export const primaryNav: NavGroup[] = [
  { label: "About", href: "/about-us", items: aboutNav },
  { label: "Services", href: "/services", items: servicesNav },
  { label: "Conditions", href: "/pain-center", items: conditionsNav },
  { label: "Locations", href: "/locations/northwest-houston", items: locationsNav },
  { label: "Patients", href: "/patients", items: patientsNav },
];

export const injuryNav: NavLink[] = [
  { label: "Work Injuries", href: "/work-injuries-accidents" },
  { label: "Motor Vehicle Accidents", href: "/motor-vehicle-injuries" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms-of-use" },
  { label: "HIPAA Notice", href: "/hipaa-notice" },
  { label: "Insurance", href: "/insurance" },
];

export const practice = {
  name: "HTx Pain Institute",
  formerNames: "Texas Interventional Pain Specialists and HTx Pain Care",
  phone: "832.990.8600",
  phoneHref: "tel:+18329908600",
  email: "info@htxpaincare.com",
  tagline: "Precision. Lasting Relief.",
  hours: "Mon–Thu 7AM–5PM · Wed 8AM–5PM · Fri 7AM–4PM",
  hoursWeekend: "Sat–Sun: Closed",
};

export type Office = {
  key: string;
  city: string;
  label: string;
  addressLine1: string;
  addressLine2: string;
  mapsQuery: string;
};

export const offices: Office[] = [
  {
    key: "houston",
    city: "Houston",
    label: "HTx Pain — Houston (TX-249)",
    addressLine1: "17314 Texas 249, Suite 100",
    addressLine2: "Houston, TX 77064",
    mapsQuery: "17314 Texas 249, Suite 100, Houston, TX 77064",
  },
  {
    key: "humble",
    city: "Humble",
    label: "HTx Pain — Humble (FM 1960)",
    addressLine1: "1485 FM 1960 Bypass Rd. E, Suite 260",
    addressLine2: "Humble, TX 77338",
    mapsQuery: "1485 FM 1960 Bypass Rd. E, Suite 260, Humble, TX 77338",
  },
];
