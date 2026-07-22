import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getAllPosts, localized } from "@/lib/mdx";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { PostMeta } from "./PostMeta";

/** Ultimele 3 articole (spec §5.3). */
export async function BlogPreview({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = (await getAllPosts()).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full min-w-0 max-w-[1200px]">
        <SectionHeading number="02" eyebrow={t("eyebrow")} title={t("title")} />

        <ul className="mt-16 divide-y divide-border border-y border-border">
          {posts.map((post, i) => {
            const { title, excerpt } = localized(post, locale);
            return (
              <Reveal key={post.slug} index={i} as="li">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-3 py-8 transition-colors duration-300 md:flex-row md:items-baseline md:justify-between md:gap-10"
                >
                  <div className="min-w-0">
                    <h3 className="u-display text-xl transition-colors duration-300 group-hover:text-gold md:text-2xl">
                      {title}
                    </h3>
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

        <Link
          href="/blog"
          className="mt-10 inline-flex items-center gap-2 text-sm text-gold transition-colors duration-300 hover:text-gold-soft"
        >
          {t("all")}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
