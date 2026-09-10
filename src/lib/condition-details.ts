import { conditions } from "./conditions";

export type ConditionDetail = {
  slug: string;
  title: string;
  /** 120-160 char meta description; not rendered on the page. */
  metaDescription: string;
  /** ISO date of the physician review shown in this page's byline. */
  lastReviewed: string;
  /** The sentence under the h1 in the hero. */
  leadLine: string;
  heroImage: string;
  heroImageAlt: string;
  intro: string;
  /**
   * Optional richer form of `intro`: when present, each entry renders as its
   * own paragraph in the "Understanding {condition}." section instead of the
   * single `intro` string. Used only by the enriched condition pages.
   */
  introParagraphs?: string[];
  symptoms: string[];
  causes: string[];
  approachIntro: string;
  /**
   * `href`/`slug` optional: a card without a matching real service page
   * renders as a plain (non-link) card — e.g. "Multimodal Plan" style cards
   * that describe an approach rather than link to a dedicated service.
   */
  approachServices: { slug?: string; title: string; blurb: string }[];
  relatedConditions: { slug: string; title: string; blurb: string }[];
  /** Optional enriched sections — rendered only when present. */
  diagnosisWorkup?: string[];
  whenToSeeSpecialist?: string[];
  recoveryOutlook?: string;
  faqs?: { q: string; a: string }[];
  philosophyBlurb?: string;
};

/**
 * Topical adjacency for the "Other conditions we treat" module. Previously every
 * page showed the same four hub conditions, so 13 of 18 condition pages had no
 * inbound link from any peer. These clusters point a reader at what they would
 * plausibly look at next, and every slug appears in at least three other lists.
 */
const relatedSlugs: Record<string, string[]> = {
  "back-pain": ["sciatica", "herniated-discs", "spinal-stenosis", "neck-pain", "post-surgical-pain"],
  "neck-pain": ["back-pain", "herniated-discs", "migraines", "shoulder-injuries"],
  "sciatica": ["herniated-discs", "spinal-stenosis", "back-pain", "neuropathic-pain"],
  "herniated-discs": ["sciatica", "back-pain", "neck-pain", "spinal-stenosis"],
  "spinal-stenosis": ["sciatica", "back-pain", "herniated-discs", "neuropathic-pain"],
  "joint-pain": ["knee-pain", "hip-pain", "shoulder-injuries", "sports-injuries"],
  "knee-pain": ["joint-pain", "hip-pain", "sports-injuries", "shoulder-injuries"],
  "hip-pain": ["joint-pain", "knee-pain", "back-pain", "sports-injuries"],
  "shoulder-injuries": ["joint-pain", "sports-injuries", "neck-pain", "knee-pain"],
  "sports-injuries": ["knee-pain", "shoulder-injuries", "joint-pain", "hip-pain"],
  "neuropathic-pain": ["sciatica", "chronic-pain", "fibromyalgia", "post-surgical-pain"],
  "chronic-pain": ["neuropathic-pain", "fibromyalgia", "post-surgical-pain", "other-pain-conditions"],
  "fibromyalgia": ["chronic-pain", "neuropathic-pain", "migraines", "other-pain-conditions"],
  "migraines": ["neck-pain", "neuropathic-pain", "chronic-pain", "fibromyalgia", "other-pain-conditions"],
  "post-surgical-pain": ["neuropathic-pain", "chronic-pain", "back-pain"],
  "pelvic-pain": ["neuropathic-pain", "chronic-pain", "other-pain-conditions"],
  "other-pain-conditions": ["chronic-pain", "neuropathic-pain", "migraines"],
};

/** Cards are built from the canonical condition list so titles and blurbs cannot drift. */
function relatedFor(selfSlug: string) {
  return (relatedSlugs[selfSlug] ?? []).map((slug) => {
    const c = conditions.find((x) => x.slug === slug);
    if (!c) throw new Error(`relatedFor(${selfSlug}): unknown condition "${slug}"`);
    return { slug: c.slug, title: c.title, blurb: c.summary };
  });
}

