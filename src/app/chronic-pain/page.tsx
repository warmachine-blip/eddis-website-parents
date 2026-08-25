import type { Metadata } from "next";
import ConditionDetailTemplate from "@/components/condition-detail-template";
import { conditionDetails } from "@/lib/condition-details";

const data = conditionDetails["chronic-pain"];

export const metadata: Metadata = {
  title: `${data.title} — Houston Specialist Care · HTx Pain Institute`,
  description: data.metaDescription,
};

export default function Page() {
  return <ConditionDetailTemplate data={data} />;
}
