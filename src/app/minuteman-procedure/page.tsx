import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/service-detail-template";
import { serviceDetails } from "@/lib/service-details";

const data = serviceDetails["minuteman-procedure"];

export const metadata: Metadata = {
  title: "Minuteman SI Joint Fusion — HTx Pain Institute Houston · HTx Pain Institute",
  description: data.metaDescription,
};

export default function Page() {
  return <ServiceDetailTemplate data={data} />;
}
