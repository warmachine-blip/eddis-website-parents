"use client";

import { useEffect } from "react";
import { rememberAdsClickIds } from "@/lib/google-ads";

/**
 * Stores an allowlisted ad click id in the first-party conversion cookie
 * as soon as the page is interactive, so a later page can still attribute
 * the call or the booking. No request is sent here.
 */
export default function GoogleAdsLinker() {
  useEffect(() => {
    rememberAdsClickIds();
  }, []);
  return null;
}
