import type { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import FaqCards from "@/components/faq-cards";
import SectionHeading from "@/components/section-heading";
import { IconBadge } from "@/components/icon-badge";

export const metadata: Metadata = {
  title: "Ima's Home for Children — HTx Pain Institute Community · HTx Pain Institute",
  description:
    "Eight years presenting sponsor of the Ima's Home 5K. Tatyana Baumgartner serves on the Board of Directors. Caring for 155 orphaned children in the Philippines.",
};

const quickLinks = [
  { label: "Register for the 5K", sub: "imas5k.itsyourrace.com", href: "https://imas5k.itsyourrace.com", icon: "bolt" as const },
  { label: "Donate to Ima's Home", sub: "imashome.com/give", href: "https://imashome.com/give", icon: "shield" as const },
  { label: "Sponsor a child", sub: "imashome.com", href: "https://imashome.com", icon: "pulse" as const },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const faqs = [
  {
    q: "What is Ima's Home for Children?",
    a: "Ima's Home for Children is a 501(c)(3) nonprofit founded in 2013 that cares for orphaned and abandoned children in the Philippines. As of 2026, the home cares for approximately 155 children, providing food, shelter, education, healthcare, and a loving family environment.",
  },
  {
    q: "How is HTx Pain Institute involved?",
    a: "HTx Pain Institute has been the presenting sponsor of the annual Ima's Home 5K for eight consecutive years. Tatyana Baumgartner, Chief Operating Officer of HTx Pain Institute, serves on the Board of Directors of Ima's Home for Children. The Baumgartner family has known the founders through church and family connection for years.",
  },
  {
    q: "When and where is the Ima's Home 5K?",
    a: "The annual Ima's Home 5K is held each February at Walter Hall Park in League City, Texas. The event includes both a 5K race and a Kids 1K. The 2026 fundraising goal is $140,000 to support the children's home.",
  },
  {
    q: "How can I get involved or donate?",
    a: "You can register for the 5K at imas5k.itsyourrace.com, donate at imashome.com/give, or sponsor a child at imashome.com/child-sponsorship.html. Every dollar helps cover food, shelter, education, and care for the children.",
  },
];

export default function ImasHomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Community" }, { label: "Ima's Home for Children" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Community
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            For the Baumgartner family, supporting Ima&rsquo;s Home for
            Children is more than philanthropy.
          </h1>
          <p className="mt-4 max-w-xl font-serif text-xl italic text-brass-light">
            It is family. Eight years presenting sponsor. A board seat. A
            relationship measured in lives changed across two continents.
          </p>
        </div>
      </section>

      {/* 155 children */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The Cause & The Children"
              title="155 children. A home built around dignity."
              lead="Ima's Home for Children is a 501(c)(3) nonprofit founded in 2013 that cares for orphaned and abandoned children in the Philippines. As of 2026, the home cares for approximately 155 children — many of whom arrived after surviving poverty, abuse, or abandonment."
            />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-charcoal-soft">
              <p>
                The home provides every part of what a family should provide: food,
                shelter, education, healthcare, and the daily experience of being
                known and loved. The goal is not just survival — it is to raise
                children who become healthy, educated, contributing adults.
              </p>
              <p>
                The 2026 fundraising goal — anchored by the annual 5K — is $140,000.
                Every dollar funds the daily reality of running a home for 155
                children halfway around the world.
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <IconBadge icon="shield" tone="brass" />
              <h2 className="mt-4 font-sans text-base font-medium text-navy">
                Get involved
              </h2>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-lg bg-pearl px-4 py-3 text-sm font-medium text-navy transition-colors hover:bg-brass/10 hover:text-brass-text"
                    >
                      <span>
                        {l.label}
                        <span className="mt-0.5 block text-xs font-normal text-charcoal-soft">{l.sub}</span>
                      </span>
                      <ArrowIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-navy-deep p-6 text-center text-off-white">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-light">
                Eight years &amp; counting
              </p>
              <p className="mt-2 text-sm leading-relaxed text-off-white/75">
                Presenting sponsor of the annual Ima&rsquo;s Home 5K since 2018.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal connection */}
      <section className="bg-off-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-4">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
              Why This Cause
            </p>
            <h3 className="mt-3 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
              Personal connection. Lasting commitment.
            </h3>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-charcoal-soft lg:col-span-8">
            <p>
              The relationship between the Baumgartner family and Ima&rsquo;s
              Home for Children began through church and family connection long
              before HTx Pain Institute existed. The founders of Ima&rsquo;s Home
              are family — not in the metaphorical sense, but in the long,
              ordinary sense of years and meals and children growing up alongside
              each other.
            </p>
            <p>
              Tatyana Baumgartner, our Chief Operating Officer, serves on the
              Board of Directors of Ima&rsquo;s Home for Children. Her board seat
              is not honorary. She helps direct the operations of the
              organization with the same precision she applies to running HTx
              Pain Institute.
            </p>
          </div>
        </div>
      </section>

      {/* February in League City */}
      <section className="bg-pearl">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
              The 5K
            </p>
            <h3 className="mt-3 max-w-xl text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
              February in League City — the day everything else stops.
            </h3>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-charcoal-soft">
              <p>
                The annual Ima&rsquo;s Home 5K is held each February at Walter Hall
                Park in League City, Texas. The event includes both a 5K race and a
                Kids 1K — by design, an event the whole family can do together.
              </p>
              <p>
                Team HTx Pain Institute shows up in force every year: physicians,
                nurses, front-of-house staff, family members, and patients running
                alongside us. Many of our patients have made it a tradition. We hope
                yours becomes one too.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {quickLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:border-brass"
                >
                  <IconBadge icon={l.icon} tone="brass" />
                  <p className="mt-4 text-sm font-semibold text-navy">{l.label}</p>
                  <p className="mt-1 text-xs text-charcoal-soft">{l.sub}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-navy-deep p-8 text-center text-off-white">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-light">
                2026 Goal
              </p>
              <p className="mt-3 font-serif text-5xl">$140,000</p>
              <p className="mt-4 text-sm leading-relaxed text-off-white/75">
                Every dollar funds food, shelter, education, healthcare, and the
                daily experience of being known and loved. Help us close the gap.
              </p>
              <a
                href="https://imashome.com/give"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full border border-brass bg-brass px-7 py-3 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
              >
                Donate now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Through every name change */}
      <section className="bg-off-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
            Eight Years &amp; Counting
          </p>
          <h3 className="mt-3 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
            Through every name change, the commitment has only deepened.
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-charcoal-soft">
            That is why the commitment has held through every name change and
            growth phase of the practice. From Texas Interventional Pain
            Specialists to HTx Pain Care to HTx Pain Institute, the practice has
            shown up — every February, in League City, with the team in matching
            shirts — as the presenting sponsor of the annual 5K.
          </p>
          <p className="mt-6 font-serif text-xl italic text-brass-text">
            Eight years and counting.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="FAQ" title="Frequently asked" />
          <div className="mt-10 max-w-3xl">
            <FaqCards faqs={faqs} />
          </div>
          <p className="mt-8 max-w-3xl text-center text-sm text-charcoal-soft">
            Want to support Ima&rsquo;s Home directly? Visit{" "}
            <a
              href="https://imashome.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brass-text hover:underline"
            >
              imashome.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
