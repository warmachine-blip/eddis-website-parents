"use client";

import { useEffect, useRef } from "react";
import { APPOINTMENT_REQUEST_CLICK_EVENT, pushClickEvent } from "@/lib/analytics";

/**
 * The Nimblr booking iframe, plus a one-time click signal.
 *
 * Clicks inside the cross-origin frame never reach this page, and nothing the
 * patient types in there is readable from here. Focusing the frame (a click or
 * a tab into it) blurs this window and leaves the iframe as document.activeElement.
 * That is the whole signal: one appointment_request_click, with a fixed label.
 */
export default function NimblrFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let fired = false;

    function onBlur() {
      if (fired) return;
      if (document.activeElement !== ref.current) return;
      fired = true;
      pushClickEvent(APPOINTMENT_REQUEST_CLICK_EVENT, {
        location: "nimblr-scheduler",
        label: "Nimblr scheduler",
      });
    }

    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, []);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      width="100%"
      height="560"
      className="block min-h-[560px] w-full border-0"
    />
  );
}
