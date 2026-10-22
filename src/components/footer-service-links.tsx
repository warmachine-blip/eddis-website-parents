import Link from "next/link";
import EnglishOnlyMark from "@/components/english-only-mark";

const footerLinkClass =
  "group relative inline-flex w-fit items-center before:pointer-events-none before:absolute before:-bottom-0.5 before:left-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:bg-brass-light before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] before:content-[''] hover:text-brass-light hover:before:origin-left hover:before:scale-x-100";

/**
 * Service names in the footer. The parent passes already-localized links so
 * the English footer and the Spanish footer can share this list markup.
 */
export default function FooterServiceLinks({
  links,
}: {
  links: { href: string; label: string; englishOnly?: boolean }[];
}) {
  return (
    <>
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={`${footerLinkClass} min-h-11 py-2`}>
            {link.label}
            {link.englishOnly ? <EnglishOnlyMark tone="dark" /> : null}
          </Link>
        </li>
      ))}
    </>
  );
}
