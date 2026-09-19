import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HTx Pain Institute collects, uses, and protects your information, including HIPAA-protected health information, across our website and both offices.",
};

const data = {
  title: "Privacy Policy",
  eyebrow: "Legal",
  breadcrumbLabel: "Privacy",
  effectiveLine: "Effective September 19, 2026",
  intro:
    "This policy describes how we collect, use, and protect your information, including HIPAA-protected health information.",
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
        "Our contact form and newsletter signup do not send anything to this website. They open a pre-filled message in your own email program, which you choose to send to our office. We then hold it as ordinary email. The contact form asks for your name, email, phone, a topic, and a message.",
        "Online appointment scheduling runs through Nimblr, an embedded third-party scheduler. What you enter there, including your name, contact information, and appointment preferences, goes to Nimblr and to our office to book your visit, and is handled under Nimblr's privacy policy as well as ours.",
        "Our hosting provider keeps standard server logs, which record your IP address, browser type, and the pages you request. The third-party services listed in section 5 also collect information about your visit.",
        "We do not ask for health information through website forms. Please save medical detail for your call or visit.",
      ],
    },
    {
      heading: "4. How We Use Your Information",
      paragraphs: [
        "We use the information you submit to respond to your inquiry, schedule appointments, verify benefits when appropriate, and improve our website. We do not sell your information.",
      ],
    },
    {
      heading: "5. Cookies, Analytics, and Third-Party Services",
      paragraphs: [
        "This website sets cookies and loads content from other companies. Some of it runs on every page, some only on the pages that need it. This is the full list.",
        "On every page. Google Tag Manager loads the two Google tags below. Google Ads conversion tracking tells us which of our ads led someone to book; it sets a cookie named _gcl_au. Google Analytics tells us which pages people visit and how they move through the site; it sets cookies named _ga and _ga_7LR9NYKKQ3. A chat widget from LeadConnector lets you text the office; it stores data in your browser, including an identifier for your conversation and a list of the pages you have viewed here, and it does this whether or not you open the chat. The chat widget also loads its fonts from an outside font service.",
        "On certain pages. Our contact and location pages embed a Google Map, which loads when you scroll down to it. Our home and contact pages embed a Birdeye widget showing our patient reviews. Our appointment page embeds the Nimblr scheduler, which runs its own Google Analytics property, separate from ours. Our video library displays thumbnail images served by YouTube.",
        "Each of these companies receives your IP address and basic browser information when its content loads on the page, and each handles that under its own privacy policy rather than ours. We do not pass your name, your contact details, or any health information to Google through these measurement tags.",
        "What you can do. You can block or delete cookies in your browser settings, which will also clear what the chat widget has stored. Google publishes a browser add-on that opts you out of Google Analytics, and you can review or turn off ad personalization in your Google account settings. Blocking these will not affect your ability to use this site, call us, or book an appointment. This website does not currently respond to Do Not Track or Global Privacy Control browser signals.",
      ],
    },
    {
      heading: "6. Data Sharing",
      paragraphs: [
        "We share the information you give us as a patient only as required to provide care, to comply with the law, or with vendors operating under HIPAA-compliant agreements, such as scheduling, billing, and hosting. We do not sell your information, and we do not share it for marketing by anyone outside our practice.",
        "The website measurement and advertising services listed in section 5 are a separate matter. They collect information about your visit to this site directly in your browser, and they handle it under their own privacy policies. If you have questions about that, contact our Privacy Officer using the details in section 10.",
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
