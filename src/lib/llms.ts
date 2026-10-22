import { insuranceGroups, otherPaymentOptions } from "./insurance";
import { openingHours, offices, practice } from "./nav";
import { foundingYear, PHYSICIAN_NPI } from "./schema";
import { services } from "./services";
import { SITE_URL } from "./site";

/**
 * Plain-text summary for /llms.txt. Addresses, hours, phone, and procedure
 * names come from the same modules the pages render, so this file cannot
 * drift from the site.
 */
export function llmsText(): string {
  const houston = offices.find((office) => office.key === "houston");
  const humble = offices.find((office) => office.key === "humble");
  if (!houston || !humble) throw new Error("llms.txt requires both offices");

  const block = openingHours[0];
  const hours = `${block.days[0]} to ${block.days[block.days.length - 1]}, ${clock(block.opens)} to ${clock(block.closes)}`;
  const procedures = services.filter((service) => !service.comingSoon).map((service) => service.title);
  const insurance = [
    ...insuranceGroups.map((group) => {
      if (group.name === "Military") return group.plans[0];
      if (group.name === "Medicaid") return "Texas Medicaid";
      if (group.name === "Commercial") return "major commercial plans";
      if (group.name === "Workers' Compensation") return "workers' compensation";
      return group.name;
    }),
    ...otherPaymentOptions,
  ];

  const pages: [string, string][] = [
    ["Dr. Edward Baumgartner Jr., MD", "/dr-edward-baumgartner"],
    ["Basivertebral Nerve Ablation (BVN)", "/intracept-procedure"],
    ["Spinal Cord Stimulation", "/spinal-cord-stimulation-specialist"],
    ["Radiofrequency Ablation", "/radiofrequency-ablation"],
    ["Second Opinion Before Surgery", "/second-opinion"],
    ["Insurance", "/insurance"],
    ["Houston office", "/locations/northwest-houston"],
    ["Humble office", "/locations/humble"],
    ["Request an appointment", "/request-appointment"],
  ];

  return [
    `# ${practice.name}`,
    `> Interventional pain medicine practice in Houston, Texas, founded in ${foundingYear} by Edward Baumgartner Jr., MD, who is board certified in Anesthesiology and Pain Medicine. Two offices: Houston (Willowbrook area) and Humble. Staff speak English and Spanish. Dr. Baumgartner sees patients in English.`,
    "",
    "Facts",
    `- Physician: Edward Baumgartner Jr., MD. NPI ${PHYSICIAN_NPI}. Training: Texas A&M University (B.S.), UTHealth Houston (M.D.), Rush University Medical Center (anesthesiology residency, pain medicine fellowship). He has performed 10,000+ procedures.`,
    "- Also seeing patients: Allison Turner, DNP.",
    `- Houston office: ${houston.addressLine1}, ${houston.addressLine2}.`,
    `- Humble office: ${humble.addressLine1}, ${humble.addressLine2}.`,
    `- Hours: ${hours}, both offices.`,
    `- Phone: ${practice.phone}. Online booking: ${SITE_URL}/request-appointment`,
    `- Insurance: ${insurance.join(", ")}. Call to confirm your benefits.`,
    `- Procedures offered include ${procedures.join(", ")}.`,
    "- The clinic can review records before an out-of-town patient travels in. Call before you book.",
    "- Information on this site is not medical advice.",
    "",
    "## Key pages",
    ...pages.map(([label, path]) => `- [${label}](${SITE_URL}${path})`),
    "",
  ].join("\n");
}

function clock(time: string): string {
  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return minute ? `${hour12}:${String(minute).padStart(2, "0")} ${suffix}` : `${hour12} ${suffix}`;
}
