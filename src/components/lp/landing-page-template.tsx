import Image from "next/image";
import FaqAccordion from "@/components/faq-accordion";
import { IconBadge, InfoCard, CheckBullet } from "@/components/icon-badge";
import JsonLd from "@/components/json-ld";
import NimblrScheduler from "@/components/nimblr-scheduler";
import LpStickyBar from "@/components/lp/lp-sticky-bar";
import { formatReviewDate } from "@/lib/review";
import { reviews } from "@/lib/reviews";
import { practice, offices } from "@/lib/nav";
import { SITE_URL } from "@/lib/site";
import { ORG_ID, FOUNDER_ID, MEDICAL_SPECIALTY } from "@/lib/schema";
import type { LandingPage } from "@/lib/lp-pages";

/**
 * The one template behind all seven /lp ad landing pages.
 *
 * Section order follows the brief: the condition, what causes it, how the
 * source is found, the treatments, why this practice, a short FAQ, then the
 * scheduler. The four ids the top bar anchors to — causes, treatments,
 * dr-baumgartner, schedule — are rendered here; LP_SECTIONS in
 * src/components/lp/lp-top-bar.tsx is the matching list.
 *
 * Nothing on this page links anywhere except the logo (homepage) and the
 * privacy policy in the footer, both in the layout. Treatment cards are plain
 * cards rather than links: the site's own procedure pages carry the full menu,
 * so sending paid traffic into them would undo the point of these pages.
 *
 * Structured data is built here and is deliberately narrower than the site's:
 * no site-wide MedicalOrganization node, because its `knowsAbout` list in
 * src/lib/schema.ts names the disallowed therapy. No aggregateRating either —
 * the rating comes from a third-party widget, which Google's review-snippet
 * policy does not allow a site to mark up itself. See
 * src/components/organization-schema.tsx.
 */

/** Shared across all seven pages — the "why HTx" credentials. */
const CREDENTIALS = [
  { label: "Board Certified", value: "Anesthesiology" },
  { label: "Board Certified", value: "Pain Medicine" },
  { label: "Experience", value: "15+ years" },
  { label: "Recognition", value: "Texas Top Doctor" },
];

