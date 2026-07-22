import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/work/Work";
import { BlogPreview } from "@/components/blog/BlogPreview";
import { Contact } from "@/components/contact/Contact";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <Hero />
      <Work locale={locale as Locale} />
      <BlogPreview locale={locale as Locale} />
      <Contact />
    </main>
  );
}
