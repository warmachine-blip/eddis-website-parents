import type { Metadata, Viewport } from "next";
import DocumentShell from "@/components/document-shell";
import SiteChrome from "@/components/site-chrome";
import { defaultMetadata, defaultViewport } from "@/lib/default-metadata";
import { fontClassName } from "@/lib/fonts";
import "../globals.css";

/**
 * Root layout for the English site. A route group adds no URL segment, so
 * every route here keeps the path it has always had.
 *
 * This file owns <html> and <body> (via DocumentShell). There is no
 * src/app/layout.tsx: the Spanish pages and the /lp landing pages each have
 * their own root layout, which is how <html lang> can differ without calling
 * headers() and forcing the whole site dynamic.
 *
 * Default title and description live in src/lib/default-metadata.ts.
 */

export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = defaultViewport;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentShell className={fontClassName}>
      <SiteChrome>{children}</SiteChrome>
    </DocumentShell>
  );
}
