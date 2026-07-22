import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/mdx";
import { hasCaseStudy, projects } from "@/lib/projects";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  // Aceeași sursă ca `generateStaticParams` din pagina de proiect, ca
  // sitemap-ul să nu poată ajunge să listeze rute inexistente.
  const cases = projects.filter(hasCaseStudy);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE.url}/${locale}`,
      lastModified: new Date(),
      priority: 1,
    });

    for (const project of cases) {
      entries.push({
        url: `${SITE.url}/${locale}/work/${project.slug}`,
        lastModified: new Date(),
        priority: 0.8,
      });
    }

    // Fără articole publicate ruta /blog dă 404, deci nu intră în sitemap.
    if (posts.length > 0) {
      entries.push({
        url: `${SITE.url}/${locale}/blog`,
        lastModified: new Date(),
        priority: 0.7,
      });
    }
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
