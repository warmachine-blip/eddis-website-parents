import { GTM_NOSCRIPT_SRC, GTM_SNIPPET } from "@/lib/analytics";

/**
 * The document itself — <html>, <head>, <body>, the fonts and the GTM
 * container. Rendered by src/app/layout.tsx for every route, and by
 * src/app/global-not-found.tsx, which bypasses layouts entirely and so has to
 * build its own document.
 *
 * Extracted rather than duplicated so the GTM install can only exist once. See
 * the note in src/lib/analytics.ts about two connections to one conversion ID.
 *
 * The fonts are NOT here. next/font derives its generated class name from the
 * file that calls it, so hoisting those calls out of src/app/layout.tsx would
 * rename the class on every page of the site for no behavioural gain. Each
 * entry point loads its own and passes the class string in.
 */

export default function DocumentShell({
  className,
  children,
}: {
  /** Goes on <html> — the font variable classes plus the base utilities. */
  className: string;
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={className}>
      {/*
        Written as a literal <head> rather than next/script: in the App Router
        `strategy="beforeInteractive"` does not emit a real <script>, it queues
        the code into `self.__next_s` for the Next runtime to replay after the
        framework bundle loads. Google's install checks (and Tag Assistant)
        expect parser-executed tags at the top of <head>, which is what these
        are. Next merges its own metadata tags in after them.
      */}
      {/* eslint-disable-next-line @next/next/no-head-element -- next/head is
          Pages Router; a literal <head> is correct in the App Router and is
          required here for the reason above. The rule exempts app/layout.tsx
          but not a component it renders. */}
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
        {children}
      </body>
    </html>
  );
}
