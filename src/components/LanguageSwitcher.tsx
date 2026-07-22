"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Switcher RO/EN. Păstrează pathname-ul curent (`usePathname` din
 * `@/i18n/navigation` întoarce calea FĂRĂ prefixul de limbă), deci
 * schimbarea limbii nu te trimite înapoi pe homepage.
 */
export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className="flex items-center gap-1 font-mono text-xs"
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((code, i) => {
        const isActive = code === locale;
        return (
          <span key={code} className="flex items-center">
            {i > 0 && <span className="px-1 text-border">|</span>}
            <button
              type="button"
              lang={code}
              aria-current={isActive ? "true" : undefined}
              disabled={isActive || isPending}
              onClick={() =>
                startTransition(() => router.replace(pathname, { locale: code }))
              }
              className={
                isActive
                  ? "text-gold"
                  : "text-text-muted transition-colors duration-300 hover:text-text"
              }
            >
              {t(code)}
            </button>
          </span>
        );
      })}
    </div>
  );
}
