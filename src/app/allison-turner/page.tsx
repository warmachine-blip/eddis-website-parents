import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { CheckBullet } from "@/components/icon-badge";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Allison Turner, DNP, APRN, FNP-C",
  description:
    "Allison Turner is a Doctor of Nursing Practice and Family Nurse Practitioner specializing in compassionate, individualized pain management at HTx Pain Institute.",
};

const facts = [
  { label: "Doctorate", value: "DNP" },
  { label: "Cert.", value: "FNP-C" },
  { label: "License", value: "APRN-TX" },
  { label: "Approach", value: "Patient-first" },
];

const credentials = [
  "Doctor of Nursing Practice (DNP) — terminal nursing degree focused on advanced clinical practice and translation of evidence into care.",
  "Family Nurse Practitioner Certification (FNP-C) through the American Academy of Nurse Practitioners (AANP).",
  "Advanced Practice Registered Nurse (APRN) licensure in the State of Texas.",
  "Continuing education in interventional pain medicine, chronic pain syndromes, and addiction medicine.",
  "Active member of professional nurse practitioner and pain medicine organizations.",
];

const responsibilities = [
  "New-patient consultations — taking a thorough history, reviewing imaging, and laying out a plan in plain English.",
  "Post-procedural follow-up — checking in after RFA, SCS trials, Intracept, kyphoplasty, and other procedures to make sure recovery is on track.",
  "Medication management — thoughtful, conservative prescribing of adjunctive medications, with an emphasis on minimizing reliance on long-term opioids.",
  "Care coordination — communicating with primary care, specialists, physical therapists, and case managers so nothing falls through the cracks.",
  "Procedural support — assisting Dr. Baumgartner during procedures and ensuring each patient is comfortable, informed, and prepared.",
];

const expectations = [
  "A real visit — time to talk through your symptoms, your history, and what you have already tried.",
  "Imaging review — a walk-through of your MRI, X-ray, or CT findings so you understand what they mean for your treatment options.",
  "An honest plan — a clear, written care plan with realistic expectations and next steps, not a sales pitch.",
  "Follow-through — direct phone access for questions between visits and proactive follow-up after procedures.",
  "Coordination — she talks to your other doctors when it matters, so you do not have to be the messenger.",
];

function LabeledItem({ text }: { text: string }) {
  const idx = text.indexOf(" — ");
  if (idx === -1) {
    return <>{text}</>;
  }
  return (
    <>
      <span className="font-semibold text-navy">{text.slice(0, idx)}</span>
      {text.slice(idx)}
    </>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AllisonTurnerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about-us" },
              { label: "Allison Turner, DNP, APRN, FNP-C" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Doctor of Nursing Practice
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Allison Turner, DNP, APRN, FNP-C
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Family Nurse Practitioner · Pain Management
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-line">
                <Image
                  src="/images/allison-turner.webp"
                  alt="Allison Turner, DNP, APRN, FNP-C — HTx Pain Institute"
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
                    className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-b-0 last:pb-0"
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
              Louisiana Native · DNP · Family Nurse Practitioner · APRN-Texas
            </p>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-charcoal-soft">
              Allison Turner brings a clinician&rsquo;s calm and a teacher&rsquo;s
              clarity to every visit. As a Doctor of Nursing Practice with a
              Family Nurse Practitioner certification, she combines high-level
              training with the kind of bedside attention pain patients deserve —
              and rarely get. She is the connective tissue of HTx Pain Institute:
              the clinician most patients see at follow-up, the one who knows
              their history, and the one who keeps their plan moving forward
              between procedures.
            </p>

            <div className="mt-12 space-y-12">
              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Education &amp; Credentials</h2>
                <ul className="mt-5 grid gap-3">
                  {credentials.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-off-white p-4">
                      <CheckBullet tone="cyan" />
                      <span className="text-sm leading-relaxed text-charcoal-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Role at HTx Pain Institute</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  Allison&rsquo;s role at HTx Pain Institute is one of the
                  reasons our patients describe their care as continuous and
                  personal. She is not a check-the-box visit; she is the
                  clinician who carries your case forward between procedures.
                </p>
                <ul className="mt-5 space-y-3">
                  {responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-charcoal-soft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass-deep" />
                      <span>
                        <LabeledItem text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Clinical Approach</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    Allison&rsquo;s clinical philosophy is built on three
                    principles: listen first, take the time to understand the
                    whole picture, and explain everything in plain language.
                    She believes the best chronic-pain care is built on small,
                    accountable steps — and a clinician who knows your history
                    well enough to notice when something has changed.
                  </p>
                  <p>
                    Patients consistently describe her as patient, thorough,
                    and refreshingly direct. She does not over-promise, and she
                    will tell you when an option is not a good fit — or when
                    she thinks you should ask a second-opinion question. Her
                    goal is not to keep you coming back; it is to help you get
                    back to your life.
                  </p>
                  <p>
                    She works closely with Dr. Baumgartner on each
                    patient&rsquo;s plan. The two of them communicate
                    constantly about who needs what, when, and why — which is
                    part of why the practice runs the way it does.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">What Patients Can Expect</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">When you see Allison, expect:</p>
                <ul className="mt-5 space-y-3">
                  {expectations.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-charcoal-soft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass-deep" />
                      <span>
                        <LabeledItem text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Why Pain Management</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    Allison chose pain medicine for the same reason most
                    clinicians in this field do: pain is one of the most
                    under-treated and most misunderstood corners of
                    healthcare. Patients with chronic pain are routinely
                    dismissed, rushed, or told to &ldquo;live with it.&rdquo;
                    She wanted to be on the other end of that conversation.
                  </p>
                  <p>
                    Her clinical interests overlap closely with Dr.
                    Baumgartner&rsquo;s — interventional spine and joint pain,
                    neuropathic pain, post-surgical pain, and the patients who
                    have been told their only option is more surgery. She is
                    also deeply committed to the safe, conservative use of
                    medications, and partners with patients on tapering and
                    minimization plans whenever possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-24">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Ready When You Are
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl">
            Get the care you deserve. Schedule your consultation today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-off-white/70">
            Two Houston-area locations. Same-week consults available. Most
            insurance accepted.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/request-appointment"
              className="rounded-full border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Request Appointment
            </Link>
            <a
              href={practice.phoneHref}
              className="rounded-full border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
