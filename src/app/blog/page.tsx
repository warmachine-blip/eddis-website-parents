import type { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import BlogPostsGrid from "@/components/blog-posts-grid";
import NewsletterSignup from "@/components/newsletter-signup";
import { blogCategories, blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Pain Education, Procedures & Recovery · HTx Pain Institute",
  description:
    "Plain-English articles on pain medicine, interventional procedures, recovery, and patient stories from HTx Pain Institute in Houston.",
};

export default function BlogPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Blog
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            Pain medicine — explained clearly.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Plain-English articles on procedures, recovery, conditions, and patient
            stories. Written by our clinical team.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <BlogPostsGrid categories={blogCategories} posts={blogPosts} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-3xl px-6 pb-16 lg:px-10 lg:pb-24">
          <div className="rounded-2xl bg-off-white p-10 text-center shadow-sm sm:p-14">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-text">
              <span className="h-px w-8 bg-current opacity-50" />
              Stay Informed
              <span className="h-px w-8 bg-current opacity-50" />
            </p>
            <h2 className="mt-4 text-balance font-serif text-2xl leading-tight text-navy sm:text-3xl">
              Pain education, sent monthly. No spam, no scare tactics.
            </h2>
            <div className="mx-auto mt-6 max-w-md text-left">
              <NewsletterSignup />
            </div>
            <p className="mx-auto mt-4 max-w-md text-sm text-charcoal-soft">
              Unsubscribe at any time. Your email is never shared.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
