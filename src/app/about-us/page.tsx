import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import SectionHeading from "@/components/section-heading";
import { IconBadge } from "@/components/icon-badge";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "About HTx Pain Institute — Houston's Precision Pain Practice · HTx Pain Institute",
  description:
    "Founded by Dr. Edward Baumgartner in 2018, HTx Pain Institute brings institute-caliber clinical scope and family-led warmth to Houston pain medicine.",
};

const pillars = [
  {
    title: "Patient-First",
    body: "Time, listening, and individualized plans.",
    icon: "pulse",
  },
  {
    title: "Evidence-Based",
    body: "Procedures supported by published outcomes.",
    icon: "shield",
  },
  {
    title: "Precision Toolkit",
    body: "From Intracept to MILD to spinal cord stimulation.",
    icon: "bolt",
  },
] as const;

const team = [
  {
    name: "Dr. Edward Baumgartner Jr., MD",
    role: "Founding Physician · Double Board-Certified",
    bio: "Founding Physician, Double Board-Certified, Anesthesiology and Pain Medicine. A Houston native with over fifteen years of interventional pain medicine experience. Specializes in advanced minimally invasive procedures including Intracept, spinal cord stimulation, radiofrequency ablation, and SI joint fusion — with particular focus on patients told their only option is spine surgery.",
    image: "dr-baumgartner.webp",
    alt: "Dr. Edward Baumgartner Jr., M.D. — Founder of HTx Pain Institute",
    href: "/dr-edward-baumgartner",
  },
  {
    name: "Tatyana Baumgartner, CPA",
    role: "Chief Operating Officer · Board Member",
    bio: "Chief Operating Officer, Board of Directors — Ima's Home for Children. Leads the operations and community engagement of HTx Pain Institute. Partners with Dr. Baumgartner to build a practice with institute-caliber discipline and family-led warmth. Eight consecutive years as presenting sponsor of the Ima's Home 5K.",
    image: "tatyana-baumgartner.webp",
    alt: "Tatyana Baumgartner, CPA — Practice Administrator, HTx Pain Institute",
    href: "/tatyana-baumgartner-cpa",
  },
  {
    name: "Allison Turner, DNP, APRN, FNP-C",
    role: "Doctor of Nursing Practice",
    bio: "A Louisiana native and Doctor of Nursing Practice with a deep passion for helping patients manage pain effectively. The connective tissue of HTx Pain Institute — coordinating consultations, post-procedural follow-ups, and ongoing care plans alongside Dr. Baumgartner.",
    image: "allison-turner.webp",
    alt: "Allison Turner, DNP, APRN, FNP-C — HTx Pain Institute",
    href: "/allison-turner",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutUsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            About HTx Pain Institute
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Compassionate care, <em className="not-italic text-brass-light">precision medicine.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            {practice.tagline} At HTx Pain Institute, every patient deserves a
            personalized and compassionate approach to pain management. Founded
            by Dr. Edward Baumgartner in 2018, our mission is to put the patient
            first while elevating the standard of care in pain medicine.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-line">
                <Image
                  src="/images/team.webp"
                  alt="The HTx Pain Institute team"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-5 rounded-2xl bg-off-white p-5 shadow-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">Founded</p>
                  <p className="font-serif text-3xl text-navy">2018</p>
                </div>
                <p className="border-l border-line pl-5 text-[13px] leading-snug text-charcoal-soft">
                  Serving Houston for nearly a decade — under three names, one
                  consistent mission.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:pl-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
                <span className="h-px w-8 bg-current opacity-50" />
                Our Story
              </span>
              <h2 className="mt-5 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
                The vision behind HTx Pain Institute.
              </h2>
              <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-charcoal-soft">
                <p>
                  Founded as Texas Interventional Pain Specialists by Dr. Edward
                  Baumgartner in 2018, the practice rebranded as HTx Pain Care in
                  early 2025 and was elevated to HTx Pain Institute in 2026 to
                  reflect its expanded clinical scope and institute-caliber
                  capabilities. Throughout every name change, the team, the
                  locations, and the mission have remained the same: precision
                  care that delivers lasting relief.
                </p>
                <p>
                  After experiencing the inefficiencies of group practice, Dr.
                  Baumgartner was driven to create a more patient-focused model.
                  His vision was clear: elevate the standard of care by
                  prioritizing patient well-being and offering comprehensive,
                  innovative pain management solutions.
                </p>
                <p>
                  HTx Pain Institute is built on the conviction that
                  interventional pain medicine — applied carefully,
                  individually, and with judgment — can return people to the
                  lives they want, often without long-term medication reliance.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {pillars.map((p) => (
                  <div key={p.title} className="rounded-xl border border-line bg-off-white p-5">
                    <IconBadge icon={p.icon} tone="brass" />
                    <p className="mt-4 font-semibold text-navy">{p.title}</p>
                    <p className="mt-1 text-[13px] text-charcoal-soft">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Leadership"
            title="People who chose this work for the right reasons."
            lead="A small, focused team — every patient is known to us."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Link
                key={member.href}
                href={member.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-pearl p-7 transition-all hover:-translate-y-0.5 hover:bg-off-white hover:shadow-md"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-line">
                  <Image
                    src={`/images/${member.image}`}
                    alt={member.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="mt-7 font-serif text-xl leading-tight text-navy">{member.name}</h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brass-text">
                  {member.role}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal-soft">
                  {member.bio}
                </p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-text">
                  Read full bio
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-10 text-off-white sm:p-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
                <span className="h-px w-8 bg-current opacity-70" />
                Our Commitment
              </span>
              <h3 className="mt-5 text-balance font-serif text-3xl leading-tight sm:text-4xl">
                From your first call to your full recovery — seamless, careful,
                personal.
              </h3>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base leading-relaxed text-off-white/90">
                From your initial consultation to your recovery journey, our
                team ensures a seamless, stress-free experience. Our goal is to
                help you regain a pain-free life with a personalized plan
                designed for you.
              </p>
              <Link
                href="/request-appointment"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-navy-deep transition-all hover:bg-brass-light"
              >
                Request a Consultation
                <ArrowIcon />
              </Link>
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
