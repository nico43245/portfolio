"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Declanșează o singură dată la intrarea în viewport (spec §8:
 * `once: true`, `margin: -10%`).
 *
 * Dacă IntersectionObserver lipsește, întoarce direct `true` — mai bine
 * fără animație decât cu conținut blocat în starea ascunsă.
 */
export function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Programat, nu sincron: setState direct în effect declanșează o
      // randare suplimentară înainte de pictare.
      const timer = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "-10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
