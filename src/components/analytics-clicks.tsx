"use client";

import { useEffect } from "react";
import { pushClickEvent } from "@/lib/analytics";
import { classifyTrackedClick } from "@/lib/click-tracking";
import { isAdsTelClick, trackAdsPhoneConversion } from "@/lib/google-ads";
import { practice } from "@/lib/nav";

/**
 * One listener for every booking and phone link on the site.
 *
 * Capture phase, so the event is recorded before a client navigation unmounts
 * the page. The payload is the event name, which control was clicked
 * (data-analytics-location, or header / footer / content), the control's own
 * text, and the pathname. No href, no query string, no form fields.
 */
function locationFor(anchor: HTMLAnchorElement): string {
  const marked = anchor.closest("[data-analytics-location]");
  const value = marked?.getAttribute("data-analytics-location")?.trim();
  if (value) return value;
  if (anchor.closest("header")) return "header";
  if (anchor.closest("footer")) return "footer";
  if (anchor.closest("#schedule")) return "schedule";
  return "content";
}

function labelFor(anchor: HTMLAnchorElement): string {
  const explicit = anchor.getAttribute("data-analytics-label")?.trim();
  if (explicit) return explicit;
  const text = (anchor.innerText || "").replace(/\s+/g, " ").trim();
  if (text && text.length <= 80) return text;
  const aria = anchor.getAttribute("aria-label")?.replace(/\s+/g, " ").trim();
  if (aria) return aria;
  return text || "unlabeled";
}

export default function AnalyticsClicks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.button !== 0 && event.button !== 1) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      // The Ads phone conversion matches GTM: any tel: link, including 911.
      // GA4 phone_click stays practice-number only, via classifyTrackedClick.
      if (isAdsTelClick(href) || isAdsTelClick(anchor.href)) {
        trackAdsPhoneConversion();
      }

      const kind = classifyTrackedClick(href, window.location.href, practice.phoneHref);
      if (!kind) return;

      pushClickEvent(kind, {
        location: locationFor(anchor),
        label: labelFor(anchor),
      });
    }

    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}
