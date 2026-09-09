"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

/**
 * Hero backdrop: poster image first, video layered over it once the browser is idle.
 *
 * One 636 KB file serves every viewport. The original was 3.4 MB at the same
 * 1280x720 — it was simply encoded at 2,303 kb/s against this one's 421 kb/s —
 * so the large file bought no extra resolution anywhere and was dropped.
 *
 * The video mounts only after load + idle, so its bytes never contend with the
 * poster, which is the hero's LCP candidate. Reduced-motion visitors keep the
 * poster and fetch no video at all.
 *
 * The poster image is the video's own frame 0 and sits directly beneath the
 * video in the same container, so nothing shifts when the video takes over and
 * the <video> needs no `poster` attribute of its own — that only re-downloaded
 * the same frame unoptimized.
 */
const POSTER = "/videos/hero-clinic-hallway-poster.jpg";
const VIDEO = "/videos/hero-clinic-hallway-720.mp4";
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

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
  const motion = window.matchMedia(MOTION_OK);
  motion.addEventListener("change", onChange);
  idleListeners.add(onChange);
  return () => {
    motion.removeEventListener("change", onChange);
    idleListeners.delete(onChange);
  };
}

export default function HeroBackground() {
  const playVideo = useSyncExternalStore(
    subscribe,
    () => isIdle && window.matchMedia(MOTION_OK).matches,
    () => false,
  );

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image src={POSTER} alt="" fill priority sizes="100vw" className="object-cover max-md:object-[25%_50%]" />
      {playVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover max-md:object-[25%_50%]"
        >
          <source src={VIDEO} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/50 to-navy-deep/20" />
    </div>
  );
}
