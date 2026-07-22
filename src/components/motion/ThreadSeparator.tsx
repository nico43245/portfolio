"use client";

import { useInViewOnce } from "./useInViewOnce";

/**
 * Separatorul bronz care „crește" pe lățime la scroll (spec §8) — varianta
 * de scroll a signature element-ului din §4.5.
 *
 * Ca și `Reveal`, starea inițială stă în CSS sub `.js`: fără JavaScript
 * linia aurie e desenată complet, nu lipsește. Decorativ, deci aria-hidden.
 */
export function ThreadSeparator({ className = "" }: { className?: string }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div className={`h-px w-full bg-border ${className}`} aria-hidden="true">
      <div
        ref={ref}
        className={`u-thread-grow h-px bg-accent ${inView ? "is-visible" : ""}`}
      />
    </div>
  );
}
