import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import { hasPosts } from "@/lib/mdx";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "@/styles/globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Prerandează ambele locale la build → SSG (spec §9)
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    // Fără metadataBase, canonical/hreflang rămân relative și Lighthouse
    // le raportează ca invalide.
    metadataBase: new URL(SITE.url),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ro: "/ro",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Necesar pentru randare statică — fără el rutele devin dinamice.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "a11y" });
  const showBlog = await hasPosts();

  return (
    <html lang={locale} className={fontVariables}>
      <head>
        {/* Marchează că JS rulează, ÎNAINTE de prima pictare. Stările
            ascunse ale reveal-urilor sunt prefixate cu `[data-js]` în CSS,
            deci fără acest script conținutul rămâne vizibil (nicio pagină
            goală dacă JS eșuează), iar cu el nu apare flash de conținut.

            Atribut `data-`, nu clasă: React reconciliază `className`-ul lui
            <html>, deci adăugarea unei clase aici ar produce hydration
            mismatch. Un atribut pe care serverul nu l-a randat e ignorat. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-js','')`,
          }}
        />
      </head>
      <body className="bg-bg text-text antialiased">
        <NextIntlClientProvider>
          <a href="#main" className="u-skip-link">
            {t("skipToContent")}
          </a>
          <Header showBlog={showBlog} />
          {children}
          <Footer showBlog={showBlog} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
