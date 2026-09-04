import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { conditions } from "@/lib/conditions";
import { serviceAreas, aboutNav } from "@/lib/nav";
import { SITE_URL } from "@/lib/site";
import { lastModified } from "@/lib/last-modified";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/pain-center", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/locations", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/about-us", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/patients", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/insurance", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/video-library", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/second-opinion", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/request-appointment", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/injuries-pain", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/work-injuries-accidents", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/motor-vehicle-injuries", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/community/imas-home", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms-of-use", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/hipaa-notice", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Per-route last commit dates from scripts/last-modified.mjs; newest date as fallback.
  const newest = Object.values(lastModified).sort().at(-1) ?? new Date().toISOString().slice(0, 10);
  const modified = (p: string) => new Date(lastModified[p] ?? newest);

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: modified(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  for (const service of services) {
    entries.push({
      url: `${SITE_URL}${service.href}`,
      lastModified: modified(service.href),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const condition of conditions) {
    entries.push({
      url: `${SITE_URL}${condition.href}`,
      lastModified: modified(condition.href),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const location of serviceAreas) {
    entries.push({
      url: `${SITE_URL}${location.href}`,
      lastModified: modified(location.href),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const person of aboutNav) {
    if (person.href === "/about-us") continue;
    entries.push({
      url: `${SITE_URL}${person.href}`,
      lastModified: modified(person.href),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
