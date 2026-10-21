import ChatGreeting from "@/components/chat-greeting";
import ChatWidgetLoader from "@/components/chat-widget-loader";

/**
 * The LeadConnector chat widget, plus the greeting fix that goes with it.
 *
 * Extracted from src/components/site-chrome.tsx when the agency asked for the
 * widget on the /lp ad landing pages too. Both entry points render this, so the
 * widget id and the loading strategy exist once. A second copy of the id
 * somewhere else is how two chat bubbles end up on one page.
 *
 * ChatGreeting is not optional decoration: it is what hides the greeting bubble
 * on phones, and it has to travel with the widget or the landing pages get the
 * greeting back on mobile. See that file for why the rule has to go inside the
 * widget's shadow root.
 *
 * The loader waits for the page load event, same reason the old lazyOnload
 * script did: a script that runs before load still counts against the page's
 * blocking time, and nobody needs the chat bubble in the first second. It also
 * installs the URL guard before the vendor script exists. See
 * src/components/chat-widget-loader.tsx.
 */
export default function ChatWidget() {
  return (
    <>
      <ChatGreeting />
      <ChatWidgetLoader />
    </>
  );
}
