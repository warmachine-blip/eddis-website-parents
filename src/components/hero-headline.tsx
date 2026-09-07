"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Two hero lines that alternate. The swap is sequenced rather than crossfaded:
 * the outgoing line fades out first, the frame sits empty for a beat, then the
 * incoming line fades in — so the two are never legible on top of each other.
 * Timing lives in the literal class strings below (Tailwind only sees classes
 * written out in full): fade 400ms, 150ms gap, so the incoming line waits 550ms.
 * Each line then holds for the rest of the 4s interval.
 */
const HOLD_MS = 4000;

/** Incoming line: waits for the outgoing one to clear, then fades in. */
const FADE_IN = "opacity-100 delay-[550ms]";
/** Outgoing line: starts fading immediately. */
const FADE_OUT = "opacity-0 delay-[0ms]";

const LINE_BASE =
  "col-start-1 row-start-1 m-0 font-serif font-medium tracking-tight text-off-white transition-opacity duration-[400ms] ease-in-out motion-reduce:transition-none";

export default function HeroHeadline() {
  const [showAlt, setShowAlt] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reducedMotion.current) return;
    const id = setInterval(() => setShowAlt((v) => !v), HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    // Both lines share one grid cell, so the row is always as tall as the
    // taller line and the swap cannot shift the page.
    <div className="relative mb-7 grid">
      {/* The only h1: always in the accessibility tree, so screen readers get
          exactly one heading no matter which line is on screen. */}
      <h1
        className={`${LINE_BASE} text-balance text-[clamp(44px,5vw,68px)] leading-[1.1] ${
          showAlt ? FADE_OUT : FADE_IN
        }`}
      >
        Live <em className="not-italic text-brass-light">beyond</em> the limits of chronic pain
      </h1>
      {/* Decorative alternate line — permanently aria-hidden. */}
      <p
        className={`${LINE_BASE} leading-[1.14] ${showAlt ? FADE_IN : FADE_OUT}`}
        style={{ fontSize: "clamp(40px, 4.4vw, 60px)" }}
        aria-hidden="true"
      >
        For the next <em className="not-italic text-brass-light">match.</em>
        <br />
        The next <em className="not-italic text-brass-light">morning.</em>
        <br />
        The next <em className="not-italic text-brass-light">decade.</em>
      </p>
    </div>
  );
}
