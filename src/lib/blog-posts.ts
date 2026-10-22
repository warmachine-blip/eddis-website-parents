import { ablationBlogFaqs, stellateBlockFaqs, stimulatorTrialFaqs } from "./page-faqs";

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
  /** Visible FAQ, also emitted as FAQPage JSON-LD. Every answer needs physician review. */
  faqs?: { q: string; a: string }[];
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
    author: "physician",
    readTime: "4 min read",
    relatedHref: "/radiofrequency-ablation",
    relatedLabel: "Radiofrequency Ablation",
  },
  {
    slug: "understanding-radiofrequency-ablation",
    title: "What if Radiofrequency Ablation Doesn’t Work?",
    seoTitle: "What if Radiofrequency Ablation Doesn't Work? Next Steps",
    excerpt:
      "Why radiofrequency ablation sometimes gives less relief than hoped, how a pain doctor looks for the reason, and the other options worth discussing.",
    image: "blog-radiofrequency-ablation-next-steps.jpg",
    alt: "Illustration of radiofrequency probes targeting the nerves around a knee and a hip",
    category: "Procedures",
    datePublished: "2023-10-13",
    dateModified: "2025-04-02",
    lastReviewed: "2026-09-25",
    author: "physician",
    readTime: "3 min read",
    relatedHref: "/radiofrequency-ablation",
    relatedLabel: "Radiofrequency Ablation",
    faqs: ablationBlogFaqs,
  },
  {
    slug: "spinal-cord-stimulator-trial-works",
    title: "How a Spinal Cord Stimulator Trial Works",
    seoTitle: "Spinal Cord Stimulator Trial: How It Works, Step by Step",
    excerpt:
      "A spinal cord stimulator trial tests the therapy with temporary leads for about a week before any implant decision. What happens at each step.",
    image: "blog-spinal-cord-stimulator-trial.jpg",
    alt: "Illustration of spinal cord stimulator leads and pulse generator along the lower spine",
    category: "Procedures",
    datePublished: "2023-11-20",
    dateModified: "2025-04-02",
    lastReviewed: "2026-09-25",
    author: "physician",
    readTime: "4 min read",
    relatedHref: "/spinal-cord-stimulation-specialist",
    relatedLabel: "Spinal Cord Stimulation",
    faqs: stimulatorTrialFaqs,
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
    author: "physician",
    readTime: "3 min read",
    relatedHref: "/kyphoplasty-specialist",
    relatedLabel: "Kyphoplasty",
  },
  {
    slug: "understanding-stellate-ganglion-block",
    title: "Stellate Ganglion Block: What It Treats and What to Expect",
    excerpt:
      "An injection near a group of nerves in the neck, used to diagnose and treat some nerve-related pain. Who it may help, how it is done and recovery.",
    image: "blog-stellate-ganglion-block.jpg",
    alt: "Cervical spine highlighted on a person holding the back of their neck",
    category: "Procedures",
    datePublished: "2024-01-05",
    dateModified: "2025-03-06",
    lastReviewed: "2026-09-25",
    author: "physician",
    readTime: "3 min read",
    relatedHref: "/injections-blocks-specialist",
    relatedLabel: "Injections & Nerve Blocks",
    faqs: stellateBlockFaqs,
  },
  {
    slug: "intracept-procedure-for-chronic-low-back-pain",
    title: "Basivertebral Nerve Ablation (BVN) for Chronic Back Pain",
    excerpt:
      "Vertebrogenic pain comes from the vertebral endplates, not the disc or facet. Basivertebral nerve ablation (BVN) targets that nerve and leaves no implant.",
    image: "blog-intracept-procedure.jpg",
    alt: "Illustration of a probe reaching the basivertebral nerve inside a vertebral body",
    category: "Procedures",
    datePublished: "2026-04-07",
    lastReviewed: "2026-09-25",
    author: "physician",
    readTime: "2 min read",
    relatedHref: "/intracept-procedure",
    relatedLabel: "Basivertebral Nerve Ablation (BVN)",
  },
  {
    slug: "when-back-pain-needs-a-specialist",
    title: "Acute, Subacute or Chronic: When Back Pain Needs a Specialist",
    seoTitle: "When to see a doctor for back pain",
    excerpt:
      "Most back pain eases within weeks. Here is how doctors tell acute pain from chronic pain, which symptoms need prompt attention, and what an evaluation involves.",
    image: "clinician-palpating-lower-back-seated-patient.jpg",
    alt: "A clinician in mint-green scrubs examines the lower back of a woman seated on an exam table.",
    category: "Conditions",
    datePublished: "2026-10-20",
    lastReviewed: "2026-10-20",
    author: "physician",
    readTime: "4 min read",
    relatedHref: "/back-pain",
    relatedLabel: "Back Pain",
  },
];

/**
 * The posts that may actually render. A migrated post lands in `blogPosts` with
 * its body and metadata but no `lastReviewed` date, and stays out of the routes
 * and the index until a physician has read it — so unreviewed clinical content
 * cannot reach the site even by accident. Adding the date publishes the post.
 */
export const publishedPosts = blogPosts.filter((post) => post.lastReviewed);
