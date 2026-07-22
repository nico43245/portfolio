import Image from "next/image";
import type { Visual } from "@/lib/projects";

/**
 * Ilustrația unui card de proiect.
 *
 * Wispr local (app de menu bar) și Digest (bot de Telegram) nu au UI care
 * să poată fi capturat, așa că primesc vizualuri desenate în cod, cu
 * tokenii site-ului. Sunt evident elemente de design, nu capturi de ecran
 * pretinse — conținutul lor reproduce formatul real din repo.
 */
export function ProjectVisual({
  visual,
  alt,
}: {
  visual: Visual;
  alt: string;
}) {
  if (visual.kind === "image") {
    return (
      <Image
        src={visual.src}
        alt={alt}
        width={visual.width}
        height={visual.height}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
      />
    );
  }

  if (visual.kind === "terminal") {
    return (
      <div
        aria-hidden="true"
        className="flex h-full w-full flex-col justify-center gap-2 bg-surface-2 p-6 font-mono text-[0.7rem] leading-relaxed sm:text-xs"
      >
        {visual.lines.map((line, i) => (
          <p
            key={line}
            className={i === 0 ? "text-gold" : "text-text-muted"}
          >
            {line}
          </p>
        ))}
      </div>
    );
  }

  // kind === "telegram"
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-surface-2 p-6"
    >
      <div className="w-full max-w-[320px] rounded-card border border-border bg-surface p-4">
        <p className="font-mono text-xs text-gold">{visual.title}</p>
        <ol className="mt-3 space-y-2">
          {visual.items.map((item, i) => (
            <li key={item} className="text-[0.8rem] leading-snug text-text-muted">
              <span className="text-text">{i + 1}.</span> {item}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
