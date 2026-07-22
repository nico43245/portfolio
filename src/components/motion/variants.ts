import type { Variants, Transition } from "motion/react";

/** Easing unic pentru tot site-ul (spec §4.4). */
export const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.4,
  base: 0.55,
  slow: 0.7,
  thread: 0.9, // desenarea firului auriu (spec §8)
} as const;

/**
 * Reveal standard la intrarea în viewport (spec §8):
 * opacity 0→1, y 24→0. Sub reduced-motion, `y` se anulează în componentă.
 */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const revealNoMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

/** Container cu stagger de 60ms între copii (spec §8). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

/** Setările de viewport folosite la toate reveal-urile de secțiune. */
export const VIEWPORT = { once: true, margin: "-10%" } as const;
