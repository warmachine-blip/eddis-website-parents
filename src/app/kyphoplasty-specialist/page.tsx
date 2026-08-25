import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/service-detail-template";
import { serviceDetails } from "@/lib/service-details";

const data = serviceDetails["kyphoplasty-specialist"];

export const metadata: Metadata = {
  title: `${data.title} in Houston · HTx Pain Institute`,
  description: data.metaDescription,
};

export default function Page() {
  return <ServiceDetailTemplate data={data} />;
}
