"use client";

import { useState } from "react";

function ArrowIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
      fill="none"
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FaqCards({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => {
        const open = i === openIndex;
        return (
          <div key={faq.q} className="rounded-2xl border border-line bg-white shadow-sm">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
            >
              <span className="font-serif text-lg leading-snug text-navy">{faq.q}</span>
              <span className="text-navy">
                <ArrowIcon open={open} />
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] px-6 pb-5 opacity-100" : "grid-rows-[0fr] px-6 opacity-0"
              }`}
            >
              <div className="min-h-0 text-sm leading-relaxed text-charcoal-soft">{faq.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
