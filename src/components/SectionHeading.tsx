import { ThreadSeparator } from "./motion/ThreadSeparator";

/**
 * Titlu de secțiune: număr mare mono + eyebrow + titlu display, cu firul
 * auriu care crește dedesubt. Numărul e decorativ (ordinea secțiunilor),
 * deci nu intră în arborele de accesibilitate.
 */
export function SectionHeading({
  number,
  eyebrow,
  title,
}: {
  number: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <header>
      <div className="flex items-baseline gap-4">
        {/* gold/50 pica contrastul AA (2.82:1); /80 urca la ~5.3:1 */}
        <span
          aria-hidden="true"
          className="font-mono text-sm text-gold/80 tabular-nums"
        >
          {number}
        </span>
        <p className="u-eyebrow">{eyebrow}</p>
      </div>

      <h2 className="u-display mt-4 text-[length:var(--step-section)]">
        {title}
      </h2>

      <ThreadSeparator className="mt-8" />
    </header>
  );
}
