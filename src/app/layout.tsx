import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import DocumentShell from "@/components/document-shell";
import { SITE_URL } from "@/lib/site";
import { practice } from "@/lib/nav";
import "./globals.css";

/**
 * The shared shell: document, fonts, and the analytics container — everything
 * every route needs and nothing that differs between them.
 *
 * The site's nav, footer, entity graph and chat widget used to live here. They
 * moved down into src/app/(site)/layout.tsx so the /lp ad landing pages, in
 * their own route group, can leave them out entirely. See
 * src/components/site-chrome.tsx for why that matters.
 *
 * There is deliberately no src/app/not-found.tsx. A root not-found is
 * serialised into *every* page's payload as a boundary fallback, so a chromed
 * one would have put the footer's whole service list — the thing these landing
 * pages exist to omit — back into their HTML. Unmatched URLs are handled by
 * src/app/global-not-found.tsx instead, and notFound() inside the site by
 * src/app/(site)/not-found.tsx.
 */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: practice.name,
    locale: "en_US",
    url: "./",
    images: [
      {
        url: "/images/og/htx-pain-institute.jpg",
        width: 1200,
        height: 630,
        alt: "The HTx Pain Institute team at the reception desk",
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

export const viewport: Viewport = {
  themeColor: "#1A2740",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <DocumentShell
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      {children}
    </DocumentShell>
  );
}
