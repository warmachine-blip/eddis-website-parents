import type { Metadata } from "next";
import { SITE_URL } from "./site";

/**
 * Per-page social card. Every route used to share one lobby photo; these are
 * pre-cropped 1200x630 derivatives of each page's own hero, generated into
 * public/images/og.
 */
export function socialImage(slug: string, alt: string): Pick<Metadata, "openGraph" | "twitter"> {
  const images = [{ url: `${SITE_URL}/images/og/${slug}.jpg`, width: 1200, height: 630, alt }];
  return { openGraph: { images }, twitter: { images } };
}
