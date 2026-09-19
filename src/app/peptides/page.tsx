import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { IconBadge } from "@/components/icon-badge";

export const metadata: Metadata = {
  title: "Peptide & Weight Therapy (Coming Soon)",
  description:
    "A physician-supervised program for weight, hormones, and recovery. Peptides and GLP-1 medications, prescribed and monitored by Dr. Baumgartner. Coming soon.",
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
            A dedicated wellness program, coming soon.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            We are building a physician-supervised program for weight management, hormone
            support, and recovery. It will launch on its own. For now, contact us to talk about
            whether a wellness consultation is right for you.
          </p>
        </div>
      </section>

      {/* Wellness overview */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <IconBadge icon="pulse" tone="brass" className="mx-auto" />
          <h2 className="mx-auto mt-6 text-balance font-serif text-3xl leading-[1.1] text-navy sm:text-4xl lg:text-[2.75rem]">
            Weight, hormones, recovery. Managed by a physician.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-charcoal-soft">
            The program will cover weight management with GLP-1 medications, nerve-repair
            peptides, recovery protocols, and growth-hormone support. Dr. Baumgartner selects,
            doses, and monitors every one of them. We are taking the time to launch it properly
            rather than quickly.
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
          <div className="rounded-2xl bg-gradient-to-br from-navy-deep to-navy p-7 text-center text-off-white shadow-md sm:p-10">
            <h2 className="text-balance font-serif text-2xl leading-tight sm:text-3xl">
              Want to know when the program opens?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-off-white/85">
              Contact the office and tell us you are interested. We will add you to the launch
              list and book a consultation once the program is live.
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

      {/* Disclaimer. No physician byline until the real wellness page ships and
          is reviewed — a "Medically Reviewed" card on a coming-soon stub would
          be claiming a review that has not happened. */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-2xl px-6 pb-16 lg:px-10 lg:pb-24">
          <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-sm">
            <IconBadge icon="shield" tone="brass" />
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-navy">
                Please Note
              </p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-soft">
                Information on this page is not medical advice. Always consult your
                physician.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
