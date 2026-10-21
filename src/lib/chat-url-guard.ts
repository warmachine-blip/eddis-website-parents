/**
 * Keeps the chat widget from reading a raw page URL.
 *
 * Installed once, before the loader script is inserted. Two layers:
 *
 * 1. The address bar is rewritten to the allowlisted query. `pushState` and
 *    `replaceState` go through the same rewrite, so a client-side navigation
 *    cannot put a dropped parameter back, and the widget's later read of
 *    `document.location.href` (it does this again when the form is submitted)
 *    sees the reduced URL. A plain section hash is preserved.
 *
 * 2. `fetch` and `sendBeacon` to msgsndr.com / leadconnectorhq.com have their
 *    JSON bodies rewritten. That catches the hash we left on the address bar,
 *    a referrer that still has a query string, and query params the vendor
 *    script merges back in from a session it stored earlier.
 */

import {
  CHAT_REFERRER_POLICY,
  addressBarHref,
  historyUrl,
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

function wrapHistory() {
  const origPush = history.pushState.bind(history);
  const origReplace = history.replaceState.bind(history);
  const clean = (url?: string | URL | null) => {
    if (url == null || url === "") return url;
    const next = historyUrl(url, window.location.href);
    return next == null ? url : next;
  };
  history.pushState = (data, unused, url) => {
    origPush(data, unused, clean(url));
  };
  history.replaceState = (data, unused, url) => {
    origReplace(data, unused, clean(url));
  };

  const rewriteCurrent = () => {
    const next = addressBarHref(window.location.href);
    if (!next) return;
    origReplace(history.state, "", next);
  };
  window.addEventListener("hashchange", rewriteCurrent);
  window.addEventListener("popstate", rewriteCurrent);
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

function rewriteAddressBar() {
  const next = addressBarHref(window.location.href);
  if (!next) return;
  history.replaceState(history.state, "", next);
}

/** Idempotent. Safe to call again after a client navigation. */
export function installChatUrlGuard(): void {
  if (typeof window === "undefined") return;
  const guarded = window as GuardedWindow;
  if (!guarded[GUARD_FLAG]) {
    guarded[GUARD_FLAG] = true;
    wrapHistory();
    wrapFetch();
    wrapBeacon();
  }
  rewriteAddressBar();
}
