/**
 * Google measurement IDs — one place, so the tags in the root layout and any
 * conversion event fired from a page can never drift apart.
 */

/** Google Tag Manager container. Loads gtm.js and owns every tag configured in GTM. */
export const GTM_CONTAINER_ID = "GTM-PP5NDT4H";

/**
 * Google Ads conversion ID AW-700388531 is NOT configured here. It is a tag
 * inside the GTM container above, which is the only thing that should load it.
 *
 * This file used to also hard-code a gtag.js loader and a gtag('config', ...)
 * for that same ID. With the container tag in place, both were live: two
 * connections to one conversion ID, double-counting every booking. The
 * hard-coded pair was removed — do not restore it. A second destination (a GA4
 * property, another Ads account) belongs in the container too, not here.
 */

/**
 * dataLayer event pushed by /appointment-confirmed. Use this as the GTM
 * trigger for the Google Ads booking conversion rather than a URL-path
 * trigger, so the conversion survives a change to the page's path.
 */
export const BOOKING_CONVERSION_EVENT = "appointment_confirmed";

/** Google Tag Manager container bootstrap — Google's published snippet, minified. */
export const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`;

/** The GTM <noscript> fallback's iframe source. */
export const GTM_NOSCRIPT_SRC = `https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`;
