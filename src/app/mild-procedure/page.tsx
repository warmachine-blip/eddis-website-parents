import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/service-detail-template";
import { serviceDetails } from "@/lib/service-details";

const data = serviceDetails["mild-procedure"];

export const metadata: Metadata = {
  title: "MILD Procedure — HTx Pain Institute Houston · HTx Pain Institute",
  description: data.metaDescription,
};

export default function Page() {
  return <ServiceDetailTemplate data={data} />;
}
