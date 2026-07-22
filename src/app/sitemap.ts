import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/mdx";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE.url}/${locale}`,
      lastModified: new Date(),
      priority: 1,
    });
    entries.push({
      url: `${SITE.url}/${locale}/blog`,
      lastModified: new Date(),
      priority: 0.7,
    });
    for (const post of posts) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        priority: 0.5,
      });
    }
  }

  return entries;
}
