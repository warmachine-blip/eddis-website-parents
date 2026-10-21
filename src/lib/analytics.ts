/**
 * Google measurement, in one place.
 *
 * Two pipelines, kept apart on purpose:
 *
 * 1. Google Ads conversions for AW-700388531. Those hits are built in
 *    src/lib/google-ads.ts and sent only for a tel: click or a completed
 *    booking. The combined Google tag (gtag/js?id=AW-700388531) is not
 *    loaded: its published settings also send G-7LR9NYKKQ3 and collect
 *    email, phone, and address from the page. GOOGLE_ADS_TRANSPORT is
 *    "gtm", so GTM-PP5NDT4H loads and the in-code hits stay off. The
 *    container still fires the same conversion labels. Do not run both.
 *
 * 2. GA4 measurement ID G-27RHPSC41Y, sent directly from this file to
 *    google-analytics.com. The site does not load gtag.js for that ID.
 *
 * Why there is no gtag.js snippet: the Google tag published for this ID
 * (the one labeled Holly Web Scheduler) is configured to collect email
 * addresses, phone numbers, and street addresses from the page, and to
 * record enhanced-measurement events — form interactions, site-search query
 * parameters, and a page view on every history change that includes the
 * full URL. Loading gtag/js?id=G-27RHPSC41Y runs that configuration. This
 * site's hits are built in src/lib/ga4-collect.ts instead. Page location on
 * those hits is window.location.href run through an allowlist: ad click IDs
 * and UTM parameters stay, and every other query parameter and the hash are
 * dropped. The referrer and the page_path parameter stay path and origin only.
 *
 * Nimblr's embed helper (https://assets.nimblr.ai/js/iframe.js) defines its
 * own gtag() and, on every postMessage from the scheduler, calls
 * gtag("config", message.i) and gtag("event", message.a, {event_category,
 * event_label}) on window.dataLayer. message.i is the measurement ID Holly
 * was given — this one. Those calls do not load gtag.js, and this file
 * never reads them. Wiring gtag.js up to window.dataLayer would turn each
 * scheduler message into another page view and would forward the message's
 * category and label. The scheduler frame's own container (GTM-NF63NFX)
 * measures book.nimblr.co under a different ID, G-XWCRHXNRQC.
 */

import {
  buildCollectQuery,
  GA_COLLECT_URL,
  GA_MEASUREMENT_ID,
  GA_SESSION_COOKIE,
  pagePathOnly,
  parseClientId,
  parseSession,
  safePageTitle,
  sessionCookieValue,
  sessionIsExpired,
  urlWithAllowedParams,
  type Ga4EventName,
  type GaSession,
} from "@/lib/ga4-collect";
import { collectConsentFields, readBrowserConsent } from "@/lib/consent";
import { trackAdsBookingConversion } from "@/lib/google-ads";

export { GA_MEASUREMENT_ID, pagePathOnly };

/**
 * Google Tag Manager container. Loaded only when GOOGLE_ADS_TRANSPORT is
 * "gtm". In "code" mode the snippet stays in this file so the install can
 * be turned back on without reconstructing it, and it is not rendered.
 */
export const GTM_CONTAINER_ID = "GTM-PP5NDT4H";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Click on a control that starts a new booking: a link to /request-appointment,
 * a link to the Nimblr booking page, an in-page jump to the embedded scheduler,
 * or the first interaction with that embed.
 *
 * Params are location (which control), label (its visible text), and page_path
 * (pathname only). Nothing else — no query string, no form fields, no patient
 * details. The same three fields are sent to GA4 as event parameters.
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
 * Push a click event onto dataLayer, and send the same event to GA4.
 * page_path is the pathname only. The dataLayer push never includes a query
 * string; that push is what the Google Ads container can listen for. The
 * GA4 hit's page location is window.location.href through the ad/UTM allowlist.
 */
export function pushClickEvent(
  event: ClickEventName,
  params: { location: string; label: string },
) {
  if (typeof window === "undefined") return;
  const location = cleanParam(params.location) || "unknown";
  const label = cleanParam(params.label) || "unlabeled";
  const page_path = (window.location.pathname || "/").slice(0, 120);
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  dataLayer.push({
    event,
    location,
    label,
    page_path,
  });
  sendGa4Event(event, { location, label, page_path: pagePathOnly(page_path) });
}

/**
 * dataLayer event pushed when the embedded Nimblr scheduler reports a booking
 * has completed. Use this as the GTM trigger for the Google Ads booking
 * conversion rather than a URL-path trigger: /appointment-confirmed is
 * reachable without booking anything, since the legacy /thank-you URLs
 * redirect to it.
 *
 * The GA4 hit carries the event name, the page path, and any allowlisted ad
 * parameters already on the page URL. Nothing from the scheduler message
 * is included. The same call sends the Google Ads booking conversion when
 * transport is "code" (see src/lib/google-ads.ts). The dataLayer push stays
 * so a GTM admin can still listen for it if the container is turned back on.
 */
export const BOOKING_CONVERSION_EVENT = "appointment_confirmed";

export function pushBookingConfirmed() {
  if (typeof window === "undefined") return;
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  dataLayer.push({ event: BOOKING_CONVERSION_EVENT });
  sendGa4Event(BOOKING_CONVERSION_EVENT, {
    page_path: pagePathOnly(window.location.pathname),
  });
  trackAdsBookingConversion();
}

/** A page view for the App Router, including client-side route changes. */
export function trackPageView(pathname: string, referrer: string) {
  sendGa4Event("page_view", { page_path: pagePathOnly(pathname) }, referrer);
}

