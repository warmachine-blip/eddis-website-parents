import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import FaqAccordion from "@/components/faq-accordion";
import SectionHeading from "@/components/section-heading";
import SupportedOrgSchema from "@/components/supported-org-schema";
import { IconBadge } from "@/components/icon-badge";
import { orgBySlug } from "@/lib/community";

const org = orgBySlug("kel-strong-foundation")!;

const SCHEMA_DESCRIPTION =
  "A 501(c)(3) founded in 2020 by traumatic brain injury survivor Kel Mabatah, funding rehabilitation scholarships, advocacy, and recovery assistance for people living with traumatic brain injury and their families.";

export const metadata: Metadata = {
  title: "The ‘Kel Strong’ Mabatah Foundation",
  description:
    "The ‘Kel Strong’ Mabatah Foundation funds rehabilitation for traumatic brain injury survivors. Founded by Kel Mabatah, a former Division I and professional tennis player. HTx Pain Institute supports it financially and attended its annual gala.",
};

/**
 * Claims about the foundation come from kelstrongfoundation.com. Kel Mabatah's
 * playing career — the junior ranking, Purdue and TCU, the professional spell
 * ended by an elbow injury, and the left-handed return — is not on that site;
 * it was supplied by the practice and sourced to TCU Magazine, the USTA, and
 * Fox 26 Houston.
 *
 * The practice's involvement is financial support for the foundation, and
 * attendance at its Annual Fundraising Gala. The sponsorship level was never
 * confirmed, so nothing here calls the practice a sponsor of either event. A
 * sponsorship at the fall event is expected but has not happened yet; it goes
 * on the page once it has, and not before.
 */
const faqs = [
  {
    q: "What is the ‘Kel Strong’ Mabatah Foundation?",
    a: "The ‘Kel Strong’ Mabatah Foundation is a 501(c)(3) non-profit founded in 2020 by Kel Mabatah, a traumatic brain injury survivor. It provides people living with traumatic brain injury and their families with rehabilitation scholarships, advocacy, and recovery assistance. Since 2020 the foundation reports raising more than $350,000.",
  },
  {
    q: "What is the ‘Kel Strong’ Rehab Scholarship?",
    a: "The scholarship was created in partnership with TIRR Memorial Hermann Rehabilitation and the Memorial Hermann Foundation. It exists to bridge the gap survivors face when insurance coverage ends, is denied, or was never there — covering therapy and medical equipment so recovery does not stop for financial reasons. Recipients are selected each year.",
  },
  {
    q: "How does HTx Pain Institute support the foundation?",
    a: "HTx Pain Institute supports the foundation financially and attended its Annual Fundraising Gala. The foundation holds two fundraising events each year — an Annual Tennis Day and an Annual Fundraising Gala — both of which fund the 'Kel Strong' Rehab Scholarship.",
  },
  {
    q: "How can I support the foundation directly?",
    a: "Visit kelstrongfoundation.com to donate, learn about the rehab scholarship, or find details of the Annual Tennis Day and Annual Fundraising Gala.",
  },
];

const events = [
  {
    icon: "bolt" as const,
    name: "Annual Tennis Day",
    body: "Played in the sport Kel ranked in nationally, competed in at Purdue and TCU, and came back to left-handed. Supporters, families, sponsors, and volunteers spend the day on court.",
  },
  {
    icon: "sparkles" as const,
    name: "Annual Fundraising Gala",
    body: "An evening bringing together survivors, families, supporters, healthcare professionals, and community leaders. HTx Pain Institute attended.",
  },
];

