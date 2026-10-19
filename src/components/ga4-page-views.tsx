"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

/**
 * One page view per pathname, including client-side route changes.
 *
 * The App Router does not reload the document on navigation, so a hit sent
 * only from the first HTML response would miss every later page. The query
 * string is not part of the pathname, and a change that only touches it
 * does not send another view. The module-level path survives React's
 * development remount, so that remount does not count the same page twice.
 */
let lastPath: string | null = null;

export default function Ga4PageViews() {
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname || "/";
    if (lastPath === path) return;
    const referrer = lastPath ? `${window.location.origin}${lastPath}` : document.referrer;
    lastPath = path;
    trackPageView(path, referrer);
  }, [pathname]);

  return null;
}
