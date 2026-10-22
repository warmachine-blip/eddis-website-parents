import SectionHeading from "@/components/section-heading";
import { reviews } from "@/lib/reviews";

/**
 * Birdeye reviews, embedded directly as an iframe (no third-party loader
 * script). The wrapper reserves the embed's full height so the page cannot
 * shift while the widget loads.
 */
export default function ReviewsSection({ className, locale = "en" }: { className?: string; locale?: "en" | "es" }) {
  const spanish = locale === "es";
  return (
    <section id="reviews" className={["scroll-mt-24", className].filter(Boolean).join(" ")}>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow={spanish ? "Opiniones de pacientes" : "Patient Reviews"}
          title={spanish ? "Lo que dicen nuestros pacientes." : "What our patients say."}
        />
        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-charcoal-soft">
          {spanish
            ? "Las opiniones se recogen y se publican en Birdeye, en el idioma en que se escribieron. Si no cargan, puede "
            : "Reviews are collected and published by Birdeye. If they don’t load, you can "}
          <a
            href={reviews.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brass-text underline"
          >
            {spanish ? "leerlas en Google" : "read them on Google"}
          </a>
          .
        </p>

        <div className="mx-auto mt-10 h-[720px] w-full max-w-[680px]">
          <iframe
            src={reviews.embedSrc}
            title={spanish ? "Opiniones de pacientes" : "Patient reviews"}
            width="100%"
            height="720"
            loading="lazy"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
