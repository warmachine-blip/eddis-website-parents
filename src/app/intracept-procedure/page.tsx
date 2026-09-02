import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/service-detail-template";
import { serviceDetails } from "@/lib/service-details";

const data = serviceDetails["intracept-procedure"];

export const metadata: Metadata = {
  title: `${data.title} in Houston`,
  description: data.metaDescription,
};

export default function Page() {
  return <ServiceDetailTemplate data={data} />;
}
