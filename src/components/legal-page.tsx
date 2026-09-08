import type { ReactNode } from "react";
import Breadcrumb from "@/components/breadcrumb";
import { practice } from "@/lib/nav";

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const CONTACT_RE = new RegExp(`(${escapeRe(practice.phone)}|${escapeRe(practice.email)})`, "g");

/** Legal copy is plain strings; turn the practice phone/email into real links. */
function withContactLinks(text: string): ReactNode[] {
  return text.split(CONTACT_RE).map((part, i) => {
    if (part === practice.phone) {
      return (
        <a key={i} href={practice.phoneHref} className="whitespace-nowrap underline underline-offset-2">
          {part}
        </a>
      );
    }
    if (part === practice.email) {
      return (
        <a key={i} href={`mailto:${practice.email}`} className="break-words underline underline-offset-2">
          {part}
        </a>
      );
    }
    return part;
  });
}

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  effectiveNote?: string;
};

export type LegalPageData = {
  title: string;
  eyebrow: string;
  breadcrumbLabel?: string;
  parentCrumb?: { label: string; href: string };
  effectiveLine?: string;
  intro: string;
  sections: LegalSection[];
  card?: boolean;
};

export default function LegalPage({ data }: { data: LegalPageData }) {
  const crumbs = [
    { label: "Home", href: "/" },
    ...(data.parentCrumb ? [data.parentCrumb] : []),
    { label: data.breadcrumbLabel ?? data.title },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Breadcrumb dark items={crumbs} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            {data.eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-4xl text-off-white sm:text-5xl">{data.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-off-white/85">
            {data.effectiveLine && `${data.effectiveLine}. `}
            {data.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
        <div className={data.card === false ? "space-y-10" : "space-y-10 rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-8 lg:p-12"}>
          {data.sections.map((section) => (
            <section key={section.heading}>
              {section.effectiveNote && (
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-brass-text">
                  {section.effectiveNote}
                </p>
              )}
              <h2 className={`font-serif text-xl text-navy ${section.effectiveNote ? "mt-3" : ""}`}>
                {section.heading}
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="mt-3 text-base leading-relaxed text-charcoal-soft">
                  {withContactLinks(p)}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-relaxed text-charcoal-soft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
