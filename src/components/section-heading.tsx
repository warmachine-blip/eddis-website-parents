type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  /** "dark" recolours the eyebrow and lead for navy backgrounds. */
  tone?: "light" | "dark";
  /** Heading level — pass "h1" when this is the page's primary heading. */
  as?: "h1" | "h2";
};

export default function SectionHeading({ eyebrow, title, lead, align = "left", tone = "light", as: Heading = "h2" }: Props) {
  const isCenter = align === "center";
  const isDark = tone === "dark";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      <p className={`font-sans text-xs font-semibold uppercase tracking-[0.15em] ${isDark ? "text-brass-light" : "text-brass-text"}`}>
        {eyebrow}
      </p>
      <Heading className={`mt-3 text-balance font-serif text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${isDark ? "text-off-white" : "text-navy"}`}>
        {title}
      </Heading>
      {lead && (
        <p className={`mt-4 text-pretty text-base leading-relaxed ${isDark ? "text-off-white/80" : "text-charcoal-soft"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
