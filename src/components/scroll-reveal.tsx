"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades + lifts each <section> in the current page as it scrolls into view.
 * Sections already visible at mount are marked visible immediately (no flash-hide).
 * Re-scans on route change since PageTransition swaps content without a full reload.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    if (sections.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal-visible", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );

    for (const el of sections) {
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (alreadyVisible) {
        el.setAttribute("data-reveal-visible", "");
      } else {
        el.setAttribute("data-reveal", "");
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
