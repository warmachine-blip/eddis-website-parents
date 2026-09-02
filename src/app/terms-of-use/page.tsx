import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions · HTx Pain Institute",
  description: "Terms governing your use of the HTx Pain Institute website.",
};

const data = {
  title: "Terms & Conditions",
  eyebrow: "Legal",
  breadcrumbLabel: "Terms",
  effectiveLine: "Effective 2026",
  intro: "By using this website, you agree to the terms below.",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      paragraphs: [
        "Your access to and use of this website is conditioned upon your acceptance of and compliance with these Terms. By using the website, you agree to be bound by these Terms.",
      ],
    },
    {
      heading: "2. Not Medical Advice",
      paragraphs: [
        "Information on this website is provided for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician with any questions you may have regarding a medical condition.",
      ],
    },
    {
      heading: "3. No Doctor-Patient Relationship",
      paragraphs: [
        "Use of this website does not create a doctor-patient relationship. A doctor-patient relationship is established only through a formal consultation at one of our locations.",
      ],
    },
    {
      heading: "4. Intellectual Property",
      paragraphs: [
        "All content on this website — including text, graphics, logos, images, and software — is the property of HTx Pain Institute or its content suppliers and is protected by applicable copyright laws.",
      ],
    },
    {
      heading: "5. User Submissions",
      paragraphs: [
        "By submitting information through any form on this website, you represent that the information is accurate and that you have the right to submit it. Do not submit PHI for third parties without authorization.",
      ],
    },
    {
      heading: "6. Third-Party Links",
      paragraphs: [
        "This website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of any linked websites.",
      ],
    },
    {
      heading: "7. Limitation Of Liability",
      paragraphs: [
        "To the maximum extent permitted by law, HTx Pain Institute, its providers, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website.",
      ],
    },
    {
      heading: "8. Governing Law",
      paragraphs: [
        "These Terms are governed by the laws of the State of Texas, without regard to conflict-of-law principles. Any disputes shall be resolved in the courts located in Harris County, Texas.",
      ],
    },
    {
      heading: "9. Changes To These Terms",
      paragraphs: [
        "We may update these Terms at any time. Continued use of the website after changes constitutes acceptance of the revised Terms.",
      ],
    },
    {
      heading: "10. Contact",
      paragraphs: ["Questions about these Terms? Contact us at info@htxpaincare.com."],
    },
  ],
};

export default function TermsOfUsePage() {
  return <LegalPage data={data} />;
}
