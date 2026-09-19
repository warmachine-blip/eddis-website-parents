import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import { blogPosts } from "@/lib/blog-posts";
import { formatReviewDate } from "@/lib/review";
import { SITE_URL } from "@/lib/site";
import { ORG_ID, FOUNDER_ID, WEBSITE_ID } from "@/lib/schema";
import FinalCta from "@/components/final-cta";

/**
 * Article body, or null while a post is still metadata-only. The path prefix is
 * static so the bundler can resolve the directory; only the slug varies.
 */
async function bodyFor(slug: string) {
  try {
    const mod = await import(`../../../content/blog/${slug}.mdx`);
    return mod.default as React.ComponentType;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    // Absolute: a post headline is long enough on its own, and the brand suffix
    // would push every one of these past what Google displays.
    title: { absolute: post.seoTitle ?? post.title },
    description: post.excerpt,
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const Body = await bodyFor(slug);

  /**
   * Every one of these posts is medical content. A body without a physician
   * review date is a publishing mistake, not a rendering case — throwing here
   * fails the static build rather than shipping unreviewed clinical claims.
   */
  if (Body && !post.lastReviewed) {
    throw new Error(
      `Blog post "${slug}" has an article body but no lastReviewed date. ` +
        `Medical content does not publish without physician review — add ` +
        `lastReviewed to its entry in src/lib/blog-posts.ts.`
    );
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  /**
   * One BlogPosting node. Author, publisher and reviewer are @id references
   * into the site-wide @graph emitted by OrganizationSchema, so the person and
   * the practice are described once for the whole site rather than restated on
   * every post.
   */
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}/images/${post.image}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: { "@id": post.author === "physician" ? FOUNDER_ID : ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en-US",
    ...(post.lastReviewed
      ? { reviewedBy: { "@id": FOUNDER_ID }, lastReviewed: post.lastReviewed }
      : {}),
  };

  return (
    <div>
      <JsonLd data={schema} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.category },
            ]}
          />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            {post.category}
          </p>
          <h1 className="mt-5 text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-off-white/70">
            <span>{formatReviewDate(post.datePublished)}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line">
            <Image src={`/images/${post.image}`} alt={post.alt} fill sizes="768px" className="object-cover" priority />
          </div>

          <p className="mt-10 text-lg leading-relaxed text-charcoal">{post.excerpt}</p>

          {Body ? (
            <div className="mt-2">
              <Body />
            </div>
          ) : null}

          <div className="mt-10 rounded-2xl border border-line bg-off-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
              Go Deeper
            </p>
            <h3 className="mt-1.5 font-serif text-xl text-navy">
              Full clinical detail on {post.relatedLabel}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">
              For the complete picture — candidacy, what to expect, and answers to
              common questions — visit our {post.relatedLabel} page.
            </p>
            <Link
              href={post.relatedHref}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-brass bg-brass px-6 py-3 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              View {post.relatedLabel}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <Link
            href="/blog"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brass-text"
          >
            <span aria-hidden="true">&larr;</span>
            Back to the blog
          </Link>
        </div>
      </section>

      {/* Medically reviewed + final CTA — the same block the clinical pages carry. */}
      <FinalCta surface="bordered" eyebrow="plain">
        {post.lastReviewed ? (
          <div className="mx-auto max-w-7xl px-6 pt-10 text-center lg:px-10">
            <p className="font-sans text-xs uppercase tracking-wide text-off-white/60">Medically Reviewed</p>
            <p className="mt-1 text-sm text-off-white/70">
              Reviewed by Edward Baumgartner Jr., MD &middot; Last reviewed{" "}
              <time dateTime={post.lastReviewed}>{formatReviewDate(post.lastReviewed)}</time>.
              Information on this page is not medical advice. Always consult your physician.
            </p>
          </div>
        ) : null}
      </FinalCta>
    </div>
  );
}
