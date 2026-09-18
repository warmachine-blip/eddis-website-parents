import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import SectionHeading from "@/components/section-heading";
import { IconBadge } from "@/components/icon-badge";
import { supportedOrgs } from "@/lib/community";

export const metadata: Metadata = {
  title: "Community",
  description:
    "The organizations HTx Pain Institute supports: Ima's Home for Children in the Philippines, and the ‘Kel Strong’ Mabatah Foundation for brain injury survivors.",
};

export default function CommunityPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Community" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Community
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            The work we support outside the clinic.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Two organizations, both built around the same idea: that recovery
            should not stop because the money did.
          </p>
        </div>
      </section>

      {/* The organizations */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Supported Organizations"
            title="Who we support, and how."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {supportedOrgs.map((org) => (
              <article
                key={org.slug}
                className="flex flex-col rounded-2xl border border-line bg-off-white p-7 shadow-sm sm:p-9"
              >
                <IconBadge icon={org.icon} tone="brass" />
                <h2 className="mt-5 font-serif text-2xl leading-tight text-navy">
                  <Link href={org.href} className="hover:text-brass-text">
                    {org.name}
                  </Link>
                </h2>
                <p className="mt-3 text-base leading-relaxed text-charcoal-soft">
                  {org.summary}
                </p>
                <p className="mt-4 border-l-2 border-brass/40 pl-4 text-sm leading-relaxed text-charcoal-soft">
                  {org.involvement}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
                  <Link
                    href={org.href}
                    className="rounded-full border border-brass bg-brass px-6 py-3 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
                  >
                    Read more
                  </Link>
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-brass-text hover:underline"
                  >
                    {org.websiteLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
