import type { Metadata } from "next";
import LocationDetailTemplate from "@/components/location-detail-template";
import { locationDetails } from "@/lib/location-details";

const data = locationDetails["the-woodlands"];

export const metadata: Metadata = {
  title: `Pain Doctor in ${data.city} — HTx Pain Institute`,
  description: data.metaDescription,
};

export default function Page() {
  return <LocationDetailTemplate data={data} />;
}
