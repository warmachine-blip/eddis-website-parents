"use client";

import Link from "next/link";
import type { SVGProps } from "react";
import { youtubeChannelUrl } from "@/lib/video-library";
import { facebookUrl, instagramUrl, linkedInUrl } from "@/lib/social";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M14.5 21v-7.5h2.5l.5-3h-3V8.3c0-.87.24-1.46 1.5-1.46H17.5V4.14C17.24 4.1 16.36 4 15.33 4 13.17 4 11.7 5.32 11.7 7.8v2.7H9.2v3h2.5V21" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.3v5.4l4.7-2.7-4.7-2.7Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <circle cx="8.2" cy="8.5" r="0.6" fill="currentColor" />
      <path d="M8.2 11v5.5M12 16.5V13a2 2 0 0 1 4 0v3.5M12 13v3.5" />
    </svg>
  );
}

const shareItems = [
  { key: "facebook", label: "HTx Pain Institute on Facebook", Icon: FacebookIcon, href: facebookUrl },
  { key: "instagram", label: "HTx Pain Institute on Instagram", Icon: InstagramIcon, href: instagramUrl },
  { key: "youtube", label: "HTx Pain Institute on YouTube", Icon: YouTubeIcon, href: youtubeChannelUrl },
  { key: "linkedin", label: "Dr. Edward Baumgartner on LinkedIn", Icon: LinkedInIcon, href: linkedInUrl },
];

/**
 * "Contact" nav item with a hover/focus-revealed row of social icons.
 * The icons open in a small panel BELOW the link (same pattern as the other
 * header dropdowns) so the Contact link itself always stays visible and
 * clickable; previously the icon row was layered over the link and stole
 * every mouse click.
 */
export default function ContactSocialReveal() {
  const handleClick = (item: (typeof shareItems)[number]) => {
    window.open(item.href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group relative">
      <Link
        href="/contact"
        className="inline-flex items-center py-2 font-sans text-[12.5px] font-medium uppercase tracking-[0.08em] text-charcoal-soft transition-colors hover:text-brass group-hover:text-brass group-focus-within:text-brass"
      >
        Contact
      </Link>

      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="flex items-center gap-0.5 rounded-sm border border-line bg-off-white p-1.5 shadow-[0_18px_40px_-24px_rgba(15,26,46,0.35)]">
          {shareItems.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-label={item.label}
              onClick={() => handleClick(item)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-charcoal-soft transition-colors hover:bg-pearl hover:text-brass-deep active:scale-90"
            >
              <item.Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
