"use client";

import { useState, type FormEvent } from "react";
import { practice, offices } from "@/lib/nav";

const preferredTimes = [
  "Morning (before noon)",
  "Midday (11–2)",
  "Afternoon (after 2)",
  "Any time that's available",
];

export default function RequestAppointmentForm() {
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const firstName = String(form.get("firstName") ?? "");
    const lastName = String(form.get("lastName") ?? "");
    const name = [firstName, lastName].filter(Boolean).join(" ");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const location = String(form.get("location") ?? "");
    const preferredDate = String(form.get("preferredDate") ?? "");
    const preferredTime = String(form.get("preferredTime") ?? "");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Preferred location: ${location}`,
      `Preferred date: ${preferredDate}`,
      `Preferred time: ${preferredTime}`,
    ].join("\n");

    window.location.href = `mailto:${practice.email}?subject=${encodeURIComponent(
      `Appointment Request: ${name || "New patient"}`
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <div id="appointment-form" className="border border-line bg-off-white p-7 sm:p-9">
      <h2 className="font-serif text-2xl text-navy">Appointment Request</h2>
      <p className="mt-1.5 text-sm text-charcoal-soft">
        We will confirm your appointment within 24 hours. Required fields are marked
        with an asterisk.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-navy">
              First Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-base text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-navy">
              Last Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-base text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-base text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-navy">
              Phone <span aria-hidden="true">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-base text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-navy">
            Preferred Location <span aria-hidden="true">*</span>
          </label>
          <select
            id="location"
            name="location"
            defaultValue=""
            required
            className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-base text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
          >
            <option value="" disabled>
              Select an option
            </option>
            {offices.map((office) => (
              <option key={office.key} value={office.label}>
                {office.city === "Houston" ? "Houston (TX-249)" : "Humble (FM 1960)"}
              </option>
            ))}
            <option value="No preference">Either / no preference</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium text-navy">
              Preferred Date
            </label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-base text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            />
          </div>
          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium text-navy">
              Preferred Time
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              defaultValue=""
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-base text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            >
              <option value="" disabled>
                Select an option
              </option>
              {preferredTimes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm text-charcoal-soft">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 border-line accent-navy"
          />
          I understand this is a request — not a confirmed appointment — and I agree
          to be contacted by {practice.name}.
        </label>

        <button
          type="submit"
          className="w-full border border-brass bg-navy px-6 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white transition-colors hover:bg-navy-deep sm:w-auto"
        >
          Submit Appointment Request
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
