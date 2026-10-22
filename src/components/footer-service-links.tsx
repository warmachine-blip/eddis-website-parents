"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { spanishVisibleNavItem } from "@/lib/spanish";

const footerLinkClass =
  "group relative inline-flex w-fit items-center before:pointer-events-none before:absolute before:-bottom-0.5 before:left-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:bg-brass-light before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] before:content-[''] hover:text-brass-light hover:before:origin-left hover:before:scale-x-100";

/**
 * The footer stays English, except this one procedure name: on Spanish pages
 * it uses the Spanish name and opens the Spanish page.
 */
export default function FooterServiceLinks({ links }: { links: { href: string; label: string }[] }) {
  const path = usePathname() ?? "/";
  const isSpanish = path === "/es" || path.startsWith("/es/");

  return (
    <>
      {links.map((link) => {
        const visible = spanishVisibleNavItem(link.href, link.label, isSpanish);
        return (
          <li key={link.href}>
            <Link href={visible.href} lang={visible.lang} className={`${footerLinkClass} min-h-11 py-2`}>
              {visible.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}
