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

export type Office = {
  key: string;
  city: string;
  state: string;
  zip: string;
  label: string;
  /** Short label for nav menus. */
  navLabel: string;
  /** The office's own page under /locations. */
  pageHref: string;
  addressLine1: string;
  addressLine2: string;
  mapsQuery: string;
};

export const offices: Office[] = [
  {
    key: "houston",
    city: "Houston",
    state: "TX",
    zip: "77070",
    label: "HTx Pain Institute — Houston (Willowbrook)",
    navLabel: "Houston (Willowbrook) / Northwest Houston",
    pageHref: "/locations/northwest-houston",
    addressLine1: "13323 Dotson Rd, Ste 210",
    addressLine2: "Houston, TX 77070",
    mapsQuery: "13323 Dotson Rd, Ste 210, Houston, TX 77070",
  },
  {
    key: "humble",
    city: "Humble",
    state: "TX",
    zip: "77338",
    label: "HTx Pain Institute — Humble (FM 1960)",
    navLabel: "Humble (FM 1960)",
    pageHref: "/locations/humble",
    addressLine1: "1485 FM 1960 Bypass Rd. E, Suite 260",
    addressLine2: "Humble, TX 77338",
    mapsQuery: "1485 FM 1960 Bypass Rd. E, Suite 260, Humble, TX 77338",
  },
];

/** Every city page under /locations — used by the sitemap and the /locations index, not the menus. */
export const serviceAreas: NavLink[] = [
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

/** Header/footer "Locations" menu: only the two physical offices. */
export const locationsNav: NavLink[] = offices.map((o) => ({ label: o.navLabel, href: o.pageHref }));

export const aboutNav: NavLink[] = [
  { label: "Our Story", href: "/about-us" },
  { label: "Edward Baumgartner Jr., MD", href: "/dr-edward-baumgartner" },
  { label: "Tatyana Baumgartner, CPA", href: "/tatyana-baumgartner-cpa" },
  { label: "Allison Turner, DNP", href: "/allison-turner" },
];

export const patientsNav: NavLink[] = [
  { label: "Patient Resources", href: "/patients" },
  { label: "Insurance & Financing", href: "/insurance" },
  { label: "Video Library", href: "/video-library" },
  { label: "Second Opinion", href: "/second-opinion" },
];

export const primaryNav: NavGroup[] = [
  { label: "About", href: "/about-us", items: aboutNav },
  { label: "Services", href: "/services", items: servicesNav },
  { label: "Conditions", href: "/pain-center", items: conditionsNav },
  { label: "Locations", href: "/locations", items: locationsNav },
  { label: "Patients", href: "/patients", items: patientsNav },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms-of-use" },
  { label: "HIPAA Notice", href: "/hipaa-notice" },
  { label: "Insurance", href: "/insurance" },
];

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type OpeningHours = {
  days: Weekday[];
  /** 24-hour "HH:MM" */
  opens: string;
  closes: string;
};

/**
 * Single source of truth for office hours. Both offices keep the same schedule.
 * The display string (`practice.hours`) and the JSON-LD openingHoursSpecification
 * are derived from this array — edit hours here only.
 */
export const openingHours: OpeningHours[] = [
  { days: ["Monday", "Tuesday", "Thursday"], opens: "07:00", closes: "17:00" },
  { days: ["Wednesday"], opens: "08:00", closes: "17:00" },
  { days: ["Friday"], opens: "07:00", closes: "16:00" },
];

const DAY_ABBR: Record<Weekday, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return m ? `${hour12}:${String(m).padStart(2, "0")}${suffix}` : `${hour12}${suffix}`;
}

function formatDays(days: Weekday[]): string {
  const abbr = days.map((d) => DAY_ABBR[d]);
  if (abbr.length === 1) return abbr[0];
  return `${abbr.slice(0, -1).join(", ")} & ${abbr[abbr.length - 1]}`;
}

/** "Mon, Tue & Thu 7AM–5PM · Wed 8AM–5PM · Fri 7AM–4PM" */
export function formatHours(spec: OpeningHours[]): string {
  return spec
    .map((h) => `${formatDays(h.days)} ${formatTime(h.opens)}–${formatTime(h.closes)}`)
    .join(" · ");
}

export const practice = {
  name: "HTx Pain Institute",
  formerNames: "Texas Interventional Pain Specialists and HTx Pain Care",
  phone: "832.990.8600",
  phoneHref: "tel:+18329908600",
  email: "info@htxpaincare.com",
  tagline: "Precision. Lasting Relief.",
  hours: formatHours(openingHours),
  hoursWeekend: "Sat–Sun: Closed",
};

