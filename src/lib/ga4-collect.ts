/**
 * Builds one Google Analytics 4 collect hit.
 *
 * `dl` (page location) is the page origin and path, plus an allowlist of ad
 * click IDs and UTM parameters. Every other query parameter is dropped, and
 * the hash is never sent — anything else could carry patient information.
 * A value has to match a strict character set. A utm_* value that looks like
 * an email or contains a run of 7 or more digits is dropped as well. Click
 * IDs and gad_campaignid are not held to that digit rule: they are
 * base64url-like, or a numeric Ads campaign id. `dr` (referrer) stays origin
 * and path only. The only event parameters copied across are location,
 * label, and page_path.
 */

export const GA_MEASUREMENT_ID = "G-27RHPSC41Y";

/** Cookie `_ga_<id>` uses the measurement id with the `G-` prefix removed. */
export const GA_SESSION_COOKIE = "_ga_27RHPSC41Y";

export const GA_COLLECT_URL = "https://www.google-analytics.com/g/collect";

const SESSION_TIMEOUT_SECONDS = 30 * 60;

export type Ga4EventName =
  | "page_view"
  | "appointment_request_click"
  | "phone_click"
  | "appointment_confirmed";

const EVENT_NAMES = new Set<Ga4EventName>([
  "page_view",
  "appointment_request_click",
  "phone_click",
  "appointment_confirmed",
]);

export type CollectInput = {
  measurementId: string;
  clientId: string;
  sessionId: string;
  sessionNumber: number;
  sessionEngaged: boolean;
  hitNumber: number;
  pageId: number;
  eventName: Ga4EventName;
  /**
   * Absolute page URL. Allowlisted ad click IDs and UTM parameters are kept
   * on `dl`. Every other query parameter and the hash are dropped.
   */
  pageLocation: string;
  pageReferrer?: string;
  pageTitle?: string;
  language?: string;
  screen?: string;
  firstVisit?: boolean;
  sessionStart?: boolean;
  engagementTimeMsec?: number;
  location?: string;
  label?: string;
};

/** Pathname only: no origin, no query string, no hash. */
export function pagePathOnly(pathname: string): string {
  const cut = (pathname || "/").split("?")[0]?.split("#")[0] ?? "/";
  const path = cut.startsWith("/") ? cut : `/${cut}`;
  return (path || "/").slice(0, 100);
}

/** Origin plus pathname. An unparseable or non-http value becomes "". */
export function urlWithoutSearch(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return url.origin + pagePathOnly(url.pathname);
  } catch {
    return "";
  }
}

/** Scheme and host only. An unparseable or non-http value becomes "". */
export function referrerOrigin(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return url.origin;
  } catch {
    return "";
  }
}

/** Query params allowed on dl. Everything else is dropped (could carry PHI). */
const ALLOWED_QUERY_PARAMS = new Set([
  "gclid",
  "gbraid",
  "wbraid",
  "gad_source",
  "gad_campaignid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
]);

/**
 * Unreserved characters only, so an email, a space, or phone punctuation
 * cannot ride along. `~` is in the set; URLSearchParams serializes it as %7E.
 */
const ALLOWED_VALUE = /^[A-Za-z0-9._~\-]{1,200}$/;

/**
 * utm_* values that look like an email or a long digit run (a phone, an MRN,
 * a date of birth written as digits). Not applied to click IDs: a gclid is
 * base64url-like and can contain a 7-digit run that is not patient data.
 */
const UTM_PHI_VALUE = /@|\d{7,}/;

/** Origin + path + only allowlisted params. Never the hash. */
export function urlWithAllowedParams(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    const base = url.origin + pagePathOnly(url.pathname);
    const kept = new URLSearchParams();
    for (const [key, val] of url.searchParams) {
      const k = key.toLowerCase();
      if (!ALLOWED_QUERY_PARAMS.has(k)) continue;
      if (!ALLOWED_VALUE.test(val)) continue;
      if (k.startsWith("utm_") && UTM_PHI_VALUE.test(val)) continue;
      if (kept.has(k)) continue;
      kept.set(k, val);
    }
    const qs = kept.toString();
    return qs ? `${base}?${qs}` : base;
  } catch {
    return "";
  }
}

