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

/**
 * Old txpainspecialists.com paths. The practice traded as Texas Interventional
 * Pain Specialists on a site-builder platform (not the WordPress), so this is a
 * third URL scheme again: no trailing slashes, and its own names for shared
 * pages — "/pain-conditions" for the conditions hub, "/about" for the story
 * page, "/injections-block-specialist" with a singular "block".
 *
 * Recovered from the sitemap.xml captured in the Wayback Machine on 2024-04-05,
 * the only full inventory of that site that still exists: 24 pages, 26 blog
 * posts and 7 archive URLs. Nine pages already share a path with a route here
 * and need no entry; the 15 below do not.
 *
 * 25 of the 26 blog slugs were carried over to the WordPress unchanged, so the
 * existing /blog rule already covers them. The exception is
 * "/blog/living-with-fibromyalgia", which WordPress renamed to
 * "living-with-fibromyalgia-symptoms-coping" — worth an entry when the blog is
 * republished, pointless while every /blog URL goes to the homepage.
 */
export const TX_PAIN_SPECIALISTS_PATHS: Record<string, string> = {
  // Pages this site names differently.
  "/about": "/about-us",
  "/pain-conditions": "/pain-center",
  "/patients-resources": "/patients",
  "/injections-block-specialist": "/injections-blocks-specialist",
  "/spinal-cord-stimulation": "/spinal-cord-stimulation-specialist",
  "/vehicle-injury-doctor": "/motor-vehicle-injuries",
  "/work-injuries": "/work-injuries-accidents",
  "/edward-baumgartner-md": "/dr-edward-baumgartner",
  "/injury-pain": "/injuries-pain",
  // Duplicate pages the old builder left behind, alongside the real ones.
  "/services-1": "/services",
  "/pain-center-1": "/pain-center",
  "/home-brine": "/",
  // The old post-booking thank-you page, same as the WordPress one.
  "/thank-you": "/appointment-confirmed",
  // A COVID-19 policy page with no successor; patient resources is the nearest
  // page that answers what it answered.
  "/covid19": "/patients",
  // Never captured by the archive, so its content is unknown — the homepage is
  // the only honest destination.
  "/google": "/",
};
