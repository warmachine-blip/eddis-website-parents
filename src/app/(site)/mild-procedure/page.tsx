import type { Metadata } from "next";
import { socialImage } from "@/lib/metadata";
import ServiceDetailTemplate from "@/components/service-detail-template";
import { serviceDetails } from "@/lib/service-details";

const data = serviceDetails["mild-procedure"];

const title = "MILD Procedure in Houston, Texas";

export const metadata: Metadata = {
  title,
  description: data.metaDescription,
  ...socialImage(data.slug, data.heroImageAlt),
};

export default function Page() {
  return <ServiceDetailTemplate data={data} pageName={`${title} · HTx Pain Institute`} />;
}
