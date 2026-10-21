/**
 * Keeps a raw page URL out of LeadConnector without changing what Google sees.
 *
 * The address bar is left alone. GTM and the Google tags read
 * `window.location` on their own schedule, including after a client
 * navigation, so `history.replaceState` is not used.
 *
 * `fetch` and `sendBeacon` are patched once, and only when the destination
 * host is msgsndr.com or leadconnectorhq.com (or a subdomain of either).
 * Those calls get a sanitized URL, a sanitized JSON body, and
 * `referrerPolicy: "origin"`. Every other host, including Google, is passed
 * through to the original function with the original arguments.
 */

import {
  CHAT_REFERRER_POLICY,
  isChatVendorUrl,
  sanitizeChatPayload,
  sanitizeChatRequestUrl,
} from "./chat-page-url.ts";

const GUARD_FLAG = "__htxChatUrlGuard";

type GuardedWindow = Window & { [GUARD_FLAG]?: true };

function absolute(value: string): string {
  try {
    return new URL(value, window.location.href).href;
  } catch {
    return value;
  }
}

function requestHref(input: RequestInfo | URL): string | null {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  if (typeof Request !== "undefined" && input instanceof Request) return input.url;
  return null;
}

function wrapFetch() {
  const orig = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const href = requestHref(input);
    if (!href || !isChatVendorUrl(href, window.location.href)) return orig(input, init);

    const safeUrl = sanitizeChatRequestUrl(absolute(href));
    const nextInit: RequestInit = { ...init, referrerPolicy: CHAT_REFERRER_POLICY };
    if (typeof nextInit.body === "string") {
      nextInit.body = sanitizeChatPayload(nextInit.body);
    }

    if (typeof input === "string" || input instanceof URL) {
      return orig(safeUrl, nextInit);
    }

    const request = input;
    const method = (init?.method ?? request.method).toUpperCase();
    const send = async () => {
      let body = nextInit.body;
      if (body == null && method !== "GET" && method !== "HEAD") {
        try {
          const text = await request.clone().text();
          if (text) body = sanitizeChatPayload(text);
        } catch {
          body = undefined;
        }
      }
      return orig(
        new Request(safeUrl, {
          method,
          headers: new Headers(init?.headers ?? request.headers),
          body: method === "GET" || method === "HEAD" ? undefined : body,
          referrerPolicy: CHAT_REFERRER_POLICY,
          credentials: init?.credentials ?? request.credentials,
          mode: init?.mode ?? request.mode,
          cache: init?.cache ?? request.cache,
          redirect: init?.redirect ?? request.redirect,
          integrity: init?.integrity ?? request.integrity,
          keepalive: init?.keepalive ?? request.keepalive,
          signal: init?.signal ?? request.signal,
        }),
      );
    };
    return send();
  };
}

function wrapBeacon() {
  if (typeof navigator.sendBeacon !== "function") return;
  const orig = navigator.sendBeacon.bind(navigator);
  navigator.sendBeacon = (url: string | URL, data?: BodyInit | null) => {
    const href = typeof url === "string" ? url : url.href;
    if (!isChatVendorUrl(href, window.location.href)) return orig(url, data);
    const safeUrl = sanitizeChatRequestUrl(absolute(href));
    const body = typeof data === "string" ? sanitizeChatPayload(data) : data;
    return orig(safeUrl, body);
  };
}

/** Idempotent. Does not touch history or the address bar. */
export function installChatUrlGuard(): void {
  if (typeof window === "undefined") return;
  const guarded = window as GuardedWindow;
  if (guarded[GUARD_FLAG]) return;
  guarded[GUARD_FLAG] = true;
  wrapFetch();
  wrapBeacon();
}
