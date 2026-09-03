import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { aboutNav, legalNav, offices, patientsNav, practice, servicesNav } from "@/lib/nav";
import { socialItems } from "@/components/social-icons";
import CopyrightYear from "@/components/copyright-year";

/**
 * Underline sweeps in from the left on hover, retracts to the right on
 * leave. Technique adapted from Skiper UI's "Skiper 40" (Link000 variant,
 * https://skiper-ui.com/v1/skiper40) — pure CSS, no motion library needed.
 */
const footerLinkClass =
  "group relative inline-flex w-fit items-center before:pointer-events-none before:absolute before:-bottom-0.5 before:left-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:bg-brass-light before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] before:content-[''] hover:text-brass-light hover:before:origin-left hover:before:scale-x-100";

/**
 * Same sweep technique as footerLinkClass, but `block` instead of
 * `inline-flex` so multi-line content (an address with a <br>) still
 * wraps normally — the underline lands beneath the block's own width.
 */
const footerLinkBlockClass =
  "group relative block w-fit before:pointer-events-none before:absolute before:-bottom-0.5 before:left-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:bg-brass-light before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] before:content-[''] hover:text-brass-light hover:before:origin-left hover:before:scale-x-100";

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={footerLinkClass}>
      {children}
    </Link>
  );
}

// Link columns come from src/lib/nav.ts so the footer can never drift from the header.
const practiceLinks = [
  ...aboutNav,
  { label: "Community — Ima's Home", href: "/community/imas-home" },
  { label: "Locations", href: "/locations" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = servicesNav.filter((s) => !s.note);

const patientLinks = [...patientsNav, { label: "Request Appointment", href: "/request-appointment" }];

export default function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-off-white/85">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-10">
        <div className="grid grid-cols-2 gap-10 pb-12 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Image
              src="/images/htx-pain-institute-logo.png"
              alt="HTx Pain Institute"
              width={144}
              height={96}
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-sm font-serif text-lg italic text-brass-light">
              {practice.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-off-white/60">
              {practice.name} — formerly {practice.formerNames}. Same Dr. Baumgartner,
              same Houston-area locations, expanded clinical scope.
            </p>
            <ul className="mt-5 flex items-center gap-2" aria-label="Social media">
              {socialItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-off-white/15 text-off-white/70 transition-colors hover:border-brass-light hover:text-brass-light"
                  >
                    <item.Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
              Practice
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {practiceLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
              <li className="pt-1">
                <FooterLink href="/services">
                  <span className="font-medium text-brass-light">All Services →</span>
                </FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
              For Patients
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {patientLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-off-white/10 py-10 sm:grid-cols-2">
          {offices.map((office) => (
            <div key={office.key}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
                {office.city} Office
              </h3>
              <address className="mt-3 not-italic text-sm leading-relaxed text-off-white/75">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkBlockClass}
                  aria-label={`Get directions to the ${office.city} office`}
                >
                  {office.addressLine1}
                  <br />
                  {office.addressLine2}
                </a>
                <br />
                <a href={practice.phoneHref} className={`tabular-nums ${footerLinkClass}`}>
                  {practice.phone}
                </a>
              </address>
            </div>
          ))}
        </div>

        <div className="border-t border-off-white/10 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-off-white/50">
            <span className="font-semibold text-off-white/70">Medical disclaimer:</span>{" "}
            Information on this site is not medical advice. Always consult your
            physician. Individual results may vary. Content is medically reviewed by
            Edward Baumgartner Jr., MD.
          </p>

          <div className="mt-6 flex flex-col gap-4 text-xs text-off-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © <CopyrightYear /> {practice.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
