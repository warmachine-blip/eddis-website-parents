type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
};

export default function SectionHeading({ eyebrow, title, lead, align = "left" }: Props) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance font-serif text-3xl leading-[1.1] text-navy sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-charcoal-soft">
          {lead}
        </p>
      )}
    </div>
  );
}
