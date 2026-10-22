"use client";

import Link from "next/link";
import { useState } from "react";
import { practice } from "@/lib/nav";
import { LeadForm } from "@/components/booking-actions";
import { leadFormConfigured } from "@/lib/lead-form";

/**
 * Contact card for /contact.
 *
 * This used to be a form that built a mailto: URL and handed the message to
 * whatever mail client the visitor had, which on most phones and on any machine
 * without a configured mail app did nothing at all. Nothing ever reached the
 * practice, and nothing was recorded.
 *
 * It now opens the LeadConnector chat widget that already loads on every page,
 * through the API its loader exposes:
 *
 *   window.leadConnector.chatWidget.openWidget()   // also closeWidget, isActive, isLoaded
 *
 * The widget is inserted after the page load event, so a fast clicker can
 * reach the button before the widget exists. openChat polls briefly rather
 * than assuming, and if the widget never arrives it says so and points at the
 * phone number instead of failing silently.
 *
 * When the agency's inline form embed lands in src/lib/lead-form.ts, that form
 * replaces the button here, same as on the ad landing pages.
 */

type ChatWidget = {
  isLoaded?: boolean;
  openWidget?: () => void;
  isActive?: () => boolean;
};

declare global {
  interface Window {
    leadConnector?: { chatWidget?: ChatWidget };
  }
}

/** Resolves true once the widget has been asked to open. */
async function openChat(): Promise<boolean> {
  for (let attempt = 0; attempt < 12; attempt++) {
    const widget = window.leadConnector?.chatWidget;
    if (widget?.isLoaded && typeof widget.openWidget === "function") {
      widget.openWidget();
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return false;
}

export default function ContactForm({ locale = "en" }: { locale?: "en" | "es" }) {
  const [status, setStatus] = useState<"idle" | "opening" | "unavailable">("idle");
  const spanish = locale === "es";

  async function handleClick() {
    setStatus("opening");
    setStatus((await openChat()) ? "idle" : "unavailable");
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-7 shadow-sm sm:p-9">
      <h2 className="font-serif text-2xl text-navy">{spanish ? "Envíenos un mensaje" : "Send us a message"}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">
        {spanish
          ? "Pregúntenos sobre su dolor, los procedimientos o el seguro. Por lo general respondemos en un día hábil. Para pedir o cambiar una cita, use el "
          : "Ask us anything about your pain, our procedures, or insurance. We typically respond within one business day. To book or reschedule a visit, use our "}
        <Link href={spanish ? "/es/request-appointment" : "/request-appointment"} data-analytics-location="contact-form" className="font-medium text-brass-text underline">
          {spanish ? "calendario en línea" : "online scheduler"}
        </Link>
        .
      </p>

      {leadFormConfigured ? (
        <LeadForm />
      ) : (
        <>
          <button
            type="button"
            onClick={handleClick}
            aria-live="polite"
            className="mt-6 w-full border border-brass bg-navy px-6 py-3.5 text-center font-sans text-sm font-semibold uppercase tracking-wide text-off-white transition-colors hover:bg-navy-deep disabled:opacity-70"
            disabled={status === "opening"}
          >
            {status === "opening" ? (spanish ? "Abriendo…" : "Opening…") : spanish ? "Envíenos un mensaje" : "Send us a message"}
          </button>
          {status === "unavailable" ? (
            <p role="status" className="mt-3 text-sm leading-relaxed text-charcoal-soft">
              {spanish ? "La ventana de mensajes no está cargando. Llámenos al " : "Our message window isn’t loading. Call us at "}
              <a href={practice.phoneHref} data-phone={practice.phone} data-analytics-location="contact-form" className="font-semibold text-brass-text underline tabular-nums phone">
                {practice.phone}
              </a>{" "}
              {spanish ? "y seguimos desde ahí." : "and we will pick it up from there."}
            </p>
          ) : null}
        </>
      )}

      <p className="mt-6 border-t border-line pt-6 text-xs leading-relaxed text-muted">
        {spanish
          ? "No envíe datos médicos ni nada que considere privado por la ventana de mensajes, y no la use en una emergencia. Si es una emergencia, llame al 911."
          : "Please don’t send medical details or anything you consider private through the message window, and don’t use it for emergencies. If this is an emergency, call 911."}
      </p>
    </div>
  );
}
