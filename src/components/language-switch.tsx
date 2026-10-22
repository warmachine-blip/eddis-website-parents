"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeSwitchTarget } from "@/lib/spanish";

/**
 * EN | ES. On a page with a Spanish twin, ES opens that page. On every other
 * page, ES opens the Spanish homepage, and the accessible name says so.
 * Plain links. The choice is not stored.
 */
export default function LanguageSwitch() {
  const { isSpanish, enHref, esHref, esFallsBackToHome } = localeSwitchTarget(usePathname() ?? "/");

  const item =
    "inline-flex min-h-11 items-center whitespace-nowrap px-0.5 font-sans text-[11px] font-semibold tracking-[0.08em] min-[400px]:tracking-[0.14em]";

  return (
    <nav aria-label={isSpanish ? "Idioma" : "Language"} className="flex shrink-0 items-center">
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
      <Link
        href={esHref}
        hrefLang="es"
        lang="es"
        aria-current={isSpanish ? "page" : undefined}
        aria-label={esFallsBackToHome ? "Español, página de inicio" : undefined}
        className={`${item} ${isSpanish ? "text-navy underline decoration-brass decoration-2 underline-offset-4" : "text-charcoal-soft hover:text-brass-text"}`}
      >
        ES
      </Link>
    </nav>
  );
}
