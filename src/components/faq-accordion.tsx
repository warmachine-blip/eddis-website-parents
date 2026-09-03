"use client";

import { useId, useState } from "react";

export default function FaqAccordion({
  faqs,
  allClosed = false,
}: {
  faqs: { q: string; a: string }[];
  allClosed?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState(allClosed ? -1 : 0);
  const baseId = useId();

  return (
    <ul className="divide-y divide-line">
      {faqs.map((faq, i) => {
        const open = i === openIndex;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <li key={faq.q} className="py-1.5">
            <button
              type="button"
              id={buttonId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-serif text-lg leading-snug text-navy sm:text-xl">{faq.q}</span>
              <span
                className={`grid h-9 w-9 flex-none place-items-center rounded-full border transition-all ${
                  open ? "rotate-180 border-navy-deep bg-navy-deep text-off-white" : "border-line text-navy"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                  <path d="M5 12h14" />
                  {!open && <path d="M12 5v14" />}
                </svg>
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!open}
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 max-w-3xl text-sm leading-relaxed text-charcoal-soft">{faq.a}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
