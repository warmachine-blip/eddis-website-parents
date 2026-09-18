import type { ReactNode } from "react";
import Link from "next/link";
import { practice } from "@/lib/nav";

/**
 * The closing call-to-action that ends almost every page.
 *
 * This was sixteen inline copies that had drifted into five different
 * renderings — three section treatments, two eyebrow styles, two vertical
 * rhythms, two lead sizes, pill buttons on some pages and square on others.
 * The props below exist only to reproduce those five exactly; they are a record
 * of the drift, not a design system. Collapsing them to one treatment is a
 * deliberate visual decision for someone to make, not a side effect of this
 * extraction.
 *
 * /second-opinion and the location template keep their own band: they carry a
 * different headline, so they are not copies of this one.
 *
 * Full class strings are written out below rather than composed, so Tailwind's
 * scanner still sees every utility this component can emit.
 */

const SURFACE = {
  gradient: "relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy",
  bordered: "border-t border-line bg-navy-deep text-off-white",
  plain: "bg-navy-deep text-off-white",
} as const;

const CONTAINER = {
  lg: "mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-24",
  md: "mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-20",
} as const;

/** The rule eyebrow carries a wider headline offset than the plain one. */
const HEADING = {
  "rule-gradient":
    "mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl",
  "rule-flat": "mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight sm:text-4xl",
  "plain-gradient":
    "mx-auto mt-3 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl",
  "plain-flat": "mx-auto mt-3 max-w-2xl text-balance font-serif text-3xl leading-tight sm:text-4xl",
} as const;

const LEAD = {
  sm: "mx-auto mt-4 max-w-md text-sm text-off-white/70",
  base: "mx-auto mt-4 max-w-md text-base text-off-white/80",
} as const;

/** Gradient sections carry pill buttons; the flatter ones carry square. */
const PRIMARY = {
  pill: "rounded-full border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light",
  square:
    "border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light",
} as const;

const SECONDARY = {
  pill: "rounded-full border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white",
  square:
    "border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white",
} as const;

export default function FinalCta({
  surface = "gradient",
  eyebrow = "rule",
  size = "lg",
  lead = "sm",
  children,
}: {
  /** Section chrome. */
  surface?: keyof typeof SURFACE;
  /** Eyebrow treatment; also selects the headline offset. */
  eyebrow?: "rule" | "plain";
  /** Vertical rhythm of the inner container. */
  size?: keyof typeof CONTAINER;
  /** Scale of the line under the headline. */
  lead?: keyof typeof LEAD;
  /** Rendered inside the section, above the call to action. */
  children?: ReactNode;
}) {
  const shape = surface === "gradient" ? "pill" : "square";
  const heading = HEADING[`${eyebrow}-${surface === "gradient" ? "gradient" : "flat"}`];

  const body = (
    <div className={CONTAINER[size]}>
      {eyebrow === "rule" ? (
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
          <span className="h-px w-8 bg-current opacity-70" />
          Ready When You Are
        </p>
      ) : (
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-light">
          Ready When You Are
        </p>
      )}
      <h2 className={heading}>
        Get a straight answer about what your pain actually needs.
      </h2>
      <p className={LEAD[lead]}>
        Two Houston-area locations. Same-week consults available. Most insurance accepted.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/request-appointment" className={PRIMARY[shape]}>
          Request Appointment
        </Link>
        <a href={practice.phoneHref} className={SECONDARY[shape]}>
          {practice.phone}
        </a>
      </div>
    </div>
  );

  // Two branches rather than one always-present {children} slot: an empty slot
  // serialises as an extra $undefined child in the RSC payload, which would
  // leave the fourteen pages without a preamble no longer byte-identical to the
  // inline copies this replaced.
  return children ? (
    <section className={SURFACE[surface]}>
      {children}
      {body}
    </section>
  ) : (
    <section className={SURFACE[surface]}>{body}</section>
  );
}
