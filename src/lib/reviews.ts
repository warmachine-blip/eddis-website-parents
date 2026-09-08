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
   * Rating shown in the homepage hero stat. The embedded widget is always
   * live; these two numbers are a static snapshot and need a manual refresh.
   * Source: the Birdeye widget above. Last checked 2026-09-07.
   */
  rating: "5.0",
  reviewCount: 647,
};
