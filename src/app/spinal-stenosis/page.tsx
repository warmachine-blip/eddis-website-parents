import type { Metadata } from "next";
import { socialImage } from "@/lib/metadata";
import ConditionDetailTemplate from "@/components/condition-detail-template";
import { conditionDetails } from "@/lib/condition-details";

const data = conditionDetails["spinal-stenosis"];

export const metadata: Metadata = {
  title: `${data.title} in Houston`,
  description: data.metaDescription,
  ...socialImage(data.slug, data.heroImageAlt),
};

export default function Page() {
  return <ConditionDetailTemplate data={data} />;
}
