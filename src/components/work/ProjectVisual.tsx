import Image from "next/image";
import type { Visual } from "@/lib/projects";

/**
 * Ilustrația unui rând de proiect.
 *
 * Wispr local (app de menu bar) și Digest (bot de Telegram) nu au UI care
 * să poată fi capturat, așa că primesc vizualuri desenate în cod. Sunt
 * evident elemente de design, nu capturi de ecran pretinse — conținutul
 * lor reproduce formatul real din repo.
 *
 * Interiorul lor rămâne dark (`ink-panel`) și pe tema ivorie: un terminal
 * e dark în mod natural, iar rama de hârtie din ProjectRow îl prezintă ca
 * pe o figură, nu ca pe o gaură în pagină.
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
        sizes="(max-width: 768px) 100vw, 60vw"
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-fine:group-hover:scale-[1.02]"
      />
    );
  }

  if (visual.kind === "terminal") {
    return (
      <div
        aria-hidden="true"
        className="flex h-full w-full flex-col justify-center gap-2 bg-ink-panel p-6 font-mono text-[0.7rem] leading-relaxed sm:p-8 sm:text-xs"
      >
        {visual.lines.map((line, i) => (
          <p
            key={line}
            className={
              i === 0 ? "text-[#d8b662]" : "text-ink-panel-text/70"
            }
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
      className="flex h-full w-full items-center justify-center bg-ink-panel p-6"
    >
      <div className="w-full max-w-[340px] rounded-card border border-ink-panel-text/15 bg-ink-panel-text/5 p-4">
        <p className="font-mono text-xs text-[#d8b662]">{visual.title}</p>
        <ol className="mt-3 space-y-2">
          {visual.items.map((item, i) => (
            <li
              key={item}
              className="text-[0.8rem] leading-snug text-ink-panel-text/70"
            >
              <span className="text-ink-panel-text">{i + 1}.</span> {item}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
