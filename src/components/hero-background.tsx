"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

/**
 * Hero backdrop: poster image first, video layered over it once the client knows
 * which file to fetch.
 *
 * The video mounts only after hydration (the server render is poster-only), so it
 * never competes with LCP. Phones get a 636 KB 720p re-encode instead of the
 * 3.4 MB original — both files are 1280x720, the original is simply encoded at
 * 2,303 kb/s against the re-encode's 421 kb/s. Reduced-motion visitors keep the
 * poster and fetch no video at all.
 */
const POSTER = "/videos/hero-clinic-hallway-poster.jpg";
const VIDEO_FULL = "/videos/hero-clinic-hallway.mp4";
const VIDEO_LITE = "/videos/hero-clinic-hallway-720.mp4";

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** The heavy file goes to real desktops only — landscape phones are wide but short. */
const FULL_FILE = "(min-width: 768px) and (min-height: 600px)";

type Variant = "full" | "lite" | null;

function readVariant(): Variant {
  if (!window.matchMedia(MOTION_OK).matches) return null;
  return window.matchMedia(FULL_FILE).matches ? "full" : "lite";
}

/**
 * The video waits for load + idle before it mounts, so its bytes never contend
 * with the poster image for bandwidth — the poster is the hero's LCP candidate.
 */
let isIdle = false;
const idleListeners = new Set<() => void>();

function markIdle() {
  if (isIdle) return;
  isIdle = true;
  for (const listener of idleListeners) listener();
}

if (typeof window !== "undefined") {
  const waitForIdle = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(markIdle, { timeout: 3000 });
    } else {
      window.setTimeout(markIdle, 1500);
    }
  };
  if (document.readyState === "complete") waitForIdle();
  else window.addEventListener("load", waitForIdle, { once: true });
}

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(MOTION_OK), window.matchMedia(FULL_FILE)];
  for (const q of queries) q.addEventListener("change", onChange);
  idleListeners.add(onChange);
  return () => {
    for (const q of queries) q.removeEventListener("change", onChange);
    idleListeners.delete(onChange);
  };
}

export default function HeroBackground() {
  const variant = useSyncExternalStore(
    subscribe,
    () => (isIdle ? readVariant() : null),
    () => null,
  );

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image src={POSTER} alt="" fill priority sizes="100vw" className="object-cover" />
      {variant && (
        // key forces a remount (and a new <source>) if the breakpoint is crossed.
        <video
          key={variant}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={variant === "full" ? VIDEO_FULL : VIDEO_LITE} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/50 to-navy-deep/20" />
    </div>
  );
}
