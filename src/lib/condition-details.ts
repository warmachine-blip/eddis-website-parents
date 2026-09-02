export type ConditionDetail = {
  slug: string;
  title: string;
  metaDescription: string;
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

const relatedCore = [
  {
    slug: "neuropathic-pain",
    title: "Neuropathic Pain",
    blurb: "Burning, electric, or tingling pain caused by injury or irritation of the nerves themselves.",
  },
  {
    slug: "chronic-pain",
    title: "Chronic Pain",
    blurb: "Pain that persists beyond expected healing — and the comprehensive plan it requires.",
  },
  {
    slug: "pelvic-pain",
    title: "Pelvic Pain",
    blurb: "A complex region requiring careful, compassionate diagnosis and treatment.",
  },
  {
    slug: "cancer-pain",
    title: "Cancer Pain",
    blurb: "Compassionate interventional support that complements oncology care.",
  },
  {
    slug: "joint-pain",
    title: "Joint Pain",
    blurb: "From shoulder to hip — image-guided care for the joints that move you.",
  },
];

// The live site's "Other conditions we treat" module always shows the first four
// conditions in canonical order, excluding the current page — verified against
// each scraped page's own textBlocks.
function relatedFor(selfSlug: string) {
  return relatedCore.filter((c) => c.slug !== selfSlug).slice(0, 4);
}

export const conditionDetails: Record<string, ConditionDetail> = {
  "back-pain": {
    slug: "back-pain",
    title: "Back Pain",
    metaDescription: "The most common reason patients come to us — and where we have the most to offer.",
    heroImage: "service-back-pain.jpg",
    heroImageAlt: "Back pain diagnosis and treatment at HTx Pain Institute",
    intro:
      "Most adults will experience meaningful back pain at some point. The right care begins with the right diagnosis: is the pain coming from the disc, the facet joint, the SI joint, the endplate, or the nerve? Each of those answers points to a different — and far more effective — treatment.",
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
        blurb: "For persistent post-surgical or radicular pain.",
      },
    ],
    relatedConditions: [
      {
        slug: "neuropathic-pain",
        title: "Neuropathic Pain",
        blurb: "Burning, electric, or tingling pain caused by injury or irritation of the nerves themselves.",
      },
      {
        slug: "chronic-pain",
        title: "Chronic Pain",
        blurb: "Pain that persists beyond expected healing — and the comprehensive plan it requires.",
      },
      {
        slug: "pelvic-pain",
        title: "Pelvic Pain",
        blurb: "A complex region requiring careful, compassionate diagnosis and treatment.",
      },
      {
        slug: "cancer-pain",
        title: "Cancer Pain",
        blurb: "Compassionate interventional support that complements oncology care.",
      },
    ],
  },

  "neuropathic-pain": {
    slug: "neuropathic-pain",
    title: "Neuropathic Pain",
    metaDescription: "Burning, electric, or tingling pain caused by injury or irritation of the nerves themselves.",
    heroImage: "service-neuropathic-pain-1.jpg",
    heroImageAlt: "Specialist care for neuropathic pain at HTx Pain Institute",
    intro:
      "Neuropathic pain originates from the nervous system itself — not from tissue damage. It is often described as burning, electric, shooting, or tingling, and it can be persistent and life-limiting. The right diagnosis is essential because neuropathic pain typically does not respond to standard anti-inflammatory treatments.",
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
    relatedConditions: relatedFor("neuropathic-pain"),
  },

  "chronic-pain": {
    slug: "chronic-pain",
    title: "Chronic Pain",
    metaDescription: "Pain that persists beyond expected healing — and the comprehensive plan it requires.",
    heroImage: "treatment-chronic-pain-treatment-houston.jpg",
    heroImageAlt: "Chronic pain treatment at HTx Pain Institute in Houston",
    intro:
      "Chronic pain is pain that has lasted longer than three months — long past the point where typical injury or surgery should have healed. It is its own medical condition and requires a comprehensive plan that often blends interventional procedures, rehabilitation, and lifestyle medicine.",
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
    ],
    relatedConditions: relatedFor("chronic-pain"),
  },

  "pelvic-pain": {
    slug: "pelvic-pain",
    title: "Pelvic Pain",
    metaDescription: "A complex region requiring careful, compassionate diagnosis and treatment.",
    heroImage: "treatment-pelvic-pain-treatment.jpg",
    heroImageAlt: "Pelvic pain treatment at HTx Pain Institute",
    intro:
      "Chronic pelvic pain crosses gynecologic, urologic, gastrointestinal, and neurologic boundaries, which is why it is so often missed. We focus on the nerve, joint, and musculoskeletal contributors that are most amenable to interventional therapies — typically alongside your existing specialist team.",
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
    relatedConditions: relatedFor("pelvic-pain"),
  },

  "cancer-pain": {
    slug: "cancer-pain",
    title: "Cancer Pain",
    metaDescription: "Compassionate interventional support that complements oncology care.",
    heroImage: "treatment-cancer-pain-treatment.jpg",
    heroImageAlt: "Cancer pain management at HTx Pain Institute",
    intro:
      "Cancer-related pain — whether from the disease itself, surgery, chemotherapy, or radiation — deserves a dedicated specialist. We coordinate closely with your oncology team to bring proven interventional options that can dramatically improve quality of life and reduce reliance on systemic medications.",
    symptoms: [
      "Pain from tumor invasion of bone, nerves, or organs",
      "Chemotherapy-induced peripheral neuropathy",
      "Post-surgical or post-radiation pain",
      "Compression fractures from disease or treatment",
    ],
    causes: [
      "Direct tumor effect",
      "Chemotherapy-induced neuropathy",
      "Radiation fibrosis or neuropathy",
      "Pathologic fractures",
    ],
    approachIntro: "How we approach cancer pain.",
    approachServices: [
      {
        slug: "kyphoplasty-specialist",
        title: "Kyphoplasty",
        blurb: "For painful pathologic compression fractures.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Sympathetic & Plexus Blocks",
        blurb: "Celiac plexus, superior hypogastric, ganglion impar.",
      },
      {
        slug: "spinal-cord-stimulation-specialist",
        title: "Spinal Cord Stimulation",
        blurb: "Considered for chemotherapy-induced neuropathy.",
      },
    ],
    relatedConditions: relatedFor("cancer-pain"),
  },

  "joint-pain": {
    slug: "joint-pain",
    title: "Joint Pain",
    metaDescription: "From shoulder to hip — image-guided care for the joints that move you.",
    heroImage: "treatment-joint-pain-treatment-options.jpg",
    heroImageAlt: "Joint pain treatment options at HTx Pain Institute",
    intro:
      "Joint pain — whether from osteoarthritis, tendinopathy, or post-traumatic injury — can erode the everyday life you take for granted. Our image-guided approach delivers therapy directly into the joint, with biologic options like PRP for select cases.",
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
    relatedConditions: relatedFor("joint-pain"),
  },

  "knee-pain": {
    slug: "knee-pain",
    title: "Knee Pain",
    metaDescription: "Stay on your feet. Stay in your life. We focus on what works.",
    heroImage: "treatment-knee-pain-treatment.jpg",
    heroImageAlt: "Knee pain treatment at HTx Pain Institute",
    intro:
      "Knee pain is one of the most common reasons patients see us. From early osteoarthritis to post-surgical pain, our goal is the same: keep you on your feet, in your life, with the least invasive plan that genuinely works.",
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
    relatedConditions: relatedFor("knee-pain"),
  },

  "neck-pain": {
    slug: "neck-pain",
    title: "Neck Pain",
    metaDescription: "Precision care for the cervical spine — without rushing to surgery.",
    heroImage: "treatment-neck-pain-treatment-houston.jpg",
    heroImageAlt: "Neck pain treatment at HTx Pain Institute in Houston",
    intro:
      "The cervical spine is unforgiving — small injuries can produce big symptoms. We start with a careful diagnostic plan to determine whether your pain is muscular, joint-mediated (facet), disc-related, or radicular, and we match the therapy to the diagnosis.",
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
    relatedConditions: relatedFor("neck-pain"),
  },

  "other-pain-conditions": {
    slug: "other-pain-conditions",
    title: "Other Pain Conditions",
    metaDescription: "Headaches, abdominal pain, post-surgical pain, CRPS, and more.",
    heroImage: "service-other-pain-conditions.jpg",
    heroImageAlt: "Treatment for other pain conditions at HTx Pain Institute",
    intro:
      "Pain rarely fits neatly into one category. Headaches, post-surgical pain, abdominal pain, and complex regional pain syndrome each have specific interventional answers — many of which are under-recognized in primary care. If your pain has not responded to standard treatment, we welcome the consultation.",
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
    relatedConditions: relatedFor("other-pain-conditions"),
  },

  sciatica: {
    slug: "sciatica",
    title: "Sciatica",
    metaDescription: "Radiating leg pain from compression or irritation of the sciatic nerve.",
    heroImage: "blog-sciatica.jpg",
    heroImageAlt: "Sciatica treatment at HTx Pain Institute",
    intro:
      "Sciatica is the term for pain that radiates from the lower back into the buttock and down the leg, following the path of the sciatic nerve. The cause is rarely the nerve itself — it is most often a lumbar disc herniation, foraminal stenosis, or piriformis-related compression. The right diagnosis is the difference between getting durable relief and chasing symptoms.",
    introParagraphs: [
      "Sciatica is the term for pain that radiates from the lower back into the buttock and down the leg, following the path of the sciatic nerve. The cause is rarely the nerve itself — it is most often a lumbar disc herniation, foraminal stenosis, or piriformis-related compression. The right diagnosis is the difference between getting durable relief and chasing symptoms.",
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
    metaDescription: "When the soft inner disc material pushes through the outer wall and irritates a nerve.",
    heroImage: "service-back-pain.jpg",
    heroImageAlt: "Herniated disc treatment at HTx Pain Institute",
    intro:
      "A herniated disc occurs when the soft nucleus of an intervertebral disc pushes through a tear in the outer annulus and contacts a spinal nerve. Most herniations improve with time and targeted care — and most do not require surgery. Image-guided injections, careful diagnosis, and a tailored recovery plan get the majority of patients back to their lives.",
    introParagraphs: [
      "A herniated disc occurs when the soft nucleus of an intervertebral disc pushes through a tear in the outer annulus and contacts a spinal nerve. Most herniations improve with time and targeted care — and most do not require surgery. Image-guided injections, careful diagnosis, and a tailored recovery plan get the majority of patients back to their lives.",
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
    metaDescription: "Narrowing of the spinal canal that compresses nerves and limits walking.",
    heroImage: "blog-treatment-options-for-spinal-stenosis.jpg",
    heroImageAlt: "Spinal stenosis treatment at HTx Pain Institute",
    intro:
      "Lumbar spinal stenosis is the narrowing of the spinal canal — most commonly from age-related thickening of the ligamentum flavum, disc degeneration, and facet hypertrophy. The hallmark is neurogenic claudication: leg pain or heaviness with walking that improves with sitting or leaning forward. The MILD procedure has changed what is possible for these patients.",
    introParagraphs: [
      "Lumbar spinal stenosis is the narrowing of the spinal canal — most commonly from age-related thickening of the ligamentum flavum, disc degeneration, and facet hypertrophy. The hallmark is neurogenic claudication: leg pain or heaviness with walking that improves with sitting or leaning forward. The MILD procedure has changed what is possible for these patients.",
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
    metaDescription: "From bursitis to osteoarthritis — image-guided care for the hip joint.",
    heroImage: "treatment-joint-pain-treatment-options.jpg",
    heroImageAlt: "Hip pain treatment at HTx Pain Institute",
    intro:
      "Hip pain can come from the joint itself, the surrounding tendons and bursa, or referred pain from the spine and SI joint. Diagnostic clarity matters — a targeted injection often confirms the source and provides immediate relief. We coordinate with orthopedic colleagues when surgery is the right answer, and offer image-guided non-surgical care when it is not.",
    introParagraphs: [
      "Hip pain can come from the joint itself, the surrounding tendons and bursa, or referred pain from the spine and SI joint. Diagnostic clarity matters — a targeted injection often confirms the source and provides immediate relief. We coordinate with orthopedic colleagues when surgery is the right answer, and offer image-guided non-surgical care when it is not.",
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
      "Recovery depends on the cause and treatment. Bursitis and tendinopathy often respond well to a single image-guided injection plus targeted physical therapy, with improvement over 4–8 weeks. PRP for tendinopathy works on a slower biological timeline (8–12 weeks). Hip osteoarthritis is managed with combinations of injection, RFA of the articular nerves, and lifestyle. We will give you a realistic timeline at consult.",
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
    title: "Shoulder Injuries",
    metaDescription: "Rotator cuff, labrum, and tendon issues — diagnosed precisely, treated thoughtfully.",
    heroImage: "blog-minimally-invasive-sports-injury.jpg",
    heroImageAlt: "Shoulder injury treatment at HTx Pain Institute",
    intro:
      "Shoulder pain rarely has a single cause. The rotator cuff, labrum, biceps tendon, AC joint, and cervical spine can all contribute. Image-guided injections are both diagnostic and therapeutic — and PRP is increasingly an excellent first-line biologic option for tendinopathy. We work with orthopedic and physical therapy partners to build the right plan.",
    introParagraphs: [
      "Shoulder pain rarely has a single cause. The rotator cuff, labrum, biceps tendon, AC joint, and cervical spine can all contribute. Image-guided injections are both diagnostic and therapeutic — and PRP is increasingly an excellent first-line biologic option for tendinopathy. We work with orthopedic and physical therapy partners to build the right plan.",
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
        slug: "injections-blocks-specialist",
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
      "Most shoulder conditions respond to a combination of one or two image-guided injections and a thoughtful PT plan over 6–12 weeks. PRP cases work on a slower biological timeline — typically 8–12 weeks for noticeable improvement, with continued benefit at 6 months. Patients with significant structural tears who need surgical repair are referred to a trusted orthopedic colleague; we provide pain management coverage during their post-op course.",
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
    metaDescription: "Beyond medication management — interventional options when headaches don't respond.",
    heroImage: "service-other-pain-conditions.jpg",
    heroImageAlt: "Migraine and chronic headache treatment at HTx Pain Institute",
    intro:
      "Chronic and refractory headaches are not just a medication problem. Occipital nerve blocks, sphenopalatine ganglion procedures, and selective nerve targeting can dramatically change the trajectory of a chronic headache patient. We coordinate with neurology when appropriate and bring the interventional toolkit when standard therapy isn't enough.",
    introParagraphs: [
      "Chronic and refractory headaches are not just a medication problem. Occipital nerve blocks, sphenopalatine ganglion procedures, and selective nerve targeting can dramatically change the trajectory of a chronic headache patient. We coordinate with neurology when appropriate and bring the interventional toolkit when standard therapy isn't enough.",
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
        slug: "injections-blocks-specialist",
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
        a: "Some interventional procedures (occipital block, SPG block) provide rapid relief within hours. Others (RFA) take 1–3 weeks to reach full effect. We track headache-day frequency over the first 1–3 months.",
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
    metaDescription: "A whole-person condition that benefits from a coordinated, individualized plan.",
    heroImage: "treatment-chronic-pain-treatment-houston.jpg",
    heroImageAlt: "Fibromyalgia care at HTx Pain Institute",
    intro:
      "Fibromyalgia is a chronic central pain syndrome that causes widespread musculoskeletal pain along with fatigue, sleep disturbance, and cognitive symptoms. There is no single procedure that resolves fibromyalgia — but careful medication management, treatment of co-occurring pain generators, and a structured plan can meaningfully improve quality of life.",
    introParagraphs: [
      "Fibromyalgia is a chronic central pain syndrome that causes widespread musculoskeletal pain along with fatigue, sleep disturbance, and cognitive symptoms. There is no single procedure that resolves fibromyalgia — but careful medication management, treatment of co-occurring pain generators, and a structured plan can meaningfully improve quality of life.",
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
    metaDescription: "Get back to your sport — with diagnostics and biologics that respect the timeline.",
    heroImage: "blog-minimally-invasive-sports-injury.jpg",
    heroImageAlt: "Sports injury treatment at HTx Pain Institute",
    intro:
      "From the recreational athlete to the weekend warrior, sports injuries deserve a precise diagnosis and a treatment plan calibrated to your goals. Ultrasound-guided diagnostic injections, PRP therapy, and selective nerve blocks let us treat tendinopathy, joint injuries, and post-traumatic pain without unnecessary downtime.",
    introParagraphs: [
      "From the recreational athlete to the weekend warrior, sports injuries deserve a precise diagnosis and a treatment plan calibrated to your goals. Ultrasound-guided diagnostic injections, PRP therapy, and selective nerve blocks let us treat tendinopathy, joint injuries, and post-traumatic pain without unnecessary downtime.",
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
        slug: "injections-blocks-specialist",
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
        a: "For chronic tendinopathy that has failed conservative care, PRP has solid evidence — particularly tennis elbow, patellar tendon, and rotator cuff. We use ultrasound for every PRP injection.",
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
        a: "We typically restrict running for 7–14 days post-PRP, then gradually return. Anti-inflammatory medications must be paused around the procedure to allow the inflammatory healing response to work.",
      },
    ],
    philosophyBlurb:
      "We treat athletes the way we want to be treated. Real diagnostic precision, honest answers about prognosis, biologic options when they make sense, and a return-to-sport plan that respects the timeline of your tissue rather than the calendar of your season.",
    relatedConditions: relatedFor("sports-injuries"),
  },

  "post-surgical-pain": {
    slug: "post-surgical-pain",
    title: "Post-Surgical Pain",
    metaDescription: "When surgery resolved the issue but pain remained — interventional options that can help.",
    heroImage: "blog-complex-regional-pain-syndrome.jpg",
    heroImageAlt: "Post-surgical pain care at HTx Pain Institute",
    intro:
      "Persistent pain after surgery is one of the most under-recognized chronic-pain syndromes. Whether after spine surgery, knee or hip replacement, hernia repair, or thoracic surgery, post-surgical pain has specific interventional answers — many of them not offered by general pain practices. A careful diagnostic plan opens the door to durable relief.",
    introParagraphs: [
      "Persistent pain after surgery is one of the most under-recognized chronic-pain syndromes. Whether after spine surgery, knee or hip replacement, hernia repair, or thoracic surgery, post-surgical pain has specific interventional answers — many of them not offered by general pain practices. A careful diagnostic plan opens the door to durable relief.",
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
