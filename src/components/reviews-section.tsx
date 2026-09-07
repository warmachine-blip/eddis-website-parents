import SectionHeading from "@/components/section-heading";
import { reviews } from "@/lib/reviews";

/**
 * Birdeye reviews, embedded directly as an iframe (no third-party loader
 * script). The wrapper reserves the embed's full height so the page cannot
 * shift while the widget loads.
 */
export default function ReviewsSection({ className }: { className?: string }) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Patient Reviews"
          title="What our patients say."
        />
        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-charcoal-soft">
          Reviews are collected and published by Birdeye. If they don&rsquo;t load,
          you can{" "}
          <a
            href={reviews.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brass-text underline"
          >
            read them on Google
          </a>
          .
        </p>

        <div className="mx-auto mt-10 h-[720px] w-full max-w-[680px]">
          <iframe
            src={reviews.embedSrc}
            title="Patient reviews"
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
