"use client";

import { useState, type FormEvent } from "react";
import { practice, offices } from "@/lib/nav";

const reasons = [
  "Back pain",
  "Neck pain",
  "Knee pain",
  "Joint pain",
  "Neuropathic pain / nerve pain",
  "Post-surgical pain",
  "Second opinion",
  "Motor vehicle injury",
  "Work injury",
  "Other / not sure",
];

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
    const dateOfBirth = String(form.get("dateOfBirth") ?? "");
    const location = String(form.get("location") ?? "");
    const preferredDate = String(form.get("preferredDate") ?? "");
    const preferredTime = String(form.get("preferredTime") ?? "");
    const reason = String(form.get("reason") ?? "");
    const insuranceProvider = String(form.get("insuranceProvider") ?? "");
    const workersCompNote = String(form.get("workersCompNote") ?? "");
    const message = String(form.get("message") ?? "");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Date of birth: ${dateOfBirth}`,
      `Preferred location: ${location}`,
      `Preferred date: ${preferredDate}`,
      `Preferred time: ${preferredTime}`,
      `Reason: ${reason}`,
      `Insurance provider: ${insuranceProvider}`,
      `Workers' compensation / personal injury: ${workersCompNote}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${practice.email}?subject=${encodeURIComponent(
      `Appointment Request: ${reason || "New patient"}`
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
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
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
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
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
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
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
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-navy">
            Date of Birth <span aria-hidden="true">*</span>
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            required
            className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
          />
          <p className="mt-1.5 text-xs text-muted">
            Required for insurance verification.
          </p>
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
            className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
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
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
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
              className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
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

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-navy">
            Reason for Visit <span aria-hidden="true">*</span>
          </label>
          <select
            id="reason"
            name="reason"
            defaultValue=""
            required
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

        <div>
          <label htmlFor="insuranceProvider" className="block text-sm font-medium text-navy">
            Insurance Provider
          </label>
          <input
            id="insuranceProvider"
            name="insuranceProvider"
            type="text"
            placeholder="e.g. BCBS PPO, Medicare, Aetna…"
            className="mt-1.5 w-full border border-line bg-off-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
          />
          <p className="mt-1.5 text-xs text-muted">
            Workers&rsquo; compensation? Personal injury? Note it below.
          </p>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-navy">
            Anything else we should know?
          </label>
          <textarea
            id="message"
            name="message"
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
          I understand this is a request — not a confirmed appointment — and I agree
          to be contacted by HTx Pain Specialists.
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
