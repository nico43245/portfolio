"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";

/**
 * Randările ca teanc de fotografii pe birou: imaginea curentă în față,
 * următoarele două vizibile în spate, ușor rotite și împinse în adâncime.
 *
 * 3D pur CSS (`perspective` + `translate3d`/`rotate`), fără bibliotecă —
 * transformările rulează pe compositor, deci mișcarea nu costă nimic la
 * fiecare cadru.
 *
 * Fiind componentă client, HTML-ul ei ajunge oricum la browser — fără
 * JavaScript s-ar vedea o singură randare, cu butoane moarte. De aceea
 * teancul stă sub `.u-js-only`, iar pagina livrează în paralel o listă
 * verticală simplă sub `.u-no-js-only`: exact același tipar `[data-js]`
 * folosit de reveal-uri. Imaginile listei sunt lazy și ascunse, deci nu
 * se descarcă degeaba.
 *
 * Sub `prefers-reduced-motion` blocul global anulează tranzițiile —
 * imaginile se schimbă instant, fără alunecare.
 */
export function Gallery({
  images,
  locale,
  title,
}: {
  images: GalleryImage[];
  locale: Locale;
  title: string;
}) {
  const t = useTranslations("gallery");
  const [index, setIndex] = useState(0);
  const total = images.length;

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <figure className="u-js-only mt-10">
      <div
        className="relative"
        style={{ perspective: "1400px" }}
        role="group"
        aria-roledescription="carousel"
        aria-label={t("label", { title })}
      >
        {/* Raportul e fix, identic pentru toate randările — fără salt de
            layout când se schimbă imaginea. */}
        <div className="relative aspect-[16/10] w-full">
          {images.map((image, i) => {
            // Poziția în teanc: 0 = în față, 1 și 2 = în spate, restul ascunse.
            const offset = (i - index + total) % total;
            const visible = offset < 3;

            // Toate imaginile stau în zona vizibilă, deci `loading="lazy"`
            // nu le-ar amâna: browserul le-ar descărca pe toate opt odată
            // (384KB) și ar întârzia inclusiv pictarea textului. Montăm
            // doar ce se vede, plus una în avans pentru următorul pas.
            if (offset > 3) {
              return (
                <div
                  key={image.src}
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ opacity: 0, pointerEvents: "none" }}
                />
              );
            }

            return (
              <div
                key={image.src}
                aria-hidden={offset !== 0}
                className="absolute inset-0 origin-bottom overflow-hidden rounded-card border border-border bg-surface shadow-(--shadow-card) transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translate3d(${offset * 2.5}%, ${offset * -1.5}%, ${offset * -120}px) rotate(${offset * 1.4}deg)`,
                  opacity: visible ? 1 : 0,
                  zIndex: total - offset,
                  pointerEvents: offset === 0 ? "auto" : "none",
                }}
              >
                <Image
                  src={image.src}
                  alt={
                    offset === 0
                      ? `${title} — ${image.caption[locale]}`
                      : ""
                  }
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  // Prima randare e vizibilă imediat; restul se încarcă leneș.
                  priority={i === 0}
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {/* Schimbarea e anunțată asistiv, nu doar vizual. */}
        <p aria-live="polite" className="text-sm text-text-muted">
          <span className="font-mono text-xs text-accent tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="ml-4">{images[index].caption[locale]}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t("previous")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-border transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t("next")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-border transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
