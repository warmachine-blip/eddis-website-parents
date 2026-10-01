import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import FaqAccordion from "@/components/faq-accordion";
import JsonLd from "@/components/json-ld";
import SectionHeading from "@/components/section-heading";
import { IconBadge } from "@/components/icon-badge";
import { orgBySlug } from "@/lib/community";
import { ORG_ID, supportedOrgId, absolute } from "@/lib/schema";

const org = orgBySlug("houston-tennis-academy")!;
const PAGE_URL = absolute(org.href);

export const metadata: Metadata = {
  title: "Houston Tennis Academy Partnership",
  description:
    "HTx Pain Institute partners with Houston Tennis Academy to support injury prevention and Houston's junior tennis community.",
};

/**
 * Claims about the academy, its programs, and Koko's career are taken from
 * houstontennisacademy.com (home page and Our Team, checked 2026-09-25).
 *
 * This is a partnership, not a donation: nothing here calls the practice a
 * funder or sponsor, and the schema below is a SportsOrganization rather than
 * the NGO node the two charity pages emit.
 *
 * The injury prevention talk has no date yet. It renders as "Date to be
 * announced" until the practice supplies one — never as a placeholder.
 */
const TALK_DATE = "Date to be announced";

const events = [
  {
    icon: "bolt" as const,
    name: "Injury Prevention Talk",
    meta: `${TALK_DATE} · Houston Tennis Academy`,
    body: "An introduction to the strains junior tennis puts on a growing body, and the habits that keep players ahead of them.",
  },
  {
    icon: "pulse" as const,
    name: "Recovery and performance",
    body: "Recovery and performance talks: warm-ups, mobility, sleep, and recovery between matches.",
  },
  {
    icon: "shield" as const,
    name: "A parent night on training load",
    body: "How much is too much for young players, and which aches are worth watching.",
  },
];

const faqs = [
  {
    q: "What is the partnership between HTx Pain Institute and Houston Tennis Academy?",
    a: "HTx Pain Institute partners with Houston Tennis Academy and co-founder Nikolay “Koko” Gantchev to promote injury prevention and support Houston's junior tennis community through education and events.",
  },
];

export default function HoustonTennisAcademyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsOrganization",
        "@id": supportedOrgId(org.slug),
        name: org.name,
        url: org.website,
        sport: "Tennis",
        description:
          "A junior tennis program at Club Westside in west Houston, co-founded by Nikolay Gantchev and Ivan Ivanov, training players from age 5 through 18.",
        // A partnership, not a donation: the practice is named as a
        // collaborator, never as funder or sponsor.
        subjectOf: { "@id": `${PAGE_URL}#webpage` },
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Houston Tennis Academy Partnership",
        about: { "@id": supportedOrgId(org.slug) },
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Community", href: "/community" },
              { label: "Houston Tennis Academy" },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Community
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Keeping Houston&rsquo;s young tennis players healthy and on the
            court.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            HTx Pain Institute is proud to partner with Houston Tennis Academy
            at Club Westside and its co-founder and program director, Nikolay
            &ldquo;Koko&rdquo; Gantchev. We share a simple goal: helping young
            players train hard, stay healthy, and keep playing the game they
            love.
          </p>
        </div>
      </section>

      {/* The partnership */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The Partnership"
              title="Two kinds of experience, pointed at the same problem."
            />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-charcoal-soft">
              <p>
                Our partnership centers on injury prevention and supporting
                Houston&rsquo;s tennis community. Koko brings more than three
                decades of coaching experience, including seven years as a
                full-time coach on the WTA tour. Dr. Edward Baumgartner brings a
                physician&rsquo;s perspective on how repetitive strain affects
                shoulders, elbows, backs, and knees, and on what to do when pain
                starts to show up.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/tennis-player-mid-swing-clay-court.jpg"
                alt="A young man in athletic wear and a dark cap swings a tennis racquet with both hands on an outdoor clay court, feet planted wide."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Events"
            title="What we are running together."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <div
                key={e.name}
                className="flex h-full flex-col rounded-2xl border border-line bg-off-white p-7 shadow-sm"
              >
                <IconBadge icon={e.icon} tone="brass" />
                <h3 className="mt-4 font-serif text-xl leading-tight text-navy">
                  {e.name}
                </h3>
                {e.meta ? (
                  <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
                    {e.meta}
                  </p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                  {e.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the academy */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="About Houston Tennis Academy"
            title="A junior program at Club Westside."
          />
          <div className="mt-6 grid max-w-5xl gap-x-14 gap-y-4 text-base leading-relaxed text-charcoal-soft lg:grid-cols-2">
            <p>
              Houston Tennis Academy is a junior tennis program at Club Westside
              in west Houston, co-founded by Nikolay Gantchev and Ivan Ivanov.
              The academy trains players from age 5 through 18. Programs range
              from Quick Start for the youngest beginners, to the Challenger and
              Super Champ programs for older competitive juniors, to a weekly
              Junior Development program for players 11 and up.
            </p>
            <p>
              A native of Ruse, Bulgaria, Koko began coaching in Austria in 1992
              and went on to direct the tennis program at Tennis Club Hard. From
              1995 to 2002, he coached full-time on the WTA tour before
              co-founding Houston Tennis Academy.
            </p>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-charcoal-soft">
            <a
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brass-text hover:underline"
            >
              Houston Tennis Academy
            </a>
            , {org.websiteLabel}
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-off-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <p className="text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
            Dealing with pain that isn&rsquo;t going away?{" "}
            <Link
              href="/sports-injuries"
              className="text-brass-text underline decoration-brass decoration-2 underline-offset-4 hover:text-navy"
            >
              Learn about our sports injury care
            </Link>
            .
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
        </div>
      </section>
    </div>
  );
}
