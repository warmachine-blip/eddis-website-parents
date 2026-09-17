/**
 * Google measurement IDs — one place, so the tags in the root layout and any
 * conversion event fired from a page can never drift apart.
 */

/** Google Tag Manager container. Loads gtm.js and owns every tag configured in GTM. */
export const GTM_CONTAINER_ID = "GTM-PP5NDT4H";

/**
 * Google Ads. This is the site's only gtag.js loader — Google's "only one
 * Google tag per page" rule means additional destinations (a GA4 property,
 * a second Ads account) get another `gtag('config', ...)` line below, never a
 * second `googletagmanager.com/gtag/js` script tag.
 *
 * Note for whoever edits the GTM container: do NOT also deploy a Google tag
 * for this same AW- ID inside GTM-PP5NDT4H. The hard-coded tag here already
 * covers it, and running both double-counts conversions.
 */
export const GOOGLE_ADS_ID = "AW-700388531";

/**
 * dataLayer event pushed by /appointment-confirmed. Use this as the GTM
 * trigger for the Google Ads booking conversion rather than a URL-path
 * trigger, so the conversion survives a change to the page's path.
 */
export const BOOKING_CONVERSION_EVENT = "appointment_confirmed";

/** Google tag (gtag.js) bootstrap. Runs inline, in <head>, during parse. */
export const GOOGLE_ADS_SNIPPET = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}');`;

/** Google Tag Manager container bootstrap — Google's published snippet, minified. */
export const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`;

/** The GTM <noscript> fallback's iframe source. */
export const GTM_NOSCRIPT_SRC = `https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`;
