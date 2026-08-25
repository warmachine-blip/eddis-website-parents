import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-6 py-24 lg:px-10 lg:py-32">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-text">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
        We couldn&rsquo;t find that page.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-soft">
        The page you&rsquo;re looking for may have moved or no longer exists. Try
        one of these instead:
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/"
          className="border border-brass bg-navy px-6 py-3 font-sans text-sm font-medium text-off-white hover:bg-navy-deep"
        >
          Back to Home
        </Link>
        <Link
          href="/services"
          className="border border-navy px-6 py-3 font-sans text-sm font-medium text-navy hover:bg-navy hover:text-off-white"
        >
          View Services
        </Link>
        <Link
          href="/contact"
          className="border border-line px-6 py-3 font-sans text-sm font-medium text-navy hover:border-brass"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
