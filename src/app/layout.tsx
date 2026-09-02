import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import OrganizationSchema from "@/components/organization-schema";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/scroll-reveal";
import "./globals.css";

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
  title: {
    default: "HTx Pain Institute · Precision Pain Management in Houston",
    template: "%s · HTx Pain Institute",
  },
  description:
    "Precision pain management in Houston. Double board-certified care, advanced minimally invasive procedures, and a patient-first philosophy. Two locations in Houston and Humble.",
};

export const viewport: Viewport = {
  themeColor: "#1A2740",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-off-white text-charcoal">
        <OrganizationSchema />
        <ScrollReveal />
        <SiteHeader />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
