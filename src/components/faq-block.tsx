import FaqAccordion from "@/components/faq-accordion";
import JsonLd from "@/components/json-ld";

export type Faq = { q: string; a: string };

export function faqPageLd(id: string, faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/**
 * Visible questions and the FAQPage node, from the same strings. `compact`
 * sits inside an article column. The default is the full-width block used on
 * clinical pages.
 */
export default function FaqBlock({
  heading,
  faqs,
  schemaId,
  compact = false,
}: {
  heading: string;
  faqs: Faq[];
  schemaId: string;
  compact?: boolean;
}) {
  const body = (
    <>
      <JsonLd data={faqPageLd(schemaId, faqs)} />
      <h2
        className={
          compact
            ? "font-serif text-2xl leading-tight text-navy sm:text-3xl"
            : "max-w-3xl text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl"
        }
      >
        {heading}
      </h2>
      <div className={compact ? "mt-2" : "mt-6 max-w-3xl"}>
        <FaqAccordion faqs={faqs} />
      </div>
    </>
  );

  if (compact) return <div className="mt-12">{body}</div>;

  return (
    <section className="bg-navy-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">{body}</div>
    </section>
  );
}
