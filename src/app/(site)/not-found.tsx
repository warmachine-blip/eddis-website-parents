import NotFoundBody from "@/components/not-found-body";

/**
 * notFound() raised inside the site. Rendered into (site)/layout.tsx, so it
 * keeps the nav and footer the way the root layout used to supply them.
 *
 * Unmatched URLs are handled by src/app/global-not-found.tsx, not here — a
 * root-level not-found.tsx is inlined into every page's payload, /lp included.
 */
export default function NotFound() {
  return <NotFoundBody />;
}
