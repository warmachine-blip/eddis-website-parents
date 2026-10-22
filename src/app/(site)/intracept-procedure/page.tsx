import type { Metadata } from "next";
import { socialImage } from "@/lib/metadata";
import ServiceDetailTemplate from "@/components/service-detail-template";
import { serviceDetails } from "@/lib/service-details";

const data = serviceDetails["intracept-procedure"];

// Absolute: the procedure name plus Houston, Texas does not fit the title template.
const title = "Basivertebral Nerve Ablation (BVN) in Houston, Texas";

export const metadata: Metadata = {
  title: { absolute: title },
  description: data.metaDescription,
  ...socialImage(data.slug, data.heroImageAlt),
};

export default function Page() {
  return <ServiceDetailTemplate data={data} pageName={title} />;
}
