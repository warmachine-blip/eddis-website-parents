import Link from "next/link";
import type { Service } from "@/lib/services";
import { IconBadge } from "@/components/icon-badge";
import { TiltCard } from "@/components/tilt-card";

const cardShadow =
  "shadow-[0_1px_3px_rgba(26,39,64,0.06),0_8px_24px_-4px_rgba(26,39,64,0.08)]";
const cardHoverShadow =
  "hover:shadow-[0_4px_8px_rgba(26,39,64,0.06),0_20px_40px_-8px_rgba(26,39,64,0.12)]";

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-muted transition-colors group-hover:text-brass-deep"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function LearnMore() {
  return (
    <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-brass-text">
      Learn more
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

type HeadingLevel = "h2" | "h3";

export default function ServiceCard({ service, headingLevel: Heading = "h3" }: { service: Service; headingLevel?: HeadingLevel }) {
  return (
    <TiltCard
      id={service.slug}
      href={service.href}
      contentClassName="flex h-full flex-col justify-between"
      className={`rounded-2xl border border-card-border bg-white p-6 transition-[border-color] duration-300 hover:border-brass-light ${cardShadow} ${cardHoverShadow}`}
    >
      <div>
        <div className="flex items-start justify-between">
          <IconBadge icon={service.icon} tone="brass" hover />
          <ArrowUpRight />
        </div>
        <Heading className="mt-5 font-serif text-xl text-navy">{service.title}</Heading>
        <p className="mt-2.5 text-sm leading-relaxed text-charcoal-soft">
          {service.summary}
        </p>
      </div>
      <div className="mt-5">
        <LearnMore />
      </div>
    </TiltCard>
  );
}

export function ServiceBanner({ service, headingLevel: Heading = "h3" }: { service: Service; headingLevel?: HeadingLevel }) {
  return (
    <Link
      href={service.href}
      className={`group flex flex-col items-start justify-between gap-5 rounded-2xl border border-card-border bg-white p-6 transition-all hover:border-brass-light sm:flex-row sm:items-center ${cardShadow} ${cardHoverShadow}`}
    >
      <div className="flex items-center gap-5">
        <IconBadge icon={service.icon} tone="brass" hover />
        <div>
          <Heading className="font-serif text-lg text-navy">{service.title}</Heading>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-charcoal-soft">
            {service.summary}
          </p>
        </div>
      </div>
      <div className="shrink-0">
        <LearnMore />
      </div>
    </Link>
  );
}
