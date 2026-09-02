import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal-page";
import { offices, practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "HIPAA Notice of Privacy Practices",
  description:
    "HTx Pain Institute Notice of Privacy Practices, describing how your protected health information may be used and disclosed.",
};

const data = {
  title: "Notice of Privacy Practices",
  eyebrow: "HIPAA",
  breadcrumbLabel: "HIPAA Notice",
  parentCrumb: { label: "Patients", href: "/patients" },
  card: false,
  intro:
    "This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.",
  sections: [
    {
      heading: "Our pledge regarding your health information",
      effectiveNote: "Effective date: 2026-01-01",
      paragraphs: [
        'HTx Pain Institute ("we," "us," or "our") is committed to protecting the privacy of your health information. This Notice of Privacy Practices describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.',
        'We are required by law to maintain the privacy of your protected health information ("PHI"), to provide you with this Notice of our legal duties and privacy practices, and to abide by the terms of the Notice currently in effect.',
      ],
    },
    {
      heading: "Uses and disclosures for treatment, payment, and operations",
      paragraphs: ["We may use and disclose your PHI for the following purposes:"],
      list: [
        "Treatment — to provide, coordinate, or manage your healthcare and any related services.",
        "Payment — to bill and receive payment from your insurance, government program, or you.",
        "Healthcare operations — for the activities necessary to operate our practice, including quality improvement, credentialing, training, and audits.",
      ],
    },
    {
      heading: "Other uses and disclosures permitted by law",
      paragraphs: [
        "We may use or disclose your PHI without your authorization in certain situations, including: as required by law; for public health activities; to report abuse, neglect, or domestic violence; for health oversight; in judicial and administrative proceedings; for law enforcement purposes; for organ donation; for research with appropriate approvals; to avert serious threats to health or safety; for specialized government functions; and for workers' compensation purposes as authorized by Texas law.",
      ],
    },
    {
      heading: "Uses and disclosures requiring your authorization",
      paragraphs: [
        "Most uses and disclosures of psychotherapy notes, marketing communications, and the sale of PHI require your written authorization. You may revoke an authorization in writing at any time, and we will stop using or disclosing your PHI for the purpose covered by the authorization, except where we have already taken action in reliance on it.",
      ],
    },
    {
      heading: "Your rights regarding your health information",
      paragraphs: ["You have the right to:"],
      list: [
        "Inspect and obtain a copy of your medical and billing records.",
        "Request an amendment to information you believe is inaccurate.",
        "Receive an accounting of certain disclosures of your PHI.",
        "Request restrictions on certain uses and disclosures, including disclosures to a health plan when you have paid for a service in full out of pocket.",
        "Request confidential communications by alternative means or at an alternative location.",
        "Receive a paper copy of this Notice, even if you have agreed to receive it electronically.",
        "Be notified following a breach of unsecured PHI.",
      ],
    },
    {
      heading: "Changes to this Notice",
      paragraphs: [
        "We reserve the right to change this Notice and to make the revised Notice effective for medical information we already have about you as well as any information we receive in the future. The current Notice is posted in our offices and on our website. Each version is dated.",
      ],
    },
    {
      heading: "Complaints",
      paragraphs: [
        `If you believe your privacy rights have been violated, you may file a complaint with us by contacting our Privacy Officer at either office address or by phone at ${practice.phone}. You may also file a complaint with the U.S. Department of Health & Human Services Office for Civil Rights. We will not retaliate against you for filing a complaint.`,
      ],
    },
  ],
};

export default function HipaaNoticePage() {
  return (
    <div>
      <LegalPage data={data} />

      <div className="mx-auto max-w-3xl px-6 pb-16 lg:px-10 lg:pb-24">
        <h2 className="font-serif text-xl text-navy">Contact us</h2>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
          To exercise any of these rights or to ask questions about this Notice, contact our
          Privacy Officer:
        </p>
        <address className="mt-3 not-italic text-sm leading-relaxed text-charcoal-soft">
          {practice.name}
          {offices.map((office) => (
            <span key={office.key} className="block">
              {office.addressLine1}, {office.addressLine2}
            </span>
          ))}
          Phone: {practice.phone}
          <br />
          Email: {practice.email}
        </address>
        <div className="mt-5 rounded-xl border border-line bg-pearl p-4 text-sm leading-relaxed text-charcoal-soft">
          Need a paper copy? Ask the front desk on your next visit, or contact us.
        </div>
      </div>

      <section className="border-t border-line bg-navy-deep text-off-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-20">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Ready When You Are
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight sm:text-4xl">
            Get the care you deserve. Schedule your consultation today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-off-white/70">
            Two Houston-area locations. Same-week consults available. Most insurance accepted.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/request-appointment"
              className="border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Request Appointment
            </Link>
            <a
              href={practice.phoneHref}
              className="border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
