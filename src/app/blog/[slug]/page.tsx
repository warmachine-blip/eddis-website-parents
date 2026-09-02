import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb";
import { blogPosts } from "@/lib/blog-posts";
import { practice } from "@/lib/nav";

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
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div>
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
            <span>{post.date}</span>
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

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-24">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Ready When You Are
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl">
            Get the care you deserve. Schedule your consultation today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-off-white/70">
            Two Houston-area locations. Same-week consults available. Most insurance
            accepted.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/request-appointment"
              className="rounded-full border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Request Appointment
            </Link>
            <a
              href={practice.phoneHref}
              className="rounded-full border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
