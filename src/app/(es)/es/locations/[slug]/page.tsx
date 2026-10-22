import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationDetailTemplate from "@/components/location-detail-template";
import { locationDetails } from "@/lib/location-details";
import { spanishLocation } from "@/lib/location-details-es";
import { spanishPageMetadata } from "@/lib/spanish";

export function generateStaticParams() {
  return Object.keys(locationDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = spanishLocation(slug);
  if (!data) return {};
  const title = data.city === "Northwest Houston" ? "Dolor en NW Houston" : `Dolor en ${data.city}`;
  return spanishPageMetadata({
    title,
    description: data.metaDescription,
    en: `/locations/${slug}`,
    es: `/es/locations/${slug}`,
  });
}

export default async function SpanishLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = spanishLocation(slug);
  if (!data) notFound();
  return <LocationDetailTemplate data={data} locale="es" />;
}
