export type Condition = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  /**
   * Kept live, indexable and in the Conditions menu, but not surfaced on the
   * homepage and sorted last on the Pain Center hub.
   */
  deEmphasized?: boolean;
};

export const conditions: Condition[] = [
  {
    slug: "neuropathic-pain",
    href: "/neuropathic-pain",
    title: "Neuropathic Pain",
    summary: "Burning, electric, or tingling pain caused by injury or irritation of the nerves themselves.",
  },
  {
    slug: "chronic-pain",
    href: "/chronic-pain",
    title: "Chronic Pain",
    summary: "Pain that persists beyond expected healing — and the comprehensive plan it requires.",
  },
  {
    slug: "pelvic-pain",
    href: "/pelvic-pain",
    title: "Pelvic Pain",
    summary: "A complex region requiring careful, compassionate diagnosis and treatment.",
    deEmphasized: true,
  },
  {
    slug: "joint-pain",
    href: "/joint-pain",
    title: "Joint Pain",
    summary: "From shoulder to hip — image-guided care for the joints that move you.",
  },
  {
    slug: "knee-pain",
    href: "/knee-pain",
    title: "Knee Pain",
    summary: "Arthritis, tendon pain, and knees that still hurt after surgery, from the cartilage to the nerves that supply the joint.",
  },
  {
    slug: "neck-pain",
    href: "/neck-pain",
    title: "Neck Pain",
    summary: "Stiffness, headaches, and arm pain traced back to the joints or nerves of the cervical spine.",
  },
  {
    slug: "back-pain",
    href: "/back-pain",
    title: "Back Pain",
    summary: "The back has several structures that can produce the same ache. The first visit is about finding which one.",
  },
  {
    slug: "other-pain-conditions",
    href: "/other-pain-conditions",
    title: "Other Pain Conditions",
    summary: "Headaches, abdominal pain, post-surgical pain, CRPS, and more.",
  },
  {
    slug: "sciatica",
    href: "/sciatica",
    title: "Sciatica",
    summary: "Radiating leg pain from compression or irritation of the sciatic nerve.",
  },
  {
    slug: "herniated-discs",
    href: "/herniated-discs",
    title: "Herniated Discs",
    summary: "When the soft inner disc material pushes through the outer wall and irritates a nerve.",
  },
  {
    slug: "spinal-stenosis",
    href: "/spinal-stenosis",
    title: "Spinal Stenosis",
    summary: "Narrowing of the spinal canal that compresses nerves and limits walking.",
  },
  {
    slug: "hip-pain",
    href: "/hip-pain",
    title: "Hip Pain",
    summary: "From bursitis to osteoarthritis — image-guided care for the hip joint.",
  },
  {
    slug: "shoulder-injuries",
    href: "/shoulder-injuries",
    title: "Shoulder Injuries",
    summary: "Rotator cuff, labrum, and tendon issues — diagnosed precisely, treated thoughtfully.",
  },
  {
    slug: "migraines",
    href: "/migraines",
    title: "Migraines & Chronic Headache",
    summary: "Not every headache is a migraine, and which one you have decides the treatment.",
  },
  {
    slug: "fibromyalgia",
    href: "/fibromyalgia",
    title: "Fibromyalgia",
    summary: "A whole-person condition that benefits from a coordinated, individualized plan.",
  },
  {
    slug: "sports-injuries",
    href: "/sports-injuries",
    title: "Sports Injuries",
    summary: "Get back to your sport — with diagnostics and biologics that respect the timeline.",
  },
  {
    slug: "post-surgical-pain",
    href: "/post-surgical-pain",
    title: "Post-Surgical Pain",
    summary: "Pain that outlasts the surgery, whether or not it went well. Almost always a specific cause, rarely another operation.",
  },
];
