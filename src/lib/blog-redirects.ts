/**
 * Every post on the old htxpaincare.com WordPress blog, and what happens to it.
 *
 * Tiers come from the 2026-09-17 migration audit. `keep` is the editorial
 * decision: true means the post survives at /blog/<slug> on this site, false
 * means the topic was absorbed and the old URL 301s to `to`.
 *
 * Only `keep: false` entries become redirects. A kept post needs no rule — the
 * blanket domain redirect in next.config.ts already preserves its path, so the
 * old URL lands on the same slug here.
 *
 * Changing `keep` is the whole editorial lever: flip one to true and its
 * redirect disappears, which means the post must then actually exist (metadata
 * in blog-posts.ts, body in src/content/blog) before the blog is unparked.
 */
export type BlogDisposition = {
  slug: string;
  tier: "Priority" | "Keep" | "Merge" | "Thin" | "Drop";
  /** Where this topic lives now. For kept posts, the post's own page. */
  to: string;
  /** true = survives at its own slug; false = absorbed, old URL 301s to `to`. */
  keep: boolean;
};

export const blogDispositions: BlogDisposition[] = [

  // ---- Priority (6) — Highest traffic and the most substantial bodies. Survive at their own slug.
  { slug: "expect-after-a-radio-frequency-ablation", tier: "Priority", to: "/radiofrequency-ablation", keep: true },
  { slug: "injections-and-nerve-blocks-targeted-pain-relief", tier: "Priority", to: "/injections-blocks-specialist", keep: true },
  { slug: "prp-procedure-helps-you-heal-without-surgery", tier: "Priority", to: "/prp-procedure", keep: true },
  { slug: "sacroiliac-joint-fusion-minimally-invasive-solution-for-pain", tier: "Priority", to: "/si-joint-fusions", keep: true },
  { slug: "spinal-cord-stimulation-for-pain-free-lifestyle", tier: "Priority", to: "/spinal-cord-stimulation-specialist", keep: true },
  { slug: "treating-your-compression-fracture-with-kyphoplasty", tier: "Priority", to: "/kyphoplasty-specialist", keep: true },

  // ---- Keep (11) — Worth migrating on their own merits. Survive at their own slug.
  { slug: "comprehensive-guide-for-motor-vehicle-injury-pain", tier: "Keep", to: "/motor-vehicle-injuries", keep: true },
  { slug: "fastest-way-to-heal-a-herniated-disc", tier: "Keep", to: "/herniated-discs", keep: true },
  { slug: "joint-pain-causes-symptoms", tier: "Keep", to: "/joint-pain", keep: true },
  { slug: "knee-pain-holding-you-back-houston-specialists", tier: "Keep", to: "/knee-pain", keep: true },
  { slug: "lumbar-spine-pain-management-in-houston", tier: "Keep", to: "/back-pain", keep: true },
  { slug: "minimally-invasive-sports-injury-treatments", tier: "Keep", to: "/sports-injuries", keep: true },
  { slug: "relief-from-neck-pain-conditions", tier: "Keep", to: "/neck-pain", keep: true },
  { slug: "sciatica-comprehensive-guide-to-relief-and-recovery", tier: "Keep", to: "/sciatica", keep: true },
  { slug: "treatment-options-for-spinal-stenosis", tier: "Keep", to: "/spinal-stenosis", keep: true },
  { slug: "understanding-neuropathic-pain-and-why-you-shouldnt-ignore", tier: "Keep", to: "/neuropathic-pain", keep: true },
  { slug: "understanding-the-severity-of-pelvic-pain-when-to-seek-professional-help", tier: "Keep", to: "/pelvic-pain", keep: true },

  // ---- Merge (26) — Duplicate coverage of a topic that now has one page. Absorbed by that page.
  { slug: "causes-neuropathic-pain", tier: "Merge", to: "/neuropathic-pain", keep: false },
  { slug: "compression-fractures-causes-symptoms-relief-options", tier: "Merge", to: "/kyphoplasty-specialist", keep: false },
  { slug: "crps-guide-to-managing-chronic-pain", tier: "Merge", to: "/neuropathic-pain", keep: false },
  { slug: "hope-for-diabetic-neuropathy", tier: "Merge", to: "/neuropathic-pain", keep: false },
  { slug: "how-chronic-joint-pain-can-affect-your-everyday-life", tier: "Merge", to: "/joint-pain", keep: false },
  { slug: "how-long-does-it-take-to-feel-better-after-kyphoplasty", tier: "Merge", to: "/kyphoplasty-specialist", keep: false },
  { slug: "how-to-tell-if-you-need-neuropathy-treatment", tier: "Merge", to: "/neuropathic-pain", keep: false },
  { slug: "knee-joint-pain-treatment-houston", tier: "Merge", to: "/knee-pain", keep: false },
  { slug: "kyphoplasty-for-spinal-compression-fractures", tier: "Merge", to: "/kyphoplasty-specialist", keep: false },
  { slug: "kyphoplasty-relieves-nerve-pain", tier: "Merge", to: "/kyphoplasty-specialist", keep: false },
  { slug: "living-with-fibromyalgia-symptoms-coping", tier: "Merge", to: "/fibromyalgia", keep: false },
  { slug: "motor-vehicle-injuries-causes-symptoms-treatment-options", tier: "Merge", to: "/motor-vehicle-injuries", keep: false },
  { slug: "nerve-blocks-can-stop-your-pain", tier: "Merge", to: "/injections-blocks-specialist", keep: false },
  { slug: "neuropathic-pain-can-affect-sleep-overall-well-being", tier: "Merge", to: "/neuropathic-pain", keep: false },
  { slug: "neuropathic-pain-relief-steroid-local-anesthetic-opioid-injections", tier: "Merge", to: "/injections-blocks-specialist", keep: false },
  { slug: "pelvic-pain-causes-symptoms-and-treatment", tier: "Merge", to: "/pelvic-pain", keep: false },
  { slug: "platelet-rich-plasma-therapy-pain-relief", tier: "Merge", to: "/prp-procedure", keep: false },
  { slug: "radiofrequency-ablation-best-solution-chronic-back-pain", tier: "Merge", to: "/radiofrequency-ablation", keep: false },
  { slug: "radiofrequency-ablation-can-tackle-your-back-pain", tier: "Merge", to: "/radiofrequency-ablation", keep: false },
  { slug: "radiofrequency-ablation-resolve-your-back-pain", tier: "Merge", to: "/radiofrequency-ablation", keep: false },
  { slug: "si-joint-fusion-surgery-transforming-spine-care", tier: "Merge", to: "/si-joint-fusions", keep: false },
  { slug: "spinal-cord-stimulator-trial-works", tier: "Merge", to: "/spinal-cord-stimulation-specialist", keep: false },
  { slug: "understanding-radiofrequency-ablation", tier: "Merge", to: "/radiofrequency-ablation", keep: false },
  { slug: "understanding-the-transformative-power-of-spinal-cord-stimulation", tier: "Merge", to: "/spinal-cord-stimulation-specialist", keep: false },
  { slug: "unraveling-the-mysteries-of-spinal-cord-stimulation", tier: "Merge", to: "/spinal-cord-stimulation-specialist", keep: false },
  { slug: "who-should-consider-radiofrequency-ablation", tier: "Merge", to: "/radiofrequency-ablation", keep: false },

  // ---- Thin (5) — Too short to stand alone. Absorbed by the page that covers the topic properly.
  { slug: "did-you-get-in-an-accident-at-work", tier: "Thin", to: "/work-injuries-accidents", keep: false },
  { slug: "intracept-procedure-for-chronic-low-back-pain", tier: "Thin", to: "/intracept-procedure", keep: false },
  { slug: "nerve-pain-management", tier: "Thin", to: "/neuropathic-pain", keep: false },
  { slug: "understanding-interventional-pain-management-an-overview", tier: "Thin", to: "/pain-center", keep: false },
  { slug: "understanding-stellate-ganglion-block", tier: "Thin", to: "/injections-blocks-specialist", keep: false },

  // ---- Drop (5) — Off-scope, or old Texas Interventional branding baked into the slug.
  { slug: "cancer-pain-specialized-care-quality-of-life", tier: "Drop", to: "/pain-center", keep: false },
  { slug: "finding-relief-with-a-radiofrequency-ablation-specialist-at-texas-interventional-pain-specialists", tier: "Drop", to: "/radiofrequency-ablation", keep: false },
  { slug: "pain-free-life-with-texas-interventional-pain-specialists", tier: "Drop", to: "/pain-center", keep: false },
  { slug: "pain-management-for-cancer", tier: "Drop", to: "/pain-center", keep: false },
  { slug: "professional-cancer-pain-treatment-houston", tier: "Drop", to: "/pain-center", keep: false },
];

/**
 * The redirect map fed to next.config.ts: old blog path -> destination, for the
 * posts that do not survive. Kept posts are deliberately absent.
 */
export const HTX_PAIN_CARE_BLOG_PATHS: Record<string, string> = Object.fromEntries(
  blogDispositions.filter((d) => !d.keep).map((d) => [`/blog/${d.slug}`, d.to])
);
