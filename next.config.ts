import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { SITE_URL } from "./src/lib/site";
import { HTX_PAIN_CARE_PATHS, TX_PAIN_SPECIALISTS_PATHS } from "./src/lib/legacy-urls";
import { HTX_PAIN_CARE_BLOG_PATHS } from "./src/lib/blog-redirects";

/**
 * Domains that used to serve this practice, 301'd to SITE_URL. Host values are
 * anchored regexes matched against the lowercased, port-stripped Host header.
 *
 * These only run on requests this app actually receives, so each domain below
 * must also be added to the Vercel project (Settings -> Domains) and left
 * pointing here rather than given Vercel's own "Redirect to" setting — the
 * rules below handle the redirect, and doing both would double-hop.
 */
const HTX_PAIN_CARE_HOST = "(?:www\\.)?htxpaincare\\.com";

/**
 * The practice's Texas Interventional Pain Specialists domain. It is still
 * owned, and until this ships it forwards to htxpaincare.com at the registrar —
 * but only from the root: every deeper path returns a bare 404, so today every
 * inbound link to an old TIPS page is discarded. These rules replace that
 * forwarding, which has to be switched off at the registrar once DNS points
 * here, or the request never reaches this app.
 */
const TX_PAIN_SPECIALISTS_HOST = "(?:www\\.)?txpainspecialists\\.com";

/** Per-path 301s off one legacy host, for URLs the new site spells differently. */
const pathRedirects = (hostPattern: string, paths: Record<string, string>) =>
  Object.entries(paths).map(([from, to]) => ({
    source: from,
    has: [{ type: "host" as const, value: hostPattern }],
    destination: `${SITE_URL}${to}`,
    statusCode: 301 as const,
  }));

/** Catch-all 301 off one legacy host, keeping the requested path. */
const domainRedirect = (hostPattern: string) => ({
  source: "/:path*",
  has: [{ type: "host" as const, value: hostPattern }],
  destination: `${SITE_URL}/:path*`,
  statusCode: 301 as const,
});

const nextConfig: NextConfig = {
  images: {
    // Next 16 serves only the qualities declared here; 60 is used for the large
    // photographic heroes, where the extra bytes at 75 buy nothing visible.
    qualities: [60, 75],
  },
  async headers() {
    return [
      {
        // Photos and the hero video change by filename, so they can be cached for a year.
        source: "/:dir(images|videos)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      // ---- Old domains -> htxpaininstitute.com -------------------------------
      // Per-path remaps run first: a page the new site spells differently has to
      // reach its real URL, not a 404 at the old path on the new domain.
      ...pathRedirects(HTX_PAIN_CARE_HOST, HTX_PAIN_CARE_PATHS),
      // The old WordPress blog. Only the posts that did not survive appear here;
      // a kept post keeps its slug and is carried by domainRedirect below.
      ...pathRedirects(HTX_PAIN_CARE_HOST, HTX_PAIN_CARE_BLOG_PATHS),
      ...pathRedirects(TX_PAIN_SPECIALISTS_HOST, TX_PAIN_SPECIALISTS_PATHS),
      // Everything else on a legacy domain keeps its path and only changes host.
      // Most old TIPS paths do not exist here, so this lands them on a 404 at
      // the canonical domain — which still beats serving the whole site twice.
      domainRedirect(HTX_PAIN_CARE_HOST),
      domainRedirect(TX_PAIN_SPECIALISTS_HOST),

      // ---- Within this site -------------------------------------------------
      // Legacy URL structure used by third-party listings (txtopdocs.com among
      // them). None of these paths ever existed here; mapping them keeps those
      // backlinks resolving instead of 404ing.
      { source: "/services/intracept", destination: "/intracept-procedure", statusCode: 301 },
      { source: "/services/spinal-cord-stimulation", destination: "/spinal-cord-stimulation-specialist", statusCode: 301 },
      { source: "/services/radiofrequency-ablation", destination: "/radiofrequency-ablation", statusCode: 301 },
      { source: "/services/si-joint-fusion", destination: "/si-joint-fusions", statusCode: 301 },
      { source: "/services/kyphoplasty", destination: "/kyphoplasty-specialist", statusCode: 301 },
      { source: "/services/mild", destination: "/mild-procedure", statusCode: 301 },
      { source: "/services/prp", destination: "/prp-procedure", statusCode: 301 },
      { source: "/services/epidural-injections", destination: "/injections-blocks-specialist", statusCode: 301 },
      { source: "/conditions/motor-vehicle-injuries", destination: "/motor-vehicle-injuries", statusCode: 301 },
      { source: "/conditions/work-injuries", destination: "/work-injuries-accidents", statusCode: 301 },
      // Not on the listing, but the obvious parent of the two above.
      { source: "/conditions", destination: "/pain-center", statusCode: 301 },
      // Cancer pain management is medication-led and outside this practice's
      // scope, so the page was withdrawn; send its traffic to the conditions hub.
      {
        source: "/cancer-pain",
        destination: "/pain-center",
        statusCode: 301,
      },
      // The branded icon is generated by src/app/icon.tsx; send legacy /favicon.ico probes there.
      {
        source: "/favicon.ico",
        destination: "/icon",
        statusCode: 301,
      },
    ];
  },
};

/**
 * Article bodies are .mdx files in src/content/blog, imported by the post
 * route. `pageExtensions` is deliberately NOT widened to include mdx: these are
 * content, not routes — the only blog route is src/app/blog/[slug]/page.tsx.
 */
export default createMDX()(nextConfig);
