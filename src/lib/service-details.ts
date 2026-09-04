export type ServiceDetail = {
  slug: string;
  title: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  eyebrow: string;
  leadLine: string;
  intro: string;
  /**
   * Rendered in the Quick Facts card. Each value must be traceable to this
   * entry's own steps / whatToExpect / recoveryResults / FAQ copy; use
   * "Discussed at consult" when the page does not state a value.
   */
  quickFacts: { setting: string; anesthesia: string; recovery: string };
  steps: string[];
  whoIsItFor: string[];
  whatToExpect: string[];
  recoveryResults: string[];
  risksIntro: string;
  risks: string[];
  faqs: { q: string; a: string }[];
  insuranceBlurb: string;
  expertiseBlurb: string;
  relatedServices: { slug: string; title: string; blurb: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "radiofrequency-ablation": {
    slug: "radiofrequency-ablation",
    title: "Radiofrequency Ablation",
    metaDescription:
      "Radiofrequency ablation (RFA) uses radio-wave energy to create a small, controlled lesion on the nerves carrying pain signals — interrupting the signal at its source. The result is durable, medication-free relief that often lasts six to eighteen months and can be repeated as needed.",
    heroImage: "surgeon-under-operating-lights.jpg",
    heroImageAlt: "A physician in a blue surgical gown, cap, and mask looks down while working beneath bright overhead procedure lights, flanked by two colleagues seen from behind.",
    eyebrow: "RFA",
    leadLine: "Lasting nerve-pain relief, on an outpatient schedule.",
    intro:
      "Radiofrequency ablation (RFA) uses radio-wave energy to create a small, controlled lesion on the nerves carrying pain signals — interrupting the signal at its source. The result is durable, medication-free relief that often lasts six to eighteen months and can be repeated as needed.",
    quickFacts: {
      setting: "In-office, outpatient",
      anesthesia: "Local + light sedation",
      recovery: "Light activity next day",
    },
    steps: [
      "Two successful diagnostic medial branch blocks, performed on separate days, confirm the exact pain generator.",
      "Under live fluoroscopic guidance, a fine probe is positioned at the medial branch nerve.",
      "Radiofrequency energy heats and quiets the targeted nerve in a controlled, repeatable way.",
      "The procedure is performed in our office with local anesthetic and light sedation.",
    ],
    whoIsItFor: [
      "Chronic neck or low-back pain that hasn't responded to conservative care",
      "Confirmed facet-joint pain on diagnostic blocks",
      "Sacroiliac (SI) joint pain",
      "Patients seeking durable relief without long-term opioid medication",
    ],
    whatToExpect: [
      "Most procedures take 30–60 minutes from prep to recovery.",
      "Mild soreness at the site is normal for 2–5 days.",
      "Pain relief typically begins within 1–3 weeks as the nerve quiets.",
    ],
    recoveryResults: [
      "Most patients return to light activity the next day.",
      "Avoid heavy lifting for 24–48 hours.",
      "Resume gentle stretching and walking within 1–2 days.",
      "Full benefit is reached at the 3–4 week mark.",
      "Relief commonly lasts 6–18 months and the procedure can be repeated.",
    ],
    risksIntro:
      "Every procedure carries some risk. We explain everything in plain language during your consultation, and again on the day of the procedure — so you know what is normal, what to watch for, and when to call.",
    risks: [
      "Mild soreness at the access site for 2–5 days, often relieved with ice and acetaminophen.",
      "Temporary increase in pain in the first 1–3 days as the treated area settles.",
      "Rare risk of infection, bleeding, or numbness in the treated dermatome.",
      "Very rare risk of motor nerve injury — the procedure is designed to target sensory nerves only.",
      "Procedure may not provide relief; in that case we revisit the diagnosis and consider alternatives.",
    ],
    faqs: [
      {
        q: "Is RFA painful?",
        a: "The targeted area is fully numbed with local anesthetic, and we offer light sedation. Most patients describe the experience as a few minutes of pressure rather than pain.",
      },
      {
        q: "How long does relief last?",
        a: "Most patients experience 6 to 18 months of meaningful relief. As the nerve regenerates over time, the procedure can be repeated safely.",
      },
      {
        q: "Will I be on medications afterward?",
        a: "RFA is specifically designed to reduce reliance on long-term pain medications. Many patients are able to taper or stop oral pain medications after a successful ablation.",
      },
      {
        q: "Why are diagnostic blocks done first?",
        a: "We use a two-block paradigm — two separate diagnostic medial branch blocks on different days — to confirm that the small nerves we plan to ablate are in fact the source of your pain. Both blocks must provide meaningful relief; this is the standard before RFA and is also what insurers require. If the blocks do not provide meaningful relief, RFA is unlikely to help — and we will redirect to a different therapy.",
      },
      {
        q: "How quickly can I get back to work?",
        a: "Most patients return to desk work the next day and to physical work within 2–3 days, depending on the area treated. We will give you specific guidance based on your job.",
      },
      {
        q: "Can RFA be done if I had previous spine surgery?",
        a: "In many cases, yes. Prior spine surgery does not automatically rule out RFA. We will review your imaging and surgical history to determine candidacy.",
      },
      {
        q: "Are there alternatives to RFA?",
        a: "Yes — depending on the source of your pain, alternatives can include Intracept, spinal cord stimulation, SI joint fusion, or continued conservative care. We discuss the full landscape with you before recommending RFA.",
      },
    ],
    insuranceBlurb:
      "Radiofrequency ablation is covered by most major commercial insurance, Medicare, and Medicare Advantage plans when medical-necessity criteria are met (two successful diagnostic medial branch blocks). Our team verifies your benefits, prior-authorization requirements, and out-of-pocket cost before scheduling.",
    expertiseBlurb:
      "Dr. Baumgartner has performed thousands of radiofrequency ablation procedures since 2018, with particular expertise in cervical, lumbar, SI, and genicular targets. We use modern probe technology, live fluoroscopic guidance, and the time it takes to do the procedure right — never rushed by the clock.",
    relatedServices: [
      {
        slug: "injections-blocks-specialist",
        title: "Injections & Nerve Blocks",
        blurb: "Image-guided injections that calm inflamed joints, nerves, and spinal structures.",
      },
      {
        slug: "kyphoplasty-specialist",
        title: "Kyphoplasty",
        blurb: "Minimally invasive procedure that stabilizes painful spinal compression fractures.",
      },
      {
        slug: "si-joint-fusions",
        title: "SI Joint Fusions",
        blurb: "Minimally invasive fusion for sacroiliac dysfunction that hasn't responded to conservative care.",
      },
    ],
  },

  "injections-blocks-specialist": {
    slug: "injections-blocks-specialist",
    title: "Injections & Nerve Blocks",
    metaDescription:
      "Image-guided injections and nerve blocks deliver anti-inflammatory medication and local anesthetic directly into the structure generating pain — whether that's a facet joint, epidural space, sympathetic nerve, or peripheral joint. They are both diagnostic and therapeutic.",
    heroImage: "treatment-injections-and-blocks-specialist.jpg",
    heroImageAlt: "Image-guided injections and nerve blocks at HTx Pain Institute",
    eyebrow: "Injections & Blocks",
    leadLine: "Targeted relief delivered exactly where pain begins.",
    intro:
      "Image-guided injections and nerve blocks deliver anti-inflammatory medication and local anesthetic directly into the structure generating pain — whether that's a facet joint, epidural space, sympathetic nerve, or peripheral joint. They are both diagnostic and therapeutic.",
    quickFacts: {
      setting: "Discussed at consult",
      anesthesia: "Local; sedation for some spinal injections",
      recovery: "Most return to work within 24 hours",
    },
    steps: [
      "We map your pain pattern through history, exam, and imaging review.",
      "Live fluoroscopy or ultrasound is used to position the needle with millimeter precision.",
      "A combination of long-acting steroid and local anesthetic is delivered to the target.",
    ],
    whoIsItFor: [
      "Radicular pain from disc herniation or stenosis",
      "Facet joint, sacroiliac joint, or peripheral joint pain",
      "Sympathetic-mediated pain syndromes (CRPS, post-surgical pain)",
      "Patients seeking diagnostic clarity before surgery or ablation",
    ],
    whatToExpect: [
      "The procedure typically takes 10–20 minutes.",
      "Initial relief from the local anesthetic begins within minutes.",
      "Steroid effect builds over 3–7 days and can last weeks to months.",
      "We track your response to inform the next step in your care plan.",
    ],
    recoveryResults: [
      "Take it easy for the rest of the day.",
      "Most return to work within 24 hours.",
      "We re-evaluate at 2–4 weeks to measure benefit.",
      "Series may be appropriate; we will discuss frequency clearly.",
    ],
    risksIntro:
      "Every procedure carries some risk. We explain everything in plain language during your consultation, and again on the day of the procedure — so you know what is normal, what to watch for, and when to call.",
    risks: [
      "Mild soreness or bruising at the injection site for 1–3 days.",
      "Transient flare of pain in the first 24–48 hours before steroid effect builds.",
      "Transient elevation in blood sugar (especially in diabetic patients).",
      "Rare risk of infection, bleeding, or allergic reaction to medications used.",
      "For spinal injections: very rare risk of nerve injury, dural puncture, or epidural hematoma — minimized by image guidance.",
      "Repeat corticosteroid injections in the same joint can contribute to cartilage degradation over time — we monitor and limit accordingly.",
    ],
    faqs: [
      {
        q: "Will the steroid affect my blood sugar?",
        a: "Steroid injections can transiently elevate blood glucose for 2 to 7 days, particularly in patients with diabetes or pre-diabetes. We coordinate timing and dose accordingly. Most diabetic patients do well with appropriate planning; we adjust corticosteroid choice and dose based on your A1c and recent glucose patterns.",
      },
      {
        q: "How many injections can I have?",
        a: "We follow evidence-based limits — typically no more than three to four corticosteroid injections per region per year — and prefer to use injections strategically rather than as ongoing therapy. If you find yourself needing repeat injections every few months, that is a signal to consider a more durable option like RFA, Intracept, or spinal cord stimulation.",
      },
      {
        q: "Are these injections only diagnostic, or therapeutic?",
        a: "Both. The local anesthetic provides immediate diagnostic information about whether we have correctly identified the pain source. The corticosteroid provides anti-inflammatory therapy that can last weeks to months. We use both effects deliberately.",
      },
      {
        q: "What is the difference between fluoroscopy and ultrasound guidance?",
        a: "Fluoroscopy uses live X-ray to visualize bony anatomy and contrast — ideal for spinal injections and nerve blocks near bone. Ultrasound visualizes soft tissues and vessels in real time — preferred for peripheral joints, tendons, and certain nerve targets. We choose the right modality for each target.",
      },
      {
        q: "How quickly will I feel relief?",
        a: "The local anesthetic component provides relief within minutes and lasts a few hours. The corticosteroid effect typically builds over 3 to 7 days. Some patients feel transiently more sore for 24 to 48 hours before relief sets in — usually from needle irritation, not from anything wrong.",
      },
      {
        q: "Can I drive home afterward?",
        a: "If you receive sedation or a spinal injection, you will need a driver. Only minor, local-anesthetic-only procedures may allow you to drive yourself, and only per your provider's guidance. We confirm transportation arrangements when we schedule, so this is not a surprise.",
      },
      {
        q: "Why do I sometimes need a second 'confirmatory' block?",
        a: "For procedures like RFA, where we plan to ablate a nerve, we use a two-block paradigm — two separate diagnostic blocks on different days that both must provide meaningful relief. This is to reduce the rate of false positives and ensure we are ablating the right target.",
      },
      {
        q: "What about non-steroid injection options?",
        a: "We offer hyaluronic acid (viscosupplementation) for select knee osteoarthritis cases, and PRP for tendinopathy and select arthritis. These are biologic alternatives that avoid the metabolic and bone effects of repeated corticosteroids.",
      },
      {
        q: "Are sympathetic blocks different from joint injections?",
        a: "Yes — sympathetic blocks (stellate ganglion, lumbar sympathetic, celiac plexus, ganglion impar) target the autonomic nervous system rather than a joint or peripheral nerve. They are diagnostic and therapeutic for sympathetically-mediated pain syndromes like CRPS and certain visceral pains.",
      },
      {
        q: "What if my injection does not help?",
        a: "We use that as diagnostic information. If a well-targeted injection does not relieve your pain, we revisit the diagnosis — the pain source may be different from what imaging suggested. We do not just give you another injection of the same thing; we adjust the plan.",
      },
    ],
    insuranceBlurb:
      "Image-guided injections and nerve blocks are covered by Medicare, Medicare Advantage, and most commercial insurance plans when medically indicated. Coverage varies by injection type and target. Diagnostic blocks performed before RFA are typically covered as part of the workup. Our team verifies benefits and prior authorization for each planned injection in advance.",
    expertiseBlurb:
      "Image-guided injections are not all the same. Dr. Baumgartner performs every injection under live fluoroscopy or ultrasound (no 'landmark-only' injections), uses contrast to confirm needle position before delivering medication, and selects medications and doses based on your specific case. The accuracy and judgment matter — particularly when the injection is also a diagnostic test.",
    relatedServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Radiofrequency Ablation",
        blurb: "Outpatient procedure using precise electrical current to quiet damaged or inflamed nerves.",
      },
      {
        slug: "kyphoplasty-specialist",
        title: "Kyphoplasty",
        blurb: "Minimally invasive procedure that stabilizes painful spinal compression fractures.",
      },
      {
        slug: "si-joint-fusions",
        title: "SI Joint Fusions",
        blurb: "Minimally invasive fusion for sacroiliac dysfunction that hasn't responded to conservative care.",
      },
    ],
  },

  "kyphoplasty-specialist": {
    slug: "kyphoplasty-specialist",
    title: "Kyphoplasty",
    metaDescription:
      "Kyphoplasty is a minimally invasive procedure for painful vertebral compression fractures — most commonly caused by age-related bone-mass loss. A small balloon is inflated within the fractured vertebra to restore lost height, then medical-grade cement stabilizes the bone. Most patients feel dramatic pain relief within 24–48 hours.",
    heroImage: "older-man-walking-upright-garden-path.jpg",
    heroImageAlt: "A white-haired man in a green shirt, jeans and flat cap walks upright away from the camera along a dirt path lined with green shrubs.",
    eyebrow: "Kyphoplasty",
    leadLine: "Restore height, restore mobility, end fracture pain.",
    intro:
      "Kyphoplasty is a minimally invasive procedure for painful vertebral compression fractures — most commonly caused by age-related bone-mass loss. A small balloon is inflated within the fractured vertebra to restore lost height, then medical-grade cement stabilizes the bone. Most patients feel dramatic pain relief within 24–48 hours.",
    quickFacts: {
      setting: "Office or surgery center, same day",
      anesthesia: "Local + light IV sedation",
      recovery: "Walk same day; no heavy lifting 6 weeks",
    },
    steps: [
      "We confirm the acute fracture with MRI or bone scan.",
      "Through a small incision, a thin cannula is placed into the fractured vertebra under fluoroscopic guidance.",
      "A specialized balloon is gently inflated to restore vertebral height and create a cavity.",
      "Medical-grade cement is injected to permanently stabilize the bone.",
    ],
    whoIsItFor: [
      "Osteoporotic vertebral compression fractures",
      "Painful fractures from cancer-related bone weakening",
      "Patients with persistent fracture pain despite conservative care",
      "Patients losing height or developing kyphotic posture",
    ],
    whatToExpect: [
      "Procedure time is typically 30–60 minutes.",
      "Performed under light sedation with local anesthesia.",
      "Most patients walk out the same day.",
    ],
    recoveryResults: [
      "Significant pain relief often within 24–48 hours.",
      "Walking is encouraged the same day.",
      "Avoid heavy lifting for 6 weeks while the bone heals around the cement.",
      "Bone-health work-up and osteoporosis treatment are coordinated with your primary team.",
      "Posture and balance therapy is typically recommended.",
    ],
    risksIntro:
      "Every procedure carries some risk. We explain everything in plain language during your consultation, and again on the day of the procedure — so you know what is normal, what to watch for, and when to call.",
    risks: [
      "Cement leakage outside the vertebral body — usually asymptomatic; rare cases may cause nerve irritation that resolves with time.",
      "New compression fracture at an adjacent vertebral level after a kyphoplasty — risk is reduced by treating the underlying osteoporosis.",
      "Infection at the access site — very uncommon; minimized through sterile technique and prophylactic antibiotics where appropriate.",
      "Bleeding or hematoma — rare; we screen anticoagulation and platelet medications carefully before scheduling.",
      "Allergic reaction to cement or contrast — rare; we review your allergy history at consult.",
      "Procedure may not provide relief if the targeted vertebra is not the source of pain — careful imaging selection is essential.",
    ],
    faqs: [
      {
        q: "Is kyphoplasty safe in older patients?",
        a: "Kyphoplasty is widely used and well-tolerated in older patients with osteoporotic fractures. In appropriate candidates the procedure is dramatically safer than the prolonged immobility, opioid reliance, and pneumonia risk that follow an untreated compression fracture. We screen carefully — bone density, cardiac status, anticoagulation — and coordinate with your primary care or oncology team.",
      },
      {
        q: "Will the cement migrate?",
        a: "Cement migration is uncommon with modern balloon-assisted technique. The balloon creates a contained cavity, and we deliver the cement under live fluoroscopy in carefully controlled volumes. Each level is reviewed in real time before any cement is set.",
      },
      {
        q: "How quickly will the pain go away?",
        a: "Most patients report significant pain relief within 24 to 48 hours of the procedure. The relief comes from immediate stabilization of the broken vertebra — once it stops moving, it stops generating pain.",
      },
      {
        q: "Will I be taller after the procedure?",
        a: "Kyphoplasty restores some of the lost vertebral height through balloon inflation before the cement is placed. Patients with acute fractures may regain noticeable height; for older fractures with healed deformity, height restoration is more limited but pain relief is still meaningful.",
      },
      {
        q: "How is kyphoplasty different from vertebroplasty?",
        a: "Vertebroplasty injects cement directly into the fracture without first creating a cavity. Kyphoplasty uses an inflatable balloon to restore vertebral height and create a controlled cavity for cement placement — generally yielding better deformity correction and lower cement-leak rates.",
      },
      {
        q: "Can kyphoplasty be done for cancer-related fractures?",
        a: "Yes. Kyphoplasty is an established option for painful pathologic compression fractures from multiple myeloma, metastatic disease, and other oncologic causes. We coordinate closely with your oncology team on timing relative to chemotherapy, radiation, and bone-modifying agents.",
      },
      {
        q: "What about bone health after the procedure?",
        a: "A vertebral compression fracture is a sentinel event for osteoporosis — and the strongest predictor of another fracture is having had one. We do not stop at the procedure. We confirm a bone-health workup is in place and coordinate medication-based osteoporosis treatment with your primary care team or a referral.",
      },
      {
        q: "How long does the cement last?",
        a: "Polymethyl methacrylate (PMMA) bone cement is permanent. Once set, it provides lasting structural support to the treated vertebra. The vertebra can technically still fracture above or below the treated level — which is why bone-health management afterward is essential.",
      },
      {
        q: "Will I need anesthesia?",
        a: "Kyphoplasty is performed under local anesthesia with light IV sedation in our office or surgery center. General anesthesia is not required. Most patients do not remember much of the procedure and walk out the same day.",
      },
      {
        q: "What if I have multiple fractured vertebrae?",
        a: "Multiple-level kyphoplasty is common and often appropriate in a single procedure session, particularly for osteoporotic fractures discovered on the same imaging study. We will confirm with MRI which fractures are acute and contributing to your pain before treating.",
      },
    ],
    insuranceBlurb:
      "Kyphoplasty is covered by Medicare, Medicare Advantage, and most major commercial insurers when MRI confirms an acute or subacute compression fracture and conservative care has not provided relief. Our team handles benefits verification and prior authorization. Self-pay options are available with transparent pricing.",
    expertiseBlurb:
      "Dr. Baumgartner has performed hundreds of kyphoplasties since fellowship and is fluoroscopy-fluent in both unipedicular and bipedicular approaches. We are particular about case selection — we will not perform kyphoplasty on patients without a clear acute fracture, and we will refer to surgery in the rare cases where vertebroplasty/kyphoplasty is not enough. Bone-health follow-up is built into every kyphoplasty case.",
    relatedServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Radiofrequency Ablation",
        blurb: "Outpatient procedure using precise electrical current to quiet damaged or inflamed nerves.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Injections & Nerve Blocks",
        blurb: "Image-guided injections that calm inflamed joints, nerves, and spinal structures.",
      },
      {
        slug: "si-joint-fusions",
        title: "SI Joint Fusions",
        blurb: "Minimally invasive fusion for sacroiliac dysfunction that hasn't responded to conservative care.",
      },
    ],
  },

  "si-joint-fusions": {
    slug: "si-joint-fusions",
    title: "SI Joint Fusions",
    metaDescription:
      "When the sacroiliac (SI) joint is the source of chronic low-back, buttock, or groin pain — and conservative care has not worked — minimally invasive SI joint fusion offers a definitive solution. Through a small incision, a fusion implant or graft — chosen for your anatomy from several fusion systems and graft types, including allograft and implant-based options — stabilizes the joint and allows biological fusion over time.",
    heroImage: "clinician-hands-on-patient-lower-back.jpg",
    heroImageAlt: "Close-up of a practitioner's stacked hands pressing on the lower back of a patient lying face down on a treatment table.",
    eyebrow: "SI Joint Fusion",
    leadLine: "A definitive answer for chronic SI joint pain.",
    intro:
      "When the sacroiliac (SI) joint is the source of chronic low-back, buttock, or groin pain — and conservative care has not worked — minimally invasive SI joint fusion offers a definitive solution. Through a small incision, a fusion implant or graft — chosen for your anatomy from several fusion systems and graft types, including allograft and implant-based options — stabilizes the joint and allows biological fusion over time.",
    quickFacts: {
      setting: "Outpatient, home same day",
      anesthesia: "Sedation, not general",
      recovery: "Walk same day; full activity 6–12 weeks",
    },
    steps: [
      "Diagnostic SI joint injections confirm the joint as the pain generator.",
      "A small incision (typically under 3 cm) is made over the joint.",
      "A fusion implant or graft, selected for your anatomy, is placed across the joint under fluoroscopic guidance.",
      "The implant or graft stabilizes the joint immediately and promotes biological fusion over months.",
    ],
    whoIsItFor: [
      "Confirmed SI joint pain unresponsive to physical therapy and injections",
      "Patients with SI joint disruption from prior lumbar fusion",
      "Pain that limits walking, sitting, or stair climbing",
      "Failure of conservative care over 6+ months",
    ],
    whatToExpect: [
      "Procedure time is typically under 60 minutes.",
      "Most patients go home the same day.",
      "Most patients walk unassisted the same day.",
      "Pain relief progresses over 2–3 months.",
    ],
    recoveryResults: [
      "Most patients walk unassisted the same day; an assistive device is used only if Dr. Baumgartner advises it for you individually.",
      "Light activities resume within 1–2 weeks.",
      "Full activity typically by 6–12 weeks, individualized to recovery.",
      "Imaging follow-up to confirm fusion at 6 and 12 months.",
    ],
    risksIntro:
      "Every procedure carries some risk. We explain everything in plain language during your consultation, and again on the day of the procedure — so you know what is normal, what to watch for, and when to call.",
    risks: [
      "Pain at the incision site for 1–3 weeks; managed with conservative measures.",
      "Implant misplacement or migration — uncommon with image-guided placement and modern implant designs.",
      "Failure to achieve biological fusion — possible but uncommon; can usually be addressed.",
      "Infection — minimized through sterile technique and prophylactic antibiotics.",
      "Adjacent-level stress — long-term changes at the lumbar spine or contralateral SI joint can rarely occur.",
      "Persistent pain if SI joint was not the only or primary pain generator — careful diagnostic workup minimizes this.",
    ],
    faqs: [
      {
        q: "Is this a major spine surgery?",
        a: "Modern SI joint fusion is decidedly minimally invasive — performed through small incisions, typically under sedation rather than general anesthesia, with most patients home the same day. It is a different procedure from traditional open lumbar fusion.",
      },
      {
        q: "Will I lose mobility in the joint?",
        a: "The SI joint has very limited normal motion to begin with — a few millimeters of glide. Stabilizing it does not meaningfully restrict your overall function. In practice, most patients report increased mobility because they are no longer guarding around the painful joint.",
      },
      {
        q: "How will I know if my SI joint is the source?",
        a: "We confirm SI joint pain through diagnostic injections — typically two separate injections on different visits — that must each provide significant temporary relief. We do not proceed with fusion unless the diagnostic case is solid.",
      },
      {
        q: "Which fusion system will you use?",
        a: "Dr. Baumgartner uses more than one SI fusion system and graft type — including allograft and implant-based options — and selects for each patient based on anatomy, prior surgeries, and the specific imaging findings. We discuss the choice with you before the procedure.",
      },
      {
        q: "How is this different from a lateral SI fusion (e.g., iFuse)?",
        a: "Lateral SI fusion places implants through the side of the pelvis, with a different anatomic risk profile. The posterior approach we offer (LinQ) avoids some of those structures and uses a smaller incision. Each approach has a role; we discuss options openly.",
      },
      {
        q: "What is recovery like at 6 weeks?",
        a: "By six weeks, most patients have returned to normal walking, light work, and most daily activities. Heavy lifting and high-impact activity are typically held until the 12-week mark to give biological fusion time to mature.",
      },
      {
        q: "Will I see fusion on imaging right away?",
        a: "No. Mechanical stability is immediate after the procedure, but biological fusion (bone bridging across the joint) develops over months. We confirm fusion progress with imaging at six and twelve months.",
      },
      {
        q: "I had a previous lumbar fusion. Is SI fusion still appropriate?",
        a: "Yes — and post-lumbar-fusion SI joint pain is one of the most common and underdiagnosed presentations we see. The SI joint takes on additional stress after lumbar fusion, and many patients who feel like the lumbar fusion 'failed' are actually dealing with SI joint dysfunction.",
      },
      {
        q: "Will the implant set off airport metal detectors?",
        a: "Implant-based SI fusion systems are typically below the threshold of standard airport metal detectors, and allograft-only fusions contain no metal. We provide an implant card you can carry in your wallet for reference if needed.",
      },
      {
        q: "What if the fusion doesn't work?",
        a: "Failure to fuse is uncommon but possible. If the joint does not progress to fusion or pain returns, we have options — revision, additional fixation, or alternative therapies including spinal cord stimulation. We do not abandon patients to their pain.",
      },
    ],
    insuranceBlurb:
      "SI joint fusion (LinQ and similar systems) is covered by Medicare, Medicare Advantage, and most major commercial insurers when SI joint pain is confirmed by diagnostic injections and conservative care has failed. Prior authorization is typically required and our team manages it. Workers' compensation and motor-vehicle injury cases are also commonly covered.",
    expertiseBlurb:
      "We use more than one SI fusion system and graft type — including allograft and implant-based options — where most pain practices commit to a single device. That matters because SI joint anatomy varies, and the right implant or graft for your case may not be the same as your neighbor's. Dr. Baumgartner's diagnostic discipline — confirming the SI joint as the pain source before recommending fusion — means we do not perform the procedure on patients who are unlikely to benefit.",
    relatedServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Radiofrequency Ablation",
        blurb: "Outpatient procedure using precise electrical current to quiet damaged or inflamed nerves.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Injections & Nerve Blocks",
        blurb: "Image-guided injections that calm inflamed joints, nerves, and spinal structures.",
      },
      {
        slug: "minuteman-procedure",
        title: "Minuteman Lumbar Fusion",
        blurb: "A separate procedure for the lumbar spine — a posterior interspinous-interlaminar fusion device, not an SI joint treatment.",
      },
    ],
  },

  "spinal-cord-stimulation-specialist": {
    slug: "spinal-cord-stimulation-specialist",
    title: "Spinal Cord Stimulation",
    metaDescription:
      "Spinal cord stimulation (SCS) is one of the most studied therapies in modern pain medicine. A small implantable device delivers tailored electrical fields to the spinal cord — interrupting pain signals before they reach the brain. Patients try the system through a temporary trial before committing to a long-term implant.",
    heroImage: "practitioner-showing-spine-model-to-patient.jpg",
    heroImageAlt: "A clinician holds a color-coded anatomical spine model and explains it to a seated woman in a rehab studio with large windows and plants.",
    eyebrow: "Spinal Cord Stimulation",
    leadLine: "Reprogram pain at the source of the signal.",
    intro:
      "Spinal cord stimulation (SCS) is one of the most studied therapies in modern pain medicine. A small implantable device delivers tailored electrical fields to the spinal cord — interrupting pain signals before they reach the brain. Patients try the system through a temporary trial before committing to a long-term implant.",
    quickFacts: {
      setting: "Outpatient trial and implant",
      anesthesia: "Discussed at consult",
      recovery: "Light activity 4–6 weeks after implant",
    },
    steps: [
      "Trial: temporary leads are placed for a 5–7 day in-home test.",
      "If the trial reduces pain by ≥50% and improves function, we proceed to implant.",
      "Permanent implant: leads and a small generator are placed in a brief outpatient procedure.",
      "Therapy is fine-tuned remotely by our team using your feedback.",
    ],
    whoIsItFor: [
      "Failed back surgery syndrome / persistent post-surgical spine pain",
      "Diabetic peripheral neuropathy",
      "Complex regional pain syndrome (CRPS)",
      "Refractory radicular pain",
    ],
    whatToExpect: [
      "Trial procedure: 30–45 minutes, no incisions.",
      "Trial period: 5–7 days at home with the external device.",
      "Implant procedure: about 60 minutes, outpatient.",
      "Programming sessions to dial in the optimal therapy for you.",
    ],
    recoveryResults: [
      "After the trial, leads are removed in seconds in-office.",
      "After implant, light activity for 4–6 weeks while the leads anchor.",
      "Most patients return to work within 1–2 weeks.",
      "Long-term follow-up to optimize programming as needed.",
    ],
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
        q: "Will I feel anything from the device?",
        a: "Modern paresthesia-free waveforms deliver pain relief without the older tingling sensation. Most patients are unaware of the device working in the background.",
      },
      {
        q: "Is this reversible?",
        a: "Yes. SCS is fully reversible — both the trial and the permanent system can be removed if it is no longer providing benefit.",
      },
      {
        q: "What does the trial period feel like?",
        a: "During the 5–7 day trial, you wear an external generator on a belt and the leads exit through a small dressing on your back. You go about your daily life and track your pain. We adjust programming remotely.",
      },
      {
        q: "Is the implant safe with MRI scans?",
        a: "Modern SCS systems are MRI-conditional, meaning MRI is safe under specific conditions. We provide a wallet card with the exact parameters your imaging facility needs.",
      },
      {
        q: "How long does the battery last?",
        a: "Rechargeable systems typically last 10+ years before generator replacement, with daily home charging that takes about 30–60 minutes. Non-rechargeable systems vary.",
      },
      {
        q: "Will I need to stop taking pain medications?",
        a: "We do not require it, but most patients find they need significantly less medication after a successful trial and implant. We coordinate any medication changes with you over time.",
      },
      {
        q: "Can SCS help with diabetic neuropathy?",
        a: "Yes — SCS is FDA-approved for painful diabetic peripheral neuropathy and has strong published outcomes. We screen carefully for candidacy.",
      },
    ],
    insuranceBlurb:
      "Spinal cord stimulation is covered by Medicare, Medicare Advantage, and most major commercial insurance plans when criteria are met. Both the trial and permanent implant typically require prior authorization, which our team handles for you.",
    expertiseBlurb:
      "Spinal cord stimulation is one of Dr. Baumgartner's areas of clinical focus. He has performed hundreds of SCS trials and implants since fellowship and works directly with the major device manufacturers — selecting the right system and waveform for each patient rather than defaulting to one platform.",
    relatedServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Radiofrequency Ablation",
        blurb: "Outpatient procedure using precise electrical current to quiet damaged or inflamed nerves.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Injections & Nerve Blocks",
        blurb: "Image-guided injections that calm inflamed joints, nerves, and spinal structures.",
      },
      {
        slug: "kyphoplasty-specialist",
        title: "Kyphoplasty",
        blurb: "Minimally invasive procedure that stabilizes painful spinal compression fractures.",
      },
    ],
  },

  "intracept-procedure": {
    slug: "intracept-procedure",
    title: "Intracept Procedure",
    metaDescription:
      "Intracept is an FDA-cleared, implant-free procedure for chronic vertebrogenic low-back pain — pain that originates from the vertebral endplates rather than the disc or muscles. It uses radiofrequency energy to ablate the basivertebral nerve, with proven long-term improvement in pain and function.",
    heroImage: "treatment-intracept-procedure.jpg",
    heroImageAlt: "Intracept procedure for vertebrogenic low-back pain at HTx Pain Institute",
    eyebrow: "Intracept",
    leadLine: "An FDA-cleared answer for vertebrogenic low-back pain.",
    intro:
      "Intracept is an FDA-cleared, implant-free procedure for chronic vertebrogenic low-back pain — pain that originates from the vertebral endplates rather than the disc or muscles. It uses radiofrequency energy to ablate the basivertebral nerve, with proven long-term improvement in pain and function.",
    quickFacts: {
      setting: "Outpatient, same day",
      anesthesia: "Sedation + local anesthesia",
      recovery: "Light activity 1–2 days; work 1–2 weeks",
    },
    steps: [
      "MRI confirms Modic Type 1 or Type 2 endplate changes — the hallmark of vertebrogenic pain.",
      "Through a small access point, a probe is guided into the vertebral body.",
      "The basivertebral nerve is ablated with controlled radiofrequency energy.",
      "Nothing is left implanted — the bone heals around the treatment zone.",
    ],
    whoIsItFor: [
      "Chronic low-back pain ≥6 months",
      "Modic changes on MRI consistent with vertebrogenic pain",
      "Failure of conservative care including PT and injections",
      "Patients seeking durable relief without an implant or fusion",
    ],
    whatToExpect: [
      "Procedure time is approximately 1 hour.",
      "Performed under sedation and local anesthesia.",
      "Outpatient — most patients leave the same day.",
      "No hardware or implant remains in the body.",
    ],
    recoveryResults: [
      "Light activity within 1–2 days.",
      "Most patients return to work within 1–2 weeks.",
      "Improvement progresses over 3–6 months.",
      "Published data shows durable relief at 5 years.",
    ],
    risksIntro:
      "Every procedure carries some risk. We explain everything in plain language during your consultation, and again on the day of the procedure — so you know what is normal, what to watch for, and when to call.",
    risks: [
      "Mild low-back soreness at the access site for several days.",
      "Temporary increase in pain during the first 1–2 weeks as healing progresses.",
      "Rare risk of infection, bleeding, or nerve injury.",
      "Procedure may not provide relief in patients without true vertebrogenic pain — careful selection is essential.",
      "No long-term complications related to implants because there are none.",
    ],
    faqs: [
      {
        q: "How is this different from RFA?",
        a: "Standard RFA targets the small medial branch nerves outside the spine. Intracept targets a different nerve — the basivertebral nerve inside the vertebra — which carries vertebrogenic pain signals not addressed by traditional RFA.",
      },
      {
        q: "Will I need a fusion later?",
        a: "Many patients who would otherwise be candidates for fusion experience durable improvement with Intracept and are able to avoid fusion altogether.",
      },
      {
        q: "What are Modic changes?",
        a: "Modic changes are signal changes in the vertebral endplates seen on MRI. Type 1 and Type 2 changes are associated with vertebrogenic pain — pain originating from the endplate itself — and are the imaging hallmark of Intracept candidacy.",
      },
      {
        q: "Is anything left in my body afterward?",
        a: "No. Intracept is implant-free — the basivertebral nerve is heated and ablated with controlled radiofrequency energy; nothing is removed or excised, and no hardware is left behind. The bone heals around the treated area over time.",
      },
      {
        q: "How long does relief last?",
        a: "Published 5-year data shows that the majority of Intracept patients maintain significant pain and function improvement 5 years after a single treatment.",
      },
      {
        q: "Can Intracept be done at multiple levels?",
        a: "Yes — Intracept can be performed at one or multiple lumbar levels in a single procedure, depending on which endplates show Modic changes on your MRI.",
      },
      {
        q: "Is Intracept covered by insurance?",
        a: "Intracept is covered by Medicare and a growing list of commercial insurers, particularly when imaging confirms Modic changes and conservative care has failed. We handle prior authorization for you.",
      },
    ],
    insuranceBlurb:
      "Intracept is covered by Medicare and many commercial insurers when MRI demonstrates Modic Type 1 or Type 2 endplate changes and conservative care has failed. Coverage and prior authorization vary by plan; our team manages the process for you.",
    expertiseBlurb:
      "Dr. Baumgartner is among the experienced Intracept providers in the Houston area. He has published-data familiarity with the procedure and a careful approach to patient selection — Intracept only works when the pain truly is vertebrogenic, and we will not perform the procedure on patients who do not meet criteria.",
    relatedServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Radiofrequency Ablation",
        blurb: "Outpatient procedure using precise electrical current to quiet damaged or inflamed nerves.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Injections & Nerve Blocks",
        blurb: "Image-guided injections that calm inflamed joints, nerves, and spinal structures.",
      },
      {
        slug: "kyphoplasty-specialist",
        title: "Kyphoplasty",
        blurb: "Minimally invasive procedure that stabilizes painful spinal compression fractures.",
      },
    ],
  },

  "prp-procedure": {
    slug: "prp-procedure",
    title: "PRP (Platelet-Rich Plasma)",
    metaDescription:
      "Platelet-rich plasma (PRP) therapy uses a concentrated preparation of your own platelets — rich in growth factors — to accelerate healing in joints, tendons, and soft tissues. It is non-surgical, biologically derived from your own blood, and increasingly used as a first-line option for select musculoskeletal conditions.",
    heroImage: "treatment-prp-procedure-houston.jpg",
    heroImageAlt: "Platelet-rich plasma (PRP) therapy at HTx Pain Institute in Houston",
    eyebrow: "PRP",
    leadLine: "Your body's own healing factors, concentrated and delivered.",
    intro:
      "Platelet-rich plasma (PRP) therapy uses a concentrated preparation of your own platelets — rich in growth factors — to accelerate healing in joints, tendons, and soft tissues. It is non-surgical, biologically derived from your own blood, and increasingly used as a first-line option for select musculoskeletal conditions.",
    quickFacts: {
      setting: "In-office, ~60-minute visit",
      anesthesia: "Discussed at consult",
      recovery: "Return to activity as comfort allows",
    },
    steps: [
      "A small blood draw is performed in our office.",
      "The blood is processed in a sterile centrifuge to concentrate platelets.",
      "Under ultrasound guidance, the PRP is injected directly into the injured tissue.",
      "Growth factors stimulate the body's natural healing response.",
    ],
    whoIsItFor: [
      "Tendinopathy (tennis elbow, rotator cuff, patellar tendon)",
      "Mild-to-moderate knee osteoarthritis",
      "Chronic ligament or joint pain unresponsive to conservative care",
      "Patients seeking biologic alternatives to repeated steroid injections",
    ],
    whatToExpect: [
      "Total visit time is approximately 60 minutes.",
      "Mild soreness at the injection site is normal for 2–4 days.",
      "Hold anti-inflammatory medications (NSAIDs) for 7–14 days before and 2–4 weeks after, as directed by your provider.",
      "Improvement typically progresses over 6–12 weeks.",
    ],
    recoveryResults: [
      "Most patients resume normal activity as comfort allows, guided by their provider.",
      "Gradual return to activity guided by symptoms.",
      "A series of 1–3 injections, spaced weeks apart, may be recommended.",
      "Many patients combine PRP with structured physical therapy.",
    ],
    risksIntro:
      "Every procedure carries some risk. We explain everything in plain language during your consultation, and again on the day of the procedure — so you know what is normal, what to watch for, and when to call.",
    risks: [
      "Mild soreness or bruising at the injection site for 2–4 days.",
      "Temporary increase in pain during the first 1–2 weeks as the inflammatory healing response activates.",
      "Rare risk of infection at the blood-draw or injection site — minimized through sterile technique.",
      "Rare allergic or vasovagal reactions to the blood draw itself.",
      "PRP may not provide meaningful improvement in severe end-stage joint disease — careful patient selection minimizes this.",
      "Anti-inflammatory medications must be paused around the procedure, which can be a tradeoff for some patients.",
    ],
    faqs: [
      {
        q: "Is PRP covered by insurance?",
        a: "Most insurance plans do not currently cover PRP for musculoskeletal conditions, considering it experimental for some indications. We provide transparent self-pay pricing during your consultation. CareCredit and similar financing options are available.",
      },
      {
        q: "How is PRP different from cortisone?",
        a: "Cortisone reduces inflammation but does not promote tissue healing — and repeated steroid injections may degrade tendon and cartilage tissue over time. PRP delivers concentrated growth factors that support biological repair, with effects that build over weeks to months and tend to be more durable.",
      },
      {
        q: "How is PRP made?",
        a: "We draw a small amount of your blood (about the volume of a routine blood test), spin it in a sterile centrifuge to concentrate the platelets and growth factors, and then inject the resulting plasma into your injured tissue under ultrasound guidance.",
      },
      {
        q: "What conditions respond best to PRP?",
        a: "PRP has the strongest evidence in tendinopathy — particularly tennis elbow, patellar tendinopathy, and rotator cuff partial tears — and in mild-to-moderate knee osteoarthritis. We will tell you honestly when the evidence does not support PRP for your specific condition.",
      },
      {
        q: "How long until I notice a difference?",
        a: "PRP works on biological timeframes. Most patients begin to notice improvement at the 4–6 week mark, with continued improvement out to 3 months. It is not an overnight fix; it is a healing response we are amplifying.",
      },
      {
        q: "Will I need more than one injection?",
        a: "Some conditions respond to a single injection; others benefit from a series of two or three injections, typically spaced 4–6 weeks apart. We discuss the likely course at your initial consult and adjust based on response.",
      },
      {
        q: "Should I stop my anti-inflammatory medications?",
        a: "Yes — typically we ask you to stop NSAIDs (ibuprofen, naproxen, diclofenac, etc.) and aspirin for 7–14 days before and 2–4 weeks after PRP, as directed by your provider. Anti-inflammatories blunt the very inflammatory cascade we are trying to harness for healing.",
      },
      {
        q: "What is recovery like?",
        a: "Most patients have mild soreness at the injection site for 2–4 days. There are no formal activity restrictions — most patients resume normal activity as comfort allows, guided by their provider. Many patients combine PRP with structured physical therapy to optimize results.",
      },
      {
        q: "Is PRP the same as stem cell therapy?",
        a: "No. PRP uses concentrated platelets and growth factors from your own blood. Stem cell therapy refers to a separate category of biologics with different (and currently more limited and more carefully regulated) evidence. We offer PRP and discuss other biologic options honestly when patients ask.",
      },
      {
        q: "Will PRP help me avoid joint replacement?",
        a: "For mild-to-moderate knee osteoarthritis, PRP can meaningfully reduce pain and delay the need for replacement. For severe end-stage osteoarthritis, PRP is unlikely to provide enough benefit and we will tell you so. Our goal is to help you make the decision with accurate information.",
      },
    ],
    insuranceBlurb:
      "PRP therapy is generally not covered by commercial insurance or Medicare for musculoskeletal conditions. We provide transparent self-pay pricing for single sessions and series, and offer CareCredit financing for patients who would prefer to spread payment. We will tell you honestly whether PRP is likely to help in your specific case before you spend money.",
    expertiseBlurb:
      "We are conservative about PRP. We will not sell you a PRP series for a condition where the evidence does not support it. When PRP is right for you, we use ultrasound guidance for every injection, prepare the PRP in our office under sterile technique, and structure the post-procedure plan to maximize the biology — including coordinated physical therapy and clear restrictions on anti-inflammatories.",
    relatedServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Radiofrequency Ablation",
        blurb: "Outpatient procedure using precise electrical current to quiet damaged or inflamed nerves.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Injections & Nerve Blocks",
        blurb: "Image-guided injections that calm inflamed joints, nerves, and spinal structures.",
      },
      {
        slug: "kyphoplasty-specialist",
        title: "Kyphoplasty",
        blurb: "Minimally invasive procedure that stabilizes painful spinal compression fractures.",
      },
    ],
  },

  "mild-procedure": {
    slug: "mild-procedure",
    title: "MILD Procedure",
    metaDescription:
      "MILD procedure for lumbar spinal stenosis at HTx Pain Institute. Outpatient, no implants, walk out the same day. Schedule your consultation today.",
    heroImage: "fluoroscopy-c-arm-procedure-suite.jpg",
    heroImageAlt: "A fluoroscopy C-arm and patient table in a bright, empty interventional procedure suite with a bank of imaging monitors.",
    eyebrow: "MILD",
    leadLine: "An outpatient answer for lumbar spinal stenosis.",
    intro:
      "MILD (Minimally Invasive Lumbar Decompression) is an FDA-cleared outpatient procedure for patients with lumbar spinal stenosis whose pain and walking limitations stem from a thickened ligamentum flavum. Through an incision the size of a baby aspirin, small fragments of bone and ligament are removed to restore space in the spinal canal — without implants, stitches, or general anesthesia.",
    quickFacts: {
      setting: "Outpatient, walk out same day",
      anesthesia: "Local + light sedation, no general",
      recovery: "Light activity within 24 hours",
    },
    steps: [
      "MRI confirms ligamentum flavum hypertrophy as the source of stenosis.",
      "A small access port — about the size of a baby aspirin — is created in the lower back.",
      "Under live fluoroscopic guidance, specialized instruments remove portions of thickened ligament and bone.",
      "The space restored in the spinal canal relieves pressure on nerves causing leg pain and limited walking.",
    ],
    whoIsItFor: [
      "Lumbar spinal stenosis with neurogenic claudication",
      "Pain or numbness with standing or walking, relieved by sitting or leaning forward",
      "Ligamentum flavum hypertrophy on MRI",
      "Patients seeking an alternative to laminectomy or fusion",
    ],
    whatToExpect: [
      "Procedure time is typically under 1 hour.",
      "Performed under local anesthesia with light sedation.",
      "No general anesthesia, no implants, no stitches.",
      "Most patients walk out the same day.",
    ],
    recoveryResults: [
      "Light activity within 24 hours.",
      "Most return to normal activities within a few days.",
      "Improvement in walking distance progresses over 2–6 weeks.",
      "Published data shows durable functional improvement at 2+ years.",
    ],
    risksIntro:
      "Every procedure carries some risk. We explain everything in plain language during your consultation, and again on the day of the procedure — so you know what is normal, what to watch for, and when to call.",
    risks: [
      "Mild soreness, bruising, or tenderness at the access site for several days.",
      "Temporary increase in pain in the first 24–72 hours as inflammation settles.",
      "Rare risk of infection, bleeding, or allergic reaction to medications.",
      "Procedure-specific risks discussed in detail during your consultation.",
      "Most patients tolerate the procedure well and return to light activity quickly.",
    ],
    faqs: [
      {
        q: "Is MILD a surgery?",
        a: "MILD is a percutaneous, outpatient procedure performed through a tiny access port — far less invasive than traditional lumbar decompression surgery. There are no implants, no stitches, and no general anesthesia.",
      },
      {
        q: "Will I need fusion afterward?",
        a: "MILD preserves the spine's natural anatomy and does not destabilize it the way larger decompression procedures sometimes do. Most appropriate candidates avoid fusion entirely.",
      },
    ],
    insuranceBlurb:
      "MILD Procedure is typically covered by major commercial insurance, Medicare, and most government plans when medically indicated. Our team verifies your benefits, copays, and prior-authorization requirements before your visit. For services not covered by insurance, we offer transparent self-pay pricing and CareCredit financing.",
    expertiseBlurb:
      "MILD Procedure at HTx Pain Institute is performed by Edward Baumgartner Jr., MD — double board-certified in Anesthesiology and Pain Medicine, with over fifteen years of interventional pain medicine experience. We combine institute-caliber technical execution with the time and judgment every patient deserves. Precision. Lasting Relief.",
    relatedServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Radiofrequency Ablation",
        blurb: "Outpatient procedure using precise electrical current to quiet damaged or inflamed nerves.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Injections & Nerve Blocks",
        blurb: "Image-guided injections that calm inflamed joints, nerves, and spinal structures.",
      },
      {
        slug: "kyphoplasty-specialist",
        title: "Kyphoplasty",
        blurb: "Minimally invasive procedure that stabilizes painful spinal compression fractures.",
      },
    ],
  },

  "minuteman-procedure": {
    slug: "minuteman-procedure",
    title: "Minuteman Lumbar Fusion",
    metaDescription:
      "Minuteman posterior lumbar interspinous-interlaminar fusion at HTx Pain Institute Houston. A minimally invasive device that stabilizes a painful lumbar segment. Schedule a consultation.",
    heroImage: "lumbar-spine-model-closeup.jpg",
    heroImageAlt: "Close-up of an anatomical lumbar spine model with sacrum, yellow nerve roots, and a red herniated disc resting on a black treatment table.",
    eyebrow: "Minuteman",
    leadLine: "Posterior lumbar fusion through a minimally invasive interspinous approach.",
    intro:
      "The Minuteman is a posterior, minimally invasive interspinous-interlaminar fusion device for the lumbar spine. Placed between the spinous processes of a painful lumbar segment, it provides immediate stabilization with less soft-tissue disruption than traditional open fusion and supports biological fusion over the following months. It is a separate procedure from SI joint fusion; Dr. Baumgartner selects it for patients whose anatomy and imaging fit.",
    quickFacts: {
      setting: "Outpatient, home same day",
      anesthesia: "Discussed at consult",
      recovery: "Walk same day; full activity 6–12 weeks",
    },
    steps: [
      "Imaging and diagnostic evaluation confirm the lumbar segment as the pain source.",
      "Through a small posterior incision, the Minuteman implant is positioned between the spinous processes of the treated lumbar level.",
      "The device is locked in place under fluoroscopic guidance, providing immediate stability.",
      "Bone graft promotes biological fusion of the segment over the following months.",
    ],
    whoIsItFor: [
      "Lumbar pain that has not responded to physical therapy and injections",
      "Imaging that shows a lumbar segment that would benefit from stabilization",
      "Patients seeking a posterior, minimally invasive alternative to open lumbar fusion",
      "Failure of conservative care over 6+ months",
    ],
    whatToExpect: [
      "Procedure time is typically under 60 minutes.",
      "Outpatient — most patients go home the same day.",
      "Light walking encouraged within 24 hours.",
      "Pain relief progresses over 2–3 months as fusion biology develops.",
    ],
    recoveryResults: [
      "Most patients walk unassisted the same day; an assistive device is used only if Dr. Baumgartner advises it for you individually.",
      "Light activities resume within 1–2 weeks.",
      "Full activity by 6–12 weeks, individualized.",
      "Imaging follow-up to confirm fusion at 6 and 12 months.",
    ],
    risksIntro:
      "Every procedure carries some risk. We explain everything in plain language during your consultation, and again on the day of the procedure — so you know what is normal, what to watch for, and when to call.",
    risks: [
      "Mild soreness, bruising, or tenderness at the access site for several days.",
      "Temporary increase in pain in the first 24–72 hours as inflammation settles.",
      "Rare risk of infection, bleeding, or allergic reaction to medications.",
      "Procedure-specific risks discussed in detail during your consultation.",
      "Most patients tolerate the procedure well and return to light activity quickly.",
    ],
    faqs: [
      {
        q: "Is Minuteman the same as SI joint fusion?",
        a: "No. Minuteman is a lumbar spine procedure — the device sits between the spinous processes of a lumbar segment to stabilize it. SI joint fusion treats the sacroiliac joint of the pelvis and uses different systems. Both are offered here, and the diagnostic workup determines which, if either, fits your pain source.",
      },
      {
        q: "Will the device set off airport security?",
        a: "The Minuteman implant is typically below the threshold of airport metal detectors. We provide an implant card you can carry if needed.",
      },
    ],
    insuranceBlurb:
      "Minuteman lumbar fusion is typically covered by major commercial insurance, Medicare, and most government plans when medically indicated. Our team verifies your benefits, copays, and prior-authorization requirements before your visit. For services not covered by insurance, we offer transparent self-pay pricing and CareCredit financing.",
    expertiseBlurb:
      "Minuteman lumbar fusion at HTx Pain Institute is performed by Edward Baumgartner Jr., MD — double board-certified in Anesthesiology and Pain Medicine, with over fifteen years of interventional pain medicine experience. We combine institute-caliber technical execution with the time and judgment every patient deserves. Precision. Lasting Relief.",
    relatedServices: [
      {
        slug: "radiofrequency-ablation",
        title: "Radiofrequency Ablation",
        blurb: "Outpatient procedure using precise electrical current to quiet damaged or inflamed nerves.",
      },
      {
        slug: "injections-blocks-specialist",
        title: "Injections & Nerve Blocks",
        blurb: "Image-guided injections that calm inflamed joints, nerves, and spinal structures.",
      },
      {
        slug: "si-joint-fusions",
        title: "SI Joint Fusions",
        blurb: "A separate procedure for the sacroiliac joint of the pelvis — minimally invasive fusion for confirmed SI joint pain.",
      },
    ],
  },
};
