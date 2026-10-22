import type { Metadata, Viewport } from "next";
import DocumentShell from "@/components/document-shell";
import SiteChrome from "@/components/site-chrome";
import { defaultMetadata, defaultViewport } from "@/lib/default-metadata";
import { fontClassName } from "@/lib/fonts";
import "../globals.css";

/**
 * Root layout for /es. Own document so the prerendered HTML is lang="es"
 * without reading request headers. Navigating here from an English page is a
 * full load, which is what swaps the document language.
 *
 * Title template matches the English site so the brand suffix stays
 * consistent. Page files set the Spanish segment.
 */

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: "HTx Pain Institute · Dolor en Houston",
    template: "%s · HTx Pain Institute",
  },
  description:
    "Manejo del dolor en Houston y Humble. El Dr. Baumgartner atiende en inglés. El personal de la clínica habla español.",
  openGraph: {
    ...defaultMetadata.openGraph,
    locale: "es_US",
    images: [
      {
        url: "/images/og/htx-pain-institute-card.jpg",
        width: 1200,
        height: 630,
        alt: "Edward Baumgartner Jr., MD, junto al logotipo de HTx Pain Institute",
      },
    ],
  },
};

export const viewport: Viewport = defaultViewport;

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentShell className={fontClassName} lang="es" skipToContent="Saltar al contenido">
      <SiteChrome>{children}</SiteChrome>
    </DocumentShell>
  );
}
