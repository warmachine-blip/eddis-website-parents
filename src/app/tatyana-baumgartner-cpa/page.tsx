import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Tatyana Baumgartner, COO — HTx Pain Institute · HTx Pain Institute",
  description:
    "Tatyana Baumgartner, CPA, leads operations and community engagement at HTx Pain Institute and serves on the Board of Directors of Ima's Home for Children.",
};

const facts = [
  { label: "Title", value: "COO" },
  { label: "Designation", value: "CPA" },
  { label: "Board Seat", value: "Ima's Home" },
  { label: "Languages", value: "EN · RU" },
];

const responsibilities = [
  "Revenue cycle and billing — transparent, accurate, and patient-friendly.",
  "Technology and EHR optimization across both clinic locations.",
  "Patient flow and scheduling — keeping the experience calm and on time.",
  "Regulatory and compliance — HIPAA, OIG, and state requirements.",
  "Staff development — hiring, training, and team culture.",
  "Strategic growth across both locations and beyond.",
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
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TatyanaBaumgartnerPage() {
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
              { label: "Tatyana Baumgartner, CPA" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Chief Operating Officer &middot; Board Member
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Tatyana Baumgartner, CPA
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Chief Operating Officer · HTx Pain Institute
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
                  src="/images/tatyana-baumgartner.webp"
                  alt="Tatyana Baumgartner, CPA — Practice Administrator, HTx Pain Institute"
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
              Moscow, Russia &rarr; Houston, Texas · Board of Directors, Ima&rsquo;s Home for Children
            </p>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-charcoal-soft">
              Tatyana Baumgartner leads operations, patient experience, team
              development, and community engagement at HTx Pain Institute. She
              partners with Dr. Baumgartner to build a practice with
              institute-caliber discipline and family-led warmth. She also serves
              on the Board of Directors of Ima&rsquo;s Home for Children, the
              501(c)(3) the practice has been the presenting sponsor of for eight
              consecutive years.
            </p>

            <div className="mt-12 space-y-12">
              <div>
                <h3 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Role at HTx Pain Institute</h3>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  As Chief Operating Officer, Tatyana owns the systems that make
                  excellent clinical care possible. Her remit covers every part
                  of the practice patients don&rsquo;t see — and every part they
                  feel.
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
                <h3 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Background</h3>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  From the vibrant streets of Moscow to the complex financial
                  world of the United States, Tatyana brings broad experience
                  and a sharp commitment to operational excellence in
                  healthcare. Her CPA training and finance background give the
                  practice structural depth that is uncommon in independent
                  medical practices.
                </p>
                <p className="mt-4 text-base leading-relaxed text-charcoal-soft">
                  Her standards for hospitality are part of why HTx Pain
                  Institute feels different from the moment you walk in.
                  Patients rarely see her work directly — and that, by design,
                  is the point.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">
                  Board Service · Ima&rsquo;s Home for Children
                </h3>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-soft">
                  <p>
                    Tatyana serves on the Board of Directors of Ima&rsquo;s Home
                    for Children, a 501(c)(3) caring for 155 orphaned children
                    in the Philippines. Her board service is rooted in personal
                    relationship — the Baumgartner family has known the
                    founders through church and family connection for years.
                  </p>
                  <p>
                    Under her operational leadership, HTx Pain Institute has
                    been the presenting sponsor of the annual Ima&rsquo;s Home
                    5K at Walter Hall Park in League City for eight consecutive
                    years.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">In Her Own Words</h3>
                <p className="mt-5 font-serif text-xl italic leading-snug text-brass-text">
                  &ldquo;We treat every patient like they&rsquo;re part of our
                  family, and we run this practice the way we run our home
                  — with care, precision, and a long-term view of what
                  matters.&rdquo;
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl leading-tight text-navy sm:text-3xl">Outside the Clinic</h3>
                <p className="mt-5 text-base leading-relaxed text-charcoal-soft">
                  Outside of the practice, Tatyana enjoys travel, design, and
                  spending time with her family — especially her children, and
                  the children of Ima&rsquo;s Home she has come to know over
                  the years.
                </p>
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
