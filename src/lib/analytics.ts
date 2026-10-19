/**
 * Google measurement — one place, so the tags in the root layout and any
 * conversion event fired from a page can never drift apart.
 *
 * How analytics is loaded: Google Tag Manager only. The site does not load
 * gtag.js, and it does not use @next/third-parties. There is no GA4 measurement
 * ID (G-…) in this repo. Do not add one. A GA4 property, like the Google Ads
 * conversion, belongs as a tag inside the container below.
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

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Click on a control that starts a new booking: a link to /request-appointment,
 * a link to the Nimblr booking page, an in-page jump to the embedded scheduler,
 * or the first interaction with that embed.
 *
 * Params are location (which control), label (its visible text), and page_path
 * (pathname only). Nothing else — no query string, no form fields, no patient
 * details. GTM forwards this to GA4 once a GA4 Event tag listens for it.
 */
export const APPOINTMENT_REQUEST_CLICK_EVENT = "appointment_request_click";

/** Click on a tel: link for the practice number. 911 is not included. */
export const PHONE_CLICK_EVENT = "phone_click";

export type ClickEventName =
  | typeof APPOINTMENT_REQUEST_CLICK_EVENT
  | typeof PHONE_CLICK_EVENT;

const MAX_PARAM = 80;

function cleanParam(value: string): string {
  return value.replace(/\s+/g, " ").trim().slice(0, MAX_PARAM);
}

/**
 * Push a click event onto dataLayer. The payload is the event name plus
 * location, label, and page_path. page_path is the pathname only, so a query
 * string can never ride along.
 */
export function pushClickEvent(
  event: ClickEventName,
  params: { location: string; label: string },
) {
  if (typeof window === "undefined") return;
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  dataLayer.push({
    event,
    location: cleanParam(params.location) || "unknown",
    label: cleanParam(params.label) || "unlabeled",
    page_path: (window.location.pathname || "/").slice(0, 120),
  });
}

/**
 * dataLayer event pushed when the embedded Nimblr scheduler reports a booking
 * has completed. Use this as the GTM trigger for the Google Ads booking
 * conversion rather than a URL-path trigger: /appointment-confirmed is
 * reachable without booking anything, since the legacy /thank-you URLs
 * redirect to it.
 */
export const BOOKING_CONVERSION_EVENT = "appointment_confirmed";

/** Google Tag Manager container bootstrap — Google's published snippet, minified. */
export const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`;

/** The GTM <noscript> fallback's iframe source. */
export const GTM_NOSCRIPT_SRC = `https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`;
