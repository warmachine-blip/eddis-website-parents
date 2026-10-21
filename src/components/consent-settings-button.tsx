"use client";

import { CONSENT_BANNER_TEXT, requestConsentSettings } from "@/lib/consent";

/** Opens the cookie notice again. The label lives in CONSENT_BANNER_TEXT. */
export default function ConsentSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={`cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-light ${className ?? ""}`}
      onClick={() => requestConsentSettings()}
    >
      {CONSENT_BANNER_TEXT.settings}
    </button>
  );
}
