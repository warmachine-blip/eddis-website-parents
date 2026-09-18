import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import { linkedInUrl, txTopDocsUrl } from "@/lib/social";
import { ORG_ID, FOUNDER_ID, KNOWS_ABOUT } from "@/lib/schema";
import { CheckBullet } from "@/components/icon-badge";
import { practice } from "@/lib/nav";
import FinalCta from "@/components/final-cta";

export const metadata: Metadata = {
  title: "Edward Baumgartner Jr., MD",
  description:
    "Edward Baumgartner Jr., MD — the physician you see before the surgeon. Double board-certified in Anesthesiology and Pain Medicine, founder of HTx Pain Institute in Houston and Humble.",
};

const facts = [
  { label: "Board Cert.", value: "Anesthesiology" },
  { label: "Board Cert.", value: "Pain Medicine" },
  { label: "Experience", value: "15+ years" },
  { label: "Hospital", value: "Townsen Memorial" },
  { label: "Recognition", value: "Texas Top Doctor" },
  { label: "Founded", value: "2018" },
  { label: "Languages", value: "English" },
];

const education = [
  "B.S. in Biomedical Science, Texas A&M University — Magna Cum Laude, with University and Foundation Honors.",
  "M.D., University of Texas Health Science Center at Houston — awarded the Alpha Omega Alpha Research Fellowship, a research scholarship.",
  "General Surgery Internship (2 years), University of Illinois at Chicago / Mount Sinai Hospital Medical Center.",
  "Anesthesiology Residency, Rush University Medical Center, Chicago.",
  "Pain Medicine Fellowship, Rush University Medical Center, Chicago.",
  "Adjunct Faculty, Rush Health System.",
];

const toolkit = [
  {
    label: "Spine",
    items: [
      "Intracept Procedure for vertebrogenic low-back pain.",
      "Radiofrequency ablation — cervical, lumbar, and sacroiliac.",
      "SI joint fusion (LinQ and other systems) and Minuteman lumbar interspinous fusion.",
      "Kyphoplasty for vertebral compression fractures.",
      "MILD procedure for lumbar spinal stenosis.",
      "Epidural steroid injections and selective nerve blocks.",
    ],
  },
  {
    label: "Joints, Tendons & Nerves",
    items: [
      "Genicular nerve blocks and radiofrequency ablation for knee pain.",
      "Ultrasound-guided joint injections — knee, hip, and shoulder.",
      "PRP therapy for tendinopathy and select joint pain.",
      "Peripheral nerve blocks, including suprascapular for the shoulder.",
      "Spinal cord stimulation for neuropathic and post-surgical pain.",
    ],
  },
];

const servicesProvided = [
  { label: "Intracept Procedure", href: "/intracept-procedure" },
  { label: "Spinal Cord Stimulation", href: "/spinal-cord-stimulation-specialist" },
  { label: "Radiofrequency Ablation", href: "/radiofrequency-ablation" },
  { label: "Minuteman Lumbar Fusion", href: "/minuteman-procedure" },
  { label: "SI Joint Fusion (LinQ)", href: "/si-joint-fusions" },
  { label: "Kyphoplasty", href: "/kyphoplasty-specialist" },
  { label: "MILD Procedure", href: "/mild-procedure" },
  { label: "Epidural Steroid Injections", href: "/injections-blocks-specialist" },
  { label: "PRP Therapy", href: "/prp-procedure" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The founder as a real person, referenced by `founder` on the organization
 * node. Only credentials this page actually states are claimed here.
 */
const physicianLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: "Edward Baumgartner Jr., MD",
  givenName: "Edward",
  familyName: "Baumgartner",
  honorificSuffix: "MD",
  jobTitle: "Founding Physician",
  url: `${SITE_URL}/dr-edward-baumgartner`,
  image: `${SITE_URL}/images/dr-baumgartner.webp`,
  worksFor: { "@id": ORG_ID },
  knowsAbout: KNOWS_ABOUT,
  award: "Texas Top Doctor",
  affiliation: [
    { "@type": "Organization", name: "Rush Health System" },
    { "@type": "Hospital", name: "Townsen Memorial Hospital" },
  ],
  knowsLanguage: "English",
  sameAs: [linkedInUrl, txTopDocsUrl],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Board Certification",
      name: "Board Certified in Anesthesiology",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Board Certification",
      name: "Board Certified in Pain Medicine",
    },
  ],
};

