import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { IconBadge } from "@/components/icon-badge";
import { practice } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Peptides & Wellness (Coming Soon)",
  description:
    "HTx Pain Institute is building a dedicated wellness program — physician-supervised peptides, weight loss, and recovery. Talk to Dr. Baumgartner.",
};

const features = [
  {
    title: "Physician-Supervised",
    body: "All programs are evaluated, prescribed, and monitored by Dr. Baumgartner.",
    icon: "shield",
  },
  {
    title: "Compounded by Licensed Pharmacies",
    body: "Where applicable, products are sourced from accredited compounding pharmacies.",
    icon: "pulse",
  },
  {
    title: "Patient-First Standards",
    body: "Realistic expectations, transparent pricing, and ongoing follow-up.",
    icon: "bolt",
  },
] as const;

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Peptides & Wellness" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Peptides &amp; Wellness
          </p>
          <h1 className="mt-5 max-w-2xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            A dedicated wellness program — coming soon.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            HTx Pain Institute is building a physician-supervised peptide therapy and wellness
            program to complement our core pain care. The full program will launch on its own —
            for now, please contact us to discuss whether a wellness consultation is right for
            you.
          </p>
        </div>
      </section>

      {/* Wellness overview */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <IconBadge icon="pulse" tone="brass" />
          <h2 className="mx-auto mt-6 text-balance font-serif text-3xl leading-[1.1] text-navy sm:text-4xl lg:text-[2.75rem]">
            Wellness, integrated with serious pain medicine.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-charcoal-soft">
            Our forthcoming wellness program will include physician-supervised weight management
            with GLP-1 medications, nerve-repair peptides, recovery protocols, and growth-hormone
            support — all selected, dosed, and monitored by Dr. Baumgartner and our team. We are
            taking the time to launch this program the right way, with the same precision
            standards we apply to our interventional pain care.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-line bg-white p-7 text-left shadow-sm">
                <IconBadge icon={f.icon} tone="brass" />
                <h3 className="mt-6 font-serif text-lg leading-tight text-navy">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Launch list */}
      <section className="border-y border-line bg-pearl">
        <div className="mx-auto max-w-2xl px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-10 text-center text-off-white shadow-md">
            <h2 className="text-balance font-serif text-2xl leading-tight sm:text-3xl">
              Want to be the first to hear when wellness launches?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-off-white/85">
              Contact our office and let us know you&rsquo;re interested in the wellness program.
              We&rsquo;ll add you to the launch list and schedule a consultation when the program
              is live.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-block rounded-full border border-brass bg-brass px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
              >
                Contact HTx Pain Institute
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Medically reviewed */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-2xl px-6 pb-16 lg:px-10 lg:pb-24">
          <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-sm">
            <IconBadge icon="shield" tone="brass" />
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-navy">
                Medically Reviewed
              </p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-soft">
                Reviewed by Edward Baumgartner Jr., MD. Information on this page is not medical
                advice. Always consult your physician.
              </p>
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
            Two Houston-area locations. Same-week consults available. Most insurance accepted.
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