const GA_CLIENT_COOKIE = "_ga";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 2;

let pageId = 0;
let hitCount = 0;
let memoryClientId = "";
let memorySession: GaSession | null = null;

/**
 * Identity used while analytics storage is denied. Held in memory for this
 * page only, so a cookieless ping still has a client id and nothing is written.
 */
function memoryIdentity(nowSeconds: number): {
  clientId: string;
  session: GaSession;
  firstVisit: boolean;
  newSession: boolean;
} {
  const firstVisit = !memoryClientId;
  if (!memoryClientId) memoryClientId = createClientId(nowSeconds);
  const expired = !memorySession || sessionIsExpired(memorySession, nowSeconds);
  if (!memorySession || expired) {
    const session: GaSession = {
      sid: String(nowSeconds),
      sct: memorySession ? memorySession.sct + 1 : 1,
      engaged: false,
      last: nowSeconds,
    };
    memorySession = session;
    return { clientId: memoryClientId, session, firstVisit, newSession: true };
  }
  const session: GaSession = { ...memorySession, last: nowSeconds };
  memorySession = session;
  return { clientId: memoryClientId, session, firstVisit: false, newSession: false };
}

function readCookie(name: string): string | null {
  const parts = document.cookie ? document.cookie.split("; ") : [];
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq) === name) return part.slice(eq + 1);
  }
  return null;
}

function writeCookie(name: string, value: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

function createClientId(nowSeconds: number): string {
  let n = 0;
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    n = buf[0] ?? 0;
  }
  if (!n) n = Math.floor(Math.random() * 1_000_000_000) + 1;
  return `${n}.${nowSeconds}`;
}

function resolveIdentity(nowSeconds: number): {
  clientId: string;
  session: GaSession;
  firstVisit: boolean;
  newSession: boolean;
} {
  const existingClient = parseClientId(readCookie(GA_CLIENT_COOKIE));
  const firstVisit = !existingClient;
  const clientId = existingClient ?? createClientId(nowSeconds);
  const parsed = parseSession(readCookie(GA_SESSION_COOKIE));
  const expired = !parsed || sessionIsExpired(parsed, nowSeconds);
  if (!parsed || expired) {
    return {
      clientId,
      firstVisit,
      newSession: true,
      session: {
        sid: String(nowSeconds),
        sct: parsed ? parsed.sct + 1 : 1,
        engaged: false,
        last: nowSeconds,
      },
    };
  }
  return { clientId, session: parsed, firstVisit, newSession: false };
}

function sendGa4Event(
  eventName: Ga4EventName,
  params: { location?: string; label?: string; page_path?: string },
  referrer = "",
) {
  if (typeof window === "undefined") return;
  const origin = window.location.origin;
  if (!origin || origin === "null") return;

  // Granted is the default, and that hit matches a page with no Consent Mode:
  // no gcs, gcd, or npa added here. Reject (or a GPC ads denial) is what
  // switches the hit to a cookieless ping and adds those fields.
  const consent = readBrowserConsent();
  const consentFields = collectConsentFields(consent);
  const persist = consent.signals.analytics_storage === "granted";

  const now = Math.floor(Date.now() / 1000);
  const identity = persist ? resolveIdentity(now) : memoryIdentity(now);
  const engaged =
    identity.session.engaged || eventName !== "page_view" || !identity.newSession;
  const session: GaSession = {
    sid: identity.session.sid,
    sct: identity.session.sct,
    engaged,
    last: now,
  };
  if (persist) {
    writeCookie(GA_CLIENT_COOKIE, `GA1.1.${identity.clientId}`);
    writeCookie(GA_SESSION_COOKIE, sessionCookieValue(session));
  } else {
    memorySession = session;
  }

  if (!pageId) {
    pageId = Math.floor(Math.random() * 1_000_000_000) + 1;
  }
  hitCount += 1;

  const language = typeof navigator !== "undefined" ? navigator.language : "";
  const screenSize =
    typeof screen !== "undefined" && screen.width && screen.height
      ? `${screen.width}x${screen.height}`
      : "";

  const body = buildCollectQuery({
    measurementId: GA_MEASUREMENT_ID,
    clientId: identity.clientId,
    sessionId: session.sid,
    sessionNumber: session.sct,
    sessionEngaged: engaged,
    hitNumber: hitCount,
    pageId,
    eventName,
    // Current URL, not params.page_path. buildCollectQuery keeps allowlisted
    // ad and UTM parameters on dl and drops every other query parameter and
    // the hash. ep.page_path is the pathname only.
    pageLocation: urlWithAllowedParams(window.location.href),
    pageReferrer: referrer,
    pageTitle: safePageTitle(document.title || ""),
    language,
    screen: screenSize,
    firstVisit: identity.firstVisit,
    sessionStart: identity.newSession,
    location: params.location,
    label: params.label,
    gcs: consentFields.gcs,
    gcd: consentFields.gcd,
    npa: consentFields.npa,
  });
  if (!body) return;
  deliver(body);
}

function deliver(body: string) {
  const url = `${GA_COLLECT_URL}?${body}`;
  try {
    if (navigator.sendBeacon?.(url)) return;
  } catch {
    // sendBeacon can throw if the URL is rejected; fetch below is the fallback.
  }
  fetch(url, { method: "POST", keepalive: true, mode: "no-cors", credentials: "omit" }).catch(
    () => {},
  );
}

/** Google Tag Manager container bootstrap — Google's published snippet, minified. */
export const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`;

/** The GTM <noscript> fallback's iframe source. */
export const GTM_NOSCRIPT_SRC = `https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`;
