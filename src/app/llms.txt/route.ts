import { llmsText } from "@/lib/llms";

/**
 * /llms.txt, a plain-text summary of the practice. The text is built from nav
 * and insurance data, and the handler does not read the request. GET handlers
 * are dynamic unless opted into prerendering.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
