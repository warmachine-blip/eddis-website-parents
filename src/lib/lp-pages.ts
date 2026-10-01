/**
 * Content for the seven Google Ads landing pages at /lp/<slug>.
 *
 * Why these exist as their own copy rather than reusing src/lib/condition-details.ts
 * and src/lib/service-details.ts: Google Ads disapproved the practice's ads
 * under its policy on speculative and experimental medical treatments, which
 * covers the therapy class the agency has barred from these pages. Every
 * destination page on the
 *  * main site carries it in the menu and footer, and the joint and knee
 * condition pages recommend them in body copy.
 *
 * So the rule for this file is absolute: no mention of the disallowed therapy
 * class anywhere — body copy, titles, meta descriptions, image alt text, or the
 * structured data built from these fields. Everything here is drawn from copy
 * the main site already publishes, minus that class of treatment. No treatment
 * appears here that the site does not already list.
 *
 * The one page that needed real rewriting rather than selection is
 * "joint-knee-pain". Every edit against the live /joint-pain and /knee-pain
 * copy is logged in docs/lp-joint-knee-changes.md — kept out of this file on
 * purpose, because describing what was removed means naming it.
 */

export type LandingTreatment = {
  title: string;
  blurb: string;
};

export type LandingPage = {
  slug: string;
  /**
   * Rendered as an absolute <title> — no brand suffix. scripts/check-metadata.mjs
   * fails the build over 60 characters, and the template would add 21.
   */
  title: string;
  /** Under 160 characters, per the same check. */
  metaDescription: string;
  /** ISO date of the physician review shown in the page byline. */
  lastReviewed: string;
  eyebrow: string;
  h1: string;
  leadLine: string;
  heroImage: string;
  heroImageAlt: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  symptoms: string[];
  symptomsTitle: string;
  /** The "Causes" section — anchor target #causes. */
  causesTitle: string;
  causes: string[];
  /** "How Dr. Baumgartner finds the source" — the diagnostic workup. */
  diagnosisTitle: string;
  diagnosis: string[];
  /** The "Treatments" section — anchor target #treatments. */
  treatmentsTitle: string;
  treatmentsLead: string;
  treatments: LandingTreatment[];
  /** Rendered as the "Why HTx Pain Institute" argument for this page. */
  philosophy: string;
  /** "What to expect over time." */
  outlook: string;
  faqs: { q: string; a: string }[];
  /**
   * An optional extra section for a variant worth explaining on its own —
   * currently only the DRG block on the stimulation page.
   */
  spotlight?: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    points?: { label: string; body: string }[];
  };
  /** Procedure pages only: the Quick Facts card. */
  quickFacts?: { setting: string; anesthesia: string; recovery: string };
  /** Procedure pages only. */
  risksIntro?: string;
  risks?: string[];
  /** Shapes the page's own JSON-LD: a MedicalCondition or a MedicalProcedure. */
  schemaType: "condition" | "procedure";
};

