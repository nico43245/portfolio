"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * Comutator între ivoriu și cerneală.
 *
 * Sursa de adevăr e atributul `data-theme` de pe <html>, pus deja de
 * scriptul inline din layout înainte de prima pictare. Componenta doar
 * îl citește la montare și îl schimbă — nu decide ea tema inițială,
 * altfel ar apărea un flash până la hidratare.
 *
 * Randează un buton cu etichetă fixă până se montează, ca marcajul de pe
 * server să coincidă cu primul randat pe client (fără hydration
 * mismatch). Alegerea se ține în localStorage; fără ea se urmează
 * preferința sistemului.
 */
export function ThemeToggle() {
  const t = useTranslations("theme");
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // În rAF, nu sincron: regula react-hooks/set-state-in-effect. Citim
    // tema pusă de scriptul din <head>, nu o decidem noi.
    const frame = requestAnimationFrame(() => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "dark" ? "dark" : "light");
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Mod privat sau stocare blocată: tema funcționează pentru sesiunea
      // curentă, doar nu se ține minte. Nu merită să spargem pagina.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      // Până la montare nu știm tema reală, deci nu promitem una anume.
      aria-label={mounted ? t(theme === "dark" ? "toLight" : "toDark") : t("toggle")}
      className="inline-flex h-8 w-8 items-center justify-center rounded-btn text-text-muted transition-colors duration-300 hover:text-text"
    >
      {mounted && theme === "dark" ? (
        <Sun size={16} aria-hidden="true" />
      ) : (
        <Moon size={16} aria-hidden="true" />
      )}
    </button>
  );
}