const TRAINING = [
  "M.D., University of Texas Health Science Center at Houston.",
  "Anesthesiology residency and Pain Medicine fellowship, Rush University Medical Center, Chicago.",
  "Adjunct faculty, Rush Health System.",
  "Hospital affiliations: Townsen Memorial, Houston Methodist, and St. Luke’s Health.",
];

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase ${
        dark ? "tracking-[0.22em] text-brass-light" : "tracking-[0.18em] text-brass-text"
      }`}
    >
      <span className={`h-px w-8 bg-current ${dark ? "opacity-70" : "opacity-50"}`} />
      {children}
    </span>
  );
}

/** Clears the sticky top bar, which is two rows tall on narrow screens. */
const ANCHOR_OFFSET = "scroll-mt-28 lg:scroll-mt-24";

export default function LandingPageTemplate({ data }: { data: LandingPage }) {
  const url = `${SITE_URL}/lp/${data.slug}`;

  const subject =
    data.schemaType === "condition"
      ? {
          "@type": "MedicalCondition",
          "@id": `${url}#subject`,
          name: data.eyebrow,
          description: data.overviewParagraphs[0],
          relevantSpecialty: MEDICAL_SPECIALTY,
          signOrSymptom: data.symptoms.map((name) => ({
            "@type": "MedicalSignOrSymptom",
            name,
          })),
          cause: data.causes.map((name) => ({ "@type": "MedicalCause", name })),
          possibleTreatment: data.treatments.map((t) => ({
            "@type": "MedicalProcedure",
            name: t.title,
          })),
        }
      : {
          "@type": "MedicalProcedure",
          "@id": `${url}#subject`,
          name: data.eyebrow,
          description: data.overviewParagraphs[0],
          relevantSpecialty: MEDICAL_SPECIALTY,
          provider: { "@id": ORG_ID },
          ...(data.quickFacts ? { howPerformed: data.quickFacts.setting } : {}),
        };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#webpage`,
        url,
        name: data.title,
        description: data.metaDescription,
        about: { "@id": `${url}#subject` },
        reviewedBy: { "@id": FOUNDER_ID },
        lastReviewed: data.lastReviewed,
        primaryImageOfPage: `${SITE_URL}/images/${data.heroImage}`,
        inLanguage: "en-US",
      },
      subject,
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: data.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-10 lg:py-20">
          <div className="lg:col-span-7">
            <Eyebrow dark>{data.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
              {data.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-off-white/90">
              {data.leadLine}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#schedule"
                className="inline-flex min-h-11 items-center rounded-full border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
              >
                Schedule Appointment
              </a>
              <a
                href={practice.phoneHref}
                data-phone={practice.phone}
                className="inline-flex min-h-11 items-center rounded-full border border-off-white/40 px-7 py-3.5 font-sans text-sm font-medium tracking-wide tabular-nums text-off-white hover:border-off-white phone"
              >
                {practice.phone}
              </a>
            </div>
            <p className="mt-6 text-sm text-off-white/70">
              Double board-certified care &middot; {reviews.reviewCountFloor} patient
              reviews at {reviews.rating} &middot; Same-week consultations typically
              available
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-navy sm:aspect-[2/1] lg:aspect-[4/3]">
              <Image
                src={`/images/${data.heroImage}`}
                alt={data.heroImageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                quality={60}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* The condition */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-20">
          <div className="lg:col-span-7">
            <Eyebrow>Overview</Eyebrow>
            <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
              {data.overviewTitle}
            </h2>
            <div className="mt-6 space-y-4">
              {data.overviewParagraphs.map((p) => (
                <p key={p} className="text-pretty text-base leading-relaxed text-charcoal-soft">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <InfoCard icon="pulse" tone="cyan" title={data.symptomsTitle} items={data.symptoms} />
            {data.quickFacts && (
              <div className="mt-6 rounded-2xl border border-line bg-off-white p-7">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                  Quick Facts
                </p>
                <dl className="mt-5 grid gap-4 text-sm">
                  <div>
                    <dt className="text-charcoal-soft">Setting</dt>
                    <dd className="mt-0.5 font-medium text-navy">{data.quickFacts.setting}</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal-soft">Anesthesia</dt>
                    <dd className="mt-0.5 font-medium text-navy">{data.quickFacts.anesthesia}</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal-soft">Recovery</dt>
                    <dd className="mt-0.5 font-medium text-navy">{data.quickFacts.recovery}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Causes + how the source is found */}
      <section id="causes" className={ANCHOR_OFFSET}>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 md:grid-cols-2">
            <InfoCard icon="pulse" tone="brass" title={data.causesTitle} items={data.causes} />
            <InfoCard icon="shield" tone="navy" title="How we narrow it down" items={data.diagnosis} />
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Diagnosis</Eyebrow>
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                {data.diagnosisTitle}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base leading-relaxed text-charcoal-soft">{data.philosophy}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className={`bg-pearl ${ANCHOR_OFFSET}`}>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Eyebrow>Treatments at HTx Pain</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
            {data.treatmentsTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-soft">
            {data.treatmentsLead}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.treatments.map((treatment) => (
              <div
                key={treatment.title}
                className="flex h-full flex-col rounded-2xl border border-line bg-off-white p-7"
              >
                <IconBadge icon="bolt" tone="brass" />
                <h3 className="mt-6 font-serif text-lg leading-tight text-navy">
                  {treatment.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-soft">
                  {treatment.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional spotlight — the DRG section on the stimulation page. */}
      {data.spotlight && (
        <section>
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
            <div className="grid gap-10 rounded-2xl border border-line bg-navy-50 p-7 sm:p-10 lg:grid-cols-12 lg:p-14">
              <div className="lg:col-span-5">
                <Eyebrow>{data.spotlight.eyebrow}</Eyebrow>
                <h2 className="mt-5 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
                  {data.spotlight.title}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-4">
                  {data.spotlight.paragraphs.map((p) => (
                    <p key={p} className="text-base leading-relaxed text-charcoal-soft">
                      {p}
                    </p>
                  ))}
                </div>
                {data.spotlight.points && (
                  /*
                    A <dl> may contain only dt, dd, div, script and template as
                    direct children, and a wrapping <div> may contain only the
                    dt/dd pair. The bullet therefore sits inside the <dt> rather
                    than beside it; the <dd> is indented to match by padding.
                  */
                  <dl className="mt-8 grid gap-5">
                    {data.spotlight.points.map((point) => (
                      <div key={point.label}>
                        <dt className="flex items-start gap-3 font-sans text-sm font-semibold text-navy">
                          <CheckBullet tone="brass" />
                          {point.label}
                        </dt>
                        <dd className="mt-1 pl-7 text-sm leading-relaxed text-charcoal-soft">
                          {point.body}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recovery & outlook, and risks where the page is about a procedure. */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Recovery &amp; outlook</Eyebrow>
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                What to expect over time.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base leading-relaxed text-charcoal-soft">{data.outlook}</p>
            </div>
          </div>
          {data.risks && data.risksIntro && (
            <div className="mt-12 rounded-2xl border border-line bg-pearl p-7 sm:p-10">
              <h3 className="font-serif text-xl leading-tight text-navy">Risks, plainly.</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-soft">
                {data.risksIntro}
              </p>
              <ul className="mt-6 grid gap-2.5 text-sm text-charcoal-soft sm:grid-cols-2">
                {data.risks.map((risk) => (
                  <li key={risk} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckBullet tone="navy" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Why HTx — credentials and the review stat. */}
      <section id="dr-baumgartner" className={ANCHOR_OFFSET}>
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="grid gap-10 rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-7 text-off-white sm:p-10 lg:grid-cols-12 lg:p-14">
            <div className="lg:col-span-6">
              <Eyebrow dark>Why HTx Pain Institute</Eyebrow>
              <h2 className="mt-5 text-balance font-serif text-2xl leading-tight sm:text-3xl">
                Edward Baumgartner Jr., MD
              </h2>
              <p className="mt-5 text-base leading-relaxed text-off-white/90">
                A Houston native, double board-certified in Anesthesiology and Pain
                Medicine, and the founder of this practice in 2018. He performs every
                procedure here himself, under live image guidance.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                {CREDENTIALS.map((fact) => (
                  <div key={`${fact.label}-${fact.value}`}>
                    <dt className="font-sans text-[11px] uppercase tracking-[0.14em] text-off-white/55">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 font-serif text-lg leading-tight text-brass-light">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-off-white/15 bg-off-white/5 p-6 sm:p-7">
                <p className="font-serif text-4xl leading-none text-brass-light">
                  {reviews.rating}
                </p>
                <p className="mt-2 text-sm text-off-white/80">
                  across {reviews.reviewCountFloor} patient reviews
                </p>
                <p className="mt-4 text-sm leading-relaxed text-off-white/70">
                  Two Houston-area offices —{" "}
                  {offices.map((o) => o.shortLabel).join(" and ")}. Most major
                  insurance accepted, and our team verifies your benefits before you
                  are scheduled.
                </p>
              </div>
              <ul className="mt-6 grid gap-2.5 text-sm text-off-white/80">
                {TRAINING.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckBullet tone="brassSolid" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Common Questions</Eyebrow>
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                Direct answers &mdash; no jargon.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                If your question isn&rsquo;t here, ask us at your consultation.
              </p>
            </div>
            <div className="lg:col-span-7">
              <FaqAccordion faqs={data.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Scheduler — the same embed and booking listener as /request-appointment. */}
      <section id="schedule" className={ANCHOR_OFFSET}>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Schedule</Eyebrow>
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                Pick a time that works.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                Same-week consultations are typically available. Book below, or call
                and our front desk will schedule you on the spot.
              </p>
              <a
                href={practice.phoneHref}
                data-phone={practice.phone}
                className="mt-7 inline-flex min-h-11 items-center rounded-full border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide tabular-nums text-navy-deep hover:bg-brass-light phone"
              >
                {practice.phone}
              </a>
              <p className="mt-6 text-sm leading-relaxed text-charcoal-soft">
                Booking runs through Nimblr, our online appointment scheduler. What you
                enter there goes to Nimblr and to our office to book your visit, so
                please save medical details for your call or visit.
              </p>
            </div>
            <div className="lg:col-span-7">
              <NimblrScheduler />
            </div>
          </div>
        </div>
      </section>

      {/* Medically reviewed */}
      <section className="border-t border-line bg-pearl">
        <div className="mx-auto max-w-3xl px-6 py-10 text-center lg:px-10">
          <p className="font-sans text-xs uppercase tracking-wide text-muted">
            Medically Reviewed
          </p>
          <p className="mt-1 text-sm leading-relaxed text-charcoal-soft">
            Reviewed by Edward Baumgartner Jr., MD &middot; Last reviewed{" "}
            <time dateTime={data.lastReviewed}>{formatReviewDate(data.lastReviewed)}</time>.
            Information on this page is not medical advice. Always consult your
            physician. Individual results vary.
          </p>
        </div>
      </section>

      <LpStickyBar />
    </div>
  );
}
