import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HTx Pain Institute collects, uses, and protects information — including HIPAA-protected health information.",
};

const data = {
  title: "Privacy Policy",
  eyebrow: "Legal",
  breadcrumbLabel: "Privacy",
  effectiveLine: "Effective 2026",
  intro:
    "This policy describes how we collect, use, and protect your information — including HIPAA-protected health information.",
  sections: [
    {
      heading: "1. Overview",
      paragraphs: [
        'HTx Pain Institute ("we," "us," "our") operates this website and provides medical services in Texas. We are committed to protecting the privacy of every patient and visitor.',
      ],
    },
    {
      heading: "2. HIPAA-Protected Information",
      paragraphs: [
        "As a covered entity under the Health Insurance Portability and Accountability Act (HIPAA), we maintain physical, technical, and administrative safeguards to protect your Protected Health Information (PHI). Our full Notice of Privacy Practices is provided at intake and available on request.",
      ],
    },
    {
      heading: "3. Information We Collect",
      paragraphs: [
        "Through this website we may collect: contact information you submit through forms, and basic device and browser metadata in standard server logs. Our appointment request form asks only for your name, phone number, email address, and preferred location, date, and time. Our contact form asks for your name, email, phone, a topic, and a message. We do not ask for health information through website forms — please save medical detail for your call or visit.",
      ],
    },
    {
      heading: "4. How We Use Your Information",
      paragraphs: [
        "We use the information you submit to respond to your inquiry, schedule appointments, verify benefits when appropriate, and improve our website. We do not sell your information.",
      ],
    },
    {
      heading: "5. Cookies & Analytics",
      paragraphs: [
        "This website does not currently set cookies or run analytics scripts. Our hosting provider keeps standard server logs (IP address, browser type, pages requested) for security and performance. If we add analytics in the future, we will update this policy.",
      ],
    },
    {
      heading: "6. Data Sharing",
      paragraphs: [
        "We share information only as required to provide care, comply with the law, or with vendors operating under HIPAA-compliant agreements (e.g., scheduling, billing, hosting). We do not share your information for marketing purposes outside our practice.",
      ],
    },
    {
      heading: "7. Your Rights",
      paragraphs: [
        `You have rights to access, amend, and request restrictions on your PHI under HIPAA. To exercise these rights, contact our office at ${practice.phone} or ${practice.email}.`,
      ],
    },
    {
      heading: "8. Security",
      paragraphs: [
        "We use industry-standard safeguards including encrypted transmission (TLS) and access controls. No system is perfectly secure; if we become aware of a breach affecting your information, we will notify you in accordance with applicable law.",
      ],
    },
    {
      heading: "9. Changes To This Policy",
      paragraphs: [
        "We may update this Policy from time to time. The current version will always be posted here, with the effective date noted above.",
      ],
    },
    {
      heading: "10. Contact",
      paragraphs: [
        `For privacy questions, contact our Privacy Officer at ${practice.email} or ${practice.phone}.`,
      ],
    },
  ],
};

export default function PrivacyPage() {
  return <LegalPage data={data} />;
}
