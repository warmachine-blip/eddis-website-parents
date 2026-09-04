import Script from "next/script";
import { practice } from "@/lib/nav";
import { scheduling } from "@/lib/scheduling";

/**
 * Nimblr's embedded scheduler. The helper script loads after hydration
 * (afterInteractive) so it never blocks first paint; the iframe itself is
 * plain HTML so it renders with or without JavaScript.
 */
export default function NimblrScheduler() {
  return (
    <div>
      <Script src={scheduling.scriptSrc} strategy="afterInteractive" />
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        <iframe
          src={scheduling.embedUrl}
          title="Schedule Appointment"
          width="100%"
          style={{ minHeight: "100dvh" }}
          className="block w-full border-0"
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Scheduler not loading?{" "}
        <a
          href={scheduling.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brass-text underline"
        >
          Open it in a new tab
        </a>{" "}
        or call{" "}
        <a href={practice.phoneHref} className="font-medium tabular-nums text-brass-text underline">
          {practice.phone}
        </a>
        .
      </p>
    </div>
  );
}
