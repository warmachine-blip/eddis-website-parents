"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { aboutNav, legalNav, offices, patientsNav, practice, servicesNav } from "@/lib/nav";
import { scheduling } from "@/lib/scheduling";
import { socialItems } from "@/components/social-icons";
import CopyrightYear from "@/components/copyright-year";
import EnglishOnlyMark from "@/components/english-only-mark";
import FooterFrame from "@/components/footer-frame";
import FooterServiceLinks from "@/components/footer-service-links";
import { localizeNavLink, spanishLabel, spanishSocialLabel } from "@/lib/spanish-nav";

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

function FooterLink({
  href,
  external,
  location,
  children,
}: {
  href: string;
  external?: boolean;
  location?: string;
  children: ReactNode;
}) {
  const className = `${footerLinkClass} min-h-11 py-2`;
  // The scheduler lives on Nimblr, so that one link leaves the app entirely.
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-location={location}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} data-analytics-location={location} className={className}>
      {children}
    </Link>
  );
}

type FooterItem = {
  label: string;
  href: string;
  external?: boolean;
  location?: string;
};

export default function SiteFooter() {
  const path = usePathname() ?? "/";
  const isSpanish = path === "/es" || path.startsWith("/es/");

  // Link columns come from src/lib/nav.ts so the footer can never drift from the header.
  const practiceLinks = [
    ...aboutNav,
    { label: "Community", href: "/community" },
    { label: "Locations", href: "/locations" },
    { label: "Contact", href: "/contact" },
  ].map((link) => localizeNavLink(link, isSpanish));

  const serviceLinks = servicesNav
    .filter((link) => !link.note)
    .map((link) => localizeNavLink(link, isSpanish));

  const patientLinks: (FooterItem & { englishOnly: boolean })[] = [
    ...patientsNav,
    { label: "Schedule Appointment", href: "/request-appointment", location: "footer" },
    // External (Nimblr). Patients were phoning the front desk to reschedule.
    { label: "Reschedule Appointment", href: scheduling.manageUrl, external: true },
  ].map((link) => ({ ...link, ...localizeNavLink(link, isSpanish) }));

  const legalLinks = legalNav.map((link) => localizeNavLink(link, isSpanish));

  return (
    <FooterFrame>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-10">
        <div className="grid grid-cols-2 gap-10 pb-12 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Image
              src="/images/htx-pain-institute-logo.png"
              alt="HTx Pain Institute"
              width={144}
              height={96}
              sizes="84px"
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-sm font-serif text-lg italic text-brass-light">
              {isSpanish ? "Precisión. Alivio duradero." : practice.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-off-white/60">
              {isSpanish
                ? `${practice.name}, antes ${practice.formerNames}. El mismo Dr. Baumgartner, las mismas oficinas del área de Houston y un alcance clínico más amplio.`
                : `${practice.name}, formerly ${practice.formerNames}. Same Dr. Baumgartner, same Houston-area locations, expanded clinical scope.`}
            </p>
            <ul className="mt-5 flex items-center gap-3" aria-label={isSpanish ? "Redes sociales" : "Social media"}>
              {socialItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={isSpanish ? spanishSocialLabel(item.key, item.label) : item.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-off-white/15 text-off-white/70 transition-colors hover:border-brass-light hover:text-brass-light"
                  >
                    <item.Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
              {isSpanish ? spanishLabel("Practice") : "Practice"}
            </h3>
            <ul className="mt-4 space-y-1 text-sm">
              {practiceLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>
                    {l.label}
                    {l.englishOnly ? <EnglishOnlyMark tone="dark" /> : null}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
              {isSpanish ? spanishLabel("Services") : "Services"}
            </h3>
            <ul className="mt-4 space-y-1 text-sm">
              <FooterServiceLinks links={serviceLinks} />
              <li className="pt-1">
                <FooterLink href="/services">
                  <span className="font-medium text-brass-light">
                    {isSpanish ? spanishLabel("All Services →") : "All Services →"}
                    {isSpanish ? <EnglishOnlyMark tone="dark" /> : null}
                  </span>
                </FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
              {isSpanish ? spanishLabel("For Patients") : "For Patients"}
            </h3>
            <ul className="mt-4 space-y-1 text-sm">
              {patientLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href} external={l.external} location={l.location}>
                    {l.label}
                    {l.englishOnly ? <EnglishOnlyMark tone="dark" /> : null}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-off-white/10 py-10 sm:grid-cols-2">
          {offices.map((office) => (
            <div key={office.key}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
                <FooterLink href={office.pageHref}>
                  {isSpanish ? `Oficina de ${office.shortLabel}` : `${office.shortLabel} Office`}
                  {isSpanish ? <EnglishOnlyMark tone="dark" /> : null}
                </FooterLink>
              </h3>
              <address className="mt-3 not-italic text-sm leading-relaxed text-off-white/75">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkBlockClass}
                >
                  {office.addressLine1}
                  <br />
                  {office.addressLine2}
                  <span className="sr-only">{isSpanish ? " (cómo llegar en Google Maps)" : " (get directions in Google Maps)"}</span>
                </a>
                <br />
                <a href={practice.phoneHref} data-phone={practice.phone} data-analytics-location="footer" className={`min-h-11 py-2 tabular-nums ${footerLinkClass} phone`}>
                  {practice.phone}
                </a>
              </address>
              <p className="mt-1 text-sm leading-relaxed text-off-white/75" lang="es">
                Hablamos español
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-off-white/10 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-off-white/50">
            {isSpanish ? (
              <>
                <span className="font-semibold text-off-white/70">Aviso médico:</span> La información de este sitio no
                es consejo médico. Consulte siempre a su médico. Los resultados varían de una persona a otra. El
                contenido cuenta con la revisión médica de Edward Baumgartner Jr., MD.
              </>
            ) : (
              <>
                <span className="font-semibold text-off-white/70">Medical disclaimer:</span>{" "}
                Information on this site is not medical advice. Always consult your
                physician. Individual results may vary. Content is medically reviewed by
                Edward Baumgartner Jr., MD.
              </>
            )}
          </p>

          <div className="mt-6 flex flex-col gap-4 text-xs text-off-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © <CopyrightYear /> {practice.name}. {isSpanish ? "Todos los derechos reservados." : "All rights reserved."}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>
                    {l.label}
                    {l.englishOnly ? <EnglishOnlyMark tone="dark" /> : null}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </FooterFrame>
  );
}
