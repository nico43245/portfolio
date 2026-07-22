"use client";

import { useEffect, useRef } from "react";

/**
 * Înclinare 3D fină după poziția cursorului, pentru figurile de proiect.
 *
 * Scrie direct în custom properties CSS (`--tilt-x`, `--tilt-y`) prin
 * `style.setProperty`, nu prin state React: mișcarea mouse-ului ar
 * declanșa altfel o re-randare la fiecare cadru. Transformarea rulează pe
 * compositor, deci nu costă layout.
 *
 * Se activează doar când există un cursor real (`pointer: fine`) și doar
 * dacă utilizatorul nu a cerut mișcare redusă. Pe atingere și sub
 * `prefers-reduced-motion` nu se atașează niciun listener, iar figura
 * rămâne dreaptă — nu e conținut, e ornament.
 */
const MAX_DEGREES = 3.5;

export function Tilt({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (frame) return; // maxim o actualizare per cadru
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = node.getBoundingClientRect();
        // -0.5 … 0.5 față de centrul figurii
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        // Y-ul cursorului înclină pe axa X, și invers — altfel figura
        // pare că se mișcă în direcția greșită.
        node.style.setProperty("--tilt-x", `${-y * MAX_DEGREES}deg`);
        node.style.setProperty("--tilt-y", `${x * MAX_DEGREES}deg`);
      });
    };

    const onLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      node.style.setProperty("--tilt-x", "0deg");
      node.style.setProperty("--tilt-y", "0deg");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`u-tilt ${className}`}>
      {children}
    </div>
  );
}
