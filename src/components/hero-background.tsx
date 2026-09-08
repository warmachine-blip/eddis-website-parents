"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

/**
 * Hero backdrop. The poster image is always rendered, and the 3.4 MB video is
 * only mounted on wide, motion-tolerant viewports — phones previously downloaded
 * the whole file (it was 3,460 KB of the homepage's 3,540 KB of media) to show a
 * clip that is 75% cropped away at 390px. Reduced-motion visitors used to get a
 * blank navy rectangle because the poster lived on the hidden <video>.
 */
const VIDEO_QUERY =
  "(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(VIDEO_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function HeroBackground() {
  const playVideo = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(VIDEO_QUERY).matches,
    () => false,
  );

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src="/videos/hero-clinic-hallway-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {playVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero-clinic-hallway.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/50 to-navy-deep/20" />
    </div>
  );
}
