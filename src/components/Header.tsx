"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Nav sticky care se ascunde la scroll în jos și reapare la scroll în sus
 * (spec §8).
 *
 * Deliberat fără `motion`: o singură translație nu justifică o bibliotecă
 * de animație în bundle-ul de client. Un listener pasiv plus o tranziție
 * CSS fac același lucru, iar `motion` iese complet din bundle.
 *
 * Sub `prefers-reduced-motion` blocul global din globals.css anulează
 * tranziția — bara sare direct în poziție, fără alunecare.
 */
export function Header() {
  const t = useTranslations("nav");
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      // Sub 120px rămâne mereu vizibil, ca să nu pâlpâie lângă hero.
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#work", label: t("work") },
    { href: "/blog", label: t("blog") },
    { href: "/#contact", label: t("contact") },
  ];

  return (
    <header
      data-hidden={hidden || undefined}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[hidden]:-translate-y-full"
    >
      <nav
        aria-label={t("primary")}
        className="mx-auto flex h-16 w-full min-w-0 max-w-[1200px] items-center justify-between gap-4 px-6 md:px-10"
      >
        {/* Fără aria-label care înlocuiește textul: numele accesibil trebuie
            să conțină textul vizibil („NG"), altfel comanda vocală „click NG"
            nu găsește linkul. Contextul vine din sr-only. */}
        <Link href="/" className="u-display text-lg tracking-tight">
          NG<span className="sr-only"> — {t("home")}</span>
        </Link>

        <ul className="flex items-center gap-5 text-sm sm:gap-7">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative text-text-muted transition-colors duration-300 hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-[width] after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <LanguageSwitcher />
      </nav>
    </header>
  );
}