export default function DrBaumgartnerPage() {
  return (
    <div>
      <JsonLd data={physicianLd} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about-us" },
              { label: "Edward Baumgartner Jr., MD" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Founding Physician · Pain Specialist
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Edward Baumgartner Jr., MD
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            The physician you see before the surgeon. Double board-certified
            in Anesthesiology and Pain Medicine.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="relative aspect-[4/3] max-h-[60svh] w-full overflow-hidden rounded-2xl bg-line sm:aspect-[3/2] lg:aspect-[3/4] lg:max-h-none">
                <Image
                  src="/images/dr-baumgartner.webp"
                  alt="Edward Baumgartner Jr., MD — Founder of HTx Pain Institute"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-off-white p-6 shadow-sm">
                {facts.map((f, i) => (
                  <div
                    key={`${f.label}-${i}`}
                    className="flex items-baseline justify-between border-b border-line pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{f.label}</span>
                    <span className="text-right font-serif text-[15px] text-navy">{f.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-6 text-off-white shadow-md">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-light">Schedule a Visit</p>
                <p className="mt-2 font-serif text-xl leading-tight text-off-white">
                  Ready to talk through your pain?
                </p>
                <Link
                  href="/request-appointment"
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-navy-deep hover:bg-brass-light"
                >
                  Request Appointment
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
              Houston Native · Texas A&amp;M · UT Health Houston · Rush University
            </p>
            <div className="mt-3 space-y-4 text-pretty text-lg leading-relaxed text-charcoal-soft">
              <p>
                Most back and joint pain never needs an operation. Edward
                Baumgartner Jr., MD is the physician you see before the surgeon
                — a Houston native, double board-certified in Anesthesiology and
                Pain Medicine, with over fifteen years of interventional pain
                medicine experience. He operates, but he is not an orthopedic
                surgeon or a neurosurgeon. Telling you that you do not need a
                joint replacement or an open fusion costs him nothing.
              </p>
              <p>
                He spent the five years between fellowship and founding his own
                practice as Medical Director at US Pain &amp; Spine Hospital. He
                founded the practice in 2018 — first as Texas Interventional
                Pain Specialists, then HTx Pain Care, and now HTx Pain Institute
                — and performs hospital-based procedures at Townsen Memorial
                Hospital.
              </p>
            </div>

            <div className="mt-12 space-y-12">
              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Education &amp; Training</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  Dr. Baumgartner&rsquo;s training represents a deliberate
                  progression through some of the most respected institutions in
                  American medicine — building both academic depth and
                  procedural breadth.
                </p>
                <ul className="mt-5 grid gap-3">
                  {education.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-off-white p-4">
                      <CheckBullet tone="cyan" />
                      <span className="text-sm leading-relaxed text-charcoal-soft">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-charcoal-soft">
                  Dr. Baumgartner is listed as a{" "}
                  <a
                    href={txTopDocsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brass-text underline decoration-brass decoration-2 underline-offset-4 hover:text-navy"
                  >
                    Texas Top Doctor
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Clinical Focus</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    Dr. Baumgartner&rsquo;s practice is built around patients
                    who have been told an operation is their only remaining
                    option — a spinal fusion, a knee replacement, a shoulder
                    repair — after physical therapy, injections, and
                    conservative care have not held. Most of them have never had
                    the source of their pain identified precisely.
                  </p>
                  <p>
                    That is the work, and the method does not change with the
                    joint: find which structure is generating the pain, confirm
                    it with a diagnostic block, and treat that structure
                    directly. A lumbar facet and an arthritic knee are different
                    problems answered the same way.
                  </p>
                  <p>Spine is a large part of the practice. It is not the whole of it:</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                  {toolkit.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
                        {group.label}
                      </p>
                      <ul className="mt-3 grid gap-3">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed text-charcoal-soft">
                            <CheckBullet tone="brass" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-charcoal-soft">
                  Looking for a particular problem? See{" "}
                  <Link href="/pain-center" className="font-semibold text-brass-text hover:text-navy">
                    every condition we treat
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Philosophy of Care</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    Dr. Baumgartner concluded that patient-first care required
                    a different kind of practice, built from the ground up, and
                    founded this one. He believes the best pain medicine
                    combines{" "}
                    <span className="font-semibold text-navy">technical excellence</span> with{" "}
                    <span className="font-semibold text-navy">unhurried clinical judgment</span> — the time to
                    understand the full picture before recommending a plan.
                  </p>
                  <p>
                    The two certifications do different work: Anesthesiology
                    gives him the anatomy and the image-guided technique, Pain
                    Medicine the diagnostic discipline that says which structure
                    to treat. Together they are why he can treat pain properly
                    without defaulting to surgery. An honest
                    &ldquo;no&rdquo; is part of the job, and he is free to give
                    it — the operation was never his to perform.
                  </p>
                  <p>
                    That line is worth drawing precisely, because it is not a
                    limitation. He operates, at Townsen Memorial Hospital: SI
                    joint fusion, Minuteman interspinous fusion, kyphoplasty,
                    and spinal cord stimulator implants are all his own work.
                    What he is not is an orthopedic surgeon or a neurosurgeon.
                    Open decompression, multi-level instrumented fusion and
                    joint replacement belong to those specialties — they are not
                    his to offer, and never have been.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Community</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    Dr. Baumgartner is a committed supporter of{" "}
                    <Link href="/community/imas-home" className="font-semibold text-brass-text hover:text-navy">
                      Ima&rsquo;s Home for Children
                    </Link>
                    , a 501(c)(3) caring for orphaned children in the
                    Philippines. The practice has supported Ima&rsquo;s Home for
                    twelve years and has been the presenting sponsor of its
                    annual 5K for the last five, and his wife Tatyana serves on
                    the organization&rsquo;s Board of Directors.
                  </p>
                  <p>
                    The practice also supports the{" "}
                    <Link href="/community/kel-strong-foundation" className="font-semibold text-brass-text hover:text-navy">
                      ‘Kel Strong’ Mabatah Foundation
                    </Link>{" "}
                    financially — a 501(c)(3) funding rehabilitation for
                    traumatic brain injury survivors — and attended its annual
                    fundraising gala.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Outside the Clinic</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  A Houston native through and through, Dr. Baumgartner trained
                  in Chicago and returned home to serve his community. Outside
                  of the clinic, he enjoys long-distance running and spending
                  time with his family.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-line bg-off-white p-7">
              <h3 className="font-serif text-xl text-navy">Services Dr. Baumgartner provides</h3>
              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {servicesProvided.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="group flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium text-navy transition-colors hover:bg-line/50"
                    >
                      {s.label}
                      <span className="text-brass-text">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCta />
    </div>
  );
}
