import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Prose styling for article bodies. MDX gives authors plain markdown; the
 * element map below is what makes it look like the rest of the site, so no
 * .mdx file should ever carry a className.
 *
 * Required at this path by @next/mdx in the App Router.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2 className="mt-12 font-serif text-2xl leading-tight text-navy sm:text-3xl" {...props} />
    ),
    h3: (props) => (
      <h3 className="mt-8 font-serif text-xl leading-tight text-navy" {...props} />
    ),
    p: (props) => (
      <p className="mt-5 text-base leading-relaxed text-charcoal-soft" {...props} />
    ),
    ul: (props) => (
      <ul className="mt-5 grid gap-2.5 text-base leading-relaxed text-charcoal-soft" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-5 grid list-decimal gap-2.5 pl-5 text-base leading-relaxed text-charcoal-soft" {...props} />
    ),
    li: (props) => <li className="marker:text-brass" {...props} />,
    strong: (props) => <strong className="font-semibold text-navy" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="mt-8 border-l-2 border-brass/40 pl-5 font-serif text-xl italic leading-snug text-brass-text"
        {...props}
      />
    ),
    // Internal links route through next/link; external ones stay plain anchors.
    a: ({ href = "", ...props }) =>
      href.startsWith("/") ? (
        <Link href={href} className="font-semibold text-brass-text hover:text-navy" {...props} />
      ) : (
        <a href={href} rel="noopener noreferrer" target="_blank" className="font-semibold text-brass-text hover:text-navy" {...props} />
      ),
    ...components,
  };
}
