import Link from "next/link";
import { SITE_URL } from "@/lib/site";

type Crumb = { label: string; href?: string };

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3.5 w-3.5 opacity-60"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export default function Breadcrumb({ items, dark }: { items: Crumb[]; dark?: boolean }) {
  const textColor = dark ? "text-off-white/90" : "text-charcoal-soft";
  const currentColor = dark ? "text-off-white" : "text-navy";

  // The same trail, emitted as BreadcrumbList so search engines get the
  // hierarchy the visual trail already shows. The final crumb is the current
  // page, so it carries no `item` URL, per Google's guidance.
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href && i < items.length - 1 ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <nav aria-label="Breadcrumb" className={`mb-6 text-xs font-medium ${textColor}`}>
        <ol className="flex flex-wrap items-center gap-x-1.5">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.label} className="inline-flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link href={item.href} className="-mx-1 -my-2.5 inline-flex min-h-11 min-w-11 items-center justify-center px-1 py-2.5 hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span className={currentColor} aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
                {!isLast && <ChevronIcon />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
