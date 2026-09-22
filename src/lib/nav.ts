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
  /** Office label without the practice name, e.g. "Houston (Willowbrook)". */
  shortLabel: string;
  /** Short label for nav menus. */
  navLabel: string;
  /** The office's own page under /locations. */
  pageHref: string;
  addressLine1: string;
  addressLine2: string;
  mapsQuery: string;
  /**
   * WGS84 coordinates for this street address, resolved against the US Census
   * Bureau geocoder (Public_AR_Current benchmark, exact street-address match).
   * Used for the GeoCoordinates node in the clinic's structured data.
   */
  geo: { latitude: number; longitude: number };
};

export const offices: Office[] = [
  {
    key: "houston",
    city: "Houston",
    state: "TX",
    zip: "77070",
    label: "HTx Pain Institute — Houston (Willowbrook)",
    shortLabel: "Houston (Willowbrook)",
    navLabel: "Houston (Willowbrook) / Northwest Houston",
    pageHref: "/locations/northwest-houston",
    addressLine1: "13323 Dotson Rd, Suite 200",
    addressLine2: "Houston, TX 77070",
    mapsQuery: "13323 Dotson Rd, Suite 200, Houston, TX 77070",
    geo: { latitude: 29.96835, longitude: -95.553155 },
  },
  {
    key: "humble",
    city: "Humble",
    state: "TX",
    zip: "77338",
    label: "HTx Pain Institute — Humble (FM 1960)",
    shortLabel: "Humble (FM 1960)",
    navLabel: "Humble (FM 1960)",
    pageHref: "/locations/humble",
    addressLine1: "1485 FM 1960 Bypass Rd. E, Suite 100",
    addressLine2: "Humble, TX 77338",
    mapsQuery: "1485 FM 1960 Bypass Rd. E, Suite 100, Humble, TX 77338",
    geo: { latitude: 30.004532, longitude: -95.253443 },
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
  { label: "Allison Turner, DNP", href: "/allison-turner" },
  { label: "Tatyana Baumgartner, CPA", href: "/tatyana-baumgartner-cpa" },
];

/** Organizations the practice supports. One page each, hub at /community. */
export const communityNav: NavLink[] = [
  { label: "Ima's Home for Children", href: "/community/imas-home" },
  { label: "'Kel Strong' Mabatah Foundation", href: "/community/kel-strong-foundation" },
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
  { label: "Community", href: "/community", items: communityNav },
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
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "17:00",
  },
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

const WEEK_ORDER: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * "Mon–Fri" for a consecutive run, "Mon, Wed & Fri" for a broken one. Runs of
 * three or more collapse to a range; two consecutive days stay listed, because
 * "Mon & Tue" is shorter to read than "Mon–Tue".
 */
function formatDays(days: Weekday[]): string {
  const sorted = [...days].sort((a, b) => WEEK_ORDER.indexOf(a) - WEEK_ORDER.indexOf(b));

  const runs: Weekday[][] = [];
  for (const day of sorted) {
    const run = runs[runs.length - 1];
    const prev = run?.[run.length - 1];
    if (prev && WEEK_ORDER.indexOf(day) === WEEK_ORDER.indexOf(prev) + 1) run.push(day);
    else runs.push([day]);
  }

  const parts = runs.map((run) =>
    run.length >= 3
      ? `${DAY_ABBR[run[0]]}–${DAY_ABBR[run[run.length - 1]]}`
      : run.map((d) => DAY_ABBR[d]).join(", ")
  );

  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} & ${parts[parts.length - 1]}`;
}

/** "Mon–Fri 7AM–5PM" */
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
  email: "info@htxpaininstitute.com",
  tagline: "Precision. Lasting Relief.",
  hours: formatHours(openingHours),
  hoursWeekend: "Sat–Sun: Closed",
};

