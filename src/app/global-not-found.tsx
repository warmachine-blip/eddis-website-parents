import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import DocumentShell from "@/components/document-shell";
import SiteChrome from "@/components/site-chrome";
import NotFoundBody from "@/components/not-found-body";
import "./globals.css";

/**
 * The 404 for any URL the app does not match.
 *
 * This exists instead of src/app/not-found.tsx because a root not-found is
 * serialised into every page's RSC payload as a boundary fallback — including
 * the /lp ad landing pages, where the site footer it renders would have put the
 * full service list back into the HTML. global-not-found is handled at the
 * routing level and rendered only when it is actually served, so the chrome
 * stays on the 404 page and out of everything else.
 *
 * It bypasses layouts, which is why it renders DocumentShell and loads the
 * fonts itself. Next already marks this route noindex, so metadata here is
 * just the title and description.
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
  title: "Page Not Found · HTx Pain Institute",
  description: "The page you are looking for does not exist.",
};

/** Bypassing the root layout means its viewport export does not apply either. */
export const viewport: Viewport = {
  themeColor: "#1A2740",
};

export default function GlobalNotFound() {
  return (
    <DocumentShell
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <SiteChrome>
        <NotFoundBody />
      </SiteChrome>
    </DocumentShell>
  );
}
