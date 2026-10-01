import type { Metadata } from "next";
import LandingPageTemplate from "@/components/lp/landing-page-template";
import { landingPages } from "@/lib/lp-pages";

const data = landingPages["si-joint-fusion"];

export const metadata: Metadata = {
  // Absolute: the root layout's title template would append the brand and push
  // this past the 60 characters scripts/check-metadata.mjs allows.
  title: { absolute: data.title },
  description: data.metaDescription,
  // noindex, follow comes from src/app/(lp)/layout.tsx and covers every page here.
};

export default function Page() {
  return <LandingPageTemplate data={data} />;
}
