import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllPosts, localized } from "@/lib/mdx";
import { routing, type Locale } from "@/i18n/routing";
import { PostMeta } from "@/components/blog/PostMeta";
import { Reveal } from "@/components/motion/Reveal";
import { ThreadSeparator } from "@/components/motion/ThreadSeparator";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { ro: "/ro/blog", en: "/en/blog" },
    },
  };
}

export default async function BlogIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await getAllPosts();

  return (
    <main id="main" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <div className="mx-auto w-full min-w-0 max-w-[1200px]">
        <p className="u-eyebrow">{t("eyebrow")}</p>
        <h1 className="u-display mt-4 text-[length:var(--step-section)]">
          {t("title")}
        </h1>
        <ThreadSeparator className="mt-8" />

        <ul className="mt-16 divide-y divide-border border-y border-border">
          {posts.map((post, i) => {
            const { title, excerpt } = localized(post, locale as Locale);
            return (
              <Reveal key={post.slug} index={i} as="li">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-3 py-8 md:flex-row md:items-baseline md:justify-between md:gap-10"
                >
                  <div className="min-w-0">
                    <h2 className="u-display text-xl transition-colors duration-300 group-hover:text-accent md:text-2xl">
                      {title}
                    </h2>
                    <p className="mt-2 max-w-[60ch] text-sm text-text-muted">
                      {excerpt}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <PostMeta
                      date={post.date}
                      readingMinutes={post.readingMinutes}
                      draft={post.draft}
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
