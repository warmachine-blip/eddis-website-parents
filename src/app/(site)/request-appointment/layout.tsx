import type { Metadata } from "next";
import { languageAlternates } from "@/lib/spanish";

/** hreflang only. Title and description stay on the page, for the other draft. */
export const metadata: Metadata = {
  alternates: languageAlternates("/request-appointment", "/es/request-appointment"),
};

export default function HreflangLayout({ children }: { children: React.ReactNode }) {
  return children;
}
