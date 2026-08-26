"use client";

import { useState, type FormEvent } from "react";
import { practice } from "@/lib/nav";

export default function NewsletterSignup() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");

    window.location.href = `mailto:${practice.email}?subject=${encodeURIComponent(
      "Newsletter signup"
    )}&body=${encodeURIComponent(`Please add this email to the pain-education newsletter: ${email}`)}`;

    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full border border-line bg-off-white px-3.5 py-2.5 text-base text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 border border-brass bg-navy px-6 py-2.5 font-sans text-sm font-medium tracking-wide text-off-white transition-colors hover:bg-navy-deep"
      >
        Subscribe
      </button>
      {sent && (
        <p role="status" className="basis-full text-sm text-charcoal-soft">
          Opening your email app to send this to our team — if nothing opened, email
          us directly at{" "}
          <a href={`mailto:${practice.email}`} className="text-brass-text underline">
            {practice.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
