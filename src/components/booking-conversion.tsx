"use client";

import { useEffect } from "react";
import { BOOKING_CONVERSION_EVENT } from "@/lib/analytics";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Pushes the booking conversion event once /appointment-confirmed is shown.
 *
 * Nimblr sends the patient here as a full page load, so a GTM Page View
 * trigger on the path would also work — but an explicit event keeps the Ads
 * conversion trigger tied to the booking itself rather than to a URL string,
 * and it still fires if someone reaches the page by client-side navigation.
 *
 * The guard makes the push idempotent: React Strict Mode runs effects twice in
 * development, and a double push would be a double conversion.
 */
export default function BookingConversion() {
  useEffect(() => {
    const dataLayer = (window.dataLayer = window.dataLayer || []);
    if (dataLayer.some((entry) => entry?.event === BOOKING_CONVERSION_EVENT)) return;
    dataLayer.push({ event: BOOKING_CONVERSION_EVENT });
  }, []);

  return null;
}
