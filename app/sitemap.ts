import type { MetadataRoute } from "next";
import { site } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/menu", "/locations", "/gallery", "/contact", "/reservation"];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}