import { practice } from "@/lib/nav";
import CopyrightYear from "@/components/copyright-year";

/**
 * One line, and nothing else. SiteFooter renders five columns of links built
 * from src/lib/nav.ts; none of that may appear on an ad landing page.
 *
 * The privacy link is a plain <a> so it does not prefetch, and /privacy carries
 * no mention of the disallowed treatment class — checked, and worth re-checking
 * if that page is ever edited, since it is the only site page these link to.
 */
export default function LpFooter() {
  return (
    <footer className="border-t border-line bg-off-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6 py-6 text-center text-xs text-muted lg:px-10">
        <p>
          &copy; <CopyrightYear /> {practice.name}. All rights reserved.
        </p>
        <span aria-hidden="true">&middot;</span>
        <a href="/privacy" className="underline underline-offset-2 hover:text-brass-text">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
