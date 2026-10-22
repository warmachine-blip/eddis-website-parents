import type { Metadata } from "next";
import { languageAlternates } from "@/lib/spanish";

/** hreflang only. Title and description stay on the page, for the other draft. */
export const metadata: Metadata = {
  alternates: languageAlternates("/dr-edward-baumgartner", "/es/dr-edward-baumgartner"),
};

export default function HreflangLayout({ children }: { children: React.ReactNode }) {
  return children;
}