export const conditionDetails: Record<string, ConditionDetail> = {
  "back-pain": {
    slug: "back-pain",
    title: "Back Pain",
    metaDescription: "Back pain treatment in Houston and Humble. We find the source — disc, facet, SI joint, or nerve — then treat it with targeted, minimally invasive care.",
    lastReviewed: "2026-09-10",
    leadLine: "The most common reason patients come to us — and where we have the most to offer.",
    heroImage: "woman-from-behind-hand-on-lower-back-outdoors.jpg",
    heroImageAlt: "Woman in black athletic wear seen from behind outdoors, pressing one hand to her lower back.",
    intro:
      "Most adults will experience meaningful back pain at some point. The right care begins with the right diagnosis: is the pain coming from the disc, the facet joint, the SI joint, the endplate, or the nerve? Each of those answers points to a different — and far more effective — treatment.",
    introParagraphs: [
      "Back pain is the most common reason patients come to us, and the least useful diagnosis they arrive with. \"Low back pain\" names a location, not a cause. The lumbar spine has several structures that can generate pain independently — the disc and its vertebral endplates, the facet joints at the back of each segment, the sacroiliac joints at the base, and the nerve roots that exit between them. Each produces a recognizable pattern, and each responds to a different treatment.",
      "That is why the first appointment is spent narrowing the field rather than reaching for a prescription. Where the pain sits, what provokes it, what relieves it, and what your imaging shows will usually shortlist one or two candidates. A diagnostic block then confirms which one is doing the talking. Only after that do we recommend a procedure — because a facet-mediated back is treated very differently from a vertebrogenic one, and the wrong procedure is not a small mistake.",
    ],
    symptoms: [
      "Localized low-back pain",
      "Pain radiating to the buttock or leg",
      "Pain with bending, twisting, or sitting",
      "Morning stiffness or pain after prolonged standing",
    ],
    causes: [
      "Disc herniation or degenerative disc disease",
      "Facet joint arthropathy",
      "Sacroiliac joint dysfunction",
      "Vertebrogenic pain (Modic changes)",
      "Compression fractures",
    ],
    approachIntro: "How we approach back pain.",
    approachServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Radiofrequency Ablation",
        blurb: "Durable relief for confirmed facet- or SI-mediated pain.",
      },
      {
        slug: "intracept-procedure",
        title: "Intracept Procedure",
        blurb: "Implant-free relief for vertebrogenic low-back pain.",
      },
      {
        slug: "spinal-cord-stimulation-specialist",
        title: "Spinal Cord Stimulation",
        blurb: "For persistent axial back pain, post-surgical pain, or radicular pain.",
      },
      {
        slug: "si-joint-fusions",
        title: "SI Joint Fusion",
        blurb: "When diagnostic blocks confirm the sacroiliac joint as the pain source.",
      },
      {
        slug: "minuteman-procedure",
        title: "Minuteman Lumbar Fusion",
        blurb: "Posterior, minimally invasive stabilization when imaging shows a lumbar segment that would benefit from it.",
      },
      {
        slug: "kyphoplasty-specialist",
        title: "Kyphoplasty",
        blurb: "Stabilizes a painful vertebral compression fracture.",
      },
    ],
    diagnosisWorkup: [
      "Detailed history — where the pain sits, what provokes it, and whether it radiates below the knee.",
      "Physical exam including range of motion, provocative facet and SI maneuvers, and a neurologic screen.",
      "Review of existing imaging; MRI when the pattern suggests disc, nerve, or endplate involvement.",
      "Diagnostic medial branch blocks when facet-mediated pain is suspected — two separate blocks are required before radiofrequency ablation.",
      "Diagnostic sacroiliac injection when pain localizes to the buttock and provocative testing is positive.",
    ],
    whenToSeeSpecialist: [
      "Back pain past 6 weeks despite physical therapy, activity modification, and oral medication.",
      "Pain radiating into the leg, or numbness and weakness anywhere below the waist.",
      "Pain that wakes you at night or prevents a full day of work.",
      "A prior spine surgery that helped less than expected, or not at all.",
      "Back pain with fever, unexplained weight loss, or bowel or bladder change — seek care immediately.",
    ],
    recoveryOutlook:
      "Timelines depend entirely on the source. Facet-mediated pain confirmed on two diagnostic blocks is treated with radiofrequency ablation: the procedure itself takes about 15 minutes, most patients return to light activity the next day, and full benefit is reached at about the 6-week mark, commonly lasting 6 to 18 months and repeatable. Vertebrogenic pain treated with Intracept follows a different arc — light activity within a day or two, and most patients back to work inside two weeks. Sacroiliac pain that has failed conservative care may lead to SI joint fusion, where most patients walk unassisted the same day and reach full activity between 6 and 12 weeks. We give you the timeline for your diagnosis, not an average.",
    faqs: [
      {
        q: "Do I need an MRI before my first visit?",
        a: "No. Bring whatever imaging you already have and we will tell you whether more is needed. Imaging findings are common in people without pain, so an MRI is most useful once the exam has given us a specific question to ask of it.",
      },
      {
        q: "Why are two blocks needed before radiofrequency ablation?",
        a: "Two separate diagnostic medial branch blocks on different days confirm that the small nerves we plan to treat are genuinely the source. Both must provide meaningful relief. This is the standard before ablation and what insurers require — and if the blocks do not help, ablation is unlikely to, so we look elsewhere.",
      },
      {
        q: "Is my back pain coming from a disc?",
        a: "Sometimes, but less often than people expect. Disc herniation more typically produces leg pain than back pain. Pain centered in the back itself is more often facet, sacroiliac, or vertebrogenic in origin — which is what the diagnostic workup is for.",
      },
      {
        q: "Will I need surgery?",
        a: "Most patients we see do not. A large part of this practice is people who were told surgery was the only option and who had not yet had a specific diagnosis. When surgery genuinely is the right answer, we say so and refer.",
      },
      {
        q: "Can I keep exercising?",
        a: "In almost all cases yes, and you should. Prolonged rest makes back pain worse. What changes is the type and the load, not whether you move — and we will be specific about that once we know the cause.",
      },
      {
        q: "How long do injections last?",
        a: "It varies by the injection and the problem. A therapeutic epidural or joint injection often gives weeks to months of relief. A diagnostic block is deliberately short-acting, because its job is to answer a question rather than to treat.",
      },
      {
        q: "What if I have had back pain for years?",
        a: "Duration alone rules nothing out. Long-standing pain still has a source, and a structured diagnostic workup is often the first one a patient has had. We are candid when the realistic goal is better function rather than complete resolution.",
      },
    ],
    philosophyBlurb:
      "There is no single back pain procedure, and any practice offering one is guessing. Dr. Baumgartner's approach is to name the pain generator before treating it — history, exam, imaging, and where needed a diagnostic block that has to actually confirm the hypothesis. It sometimes takes an extra visit. It also avoids the far more expensive mistake of a well-executed procedure on the wrong structure.",
    relatedConditions: relatedFor("back-pain"),
  },

  "neuropathic-pain": {
    slug: "neuropathic-pain",
    title: "Neuropathic Pain",
    metaDescription: "Burning, electric, or tingling nerve pain treated in Houston and Humble — from diabetic neuropathy to CRPS, with nerve blocks, ablation, and stimulation.",
    lastReviewed: "2026-09-10",
    leadLine: "Burning, electric, or tingling pain caused by injury or irritation of the nerves themselves.",
    heroImage: "clinician-examining-patient-foot.jpg",
    heroImageAlt: "A clinician in blue scrubs presses both thumbs into the sole of a patient's bare foot resting on a white towel in a clinic room.",
    intro:
      "Neuropathic pain originates from the nervous system itself — not from tissue damage. It is often described as burning, electric, shooting, or tingling, and it can be persistent and life-limiting. The right diagnosis is essential because neuropathic pain typically does not respond to standard anti-inflammatory treatments.",
    introParagraphs: [
      "Neuropathic pain comes from the nervous system itself rather than from damaged tissue, and it behaves differently because of it. Patients describe burning, electric shocks, crawling, or an area that is numb and painful at the same time. Light touch — a bedsheet, a sock, a shirt seam — can be intolerable while firm pressure is not. It frequently worsens at night, when there is nothing else to attend to.",
      "It also does not respond to the treatments that work for tissue pain. Anti-inflammatories do relatively little, and escalating opioids tends to produce side effects rather than relief. What does help is identifying which nerves are involved and treating at that level — with medication chosen for nerve pain, targeted blocks, and, for refractory cases, neuromodulation.",
    ],
    symptoms: [
      "Burning, electric, or shooting pain",
      "Tingling, pins-and-needles, or numbness",
      "Sensitivity to light touch (allodynia)",
      "Pain that worsens at night or with rest",
    ],
    causes: [
      "Diabetic peripheral neuropathy",
      "Postherpetic neuralgia (after shingles)",
      "Nerve injury after surgery or trauma",
      "Radiculopathy from spine pathology",
      "Complex regional pain syndrome (CRPS)",
    ],
    approachIntro: "How we approach neuropathic pain.",
    approachServices: [
      {
        slug: "spinal-cord-stimulation-specialist",
        title: "Spinal Cord Stimulation",
        blurb: "Among the most effective therapies for refractory neuropathic pain.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Targeted Nerve Blocks",
        blurb: "Diagnostic and therapeutic for sympathetic-mediated pain.",
      },
    ],
    diagnosisWorkup: [
      "History of the character, distribution, and timing of the pain — burning and electric qualities point away from tissue pain.",
      "Neurologic examination mapping sensory change, allodynia, weakness, and reflexes.",
      "Identification of an underlying cause where one exists — diabetes, prior shingles, surgery, trauma, or spine pathology.",
      "MRI of the relevant spinal region when a radicular pattern suggests nerve root involvement.",
      "Diagnostic nerve or sympathetic block to confirm the pain pathway before committing to a longer-term therapy.",
    ],
    whenToSeeSpecialist: [
      "Burning or electric pain that has not responded to first-line nerve pain medication.",
      "Pain following shingles that persists after the rash has healed.",
      "Numbness or burning in the feet or hands from diabetes that is limiting sleep or walking.",
      "Color, temperature, or swelling changes in a limb after injury or surgery — assess early, as CRPS responds better to early treatment.",
      "Escalating medication doses without a matching improvement in function.",
    ],
    recoveryOutlook:
      "Neuropathic pain is usually managed rather than cured, and honest expectations matter. Sympathetic and peripheral nerve blocks can provide meaningful relief and, just as importantly, tell us whether the pathway we suspect is the right one. Spinal cord stimulation has the strongest evidence for refractory cases and is FDA-approved for painful diabetic peripheral neuropathy. You try it first through a 5 to 7 day temporary trial at home, and we proceed to an implant only if it reduces your pain by at least 50% and improves function. After implant, light activity for 4 to 6 weeks while the leads anchor, and most patients return to work within 1 to 2 weeks. The system is fully reversible.",
    faqs: [
      {
        q: "Why do anti-inflammatories not help my nerve pain?",
        a: "Because there is often nothing inflamed. Neuropathic pain is generated by nerve signaling itself, which is why medications developed for nerve pain, targeted blocks, and neuromodulation tend to work where anti-inflammatories do not.",
      },
      {
        q: "Is diabetic neuropathy treatable?",
        a: "The nerve damage is generally not reversible, but the pain frequently is treatable. Glucose control remains the foundation. For pain that persists despite medication, spinal cord stimulation is FDA-approved for painful diabetic peripheral neuropathy and has strong published outcomes.",
      },
      {
        q: "What is CRPS, and why does early treatment matter?",
        a: "Complex regional pain syndrome is a disproportionate pain response after an injury or surgery, often with color, temperature, and swelling changes. It responds better the earlier it is addressed, which is why we would rather see someone early than confirm it late.",
      },
      {
        q: "Will spinal cord stimulation work for me?",
        a: "You find out before committing. The trial places temporary leads for 5 to 7 days at home. If it reduces your pain by at least 50% and improves function, we proceed to an implant; if it does not, the leads are removed in seconds in the office and we look at other options.",
      },
      {
        q: "Is the stimulator permanent?",
        a: "No. SCS is fully reversible — both the trial and the permanent system can be removed. Modern systems are also MRI-conditional, and the device manufacturer provides a wallet card with the exact parameters your imaging facility needs.",
      },
      {
        q: "Will I feel the stimulation?",
        a: "Modern paresthesia-free waveforms deliver relief without the tingling older systems produced. Most patients are unaware of the device working in the background.",
      },
      {
        q: "Do I have to stop my pain medication?",
        a: "We do not require it. Most patients find they need significantly less after a successful trial and implant, and we coordinate any changes with you over time rather than imposing them.",
      },
    ],
    philosophyBlurb:
      "Nerve pain is where guessing costs the most, because the wrong treatment is not merely ineffective — it delays the right one while the pain becomes more established. We diagnose it as a pathway rather than a location, confirm that pathway with a block where the answer is not clear, and stay candid about the difference between eliminating pain and restoring function.",
    relatedConditions: relatedFor("neuropathic-pain"),
  },

  "chronic-pain": {
    slug: "chronic-pain",
    title: "Chronic Pain",
    metaDescription: "Chronic pain care in Houston and Humble for pain that outlasts healing. Double board-certified diagnosis and a plan built to reduce medication reliance.",
    lastReviewed: "2026-09-10",
    leadLine: "Pain that persists beyond expected healing — and the comprehensive plan it requires.",
    heroImage: "older-woman-seated-on-sofa-head-down-hands-over-face.jpg",
    heroImageAlt: "An older woman with gray hair sits on the edge of a beige sofa in jeans and a white shirt, head bowed with both hands covering her face.",
    intro:
      "Chronic pain is pain that has lasted longer than three months — long past the point where typical injury or surgery should have healed. It is its own medical condition and requires a comprehensive plan that often blends interventional procedures, rehabilitation, and lifestyle medicine.",
    introParagraphs: [
      "Chronic pain — pain lasting beyond three months, past the point where an injury or operation should have healed — is not simply acute pain that went on too long. The nervous system changes under sustained input: pain thresholds fall, unrelated areas become sensitive, sleep degrades, and the pain begins to sustain itself somewhat independently of whatever started it.",
      "That has two consequences for treatment. First, there is usually still a structural driver worth finding and treating, and many patients arrive having never had a specific diagnosis. Second, treating that driver alone is often not enough. A plan that addresses the source, restores sleep and movement, and reduces reliance on long-term medication outperforms any single procedure.",
    ],
    symptoms: [
      "Persistent pain longer than 3 months",
      "Pain that limits work, sleep, or relationships",
      "Multiple unsuccessful prior treatments",
      "Reliance on long-term oral pain medications",
    ],
    causes: [
      "Spine-related pathology (disc, facet, stenosis)",
      "Post-surgical pain",
      "Fibromyalgia and central sensitization",
      "Joint degeneration",
      "Untreated or undertreated nerve injury",
    ],
    approachIntro: "How we approach chronic pain.",
    approachServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Radiofrequency Ablation",
        blurb: "Lasting relief for facet- and SI-mediated pain.",
      },
      {
        slug: "spinal-cord-stimulation-specialist",
        title: "Spinal Cord Stimulation",
        blurb: "When pain has not responded to conservative care.",
      },
      {
        slug: "minuteman-procedure",
        title: "Minuteman Lumbar Fusion",
        blurb: "For lumbar pain that has not responded to physical therapy and injections over 6+ months.",
      },
      {
        slug: "peptides",
        title: "Wellness & Peptides",
        blurb: "Physician-supervised peptide therapy and weight-loss support alongside interventional care — a dedicated page is coming soon.",
      },
    ],
    diagnosisWorkup: [
      "A full history of the pain from onset — what started it, how it has changed, and what has been tried.",
      "Review of prior imaging, procedures, and medication trials, including what helped and for how long.",
      "Physical examination looking for a remaining treatable structural source rather than assuming there is none.",
      "Targeted imaging where the exam raises a specific question that would change the plan.",
      "Diagnostic blocks to confirm a suspected pain generator before committing to a durable procedure.",
    ],
    whenToSeeSpecialist: [
      "Pain that has lasted more than three months despite treatment.",
      "Escalating medication without a matching improvement in function.",
      "Several previous treatments that helped briefly or not at all.",
      "Pain that is costing you sleep, work, or the ability to do what you value.",
      "You have been told there is nothing more to do and have never had a specific diagnosis.",
    ],
    recoveryOutlook:
      "Progress in chronic pain is measured in function as much as in pain scores — sleeping through the night, working a full day, walking further than last month. Where a specific generator is confirmed, the procedure timelines are the same as anywhere else: radiofrequency ablation takes about 15 minutes, reaches full benefit at about the 6-week mark, and commonly gives 6 to 18 months of relief; spinal cord stimulation is trialed for 5 to 7 days before any implant. Where no single generator explains everything, we sequence — treat what is treatable, rebuild capacity alongside it, and reassess. We would rather make consistent, measurable progress at each step than promise a single fix.",
    faqs: [
      {
        q: "Is chronic pain a diagnosis or a symptom?",
        a: "Both. It is a symptom of whatever started it and, once established, a condition in its own right, with changes in how the nervous system processes signals. Good treatment addresses both layers.",
      },
      {
        q: "Can chronic pain be cured?",
        a: "Sometimes, when a specific and treatable source is found. More often the realistic goal is substantial reduction and a return to function. We are direct about which of those we think applies to you.",
      },
      {
        q: "I have been told nothing more can be done. Is that true?",
        a: "It depends what has actually been tried. A large part of this practice is patients who never received a specific diagnosis — no diagnostic blocks, no assessment of the facet or sacroiliac joints, no consideration of neuromodulation. Sometimes there really is nothing more; often there is.",
      },
      {
        q: "Will you take me off my pain medication?",
        a: "Not abruptly, and not as a precondition. Reducing reliance on long-term medication is a goal of interventional treatment rather than a requirement for it, and any changes are made with you over time.",
      },
      {
        q: "How many procedures will I need?",
        a: "It depends on what we find. Some patients need one well-targeted procedure. Others need a sequence, each answering a question. We tell you the plan and the decision point in advance rather than leaving it open-ended.",
      },
      {
        q: "Does chronic pain mean it is in my head?",
        a: "No. The nervous system changes are real and measurable. Stress, sleep, and mood genuinely affect pain, which is why we address them — but that is a statement about biology, not about whether your pain is real.",
      },
      {
        q: "What if my pain is in several places?",
        a: "Widespread pain raises different questions, including central sensitization and inflammatory causes. We will say so and coordinate with rheumatology or primary care rather than treating each site as an isolated problem.",
      },
    ],
    philosophyBlurb:
      "The most common thing missing from a long chronic pain history is a specific diagnosis. Before adding another treatment to the list, we go back and ask what is actually generating the pain and confirm it — and then we are honest about what interventional care can and cannot deliver. Consistent, measurable progress at each step beats a promised cure.",
    relatedConditions: relatedFor("chronic-pain"),
  },

  "pelvic-pain": {
    slug: "pelvic-pain",
    title: "Pelvic Pain",
    metaDescription: "Chronic pelvic pain treatment in Houston and Humble. Careful diagnosis of a complex region, with image-guided blocks and neuromodulation when they fit.",
    lastReviewed: "2026-09-10",
    leadLine: "A complex region requiring careful, compassionate diagnosis and treatment.",
    heroImage: "treatment-pelvic-pain-treatment.jpg",
    heroImageAlt: "Pelvic pain treatment at HTx Pain Institute",
    intro:
      "Chronic pelvic pain crosses gynecologic, urologic, gastrointestinal, and neurologic boundaries, which is why it is so often missed. We focus on the nerve, joint, and musculoskeletal contributors that are most amenable to interventional therapies — typically alongside your existing specialist team.",
    introParagraphs: [
      "Chronic pelvic pain sits across gynecology, urology, gastroenterology, colorectal surgery, and neurology, which is why it is so often passed between specialties without resolution. Patients frequently arrive having had a laparoscopy, a cystoscopy, and a colonoscopy that were individually reassuring and collectively unhelpful.",
      "What is commonly missed is the musculoskeletal and neural layer — the pudendal nerve, the sacroiliac joints, the coccyx, the sympathetic plexuses, and the pelvic floor musculature. Those are the contributors interventional pain medicine can address, and they are what we focus on, working alongside your existing specialists rather than replacing them.",
    ],
    symptoms: [
      "Persistent pelvic, perineal, or groin pain",
      "Pain with sitting or intercourse",
      "Bladder, bowel, or pelvic-floor dysfunction",
      "Pain after pelvic surgery or childbirth",
    ],
    causes: [
      "Pudendal neuralgia",
      "Sacroiliac joint dysfunction",
      "Post-surgical nerve injury",
      "Endometriosis-related neural sensitization",
      "Coccydynia",
    ],
    approachIntro: "How we approach pelvic pain.",
    approachServices: [
      {
        slug: "injections-blocks-specialist",
        title: "Targeted Nerve Blocks",
        blurb: "Pudendal, ganglion impar, and superior hypogastric plexus blocks.",
      },
      {
        slug: "spinal-cord-stimulation-specialist",
        title: "Spinal Cord Stimulation",
        blurb: "Considered for chronic refractory pelvic pain.",
      },
    ],
    diagnosisWorkup: [
      "A detailed history including the distribution of pain, positional triggers such as sitting, and bladder, bowel, and sexual function.",
      "Review of what has already been excluded by gynecology, urology, and gastroenterology.",
      "Examination for pelvic floor tension, sacroiliac provocation, coccygeal tenderness, and pudendal nerve distribution.",
      "Imaging directed at a specific question rather than used as a survey.",
      "Diagnostic nerve or plexus block — pudendal, ganglion impar, or superior hypogastric — to confirm the pathway before treating it.",
    ],
    whenToSeeSpecialist: [
      "Pelvic, perineal, or groin pain persisting beyond six months without a clear explanation.",
      "Pain that is markedly worse with sitting and eased by standing.",
      "Pain that began after pelvic surgery, childbirth, or trauma.",
      "A negative gynecologic, urologic, and gastrointestinal workup with pain that continues.",
      "Pain that is limiting work, sleep, or intimacy.",
    ],
    recoveryOutlook:
      "Pelvic pain usually improves in steps rather than all at once. A diagnostic block tells us whether the pathway we suspect is the right one, and that information is valuable even when the relief is temporary. Where a block confirms the source, relief can often be extended with a therapeutic version, and physical therapy does a substantial part of the work alongside it. For pain that remains refractory, spinal cord stimulation is considered and trialed for 5 to 7 days first, so you know whether it helps before anything is implanted. Progress here is measured in sitting tolerance, sleep, and function.",
    faqs: [
      {
        q: "Why has nobody been able to tell me what is wrong?",
        a: "Because the pelvis is shared territory, and each specialty reasonably excludes its own causes first. What often goes unexamined is the neural and musculoskeletal layer — the nerves, joints, and pelvic floor — which is where we start.",
      },
      {
        q: "What is pudendal neuralgia?",
        a: "Pain in the distribution of the pudendal nerve, classically worse with sitting and relieved by standing. A diagnostic pudendal block is both the clearest confirmation and often the first meaningful relief a patient has had.",
      },
      {
        q: "Do you treat endometriosis?",
        a: "Not the endometriosis itself — that stays with your gynecologist. We treat the neural sensitization and musculoskeletal pain that frequently persist after the disease has been addressed, which is a different problem and often the one still limiting people.",
      },
      {
        q: "Can pelvic pain come from the sacroiliac joint?",
        a: "Yes, and it is commonly missed. SI joint pain refers into the buttock, groin, and posterior pelvis. Provocative testing and a diagnostic SI injection settle the question.",
      },
      {
        q: "Will I need a driver?",
        a: "For most pelvic blocks, yes — they are performed with sedation or as spinal injections. We confirm transportation when we schedule so it is not a surprise on the day.",
      },
      {
        q: "Is physical therapy worth it?",
        a: "In our experience it is one of the highest-yield treatments in this area, and it works better once the painful driver has been identified and treated. We refer to physical therapists we work with regularly.",
      },
      {
        q: "Is this pain permanent?",
        a: "Not usually, but it is often long-running by the time we see it, and improvement tends to be gradual. We will tell you what we think is realistically achievable before you commit to anything.",
      },
    ],
    philosophyBlurb:
      "Pelvic pain patients are, more than any other group we see, tired of being handed between specialties. Our role is narrow and specific: identify and treat the neural, joint, and musculoskeletal contributors, be clear about which parts of the problem belong elsewhere, and coordinate with the team you already have rather than compete with it.",
    relatedConditions: relatedFor("pelvic-pain"),
  },

  "joint-pain": {
    slug: "joint-pain",
    title: "Joint Pain",
    metaDescription: "Joint pain treatment in Houston and Humble — shoulder, hip, knee and more. Ultrasound-guided injections, PRP, and radiofrequency ablation where they help.",
    lastReviewed: "2026-09-10",
    leadLine: "From shoulder to hip — image-guided care for the joints that move you.",
    heroImage: "hand-pressing-painful-knee-seated-on-bed.jpg",
    heroImageAlt: "Close-up of a woman seated on a bed in a floral dress pressing her hand against her bare knee.",
    intro:
      "Joint pain — whether from osteoarthritis, tendinopathy, or post-traumatic injury — can erode the everyday life you take for granted. Our image-guided approach delivers therapy directly into the joint, with biologic options like PRP for select cases.",
    introParagraphs: [
      "\"Joint pain\" covers a great deal of ground — a shoulder that will not lift, a hip that aches on stairs, a knee that swells after a walk. What those have in common is not a cause but a method: work out which structure is producing the pain, put the treatment exactly there, and use the least invasive option that genuinely addresses it.",
      "Most joints hurt for one of a handful of reasons — osteoarthritis, tendon or bursal problems around the joint, post-traumatic change, or referred pain from the spine. Those look similar from the outside and behave very differently once treated, which is why image-guided diagnostic injections do so much of the work here. If your problem is specific to one joint, our knee, hip, and shoulder pages cover it directly.",
    ],
    symptoms: [
      "Pain with weight-bearing or specific motions",
      "Stiffness, swelling, or grinding",
      "Loss of range of motion",
      "Sleep disturbance from joint pain",
    ],
    causes: [
      "Osteoarthritis",
      "Rotator cuff or labral pathology",
      "Tendinopathy",
      "Post-traumatic joint injury",
    ],
    approachIntro: "How we approach joint pain.",
    approachServices: [
      {
        slug: "injections-blocks-specialist",
        title: "Image-Guided Injections",
        blurb: "Steroid, anesthetic, and viscosupplementation as appropriate.",
      },
      {
        slug: "prp-procedure",
        title: "PRP Therapy",
        blurb: "Biologic option for tendinopathy and select arthritis.",
      },
    ],
    diagnosisWorkup: [
      "History — which movements provoke the pain, whether the joint swells, and whether it wakes you at night.",
      "Focused examination of the joint and the structures around it, with provocative testing.",
      "X-ray as the usual first imaging step; MRI or ultrasound when soft-tissue pathology is in question.",
      "Image-guided diagnostic injection to separate intra-articular pain from surrounding tendon or bursa.",
      "Assessment of the spine and sacroiliac joints when the pattern suggests referred rather than local pain.",
    ],
    whenToSeeSpecialist: [
      "Joint pain past 6 weeks despite rest, physical therapy, and oral medication.",
      "Pain that limits work, sleep, or the activities that matter to you.",
      "Swelling, locking, or giving way that keeps recurring.",
      "Repeated injections elsewhere that have stopped helping.",
      "You have been told the only option is joint replacement and want a second view.",
    ],
    recoveryOutlook:
      "Tendon and bursal problems often respond well to a single image-guided injection plus a targeted rehabilitation plan, with improvement over 4 to 8 weeks. PRP is slower and more biological — improvement builds over several weeks with continued improvement over the following months, no formal activity restrictions, and NSAIDs stopped for 7 days beforehand. Osteoarthritis is managed rather than cured, using image-guided injections, PRP in mild-to-moderate disease, and radiofrequency ablation of the articular nerves where the joint allows it. We will give you a realistic timeline at consult rather than an average.",
    faqs: [
      {
        q: "Which joints do you treat?",
        a: "Most peripheral joints — shoulder, hip, knee, elbow, wrist and hand, ankle and foot — as well as the spinal facet and sacroiliac joints. Where a joint needs surgery, we say so and refer to an orthopedic colleague we trust.",
      },
      {
        q: "Is my joint pain actually coming from my back?",
        a: "Sometimes. Referred pain from the lumbar spine and sacroiliac joint is one of the most common causes of \"hip pain\" we see, and cervical problems can present as shoulder pain. Pattern, exam, and a diagnostic injection separate them.",
      },
      {
        q: "Do I need imaging before my visit?",
        a: "Bring what you have. X-ray is usually the first useful step and MRI is best reserved for a specific question. Imaging findings are common in painless joints, so we read them alongside the exam rather than instead of it.",
      },
      {
        q: "Is PRP right for my joint?",
        a: "PRP has the strongest evidence in tendinopathy — tennis elbow, patellar tendon, partial rotator cuff tears — and in mild-to-moderate knee osteoarthritis. We will tell you honestly when the evidence does not support it, and it is generally not covered by insurance.",
      },
      {
        q: "How often can I have a steroid injection?",
        a: "We limit corticosteroid to a small number of injections per region per year. Repeated steroid into the same tendon can degrade tissue over time, which is one reason we prefer biologics for tendon problems when they are appropriate.",
      },
      {
        q: "Can you help if I have already had surgery?",
        a: "Yes. Persistent pain after joint surgery is common and often treatable — sometimes nerve-mediated, sometimes from a structure that was never the problem. We work alongside your surgeon.",
      },
      {
        q: "What if more than one joint hurts?",
        a: "Widespread joint pain raises different questions, including inflammatory and systemic causes that belong with rheumatology. We will say so and coordinate rather than treating joint by joint.",
      },
    ],
    philosophyBlurb:
      "The single biggest determinant of whether a joint injection works is whether it lands where it was aimed. We use image guidance for every one, which is also what makes the diagnostic injections worth trusting. Repeating the same blind injection and hoping for a different result is not a treatment plan.",
    relatedConditions: relatedFor("joint-pain"),
  },

  "knee-pain": {
    slug: "knee-pain",
    title: "Knee Pain",
    metaDescription: "Knee pain treatment in Houston and Humble. Image-guided injections, PRP, and genicular nerve ablation to keep you on your feet without rushing to surgery.",
    lastReviewed: "2026-09-10",
    leadLine: "Stay on your feet. Stay in your life. We focus on what works.",
    heroImage: "treatment-knee-pain-treatment.jpg",
    heroImageAlt: "Knee pain treatment at HTx Pain Institute",
    intro:
      "Knee pain is one of the most common reasons patients see us. From early osteoarthritis to post-surgical pain, our goal is the same: keep you on your feet, in your life, with the least invasive plan that genuinely works.",
    introParagraphs: [
      "Most knee pain that reaches us has already been through the obvious steps — rest, anti-inflammatories, physical therapy, perhaps an injection or an arthroscopy. The question by then is not whether the knee hurts but what specifically is generating the pain, and whether anything useful sits between conservative care and joint replacement. Usually something does.",
      "Osteoarthritis is the most common driver but not the only one. Patellar and quadriceps tendinopathy, persistent pain after meniscectomy or replacement, and sensitized genicular nerves all present as \"knee pain\" and respond to different things. We use image guidance for the injections that answer those questions, because an injection that misses its target answers nothing.",
    ],
    symptoms: [
      "Pain with stairs, squatting, or kneeling",
      "Swelling and stiffness",
      "Mechanical symptoms — clicking, catching, or giving way",
      "Pain after prolonged standing or walking",
    ],
    causes: [
      "Osteoarthritis",
      "Patellar tendinopathy",
      "Post-meniscectomy or post-surgical pain",
      "Genicular nerve sensitization",
    ],
    approachIntro: "How we approach knee pain.",
    approachServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Genicular Nerve Block & RFA",
        blurb: "Durable relief for moderate-to-severe knee OA.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Image-Guided Joint Injections",
        blurb: "Steroid or hyaluronic acid as appropriate.",
      },
      {
        slug: "prp-procedure",
        title: "PRP Therapy",
        blurb: "Biologic option for early arthritis and tendinopathy.",
      },
    ],
    diagnosisWorkup: [
      "History — what provokes the pain, whether the knee swells, and whether there are mechanical symptoms such as catching or giving way.",
      "Physical exam of the joint line, patellofemoral tracking, ligament stability, and gait.",
      "Weight-bearing X-rays as the first imaging step; MRI when soft-tissue pathology or a surgical question is in play.",
      "Image-guided diagnostic injection to separate intra-articular pain from surrounding tendon or bursa.",
      "Genicular nerve block when nerve-mediated knee pain is suspected — a positive response is what qualifies you for ablation.",
    ],
    whenToSeeSpecialist: [
      "Knee pain past 6 weeks despite physical therapy and activity modification.",
      "Pain that limits stairs, standing, or walking the distances your day requires.",
      "Night pain, or swelling that keeps recurring.",
      "Persistent pain after arthroscopy or knee replacement.",
      "You have been told replacement is the only remaining option and want to know what else exists.",
    ],
    recoveryOutlook:
      "Genicular nerve ablation follows the same arc as radiofrequency ablation elsewhere: the procedure itself takes about 15 minutes, mild soreness settles over a few days, most patients return to light activity the next day, and full benefit is reached at about the 6-week mark. Relief commonly lasts 6 to 18 months and the procedure can be repeated. PRP works on a slower biological timeline — improvement builds over several weeks with continued improvement over the following months, there are no formal activity restrictions, and we ask you to stop NSAIDs for 7 days before. Steroid and hyaluronic acid injections act faster but for a shorter period. We will tell you honestly which of these fits your knee.",
    faqs: [
      {
        q: "Can anything help knee arthritis short of replacement?",
        a: "Yes, and it is much of what we do. Image-guided injections, PRP in mild-to-moderate disease, and genicular nerve ablation for moderate-to-severe arthritis can meaningfully reduce pain and delay replacement. For severe end-stage arthritis we will tell you when replacement is the better answer.",
      },
      {
        q: "What is genicular nerve ablation?",
        a: "The genicular nerves carry pain signals from the knee. A diagnostic block confirms they are the route your pain travels; if it does, radiofrequency ablation quiets them. It does not treat the arthritis itself — it interrupts the signal, which is often exactly what is needed.",
      },
      {
        q: "Is PRP covered by insurance?",
        a: "Generally no. Most plans consider PRP experimental for musculoskeletal conditions. We provide transparent self-pay pricing and CareCredit financing, and we will tell you before you spend anything whether the evidence supports PRP for your specific knee.",
      },
      {
        q: "How many PRP injections will I need?",
        a: "Some knees respond to a single injection; others benefit from a series of two or three, typically spaced 4 to 6 weeks apart. We discuss the likely course at your initial consult and adjust based on your response.",
      },
      {
        q: "I still have pain after my knee replacement. Is that treatable?",
        a: "Often. Persistent pain after replacement can be nerve-mediated, and a genicular block is a reasonable diagnostic step. We coordinate with your surgeon rather than working around them.",
      },
      {
        q: "Will a steroid injection damage my knee?",
        a: "Repeated steroid injections into the same joint are not harmless, which is why we limit them and prefer biologics for tendon problems. One or two well-placed injections in a year is a different proposition from an injection every few weeks.",
      },
      {
        q: "Do I need a driver for a knee procedure?",
        a: "If you receive sedation, yes. Only minor, local-anesthetic-only procedures may allow you to drive yourself, and only per your provider's guidance. We confirm transportation when we schedule, so it is not a surprise on the day.",
      },
    ],
    philosophyBlurb:
      "A knee injection is only as good as its placement, so we use image guidance for every one — ultrasound or fluoroscopy depending on the target. That matters twice over here: it makes the therapeutic injections work, and it makes the diagnostic ones trustworthy, which is what determines whether ablation or PRP is worth doing at all.",
    relatedConditions: relatedFor("knee-pain"),
  },

  "neck-pain": {
    slug: "neck-pain",
    title: "Neck Pain",
    metaDescription: "Neck pain treatment in Houston and Humble. Precision cervical care — diagnostic blocks, radiofrequency ablation, and injections before considering surgery.",
    lastReviewed: "2026-09-10",
    leadLine: "Precision care for the cervical spine — without rushing to surgery.",
    heroImage: "treatment-neck-pain-treatment-houston.jpg",
    heroImageAlt: "Neck pain treatment at HTx Pain Institute in Houston",
    intro:
      "The cervical spine is unforgiving — small injuries can produce big symptoms. We start with a careful diagnostic plan to determine whether your pain is muscular, joint-mediated (facet), disc-related, or radicular, and we match the therapy to the diagnosis.",
    introParagraphs: [
      "The cervical spine carries a heavy head on a small, mobile column, and it is unforgiving — modest changes produce disproportionate symptoms. The neck also refers pain in ways that confuse the picture. Cervical facet joints refer into the shoulder blade and the back of the head; a compressed cervical nerve root refers into the arm and hand in a pattern that maps to the level involved.",
      "Our job is to separate muscular pain from joint-mediated pain from nerve-mediated pain, because the treatments diverge sharply. That distinction comes from the pattern of your symptoms, a focused exam, and — where facet pain is suspected — a pair of diagnostic blocks that have to confirm it before anything further is done.",
    ],
    symptoms: [
      "Aching or sharp neck pain",
      "Headaches that originate from the neck",
      "Pain or tingling radiating to the shoulder, arm, or hand",
      "Stiffness with rotation or extension",
    ],
    causes: [
      "Cervical facet arthropathy",
      "Cervical disc herniation",
      "Whiplash-associated disorders",
      "Cervicogenic headache",
    ],
    approachIntro: "How we approach neck pain.",
    approachServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Cervical Medial Branch Blocks & RFA",
        blurb: "Lasting relief for cervical facet pain.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Cervical Epidural Injections",
        blurb: "Targeted relief for cervical radiculopathy.",
      },
    ],
    diagnosisWorkup: [
      "History focused on the pattern — midline neck ache, referred pain into the shoulder blade or head, or radiating arm symptoms.",
      "Physical exam with range of motion, Spurling's test, and a neurologic screen of the upper limbs.",
      "Review of existing imaging; MRI of the cervical spine when radicular or myelopathic features are present.",
      "Cervical medial branch blocks when facet-mediated pain is suspected — two separate blocks are required before radiofrequency ablation.",
      "Selective nerve root injection when the level of a radiculopathy is unclear on imaging.",
    ],
    whenToSeeSpecialist: [
      "Neck pain past 6 weeks despite physical therapy and oral medication.",
      "Pain, numbness, or tingling radiating into the arm or hand.",
      "Headaches that start at the base of the skull and are provoked by neck movement.",
      "Weakness, clumsiness of the hands, or changes in balance — arrange assessment promptly.",
      "Persistent symptoms after a motor vehicle collision or other whiplash injury.",
    ],
    recoveryOutlook:
      "Cervical facet pain confirmed on two diagnostic blocks generally responds well to radiofrequency ablation. The procedure itself takes about 15 minutes, mild soreness settles over a few days, most patients return to light activity the next day, and full benefit is reached at about the 6-week mark — commonly lasting 6 to 18 months and repeatable as the nerve regenerates. Cervical radiculopathy treated with an epidural steroid injection often improves over weeks, which is frequently long enough for an irritated nerve root to settle. Cervicogenic headache tends to track with the neck pain driving it, so we measure headache days and function rather than a pain score alone.",
    faqs: [
      {
        q: "Can neck problems cause headaches?",
        a: "Yes. Cervicogenic headache arises from the upper cervical joints, typically starts at the base of the skull, is often one-sided, and is provoked by neck position. When the upper cervical facets are the source, diagnostic blocks confirm it and radiofrequency ablation can provide durable relief.",
      },
      {
        q: "Is my arm pain coming from my neck?",
        a: "Often. A compressed cervical nerve root refers pain, numbness, or tingling into the arm in a pattern that maps to the level involved. Shoulder pathology can mimic it closely, which is why the exam and, where needed, a selective injection matter.",
      },
      {
        q: "Do I need surgery for a cervical disc herniation?",
        a: "Most patients do not. Many cervical herniations improve over months, and a targeted epidural injection can control symptoms while that happens. Progressive weakness or signs of cord involvement change that calculation, and we refer promptly when they appear.",
      },
      {
        q: "Is cervical radiofrequency ablation safe?",
        a: "It is a well-established procedure performed under live fluoroscopic guidance with local anesthetic and light sedation, targeting small sensory nerves. We explain the specific risks in plain language at your consultation and again on the day.",
      },
      {
        q: "How long will I be off work?",
        a: "Most patients return to desk work the next day after an ablation and to physical work within 2 to 3 days, depending on the area treated. We give you guidance specific to your job.",
      },
      {
        q: "What if my neck pain started with a car accident?",
        a: "Whiplash injuries commonly involve the cervical facet joints and are frequently under-diagnosed. We assess them the same way as any facet pain, and we provide the documentation an injury claim requires.",
      },
      {
        q: "Will I need a driver on the day of my procedure?",
        a: "If you receive sedation or a spinal injection, yes. Only minor, local-anesthetic-only procedures may allow you to drive yourself, and only per your provider's guidance. We confirm transportation when we schedule, so it is not a surprise.",
      },
    ],
    philosophyBlurb:
      "The cervical spine rewards precision and punishes assumption. Every cervical procedure here is performed under live fluoroscopic guidance, and facet pain is confirmed on two separate diagnostic blocks before any ablation — not one, and not none. That standard is the reason our cervical ablations tend to work when we do them.",
    relatedConditions: relatedFor("neck-pain"),
  },

  "other-pain-conditions": {
    slug: "other-pain-conditions",
    title: "Other Pain Conditions",
    metaDescription: "Headaches, abdominal pain, post-surgical pain, CRPS and more — interventional pain care in Houston and Humble for conditions that resist standard treatment.",
    lastReviewed: "2026-09-10",
    leadLine: "Headaches, abdominal pain, post-surgical pain, CRPS, and more.",
    heroImage: "man-hand-on-forehead-eyes-shut-warm-window-light.jpg",
    heroImageAlt: "A man in a dark patterned shirt sits indoors with his eyes squeezed shut and one hand pressed to his forehead, lit by warm side light.",
    intro:
      "Pain rarely fits neatly into one category. Headaches, post-surgical pain, abdominal pain, and complex regional pain syndrome each have specific interventional answers — many of which are under-recognized in primary care. If your pain has not responded to standard treatment, we welcome the consultation.",
    introParagraphs: [
      "Some pain problems do not fit the common categories, and they tend to be the ones that have been moved between clinicians longest. Occipital and trigeminal neuralgia, persistent pain after thoracotomy or mastectomy, complex regional pain syndrome, chronic abdominal and visceral pain, coccydynia — each has specific interventional answers that are under-recognized outside pain medicine.",
      "The common thread is that these are nerve- or plexus-mediated and can often be confirmed with a diagnostic block. That block does two things at once: it tells us whether the pathway we suspect is genuinely the one carrying the pain, and it frequently provides the first meaningful relief in a long time. If your pain has not responded to standard treatment, that is a reason to be assessed rather than a reason to give up.",
    ],
    symptoms: [
      "Persistent headaches with or without aura",
      "Post-surgical pain in scar or dermatome",
      "Burning, color, or temperature changes (CRPS)",
      "Chronic abdominal or visceral pain",
    ],
    causes: [
      "Occipital and trigeminal neuralgia",
      "Post-thoracotomy or post-mastectomy pain",
      "CRPS Type I and II",
      "Visceral pain from abdominal pathology",
    ],
    approachIntro: "How we approach other pain conditions.",
    approachServices: [
      {
        slug: "injections-blocks-specialist",
        title: "Targeted Nerve Blocks",
        blurb: "Occipital, trigeminal, intercostal, sympathetic, and visceral blocks.",
      },
      {
        slug: "spinal-cord-stimulation-specialist",
        title: "Spinal Cord Stimulation",
        blurb: "Considered for CRPS and select refractory pain.",
      },
    ],
    diagnosisWorkup: [
      "A detailed history of onset, distribution, and character — nerve-mediated pain has a recognizable pattern.",
      "Review of what has already been excluded, and by which specialties.",
      "Examination mapping the affected nerve territory, including sensory change and allodynia.",
      "Targeted imaging where a specific structural question would change the plan.",
      "Diagnostic nerve or sympathetic block to confirm the pathway before any longer-acting treatment.",
    ],
    whenToSeeSpecialist: [
      "Pain in a defined nerve distribution that has not responded to first-line medication.",
      "Persistent pain in a surgical scar or dermatome months after an operation.",
      "Color, temperature, or swelling changes in a limb after injury or surgery — arrange assessment early.",
      "Headache arising from the back of the skull that has been treated as migraine without success.",
      "Chronic abdominal or visceral pain with a negative gastroenterology workup.",
    ],
    recoveryOutlook:
      "Because these conditions are diverse, the timelines are too — but the sequence is consistent. A diagnostic block establishes the pathway, and its result guides everything after it. Where a block confirms the source, relief can often be extended with a therapeutic version or with radiofrequency ablation, which takes about 15 minutes and reaches full benefit at about the 6-week mark. For CRPS and other refractory cases, spinal cord stimulation is considered and trialed for 5 to 7 days, so you know whether it helps before anything is implanted. We are candid when a condition is one we manage rather than resolve.",
    faqs: [
      {
        q: "My headaches were diagnosed as migraine but nothing has worked. Could it be something else?",
        a: "Possibly. Occipital neuralgia and cervicogenic headache both mimic migraine and are commonly missed. An occipital nerve block is a quick way to find out, and it treats as it diagnoses.",
      },
      {
        q: "What is CRPS?",
        a: "Complex regional pain syndrome is a disproportionate pain response after an injury or operation, usually in a limb, often with color, temperature, and swelling changes and extreme sensitivity to light touch. It responds better the earlier it is treated.",
      },
      {
        q: "Can pain after surgery become permanent?",
        a: "It can persist, particularly after thoracotomy, mastectomy, and hernia repair, where a nerve was unavoidably in the field. It is also frequently treatable with targeted blocks, and we would rather assess it early than after years.",
      },
      {
        q: "Do you treat abdominal pain?",
        a: "We treat the neural component — celiac plexus, splanchnic, and other visceral targets — once the gastroenterology workup is complete. We do not replace that workup, and we will say so if it is not finished.",
      },
      {
        q: "What is coccydynia?",
        a: "Pain at the tailbone, often after a fall or childbirth, typically worse with sitting. A ganglion impar block both confirms the source and often provides relief.",
      },
      {
        q: "How do I know if a block worked?",
        a: "We ask you to track your pain in the hours and days afterwards, because the pattern of relief is the diagnostic information. Short-lived relief from a diagnostic block is not a failure — it is the answer we were looking for.",
      },
      {
        q: "What if my condition is rare?",
        a: "Bring it. A large part of interventional pain medicine is applying a small number of well-understood techniques to an uncommon anatomy, and we will tell you plainly if it is outside what we can help with.",
      },
    ],
    philosophyBlurb:
      "These are the conditions where patients most often arrive having been told nothing more can be done, usually meaning nothing more of a particular kind was available. A diagnostic block is quick, specific, and answers a question that months of medication trials do not. We would rather perform one and find nothing than assume.",
    relatedConditions: relatedFor("other-pain-conditions"),
  },

  sciatica: {
    slug: "sciatica",
    title: "Sciatica",
    metaDescription: "Sciatica treatment in Houston and Humble. Radiating leg pain from a compressed sciatic nerve, treated with image-guided injections and targeted nerve care.",
    lastReviewed: "2026-09-10",
    leadLine: "Radiating leg pain from compression or irritation of the sciatic nerve.",
    heroImage: "woman-hand-on-lower-back-standing.jpg",
    heroImageAlt: "A woman in a white blouse and light-wash jeans stands in profile with one hand pressed against her lower back.",
    intro:
      "Sciatica is the term for pain that radiates from the lower back into the buttock and down the leg, following the path of the sciatic nerve. The cause is rarely the nerve itself — it is most often a lumbar disc herniation, foraminal stenosis, or piriformis-related compression. The right diagnosis is the difference between getting durable relief and chasing symptoms.",
    introParagraphs: [
      "Sciatica is one of the most common chief complaints we see — and one of the most commonly misdiagnosed. The word \"sciatica\" describes a symptom pattern, not a single diagnosis. The vast majority of cases trace back to a specific structural cause that can be identified on imaging and addressed with a targeted plan: a lumbar disc herniation pressing on a nerve root, a stenotic foramen narrowing the space the nerve travels through, or a piriformis-related compression of the sciatic nerve outside the spine.",
      "Most acute sciatica improves with time and conservative care. The minority that persists is what we treat at HTx Pain Institute — patients whose pain has not responded to physical therapy, oral medications, and time, and who need a more decisive intervention before sciatica derails their work, sleep, or function.",
    ],
    symptoms: [
      "Sharp, burning, or electric pain radiating from the back into the leg",
      "Numbness or tingling in the buttock, calf, or foot",
      "Weakness with walking, foot lift, or standing on tiptoes",
      "Pain worse with sitting, coughing, or sneezing",
    ],
    causes: [
      "Lumbar disc herniation compressing a nerve root",
      "Foraminal or central spinal stenosis",
      "Piriformis syndrome",
      "Spondylolisthesis",
    ],
    approachIntro: "How we approach sciatica.",
    approachServices: [
      {
        slug: "injections-blocks-specialist",
        title: "Lumbar Epidural Steroid Injection",
        blurb: "Targeted relief for inflamed nerve roots from disc or stenosis.",
      },
      {
        slug: "mild-procedure",
        title: "MILD Procedure",
        blurb: "For sciatica driven by ligamentum flavum hypertrophy stenosis.",
      },
      {
        slug: "spinal-cord-stimulation-specialist",
        title: "Spinal Cord Stimulation",
        blurb: "When sciatica persists after surgery or conservative care.",
      },
    ],
    diagnosisWorkup: [
      "Detailed history — pattern of pain, what makes it worse and better, neurologic symptoms.",
      "Focused physical exam — straight-leg raise, neurologic testing, gait, reflexes.",
      "MRI of the lumbar spine to identify disc herniation, stenosis, or other compressive cause.",
      "When MRI is inconclusive, selective nerve-root injection serves as both diagnosis and treatment.",
      "Electromyography (EMG) in selected cases of unclear or chronic radiculopathy.",
    ],
    whenToSeeSpecialist: [
      "Sciatic pain that has lasted more than 4–6 weeks despite physical therapy and oral medications.",
      "Progressive weakness, foot drop, or worsening neurologic symptoms.",
      "Pain limiting work, sleep, or core daily activities.",
      "Sciatica plus bowel or bladder changes — this is an emergency, see immediately.",
      "Repeated episodes that come back every few months.",
    ],
    recoveryOutlook:
      "Recovery from sciatica depends on the cause. Most patients with disc-driven sciatica improve with a combination of targeted injections and a graded physical therapy plan over 6 to 12 weeks. Stenosis-related sciatica often responds to MILD or other targeted procedures. For patients with truly refractory radiculopathy, spinal cord stimulation has the strongest evidence and can return function even after failed surgery. We tailor the trajectory to your imaging, your goals, and your response to each step.",
    faqs: [
      {
        q: "Is sciatica permanent?",
        a: "Most acute sciatica resolves within 6–12 weeks with conservative care. Persistent sciatica beyond that point usually has an identifiable cause we can target. Few patients require permanent management.",
      },
      {
        q: "Do I need surgery for sciatica?",
        a: "Most sciatica does not require surgery. The vast majority of patients we see avoid surgery through a combination of injections, MILD, RFA, or spinal cord stimulation as appropriate. Surgery has a role in select cases — and we will say so when it does.",
      },
      {
        q: "Why does sciatica feel worse when I sit?",
        a: "Sitting increases intradiscal pressure and can worsen pain from a herniated disc. It also can compress the sciatic nerve through the piriformis. The pattern of what worsens your pain is a useful diagnostic clue.",
      },
      {
        q: "Will an epidural injection cure my sciatica?",
        a: "An epidural steroid injection can dramatically reduce inflammation around an irritated nerve root and provide weeks to months of relief — long enough for the underlying disc issue to resolve. It is not a guaranteed cure for the disc, but it is an effective bridge.",
      },
      {
        q: "How is sciatica different from regular back pain?",
        a: "Back pain is local to the lumbar spine. Sciatica is leg pain caused by a nerve in the lumbar spine. The two often coexist, but they have different drivers and different treatments.",
      },
      {
        q: "Can sciatica come back?",
        a: "Yes — particularly if the underlying cause (disc disease, stenosis) is progressive. The goal of our care is to keep recurrences manageable and avoid permanent nerve injury.",
      },
      {
        q: "Should I rest or stay active?",
        a: "Bed rest beyond a day or two is harmful. Gentle activity — walking, gradual stretching — supports recovery. Severe pain may temporarily limit activity, but we do not recommend prolonged inactivity.",
      },
    ],
    philosophyBlurb:
      "We do not treat sciatica with a one-size-fits-all injection. We diagnose it. Dr. Baumgartner's approach is to identify the specific anatomic cause on imaging, confirm it with a selective diagnostic injection if needed, and then build a stepwise plan — starting with the least invasive option that actually addresses the cause and escalating only when needed.",
    relatedConditions: relatedFor("sciatica"),
  },

  "herniated-discs": {
    slug: "herniated-discs",
    title: "Herniated Discs",
    metaDescription: "Herniated disc treatment in Houston and Humble. Epidural steroid injections and targeted nerve care for disc material pressing on a spinal nerve root.",
    lastReviewed: "2026-09-10",
    leadLine: "When the soft inner disc material pushes through the outer wall and irritates a nerve.",
    heroImage: "hand-on-spine-xray-lightbox.jpg",
    heroImageAlt: "A hand resting on a backlit spine X-ray, the vertebral column running down the center of the film with the lumbar spine in the lower half.",
    intro:
      "A herniated disc occurs when the soft nucleus of an intervertebral disc pushes through a tear in the outer annulus and contacts a spinal nerve. Most herniations improve with time and targeted care — and most do not require surgery. Image-guided injections, careful diagnosis, and a tailored recovery plan get the majority of patients back to their lives.",
    introParagraphs: [
      "A herniated disc — sometimes called a slipped, bulging, or ruptured disc — happens when the gel-like nucleus of an intervertebral disc pushes through a tear in the outer annulus and contacts a nearby spinal nerve. The result is the classic cocktail of back pain plus radiating arm or leg pain, often with numbness, tingling, or weakness in the dermatome of the affected nerve.",
      "Here is what most patients are not told: most disc herniations heal. Imaging studies of asymptomatic adults routinely show disc bulges and herniations on MRI. The body resorbs disc material over time, and the inflammatory response that drives the pain settles. The job of pain medicine is to manage symptoms and protect function during that healing window — not necessarily to operate.",
      "When herniations do not resolve, or when they cause progressive neurologic deficits, we have a stepwise interventional toolkit. We start with the least invasive options that address the cause and reserve more involved procedures for cases that genuinely need them.",
    ],
    symptoms: [
      "Radiating pain into the arm or leg",
      "Numbness or tingling in a specific dermatome",
      "Weakness in muscles served by the affected nerve",
      "Pain worsened by certain positions or activities",
    ],
    causes: [
      "Age-related disc degeneration",
      "Lifting injury or sudden trauma",
      "Repetitive strain",
      "Genetic predisposition to disc disease",
    ],
    approachIntro: "How we approach herniated discs.",
    approachServices: [
      {
        slug: "injections-blocks-specialist",
        title: "Epidural Steroid Injections",
        blurb: "Reduce nerve-root inflammation while the disc heals.",
      },
      {
        slug: "spinal-cord-stimulation-specialist",
        title: "Spinal Cord Stimulation",
        blurb: "For persistent radicular pain after conservative care or surgery.",
      },
      {
        title: "Multimodal Plan",
        blurb: "Combination of injections, therapy, and activity modification.",
      },
    ],
    diagnosisWorkup: [
      "Detailed history including pattern, severity, and dermatome of radiating symptoms.",
      "Focused neurologic exam — strength, sensation, reflexes, and gait.",
      "MRI of the affected spinal region as the primary imaging study.",
      "EMG/nerve conduction studies in selected cases of chronic or unclear radiculopathy.",
      "Selective nerve-root injection as a diagnostic tool when imaging shows multiple potential pain generators.",
    ],
    whenToSeeSpecialist: [
      "Radicular pain (arm or leg) lasting more than 4–6 weeks.",
      "Progressive weakness or worsening numbness in an arm or leg.",
      "Pain that interferes with sleep, work, or core daily activities.",
      "Cervical disc herniation with arm symptoms — earlier referral often helps.",
      "Bowel or bladder symptoms with low-back pain — emergency, see immediately.",
    ],
    recoveryOutlook:
      "Most disc herniations improve over 6–12 weeks with a combination of targeted epidural injection (when appropriate), graded activity, and physical therapy focused on neutral-spine mechanics. Cervical herniations sometimes take longer. Progressive or significant motor deficits are an indication for prompt surgical evaluation, not a reason to wait. For patients whose radicular pain remains chronic and neuropathic after conservative care, injections, or surgery, spinal cord stimulation is a later-line option. We will give you a realistic timeline based on your imaging.",
    faqs: [
      {
        q: "Will my disc heal on its own?",
        a: "Most disc herniations resorb over 3–12 months as the body breaks down the displaced material. Symptoms usually improve well before imaging fully normalizes.",
      },
      {
        q: "Do I need surgery for a herniated disc?",
        a: "Most patients with herniated discs do not need surgery. Surgery is reserved for patients with progressive neurologic deficit, intractable pain, or specific anatomic situations. We help you avoid surgery when conservative options are still on the table.",
      },
      {
        q: "Will an epidural steroid injection help?",
        a: "Yes — for most radicular pain from a herniated disc, a well-targeted epidural injection can substantially reduce inflammation around the affected nerve root and shorten the painful phase of recovery.",
      },
      {
        q: "Is it safe to exercise with a herniated disc?",
        a: "Generally yes — and gentle exercise (walking, swimming, careful core work) is part of recovery. We will tell you which movements to avoid in the early healing window. Bed rest is not the answer.",
      },
      {
        q: "Why does the pain come and go?",
        a: "Inflammation around a nerve root waxes and wanes with posture, activity, and time of day. Disc material can also shift slightly with movement. The variability does not mean the herniation is mild — it just means inflammation is dynamic.",
      },
      {
        q: "Can I get a disc herniation again?",
        a: "Yes. Patients who have had one herniation are at higher risk of a second, particularly without addressing the underlying biomechanics. Recovery includes building habits and strength to reduce that risk.",
      },
      {
        q: "Should I get an MRI right away?",
        a: "Not always. For a first episode of radiating pain without neurologic deficit, conservative care for 4–6 weeks is reasonable before imaging. We order MRI when the clinical picture warrants it — not by default.",
      },
    ],
    philosophyBlurb:
      "Imaging tells you where a disc has herniated; it does not tell you whether that disc is the source of your symptoms. Our diagnostic discipline — clinical exam, careful imaging review, and selective injections when needed — is what allows us to treat the right disc, in the right way, at the right time.",
    relatedConditions: relatedFor("herniated-discs"),
  },

  "spinal-stenosis": {
    slug: "spinal-stenosis",
    title: "Spinal Stenosis",
    metaDescription: "Spinal stenosis treatment in Houston and Humble. The MILD procedure, injections, and stimulation to relieve narrowing that limits how far you can walk.",
    lastReviewed: "2026-09-10",
    leadLine: "Narrowing of the spinal canal that compresses nerves and limits walking.",
    heroImage: "older-man-resting-on-park-bench-by-pond.jpg",
    heroImageAlt: "A grey-haired man in a dark vest sits alone on a wooden park bench, seen from behind, resting and looking out over a calm pond and green hillside.",
    intro:
      "Lumbar spinal stenosis is the narrowing of the spinal canal — most commonly from age-related thickening of the ligamentum flavum, disc degeneration, and facet hypertrophy. The hallmark is neurogenic claudication: leg pain or heaviness with walking that improves with sitting or leaning forward. The MILD procedure has changed what is possible for these patients.",
    introParagraphs: [
      "Lumbar spinal stenosis is the gradual narrowing of the spinal canal — most commonly from age-related thickening of the ligamentum flavum, disc degeneration, and facet hypertrophy. The hallmark is neurogenic claudication: leg pain, heaviness, or numbness that comes on with walking or standing and improves with sitting, leaning forward, or using a shopping cart for support.",
      "Stenosis is one of the most common conditions in patients over 60, and it is also one where outdated thinking still shapes treatment. For decades, patients with stenosis had two options: live with it, or undergo a laminectomy or fusion. The MILD procedure has changed that. For patients whose stenosis is driven by ligamentum flavum hypertrophy, MILD offers an outpatient, implant-free option that preserves the spine's natural anatomy.",
      "We treat stenosis at every stage — from early symptomatic patients still benefitting from conservative care, to patients exploring MILD and other targeted procedures, to patients who have already had surgery and need ongoing management.",
    ],
    symptoms: [
      "Leg pain, heaviness, or numbness with walking or standing",
      "Relief from sitting or leaning forward (over a shopping cart)",
      "Reduced walking distance over time",
      "Low-back pain often present but not always dominant",
    ],
    causes: [
      "Ligamentum flavum hypertrophy",
      "Disc degeneration and facet arthropathy",
      "Spondylolisthesis",
      "Congenital narrowing",
    ],
    approachIntro: "How we approach spinal stenosis.",
    approachServices: [
      {
        slug: "mild-procedure",
        title: "MILD Procedure",
        blurb: "Outpatient decompression for ligamentum flavum hypertrophy stenosis.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Lumbar Epidural Injections",
        blurb: "Reduce inflammation around compressed nerves.",
      },
      {
        slug: "spinal-cord-stimulation-specialist",
        title: "Spinal Cord Stimulation",
        blurb: "Considered for stenosis-related pain not amenable to MILD.",
      },
    ],
    diagnosisWorkup: [
      "History — specifically the pattern of leg symptoms with walking and relief with sitting.",
      "Physical exam — neurologic assessment, gait, and key provocative tests.",
      "MRI of the lumbar spine to assess canal and foraminal narrowing and identify ligamentum flavum hypertrophy.",
      "Standing and flexion/extension X-rays in selected cases of suspected instability.",
      "Selective nerve-root injection if multiple levels of narrowing are present and we need to identify which is symptomatic.",
    ],
    whenToSeeSpecialist: [
      "Walking distance progressively shrinking — limited to a city block or less.",
      "Leg symptoms (pain, heaviness, numbness) interfering with daily activities.",
      "Failed physical therapy or oral medications for stenosis-related symptoms.",
      "Prior epidural injections that helped only briefly.",
      "Surgeon recommended laminectomy or fusion — second opinion is reasonable.",
    ],
    recoveryOutlook:
      "Recovery from stenosis treatment depends on the intervention. Conservative care (physical therapy, oral medications, occasional injections) is ongoing — patients learn what flares their symptoms and how to manage. The MILD procedure is outpatient with most patients returning to normal activities within a few days, and improvement in walking distance progressing over 2–6 weeks. For patients who need surgery, we coordinate with a thoughtful spine surgeon and provide post-op pain management.",
    faqs: [
      {
        q: "What does spinal stenosis feel like?",
        a: "The classic pattern is leg pain, heaviness, or numbness that comes on with walking or standing and is relieved by sitting or leaning forward (over a shopping cart, kitchen counter, or walker). Some patients also have low-back pain, but the leg symptoms are usually what limits function.",
      },
      {
        q: "Is MILD a real surgery?",
        a: "MILD is a percutaneous outpatient procedure performed through an incision the size of a baby aspirin. It is not traditional spine surgery — there are no implants, no stitches, and no general anesthesia. Most patients walk out the same day.",
      },
      {
        q: "Will MILD work for me?",
        a: "MILD is most effective when MRI shows ligamentum flavum hypertrophy as the dominant cause of stenosis. We confirm this on imaging before recommending MILD. If your stenosis is driven by other factors (severe disc disease, instability), we will discuss alternatives.",
      },
      {
        q: "What is the recovery from MILD?",
        a: "Most patients are back to normal activities within a few days. Walking-distance improvement progresses over 2–6 weeks. There is no implant to recover from, and no fusion biology to wait for.",
      },
      {
        q: "Do epidural injections help with stenosis?",
        a: "Yes, often — particularly for stenosis with significant inflammatory component. The relief from a single injection may last weeks to months and can buy time for other interventions.",
      },
      {
        q: "Will I need surgery eventually?",
        a: "Many patients with stenosis avoid surgery indefinitely with a combination of MILD, injections, and lifestyle adjustments. Some patients eventually do need decompression or fusion, particularly if instability is part of the picture.",
      },
      {
        q: "Can stenosis be cured?",
        a: "Stenosis is a degenerative process, so 'cure' is not the right framing. We control symptoms, restore walking distance, and protect quality of life. Most patients can do everything they want to do with the right plan.",
      },
    ],
    philosophyBlurb:
      "We are not stenosis-by-default-injection providers. We carefully assess whether MILD is the right fit (it requires specific MRI findings), whether epidural injections will help, or whether surgical referral is the more honest answer. The MILD procedure is one of our areas of focus, and Dr. Baumgartner has performed it many times — but only for patients who are likely to benefit.",
    relatedConditions: relatedFor("spinal-stenosis"),
  },

  "hip-pain": {
    slug: "hip-pain",
    title: "Hip Pain",
    metaDescription: "Hip pain treatment in Houston and Humble — bursitis, osteoarthritis, and tendinopathy. Ultrasound-guided injections, PRP, and articular nerve ablation.",
    lastReviewed: "2026-09-10",
    leadLine: "From bursitis to osteoarthritis — image-guided care for the hip joint.",
    heroImage: "man-hand-pressed-to-hip-side-view.jpg",
    heroImageAlt: "Close-up side view of a man in a light blue shirt and jeans pressing his hand against his hip in discomfort.",
    intro:
      "Hip pain can come from the joint itself, the surrounding tendons and bursa, or referred pain from the spine and SI joint. Diagnostic clarity matters — a targeted injection often confirms the source and provides immediate relief. We coordinate with orthopedic colleagues when surgery is the right answer, and offer image-guided non-surgical care when it is not.",
    introParagraphs: [
      "Hip pain is deceptively complex. The hip joint itself, the surrounding tendons (gluteal, iliopsoas), the bursa, and even the lumbar spine and SI joint all refer pain into the hip region. A single physical exam often cannot tell these apart with confidence — and that is why image-guided diagnostic injections are so valuable here.",
      "Dr. Baumgartner takes a thoughtful approach to hip pain: figure out where the pain is actually coming from, treat that source with the least invasive tool that works, and coordinate with our orthopedic colleagues if and when surgery becomes the right answer. We are not in the business of doing the same injection over and over and hoping for a different result.",
    ],
    symptoms: [
      "Groin, lateral hip, or buttock pain",
      "Pain with weight-bearing, stairs, or rising from a chair",
      "Reduced range of motion or stiffness",
      "Night pain or sleep disturbance",
    ],
    causes: [
      "Hip osteoarthritis",
      "Greater trochanteric bursitis or gluteal tendinopathy",
      "Iliopsoas tendinopathy",
      "Referred pain from lumbar spine or SI joint",
    ],
    approachIntro: "How we approach hip pain.",
    approachServices: [
      {
        slug: "injections-blocks-specialist",
        title: "Image-Guided Hip Injections",
        blurb: "Diagnostic and therapeutic for joint or bursa pain.",
      },
      {
        slug: "prp-procedure",
        title: "PRP Therapy",
        blurb: "Biologic option for tendinopathy and select arthritis.",
      },
      {
        slug: "radiofrequency-ablation",
        title: "Radiofrequency Ablation",
        blurb: "Radiofrequency ablation of the articular branches of the hip (femoral and obturator articular branches) for moderate-severe hip OA.",
      },
    ],
    diagnosisWorkup: [
      "Detailed history and pattern of pain — groin vs. lateral vs. buttock matters.",
      "Focused physical exam with provocative maneuvers (FABER, FADIR, gait, leg-length).",
      "X-ray as the first imaging step, with MRI for soft-tissue pathology when indicated.",
      "Image-guided diagnostic injection (intra-articular or peri-articular) to confirm the source.",
      "Coordination with orthopedic colleagues when imaging suggests structural pathology that may benefit from surgery.",
    ],
    whenToSeeSpecialist: [
      "Hip pain not responding to 4–6 weeks of conservative care.",
      "Significant night pain or sleep disruption.",
      "Pain that limits walking, stairs, or rising from a chair.",
      "Multiple failed treatments at other practices.",
      "Hip pain after a fall or trauma in an older adult.",
    ],
    recoveryOutlook:
      "Recovery depends on the cause and treatment. Bursitis and tendinopathy often respond well to a single image-guided injection plus targeted physical therapy, with improvement over 4–8 weeks. PRP for tendinopathy works on a slower biological timeline — improvement builds over several weeks, with continued improvement over the following months. Hip osteoarthritis is managed with combinations of injection, RFA of the articular nerves, and lifestyle. We will give you a realistic timeline at consult.",
    faqs: [
      {
        q: "What is the difference between hip joint pain and bursitis?",
        a: "Hip joint pain is typically felt in the groin, worse with weight-bearing and rotation. Lateral hip pain (over the bony prominence) is more often gluteal tendinopathy or trochanteric bursitis — different anatomy, different treatment.",
      },
      {
        q: "Is hip osteoarthritis treatable without surgery?",
        a: "Mild-to-moderate hip OA often responds to a combination of activity modification, image-guided injections, and PRP. Severe end-stage OA usually does require eventual hip replacement, but we can often delay that for years.",
      },
      {
        q: "What about PRP for hip pain?",
        a: "PRP works best for hip tendinopathy (gluteal tendon, iliopsoas) and select cases of mild-to-moderate hip OA. We will tell you honestly when the evidence supports PRP for your specific case.",
      },
      {
        q: "Could my hip pain be coming from my back?",
        a: "Yes — referred pain from the lumbar spine and SI joint is one of the most common causes of \"hip pain\" we see. The pattern, exam findings, and a diagnostic injection help differentiate.",
      },
      {
        q: "Should I see an orthopedic surgeon or a pain specialist first?",
        a: "If you have not been to either, a pain specialist can usually figure out the source and either treat it or appropriately refer to orthopedics. We work closely with a small group of trusted hip surgeons.",
      },
      {
        q: "Will a steroid injection delay hip replacement if I need one?",
        a: "Recent literature has raised concerns about timing of pre-operative steroid injections and infection risk after hip replacement. We discuss timing carefully with you and your surgeon.",
      },
      {
        q: "What if my hip pain is from my SI joint?",
        a: "SI joint pain often presents as buttock or upper lateral hip pain. We diagnose it with provocative testing and a diagnostic SI injection. If confirmed, treatment options range from RFA to SI joint fusion, depending on severity.",
      },
    ],
    philosophyBlurb:
      "We use ultrasound for every hip injection — it is the only way to be sure you are in the bursa vs. the joint vs. the iliopsoas vs. extra-articular tissue. Many practices still inject the hip blind or with fluoroscopy alone. The accuracy difference is real, and it is one of the reasons our diagnostic injections actually answer the question they are asked.",
    relatedConditions: relatedFor("hip-pain"),
  },

  "shoulder-injuries": {
    slug: "shoulder-injuries",
    title: "Shoulder Pain & Injuries",
    metaDescription: "Shoulder pain treatment in Houston and Humble. Rotator cuff, labrum, and tendon problems diagnosed precisely and treated with ultrasound-guided care.",
    lastReviewed: "2026-09-10",
    leadLine: "Rotator cuff, labrum, and tendon issues — diagnosed precisely, treated thoughtfully.",
    heroImage: "man-gripping-shoulder-pain.jpg",
    heroImageAlt: "A young man in a grey t-shirt grimaces while gripping his right shoulder with his left hand against a plain white wall.",
    intro:
      "Shoulder pain rarely has a single cause. The rotator cuff, labrum, biceps tendon, AC joint, and cervical spine can all contribute. Image-guided injections are both diagnostic and therapeutic — and PRP is increasingly an excellent first-line biologic option for tendinopathy. We work with orthopedic and physical therapy partners to build the right plan.",
    introParagraphs: [
      "The shoulder is the most mobile joint in the body, and that mobility comes at the cost of stability — which is why shoulder problems are common, and often layered. The rotator cuff, the labrum, the biceps tendon, the AC joint, the bursa, and the cervical spine can all contribute to what a patient experiences as \"shoulder pain.\" The trick is sorting them out.",
      "Most shoulder pain has a tendinous or bursal contribution that responds to a precise, ultrasound-guided injection plus targeted physical therapy. Some shoulders need biologic support — PRP for partial rotator cuff tears or persistent tendinopathy. Others need surgical referral, and we will tell you when that is the right call.",
      "We coordinate closely with orthopedic shoulder colleagues. We do not see ourselves as competing with them — our job is to treat the cases that do not require surgery and to be honest about the ones that do.",
    ],
    symptoms: [
      "Pain with overhead reaching or lifting",
      "Night pain that interferes with sleep",
      "Loss of strength or range of motion",
      "Catching, clicking, or instability sensations",
    ],
    causes: [
      "Rotator cuff tendinopathy or partial tearing",
      "Subacromial bursitis or impingement",
      "Adhesive capsulitis (frozen shoulder)",
      "AC joint arthritis",
    ],
    approachIntro: "How we approach shoulder injuries.",
    approachServices: [
      {
        slug: "injections-blocks-specialist",
        title: "Ultrasound-Guided Shoulder Injections",
        blurb: "Steroid or hydrodissection for bursa, joint, or tendon pathology.",
      },
      {
        slug: "prp-procedure",
        title: "PRP Therapy",
        blurb: "Biologic option for rotator cuff tendinopathy.",
      },
      {
        title: "Suprascapular Nerve Block",
        blurb: "Targeted relief for refractory shoulder pain or frozen shoulder.",
      },
    ],
    diagnosisWorkup: [
      "Pattern of pain — overhead, reaching behind, sleeping on the side.",
      "Focused exam — Hawkins, Neer, drop-arm, O'Brien, AC joint stress.",
      "Ultrasound for dynamic visualization of the rotator cuff and bursa.",
      "MRI for suspected significant tearing, labral pathology, or surgical planning.",
      "Cervical spine imaging when arm symptoms are atypical or radicular in pattern.",
    ],
    whenToSeeSpecialist: [
      "Shoulder pain limiting work, sleep, or daily function for more than 4 weeks.",
      "Loss of strength or range of motion.",
      "Mechanical symptoms — clicking, catching, instability.",
      "Pain after a specific injury or fall.",
      "Multiple failed prior treatments at other practices.",
    ],
    recoveryOutlook:
      "Most shoulder conditions respond to a combination of one or two image-guided injections and a thoughtful PT plan over 6–12 weeks. PRP cases work on a slower biological timeline — improvement builds over several weeks, with continued improvement over the following months, and individual timing varies. Patients with significant structural tears who need surgical repair are referred to a trusted orthopedic colleague; we provide pain management coverage during their post-op course.",
    faqs: [
      {
        q: "Do I have a rotator cuff tear?",
        a: "We can usually tell on exam and ultrasound, with MRI confirming when needed. Many tears do well with conservative treatment; not every tear requires surgery.",
      },
      {
        q: "What is frozen shoulder and how is it treated?",
        a: "Adhesive capsulitis (frozen shoulder) is a self-limited but lengthy condition. We treat with a combination of intra-articular injection, hydrodilation under ultrasound, and a structured rehab plan to shorten the painful course.",
      },
      {
        q: "Is PRP worth it for my shoulder?",
        a: "PRP has the strongest evidence in rotator cuff tendinopathy and partial tears that have failed conservative care. We will give you an honest assessment of likely benefit before recommending it.",
      },
      {
        q: "Why does my shoulder hurt at night?",
        a: "Night pain is classic for rotator cuff and bursal pathology. Sleeping on the affected shoulder loads the inflamed tissue. Pain that disturbs sleep is also a marker that the condition warrants treatment, not just rest.",
      },
      {
        q: "Could my shoulder pain be from my neck?",
        a: "Yes — cervical radiculopathy can refer pain into the shoulder and arm in a pattern that mimics shoulder pathology. We screen for this in the exam and will image the cervical spine if indicated.",
      },
      {
        q: "Will a steroid injection make my tendon worse?",
        a: "Repeated steroid injections in the same tendon can be harmful long-term. We limit corticosteroid use to a small number of injections per region per year and prefer biologics like PRP for tendon healing when appropriate.",
      },
      {
        q: "How long until I can return to overhead activities?",
        a: "Depending on diagnosis, most patients return to overhead activities within 6–12 weeks of beginning a structured plan. We do not push you to return early.",
      },
    ],
    philosophyBlurb:
      "Ultrasound-guided shoulder injections are the standard of care, and we use them for every shoulder injection. Beyond that, our willingness to use multiple tools — corticosteroid, hydrodissection, PRP, suprascapular nerve block — based on what your specific shoulder needs is what differentiates the work.",
    relatedConditions: relatedFor("shoulder-injuries"),
  },

  migraines: {
    slug: "migraines",
    title: "Migraines & Chronic Headache",
    metaDescription: "Migraine and headache treatment in Houston and Humble. Occipital and sphenopalatine blocks, cervical ablation, and Botox when medication is not enough.",
    lastReviewed: "2026-09-10",
    leadLine: "Beyond medication management — interventional options when headaches don't respond.",
    heroImage: "woman-hand-to-temple-eyes-closed-headache.jpg",
    heroImageAlt: "A woman in a white shirt with her eyes closed presses her hand against her temple and forehead in soft natural light.",
    intro:
      "Chronic and refractory headaches are not just a medication problem. Occipital nerve blocks, sphenopalatine ganglion procedures, and selective nerve targeting can dramatically change the trajectory of a chronic headache patient. We coordinate with neurology when appropriate and bring the interventional toolkit when standard therapy isn't enough.",
    introParagraphs: [
      "Migraine and chronic headache are among the most disabling conditions in medicine — and among the most under-treated. Most patients with chronic headache have been on rotating medications for years, often without much benefit, and have not been offered the interventional options that can dramatically change their trajectory.",
      "We do not replace neurology — we work alongside it. For patients with cervicogenic headache, occipital neuralgia, or migraine that has not responded to standard preventives, interventional pain medicine has a real toolkit: occipital nerve blocks, sphenopalatine ganglion procedures, cervical medial branch blocks and RFA when the upper cervical facets are involved, and selective targeting of other cranial nerves.",
      "Our goal is simple: fewer headache days, less disability, and less reliance on rescue medications.",
    ],
    symptoms: [
      "Headaches occurring 8+ days per month",
      "Throbbing pain often one-sided",
      "Sensitivity to light, sound, or smells",
      "Headaches limiting work, sleep, or relationships",
    ],
    causes: [
      "Migraine with or without aura",
      "Cervicogenic headache (originating from cervical spine)",
      "Occipital neuralgia",
      "Medication-overuse headache",
    ],
    approachIntro: "How we approach migraines & chronic headache.",
    approachServices: [
      {
        slug: "injections-blocks-specialist",
        title: "Occipital Nerve Blocks",
        blurb: "Targeted relief for occipital neuralgia and cervicogenic headache.",
      },
      {
        title: "Sphenopalatine Ganglion Block",
        blurb: "Office-based option for migraine and cluster headache.",
      },
      {
        slug: "radiofrequency-ablation",
        title: "Cervical Medial Branch RFA",
        blurb: "When upper cervical facets drive headache symptoms.",
      },
    ],
    diagnosisWorkup: [
      "Detailed headache history — pattern, frequency, triggers, prior treatments.",
      "Focused neurologic exam and cranial nerve testing.",
      "Cervical spine assessment, including range of motion and palpation.",
      "Coordination with neurology when migraine pathology dominates the picture.",
      "Diagnostic occipital or sphenopalatine block to test interventional candidacy.",
    ],
    whenToSeeSpecialist: [
      "Headache 8 or more days per month despite preventive medication.",
      "Failed multiple migraine preventives at adequate trial doses.",
      "Suspected cervicogenic headache or occipital neuralgia.",
      "Reliance on triptans or rescue medications more than twice per week.",
      "Chronic daily headache without clear diagnostic clarity.",
    ],
    recoveryOutlook:
      "Recovery from headache treatment is measured in headache-day reduction, not cure. A successful interventional plan often reduces headache frequency by 50% or more within the first few months. Cervical RFA when indicated can provide 6–18 months of substantial relief. We work iteratively — refining the plan based on your headache diary and response.",
    faqs: [
      {
        q: "How are migraines different from cervicogenic headaches?",
        a: "Cervicogenic headache originates from the cervical spine — typically the upper cervical facets or muscles — and refers into the head. Migraine is a primary neurologic condition. They can coexist, and treating both is sometimes the key.",
      },
      {
        q: "What is occipital neuralgia?",
        a: "Occipital neuralgia is sharp, shooting pain in the back of the head and scalp from irritation of the greater or lesser occipital nerve. It often responds well to a targeted occipital nerve block.",
      },
      {
        q: "What is a sphenopalatine ganglion block?",
        a: "An office-based, intranasal procedure that delivers local anesthetic to the sphenopalatine ganglion — a nerve cluster involved in migraine and cluster headache. It can provide rapid relief in select patients.",
      },
      {
        q: "Will I still need to see my neurologist?",
        a: "For most patients, yes. We coordinate with neurology rather than replace it. Migraine prevention is best when interventional and pharmacologic approaches work in parallel.",
      },
      {
        q: "Can RFA help with my headaches?",
        a: "When headache is driven by upper cervical facet pathology, cervical medial branch RFA can provide durable relief. We confirm with a diagnostic block first.",
      },
      {
        q: "How quickly will I see improvement?",
        a: "Some interventional procedures (occipital block, SPG block) provide rapid relief within hours. Others (RFA) build over the following weeks, reaching full benefit at about the 6-week mark. We track headache-day frequency over the first 1–3 months.",
      },
      {
        q: "What about Botox for migraines?",
        a: "Botox is a well-established preventive for chronic migraine and is typically administered by neurology. We coordinate with your neurologist on combined approaches when appropriate.",
      },
    ],
    philosophyBlurb:
      "Most pain practices do not focus on headache. Most neurology practices do not have an interventional toolkit. We bring both in one place — coordinated with your neurologist when appropriate — and bring the same diagnostic discipline to headache that we bring to every other pain syndrome.",
    relatedConditions: relatedFor("migraines"),
  },

  fibromyalgia: {
    slug: "fibromyalgia",
    title: "Fibromyalgia",
    metaDescription: "Fibromyalgia care in Houston and Humble. A coordinated, whole-person plan combining interventional options, medication review, and structured rehabilitation.",
    lastReviewed: "2026-09-10",
    leadLine: "A whole-person condition that benefits from a coordinated, individualized plan.",
    heroImage: "person-in-knit-sweater-resting-on-armchair-hand-on-lap.jpg",
    heroImageAlt: "A person in an oversized ribbed knit sweater sits curled on a cream armchair with one hand resting on their lap in a patch of afternoon sunlight, face out of frame.",
    intro:
      "Fibromyalgia is a chronic central pain syndrome that causes widespread musculoskeletal pain along with fatigue, sleep disturbance, and cognitive symptoms. There is no single procedure that resolves fibromyalgia — but careful medication management, treatment of co-occurring pain generators, and a structured plan can meaningfully improve quality of life.",
    introParagraphs: [
      "Fibromyalgia is real. The pain is real, the fatigue is real, the cognitive symptoms are real — and patients with fibromyalgia have often been dismissed for years by clinicians who do not know what to do with the diagnosis. We do.",
      "Modern understanding of fibromyalgia frames it as a central pain syndrome — a state of amplified pain processing in the central nervous system, often triggered by stressful illness, trauma, or surgery, and shaped by genetic predisposition. There is no single procedure that resolves it, but there is also no longer any reason to leave fibromyalgia patients without a plan.",
      "We treat the central pain pathology through careful medication management (membrane stabilizers, SNRIs, low-dose adjuncts), and we treat the overlapping musculoskeletal pain generators that almost always coexist — facet, SI, peripheral nerve. The combination is often what moves the needle.",
    ],
    symptoms: [
      "Widespread musculoskeletal pain on both sides of the body",
      "Fatigue and unrefreshing sleep",
      "Cognitive symptoms (\"fibro fog\")",
      "Sensitivity to touch, sound, or temperature",
    ],
    causes: [
      "Central sensitization of the nervous system",
      "Often follows stressful illness, trauma, or surgery",
      "Genetic predisposition",
      "Co-occurring spine and joint pain generators",
    ],
    approachIntro: "How we approach fibromyalgia.",
    approachServices: [
      {
        slug: "injections-blocks-specialist",
        title: "Targeted Pain Generator Treatment",
        blurb: "Identify and treat overlapping facet, SI, or peripheral pain sources.",
      },
      {
        title: "Multimodal Medication Plan",
        blurb: "Membrane stabilizers, SNRIs, and adjuncts tailored to your response.",
      },
      {
        title: "Coordinated Lifestyle Plan",
        blurb: "Sleep, graded movement, and stress modulation alongside medical care.",
      },
      {
        slug: "peptides",
        title: "Wellness & Peptides",
        blurb: "Physician-supervised peptide therapy and weight-loss support — a dedicated page is coming soon.",
      },
    ],
    diagnosisWorkup: [
      "Detailed history including pain distribution, fatigue, sleep, and cognitive symptoms.",
      "Tender-point assessment and current ACR criteria for fibromyalgia.",
      "Workup to rule out alternative or coexisting conditions (thyroid, autoimmune, anemia).",
      "Identification of overlapping musculoskeletal pain generators.",
      "Assessment for sleep apnea and other sleep disorders that worsen central sensitization.",
    ],
    whenToSeeSpecialist: [
      "Widespread pain that has lasted more than 3 months without clear explanation.",
      "Fatigue and unrefreshing sleep accompanying the pain.",
      "Diagnosis of fibromyalgia by primary care, but no clear treatment plan.",
      "Coexisting back, neck, or joint pain that has not been addressed.",
      "Reliance on opioids for fibromyalgia (which generally do not help).",
    ],
    recoveryOutlook:
      "Fibromyalgia management is a long game. We aim for steady improvement in pain, sleep, and function over 3–12 months. The patients who do best are those with engaged participation in the plan — graded activity, sleep optimization, stress modulation alongside the medical care. We do not promise cure; we aim for meaningful and durable improvement in quality of life.",
    faqs: [
      {
        q: "Is fibromyalgia in my head?",
        a: "Fibromyalgia is a real, biologically based condition involving altered central pain processing. It is not psychological — though stress, sleep, and mood interact with it the way they do with most chronic pain.",
      },
      {
        q: "Will opioids help my fibromyalgia?",
        a: "Generally not, and they often make central sensitization worse over time. We focus on medications with evidence in fibromyalgia (SNRIs, membrane stabilizers) and treat overlapping pain sources directly.",
      },
      {
        q: "What medications work for fibromyalgia?",
        a: "Duloxetine, milnacipran, pregabalin, gabapentin, and low-dose tricyclics each have evidence. The right combination depends on your symptoms and response. We are conservative and individualize.",
      },
      {
        q: "Should I keep exercising?",
        a: "Yes — graded aerobic activity is one of the most important elements of fibromyalgia management. Pain may worsen briefly when starting, but consistent low-grade activity reduces pain over weeks.",
      },
      {
        q: "Why do I have neck and back pain too?",
        a: "Most fibromyalgia patients have overlapping musculoskeletal pain generators — facet, SI, peripheral nerve. Treating those directly often unlocks the broader plan.",
      },
      {
        q: "Can fibromyalgia go into remission?",
        a: "Many patients have long stretches of significantly reduced symptoms — not necessarily \"remission\" in the formal sense, but meaningful normalcy. Stress, illness, and sleep disruption can flare it.",
      },
      {
        q: "What about supplements and alternative therapies?",
        a: "Some have modest evidence (vitamin D, magnesium, certain mind-body practices). We are pragmatic — if something helps you and is not harmful, we do not stand in the way. We do not push unproven therapies.",
      },
    ],
    philosophyBlurb:
      "Fibromyalgia patients deserve a clinician who takes the diagnosis seriously and brings a real plan. We do that. We also bring the interventional toolkit for the overlapping musculoskeletal pain generators that other practices often miss — and treating those overlapping sources is frequently what makes the rest of the plan finally work.",
    relatedConditions: relatedFor("fibromyalgia"),
  },

  "sports-injuries": {
    slug: "sports-injuries",
    title: "Sports Injuries",
    metaDescription: "Sports injury treatment in Houston and Humble. Ultrasound-guided diagnosis, PRP, and nerve blocks that respect the timeline and get you back to your sport.",
    lastReviewed: "2026-09-10",
    leadLine: "Get back to your sport — with diagnostics and biologics that respect the timeline.",
    heroImage: "young-woman-stretching-leg-on-deck-rail.jpg",
    heroImageAlt: "A young woman in athletic wear stretches her hamstring with one leg extended onto a wooden deck railing outdoors.",
    intro:
      "From the recreational athlete to the weekend warrior, sports injuries deserve a precise diagnosis and a treatment plan calibrated to your goals. Ultrasound-guided diagnostic injections, PRP therapy, and selective nerve blocks let us treat tendinopathy, joint injuries, and post-traumatic pain without unnecessary downtime.",
    introParagraphs: [
      "Sports injuries deserve a treatment plan calibrated to your goals. A 25-year-old runner with patellar tendinopathy, a 52-year-old golfer with rotator cuff trouble, and a 70-year-old pickleball player with knee OA all face different decisions about timeline, recovery, and risk tolerance.",
      "Modern interventional pain medicine offers options that did not exist a decade ago. Ultrasound-guided diagnostic injections give us precision the orthopedic clinic of 2010 did not have. PRP therapy gives us a biologic option for tendinopathy and select joint injuries. Selective nerve blocks address peripheral nerve sensitization that often layers on top of orthopedic injuries.",
      "We work with athletes of every level — and we take the same care for the recreational athlete that we take for anyone else.",
    ],
    symptoms: [
      "Pain after a specific injury or with a specific motion",
      "Loss of strength or function in a sport-specific movement",
      "Joint swelling, instability, or mechanical symptoms",
      "Tendon pain that worsens with activity",
    ],
    causes: [
      "Acute musculoskeletal injury",
      "Overuse tendinopathy",
      "Joint or ligament strain",
      "Post-injury nerve sensitization",
    ],
    approachIntro: "How we approach sports injuries.",
    approachServices: [
      {
        slug: "injections-blocks-specialist",
        title: "Ultrasound-Guided Injections",
        blurb: "Diagnostic and therapeutic for tendons, joints, and bursa.",
      },
      {
        slug: "prp-procedure",
        title: "PRP Therapy",
        blurb: "Biologic option for tendinopathy and select joint injuries.",
      },
      {
        title: "Selective Nerve Blocks",
        blurb: "When peripheral nerve sensitization is part of the picture.",
      },
    ],
    diagnosisWorkup: [
      "Detailed history of the injury — mechanism, sport-specific demands, prior care.",
      "Sport-specific physical exam — provocative testing relevant to the demand.",
      "Ultrasound for dynamic visualization of tendons and joints.",
      "MRI when surgical referral may be on the table or when ultrasound is inconclusive.",
      "Diagnostic injection when multiple potential pain generators exist.",
    ],
    whenToSeeSpecialist: [
      "Sports injury that has not improved with 4–6 weeks of conservative care.",
      "Inability to return to your sport at your previous level.",
      "Mechanical symptoms — locking, catching, instability.",
      "Recurrent injury at the same site.",
      "Tendinopathy considering biologic options like PRP.",
    ],
    recoveryOutlook:
      "Recovery from sports injuries varies widely by injury and sport. Most overuse tendinopathies respond to a combination of image-guided injection (when appropriate), eccentric loading rehab, and a structured return-to-sport program over 8–12 weeks. PRP cases work on a slower biological timeline. Acute injuries that need surgery are referred appropriately. We will give you a realistic timeline at consult — no oversold promises.",
    faqs: [
      {
        q: "Is PRP worth it for tendinopathy?",
        a: "For chronic tendinopathy that has failed conservative care, PRP has solid evidence — particularly tennis elbow, patellar tendon, and rotator cuff. We use image guidance — ultrasound or fluoroscopy — for every PRP injection.",
      },
      {
        q: "How long until I can get back to my sport?",
        a: "Highly individual — depends on injury, sport, and tissue. Most overuse injuries return to sport in 8–12 weeks. PRP cases take longer to peak. We give realistic timelines and do not push early return.",
      },
      {
        q: "Should I rest or keep training?",
        a: "Complete rest is rarely the answer. We adapt training — reducing load on the injured tissue while maintaining fitness elsewhere — until the injured tissue can tolerate sport-specific demand.",
      },
      {
        q: "Will a steroid injection ruin my tendon?",
        a: "Repeated steroid injections in the same tendon can be harmful long-term. We use steroid sparingly in tendon contexts and prefer biologics like PRP for healing.",
      },
      {
        q: "Do I need surgery for my meniscus tear?",
        a: "Many meniscus tears do well with conservative care, particularly degenerative tears in older athletes. We work with orthopedic surgeons who share that philosophy and refer when surgery is the right answer.",
      },
      {
        q: "What is eccentric loading rehab?",
        a: "Eccentric loading is a tendon-specific rehab approach (lengthening contractions) that is one of the best-evidenced treatments for tendinopathy. We coordinate with PT colleagues who do this well.",
      },
      {
        q: "Can I run while on PRP?",
        a: "There are no formal activity restrictions after PRP — most patients resume running and other activity as comfort allows, guided by their provider. Anti-inflammatory medications must be paused around the procedure to allow the inflammatory healing response to work.",
      },
    ],
    philosophyBlurb:
      "We treat athletes the way we want to be treated. Real diagnostic precision, honest answers about prognosis, biologic options when they make sense, and a return-to-sport plan that respects the timeline of your tissue rather than the calendar of your season.",
    relatedConditions: relatedFor("sports-injuries"),
  },

  "post-surgical-pain": {
    slug: "post-surgical-pain",
    title: "Post-Surgical Pain",
    metaDescription: "Post-surgical pain treatment in Houston and Humble for pain that persists after surgery — nerve blocks, ablation, and spinal cord stimulation when needed.",
    lastReviewed: "2026-09-10",
    leadLine: "When surgery resolved the issue but pain remained — interventional options that can help.",
    heroImage: "physical-therapist-guiding-resistance-band-exercise.jpg",
    heroImageAlt: "A physical therapist's hands guide a patient's arm as she pulls a green resistance band against a plain wall.",
    intro:
      "Persistent pain after surgery is one of the most under-recognized chronic-pain syndromes. Whether after spine surgery, knee or hip replacement, hernia repair, or thoracic surgery, post-surgical pain has specific interventional answers — many of them not offered by general pain practices. A careful diagnostic plan opens the door to durable relief.",
    introParagraphs: [
      "Persistent post-surgical pain is one of the most under-recognized and most treatable chronic pain syndromes in medicine. Whether the surgery was on the spine, knee, hip, chest, abdomen, or breast, a meaningful percentage of patients develop pain that outlasts the expected healing window — and most of these patients do not get the focused interventional workup their case deserves.",
      "We see this every week. The patient who had a successful spine surgery but the leg pain came back. The patient with persistent groin pain after hernia repair. The patient with thoracic pain after a thoracotomy. The patient with mastectomy pain that everyone said \"would just take time\" but did not.",
      "There is almost always a specific anatomic explanation, and almost always an interventional toolkit that can address it — selective nerve blocks, RFA, sympathetic blocks, scar neuroma injection, spinal cord stimulation. We will work through it methodically.",
    ],
    symptoms: [
      "Persistent or new pain at or near the surgical site",
      "Burning, electric, or sensitivity-to-touch quality",
      "Pain in a specific dermatome or scar pattern",
      "Pain that has not improved beyond 3–6 months post-op",
    ],
    causes: [
      "Persistent post-surgical pain syndrome (PPSP)",
      "Failed back surgery syndrome",
      "Post-thoracotomy or post-mastectomy pain",
      "Neuroma or scar entrapment",
    ],
    approachIntro: "How we approach post-surgical pain.",
    approachServices: [
      {
        slug: "spinal-cord-stimulation-specialist",
        title: "Spinal Cord Stimulation",
        blurb: "Among the most effective therapies for persistent post-surgical spine pain.",
      },
      {
        slug: "radiofrequency-ablation",
        title: "Targeted Nerve Blocks & RFA",
        blurb: "Intercostal, ilioinguinal, genicular, and dermatomal targeting.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Sympathetic Blocks",
        blurb: "For sympathetic-mediated post-surgical pain syndromes.",
      },
    ],
    diagnosisWorkup: [
      "Detailed surgical history including operative reports when available.",
      "Mapping of pain to surgical anatomy and dermatome.",
      "Focused exam including scar palpation and provocative testing.",
      "Imaging of the surgical region when warranted.",
      "Diagnostic blocks (e.g., intercostal, ilioinguinal, dorsal root) to confirm the pain generator.",
    ],
    whenToSeeSpecialist: [
      "Pain at or near a surgical site lasting beyond 3–6 months.",
      "Burning, electric, or sensitivity-to-touch pain in a specific distribution.",
      "Pain that has not improved with the surgeon's standard course.",
      "Reliance on long-term opioids after surgery.",
      "Failed back surgery syndrome — leg or back pain that returned after spine surgery.",
    ],
    recoveryOutlook:
      "Recovery from post-surgical pain treatment varies widely by case. Some patients experience dramatic relief from a single targeted nerve block. Others require a stepwise plan over months — diagnostic blocks, RFA, eventually spinal cord stimulation if needed. Our standard is to make consistent, measurable progress at each step rather than promise a single fix.",
    faqs: [
      {
        q: "What is failed back surgery syndrome?",
        a: "Persistent or recurrent back and/or leg pain after spine surgery, despite anatomically successful surgery. It is one of the strongest indications for spinal cord stimulation.",
      },
      {
        q: "Can scar tissue itself cause pain?",
        a: "Yes — particularly when nerves get entangled in or compressed by scar tissue. We can identify and treat scar-related neuromas with targeted injections and, in select cases, RFA.",
      },
      {
        q: "Will spinal cord stimulation help my failed back surgery?",
        a: "SCS has the strongest evidence in failed back surgery syndrome. Many patients who continue to suffer after spine surgery experience meaningful relief from a successful SCS trial and implant.",
      },
      {
        q: "How long should I wait after surgery before seeing you?",
        a: "Generally 3 months for elective surgeries — that lets the normal healing window play out. Sooner if the pain pattern is clearly neuropathic or if your surgeon agrees a pain consult would help.",
      },
      {
        q: "Do you communicate with my surgeon?",
        a: "Yes — we routinely send updates and coordinate care with the surgical team. Continuity matters, and most surgeons appreciate working with a thoughtful pain partner.",
      },
      {
        q: "Will I need more surgery?",
        a: "Often no. The reason patients come to pain medicine after surgery is precisely to avoid more surgery. We have many tools that work in this setting.",
      },
      {
        q: "What about CRPS after surgery?",
        a: "Complex regional pain syndrome can develop after surgery, particularly extremity procedures. Sympathetic blocks and SCS are mainstays of treatment, ideally started early to prevent the syndrome from chronifying.",
      },
    ],
    philosophyBlurb:
      "We are willing to take the time to figure out the specific pain generator in a post-surgical case. Many practices either (a) treat all post-surgical pain with one tool, or (b) defer to the surgeon's reassurance that nothing is wrong. Neither helps the patient. Our diagnostic discipline — the willingness to sequence through targeted blocks until we identify the source — is what gets these cases unstuck.",
    relatedConditions: relatedFor("post-surgical-pain"),
  },
};
