import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer({ showBlog }: { showBlog: boolean }) {
  const t = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-8 md:px-10">
      <div className="mx-auto flex w-full min-w-0 max-w-[1200px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="u-display text-lg">
          NG<span className="sr-only"> — {t("home")}</span>
        </Link>

        <nav aria-label={t("secondary")}>
          <ul className="flex flex-wrap items-center gap-5 text-sm">
            <li>
              <Link
                href="/#work"
                className="text-text-muted transition-colors duration-300 hover:text-text"
              >
                {t("work")}
              </Link>
            </li>
            {showBlog && (
              <li>
                <Link
                  href="/blog"
                  className="text-text-muted transition-colors duration-300 hover:text-text"
                >
                  {t("blog")}
                </Link>
              </li>
            )}
            <li>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors duration-300 hover:text-text"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <LanguageSwitcher />
          <p className="font-mono text-xs text-text-muted">
            © {year} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
