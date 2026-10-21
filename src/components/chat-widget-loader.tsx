"use client";

import { useEffect } from "react";
import { installChatUrlGuard } from "@/lib/chat-url-guard";

/**
 * Loads the LeadConnector widget after the page load event, and not before
 * the URL guard is in place.
 *
 * The loader used to be a next/script tag with strategy="lazyOnload". That
 * waits for the load event so the bubble stays out of LCP and TBT, which
 * matters on a paid landing page. The same wait is kept here. The difference
 * is ordering: the guard patches fetch and sendBeacon before this script
 * exists. It does not rewrite the address bar. GTM and the Google tags keep
 * reading the real page URL, including the query string. Only requests to
 * msgsndr.com and leadconnectorhq.com are sanitized.
 */

const LOADER_SRC = "https://widgets.leadconnectorhq.com/loader.js";
const RESOURCES_URL = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
const WIDGET_ID = "66840b4e178c31f522476378";
const SCRIPT_ID = "leadconnector-chat";

function injectLoader() {
  if (document.getElementById(SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = LOADER_SRC;
  script.async = true;
  script.referrerPolicy = "origin";
  script.setAttribute("data-resources-url", RESOURCES_URL);
  script.setAttribute("data-widget-id", WIDGET_ID);
  document.body.appendChild(script);
}

export default function ChatWidgetLoader() {
  useEffect(() => {
    installChatUrlGuard();
    let cancelled = false;
    const load = () => {
      if (!cancelled) injectLoader();
    };
    if (document.readyState === "complete") {
      load();
      return;
    }
    window.addEventListener("load", load, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", load);
    };
  }, []);

  return null;
}
