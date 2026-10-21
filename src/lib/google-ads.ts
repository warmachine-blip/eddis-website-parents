/**
 * Google Ads conversions for AW-700388531, without the combined Google tag.
 *
 * gtag/js?id=AW-700388531 is not a conversion snippet. Google's published
 * settings for that id also send hits to GA4 property G-7LR9NYKKQ3, turn on
 * automatic collection of email, phone, and address, and (on the live site)
 * run remarketing. Setting allow_ad_personalization_signals, allow_google_signals,
 * allow_enhanced_conversions, or Consent Mode defaults does not stop that
 * linked destination. This file therefore does not load that script.
 *
 * What it does send is one conversion hit, and only when someone calls the
 * practice number (or a configured tracking number) or the scheduler
 * reports a booking. The hit uses the same
 * conversion id and labels as the container. The page address on it is
 * urlWithAllowedParams. The referrer is the origin only. npa=1 asks Google
 * not to use the hit for ad personalization. No user_data and no enhanced
 * conversion fields are added.
 *
 * gtag('set', {allow_ad_personalization_signals:false, allow_google_signals:false,
 * ads_data_redaction:true}) and Consent Mode defaults that deny ad_user_data
 * and ad_personalization only run inside gtag.js. Loading that script to set
 * them brings G-7LR9NYKKQ3 back. Those defaults are not written to
 * window.dataLayer either: Nimblr's helper and a restored GTM container both
 * read that array. Unlinking G-7LR9NYKKQ3 and turning off automatic
 * user-provided data has to be done in the Google tag settings by an Ads admin.
 *
 * GOOGLE_ADS_TRANSPORT is the only switch. "code" sends the hit above and
 * does not load GTM-PP5NDT4H. "gtm" loads the container and does not send
 * the hit. The container still has these labels, and this repo cannot pause
 * them, so both must not run. The current value is "gtm": PatientEdge's
 * container, remarketing, and G-7LR9NYKKQ3 stay on, and these in-code hits
 * stay off. See docs/gtm-inventory.md.
 */

import { referrerOrigin, urlWithAllowedParams } from "./ga4-collect.ts";

/** "gtm" loads GTM-PP5NDT4H and does not send the hits in this file. */
export const GOOGLE_ADS_TRANSPORT: "code" | "gtm" = "gtm";

export const GOOGLE_ADS_CONVERSION_ID = "700388531";
export const GOOGLE_ADS_ID = `AW-${GOOGLE_ADS_CONVERSION_ID}`;

/** tel: link click. GTM tag_id 5. */
export const GOOGLE_ADS_PHONE_LABEL = "sekFCNPF0ugcELOp_M0C";

/** Scheduler reported a booking. GTM tag_id 11, event appointment_confirmed. */
export const GOOGLE_ADS_BOOKING_LABEL = "Yo8FCL7U-oodELOp_M0C";

const CONVERSION_LABELS = new Set([GOOGLE_ADS_PHONE_LABEL, GOOGLE_ADS_BOOKING_LABEL]);

/** Image conversion endpoint. script=0 so the response is not the Google tag. */
export const GOOGLE_ADS_CONVERSION_ENDPOINT = `https://www.googleadservices.com/pagead/conversion/${GOOGLE_ADS_CONVERSION_ID}/`;

/**
 * First-party click-id cookies, same names the conversion linker uses:
 * gclid in _gcl_aw, wbraid in _gcl_gb, gbraid in _gcl_ag.
 *
 * Landing-page names and the conversion-pixel names are different.
 * Google's help pages name gclid, wbraid (iOS app-to-web), and gbraid
 * (iOS app deep links) on the landing URL, and the offline upload API uses
 * those same three field names. They do not document the pixel query keys.
 * Sources are listed in docs/gtm-inventory.md.
 *
 * The pixel keys come from gtag/js?id=AW-700388531, fetched 2026-10-21.
 * Its conversion hit map sends the _gcl_aw value as gclaw and the braid
 * cookies as one parameter, gclgb. wbraid and gbraid are not keys on that
 * map. wbraid alone is gclgb=<wbraid>. gbraid alone is gclgb=<gbraid>.
 * Both, with no gclid, are gclgb=<wbraid>.<gbraid>. When gclid is present,
 * that tag sends gclaw and omits gclgb. A capture the same day, aborted
 * before the request left the browser, matched those values. iPhone clicks
 * usually arrive as wbraid or gbraid without a gclid, so gclgb is the
 * parameter that attributes them.
 */
const CLICK_COOKIES = [
  { param: "gclid", name: "_gcl_aw" },
  { param: "wbraid", name: "_gcl_gb" },
  { param: "gbraid", name: "_gcl_ag" },
] as const;

const CLICK_MAX_AGE = 60 * 60 * 24 * 90;
const CLICK_VALUE = /^[A-Za-z0-9._~-]{1,200}$/;

export type StoredClickIds = {
  gclid?: string;
  wbraid?: string;
  gbraid?: string;
};

function cleanClickId(value: string | null | undefined): string {
  if (!value || !CLICK_VALUE.test(value)) return "";
  return value;
}

function clickIdsFromSearch(pageUrl: string): StoredClickIds {
  const clean = urlWithAllowedParams(pageUrl);
  if (!clean) return {};
  try {
    const params = new URL(clean).searchParams;
    return {
      gclid: cleanClickId(params.get("gclid")),
      wbraid: cleanClickId(params.get("wbraid")),
      gbraid: cleanClickId(params.get("gbraid")),
    };
  } catch {
    return {};
  }
}

