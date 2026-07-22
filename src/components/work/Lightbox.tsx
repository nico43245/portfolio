"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import type { GalleryImage } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";

/**
 * Randarea la dimensiune mare.
 *
 * Construit pe `<dialog>` nativ, deschis cu `showModal()`: capcana de
 * focus, Esc pentru închidere, inertizarea restului paginii și rolul de
 * dialog vin de la browser. Reimplementarea lor manuală pe un `div` e
 * sursa clasică de bug-uri de accesibilitate.
 *
 * Închiderea readuce focusul pe elementul care a deschis dialogul —
 * browserul face asta singur pentru `<dialog>`, dar numai dacă nu mutăm
 * noi focusul între timp.
 */
export function Lightbox({
  image,
  locale,
  title,
  onClose,
}: {
  image: GalleryImage | null;
  locale: Locale;
  title: string;
  onClose: () => void;
}) {
  const t = useTranslations("gallery");
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (image && !dialog.open) dialog.showModal();
    if (!image && dialog.open) dialog.close();
  }, [image]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    // Esc închide dialogul direct în browser, fără să treacă prin React;
    // ascultăm `close` ca starea noastră să nu rămână în urmă.
    const onCloseEvent = () => onClose();
    dialog.addEventListener("close", onCloseEvent);
    return () => dialog.removeEventListener("close", onCloseEvent);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-label={t("zoomLabel", { title })}
      // `backdrop:` stilizează fundalul nativ al dialogului.
      className="m-auto max-h-[92vh] w-[min(1200px,92vw)] bg-transparent p-0 backdrop:bg-bg/90 backdrop:backdrop-blur-sm"
      // Click în afara imaginii închide — comportament așteptat la un zoom.
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      {image && (
        <figure className="relative">
          <Image
            src={image.src}
            alt={`${title} — ${image.caption[locale]}`}
            width={image.width}
            height={image.height}
            sizes="92vw"
            className="h-auto w-full rounded-card"
          />
          <figcaption className="mt-3 text-sm text-text-muted">
            {image.caption[locale]}
          </figcaption>

          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-btn border border-border bg-bg/85 text-text transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </figure>
      )}
    </dialog>
  );
}
