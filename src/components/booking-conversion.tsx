"use client";

import { useEffect } from "react";
import { BOOKING_CONVERSION_EVENT } from "@/lib/analytics";
import { scheduling } from "@/lib/scheduling";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Fires the booking conversion when the embedded Nimblr scheduler reports a
 * completed booking.
 *
 * Nimblr posts a message up to the parent page when a patient finishes, shaped
 * like { i: "...", a: "scheduled", c: "..." }. Only `a` is read. Nothing from
 * the message, and nothing about the patient, goes into the dataLayer push —
 * the push carries the event name and nothing else — and nothing is logged.
 *
 * This replaces a push that ran on /appointment-confirmed simply because the
 * page had been viewed. That page is reachable without booking anything: the
 * legacy /thank-you URLs on both old domains redirect to it, so anyone
 * following an old link counted as a conversion. Listening for the scheduler's
 * own completion message ties the conversion to a real booking.
 *
 * The origin check is exact rather than a suffix match: a suffix test would
 * also accept a lookalike host ending in the same string.
 */
export default function BookingConversion() {
  useEffect(() => {
    let fired = false;

    function onMessage(event: MessageEvent) {
      if (event.origin !== scheduling.messageOrigin) return;

      // Nimblr has sent this as an object and as a JSON string; accept both,
      // and ignore anything that is neither.
      let payload: unknown = event.data;
      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }
      if (typeof payload !== "object" || payload === null) return;
      if ((payload as { a?: unknown }).a !== "scheduled") return;

      // Once per page, however many times the scheduler repeats itself.
      if (fired) return;
      fired = true;

      const dataLayer = (window.dataLayer = window.dataLayer || []);
      dataLayer.push({ event: BOOKING_CONVERSION_EVENT });
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
