import { openingHours, offices, practice } from "./nav";
import { PHYSICIAN_NPI } from "./schema";

const phone = practice.phone;
const houston = offices.find((office) => office.key === "houston");
const humble = offices.find((office) => office.key === "humble");
if (!houston || !humble) throw new Error("FAQ copy requires both offices");

const hours = weekdayHours();

export const appointmentFaqs = [
  {
    q: "What should I bring to my first visit?",
    a: "Your photo ID, insurance card, a list of your current medicines, and any imaging reports or discs and records from past pain treatment. If you have had spine or joint surgery, bring the operative report if you have it.",
  },
  {
    q: "Do I need a referral?",
    a: `Some insurance plans require one and many do not. Our team checks this when they verify your benefits before your visit. Call ${phone} to confirm your benefits.`,
  },
  {
    q: "Which insurance plans do you take?",
    a: `We work with Medicare, many Medicare Advantage plans, Texas Medicaid, TRICARE Prime through US Family Health Plan, most major commercial plans, workers' compensation and personal injury cases. Self-pay is also available. See the full list on our insurance page, and call ${phone} to confirm your benefits.`,
  },
  {
    q: "¿Hablan español?",
    a: `Sí. Our front desk can help you in Spanish when you call ${phone}. Dr. Baumgartner sees patients in English.`,
  },
  {
    q: "Which office should I choose?",
    a: `Pick the one closest to you. Our Houston office is at ${houston.addressLine1}, in the Willowbrook area, and our Humble office is at ${humble.addressLine1}. Both are open ${hours}.`,
  },
  {
    q: "I live outside Houston. Can I still be seen?",
    a: "Yes. Call us before you book so we can tell you which records and imaging to send ahead. The clinic can review records before an out-of-town patient travels in, so the first visit can focus on a diagnosis and a plan.",
  },
];

export const physicianFaqs = [
  {
    q: "Where does Dr. Baumgartner see patients?",
    a: `At HTx Pain Institute's two offices: ${houston.addressLine1}, ${houston.addressLine2} (Willowbrook area) and ${humble.addressLine1}, ${humble.addressLine2}. Both are open ${hours}.`,
  },
  {
    q: "Is Dr. Baumgartner board certified?",
    a: "Yes. He is board certified in Anesthesiology and in Pain Medicine.",
  },
  {
    q: "What procedures does he perform?",
    a: "Procedures include basivertebral nerve ablation (BVN), spinal cord stimulator trials and implants, radiofrequency ablation, SI joint fusion, Minuteman lumbar fusion, kyphoplasty, the MILD procedure, epidural steroid injections, nerve blocks and PRP. Whether a procedure fits you depends on your exam and imaging.",
  },
  {
    q: "What insurance does the practice accept?",
    a: `Medicare, many Medicare Advantage plans, Texas Medicaid, most major commercial plans and workers' compensation. Plans change, so call ${phone} to confirm your benefits.`,
  },
  {
    q: "Does the office speak Spanish?",
    a: "Yes, our staff can help in Spanish. Dr. Baumgartner sees patients in English. Hablamos español.",
  },
  {
    q: "What is his NPI number?",
    a: `${PHYSICIAN_NPI}. You can look it up in the national NPPES registry.`,
  },
  {
    q: "Where did he train?",
    a: "Texas A&M University (B.S.), the University of Texas Health Science Center at Houston (M.D.), and Rush University Medical Center in Chicago (anesthesiology residency and pain medicine fellowship).",
  },
];

export const secondOpinionFaqs = [
  {
    q: "I live outside the Houston area. How does a second opinion work?",
    a: "Call us first. We will tell you which imaging and records to send so they can be read before your visit, and help you choose between our Houston and Humble offices. Our Humble office is a short drive from George Bush Intercontinental Airport.",
  },
  {
    q: "Do you see patients from other states?",
    a: `Yes. Insurance coverage across state lines varies, so call ${phone} to confirm your benefits before you travel.`,
  },
  {
    q: "Will I have to have a procedure?",
    a: "No. A second opinion is a diagnosis and a written impression. Any treatment is your choice.",
  },
];

export const stimulatorTrialFaqs = [
  {
    q: "How long does a spinal cord stimulator trial last?",
    a: "Usually about a week. Your doctor will set the exact length based on your case.",
  },
  {
    q: "Is the trial done under general anesthesia?",
    a: "No. The skin is numbed with local anesthetic, and you stay awake so you can tell the doctor where you feel the stimulation.",
  },
  {
    q: "What can I do during the trial week?",
    a: "Most normal daily activity, so you can judge the device in real life. You will be asked to avoid bending, twisting, lifting and getting the lead site wet. Your care team will give you exact instructions.",
  },
  {
    q: "How is a trial judged a success?",
    a: "You and your doctor compare your pain and daily function during the trial with before it, often using a pain diary. A permanent implant is only discussed if the trial helped enough to be worth it to you.",
  },
  {
    q: "What if the trial does not help?",
    a: "The temporary leads are removed and nothing is implanted. Your doctor will talk through other options.",
  },
  {
    q: "Will insurance cover a trial?",
    a: `Many plans cover spinal cord stimulator trials when certain criteria are met, and some require a psychological evaluation first. Call ${phone} to confirm your benefits.`,
  },
];

export const stellateBlockFaqs = [
  {
    q: "How long does a stellate ganglion block take?",
    a: "The injection itself usually takes a few minutes. Plan on more time for check-in and a short observation period afterward.",
  },
  {
    q: "What does it feel like afterward?",
    a: "Some people notice a droopy eyelid, a hoarse voice, a stuffy nose or warmth in the arm on the treated side. These effects usually fade within hours.",
  },
  {
    q: "Can I drive home?",
    a: "Plan for someone else to drive you home that day.",
  },
  {
    q: "How many blocks will I need?",
    a: "It varies. Some people have a series of blocks, and the plan depends on how you respond to the first one.",
  },
  {
    q: "Is it covered by insurance?",
    a: `Coverage depends on your plan and the reason for the block. Call ${phone} to confirm your benefits.`,
  },
];

export const ablationBlogFaqs = [
  {
    q: "How do I know if my ablation worked?",
    a: "Most people notice a change within a few weeks. Track your pain and daily activity and bring that to your follow-up visit.",
  },
  {
    q: "Can radiofrequency ablation be repeated?",
    a: "Nerves can regrow over time, and repeat ablation is a common option when the first one helped. Your doctor will review whether it makes sense for you.",
  },
  {
    q: "What if both test blocks helped but the ablation did not?",
    a: "That points to a closer look at technique, the exact nerves treated, or another pain source nearby. It is a reason for a careful re-evaluation, not a dead end.",
  },
  {
    q: "What other options are there?",
    a: "Depending on the cause, options can include a different injection, physical therapy, medicine changes, spinal cord stimulation, or for vertebral endplate pain, basivertebral nerve ablation (BVN).",
  },
];

function weekdayHours(): string {
  const block = openingHours[0];
  const fmt = (time: string) => {
    const [hourText, minuteText] = time.split(":");
    const hour = Number(hourText);
    const minute = Number(minuteText);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return minute ? `${hour12}:${String(minute).padStart(2, "0")} ${suffix}` : `${hour12} ${suffix}`;
  };
  return `${block.days[0]} to ${block.days[block.days.length - 1]}, ${fmt(block.opens)} to ${fmt(block.closes)}`;
}
