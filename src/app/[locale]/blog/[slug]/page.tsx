import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getAllPosts, getPost, localized } from "@/lib/mdx";
import { routing, type Locale } from "@/i18n/routing";
import { PostMeta } from "@/components/blog/PostMeta";
import { ThreadSeparator } from "@/components/motion/ThreadSeparator";

type Props = { params: Promise<{ locale: string; slug: string }> };

// Toate combinațiile limbă × articol, prerandate la build.
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const { title, excerpt } = localized(post, locale as Locale);
  return {
    title,
    description: excerpt,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: { ro: `/ro/blog/${slug}`, en: `/en/blog/${slug}` },
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const { title } = localized(post, locale as Locale);
  const { content } = await compileMDX({ source: post.content });

  return (
    <main id="main" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <div className="mx-auto w-full min-w-0 max-w-[720px]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-muted transition-colors duration-300 hover:text-text"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {t("back")}
        </Link>

        <h1 className="u-display mt-8 text-[length:var(--step-section)]">
          {title}
        </h1>

        <div className="mt-5">
          <PostMeta
            date={post.date}
            readingMinutes={post.readingMinutes}
            draft={post.draft}
          />
        </div>

        <ThreadSeparator className="mt-8" />

        {/* `prose` local: stilurile de tipografie sunt în globals.css, ca să
            nu adăugăm @tailwindcss/typography doar pentru două articole. */}
        <article className="u-prose mt-12">{content}</article>
      </div>
    </main>
  );
}
