import type { Metadata } from "next";
import LocationDetailTemplate from "@/components/location-detail-template";
import { locationDetails } from "@/lib/location-details";
import { languageAlternates } from "@/lib/spanish";

const data = locationDetails["champions"];

export const metadata: Metadata = {
  title: `Pain Doctor in ${data.city}, TX`,
  description: data.metaDescription,
  alternates: languageAlternates("/locations/champions", "/es/locations/champions"),
};

export default function Page() {
  return <LocationDetailTemplate data={data} />;
}
