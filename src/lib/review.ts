/**
 * The physician review date carried by every page that shows the
 * "Reviewed by Edward Baumgartner Jr., MD" byline.
 *
 * Stored per entry rather than as one shared constant so pages can be
 * re-reviewed independently — a single date here would quietly become a claim
 * about pages nobody looked at.
 */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * "2026-09-10" -> "September 10, 2026".
 *
 * Parsed from the string rather than through `new Date()`, which would read a
 * bare ISO date as UTC midnight and render the previous day west of Greenwich.
 */
export function formatReviewDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day || month < 1 || month > 12) {
    throw new Error(`formatReviewDate: expected YYYY-MM-DD, got "${iso}"`);
  }
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}
