"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Spanish twin of HeroHeadline. Same timing, Spanish lines. The h1 is the only
 * heading; the second line stays aria-hidden, as it does in English.
 */
const HOLD_MS = 4000;
const FADE_IN = "opacity-100 delay-[550ms]";
const FADE_OUT = "opacity-0 delay-[0ms]";
const LINE_BASE =
  "col-start-1 row-start-1 m-0 font-serif font-medium tracking-tight text-off-white transition-opacity duration-[400ms] ease-in-out motion-reduce:transition-none";

export default function EsHeroHeadline() {
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
    <div className="relative mb-7 grid">
      <h1
        className={`${LINE_BASE} text-balance text-[clamp(44px,5vw,68px)] leading-[1.1] ${
          showAlt ? FADE_OUT : FADE_IN
        }`}
      >
        Viva <em className="not-italic text-brass-light">más allá</em> de los límites del dolor crónico
      </h1>
      <p
        className={`${LINE_BASE} leading-[1.14] ${showAlt ? FADE_IN : FADE_OUT}`}
        style={{ fontSize: "clamp(40px, 4.4vw, 60px)" }}
        aria-hidden="true"
      >
        Para el próximo <em className="not-italic text-brass-light">partido.</em>
        <br />
        La próxima <em className="not-italic text-brass-light">mañana.</em>
        <br />
        La próxima <em className="not-italic text-brass-light">década.</em>
      </p>
    </div>
  );
}
