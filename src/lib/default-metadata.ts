import type { Metadata, Viewport } from "next";
import { practice } from "@/lib/nav";
import { SITE_URL } from "@/lib/site";

/**
 * Default document metadata for the English site. It used to live in
 * src/app/layout.tsx. That file is no longer the single root layout: Spanish
 * pages need their own <html lang="es">, which in the App Router means a
 * separate root layout and no top-level layout.tsx. Edit the title and
 * description here. The Spanish root layout spreads this and overrides the
 * strings it has to.
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: practice.name,
    locale: "en_US",
    url: "./",
    images: [
      {
        /*
          The card every platform shows when the site is shared. Built by
          scripts/social-card.mjs — see that file before changing this.

          The filename matters: previews are cached against the image URL for
          weeks, so a new card ships under a new name rather than overwriting
          the old one. og/htx-pain-institute.jpg is the previous card and stays
          in the repo so links shared before this change still resolve.
        */
        url: "/images/og/htx-pain-institute-card.jpg",
        width: 1200,
        height: 630,
        alt: "Edward Baumgartner Jr., MD, beside the HTx Pain Institute logo",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  title: {
    default: "HTx Pain Institute · Precision Pain Management in Houston",
    template: "%s · HTx Pain Institute",
  },
  description:
    "Precision pain management in Houston and Humble. Double board-certified care, advanced minimally invasive procedures, and a patient-first philosophy.",
};

export const defaultViewport: Viewport = {
  themeColor: "#1A2740",
};
