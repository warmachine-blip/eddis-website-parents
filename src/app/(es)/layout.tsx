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
    default: "HTx Pain Institute · Especialista en dolor en Houston, TX",
    template: "%s · HTx Pain Institute",
  },
  description:
    "Especialista en dolor en Houston y Humble, TX. A menudo hay consultas en la misma semana. El personal habla español; el Dr. Baumgartner atiende en inglés.",
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
