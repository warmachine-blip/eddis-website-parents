import Link from "next/link";
import { socialItems } from "@/components/social-icons";

/**
 * "Contact" nav item with a hover/focus-revealed row of social links.
 * The links open in a small panel BELOW the link (same pattern as the other
 * header dropdowns) so the Contact link itself always stays visible and
 * clickable.
 */
export default function ContactSocialReveal() {
  return (
    <div className="group relative">
      <Link
        href="/contact"
        className="inline-flex items-center py-2 font-sans text-[12.5px] font-medium uppercase tracking-[0.08em] text-charcoal-soft transition-colors hover:text-brass group-hover:text-brass group-focus-within:text-brass"
      >
        Contact
      </Link>

      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <ul className="flex items-center gap-0.5 rounded-sm border border-line bg-off-white p-1.5 shadow-[0_18px_40px_-24px_rgba(15,26,46,0.35)]">
          {socialItems.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-charcoal-soft transition-colors hover:bg-pearl hover:text-brass-deep active:scale-90"
              >
                <item.Icon className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
