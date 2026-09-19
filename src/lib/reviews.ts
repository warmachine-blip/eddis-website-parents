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
   * The homepage hero stat, and the only place these values are used.
   *
   * Deliberately not published as schema.org aggregateRating — see the note in
   * src/components/organization-schema.tsx for why.
   */
  rating: "5.0",
  /**
   * A floor, not the live total. New reviews land every few weeks, so an exact
   * figure is wrong within days of being typed. "650+" stays true on its own
   * and only needs raising once the real count passes 700.
   *
   * The "+" is part of the value rather than of the template, so a later edit
   * to the hero cannot quietly turn a floor back into a false exact claim.
   * Real total behind it when last read off the widget: 653.
   */
  reviewCountFloor: "650+",
  /** When the rating and the real total behind the floor were last checked. */
  countLastChecked: "2026-09-19",
};
