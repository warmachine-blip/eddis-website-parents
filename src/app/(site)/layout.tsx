import SiteChrome from "@/components/site-chrome";

/**
 * Every page of the main site. The document shell is the root layout; this adds
 * the nav, footer, site-wide entity graph and chat widget.
 *
 * A route group adds no URL segment, so every route under (site) keeps the path
 * it has always had.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
