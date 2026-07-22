import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  slug: string;
  title_ro: string;
  title_en: string;
  excerpt_ro: string;
  excerpt_en: string;
  date: string;
  tags: string[];
  /** Articolele schelet sunt marcate vizibil în UI, nu ascunse. */
  draft?: boolean;
};

export type Post = PostFrontmatter & {
  content: string;
  readingMinutes: number;
};

/** ~200 cuvinte/minut, minim 1. */
function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getAllPosts(): Promise<Post[]> {
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const fm = data as PostFrontmatter;
      return {
        ...fm,
        slug: fm.slug ?? file.replace(/\.mdx$/, ""),
        content,
        readingMinutes: readingTime(content),
      };
    }),
  );

  // Cele mai noi primele.
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}

/** Alege câmpul potrivit limbii — frontmatter-ul e bilingv (spec §5.3). */
export function localized(post: Post, locale: Locale) {
  return {
    title: locale === "ro" ? post.title_ro : post.title_en,
    excerpt: locale === "ro" ? post.excerpt_ro : post.excerpt_en,
  };
}
