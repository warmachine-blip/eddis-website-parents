"use client";

/**
 * Current year, evaluated in the visitor's browser so the footer never goes
 * stale between builds. suppressHydrationWarning covers the one night a year
 * the server-rendered year differs from the client's.
 */
export default function CopyrightYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
