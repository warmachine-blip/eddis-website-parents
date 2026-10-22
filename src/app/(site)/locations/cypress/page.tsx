import type { Metadata } from "next";
import LocationDetailTemplate from "@/components/location-detail-template";
import { locationDetails } from "@/lib/location-details";
import { languageAlternates } from "@/lib/spanish";

const data = locationDetails["cypress"];

export const metadata: Metadata = {
  title: `Pain Doctor in ${data.city}, TX`,
  description: data.metaDescription,
  alternates: languageAlternates("/locations/cypress", "/es/locations/cypress"),
};

export default function Page() {
  return <LocationDetailTemplate data={data} />;
}
