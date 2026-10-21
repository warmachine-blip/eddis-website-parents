/**
 * Page URL handed to the LeadConnector chat widget.
 *
 * The widget does not take a page URL in its config. Its attribution script
 * (`user-session.js`) reads `document.location.href` and `document.referrer`,
 * then POSTs them to services.msgsndr.com. The same page object is copied onto
 * the chat form when someone sends a message. Both have to go through the same
 * allowlist GA4 uses (`urlWithAllowedParams`): gclid, gbraid, wbraid,
 * gad_source, gad_campaignid, and utm_* stay, every other query parameter is
 * dropped, and the hash is never included.
 *
 * The address bar is not rewritten. Google Tag Manager and the Google tags
 * read `window.location` themselves, and a replaceState here would change the
 * page URL those tags send. Sanitizing happens only on the way out, and only
 * for msgsndr.com and leadconnectorhq.com.
 */

import { urlWithAllowedParams, urlWithoutSearch } from "./ga4-collect.ts";

/**
 * Referrer-Policy on a request to the chat vendor. Origin only, so the header
 * carries the site name and not the path, query, or hash. Applied per request.
 * There is no document-wide policy: that would also cover Google.
 */
export const CHAT_REFERRER_POLICY = "origin";

export function isChatVendorHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.+$/, "");
  return (
    host === "msgsndr.com" ||
    host.endsWith(".msgsndr.com") ||
    host === "leadconnectorhq.com" ||
    host.endsWith(".leadconnectorhq.com")
  );
}

export function isChatVendorUrl(value: string, base?: string): boolean {
  try {
    const url = base ? new URL(value, base) : new URL(value);
    return isChatVendorHost(url.hostname);
  } catch {
    return false;
  }
}

/** Referrer copied into a chat payload: origin and path only. */
export function referrerForChat(value: string): string {
  if (!value) return value;
  const stripped = urlWithoutSearch(value);
  if (stripped) return stripped;
  if (/[?#]/.test(value)) return "";
  return value;
}

function queryObject(pageUrl: string): Record<string, string> {
  if (!pageUrl) return {};
  try {
    const out: Record<string, string> = {};
    for (const [key, val] of new URL(pageUrl).searchParams) {
      if (!(key in out)) out[key] = val;
    }
    return out;
  } catch {
    return {};
  }
}

function pageUrlForChat(value: string): string {
  return urlWithAllowedParams(value) || urlWithoutSearch(value);
}

function keywordAllowed(pageUrl: string, keyword: unknown): unknown {
  if (typeof keyword !== "string") return keyword;
  if (!keyword || !pageUrl) return "";
  try {
    const params = new URL(pageUrl).searchParams;
    const term = params.get("utm_term") ?? "";
    const content = params.get("utm_content") ?? "";
    if (keyword === term || keyword === content) return keyword;
  } catch {
    return "";
  }
  return "";
}

function campaignAllowed(pageUrl: string, campaign: unknown): unknown {
  if (typeof campaign !== "string") return campaign;
  if (!pageUrl) return "";
  try {
    return new URL(pageUrl).searchParams.get("utm_campaign") ?? "";
  } catch {
    return "";
  }
}

function isVisit(value: Record<string, unknown>): boolean {
  if ("url_params" in value || "adSource" in value) return true;
  const page = value.page;
  return !!page && typeof page === "object";
}

function walk(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(walk);
  if (!value || typeof value !== "object") return value;
  const obj = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(obj)) {
    if ((key === "referrer" || key === "initialReferrer") && typeof child === "string") {
      out[key] = referrerForChat(child);
      continue;
    }
    out[key] = walk(child);
  }
  if (!isVisit(out)) return out;

  let pageUrl = "";
  const page = out.page;
  if (page && typeof page === "object") {
    const record = page as Record<string, unknown>;
    if (typeof record.url === "string") {
      pageUrl = pageUrlForChat(record.url);
      record.url = pageUrl;
    }
  }
  if ("url_params" in obj) out.url_params = queryObject(pageUrl);
  if ("keyword" in out) out.keyword = keywordAllowed(pageUrl, out.keyword);
  if ("campaign" in out) out.campaign = campaignAllowed(pageUrl, out.campaign);
  return out;
}

/**
 * JSON body of a request to the chat vendor. Not JSON, or a body with nothing
 * to rewrite, is returned unchanged. Contact fields (name, phone, email,
 * message) are left as the visitor typed them. Only the page URL, the copied
 * query map, the referrer, and the keyword/campaign derived from that URL
 * are rewritten.
 */
export function sanitizeChatPayload(body: string): string {
  if (!body) return body;
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return body;
  }
  if (!parsed || typeof parsed !== "object") return body;
  return JSON.stringify(walk(parsed));
}

/** Query values on a chat-vendor request URL that are themselves page URLs. */
export function sanitizeChatRequestUrl(value: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return value;
  }
  if (!isChatVendorHost(url.hostname)) return value;
  let changed = false;
  if (url.hash) {
    url.hash = "";
    changed = true;
  }
  const updates: [string, string][] = [];
  for (const [key, val] of url.searchParams) {
    if (!/^https?:\/\//i.test(val)) continue;
    const next = pageUrlForChat(val);
    if (next && next !== val) updates.push([key, next]);
  }
  for (const [key, val] of updates) {
    url.searchParams.set(key, val);
    changed = true;
  }
  return changed ? url.toString() : value;
}
