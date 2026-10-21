/**
 * Confirmed accepted plans, shared by /insurance and /patients.
 * Groups follow the clinic list from October 21, 2026.
 * A listed plan is not a promise that a visit is covered.
 */
export const coverageNote =
  "Coverage depends on your specific plan. Please call our office to confirm your benefits before your visit.";

export type InsuranceGroup = {
  name: string;
  plans: string[];
};

export const insuranceGroups: InsuranceGroup[] = [
  {
    name: "Medicare",
    plans: [
      "Original Medicare (Texas)",
      "Railroad Medicare",
      "Medicare supplement plans: Medico, UnitedHealthcare",
    ],
  },
  {
    name: "Medicare Advantage",
    plans: [
      "Aetna Medicare (PPO and HMO)",
      "Blue Cross Medicare Advantage",
      "Cigna HealthSpring",
      "Devoted Health",
      "Humana",
      "UnitedHealthcare Medicare Advantage",
      "WellMed",
      "Wellpoint (formerly Amerigroup)",
      "Medical groups: ViCare Health, Van Lang IPA, Verda Healthcare",
    ],
  },
  {
    name: "Military",
    plans: ["US Family Health Plan (TRICARE Prime through CHRISTUS)"],
  },
  {
    name: "Medicaid",
    plans: ["Texas Medicaid (TMHP)", "UnitedHealthcare Community Plan"],
  },
  {
    name: "Commercial",
    plans: [
      "Aetna",
      "Blue Cross Blue Shield of Texas",
      "Cigna",
      "GEHA (federal employees)",
      "Meritain Health (Aetna)",
      "UMR (UnitedHealthcare employer plans)",
      "UnitedHealthcare, including Golden Rule and Surest",
      "Employer plan administrators: Allegiance, Allied Administrators, Boon, Entrust, Gravie, Sana Benefits",
    ],
  },
  {
    name: "Workers' Compensation",
    plans: [
      "Texas Mutual",
      "Sedgwick",
      "Gallagher Bassett",
      "Liberty Mutual",
      "Texas Association of School Boards (TASB)",
      "Department of Labor",
      "Berkshire Hathaway Homestate",
      "Broadspire",
      "CorVel",
      "CCMSI",
      "ESIS",
      "Tristar Risk Management",
      "Zurich",
      "Accident Fund",
    ],
  },
];

/** Not insurance products. The clinic also sees these patients. */
export const otherPaymentOptions = ["Personal injury", "Self pay"];
