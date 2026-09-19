import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import OrganizationSchema from "@/components/organization-schema";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/scroll-reveal";
import { SITE_URL } from "@/lib/site";
import { practice } from "@/lib/nav";
import Script from "next/script";
import { GTM_NOSCRIPT_SRC, GTM_SNIPPET } from "@/lib/analytics";
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
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      {/*
        Written as a literal <head> rather than next/script: in the App Router
        `strategy="beforeInteractive"` does not emit a real <script>, it queues
        the code into `self.__next_s` for the Next runtime to replay after the
        framework bundle loads. Google's install checks (and Tag Assistant)
        expect parser-executed tags at the top of <head>, which is what these
        are. Next merges its own metadata tags in after them.
      */}
      <head>
        {/*
          React hoists resource links and async scripts above these inline
          snippets, and the hoisted stylesheet delays inline script execution
          until the CSS lands. Warming the connection here means the container
          request costs one round trip instead of DNS + TLS + fetch.
        */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/*
          Google Tag Manager — first element in <head>, per Google's snippet.
          The container owns every tag, the Google Ads conversion included; the
          site loads no gtag.js of its own. See src/lib/analytics.ts.
        */}
        <script
          id="gtm-container"
          dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-off-white text-charcoal">
        {/* Google Tag Manager (noscript) — immediately after <body>. */}
        <noscript>
          <iframe
            src={GTM_NOSCRIPT_SRC}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-off-white"
        >
          Skip to content
        </a>
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
        <Script
          id="leadconnector-chat"
          strategy="lazyOnload"
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="66840b4e178c31f522476378"
        />
      </body>
    </html>
  );
}
