import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import SectionHeading from "@/components/section-heading";
import { CheckBullet } from "@/components/icon-badge";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Second Opinions Before Spine or Joint Surgery in Houston",
  description:
    "Told you need an operation? A second opinion from a physician who performs neither joint replacement nor open spine surgery — and is free to tell you that you do not need one. Houston and Humble.",
};

/**
 * The conversion page for the surgery-alternative positioning: someone lands
 * here because a surgeon has recommended an operation and they want a read from
 * a physician with no stake in that answer.
 *
 * Nothing about the process is invented here. The records review, the written
 * impression and the referral come from this page as it already stood; the
 * unhurried history, exam and imaging review from /patients; and the exam
 * detail and diagnostic blocks from the diagnosisWorkup entries in
 * src/lib/condition-details.ts. Keep it that way — if a claim about the visit
 * is not stated elsewhere on the site, it does not belong on this page.
 */

const visit = [
  {
    number: "1",
    title: "Your records are read before you arrive",
    body: "Prior imaging, procedures, and notes — including operative reports where there has already been surgery. The appointment starts from what is already known about you, not from a blank page.",
  },
  {
    number: "2",
    title: "An unhurried history and a focused exam",
    body: "Where the pain sits, what provokes it, what relieves it, and what your prior treatments actually did. Then an exam aimed at the structures that pattern implicates.",
  },
  {
    number: "3",
    title: "Your imaging is read again",
    body: "Imaging shows what a structure looks like, not whether it hurts. New imaging is ordered only when the pattern calls for something the existing films cannot answer.",
  },
  {
    number: "4",
    title: "A diagnostic block, where one applies",
    body: "Where the pattern points at a specific structure, a block confirms it before anything is recommended — two separate medial branch blocks before radiofrequency ablation, a genicular block before knee ablation.",
  },
  {
    number: "5",
    title: "A written impression you can act on",
    body: "A clear recommendation in writing — including a referral if the operation turns out to be the right answer.",
  },
];

const examined = [
  "Where the pain sits, what provokes it, and whether it radiates.",
  "Range of motion, provocative facet and sacroiliac maneuvers, and a neurologic screen.",
  "Joint line, ligament stability, patellofemoral tracking, and gait, where a joint is the question.",
  "Your existing imaging, read against the exam rather than in isolation.",
  "Operative reports and the mapping of pain to surgical anatomy, where you have already had surgery.",
  "Diagnostic blocks to confirm which structure is generating the pain before any treatment is recommended.",
];

const considerations = [
  "A surgeon has recommended an operation and you want another read before you agree.",
  "You have had the operation and the pain is still there.",
  "You've been on long-term opioids and want a real path off them.",
  "You're getting injections that haven't worked — or have stopped working.",
  "You have a diagnosis but doubt it's complete.",
  "You're considering an implanted device, such as a spinal cord stimulator.",
];

export default function SecondOpinionPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Second Opinion" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Second Opinion
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Before you agree to the operation, get a read from someone who
            doesn&rsquo;t perform it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Most back and joint pain never needs surgery. Edward Baumgartner
            Jr., MD is double board-certified in Anesthesiology and Pain
            Medicine, and he performs neither joint replacement nor open spine
            surgery — so a recommendation against operating costs him nothing.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/request-appointment"
              className="rounded-full border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Request Second Opinion
            </Link>
            <a
              href={practice.phoneHref}
              className="rounded-full border border-off-white/30 px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Why this answer is different */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Why This Answer Is Different"
            title="A second opinion is worth what the incentive behind it is worth."
          />
          <div className="mt-6 grid max-w-5xl gap-x-14 gap-y-4 text-base leading-relaxed text-charcoal-soft lg:grid-cols-2">
            <div className="space-y-4">
              <p>
                A second opinion is not adversarial. It is diligent — and it is
                most useful when it comes from someone whose recommendation is
                not shaped by what they would be the one to perform.
              </p>
              <p>
                Open decompression, multi-level fusion, and joint replacement
                are not Dr. Baumgartner&rsquo;s to offer, and never have been.
                When he tells you an operation will not help, he is not turning
                down work of his own.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                What he can do is establish what is actually generating the
                pain. Anesthesiology gave him command of the anatomy and the
                image-guided technique; Pain Medicine gave him the diagnostic
                discipline that says which structure to treat.
              </p>
              <p>
                Most patients who arrive having been told surgery is the only
                option have never had the source of their pain identified
                precisely. That is the first thing this visit is for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What happens at the visit */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="What Happens"
              title="The visit, step by step."
              lead="No part of this is unusual. It is what a diagnosis is supposed to involve, given the time it takes."
            />
            <ol className="mt-10 flex flex-col gap-6">
              {visit.map((step) => (
                <li key={step.number} className="flex items-start gap-4">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-navy-deep font-sans text-sm font-semibold text-off-white">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg leading-tight text-navy">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-pearl p-8 lg:sticky lg:top-32">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
                What Gets Examined
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {examined.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-soft">
                    <CheckBullet tone="cyan" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-charcoal-soft">
                What is examined depends on the problem. The detail for a given
                diagnosis is on its own page in the{" "}
                <Link href="/pain-center" className="font-semibold text-brass-text hover:text-navy">
                  pain center
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The honest no */}
      <section className="bg-navy-deep text-off-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            tone="dark"
            eyebrow="The Answer You Might Get"
            title="“No, you don’t need this” is an answer he is free to give."
          />
          <div className="mt-6 grid max-w-5xl gap-x-14 gap-y-4 text-base leading-relaxed text-off-white/80 lg:grid-cols-2">
            <div className="space-y-4">
              <p>
                Most back and joint pain has a source that can be found and
                treated directly. Where that is true, the work is to identify
                the structure, confirm it, and treat it — and an operation does
                not enter the conversation.
              </p>
              <p>
                Sometimes it runs the other way. If the exam, the imaging and
                the blocks point at surgery, he will say so and refer you. He
                has no more stake in that answer than in the other one.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                And where the source is found and it is treatable here, the
                options are the ones a pain practice can actually offer:
                radiofrequency ablation, Intracept, spinal cord stimulation,
                genicular blocks, image-guided joint injections, PRP.
              </p>
              <p>
                <Link
                  href="/services"
                  className="font-semibold text-brass-light underline decoration-brass decoration-2 underline-offset-4 hover:text-off-white"
                >
                  See everything the practice offers
                </Link>
                , or read more about{" "}
                <Link
                  href="/dr-edward-baumgartner"
                  className="font-semibold text-brass-light underline decoration-brass decoration-2 underline-offset-4 hover:text-off-white"
                >
                  Dr. Baumgartner
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When it is worth coming */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Worth A Second Opinion"
            title="When it is worth the appointment."
            lead="Pain medicine has changed. The plan you were given five — or even two — years ago may no longer be the best one for you."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {considerations.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-line bg-white p-5 text-sm leading-relaxed text-charcoal-soft shadow-sm"
              >
                <CheckBullet tone="cyan" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA — this page keeps its own band; the headline is its own. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-24">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Ready When You Are
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl">
            Find out whether you actually need the operation.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-off-white/70">
            Two Houston-area locations. Same-week consults available. Most insurance
            accepted.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/request-appointment"
              className="rounded-full border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Request Second Opinion
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
