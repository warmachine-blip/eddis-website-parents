export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  category: string;
  date: string;
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

export const blogPosts: BlogPost[] = [
  {
    slug: "facet-joint-pain-radiofrequency-ablation",
    title: "When does facet joint pain warrant radiofrequency ablation?",
    excerpt:
      "Diagnostic medial branch blocks remain the gold standard. Here's how we use them — and what it tells us about who is likely to respond well.",
    image: "blog-radiofrequency-ablation.jpg",
    alt: "Radiofrequency ablation for facet joint pain",
    category: "Spine",
    date: "Feb 24, 2026",
    readTime: "5 min read",
    relatedHref: "/radiofrequency-ablation",
    relatedLabel: "Radiofrequency Ablation",
  },
  {
    slug: "first-week-after-spinal-cord-stimulation",
    title: "What to expect in the first week after spinal cord stimulation.",
    excerpt:
      "From the moment the trial leads come out to the first programming session — a realistic, day-by-day guide for new SCS patients.",
    image: "blog-spinal-cord-stimulation.jpg",
    alt: "Spinal cord stimulation recovery",
    category: "Recovery",
    date: "Mar 18, 2026",
    readTime: "6 min read",
    relatedHref: "/spinal-cord-stimulation-specialist",
    relatedLabel: "Spinal Cord Stimulation",
  },
  {
    slug: "vertebrogenic-pain-missed-diagnosis",
    title: "Vertebrogenic pain: the diagnosis that's still being missed.",
    excerpt:
      "MRI Modic changes are a critical clue. Here's how to think about vertebrogenic low-back pain — and why Intracept matters.",
    image: "blog-treatment-options-for-spinal-stenosis.jpg",
    alt: "Vertebrogenic low-back pain diagnosis",
    category: "Conditions",
    date: "Apr 9, 2026",
    readTime: "4 min read",
    relatedHref: "/intracept-procedure",
    relatedLabel: "Intracept Procedure",
  },
  {
    slug: "questions-before-starting-pain-medication",
    title: "Five questions to ask before starting any pain medication.",
    excerpt:
      "Long-term medications come with trade-offs. We walk through the questions every patient should be asking.",
    image: "blog-interventional-pain-management.jpg",
    alt: "Pain medication and interventional pain management",
    category: "Lifestyle",
    date: "May 28, 2026",
    readTime: "3 min read",
    relatedHref: "/patients",
    relatedLabel: "Patient Resources",
  },
  {
    slug: "prp-therapy-where-the-evidence-is",
    title: "PRP therapy in 2026: where the evidence actually is.",
    excerpt:
      "PRP is more than a buzzword. We break down the conditions where the evidence is strong — and where it isn't yet.",
    image: "treatment-prp-procedure.jpg",
    alt: "Platelet-rich plasma (PRP) therapy",
    category: "Procedures",
    date: "Jun 15, 2026",
    readTime: "5 min read",
    relatedHref: "/prp-procedure",
    relatedLabel: "PRP (Platelet-Rich Plasma)",
  },
  {
    slug: "er-to-5k-kyphoplasty-recovery",
    title: "From the ER to her first 5K: a kyphoplasty patient's recovery.",
    excerpt:
      "After a vertebral fracture took her off her feet, our patient walked back into running through a careful, staged plan.",
    image: "blog-kyphoplasty.jpg",
    alt: "Kyphoplasty patient recovery story",
    category: "Patient Stories",
    date: "Jul 4, 2026",
    readTime: "6 min read",
    relatedHref: "/kyphoplasty-specialist",
    relatedLabel: "Kyphoplasty",
  },
];
