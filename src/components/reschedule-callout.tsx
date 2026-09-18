import { practice } from "@/lib/nav";
import { scheduling } from "@/lib/scheduling";

/**
 * Rescheduling an existing appointment is a different job from booking a new
 * one, and patients were phoning the front desk to do it. This states it as its
 * own action wherever someone with an existing appointment might land, rather
 * than leaving it as one link among several on a booking page.
 *
 * `tone="light"` sits on the pearl/off-white sections, `tone="dark"` on the navy ones.
 */
export default function RescheduleCallout({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div
      className={
        dark
          ? "rounded-2xl border border-off-white/15 bg-navy-deep p-7 sm:p-8"
          : "rounded-2xl border border-line bg-off-white p-7 shadow-sm sm:p-8"
      }
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              dark ? "text-brass-light" : "text-brass-text"
            }`}
          >
            Already have an appointment?
          </p>
          <h2
            className={`mt-2 font-serif text-xl leading-tight sm:text-2xl ${
              dark ? "text-off-white" : "text-navy"
            }`}
          >
            Reschedule or cancel it yourself, any time.
          </h2>
          <p
            className={`mt-2 max-w-xl text-sm leading-relaxed ${
              dark ? "text-off-white/70" : "text-charcoal-soft"
            }`}
          >
            No need to call during office hours &mdash; change your date and time
            online in about a minute. Prefer to talk to someone? Call{" "}
            <a
              href={practice.phoneHref}
              className={`font-medium tabular-nums underline underline-offset-2 ${
                dark ? "text-brass-light hover:text-off-white" : "text-brass-text"
              }`}
            >
              {practice.phone}
            </a>
            .
          </p>
        </div>

        <a
          href={scheduling.manageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex shrink-0 items-center justify-center rounded-full px-7 py-3.5 font-sans text-sm font-medium tracking-wide ${
            dark
              ? "border border-brass bg-brass text-navy-deep hover:bg-brass-light"
              : "border border-navy bg-navy text-off-white hover:bg-navy-deep"
          }`}
        >
          Reschedule appointment
        </a>
      </div>
    </div>
  );
}
