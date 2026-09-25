export type BlogPost = {
  slug: string;
  /** The headline, used as the H1 and — unless seoTitle is set — the title tag. */
  title: string;
  /**
   * Title-tag override, for headlines that run past the ~60 characters Google
   * shows. The H1 keeps `title`; only the tab and the search result change.
   */
  seoTitle?: string;
  excerpt: string;
  image: string;
  alt: string;
  category: string;
  /** ISO. For migrated posts this is the date it first ran on the old site. */
  datePublished: string;
  /** ISO. Omit when the post has not been substantively edited since. */
  dateModified?: string;
  /**
   * ISO date a physician last reviewed the clinical content. Required before a
   * post with a body can publish — the post route throws at build time if a
   * body exists without one, so unreviewed medical content cannot ship.
   */
  lastReviewed?: string;
  /**
   * Who the BlogPosting names as author. Defaults to the practice: the migrated
   * posts were written under old branding and their authorship is not
   * established. Set "physician" only where that is actually true.
   */
  author?: "practice" | "physician";
  readTime: string;
  relatedHref: string;
  relatedLabel: string;
};

export const blogCategories = [
  "All",
  "Spine",
  "Recovery",
  "Conditions",
  "Lifestyle",
  "Procedures",
  "Patient Stories",
];

/**
 * The six posts migrated from the old WordPress blog on 2026-09-22. Their
 * bodies are byte-for-byte the originals apart from the changes the migration
 * required: internal links repointed at this site, one competitor link and four
 * images hotlinked from a third party's CDN removed, and the old branding
 * renamed. Dr. Baumgartner's review of this content when it first ran on
 * htxpaincare.com carries over, which is what `lastReviewed` records here.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "expect-after-a-radio-frequency-ablation",
    title: "What to Expect After a Radiofrequency Ablation",
    excerpt:
      "Relief usually starts between two days and two weeks, and the average run is about fifteen months. Here is the recovery timeline, appointment by appointment.",
    image: "blog-after-radiofrequency-ablation.jpg",
    alt: "Gloved clinician guiding a needle into a knee using ultrasound",
    category: "Recovery",
    datePublished: "2024-02-06",
    dateModified: "2025-03-28",
    lastReviewed: "2026-09-25",
    readTime: "4 min read",
    relatedHref: "/radiofrequency-ablation",
    relatedLabel: "Radiofrequency Ablation",
  },
  {
    slug: "understanding-radiofrequency-ablation",
    title: "What if Radiofrequency Ablation Doesn’t Work?",
    excerpt:
      "A misidentified pain source, needle placement, or ordinary biological variation can each blunt the result. What that points to next, and which options remain.",
    image: "blog-radiofrequency-ablation-next-steps.jpg",
    alt: "Illustration of radiofrequency probes targeting the nerves around a knee and a hip",
    category: "Procedures",
    datePublished: "2023-10-13",
    dateModified: "2025-04-02",
    lastReviewed: "2026-09-25",
    readTime: "3 min read",
    relatedHref: "/radiofrequency-ablation",
    relatedLabel: "Radiofrequency Ablation",
  },
  {
    slug: "spinal-cord-stimulator-trial-works",
    title: "How a Spinal Cord Stimulator Trial Works",
    excerpt:
      "The trial is the point: a temporary lead lets you test the therapy for days before anything is implanted. What the week involves, and how success is judged.",
    image: "blog-spinal-cord-stimulator-trial.jpg",
    alt: "Illustration of spinal cord stimulator leads and pulse generator along the lower spine",
    category: "Procedures",
    datePublished: "2023-11-20",
    dateModified: "2025-04-02",
    lastReviewed: "2026-09-25",
    readTime: "4 min read",
    relatedHref: "/spinal-cord-stimulation-specialist",
    relatedLabel: "Spinal Cord Stimulation",
  },
  {
    slug: "how-long-does-it-take-to-feel-better-after-kyphoplasty",
    title: "How Long Does It Take to Feel Better After Kyphoplasty?",
    seoTitle: "How long does kyphoplasty recovery take?",
    excerpt:
      "Most people notice a change within a day or two of a vertebral compression fracture being stabilized. What the first week looks like, and what slows it down.",
    image: "blog-kyphoplasty-recovery-timeline.jpg",
    alt: "Illustration of a kyphoplasty balloon expanding a collapsed vertebra",
    category: "Recovery",
    datePublished: "2023-08-07",
    dateModified: "2025-04-02",
    lastReviewed: "2026-09-25",
    readTime: "3 min read",
    relatedHref: "/kyphoplasty-specialist",
    relatedLabel: "Kyphoplasty",
  },
  {
    slug: "understanding-stellate-ganglion-block",
    title: "Understanding Stellate Ganglion Block: A Path to Pain Relief",
    seoTitle: "What a stellate ganglion block treats",
    excerpt:
      "An injection near a cluster of sympathetic nerves in the neck. It both diagnoses and treats — CRPS, shingles pain, phantom limb pain and some facial pain.",
    image: "blog-stellate-ganglion-block.jpg",
    alt: "Cervical spine highlighted on a person holding the back of their neck",
    category: "Procedures",
    datePublished: "2024-01-05",
    dateModified: "2025-03-06",
    lastReviewed: "2026-09-25",
    readTime: "3 min read",
    relatedHref: "/injections-blocks-specialist",
    relatedLabel: "Injections & Nerve Blocks",
  },
  {
    slug: "intracept-procedure-for-chronic-low-back-pain",
    title: "Intracept Procedure for Chronic Low Back Pain",
    excerpt:
      "Vertebrogenic pain comes from the vertebral endplates, not the disc or facet. Intracept ablates the basivertebral nerve that carries it, implanting nothing.",
    image: "blog-intracept-procedure.jpg",
    alt: "Illustration of a probe reaching the basivertebral nerve inside a vertebral body",
    category: "Procedures",
    datePublished: "2026-04-07",
    lastReviewed: "2026-09-25",
    readTime: "2 min read",
    relatedHref: "/intracept-procedure",
    relatedLabel: "Intracept Procedure",
  },
];

/**
 * The posts that may actually render. A migrated post lands in `blogPosts` with
 * its body and metadata but no `lastReviewed` date, and stays out of the routes
 * and the index until a physician has read it — so unreviewed clinical content
 * cannot reach the site even by accident. Adding the date publishes the post.
 */
export const publishedPosts = blogPosts.filter((post) => post.lastReviewed);
