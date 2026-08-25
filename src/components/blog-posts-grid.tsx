"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";

export default function BlogPostsGrid({
  categories,
  posts,
}: {
  categories: string[];
  posts: BlogPost[];
}) {
  const [active, setActive] = useState(categories[0]);
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={
              active === category
                ? "rounded-full bg-navy px-5 py-2 text-sm font-semibold text-off-white"
                : "rounded-full border border-line bg-off-white px-5 py-2 text-sm font-medium text-charcoal-soft transition-colors hover:border-brass hover:text-navy"
            }
          >
            {category}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-charcoal-soft">
          No articles in this category yet — check back soon.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-off-white shadow-[0_1px_2px_rgba(26,39,64,0.04),0_4px_12px_rgba(26,39,64,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(26,39,64,0.06),0_20px_40px_-8px_rgba(26,39,64,0.12)]"
            >
              <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] w-full overflow-hidden border-b border-card-border">
                <Image
                  src={`/images/${post.image}`}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-navy-deep/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-off-white">
                  {post.category}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-lg leading-snug text-navy transition-colors group-hover:text-cyan-700">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-charcoal-soft">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-card-border pt-4 text-xs font-medium text-navy-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 transition-colors group-hover:translate-x-0.5"
                >
                  Read article
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
