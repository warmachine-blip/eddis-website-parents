import type { Metadata, Viewport } from "next";
import ChatWidget from "@/components/chat-widget";
import DocumentShell from "@/components/document-shell";
import LpFooter from "@/components/lp/lp-footer";
import LpTopBar from "@/components/lp/lp-top-bar";
import { defaultMetadata, defaultViewport } from "@/lib/default-metadata";
import { fontClassName } from "@/lib/fonts";
import "../globals.css";

/**
 * Root layout for the /lp Google Ads landing pages.
 *
 * What it deliberately does NOT render, compared with the main site:
 *
 * - SiteHeader and SiteFooter. Both are built from src/lib/nav.ts, whose
 *   servicesNav and conditionsNav carry every service and condition label on
 *   the site. Rendering either would put the disallowed treatment names into
 *   this page's HTML even though nothing visible mentions them.
 * - OrganizationSchema. Its MedicalOrganization node publishes `knowsAbout`
 *   from src/lib/schema.ts, which lists the disallowed therapy. Each landing
 *   page emits its own narrower structured data instead.
 *
 * The LeadConnector chat widget IS rendered here, loaded exactly as it is on
 * the rest of the site.
 *
 * This is a root layout (it renders the document) so it can sit beside the
 * Spanish root layout. It carries the same Google Ads and Google Analytics
 * install as the rest of the site, through DocumentShell. See
 * GOOGLE_ADS_TRANSPORT in src/lib/google-ads.ts.
 *
 * noindex is set here so it applies to every page in the group and cannot be
 * forgotten on a new one; `follow` is kept, and robots.txt still allows these
 * paths, because Google's ad crawler has to be able to read them.
 */

export const metadata: Metadata = {
  ...defaultMetadata,
  robots: { index: false, follow: true },
};

export const viewport: Viewport = defaultViewport;

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentShell className={fontClassName}>
      <LpTopBar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <LpFooter />
      <ChatWidget />
    </DocumentShell>
  );
}
