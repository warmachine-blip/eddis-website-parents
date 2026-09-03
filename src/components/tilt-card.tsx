"use client";

/**
 * Magnetic 3D tilt + hover glow + shimmer sweep + focus-dim siblings.
 * Technique adapted from KokonutUI's "Spotlight Cards" (kokonutui.com,
 * @dorianbaffier) — re-themed to the site's navy/brass palette (no dark
 * mode, no indigo/zinc) and generalized to wrap any card content/link
 * instead of the original's fixed feature-tile layout.
 */

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { createContext, useContext, useRef, useState, type ReactNode } from "react";

const TILT_MAX = 6;
const TILT_SPRING = { stiffness: 300, damping: 28 } as const;
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

const ACCENT = "var(--color-brass)";

const DimContext = createContext<{
  hovered: string | null;
  setHovered: (id: string | null) => void;
} | null>(null);

/** Wrap a grid of <TiltCard>s in this so hovering one dims its siblings. */
export function TiltCardGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <DimContext.Provider value={{ hovered, setHovered }}>
      <div className={className}>{children}</div>
    </DimContext.Provider>
  );
}

const MotionLink = motion.create(Link);

export function TiltCard({
  id,
  href,
  className = "",
  decorated = true,
  contentClassName = "flex h-full flex-col",
  children,
}: {
  id: string;
  href?: string;
  className?: string;
  /** Set false to keep the magnetic tilt + sibling-dim but skip the glow/shimmer/accent-line overlays — for cards that already have their own hover treatment. */
  decorated?: boolean;
  /** Layout classes for the children wrapper — override when a card's content isn't a simple top-to-bottom column (e.g. an icon-left/arrow-right row). */
  contentClassName?: string;
  children: ReactNode;
}) {
  const ctx = useContext(DimContext);
  const cardRef = useRef<HTMLDivElement & HTMLAnchorElement>(null);
  const color = ACCENT;

  // Reduced motion keeps the glow/dim feedback but drops the spatial tilt —
  // rotation is the part most likely to bother motion-sensitive users.
  const reduceMotion = useReducedMotion();
  const tiltMax = reduceMotion ? 0 : TILT_MAX;

  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(normY, [0, 1], [tiltMax, -tiltMax]), TILT_SPRING);
  const rotateY = useSpring(useTransform(normX, [0, 1], [-tiltMax, tiltMax]), TILT_SPRING);
  const glowOpacity = useSpring(0, GLOW_SPRING);

  const dimmed = ctx !== null && ctx.hovered !== null && ctx.hovered !== id;

  function handleMouseMove(e: React.MouseEvent) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseEnter() {
    // Touch devices fire mouseenter on tap but never mouseleave, which would
    // leave siblings dimmed; hover feedback is pointer-only.
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;
    glowOpacity.set(1);
    ctx?.setHovered(id);
  }

  function handleMouseLeave() {
    normX.set(0.5);
    normY.set(0.5);
    glowOpacity.set(0);
    ctx?.setHovered(null);
  }

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    animate: { scale: dimmed ? 0.97 : 1, opacity: dimmed ? 0.6 : 1 },
    transition: { duration: 0.18, ease: "easeOut" as const },
    style: { rotateX, rotateY, transformPerspective: 900 },
    className: `group relative overflow-hidden ${className}`,
  };

  const body = (
    <>
      {decorated && (
        <>
          {/* Static accent tint */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: `radial-gradient(ellipse at 20% 20%, ${color}14, transparent 65%)`,
            }}
          />

          {/* Hover glow */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              opacity: glowOpacity,
              background: `radial-gradient(ellipse at 20% 20%, ${color}30, transparent 65%)`,
            }}
          />

          {/* Shimmer sweep */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
          />
        </>
      )}

      <div className={`relative z-10 ${contentClassName}`}>{children}</div>

      {decorated && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
        />
      )}
    </>
  );

  if (href) {
    return (
      <MotionLink href={href} ref={cardRef} {...sharedProps}>
        {body}
      </MotionLink>
    );
  }

  return (
    <motion.div ref={cardRef} {...sharedProps}>
      {body}
    </motion.div>
  );
}
