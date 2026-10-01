import Script from "next/script";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import OrganizationSchema from "@/components/organization-schema";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/scroll-reveal";
import ChatGreeting from "@/components/chat-greeting";

/**
 * The main site's chrome: nav, footer, site-wide entity graph, chat widget.
 *
 * Extracted out of the root layout when the /lp ad landing pages arrived. Those
 * pages must not render the menu or the footer at all — both are built from
 * src/lib/nav.ts, and a rendered nav puts every service label in the page HTML,
 * which is the one thing the ad policy review turns on. A route group with its
 * own layout is the only way to not render them, and that means the chrome has
 * to live below the root layout rather than inside it.
 *
 * Used by src/app/(site)/layout.tsx for every real page, and by
 * src/app/not-found.tsx — the global 404 renders inside the *root* layout, so
 * without this it would have come out bare.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationSchema />
      <ScrollReveal />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />
      {/*
        LeadConnector chat widget. lazyOnload, not defer: a deferred script
        still runs before the load event and counts against the page's
        blocking time, while nobody needs the chat bubble in the first second.
        Loading it after load keeps it out of LCP and TBT entirely.
      */}
      <ChatGreeting />
      <Script
        id="leadconnector-chat"
        strategy="lazyOnload"
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="66840b4e178c31f522476378"
      />
    </>
  );
}
