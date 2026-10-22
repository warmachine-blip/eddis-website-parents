/**
 * Decides whether a clicked href starts a booking or calls the practice.
 *
 * Pure on purpose so the document listener in analytics-clicks.tsx can be
 * checked without a browser. The Nimblr embed fires the same event itself,
 * because clicks inside that frame never reach the listener.
 * Rescheduling an existing visit (appointment.nimblr.ai) does not count.
 * That is a different job from requesting one. tel:911 does not count.
 *
 * Phone matches are the practice number in src/lib/nav.ts plus
 * practice.trackingPhoneHrefs. Google Ads uses the same check, so the two
 * counts stay on the same numbers.
 */

import { practice } from "./nav.ts";

export const APPOINTMENT_PATH = "/request-appointment";
/** Spanish booking page. Same event and the same parameters as the English path. */
const APPOINTMENT_PATH_ES = "/es/request-appointment";

function isAppointmentRequestPath(path: string): boolean {
  return path === APPOINTMENT_PATH || path === APPOINTMENT_PATH_ES;
}

/** Practice line, then any configured tracking numbers. */
export function trackedPhoneHrefs(): readonly string[] {
  return [practice.phoneHref, ...practice.trackingPhoneHrefs];
}

/** Nimblr's booking host. The manage/reschedule host is a different origin. */
export const NIMBLR_BOOK_ORIGIN = "https://book.nimblr.co";

export type TrackedClick = "appointment_request_click" | "phone_click";

/**
 * The EN|ES control is not a booking request, even when its href is a booking
 * page. Phone clicks are left alone.
 */
export function trackedClickForControl(
  kind: TrackedClick | null,
  languageSwitch: boolean,
): TrackedClick | null {
  if (languageSwitch && kind === "appointment_request_click") return null;
  return kind;
}

function digits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * True when href is a tel: link for one of allowedHrefs. Defaults to the
 * practice number plus tracking numbers. 911 never matches. A leading US
 * country code is optional on either side.
 */
export function samePhone(
  href: string,
  allowedHrefs: readonly string[] = trackedPhoneHrefs(),
): boolean {
  if (!/^tel:/i.test(href)) return false;
  const clicked = digits(href.slice(href.indexOf(":") + 1).split("?")[0] ?? "");
  if (!clicked || clicked === "911") return false;
  for (const allowed of allowedHrefs) {
    const practiceDigits = digits(allowed);
    if (!practiceDigits || practiceDigits === "911") continue;
    if (
      clicked === practiceDigits ||
      clicked === practiceDigits.replace(/^1/, "") ||
      `1${clicked}` === practiceDigits
    ) {
      return true;
    }
  }
  return false;
}

/**
 * @param href The anchor's href attribute, as authored (relative is fine).
 * @param pageUrl The page the click happened on, used to resolve relative hrefs.
 * @param allowedPhoneHrefs Numbers that count as the practice line. Defaults
 *   to the practice number plus tracking numbers.
 */
export function classifyTrackedClick(
  href: string,
  pageUrl: string,
  allowedPhoneHrefs: readonly string[] = trackedPhoneHrefs(),
): TrackedClick | null {
  if (!href) return null;
  if (samePhone(href, allowedPhoneHrefs)) return "phone_click";
  if (/^tel:/i.test(href)) return null;

  let url: URL;
  let page: URL;
  try {
    page = new URL(pageUrl);
    url = new URL(href, page);
  } catch {
    return null;
  }

  if (url.origin === NIMBLR_BOOK_ORIGIN) return "appointment_request_click";

  if (url.origin === page.origin) {
    const path = url.pathname.replace(/\/$/, "") || "/";
    if (isAppointmentRequestPath(path)) return "appointment_request_click";
    // In-page jump to the embedded scheduler on the ad landing pages.
    if (url.hash === "#schedule" && url.pathname === page.pathname) {
      return "appointment_request_click";
    }
  }

  return null;
}
