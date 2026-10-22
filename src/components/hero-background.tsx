"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { preload } from "react-dom";

/**
 * Hero backdrop. The still is frame 0 of the clinic hallway video (1600x900,
 * about 97 KB) and is the layer that paints first, including on mobile.
 * preload() runs during render so that link is in the document head. The image
 * is unoptimized so the link and the <img> are the same URL.
 *
 * The still sits under the video on its own. iOS Safari clears a <video poster>
 * as soon as a source is attached, before any frame is decoded, which left only
 * the navy gradient. The video is attached after window load (immediately when
 * the document is already complete) and only when the visitor has not asked for
 * reduced motion. There is no idle wait: Safari has no requestIdleCallback, and
 * the old fallback held the hero on that gradient for 1.5s. The video stays
 * transparent until a frame is actually playing, then fades in. If playback
 * never starts, the still stays.
 */
export const HERO_POSTER = "/videos/hero-clinic-hallway-poster.jpg";
const VIDEO = "/videos/hero-clinic-hallway-720.mp4";
const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const CROP = "object-cover max-md:object-[25%_50%]";

let afterWindowLoad = false;
const loadListeners = new Set<() => void>();

function markAfterWindowLoad() {
  if (afterWindowLoad) return;
  afterWindowLoad = true;
  for (const listener of loadListeners) listener();
}

if (typeof window !== "undefined") {
  if (document.readyState === "complete") markAfterWindowLoad();
  else window.addEventListener("load", markAfterWindowLoad, { once: true });
}

function subscribe(onChange: () => void) {
  const motion = window.matchMedia(MOTION_OK);
  motion.addEventListener("change", onChange);
  loadListeners.add(onChange);
  return () => {
    motion.removeEventListener("change", onChange);
    loadListeners.delete(onChange);
  };
}

function loadVideoSnapshot() {
  return afterWindowLoad && window.matchMedia(MOTION_OK).matches;
}

const DEFAULT_HERO_ALT =
  "Clinic hallway with glass doors, wood-look flooring, and recessed ceiling lights.";

export default function HeroBackground({ alt = DEFAULT_HERO_ALT }: { alt?: string }) {
  preload(HERO_POSTER, { as: "image", fetchPriority: "high" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadVideo = useSyncExternalStore(subscribe, loadVideoSnapshot, () => false);
  const [videoVisible, setVideoVisible] = useState(false);
  // Drop a previous reveal when playback is no longer allowed, before paint,
  // so a remounted video cannot flash in at full opacity.
  if (!loadVideo && videoVisible) setVideoVisible(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadVideo) return;

    let cancelled = false;
    let revealed = false;
    const reveal = () => {
      if (cancelled || revealed) return;
      revealed = true;
      setVideoVisible(true);
    };

    const onPlaying = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) reveal();
    };
    const onTimeUpdate = () => {
      if (video.currentTime > 0) reveal();
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("timeupdate", onTimeUpdate);

    const frameHandle =
      typeof video.requestVideoFrameCallback === "function"
        ? video.requestVideoFrameCallback(() => reveal())
        : undefined;

    // A decoded frame may already be on screen if autoplay won the race.
    if (
      video.currentTime > 0 ||
      (!video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA)
    ) {
      reveal();
    }

    // React's muted attribute does not always set the DOM property, and iOS
    // will not autoplay without it. Set both before play().
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const playback = video.play();
    if (playback) playback.catch(() => {});

    return () => {
      cancelled = true;
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("timeupdate", onTimeUpdate);
      if (frameHandle !== undefined) video.cancelVideoFrameCallback(frameHandle);
    };
  }, [loadVideo]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src={HERO_POSTER}
        alt={alt}
        fill
        priority
        unoptimized
        fetchPriority="high"
        sizes="100vw"
        className={CROP}
      />
      {loadVideo ? (
        <video
          ref={videoRef}
          src={VIDEO}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          className={`absolute inset-0 h-full w-full ${CROP} ${videoVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transition: "opacity 500ms ease-out" }}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/50 to-navy-deep/20" />
    </div>
  );
}