export default function KelStrongFoundationPage() {
  return (
    <div>
      <SupportedOrgSchema
        org={org}
        description={SCHEMA_DESCRIPTION}
        founder="Kel Mabatah"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Community", href: "/community" },
              { label: "‘Kel Strong’ Mabatah Foundation" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Community
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Recovery from a brain injury rarely ends when the coverage does.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            The ‘Kel Strong’ Mabatah Foundation exists for the months and years
            after that point. HTx Pain Institute supports its work, and we were
            in the room at the annual fundraising gala.
          </p>
        </div>
      </section>

      {/* The gap the foundation fills */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The Foundation"
              title="A scholarship for the part of recovery nobody budgets for."
              lead="The ‘Kel Strong’ Mabatah Foundation is a 501(c)(3) founded in 2020. It funds rehabilitation scholarships, advocacy, and recovery assistance for people living with traumatic brain injury — and for the families carrying it with them."
            />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-charcoal-soft">
              <p>
                The ‘Kel Strong’ Rehab Scholarship was created in partnership
                with TIRR Memorial Hermann Rehabilitation and the Memorial
                Hermann Foundation. It answers a problem the foundation saw
                first-hand: rehabilitation keeps producing progress long after
                insurance stops paying for it, is denied, or was never in place.
              </p>
              <p>
                The scholarship covers therapy and the medical equipment that
                keeps that progress moving. Recipients are chosen each year, and
                the foundation reports raising more than $350,000 since 2020.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <IconBadge icon="shield" tone="brass" />
              <h2 className="mt-4 font-sans text-base font-medium text-navy">
                Support the foundation
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                Donations, the rehab scholarship, and both annual events are all
                on the foundation&rsquo;s own site.
              </p>
              <a
                href={org.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full border border-brass bg-brass px-7 py-3 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
              >
                Visit {org.websiteLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-off-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-4">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
              Its Founder
            </p>
            <h3 className="mt-3 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
              Kel Mabatah was a tennis player first.
            </h3>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-charcoal-soft lg:col-span-8">
            <p>
              He reached a top-ten national junior ranking through the USTA
              system in Texas, played Division I tennis at Purdue and then TCU,
              and had begun competing professionally when an elbow injury ended
              it.
            </p>
            <p>
              In 2014 he survived an attack that left him with a severe
              traumatic brain injury. He spent a week in a coma, underwent four
              brain surgeries, and was brought back to Houston, where he
              rehabilitated at Memorial Hermann and later at TIRR Memorial
              Hermann Rehabilitation. He had to relearn how to walk and speak.
              He still lives with partial paralysis on his right side and
              continues outpatient rehabilitation.
            </p>
            <p>
              He plays tennis again. He plays it left-handed.
            </p>
            <p>
              In 2020 he founded the organization that carries his name, to give
              other survivors access to the recovery he had to fight for.
            </p>
          </div>
        </div>
      </section>

      {/* Two events a year */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="How It Raises Money"
            title="Two events a year. The tennis is not incidental."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {events.map((e) => (
              <div
                key={e.name}
                className="rounded-2xl border border-line bg-white p-7 shadow-sm"
              >
                <IconBadge icon={e.icon} tone="brass" />
                <h3 className="mt-4 font-serif text-xl text-navy">{e.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                  {e.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-charcoal-soft">
            Dates, tickets, and sponsorship details for both events are
            published by the foundation at{" "}
            <a
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brass-text hover:underline"
            >
              {org.websiteLabel}
            </a>
            .
          </p>
        </div>
      </section>

      {/* Why this cause */}
      <section className="bg-off-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
            Why This Cause
          </p>
          <h3 className="mt-3 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
            We spend our days with people whose recovery outlasted their
            coverage.
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-charcoal-soft">
            Chronic pain and brain injury are different conditions, but they
            share a shape: the hardest stretch usually begins once the acute
            care is finished and the funding runs out. That is the stretch this
            foundation pays for.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-charcoal-soft">
            It also sits close to work we already do. We treat{" "}
            <Link
              href="/sports-injuries"
              className="font-semibold text-brass-text hover:underline"
            >
              sports injuries
            </Link>{" "}
            at every level, and we know what it costs an athlete to lose their
            sport &mdash; and what it takes to get any part of it back.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="FAQ" title="Frequently asked" />
          <div className="mt-10 max-w-3xl">
            <FaqAccordion faqs={faqs} allClosed />
          </div>
          <p className="mt-8 max-w-3xl text-center text-sm text-charcoal-soft">
            Want to support the foundation directly? Visit{" "}
            <a
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brass-text hover:underline"
            >
              {org.websiteLabel}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
