import Image from "next/image";
import Link from "next/link";
import { legalNav, offices, practice } from "@/lib/nav";

const featuredServices = [
  { label: "Spinal Cord Stimulation", href: "/spinal-cord-stimulation-specialist" },
  { label: "Radiofrequency Ablation", href: "/radiofrequency-ablation" },
  { label: "Intracept Procedure", href: "/intracept-procedure" },
  { label: "MILD Procedure", href: "/mild-procedure" },
  { label: "SI Joint Fusion", href: "/si-joint-fusions" },
];

const practiceLinks = [
  { label: "Our Story", href: "/about-us" },
  { label: "Dr. Baumgartner", href: "/dr-edward-baumgartner" },
  { label: "Tatyana Baumgartner", href: "/tatyana-baumgartner-cpa" },
  { label: "Allison Turner", href: "/allison-turner" },
  { label: "Community — Ima's Home", href: "/community/imas-home" },
];

const patientLinks = [
  { label: "Patient Resources", href: "/patients" },
  { label: "Insurance & Financing", href: "/insurance" },
  { label: "Request Appointment", href: "/request-appointment" },
  { label: "Second Opinion", href: "/second-opinion" },
  { label: "Blog", href: "/blog" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-off-white/85">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-10">
        <div className="grid grid-cols-2 gap-10 pb-12 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Image
              src="/images/htx-pain-institute-logo.png"
              alt="HTx Pain Institute"
              width={168}
              height={96}
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-sm font-serif text-lg italic text-brass-light">
              {practice.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-off-white/60">
              {practice.name} — formerly {practice.formerNames}. Same Dr. Baumgartner,
              same Houston-area locations, expanded clinical scope.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
              Practice
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {practiceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brass-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
              Featured Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {featuredServices.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brass-light">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/services" className="font-medium text-brass-light hover:underline">
                  All Services →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
              For Patients
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {patientLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brass-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-off-white/10 py-10 sm:grid-cols-2">
          {offices.map((office) => (
            <div key={office.key}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-brass-light">
                {office.city} Office
              </h3>
              <address className="mt-3 not-italic text-sm leading-relaxed text-off-white/75">
                {office.addressLine1}
                <br />
                {office.addressLine2}
                <br />
                <a href={practice.phoneHref} className="tabular-nums hover:text-brass-light">
                  {practice.phone}
                </a>
              </address>
            </div>
          ))}
        </div>

        <div className="border-t border-off-white/10 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-off-white/50">
            <span className="font-semibold text-off-white/70">Medical disclaimer:</span>{" "}
            Information on this site is not medical advice. Always consult your
            physician. Individual results may vary. Content is medically reviewed by
            Dr. Edward Baumgartner, MD.
          </p>

          <div className="mt-6 flex flex-col gap-4 text-xs text-off-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {practice.name}. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brass-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
