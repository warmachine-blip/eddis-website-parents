import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { CheckBullet } from "@/components/icon-badge";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Edward Baumgartner Jr., MD",
  description:
    "Houston native, double board-certified in Anesthesiology and Pain Medicine, founder of HTx Pain Institute. Precision care for patients told their only option is spine surgery.",
};

const facts = [
  { label: "Board Cert.", value: "Anesthesiology" },
  { label: "Board Cert.", value: "Pain Medicine" },
  { label: "Experience", value: "15+ years" },
  { label: "Founded", value: "2018" },
];

const education = [
  "B.S. in Biomedical Science, Texas A&M University — Magna Cum Laude, with University and Foundation Honors.",
  "M.D., University of Texas Health Science Center at Houston — Alpha Omega Alpha Research Fellowship.",
  "General Surgery Residency (2 years), University of Illinois — Mt. Sinai Hospital, Chicago.",
  "Anesthesiology Residency, Rush University Medical Center, Chicago.",
  "Pain Medicine Fellowship, Rush University Medical Center, Chicago.",
];

const toolkit = [
  "Intracept Procedure for vertebrogenic low-back pain.",
  "Spinal cord stimulation (trial and permanent implant).",
  "Radiofrequency ablation — cervical, lumbar, SI, and genicular.",
  "SI joint fusion (LinQ and other systems) and Minuteman lumbar interspinous fusion.",
  "Kyphoplasty for vertebral compression fractures.",
  "MILD procedure for lumbar spinal stenosis.",
  "Epidural steroid injections and selective nerve blocks.",
  "PRP therapy for tendinopathy and select joint pain.",
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

export default function DrBaumgartnerPage() {
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
            Double Board-Certified · Anesthesiology &amp; Pain Medicine
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
            <p className="mt-3 text-pretty text-lg leading-relaxed text-charcoal-soft">
              Edward Baumgartner Jr., MD is a Houston native and double
              board-certified specialist in Anesthesiology and Pain Medicine, with
              over fifteen years of interventional pain medicine experience. He
              founded the practice in 2018 — first as Texas Interventional Pain
              Specialists, then HTx Pain Care, and now HTx Pain Institute — to
              bring the modern minimally invasive toolkit to Houston with the
              time, precision, and judgment every patient deserves.
            </p>

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
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Clinical Focus</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    Dr. Baumgartner has a particular focus on patients who have
                    been told their only remaining option is spine surgery —
                    patients who have been through physical therapy, injections,
                    and conservative care without lasting relief, and are
                    looking for an alternative path.
                  </p>
                  <p>His procedural toolkit spans the full spectrum of modern interventional pain medicine:</p>
                </div>
                <ul className="mt-4 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                  {toolkit.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-charcoal-soft">
                      <CheckBullet tone="brass" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Philosophy of Care</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    Dr. Baumgartner founded the practice after experiencing the
                    realities of group practice — and concluding that
                    patient-first care required building a different kind of
                    practice from the ground up. He believes the best pain
                    medicine combines{" "}
                    <span className="font-semibold text-navy">technical excellence</span> with{" "}
                    <span className="font-semibold text-navy">unhurried clinical judgment</span> — the time to
                    understand the full picture before recommending a plan.
                  </p>
                  <p className="font-serif text-xl italic leading-snug text-brass-text">
                    &ldquo;Precision. Lasting Relief.&rdquo; is more than a
                    tagline — it is the standard he holds himself to with every
                    patient.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Community</h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  Dr. Baumgartner is a committed supporter of{" "}
                  <Link href="/community/imas-home" className="font-semibold text-brass-text hover:text-navy">
                    Ima&rsquo;s Home for Children
                  </Link>
                  , a 501(c)(3) caring for orphaned children in the Philippines.
                  The practice has been the presenting sponsor of the annual
                  Ima&rsquo;s Home 5K for eight consecutive years, and his wife
                  Tatyana serves on the organization&rsquo;s Board of Directors.
                </p>
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