/** Cookie name/value pairs for the click ids on this URL. Empty when none qualify. */
export function linkerCookieEntries(
  pageUrl: string,
  nowSeconds: number,
): { name: string; value: string }[] {
  if (!Number.isFinite(nowSeconds) || nowSeconds < 0) return [];
  const ids = clickIdsFromSearch(pageUrl);
  const entries: { name: string; value: string }[] = [];
  for (const cookie of CLICK_COOKIES) {
    const id = ids[cookie.param];
    if (!id) continue;
    entries.push({ name: cookie.name, value: `GCL.${Math.floor(nowSeconds)}.${id}` });
  }
  return entries;
}

export function clickIdsFromCookieHeader(header: string): StoredClickIds {
  const out: StoredClickIds = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const name = part.slice(0, eq).trim();
    const raw = part.slice(eq + 1).trim();
    const cookie = CLICK_COOKIES.find((item) => item.name === name);
    if (!cookie) continue;
    const match = /^GCL\.(\d+)\.(.+)$/.exec(raw);
    const id = cleanClickId(match?.[2]);
    if (!id) continue;
    out[cookie.param] = id;
  }
  return out;
}

export type AdsConversionInput = {
  label: string;
  pageUrl: string;
  referrer?: string;
  /** Milliseconds, used as the cache-busting random value. */
  nowMs?: number;
  storedClickIds?: StoredClickIds;
};

/**
 * The conversion request URL, or null when the label or the page is not one
 * we can send. Query keys are the conversion's own fields. The only place a
 * page query can appear is the url parameter, and that value has already
 * been through the allowlist.
 */
export function buildAdsConversionUrl(input: AdsConversionInput): string | null {
  if (!CONVERSION_LABELS.has(input.label)) return null;
  const page = urlWithAllowedParams(input.pageUrl);
  if (!page) return null;

  const fromPage = clickIdsFromSearch(page);
  const stored = input.storedClickIds ?? {};
  const ids: StoredClickIds = {
    gclid: fromPage.gclid || cleanClickId(stored.gclid),
    wbraid: fromPage.wbraid || cleanClickId(stored.wbraid),
    gbraid: fromPage.gbraid || cleanClickId(stored.gbraid),
  };

  const params = new URLSearchParams();
  const now = input.nowMs ?? Date.now();
  params.set("random", String(now));
  params.set("guid", "ON");
  params.set("script", "0");
  params.set("fmt", "3");
  params.set("label", input.label);
  // npa=1: do not use this hit for ad personalization.
  params.set("npa", "1");
  params.set("url", page);
  const ref = input.referrer ? referrerOrigin(input.referrer) : "";
  if (ref) params.set("ref", ref);
  if (ids.gclid) {
    params.set("gclaw", ids.gclid);
  } else {
    const braids = [ids.wbraid, ids.gbraid].filter((id) => id);
    if (braids.length) params.set("gclgb", braids.join("."));
  }
  return `${GOOGLE_ADS_CONVERSION_ENDPOINT}?${params.toString()}`;
}

/**
 * The pixel URL this transport would send, or null when it must not.
 * "gtm" is always null: GTM-PP5NDT4H is the only conversion source for
 * AW-700388531, for both the phone label and the booking label.
 */
export function adsConversionRequestUrl(
  transport: "code" | "gtm",
  input: AdsConversionInput,
): string | null {
  if (transport !== "code") return null;
  return buildAdsConversionUrl(input);
}

function writeAdsClickCookies(pageUrl: string) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const now = Math.floor(Date.now() / 1000);
  for (const cookie of linkerCookieEntries(pageUrl, now)) {
    document.cookie = `${cookie.name}=${cookie.value}; Path=/; Max-Age=${CLICK_MAX_AGE}; SameSite=Lax${secure}`;
  }
}

function deliverConversion(url: string) {
  // One GET. sendBeacon would POST, and the conversion endpoint records a GET.
  // keepalive covers a click that leaves the page.
  //
  // A gclgb hit 302s to viewthroughconversion. mode "no-cors" is not allowed
  // to set redirect "manual", so this uses "cors". The response is opaque and
  // unused. The browser does not follow that redirect, which is the
  // remarketing request. The conversion GET itself still goes out.
  try {
    void fetch(url, {
      method: "GET",
      mode: "cors",
      redirect: "manual",
      credentials: "omit",
      keepalive: true,
      cache: "no-store",
    }).catch(() => {});
    return;
  } catch {
    // fetch can throw on a rejected URL. The image follows redirects, so it
    // is only the fallback.
  }
  const img = new Image();
  img.src = url;
}

function fireAdsConversion(label: string) {
  if (typeof window === "undefined") return;
  const url = adsConversionRequestUrl(GOOGLE_ADS_TRANSPORT, {
    label,
    pageUrl: window.location.href,
    referrer: document.referrer,
    storedClickIds: clickIdsFromCookieHeader(document.cookie),
  });
  // "gtm" returns null before any cookie write or network call.
  if (!url) return;
  writeAdsClickCookies(window.location.href);
  deliverConversion(url);
}

export function trackAdsPhoneConversion() {
  fireAdsConversion(GOOGLE_ADS_PHONE_LABEL);
}

export function trackAdsBookingConversion() {
  fireAdsConversion(GOOGLE_ADS_BOOKING_LABEL);
}

export function rememberAdsClickIds() {
  if (GOOGLE_ADS_TRANSPORT !== "code") return;
  if (typeof window === "undefined") return;
  writeAdsClickCookies(window.location.href);
}
