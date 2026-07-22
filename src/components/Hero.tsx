import { useTranslations } from "next-intl";
import { ArrowDown, ArrowRight } from "lucide-react";
import { InkThread } from "./InkThread";

/**
 * Hero (spec §5.1, direcția „editorial ivoriu"). Server Component — nu
 * trimite JS către client.
 *
 * Compoziție de revistă: numele pe două rânduri, uriaș, în Fraunces;
 * dedesubt linia de cerneală și un singur paragraf. CTA-urile sunt
 * linkuri de text cu săgeată — pe hârtie, butoanele cu ramă arată a
 * formular, nu a editorial.
 *
 * Orchestrarea din §8 e făcută prin CSS `.u-rise` + `--rise-delay`, nu
 * prin JS: textul rămâne vizibil dacă JS-ul nu rulează și pictează fără
 * să aștepte hidratarea.
 *
 * Titlul e elementul LCP — animat doar cu transform (`.u-rise-y`, fără
 * opacity), altfel Lighthouse amână LCP-ul până la finalul animației.
 */
export function Hero() {
  const t = useTranslations("hero");
  const titleLines = t("title").split(" ");

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
          className="u-display u-rise-y mt-8 text-[length:var(--step-display)]"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          {titleLines.map((line, i) => (
            // Spațiul dintre cuvinte rămâne în textul accesibil („Nicolas
            // Ghizu", nu „NicolasGhizu"); vizual nu se vede, fiind block.
            <span key={line} className="block">
              {line}
              {i < titleLines.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        {/* Signature element (§4.5) — se desenează în paralel cu titlul */}
        <div className="mt-10 max-w-[560px]">
          <InkThread />
        </div>

        <p
          className="u-rise mt-10 max-w-[46ch] text-[length:var(--step-lede)] leading-relaxed text-text-muted"
          style={{ "--rise-delay": "260ms" } as React.CSSProperties}
        >
          {t("subtitle")}
        </p>

        <div
          className="u-rise mt-14 flex flex-wrap items-center gap-x-10 gap-y-4"
          style={{ "--rise-delay": "340ms" } as React.CSSProperties}
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-8 transition-colors duration-300 hover:text-accent-strong hover:decoration-accent-strong"
          >
            {t("ctaPrimary")}
            <ArrowDown
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-300 hover:text-text"
          >
            {t("ctaSecondary")}
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
