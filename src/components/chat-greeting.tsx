"use client";

import { useEffect } from "react";

/**
 * Hides the LeadConnector chat widget's greeting bubble on phones, leaving the
 * chat button itself alone.
 *
 * The widget renders into an open shadow root on a <chat-widget> host:
 *
 *   chat-widget                                  (host, light DOM)
 *   └── #shadow-root
 *       └── div#lc_text-widget
 *           ├── style                            (the widget's own CSS)
 *           ├── div.lc_text-widget--prompt       <- the greeting
 *           └── button#lc_text-widget--btn       <- the chat button, untouched
 *
 * Two consequences, both of which rule out the approaches usually suggested for
 * this. A stylesheet on the page cannot match anything inside a shadow root, so
 * global CSS does nothing however broad the selector. And a MutationObserver on
 * <body> never sees these nodes either, because they are not in the document
 * tree — it would have to observe the shadow root itself.
 *
 * So the rule goes inside the shadow root. That is possible because the root is
 * open, and it is the narrowest fix available: one media query on one class,
 * scoped to this widget, leaving the button and the widget's own styles alone.
 *
 * The widget loads with strategy="lazyOnload" and mounts whenever it is ready,
 * so nothing here assumes it already exists: an observer waits for the host,
 * and a second observer re-applies the style if the widget ever replaces the
 * subtree it lives in.
 */

const STYLE_MARKER = "data-htx-chat-greeting";

/** Tailwind's md breakpoint is 768px, so "under 768" is up to 767.98. */
const CSS = `@media (max-width: 767.98px) {
  .lc_text-widget--prompt { display: none !important; }
}`;

function applyTo(root: ShadowRoot) {
  if (root.querySelector(`style[${STYLE_MARKER}]`)) return;
  const style = document.createElement("style");
  style.setAttribute(STYLE_MARKER, "");
  style.textContent = CSS;
  root.appendChild(style);
}

export default function ChatGreeting() {
  useEffect(() => {
    const observers: MutationObserver[] = [];
    let timer: number | undefined;

    function hookUp(host: Element) {
      const root = (host as Element & { shadowRoot: ShadowRoot | null }).shadowRoot;
      if (!root) return false;
      applyTo(root);
      // The widget re-renders its own subtree; put the rule back if it goes.
      const inner = new MutationObserver(() => applyTo(root));
      inner.observe(root, { childList: true });
      observers.push(inner);
      return true;
    }

    /** The host can exist a beat before its shadow root does. */
    function attempt() {
      const host = document.querySelector("chat-widget");
      if (host && hookUp(host)) return true;
      if (host) timer = window.setTimeout(attempt, 100);
      return false;
    }

    if (!attempt()) {
      const outer = new MutationObserver(() => {
        if (document.querySelector("chat-widget")) {
          outer.disconnect();
          attempt();
        }
      });
      outer.observe(document.documentElement, { childList: true, subtree: true });
      observers.push(outer);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return null;
}