/**
 * Button text and control names. Drops anything that could carry an address,
 * an email, or a query string — those are not labels we meant to measure.
 */
export function safeEventParam(value: string, max = 80): string {
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, max);
  if (!cleaned || /[@?#]|:\/\//.test(cleaned)) return "";
  return cleaned;
}

export function safePageTitle(title: string): string {
  const cleaned = title.replace(/\s+/g, " ").trim().slice(0, 100);
  if (!cleaned || /[@?#]|:\/\//.test(cleaned)) return "";
  return cleaned;
}

export function parseClientId(cookie: string | null): string | null {
  if (!cookie) return null;
  const match = /^GA1\.1\.(\d+\.\d+)$/.exec(cookie);
  return match ? match[1] : null;
}

export type GaSession = {
  sid: string;
  sct: number;
  engaged: boolean;
  last: number;
};

export function parseSession(cookie: string | null): GaSession | null {
  if (!cookie) return null;
  const match = /^GS1\.1\.(\d+)\.(\d+)\.([01])\.(\d+)\.0\.0\.0$/.exec(cookie);
  if (!match) return null;
  return {
    sid: match[1],
    sct: Number(match[2]),
    engaged: match[3] === "1",
    last: Number(match[4]),
  };
}

export function sessionCookieValue(session: GaSession): string {
  return `GS1.1.${session.sid}.${session.sct}.${session.engaged ? 1 : 0}.${session.last}.0.0.0`;
}

export function sessionIsExpired(session: GaSession, nowSeconds: number): boolean {
  return nowSeconds - session.last > SESSION_TIMEOUT_SECONDS;
}

/**
 * The query string for one collect hit, or null when the input cannot be
 * sent without guessing. Null is how a bad client id or a non-http page
 * location is dropped.
 */
export function buildCollectQuery(input: CollectInput): string | null {
  if (input.measurementId !== GA_MEASUREMENT_ID) return null;
  if (!EVENT_NAMES.has(input.eventName)) return null;
  if (!/^\d+\.\d+$/.test(input.clientId)) return null;
  if (!/^\d+$/.test(input.sessionId)) return null;
  if (!Number.isInteger(input.sessionNumber) || input.sessionNumber < 1) return null;
  if (!Number.isInteger(input.hitNumber) || input.hitNumber < 1) return null;

  const pageLocation = urlWithAllowedParams(input.pageLocation);
  if (!pageLocation) return null;
  const path = pagePathOnly(new URL(pageLocation).pathname);

  const query = new URLSearchParams();
  query.set("v", "2");
  query.set("tid", GA_MEASUREMENT_ID);
  query.set("_p", String(input.pageId));
  query.set("cid", input.clientId);
  query.set("en", input.eventName);
  query.set("dl", pageLocation);
  query.set("ep.page_path", path);
  query.set("sid", input.sessionId);
  query.set("sct", String(input.sessionNumber));
  query.set("seg", input.sessionEngaged ? "1" : "0");
  query.set("_s", String(input.hitNumber));
  query.set("_et", String(input.engagementTimeMsec && input.engagementTimeMsec > 0 ? input.engagementTimeMsec : 1));
  if (input.sessionStart) query.set("_ss", "1");
  if (input.firstVisit) query.set("_fv", "1");

  const language = (input.language ?? "").replace(/[^a-zA-Z-]/g, "").slice(0, 20);
  if (language) query.set("ul", language.toLowerCase());
  const screen = (input.screen ?? "").match(/^\d{1,5}x\d{1,5}$/)?.[0];
  if (screen) query.set("sr", screen);

  const title = input.pageTitle ? safePageTitle(input.pageTitle) : "";
  if (title) query.set("dt", title);

  const referrer = input.pageReferrer ? urlWithoutSearch(input.pageReferrer) : "";
  if (referrer) query.set("dr", referrer);

  const location = input.location ? safeEventParam(input.location) : "";
  if (location) query.set("ep.location", location);
  const label = input.label ? safeEventParam(input.label) : "";
  if (label) query.set("ep.label", label);

  return query.toString();
}
