"use client";

import type { CSSProperties } from "react";
import { useInViewOnce } from "./useInViewOnce";

type Props = {
  children: React.ReactNode;
  /** Poziția în stagger — 60ms per pas (spec §8). */
  index?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Reveal la intrarea în viewport (spec §8): opacity 0→1, y 24→0.
 *
 * Deliberat FĂRĂ motion. `initial={{opacity:0}}` din motion ajunge ca stil
 * inline în HTML-ul livrat, iar `whileInView` nu se declanșează niciodată
 * dacă JS-ul nu rulează — conținutul rămâne invizibil permanent. Aici
 * starea ascunsă vine din CSS și se aplică doar sub clasa `.js` (pusă de
 * scriptul din layout), deci fără JS totul e vizibil de la început.
 *
 * `prefers-reduced-motion` e tratat de blocul global din globals.css, care
 * anulează tranziția — elementul apare instant, fără deplasare.
 */
export function Reveal({ children, index = 0, className = "", as = "div" }: Props) {
  const { ref, inView } = useInViewOnce<HTMLElement>();

  const Tag = as;
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`u-reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
