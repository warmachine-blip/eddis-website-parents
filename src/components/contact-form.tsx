"use client";

import { useState, type FormEvent } from "react";
import { practice } from "@/lib/nav";

const reasons = [
  "Schedule an appointment",
  "Second opinion",
  "Billing or insurance",
  "Medical records",
  "Other",
];

export default function ContactForm() {
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const reason = String(form.get("reason") ?? "");
    const message = String(form.get("message") ?? "");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Reason: ${reason}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${practice.email}?subject=${encodeURIComponent(
      `Website inquiry: ${reason || "General"}`
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-7 shadow-sm sm:p-9">
      <h2 className="font-serif text-2xl text-navy">Send us a message</h2>
      <p className="mt-1.5 text-sm text-charcoal-soft">
        Required fields are marked with an asterisk.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-navy">
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-navy">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wide text-navy">
              Phone <span aria-hidden="true">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-xs font-semibold uppercase tracking-wide text-navy">
              Reason
            </label>
            <select
              id="reason"
              name="reason"
              defaultValue=""
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            >
              <option value="" disabled>
                Select an option
              </option>
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wide text-navy">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-charcoal-soft">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 border-line accent-navy"
          />
          I understand this form is not for medical emergencies and I agree to be
          contacted by {practice.name} about my inquiry.
        </label>

        <button
          type="submit"
          className="w-full border border-brass bg-navy px-6 py-3.5 text-center font-sans text-sm font-semibold uppercase tracking-wide text-off-white transition-colors hover:bg-navy-deep"
        >
          Send Message
        </button>

        {sent && (
          <p role="status" className="text-sm text-charcoal-soft">
            Opening your email app to send this to our team — if nothing opened,
            reach us directly at{" "}
            <a href={`mailto:${practice.email}`} className="text-brass-text underline">
              {practice.email}
            </a>{" "}
            or {practice.phone}.
          </p>
        )}
      </form>
    </div>
  );
}
