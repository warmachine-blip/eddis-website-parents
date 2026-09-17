/**
 * Old htxpaincare.com paths whose structure differs from this site's.
 *
 * That site is a WordPress install with its own URL scheme, so the two are not
 * interchangeable: 25 of its 43 pages happen to share a path with the route of
 * the same name here and need no entry — the blanket domain redirect in
 * next.config.ts preserves their path. The 18 below do not, and would 404 on
 * the new domain without an explicit destination.
 *
 * Sources are written without a trailing slash. Every WordPress URL carries
 * one, but Next normalises `/foo/` to `/foo` (308, same host) before these
 * rules are evaluated, so the slashless form is what they actually see.
 *
 * Destinations were taken from each old page's own <title>, not guessed from
 * its slug — "/neuropathic-pain-injections" is titled "Injections & Blocks
 * Specialist", and maps to the procedure page rather than the condition.
 */
export const HTX_PAIN_CARE_PATHS: Record<string, string> = {
  // Conditions — the old site suffixed these, this one does not.
  "/back-pain-causes-and-treatment": "/back-pain",
  "/chronic-pain-causes-and-treatment": "/chronic-pain",
  "/neck-pain-causes-and-treatment": "/neck-pain",
  "/neuropathic-pain-conditions-treatment": "/neuropathic-pain",
  "/pelvic-pain-causes-and-treatment": "/pelvic-pain",
  // Three old joint-pain pages, one page here.
  "/all-joint-pain-treatment": "/joint-pain",
  "/all-joint-pain-treatments": "/joint-pain",
  "/joint-pain-conditions-and-treatment": "/joint-pain",
  // Procedures, renamed.
  "/prp-therapy": "/prp-procedure",
  "/neuropathic-pain-injections": "/injections-blocks-specialist",
  "/sacroiliac-joint-pain-specialist": "/si-joint-fusions",
  "/scs-and-drg-stimulation": "/spinal-cord-stimulation-specialist",
  "/scs-and-drg-stimulator": "/spinal-cord-stimulation-specialist",
  // Paid-search landing page for the same condition.
  "/ppc-neck-pain": "/neck-pain",
  // The Willowbrook office is "Northwest Houston" here.
  "/willowbrook": "/locations/northwest-houston",
  // Cancer pain management is outside this practice's scope and its page was
  // withdrawn, so this follows the same destination as the /cancer-pain rule.
  "/cancer-pain-causes-and-treatment": "/pain-center",
  // The old post-booking thank-you pages; /appointment-confirmed replaces both.
  "/thank-you": "/appointment-confirmed",
  "/thank-you-for-requesting-consultation": "/appointment-confirmed",
  // WordPress/Yoast sitemap URLs. Search Console has these registered against
  // the old property, so point them at the real one instead of letting them 404.
  "/sitemap_index.xml": "/sitemap.xml",
  "/page-sitemap.xml": "/sitemap.xml",
  "/post-sitemap.xml": "/sitemap.xml",
};
