/**
 * The organizations the practice supports. One entry per organization, read by
 * the /community hub, each detail page, and the JSON-LD on both — so the facts
 * on the page and the facts in the structured data cannot drift apart.
 *
 * Every claim about an organization here is taken from that organization's own
 * site. Claims about the practice's involvement come from the practice.
 */

export type SupportedOrg = {
  slug: string;
  /** Icon for the hub card; names come from src/components/icon-badge.tsx. */
  icon: "shield" | "pulse";
  /** Name as the organization writes it. */
  name: string;
  /** Shorter form for nav and breadcrumbs. */
  shortName: string;
  href: string;
  /** The organization's own site. */
  website: string;
  /** Hostname only, for display. */
  websiteLabel: string;
  /** Other profiles the organization runs, for schema.org sameAs. */
  sameAs: string[];
  foundingDate: string;
  /** One line for the hub card. */
  summary: string;
  /** How the practice is involved — one line, for the hub card. */
  involvement: string;
};

export const supportedOrgs: SupportedOrg[] = [
  {
    slug: "imas-home",
    icon: "shield",
    name: "Ima's Home for Children",
    shortName: "Ima's Home",
    href: "/community/imas-home",
    website: "https://imashome.com",
    websiteLabel: "imashome.com",
    sameAs: [],
    foundingDate: "2013",
    summary:
      "A 501(c)(3) caring for roughly 155 orphaned and abandoned children in the Philippines.",
    involvement:
      "Twelve years of support, the last five as presenting sponsor of the annual 5K. Tatyana Baumgartner serves on the Board of Directors.",
  },
  {
    slug: "kel-strong-foundation",
    icon: "pulse",
    name: "The ‘Kel Strong’ Mabatah Foundation",
    shortName: "'Kel Strong' Mabatah Foundation",
    href: "/community/kel-strong-foundation",
    website: "https://kelstrongfoundation.com",
    websiteLabel: "kelstrongfoundation.com",
    sameAs: ["https://www.instagram.com/kelstrongfoundation"],
    foundingDate: "2020",
    summary:
      "A 501(c)(3) funding rehabilitation and recovery for people living with traumatic brain injury.",
    involvement:
      "HTx Pain Institute supports the foundation's work for TBI survivors and their families.",
  },
];

export const orgBySlug = (slug: string) =>
  supportedOrgs.find((o) => o.slug === slug);
