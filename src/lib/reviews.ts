/** Birdeye reviews widget — embedded as a plain iframe, no loader script. */
export const reviews = {
  embedSrc:
    "https://widgets-v7.birdeye.com/api/widgets?bid=178395175443681&wno=3&seoEnabled=false",
  /**
   * Shown as a fallback when the embed is blocked. Swap in the practice's
   * canonical Google Business Profile URL (the place_id link) when available.
   */
  googleProfileUrl:
    "https://www.google.com/maps/search/?api=1&query=HTx+Pain+Institute+13323+Dotson+Rd+Suite+200+Houston+TX+77070",
  /**
   * The homepage hero stat, and the only place these numbers are used. The
   * embedded widget above is always live; these are a hand-copied snapshot of
   * it, so they go stale silently. Updating them is this one edit.
   *
   * Deliberately not published as schema.org aggregateRating — see the note in
   * src/components/organization-schema.tsx for why.
   */
  rating: "5.0",
  reviewCount: 653,
  /** When the two numbers above were last read off the widget. */
  countLastChecked: "2026-09-19",
};
