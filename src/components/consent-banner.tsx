"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  CONSENT_BANNER_TEXT,
  CONSENT_OPEN_EVENT,
  GPC_DENIES_ADS,
  applyConsentChoice,
  readBrowserConsent,
  type ConsentChoice,
} from "@/lib/consent";

type Panel = "pending" | "hidden" | "banner" | "settings";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-light";

/**
 * Non-modal notice. The page stays usable, including the mobile booking bar,
 * which this sits above (see .consent-banner in globals.css). Choice is
 * stored by applyConsentChoice. The default itself was already set in <head>.
 */
export default function ConsentBanner() {
  const [panel, setPanel] = useState<Panel>("pending");
  const [gpc, setGpc] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [spacer, setSpacer] = useState(0);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const text = CONSENT_BANNER_TEXT;

  useEffect(() => {
    const refresh = (openSettings: boolean) => {
      const resolved = readBrowserConsent();
      setGpc(resolved.globalPrivacyControl);
      setCanClose(resolved.choice !== null || (GPC_DENIES_ADS && resolved.globalPrivacyControl));
      if (openSettings) {
        setPanel("settings");
        return;
      }
      setPanel((current) => (current === "settings" ? current : resolved.showBanner ? "banner" : "hidden"));
    };

    refresh(window.__htxConsentQueued === true);
    window.__htxConsentQueued = false;

    const onOpen = () => {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      window.__htxConsentQueued = false;
      refresh(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (panel === "settings") panelRef.current?.focus();
  }, [panel]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el || (panel !== "banner" && panel !== "settings")) return;
    const measure = () => setSpacer(el.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [panel, gpc, canClose]);

  useEffect(() => {
    if ((panel !== "banner" && panel !== "settings") || !canClose) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setPanel("hidden");
      returnFocus.current?.focus();
      returnFocus.current = null;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel, canClose]);

  if (panel !== "banner" && panel !== "settings") return null;

  function choose(choice: ConsentChoice) {
    applyConsentChoice(choice);
    setCanClose(true);
    setPanel("hidden");
    returnFocus.current?.focus();
    returnFocus.current = null;
  }

  function close() {
    setPanel("hidden");
    returnFocus.current?.focus();
    returnFocus.current = null;
  }

  return (
    <>
      <div aria-hidden="true" className={spacer ? undefined : "h-36"} style={spacer ? { height: spacer } : undefined} />
      <div
        ref={panelRef}
        id="cookie-notice"
        role="region"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="consent-banner fixed inset-x-0 bottom-0 z-30 border-t border-brass/50 bg-navy text-off-white shadow-[0_-12px_40px_rgba(15,26,46,0.25)]"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 pr-20 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 sm:pr-24 lg:px-10 lg:pr-28">
          <div className="min-w-0" aria-live="polite">
            <p id={titleId} className="font-serif text-xl leading-tight text-off-white">
              {text.heading}
            </p>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-off-white/85">{text.body}</p>
            {gpc && GPC_DENIES_ADS ? (
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-brass-light">{text.gpc}</p>
            ) : null}
          </div>
          <div className="flex flex-none flex-wrap items-center gap-2">
            <a
              href={text.privacyHref}
              className={`inline-flex min-h-11 items-center px-1 text-sm text-brass-light underline underline-offset-2 ${focusRing}`}
            >
              {text.privacyLabel}
            </a>
            <button
              type="button"
              onClick={() => choose("reject")}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border border-off-white/40 px-5 text-sm font-semibold text-off-white hover:border-off-white ${focusRing}`}
            >
              {text.reject}
            </button>
            <button
              type="button"
              onClick={() => choose("accept")}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-full bg-brass px-5 text-sm font-semibold text-navy-deep hover:bg-brass-light ${focusRing}`}
            >
              {text.accept}
            </button>
            {canClose ? (
              <button
                type="button"
                onClick={close}
                className={`inline-flex min-h-11 cursor-pointer items-center px-2 text-sm text-off-white/80 underline underline-offset-2 ${focusRing}`}
              >
                {text.close}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
