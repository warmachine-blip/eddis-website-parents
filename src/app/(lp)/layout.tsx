import type { Metadata } from "next";
import LpTopBar from "@/components/lp/lp-top-bar";
import LpFooter from "@/components/lp/lp-footer";

/**
 * Layout for the /lp Google Ads landing pages.
 *
 * What it deliberately does NOT render, compared with src/app/(site)/layout.tsx:
 *
 * - SiteHeader and SiteFooter. Both are built from src/lib/nav.ts, whose
 *   servicesNav and conditionsNav carry every service and condition label on
 *   the site. Rendering either would put the disallowed treatment names into
 *   this page's HTML even though nothing visible mentions them — a route group
 *   with its own layout is the only way to not render them at all.
 * - OrganizationSchema. Its MedicalOrganization node publishes `knowsAbout`
 *   from src/lib/schema.ts, which lists the disallowed therapy. Each landing
 *   page emits its own narrower structured data instead.
 * - The LeadConnector chat widget, which is site chrome and has no job here.
 *
 * The document shell, fonts and the GTM container all come from the root
 * layout, so these pages carry exactly the same GTM-PP5NDT4H install as the
 * rest of the site.
 *
 * noindex is set here so it applies to every page in the group and cannot be
 * forgotten on a new one; `follow` is kept, and robots.txt still allows these
 * paths, because Google's ad crawler has to be able to read them.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LpTopBar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <LpFooter />
    </>
  );
}