export const landingPages: Record<string, LandingPage> = {
  // ---------------------------------------------------------------- back pain
  "back-pain": {
    slug: "back-pain",
    title: "Back Pain Treatment in Houston",
    metaDescription:
      "Back pain treatment in Houston and Humble. We find the source — disc, facet, SI joint, or nerve — then treat it with targeted, minimally invasive care.",
    lastReviewed: "2026-09-10",
    eyebrow: "Back Pain",
    h1: "Back pain, diagnosed before it is treated.",
    leadLine:
      "The most common reason patients come to us — and where we have the most to offer.",
    heroImage: "woman-from-behind-hand-on-lower-back-outdoors.jpg",
    heroImageAlt:
      "Woman in black athletic wear seen from behind outdoors, pressing one hand to her lower back.",
    overviewTitle: "Understanding back pain.",
    overviewParagraphs: [
      'Back pain is the most common reason patients come to us, and the least useful diagnosis they arrive with. "Low back pain" names a location, not a cause. The lumbar spine has several structures that can generate pain independently — the disc and its vertebral endplates, the facet joints at the back of each segment, the sacroiliac joints at the base, and the nerve roots that exit between them. Each produces a recognizable pattern, and each responds to a different treatment.',
      "That is why the first appointment is spent narrowing the field rather than reaching for a prescription. Where the pain sits, what provokes it, what relieves it, and what your imaging shows will usually shortlist one or two candidates. A diagnostic block then confirms which one is doing the talking. Only after that do we recommend a procedure — because a facet-mediated back is treated very differently from a vertebrogenic one, and the wrong procedure is not a small mistake.",
    ],
    symptomsTitle: "Common symptoms",
    symptoms: [
      "Localized low-back pain",
      "Pain radiating to the buttock or leg",
      "Pain with bending, twisting, or sitting",
      "Morning stiffness or pain after prolonged standing",
    ],
    causesTitle: "What usually causes it",
    causes: [
      "Disc herniation or degenerative disc disease",
      "Facet joint arthropathy",
      "Sacroiliac joint dysfunction",
      "Vertebrogenic pain (Modic changes)",
      "Compression fractures",
    ],
    diagnosisTitle: "How Dr. Baumgartner finds the source.",
    diagnosis: [
      "Detailed history — where the pain sits, what provokes it, and whether it radiates below the knee.",
      "Physical exam including range of motion, provocative facet and SI maneuvers, and a neurologic screen.",
      "Review of existing imaging; MRI when the pattern suggests disc, nerve, or endplate involvement.",
      "Diagnostic medial branch blocks when facet-mediated pain is suspected — two separate blocks are required before radiofrequency ablation.",
      "Diagnostic sacroiliac injection when pain localizes to the buttock and provocative testing is positive.",
    ],
    treatmentsTitle: "How we treat back pain.",
    treatmentsLead:
      "Which of these applies depends entirely on what the workup confirms. We do not pick a procedure first.",
    treatments: [
      {
        title: "Radiofrequency Ablation",
        blurb:
          "Durable relief for facet- or SI-mediated pain confirmed on two diagnostic medial branch blocks.",
      },
      {
        title: "Intracept Procedure",
        blurb: "Implant-free relief for vertebrogenic low-back pain.",
      },
      {
        title: "Epidural Steroid Injections",
        blurb:
          "Targeted relief for radicular pain from a disc herniation or stenosis, placed under live image guidance.",
      },
      {
        title: "Spinal Cord Stimulation",
        blurb:
          "For persistent axial back pain, post-surgical pain, or radicular pain — trialed before anything is implanted.",
      },
      {
        title: "SI Joint Fusion",
        blurb: "When diagnostic blocks confirm the sacroiliac joint as the pain source.",
      },
      {
        title: "Minuteman Lumbar Fusion",
        blurb:
          "Posterior, minimally invasive stabilization when imaging shows a lumbar segment that would benefit from it.",
      },
      {
        title: "Kyphoplasty",
        blurb: "Stabilizes a painful vertebral compression fracture.",
      },
    ],
    philosophy:
      "There is no single back pain procedure, and any practice offering one is guessing. Dr. Baumgartner's approach is to name the pain generator before treating it — history, exam, imaging, and where needed a diagnostic block that has to actually confirm the hypothesis. It sometimes takes an extra visit. It also avoids the far more expensive mistake of a well-executed procedure on the wrong structure.",
    outlook:
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
        q: "What if I have had back pain for years?",
        a: "Duration alone rules nothing out. Long-standing pain still has a source, and a structured diagnostic workup is often the first one a patient has had. We are candid when the realistic goal is better function rather than complete resolution.",
      },
    ],
    schemaType: "condition",
  },

  // --------------------------------------------------------- joint & knee pain
  "joint-knee-pain": {
    slug: "joint-knee-pain",
    title: "Joint & Knee Pain Treatment in Houston",
    metaDescription:
      "Knee, hip and shoulder pain treatment in Houston and Humble. Genicular nerve blocks, radiofrequency ablation and ultrasound-guided joint injections.",
    lastReviewed: "2026-10-01",
    eyebrow: "Joint & Knee Pain",
    h1: "Joint and knee pain, treated at the structure causing it.",
    leadLine:
      "Knee, hip and shoulder — image-guided care for the joints that move you, without rushing to replacement.",
    heroImage: "hand-pressing-painful-knee-seated-on-bed.jpg",
    heroImageAlt:
      "Close-up of a woman seated on a bed in a floral dress pressing her hand against her bare knee.",
    overviewTitle: "Understanding joint and knee pain.",
    overviewParagraphs: [
      '"Joint pain" covers a great deal of ground — a shoulder that will not lift, a hip that aches on stairs, a knee that swells after a walk. What those have in common is not a cause but a method: work out which structure is producing the pain, put the treatment exactly there, and use the least invasive option that genuinely addresses it.',
      "Most joints hurt for one of a handful of reasons — osteoarthritis, tendon or bursal problems around the joint, post-traumatic change, or referred pain from the spine. Those look similar from the outside and behave very differently once treated, which is why image-guided diagnostic injections do so much of the work here.",
      "The knee is the joint we see most, and most knee pain that reaches us has already been through the obvious steps — rest, anti-inflammatories, physical therapy, perhaps an injection or an arthroscopy. The question by then is not whether the knee hurts but what specifically is generating the pain, and whether anything useful sits between conservative care and joint replacement. Usually something does: patellar and quadriceps tendinopathy, persistent pain after meniscectomy or replacement, and sensitized genicular nerves all present as \"knee pain\" and respond to different things.",
    ],
    symptomsTitle: "Common symptoms",
    symptoms: [
      "Pain with stairs, squatting, or kneeling",
      "Pain with weight-bearing or specific motions",
      "Stiffness, swelling, or grinding",
      "Mechanical symptoms — clicking, catching, or giving way",
      "Loss of range of motion",
      "Sleep disturbance from joint pain",
    ],
    causesTitle: "What usually causes it",
    causes: [
      "Osteoarthritis",
      "Patellar or quadriceps tendinopathy",
      "Rotator cuff or labral pathology",
      "Genicular nerve sensitization",
      "Post-meniscectomy or post-surgical pain",
      "Post-traumatic joint injury",
      "Referred pain from the lumbar spine or sacroiliac joint",
    ],
    diagnosisTitle: "How Dr. Baumgartner finds the source.",
    diagnosis: [
      "History — which movements provoke the pain, whether the joint swells, whether it wakes you at night, and whether there are mechanical symptoms such as catching or giving way.",
      "Focused examination of the joint and the structures around it — for the knee, the joint line, patellofemoral tracking, ligament stability, and gait — with provocative testing.",
      "X-ray as the usual first imaging step, weight-bearing for the knee; MRI or ultrasound when soft-tissue pathology or a surgical question is in play.",
      "Image-guided diagnostic injection to separate pain inside the joint from surrounding tendon or bursa.",
      "Genicular nerve block when nerve-mediated knee pain is suspected — a positive response is what qualifies you for ablation.",
      "Assessment of the spine and sacroiliac joints when the pattern suggests referred rather than local pain.",
    ],
    treatmentsTitle: "How we treat joint and knee pain.",
    treatmentsLead:
      "Every injection here is placed under ultrasound or live fluoroscopy. That is what makes the therapeutic ones work and the diagnostic ones worth trusting.",
    treatments: [
      {
        title: "Genicular Nerve Block & Radiofrequency Ablation",
        blurb:
          "The genicular nerves carry pain signals from the knee. A block confirms they are the route your pain travels; if it does, ablation quiets them. Durable relief for moderate-to-severe knee osteoarthritis.",
      },
      {
        title: "Ultrasound-Guided Joint Injections",
        blurb:
          "Steroid and local anesthetic placed inside the knee, hip, or shoulder under real-time ultrasound, so the medication reaches the structure it was aimed at.",
      },
      {
        title: "Articular Nerve Radiofrequency Ablation",
        blurb:
          "The same principle as the knee, applied to the articular nerves of the hip and shoulder where the joint allows it — for confirmed, nerve-mediated joint pain.",
      },
      {
        title: "Hyaluronic Acid (Viscosupplementation)",
        blurb:
          "A non-steroid injection option for select knee osteoarthritis, where repeated corticosteroid is not the right answer.",
      },
      {
        title: "Peripheral Nerve Blocks",
        blurb:
          "Targeted blocks of the nerves supplying a joint, including suprascapular blocks for the shoulder — diagnostic and therapeutic.",
      },
      {
        title: "Image-Guided Diagnostic Injections",
        blurb:
          "Used deliberately as a test: the local anesthetic response tells us whether we have the right structure before any durable procedure is recommended.",
      },
    ],
    philosophy:
      "A joint injection is only as good as its placement, so we use image guidance for every one — ultrasound or fluoroscopy depending on the target. That matters twice over here: it makes the therapeutic injections work, and it makes the diagnostic ones trustworthy, which is what determines whether ablation is worth doing at all. Repeating the same blind injection and hoping for a different result is not a treatment plan.",
    outlook:
      "Tendon and bursal problems often respond well to a single image-guided injection plus a targeted rehabilitation plan, with improvement over 4 to 8 weeks. Genicular nerve ablation follows the same arc as radiofrequency ablation elsewhere: the procedure itself takes about 15 minutes, mild soreness settles over a few days, most patients return to light activity the next day, and full benefit is reached at about the 6-week mark — relief commonly lasts 6 to 18 months and the procedure can be repeated. Steroid and hyaluronic acid injections act faster but for a shorter period. Osteoarthritis itself is managed rather than cured. We will give you a realistic timeline for your joint at consult rather than an average.",
    faqs: [
      {
        q: "Can anything help knee arthritis short of replacement?",
        a: "Yes, and it is much of what we do. Image-guided injections, hyaluronic acid in select cases, and genicular nerve ablation for moderate-to-severe arthritis can meaningfully reduce pain and delay replacement. For severe end-stage arthritis we will tell you when replacement is the better answer.",
      },
      {
        q: "What is genicular nerve ablation?",
        a: "The genicular nerves carry pain signals from the knee. A diagnostic block confirms they are the route your pain travels; if it does, radiofrequency ablation quiets them. It does not treat the arthritis itself — it interrupts the signal, which is often exactly what is needed.",
      },
      {
        q: "Is my joint pain actually coming from my back?",
        a: 'Sometimes. Referred pain from the lumbar spine and sacroiliac joint is one of the most common causes of "hip pain" we see, and cervical problems can present as shoulder pain. Pattern, exam, and a diagnostic injection separate them.',
      },
      {
        q: "How often can I have a steroid injection?",
        a: "We follow evidence-based limits — typically no more than three to four corticosteroid injections per region per year — and use them strategically rather than as ongoing therapy. Repeated corticosteroid in the same joint or tendon is not harmless. If you find yourself needing an injection every few months, that is a signal to consider a more durable option such as nerve ablation.",
      },
      {
        q: "Which joints do you treat?",
        a: "Most peripheral joints — shoulder, hip, knee, elbow, wrist and hand, ankle and foot — as well as the spinal facet and sacroiliac joints. Where a joint needs surgery, we say so and refer to an orthopedic colleague we trust.",
      },
      {
        q: "I still have pain after my knee replacement. Is that treatable?",
        a: "Often. Persistent pain after replacement can be nerve-mediated, and a genicular block is a reasonable diagnostic step. We coordinate with your surgeon rather than working around them.",
      },
      {
        q: "Do I need a driver for a knee procedure?",
        a: "If you receive sedation, yes. Only minor, local-anesthetic-only procedures may allow you to drive yourself, and only per your provider's guidance. We confirm transportation when we schedule, so it is not a surprise on the day.",
      },
    ],
    schemaType: "condition",
  },

  // ---------------------------------------------------------------- neck pain
  "neck-pain": {
    slug: "neck-pain",
    title: "Neck Pain Treatment in Houston",
    metaDescription:
      "Neck pain treatment in Houston and Humble. Precision cervical care — diagnostic blocks, radiofrequency ablation, and injections before considering surgery.",
    lastReviewed: "2026-09-10",
    eyebrow: "Neck Pain",
    h1: "Neck pain, treated with precision rather than assumption.",
    leadLine: "Precision care for the cervical spine — without rushing to surgery.",
    heroImage: "treatment-neck-pain-treatment-houston.jpg",
    heroImageAlt: "Neck pain treatment at HTx Pain Institute in Houston",
    overviewTitle: "Understanding neck pain.",
    overviewParagraphs: [
      "The cervical spine carries a heavy head on a small, mobile column, and it is unforgiving — modest changes produce disproportionate symptoms. The neck also refers pain in ways that confuse the picture. Cervical facet joints refer into the shoulder blade and the back of the head; a compressed cervical nerve root refers into the arm and hand in a pattern that maps to the level involved.",
      "Our job is to separate muscular pain from joint-mediated pain from nerve-mediated pain, because the treatments diverge sharply. That distinction comes from the pattern of your symptoms, a focused exam, and — where facet pain is suspected — a pair of diagnostic blocks that have to confirm it before anything further is done.",
    ],
    symptomsTitle: "Common symptoms",
    symptoms: [
      "Aching or sharp neck pain",
      "Headaches that originate from the neck",
      "Pain or tingling radiating to the shoulder, arm, or hand",
      "Stiffness with rotation or extension",
    ],
    causesTitle: "What usually causes it",
    causes: [
      "Cervical facet arthropathy",
      "Cervical disc herniation",
      "Whiplash-associated disorders",
      "Cervicogenic headache",
    ],
    diagnosisTitle: "How Dr. Baumgartner finds the source.",
    diagnosis: [
      "History focused on the pattern — midline neck ache, referred pain into the shoulder blade or head, or radiating arm symptoms.",
      "Physical exam with range of motion, Spurling's test, and a neurologic screen of the upper limbs.",
      "Review of existing imaging; MRI of the cervical spine when radicular or myelopathic features are present.",
      "Cervical medial branch blocks when facet-mediated pain is suspected — two separate blocks are required before radiofrequency ablation.",
      "Selective nerve root injection when the level of a radiculopathy is unclear on imaging.",
    ],
    treatmentsTitle: "How we treat neck pain.",
    treatmentsLead:
      "Every cervical procedure here is performed under live fluoroscopic guidance. The cervical spine rewards precision and punishes assumption.",
    treatments: [
      {
        title: "Cervical Medial Branch Blocks & Radiofrequency Ablation",
        blurb:
          "Lasting relief for cervical facet pain, after two separate diagnostic blocks have both confirmed the source.",
      },
      {
        title: "Cervical Epidural Injections",
        blurb:
          "Targeted relief for cervical radiculopathy — often long enough for an irritated nerve root to settle.",
      },
      {
        title: "Selective Nerve Root Injections",
        blurb:
          "Both diagnostic and therapeutic, used when the level of a radiculopathy is unclear on imaging.",
      },
      {
        title: "Upper Cervical Blocks for Cervicogenic Headache",
        blurb:
          "When headaches start at the base of the skull and track with neck movement, diagnostic blocks confirm the upper cervical facets as the source.",
      },
    ],
    philosophy:
      "The cervical spine rewards precision and punishes assumption. Every cervical procedure here is performed under live fluoroscopic guidance, and facet pain is confirmed on two separate diagnostic blocks before any ablation — not one, and not none. That standard is the reason our cervical ablations tend to work when we do them.",
    outlook:
      "Cervical facet pain confirmed on two diagnostic blocks generally responds well to radiofrequency ablation. The procedure itself takes about 15 minutes, mild soreness settles over a few days, most patients return to light activity the next day, and full benefit is reached at about the 6-week mark — commonly lasting 6 to 18 months and repeatable once the treated nerve has grown back. Cervical radiculopathy treated with an epidural steroid injection often improves over weeks, which is frequently long enough for an irritated nerve root to settle. Cervicogenic headache tends to track with the neck pain driving it, so we measure headache days and function rather than a pain score alone.",
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
        q: "What if my neck pain started with a car accident?",
        a: "Whiplash injuries commonly involve the cervical facet joints and are frequently under-diagnosed. We assess them the same way as any facet pain, and we provide the documentation an injury claim requires.",
      },
      {
        q: "How long will I be off work?",
        a: "Most patients return to desk work the next day after an ablation and to physical work within 2 to 3 days, depending on the area treated. We give you guidance specific to your job.",
      },
    ],
    schemaType: "condition",
  },

  // --------------------------------------------------------- neuropathic pain
  "neuropathic-pain": {
    slug: "neuropathic-pain",
    title: "Nerve Pain Treatment in Houston",
    metaDescription:
      "Burning, electric or tingling nerve pain treated in Houston and Humble — from diabetic neuropathy to CRPS, with nerve blocks and spinal cord stimulation.",
    lastReviewed: "2026-09-10",
    eyebrow: "Neuropathic Pain",
    h1: "Nerve pain, treated as a pathway rather than a location.",
    leadLine:
      "Burning, electric, or tingling pain caused by injury or irritation of the nerves themselves.",
    heroImage: "clinician-examining-patient-foot.jpg",
    heroImageAlt:
      "A clinician in blue scrubs presses both thumbs into the sole of a patient's bare foot resting on a white towel in a clinic room.",
    overviewTitle: "Understanding neuropathic pain.",
    overviewParagraphs: [
      "Neuropathic pain comes from the nervous system itself rather than from damaged tissue, and it behaves differently because of it. Patients describe burning, electric shocks, crawling, or an area that is numb and painful at the same time. Light touch — a bedsheet, a sock, a shirt seam — can be intolerable while firm pressure is not. It frequently worsens at night, when there is nothing else to attend to.",
      "It also does not respond to the treatments that work for tissue pain. Anti-inflammatories do relatively little, and escalating opioids tends to produce side effects rather than relief. What does help is identifying which nerves are involved and treating at that level — with medication chosen for nerve pain, targeted blocks, and, for refractory cases, neuromodulation.",
    ],
    symptomsTitle: "Common symptoms",
    symptoms: [
      "Burning, electric, or shooting pain",
      "Tingling, pins-and-needles, or numbness",
      "Sensitivity to light touch (allodynia)",
      "Pain that worsens at night or with rest",
    ],
    causesTitle: "What usually causes it",
    causes: [
      "Diabetic peripheral neuropathy",
      "Postherpetic neuralgia (after shingles)",
      "Nerve injury after surgery or trauma",
      "Radiculopathy from spine pathology",
      "Complex regional pain syndrome (CRPS)",
    ],
    diagnosisTitle: "How Dr. Baumgartner finds the source.",
    diagnosis: [
      "History of the character, distribution, and timing of the pain — burning and electric qualities point away from tissue pain.",
      "Neurologic examination mapping sensory change, allodynia, weakness, and reflexes.",
      "Identification of an underlying cause where one exists — diabetes, prior shingles, surgery, trauma, or spine pathology.",
      "MRI of the relevant spinal region when a radicular pattern suggests nerve root involvement.",
      "Diagnostic nerve or sympathetic block to confirm the pain pathway before committing to a longer-term therapy.",
    ],
    treatmentsTitle: "How we treat nerve pain.",
    treatmentsLead:
      "Nerve pain is where guessing costs the most, because the wrong treatment delays the right one while the pain becomes more established.",
    treatments: [
      {
        title: "Spinal Cord Stimulation",
        blurb:
          "Among the most effective therapies for refractory neuropathic pain, and FDA-approved for painful diabetic peripheral neuropathy. Trialed for 5 to 7 days before anything is implanted.",
      },
      {
        title: "Dorsal Root Ganglion (DRG) Stimulation",
        blurb:
          "For pain that has stayed in one defined area. FDA-approved in the United States for complex regional pain syndrome of the lower limbs.",
      },
      {
        title: "Sympathetic Blocks",
        blurb:
          "Stellate ganglion, lumbar sympathetic, celiac plexus and ganglion impar blocks — diagnostic and therapeutic for sympathetically-mediated pain such as CRPS.",
      },
      {
        title: "Targeted Peripheral Nerve Blocks",
        blurb:
          "Used to confirm which nerve is carrying the pain, and to treat it once confirmed.",
      },
      {
        title: "Epidural Steroid Injections",
        blurb:
          "For radicular nerve pain from spine pathology, placed under live image guidance.",
      },
    ],
    philosophy:
      "Nerve pain is where guessing costs the most, because the wrong treatment is not merely ineffective — it delays the right one while the pain becomes more established. We diagnose it as a pathway rather than a location, confirm that pathway with a block where the answer is not clear, and stay candid about the difference between eliminating pain and restoring function.",
    outlook:
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
        q: "Do I have to stop my pain medication?",
        a: "We do not require it. Most patients find they need significantly less after a successful trial and implant, and we coordinate any changes with you over time rather than imposing them.",
      },
    ],
    schemaType: "condition",
  },

  // ------------------------------------------------------------- chronic pain
  "chronic-pain": {
    slug: "chronic-pain",
    title: "Chronic Pain Treatment in Houston",
    metaDescription:
      "Chronic pain care in Houston and Humble for pain that outlasts healing. Double board-certified diagnosis and a plan built to reduce medication reliance.",
    lastReviewed: "2026-09-10",
    eyebrow: "Chronic Pain",
    h1: "Chronic pain, starting with the diagnosis nobody gave you.",
    leadLine:
      "Pain that persists beyond expected healing — and the comprehensive plan it requires.",
    heroImage: "older-woman-seated-on-sofa-head-down-hands-over-face.jpg",
    heroImageAlt:
      "An older woman with gray hair sits on the edge of a beige sofa in jeans and a white shirt, head bowed with both hands covering her face.",
    overviewTitle: "Understanding chronic pain.",
    overviewParagraphs: [
      "Chronic pain — pain lasting beyond three months, past the point where an injury or operation should have healed — is not simply acute pain that went on too long. The nervous system changes under sustained input: pain thresholds fall, unrelated areas become sensitive, sleep degrades, and the pain begins to sustain itself somewhat independently of whatever started it.",
      "That has two consequences for treatment. First, there is usually still a structural driver worth finding and treating, and many patients arrive having never had a specific diagnosis. Second, treating that driver alone is often not enough. A plan that addresses the source, restores sleep and movement, and reduces reliance on long-term medication outperforms any single procedure.",
    ],
    symptomsTitle: "Common symptoms",
    symptoms: [
      "Persistent pain longer than 3 months",
      "Pain that limits work, sleep, or relationships",
      "Multiple unsuccessful prior treatments",
      "Reliance on long-term oral pain medications",
    ],
    causesTitle: "What usually causes it",
    causes: [
      "Spine-related pathology (disc, facet, stenosis)",
      "Post-surgical pain",
      "Fibromyalgia and central sensitization",
      "Joint degeneration",
      "Untreated or undertreated nerve injury",
    ],
    diagnosisTitle: "How Dr. Baumgartner finds the source.",
    diagnosis: [
      "A full history of the pain from onset — what started it, how it has changed, and what has been tried.",
      "Review of prior imaging, procedures, and medication trials, including what helped and for how long.",
      "Physical examination looking for a remaining treatable structural source rather than assuming there is none.",
      "Targeted imaging where the exam raises a specific question that would change the plan.",
      "Diagnostic blocks to confirm a suspected pain generator before committing to a durable procedure.",
    ],
    treatmentsTitle: "How we treat chronic pain.",
    treatmentsLead:
      "Where a specific generator is confirmed, we treat it. Where no single generator explains everything, we sequence — and say so.",
    treatments: [
      {
        title: "Diagnostic Blocks",
        blurb:
          "Used first, not last: a block that has to confirm the hypothesis before any durable procedure is recommended.",
      },
      {
        title: "Radiofrequency Ablation",
        blurb:
          "Lasting relief for facet- and SI-mediated pain, after diagnostic blocks have confirmed the target.",
      },
      {
        title: "Spinal Cord Stimulation",
        blurb:
          "When pain has not responded to conservative care. Trialed for 5 to 7 days at home before anything is implanted, and fully reversible.",
      },
      {
        title: "Minuteman Lumbar Fusion",
        blurb:
          "For lumbar pain that has not responded to physical therapy and injections over 6+ months.",
      },
      {
        title: "A Coordinated Plan",
        blurb:
          "Interventional treatment alongside rehabilitation and sleep, and a deliberate effort to reduce reliance on long-term medication. Not a procedure — the part that makes the procedures hold.",
      },
    ],
    philosophy:
      "The most common thing missing from a long chronic pain history is a specific diagnosis. Before adding another treatment to the list, we go back and ask what is actually generating the pain and confirm it — and then we are honest about what interventional care can and cannot deliver. Consistent, measurable progress at each step beats a promised cure.",
    outlook:
      "Progress in chronic pain is measured in function as much as in pain scores — sleeping through the night, working a full day, walking further than last month. Where a specific generator is confirmed, the procedure timelines are the same as anywhere else: radiofrequency ablation takes about 15 minutes, reaches full benefit at about the 6-week mark, and commonly gives 6 to 18 months of relief; spinal cord stimulation is trialed for 5 to 7 days before any implant. Where no single generator explains everything, we sequence — treat what is treatable, rebuild capacity alongside it, and reassess. We would rather make consistent, measurable progress at each step than promise a single fix.",
    faqs: [
      {
        q: "I have been told nothing more can be done. Is that true?",
        a: "It depends what has actually been tried. A large part of this practice is patients who never received a specific diagnosis — no diagnostic blocks, no assessment of the facet or sacroiliac joints, no consideration of neuromodulation. Sometimes there really is nothing more; often there is.",
      },
      {
        q: "Can chronic pain be cured?",
        a: "Sometimes, when a specific and treatable source is found. More often the realistic goal is substantial reduction and a return to function. We are direct about which of those we think applies to you.",
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
    ],
    schemaType: "condition",
  },

  // --------------------------------------------------- spinal cord stimulation
  "spinal-cord-stimulation": {
    slug: "spinal-cord-stimulation",
    title: "Spinal Cord Stimulation in Houston",
    metaDescription:
      "Spinal cord and dorsal root ganglion (DRG) stimulation in Houston and Humble. A trial-first implant that interrupts pain signals. Fully reversible.",
    lastReviewed: "2026-09-28",
    eyebrow: "Spinal Cord Stimulation",
    h1: "Spinal cord stimulation, tried before it is implanted.",
    leadLine: "Reprogram pain at the source of the signal.",
    heroImage: "practitioner-showing-spine-model-to-patient.jpg",
    heroImageAlt:
      "A clinician holds a color-coded anatomical spine model and explains it to a seated woman in a rehab studio with large windows and plants.",
    overviewTitle: "Understanding spinal cord stimulation.",
    overviewParagraphs: [
      "Spinal cord stimulation (SCS) is one of the most studied therapies in modern pain medicine. A small implantable device delivers tailored electrical fields to the spinal cord — interrupting pain signals before they reach the brain.",
      "What makes it unusual is that you find out whether it works before committing to it. Temporary leads are placed for a 5 to 7 day trial you spend at home, living your normal life and tracking your pain. We proceed to a permanent implant only if the trial reduces your pain by at least 50% and improves function. If it does not, the leads come out in seconds in the office and we look elsewhere. The permanent system is fully reversible too.",
    ],
    symptomsTitle: "What it is used for",
    symptoms: [
      "Failed back surgery syndrome / persistent post-surgical spine pain",
      "Axial back pain — pain centered in the back itself rather than radiating into a limb",
      "Various neuropathies, including diabetic peripheral neuropathy",
      "Complex regional pain syndrome (CRPS)",
      "Refractory radicular pain",
    ],
    causesTitle: "What usually brings patients here",
    causes: [
      "A spine operation that helped less than expected, or not at all",
      "Nerve pain that has not responded to medication or injections",
      "Painful diabetic peripheral neuropathy",
      "CRPS after an injury or operation",
      "Escalating medication without a matching improvement in function",
    ],
    diagnosisTitle: "How Dr. Baumgartner confirms you are a candidate.",
    diagnosis: [
      "A full review of what has been tried — prior surgery, injections, ablation, and medication, including what helped and for how long.",
      "Examination and imaging review to establish whether a treatable structural source remains that should be addressed first.",
      "Assessment of the pain's character and distribution, which determines whether standard SCS or DRG stimulation fits better.",
      "A temporary 5 to 7 day trial at home — the decisive test. Pain must fall by at least 50% and function must improve.",
      "Leads are removed in seconds in the office if the trial does not deliver, and we move on to other options.",
    ],
    treatmentsTitle: "How the therapy works.",
    treatmentsLead:
      "A trial first, every time. Nothing is implanted on the strength of a prediction.",
    treatments: [
      {
        title: "The Trial",
        blurb:
          "Temporary leads placed in a 30 to 45 minute procedure with no incisions, then 5 to 7 days at home with an external generator worn on a belt.",
      },
      {
        title: "Permanent Implant",
        blurb:
          "Leads and a small generator placed in a brief outpatient procedure of about 60 minutes — only after a successful trial.",
      },
      {
        title: "DRG Stimulation",
        blurb:
          "A lead placed beside the dorsal root ganglion rather than over the spinal cord, for pain concentrated in one defined area. Same trial-first path.",
      },
      {
        title: "Programming & Follow-Up",
        blurb:
          "Therapy is fine-tuned remotely by our team using your feedback, with long-term follow-up to optimize programming as needed.",
      },
    ],
    spotlight: {
      eyebrow: "DRG Stimulation",
      title: "When the pain stays in one specific place.",
      paragraphs: [
        "The dorsal root ganglion is a small bundle of sensory nerve cell bodies sitting just outside the spinal cord at each level. Every signal from one region of the body passes through it. DRG stimulation places a lead beside that ganglion rather than over the spinal cord itself.",
        "In the United States, DRG stimulation is FDA-approved for complex regional pain syndrome of the lower limbs. It is also worth discussing when neuropathic pain has stayed in one defined area after a specific operation, such as a hernia repair or a knee replacement. The path is the same as standard SCS: a trial first, and an implant only if the trial works.",
      ],
      points: [
        {
          label: "Narrower target",
          body: "Traditional SCS covers a broad area, which suits pain spread across the back and down a limb. DRG concentrates coverage on a smaller, well-defined area such as a foot, a knee, or the groin.",
        },
        {
          label: "Steadier with position",
          body: "There is very little cerebrospinal fluid between the lead and the ganglion, so stimulation tends to stay consistent whether you are standing or lying down.",
        },
        {
          label: "Same trial-first path",
          body: "A temporary trial comes first, exactly as it does with standard SCS, and nothing is implanted unless the trial reduces your pain and improves what you can do.",
        },
      ],
    },
    quickFacts: {
      setting: "Outpatient trial and implant",
      anesthesia: "Discussed at consult",
      recovery: "Light activity 4–6 weeks after implant",
    },
    philosophy:
      "Spinal cord stimulation is one of Dr. Baumgartner's areas of clinical focus. He has performed hundreds of SCS trials and implants since fellowship and works directly with the major device manufacturers — selecting the right system and waveform for each patient rather than defaulting to one platform. He offers both standard spinal cord stimulation and DRG stimulation, which is what makes it possible to match the therapy to where the pain actually sits.",
    outlook:
      "After the trial, leads are removed in seconds in-office. After a permanent implant, light activity for 4 to 6 weeks while the leads anchor, and most patients return to work within 1 to 2 weeks. Programming sessions dial in the therapy for you, and follow-up continues long-term so it can be adjusted as things change. Modern systems are rechargeable with roughly 10+ years before generator replacement, MRI-conditional under specific conditions, and fully reversible — both the trial and the permanent system can be removed.",
    risksIntro:
      "Every procedure carries some risk. We explain everything in plain language during your consultation, and again on the day of the procedure — so you know what is normal, what to watch for, and when to call.",
    risks: [
      "Lead migration — uncommon with modern anchoring techniques but possible.",
      "Infection at the implant site — minimized through sterile technique and prophylactic antibiotics.",
      "Battery or hardware malfunction — rare and managed by the device manufacturer.",
      "Loss of effectiveness over time in some patients; reprogramming or revision can often address.",
      "Bruising or temporary discomfort at the incision sites.",
    ],
    faqs: [
      {
        q: "What does the trial period feel like?",
        a: "During the 5 to 7 day trial, you wear an external generator on a belt and the leads exit through a small dressing on your back. You go about your daily life and track your pain. We adjust programming remotely.",
      },
      {
        q: "What is the difference between SCS and DRG stimulation?",
        a: "Traditional spinal cord stimulation places leads over the spinal cord and covers a broad area. DRG stimulation targets the dorsal root ganglion at a single level, which concentrates coverage on a smaller, well-defined area such as a foot, a knee, or the groin. In the United States it is FDA-approved for complex regional pain syndrome of the lower limbs. Both follow the same trial-first path, and Dr. Baumgartner offers both.",
      },
      {
        q: "Will I feel anything from the device?",
        a: "Modern paresthesia-free waveforms deliver pain relief without the older tingling sensation. Most patients are unaware of the device working in the background.",
      },
      {
        q: "Is this reversible?",
        a: "Yes. SCS is fully reversible — both the trial and the permanent system can be removed.",
      },
      {
        q: "Is the implant safe with MRI scans?",
        a: "Modern SCS systems are MRI-conditional, meaning MRI is safe under specific conditions. The device manufacturer provides a wallet card with the exact parameters your imaging facility needs.",
      },
      {
        q: "Can SCS help with diabetic neuropathy?",
        a: "Yes — SCS is FDA-approved for painful diabetic peripheral neuropathy and has strong published outcomes. We screen carefully for candidacy.",
      },
      {
        q: "Will I need to stop taking pain medications?",
        a: "We do not require it, but most patients find they need significantly less medication after a successful trial and implant. We coordinate any medication changes with you over time.",
      },
    ],
    schemaType: "procedure",
  },

  // ----------------------------------------------------------- SI joint fusion
  "si-joint-fusion": {
    slug: "si-joint-fusion",
    title: "SI Joint Fusion in Houston",
    metaDescription:
      "SI joint fusion in Houston and Humble. Minimally invasive stabilization for confirmed sacroiliac joint pain that has not responded to conservative care.",
    lastReviewed: "2026-09-10",
    eyebrow: "SI Joint Fusion",
    h1: "SI joint fusion, once the joint has been confirmed as the source.",
    leadLine: "A definitive answer for chronic SI joint pain.",
    heroImage: "clinician-palpating-lower-back-seated-patient.jpg",
    heroImageAlt:
      "A clinician in mint-green scrubs presses one hand against the mid-back and the other against the lower back of a woman seated upright and fully clothed on the edge of a padded exam table.",
    overviewTitle: "Understanding SI joint fusion.",
    overviewParagraphs: [
      "The sacroiliac joint sits at the base of the spine, where the sacrum meets the pelvis. When it is the source of chronic low-back, buttock, or groin pain — and conservative care has not worked — minimally invasive SI joint fusion offers a definitive solution.",
      "Through a small incision, typically under 3 cm, a fusion implant or graft is placed across the joint under fluoroscopic guidance. It stabilizes the joint immediately and promotes bone fusion across the joint over the following months. Most patients go home the same day and walk unassisted that day.",
      "The condition most worth knowing about here is post-lumbar-fusion SI joint pain, one of the most common and most underdiagnosed presentations we see. The SI joint takes on additional stress after a lumbar fusion, and many patients who feel their lumbar fusion \"failed\" are in fact dealing with SI joint dysfunction.",
    ],
    symptomsTitle: "What it is used for",
    symptoms: [
      "Confirmed SI joint pain unresponsive to physical therapy and injections",
      "SI joint disruption from a prior lumbar fusion",
      "Pain that limits walking, sitting, or stair climbing",
      "Failure of conservative care over 6+ months",
    ],
    causesTitle: "What usually causes SI joint pain",
    causes: [
      "Sacroiliac joint dysfunction or degeneration",
      "Additional stress on the joint after a lumbar fusion",
      "Post-traumatic injury to the pelvis or low back",
      "Pregnancy-related ligamentous change",
      "Inflammatory involvement of the joint",
    ],
    diagnosisTitle: "How Dr. Baumgartner finds the source.",
    diagnosis: [
      "History of where the pain sits — the SI joint typically refers into the buttock and groin rather than the midline.",
      "Physical exam including provocative sacroiliac maneuvers and a neurologic screen.",
      "Review of imaging, including any prior lumbar fusion, which changes the loading on the joint.",
      "Diagnostic sacroiliac injections — typically two separate injections on different visits, each of which must give significant temporary relief.",
      "We do not proceed to fusion unless the diagnostic case is solid. If the injections do not confirm the joint, we look elsewhere.",
    ],
    treatmentsTitle: "How we treat SI joint pain.",
    treatmentsLead:
      "Fusion is the end of a sequence, not the start of one. Most of what follows comes first.",
    treatments: [
      {
        title: "Diagnostic SI Joint Injections",
        blurb:
          "Two separate injections that both have to confirm the joint as the pain generator before fusion is considered.",
      },
      {
        title: "Therapeutic SI Joint Injections",
        blurb:
          "Image-guided steroid and local anesthetic into the joint, which for many patients is enough.",
      },
      {
        title: "Radiofrequency Ablation",
        blurb:
          "Quiets the nerves carrying SI-mediated pain — a durable option that does not involve stabilizing the joint.",
      },
      {
        title: "Minimally Invasive SI Joint Fusion",
        blurb:
          "A fusion implant or graft placed across the joint through a small incision under fluoroscopic guidance, typically under sedation rather than general anesthesia.",
      },
      {
        title: "More Than One System & Approach",
        blurb:
          "Dr. Baumgartner uses several fusion systems and graft types, including allograft and implant-based options, and performs the procedure through posterior oblique, lateral, and posterior approaches — chosen for your anatomy rather than for what the practice happens to stock.",
      },
    ],
    quickFacts: {
      setting: "Outpatient, home same day",
      anesthesia: "Sedation, not general",
      recovery: "Walk same day; full activity 6–12 weeks",
    },
    philosophy:
      "We use more than one SI fusion system and graft type — including allograft and implant-based options — where most pain practices commit to a single device. That matters because SI joint anatomy varies, and the right implant or graft for your case may not be the same as your neighbor's. Dr. Baumgartner's diagnostic discipline — confirming the SI joint as the pain source before recommending fusion — means we do not perform the procedure on patients who are unlikely to benefit.",
    outlook:
      "Procedure time is typically under 60 minutes and most patients go home the same day. Most walk unassisted the same day; an assistive device is used only if Dr. Baumgartner advises it for you individually. Light activities resume within 1 to 2 weeks, pain relief progresses over 2 to 3 months, and full activity is typically reached between 6 and 12 weeks, individualized to your recovery. Mechanical stability is immediate, but the bone bridging across the joint develops over months, so we confirm fusion progress with imaging at six and twelve months.",
    risksIntro:
      "Every procedure carries some risk. We explain everything in plain language during your consultation, and again on the day of the procedure — so you know what is normal, what to watch for, and when to call.",
    risks: [
      "Pain at the incision site for 1–3 weeks; managed with conservative measures.",
      "Implant misplacement or migration — uncommon with image-guided placement and modern implant designs.",
      "Failure of the joint to fuse — possible but uncommon; can usually be addressed.",
      "Infection — minimized through sterile technique and prophylactic antibiotics.",
      "Adjacent-level stress — long-term changes at the lumbar spine or contralateral SI joint can rarely occur.",
      "Persistent pain if the SI joint was not the only or primary pain generator — careful diagnostic workup minimizes this.",
    ],
    faqs: [
      {
        q: "Is this a major spine surgery?",
        a: "Modern SI joint fusion is decidedly minimally invasive — performed through small incisions, typically under sedation rather than general anesthesia, with most patients home the same day. It is a different procedure from traditional open lumbar fusion.",
      },
      {
        q: "How will I know if my SI joint is the source?",
        a: "We confirm SI joint pain through diagnostic injections — typically two separate injections on different visits — that must each provide significant temporary relief. We do not proceed with fusion unless the diagnostic case is solid.",
      },
      {
        q: "Will I lose mobility in the joint?",
        a: "The SI joint has very limited normal motion to begin with — a few millimeters of glide. Stabilizing it does not meaningfully restrict your overall function. In practice, most patients report increased mobility because they are no longer guarding around the painful joint.",
      },
      {
        q: "I had a previous lumbar fusion. Is SI fusion still appropriate?",
        a: "Yes — and post-lumbar-fusion SI joint pain is one of the most common and underdiagnosed presentations we see. The SI joint takes on additional stress after lumbar fusion, and many patients who feel like the lumbar fusion 'failed' are actually dealing with SI joint dysfunction.",
      },
      {
        q: "Which approach and which system will you use?",
        a: "Dr. Baumgartner performs SI joint fusion through all three approaches — posterior oblique, lateral, and posterior — and uses more than one fusion system and graft type, including allograft and implant-based options. The choice is made for your anatomy, prior surgeries, and imaging rather than by which technique the practice happens to offer, and we discuss it with you before scheduling.",
      },
      {
        q: "What is recovery like at 6 weeks?",
        a: "By six weeks, most patients have returned to normal walking, light work, and most daily activities. Heavy lifting and high-impact activity are typically held until the 12-week mark to give the bone fusion time to mature.",
      },
      {
        q: "What if the fusion doesn't work?",
        a: "Failure to fuse is uncommon but possible. If the joint does not progress to fusion or pain returns, we have options — revision, additional fixation, or alternative therapies including spinal cord stimulation. We do not abandon patients to their pain.",
      },
    ],
    schemaType: "procedure",
  },
};

/** The seven slugs, in the order the agency listed them. */
export const landingSlugs = [
  "back-pain",
  "joint-knee-pain",
  "neck-pain",
  "neuropathic-pain",
  "chronic-pain",
  "spinal-cord-stimulation",
  "si-joint-fusion",
] as const;
