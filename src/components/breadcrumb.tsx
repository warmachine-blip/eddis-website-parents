import Link from "next/link";

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

  return (
    <nav aria-label="Breadcrumb" className={`mb-6 text-xs font-medium ${textColor}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:underline">
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
  );
}
