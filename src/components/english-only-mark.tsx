/**
 * Quiet marker for a Spanish menu link that still opens an English page.
 * The letters stay "EN" so the abbreviation is obvious in either language.
 */
export default function EnglishOnlyMark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      lang="en"
      className={`ml-1.5 align-middle font-sans text-[10px] font-semibold normal-case tracking-[0.14em] ${
        tone === "dark" ? "text-brass-light" : "text-brass-text"
      }`}
    >
      EN
    </span>
  );
}
