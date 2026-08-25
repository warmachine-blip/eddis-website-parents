"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroHeadline() {
  const [showAlt, setShowAlt] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reducedMotion.current) return;
    const id = setInterval(() => setShowAlt((v) => !v), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mb-7 grid">
      <h1
        className={`col-start-1 row-start-1 m-0 text-balance font-serif text-[clamp(44px,5vw,68px)] font-medium leading-[1.1] tracking-tight text-off-white transition-opacity duration-700 ease-in-out ${
          showAlt ? "opacity-0" : "opacity-100"
        }`}
      >
        Live <em className="not-italic text-brass-light">beyond</em> the limits of chronic pain
      </h1>
      <h1
        className={`col-start-1 row-start-1 m-0 font-serif font-medium leading-[1.14] tracking-tight text-off-white transition-opacity duration-700 ease-in-out ${
          showAlt ? "opacity-100" : "opacity-0"
        }`}
        style={{ fontSize: "clamp(40px, 4.4vw, 60px)" }}
        aria-hidden={!showAlt}
      >
        For the next <em className="not-italic text-brass-light">match.</em>
        <br />
        The next <em className="not-italic text-brass-light">morning.</em>
        <br />
        The next <em className="not-italic text-brass-light">decade.</em>
      </h1>
    </div>
  );
}
