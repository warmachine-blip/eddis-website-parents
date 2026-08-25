import type { Condition } from "@/lib/conditions";
import { TiltCard } from "@/components/tilt-card";

export default function ConditionCard({ condition }: { condition: Condition }) {
  return (
    <TiltCard
      id={condition.slug}
      href={condition.href}
      decorated={false}
      contentClassName="flex h-full items-start justify-between gap-4"
      className="rounded-xl border border-card-border bg-white p-5 shadow-[0_1px_3px_rgba(26,39,64,0.06),0_8px_24px_-4px_rgba(26,39,64,0.08)] transition-colors hover:border-navy-deep hover:bg-navy-deep"
    >
      <div>
        <h3 className="font-serif text-lg text-navy transition-colors group-hover:text-off-white">
          {condition.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft transition-colors group-hover:text-off-white/75">
          {condition.summary}
        </p>
      </div>
      <svg
        viewBox="0 0 16 16"
        className="mt-1.5 h-3.5 w-3.5 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-off-white"
        fill="none"
      >
        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </TiltCard>
  );
}
