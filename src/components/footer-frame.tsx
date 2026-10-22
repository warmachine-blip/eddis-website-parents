"use client";

import { usePathname } from "next/navigation";

/**
 * The footer stays English on Spanish pages (those links open English URLs).
 * Mark it lang="en" so a screen reader does not pronounce it with Spanish rules.
 * The "Hablamos español" line inside already sets lang="es" on itself.
 */
export default function FooterFrame({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? "/";
  const spanish = path === "/es" || path.startsWith("/es/");
  return (
    <footer lang={spanish ? "en" : undefined} className="bg-navy-deep text-off-white/85">
      {children}
    </footer>
  );
}
