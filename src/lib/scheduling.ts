/** Nimblr online scheduling — single source for every booking / reschedule link. */
export const scheduling = {
  /** Embedded booking page (iframe mode). */
  embedUrl: "https://book.nimblr.co/HTxPainInstitute?iframe=true",
  /** Same booking page as a standalone tab, for visitors whose browser blocks the embed. */
  bookingUrl: "https://book.nimblr.co/HTxPainInstitute",
  /** Manage / reschedule an existing appointment. */
  manageUrl: "https://appointment.nimblr.ai/htxpaininstitute",
  /** Nimblr's iframe helper (resizes the embed and passes messages). */
  scriptSrc: "https://assets.nimblr.ai/js/iframe.js",
};
