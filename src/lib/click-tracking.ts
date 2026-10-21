/**
 * Decides whether a clicked href starts a booking or calls the practice.
 *
 * Pure on purpose so the document listener in analytics-clicks.tsx can be
 * checked without a browser. The Nimblr embed fires the same event itself,
 * because clicks inside that frame never reach the listener.
 * Rescheduling an existing visit (appointment.nimblr.ai) does not count —
 * that is a different job from requesting one. tel:911 does not count.
 */

export const APPOINTMENT_PATH = "/request-appointment";

/** Nimblr's booking host. The manage/reschedule host is a different origin. */
export const NIMBLR_BOOK_ORIGIN = "https://book.nimblr.co";

export type TrackedClick = "appointment_request_click" | "phone_click";

function digits(value: string): string {
  return value.replace(/\D/g, "");
}

/** US practice numbers match with or without the leading country code. */
function samePhone(href: string, practicePhoneHref: string): boolean {
  if (!/^tel:/i.test(href)) return false;
  const clicked = digits(href.slice(href.indexOf(":") + 1).split("?")[0] ?? "");
  const practice = digits(practicePhoneHref);
  if (!clicked || !practice || clicked === "911") return false;
  return clicked === practice || clicked === practice.replace(/^1/, "") || `1${clicked}` === practice;
}

/**
 * @param href The anchor's href attribute, as authored (relative is fine).
 * @param pageUrl The page the click happened on, used to resolve relative hrefs.
 * @param practicePhoneHref The practice tel: href, e.g. tel:+18329607160.
 */
export function classifyTrackedClick(
  href: string,
  pageUrl: string,
  practicePhoneHref: string,
): TrackedClick | null {
  if (!href) return null;
  if (samePhone(href, practicePhoneHref)) return "phone_click";
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
    if (path === APPOINTMENT_PATH) return "appointment_request_click";
    // In-page jump to the embedded scheduler on the ad landing pages.
    if (url.hash === "#schedule" && url.pathname === page.pathname) {
      return "appointment_request_click";
    }
  }

  return null;
}
