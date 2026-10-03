import Script from "next/script";
import ChatGreeting from "@/components/chat-greeting";

/**
 * The LeadConnector chat widget, plus the greeting fix that goes with it.
 *
 * Extracted from src/components/site-chrome.tsx when the agency asked for the
 * widget on the /lp ad landing pages too. Both entry points render this, so the
 * widget id and the loading strategy exist once — a second copy of the id
 * somewhere else is how two chat bubbles end up on one page.
 *
 * ChatGreeting is not optional decoration: it is what hides the greeting bubble
 * on phones, and it has to travel with the widget or the landing pages get the
 * greeting back on mobile. See that file for why the rule has to go inside the
 * widget's shadow root.
 *
 * lazyOnload, not defer: a deferred script still runs before the load event and
 * counts against the page's blocking time, while nobody needs the chat bubble
 * in the first second. Loading it after load keeps it out of LCP and TBT
 * entirely — which matters more on a paid landing page than anywhere else.
 */
export default function ChatWidget() {
  return (
    <>
      <ChatGreeting />
      <Script
        id="leadconnector-chat"
        strategy="lazyOnload"
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="66840b4e178c31f522476378"
      />
    </>
  );
}
