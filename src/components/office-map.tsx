"use client";

import { useEffect, useRef, useState } from "react";
import type { Office } from "@/lib/nav";

/**
 * The embedded Google map for one office, shared by /contact, /locations and
 * every city page.
 *
 * The iframe is ~457 KB of Google's payload and `loading="lazy"` does not defer
 * it reliably, so it is mounted only once the wrapper is close to the viewport.
 * The wrapper reserves its full height from first paint, so nothing shifts when
 * the map arrives.
 */
export default function OfficeMap({ office, height = 240 }: { office: Office; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    if (typeof IntersectionObserver === "undefined") {
      // Ancient browser: show it anyway, on a task so this is not a
      // synchronous setState inside the effect.
      const t = setTimeout(() => setShow(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  const src = `https://www.google.com/maps?q=${encodeURIComponent(office.mapsQuery)}&output=embed`;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-line bg-pearl"
      style={{ height }}
    >
      {show ? (
        <iframe
          src={src}
          width="100%"
          height={height}
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map to HTx Pain Institute — ${office.city}`}
        />
      ) : (
        <div className="flex h-full items-center justify-center px-4 text-center text-sm text-charcoal-soft">
          <span>
            {office.addressLine1}
            <br />
            {office.addressLine2}
          </span>
        </div>
      )}
    </div>
  );
}
