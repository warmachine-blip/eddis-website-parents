import type { Metadata } from "next";
import ConditionDetailTemplate from "@/components/condition-detail-template";
import { conditionDetails } from "@/lib/condition-details";

const data = conditionDetails["sciatica"];

export const metadata: Metadata = {
  title: `${data.title} in Houston`,
  description: data.metaDescription,
};

export default function Page() {
  return <ConditionDetailTemplate data={data} />;
}
