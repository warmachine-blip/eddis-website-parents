type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  /** Heading level — pass "h1" when this is the page's primary heading. */
  as?: "h1" | "h2";
};

export default function SectionHeading({ eyebrow, title, lead, align = "left", as: Heading = "h2" }: Props) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
        {eyebrow}
      </p>
      <Heading className="mt-3 text-balance font-serif text-3xl leading-[1.1] text-navy sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Heading>
      {lead && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-charcoal-soft">
          {lead}
        </p>
      )}
    </div>
  );
}
