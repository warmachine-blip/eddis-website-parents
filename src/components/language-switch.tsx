"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { localeSwitchTarget } from "@/lib/spanish";

/**
 * EN | ES. On a page with a Spanish twin, ES opens that page. On every other
 * page, ES stays on the page and explains that a translation does not exist,
 * with a link to the Spanish homepage. Plain links. The choice is not stored.
 */
export default function LanguageSwitch() {
  const pathname = usePathname() ?? "/";
  const { isSpanish, enHref, esHref, esFallsBackToHome } = localeSwitchTarget(pathname);
  const [noteOpen, setNoteOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const noteId = useId();

  useEffect(() => {
    setNoteOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!noteOpen) return;
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setNoteOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setNoteOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [noteOpen]);

  const item =
    "inline-flex min-h-11 items-center whitespace-nowrap px-0.5 font-sans text-[11px] font-semibold tracking-[0.08em] min-[400px]:tracking-[0.14em]";

  return (
    <nav
      ref={rootRef}
      aria-label={isSpanish ? "Idioma" : "Language"}
      data-language-switch=""
      className="relative flex shrink-0 items-center"
    >
      <Link
        href={enHref}
        hrefLang="en"
        lang="en"
        aria-current={isSpanish ? undefined : "page"}
        className={`${item} ${isSpanish ? "text-charcoal-soft hover:text-brass-text" : "text-navy underline decoration-brass decoration-2 underline-offset-4"}`}
      >
        EN
      </Link>
      <span className="px-1 text-[11px] text-charcoal-soft/50" aria-hidden="true">
        |
      </span>
      {esFallsBackToHome ? (
        <button
          type="button"
          aria-expanded={noteOpen}
          aria-controls={noteId}
          aria-label="Español. Esta página está solo en inglés."
          lang="es"
          className={`${item} ${noteOpen ? "text-navy underline decoration-brass decoration-2 underline-offset-4" : "text-charcoal-soft hover:text-brass-text"}`}
          onClick={() => setNoteOpen((open) => !open)}
        >
          ES
        </button>
      ) : (
        <Link
          href={esHref}
          hrefLang="es"
          lang="es"
          aria-current={isSpanish ? "page" : undefined}
          className={`${item} ${isSpanish ? "text-navy underline decoration-brass decoration-2 underline-offset-4" : "text-charcoal-soft hover:text-brass-text"}`}
        >
          ES
        </Link>
      )}
      {noteOpen && esFallsBackToHome ? (
        <div
          id={noteId}
          role="region"
          aria-label="Disponibilidad en español"
          lang="es"
          className="absolute right-0 top-full z-50 mt-2 w-60 border border-line bg-off-white p-3 text-left shadow-[0_18px_40px_-24px_rgba(15,26,46,0.45)]"
        >
          <p className="text-sm font-normal normal-case leading-snug tracking-normal text-charcoal">
            Esta página está disponible solo en inglés.
          </p>
          <Link
            href="/es"
            hrefLang="es"
            className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold normal-case tracking-normal text-navy underline decoration-brass decoration-2 underline-offset-4"
          >
            Ir al inicio en español
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
