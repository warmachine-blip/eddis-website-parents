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

export default function ContactSocialReveal() {
  const handleClick = (item: (typeof shareItems)[number]) => {
    window.open(item.href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group grid grid-cols-1 grid-rows-1 items-center justify-items-center py-2">
      <Link
        href="/contact"
        className={[
          "col-start-1 row-start-1 font-sans text-[12.5px] font-medium uppercase tracking-[0.08em] text-charcoal-soft",
          "transition-opacity duration-150 ease-out",
          "group-hover:opacity-0 group-hover:text-brass",
        ].join(" ")}
      >
        Contact
      </Link>

      <div
        className={[
          "pointer-events-none col-start-1 row-start-1 flex items-center gap-0.5 opacity-0",
          "transition-opacity duration-150 ease-out",
          "group-hover:pointer-events-auto group-hover:opacity-100",
        ].join(" ")}
      >
        {shareItems.map((item, i) => (
          <button
            key={item.key}
            type="button"
            aria-label={item.label}
            onClick={() => handleClick(item)}
            className={[
              "flex h-6 w-6 shrink-0 -translate-x-1.5 items-center justify-center rounded-full text-charcoal-soft opacity-0",
              "transition-[opacity,transform,background-color,color] duration-150 ease-out",
              "group-hover:translate-x-0 group-hover:opacity-100",
              "hover:bg-pearl hover:text-brass-deep active:scale-90",
              "motion-reduce:translate-x-0",
            ].join(" ")}
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            <item.Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
