"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { preload } from "react-dom";

/**
 * Hero backdrop. The poster is frame 0 of the clinic hallway video (1600x900,
 * about 97 KB) and is the element that should paint first, including on mobile.
 * preload() runs during render so the poster link is in the document head.
 * The video file is attached only after load and idle, and only when the
 * visitor has not asked for reduced motion.
 */
export const HERO_POSTER = "/videos/hero-clinic-hallway-poster.jpg";
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
  preload(HERO_POSTER, { as: "image", fetchPriority: "high" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const playVideo = useSyncExternalStore(
    subscribe,
    () => isIdle && window.matchMedia(MOTION_OK).matches,
    () => false,
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playVideo) return;
    video.play().catch(() => {});
  }, [playVideo]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <video
        ref={videoRef}
        poster={HERO_POSTER}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover max-md:object-[25%_50%]"
      >
        {playVideo ? <source src={VIDEO} type="video/mp4" /> : null}
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/50 to-navy-deep/20" />
    </div>
  );
}
