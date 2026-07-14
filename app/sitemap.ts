import type { MetadataRoute } from "next";

const SITE_URL = "https://alibaba-pizza.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/en", "/fr", "/privacy", "/cookies"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
