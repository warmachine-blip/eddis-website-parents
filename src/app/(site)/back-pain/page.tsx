import type { Metadata } from "next";
import { socialImage } from "@/lib/metadata";
import ConditionDetailTemplate from "@/components/condition-detail-template";
import { conditionDetails } from "@/lib/condition-details";

const data = conditionDetails["back-pain"];

export const metadata: Metadata = {
  title: "Back Pain Doctor in Houston and Humble",
  description: data.metaDescription,
  ...socialImage(data.slug, data.heroImageAlt),
};

export default function Page() {
  return <ConditionDetailTemplate data={data} />;
}
