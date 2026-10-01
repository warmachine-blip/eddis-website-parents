import type { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";
import BlogPostsGrid from "@/components/blog-posts-grid";
import FinalCta from "@/components/final-cta";
import { blogCategories, publishedPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-English articles on pain medicine, interventional procedures, and recovery from HTx Pain Institute in Houston.",
};

/**
 * Only the categories that actually have a post, so the filter row never offers
 * a tab that leads to an empty grid. It grows on its own as posts are migrated.
 */
const activeCategories = blogCategories.filter(
  (category) => category === "All" || publishedPosts.some((p) => p.category === category)
);

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
            Pain medicine, explained clearly.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Plain-English articles on procedures and recovery.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <BlogPostsGrid categories={activeCategories} posts={publishedPosts} />
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
