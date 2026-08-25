import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { conditions } from "@/lib/conditions";
import { locationsNav, aboutNav } from "@/lib/nav";
import { SITE_URL } from "@/lib/site";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/pain-center", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about-us", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/patients", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/insurance", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/video-library", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/second-opinion", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/request-appointment", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/work-injuries-accidents", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/motor-vehicle-injuries", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/community/imas-home", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms-of-use", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/hipaa-notice", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  for (const service of services) {
    entries.push({
      url: `${SITE_URL}${service.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const condition of conditions) {
    entries.push({
      url: `${SITE_URL}${condition.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const location of locationsNav) {
    entries.push({
      url: `${SITE_URL}${location.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const person of aboutNav) {
    if (person.href === "/about-us") continue;
    entries.push({
      url: `${SITE_URL}${person.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
