import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { offices, practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the HTx Pain Institute website handles cookies, analytics, advertising, chat, and appointment scheduling.",
};

function officeContact(key: string): string {
  const office = offices.find((item) => item.key === key);
  if (!office) {
    throw new Error(`Missing office ${key}`);
  }
  return `${office.shortLabel}: ${office.addressLine1}, ${office.addressLine2}.`;
}

const data = {
  title: "Privacy Policy",
  eyebrow: "Legal",
  breadcrumbLabel: "Privacy",
  effectiveLine: "Last updated October 21, 2026",
  intro:
    "This page describes what this website does with information about a visit, and what happens when you use the chat or the online scheduler.",
  sections: [
    {
      heading: "1. Overview",
      paragraphs: [
        'HTx Pain Institute ("we," "us," "our") operates this website for our medical practice. The offices are in Houston and Humble, Texas.',
      ],
    },
    {
      heading: "2. Health information",
      paragraphs: [
        "This page is about the website. Health information is described in a separate Notice of Privacy Practices. That notice is posted on the HIPAA Notice page of this website, and either office can provide a copy.",
        "The contact page tells you not to send medical details through the message window, and not to use that window for an emergency. Save medical detail for a call or a visit.",
      ],
    },
    {
      heading: "3. Information the website collects",
      paragraphs: [
        "The Send us a message button on the contact page opens the LeadConnector chat widget described in section 5. It asks for your name, phone number, and message. What you enter goes to LeadConnector and then to the office. Before it sends, the widget asks you to agree to be contacted by SMS or email at the number or address you gave.",
        "Online appointment scheduling runs through Nimblr. The scheduler is embedded on the appointment page (/request-appointment) and on the landing pages under /lp. What you enter there, including your name, contact information, and appointment preferences, goes to Nimblr and to the office so the visit can be booked. A reschedule link on this website opens Nimblr at appointment.nimblr.ai.",
        "The company that hosts this website keeps standard server logs. Those logs can include your IP address, browser type, and the pages you request.",
        "The companies named in section 5 also receive information about the visit, as that section describes.",
      ],
    },
    {
      heading: "4. How that information is used",
      paragraphs: [
        "Messages are used to respond to the inquiry. Scheduler entries are used to book a visit. Visit measurements are used to see which pages are used and which ads led to a call to the practice or to a completed booking.",
        "We do not sell information collected through this website.",
      ],
    },
    {
      heading: "5. Cookies, analytics, and other companies",
      paragraphs: [
        "This website sets cookies and loads content from other companies. Some of these run on every page. Some run only on the pages that need them. The services below are the ones this website loads for measurement, chat, scheduling, maps, reviews, and video thumbnails.",
        "Google Analytics. On every page, this website records visits in Google Analytics property G-27RHPSC41Y. It records which pages are opened and which appointment links and phone links are clicked. It sets cookies named _ga and _ga_27RHPSC41Y. A visit is recorded as the page path, the part of the address after the site name. When the address includes an ad click ID or a campaign label (gclid, gbraid, wbraid, gad_source, gad_campaignid, or a parameter whose name starts with utm_), that label is sent with the visit. Every other query parameter is dropped. The hash is not sent. The referring address is reduced to the site name and the path. These hits do not include your name, your phone number, your email address, text you type into the chat, or text you type into the scheduler.",
        "Google Ads. Google Ads account AW-700388531 is used to tell which ad led to a call to the practice phone number on this website, or to a booking the scheduler reports as saved. This website does not load Google Tag Manager container GTM-PP5NDT4H. It does not load Google tag GT-PJNQD84H. The published destinations for that tag are the second Google Analytics property G-7LR9NYKKQ3, the tag id GT-PJNQD84H, and Google Ads account AW-700388531. Because that tag is not loaded, this website does not send visit data to G-7LR9NYKKQ3, and it does not load the remarketing requests that tag used to start.",
        "When advertising cookies are allowed, a conversion is one request to googleadservices.com for AW-700388531. The request is marked non-personalized (npa=1). The page address on that request keeps an ad click ID or a campaign label and drops every other query parameter. The referring address on that request is the site name only. If advertising cookies are allowed and the address includes an ad click ID, the site stores that ID in a cookie named _gcl_aw for gclid, _gcl_gb for wbraid, or _gcl_ag for gbraid. The cookie _gcl_au is not set. A phone-link click is counted only for the practice phone number. A booking is counted when the scheduler on book.nimblr.co reports that the appointment was saved.",
        "Chat. A LeadConnector chat widget loads on every page from widgets.leadconnectorhq.com, so you can message the office. It stores data in your browser, including an identifier for the conversation and a list of pages you have viewed here, whether or not you open the chat. The widget sends that visit information to msgsndr.com. The address the widget and msgsndr.com receive does not include the raw query string or the hash.",
        "Maps, reviews, the scheduler, and video thumbnails. The contact page, the locations page, and each location page embed a Google Map, which loads when you scroll down to it. The home page and the contact page embed a Birdeye widget that shows reviews. The appointment page and the landing pages embed the Nimblr scheduler from book.nimblr.co, and this website loads Nimblr's helper script from assets.nimblr.ai. The scheduler frame runs its own measurement under Google Tag Manager container GTM-NF63NFX and Google Analytics property G-XWCRHXNRQC. This website does not send the words you type into the scheduler to Google. When the frame reports that a booking was saved, this website records an appointment_confirmed event in G-27RHPSC41Y and, if advertising cookies are allowed, the Google Ads booking conversion described above. If you open the scheduler in a new tab, that tab is on Nimblr's website, and Nimblr can send its own booking event to G-27RHPSC41Y from there. The video library loads thumbnail images from YouTube at i.ytimg.com. A link that plays a video opens youtube.com.",
        "Each of these companies receives your IP address and basic browser information when its content loads. Each company handles that information under its own privacy policy.",
      ],
    },
    {
      heading: "6. Cookie choices and Global Privacy Control",
      paragraphs: [
        "A banner on this website offers Accept and Reject for advertising cookies. The site uses Google Consent Mode v2. Advertising storage, advertising user data, and ad personalization start off. They stay off if you reject advertising cookies. They also stay off if your browser sends a Global Privacy Control signal. While they are off, the Google Ads conversion in section 5 is not sent, and remarketing stays off. The site does not ask you to turn advertising on when Global Privacy Control is present.",
        "If you accept advertising cookies, the Google Ads conversion in section 5 can be sent. That request stays marked non-personalized (npa=1). This website does not load a remarketing tag, so accepting does not start remarketing.",
        "Your choice is saved in this browser. A link in the footer opens the choice again so you can change it.",
        "You can also block or delete cookies in your browser. That clears what the chat widget has stored and clears a saved choice. Google publishes a browser add-on that opts out of Google Analytics. You can still use this site, call the office, and book an appointment if those cookies are blocked.",
        "Google Analytics measurement for G-27RHPSC41Y, described in section 5, is separate from the advertising choice. This website does not act on a Do Not Track signal.",
      ],
    },
    {
      heading: "7. Security",
      paragraphs: [
        "Pages on this website are served over an encrypted connection (HTTPS). No method of sending or storing information is perfectly secure.",
      ],
    },
    {
      heading: "8. Changes to this page",
      paragraphs: [
        "We may update this page from time to time. The version posted here is the current one. The date at the top is the date of the latest change.",
      ],
    },
    {
      heading: "9. Contact",
      paragraphs: [
        `For questions about this page, contact the Privacy Officer at ${practice.phone} or ${practice.email}.`,
        officeContact("houston"),
        officeContact("humble"),
      ],
    },
  ],
};

export default function PrivacyPage() {
  return <LegalPage data={data} />;
}
