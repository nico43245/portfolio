import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { GoldThread } from "./GoldThread";

/**
 * Hero (spec §5.1). Server Component — nu trimite JS către client.
 *
 * Orchestrarea din §8 e făcută prin CSS `.u-rise` + `--rise-delay`, nu prin
 * motion: textul rămâne vizibil dacă JS-ul nu rulează și pictează fără să
 * aștepte hidratarea.
 *
 * Delay-urile sunt scurte intenționat. Spec-ul cere firul întâi, apoi
 * titlul, dar titlul e elementul LCP: la 600ms delay Lighthouse măsura
 * 4.1s. Firul se desenează acum în paralel cu titlul — aceeași senzație
 * de orchestrare, fără să amâne pictarea conținutului principal.
 */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[92svh] items-center px-6 md:px-10">
      {/* min-w-0: fără el, `min-width: auto` al flex item-ului îl împiedică
          să se strângă sub lățimea min-content a firului SVG, ceea ce
          producea scroll orizontal pe mobil. */}
      <div className="mx-auto w-full min-w-0 max-w-[1200px] py-24">
        <p
          className="u-eyebrow u-rise"
          style={{ "--rise-delay": "60ms" } as React.CSSProperties}
        >
          {t("eyebrow")}
        </p>

        <h1
          className="u-display u-rise-y mt-6 text-[length:var(--step-display)]"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          {t("title")}
        </h1>

        {/* Signature element (§4.5) — se desenează în paralel cu titlul */}
        <div className="mt-8 max-w-[560px]">
          <GoldThread />
        </div>

        <p
          className="u-rise mt-8 max-w-[52ch] text-text-muted"
          style={{ "--rise-delay": "260ms" } as React.CSSProperties}
        >
          {t("subtitle")}
        </p>

        <div
          className="u-rise mt-12 flex flex-wrap gap-4"
          style={{ "--rise-delay": "340ms" } as React.CSSProperties}
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-btn border border-gold px-6 py-3 text-sm text-gold transition-colors duration-300 hover:bg-gold hover:text-bg active:scale-[0.98]"
          >
            {t("ctaPrimary")}
            <ArrowDown
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-btn border border-border px-6 py-3 text-sm text-text-muted transition-colors duration-300 hover:border-text-muted hover:text-text active:scale-[0.98]"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
