import type { Metadata } from "next";
import { socialImage } from "@/lib/metadata";
import ServiceDetailTemplate from "@/components/service-detail-template";
import { serviceDetails } from "@/lib/service-details";

const data = serviceDetails["si-joint-fusions"];

export const metadata: Metadata = {
  title: `${data.title} in Houston`,
  description: data.metaDescription,
  ...socialImage(data.slug, data.heroImageAlt),
};

export default function Page() {
  return <ServiceDetailTemplate data={data} />;
}
