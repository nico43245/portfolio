import { ThreadSeparator } from "./motion/ThreadSeparator";

/**
 * Titlu de secțiune, stil revistă: numărul secțiunii mare, în Fraunces și
 * bronz, așezat în stânga titlului pe desktop (deasupra pe mobil), cu
 * linia de cerneală care crește dedesubt.
 *
 * Numărul e decorativ (ordinea secțiunilor), deci nu intră în arborele de
 * accesibilitate. #7f6435 pe ivoriu are 5.06:1 — trece AA și la text mic,
 * cu atât mai mult la dimensiunea asta.
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
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
        <span
          aria-hidden="true"
          className="u-display text-[2rem] text-accent tabular-nums md:min-w-[80px] md:text-[2.5rem]"
        >
          {number}
        </span>

        <div>
          <p className="u-eyebrow">{eyebrow}</p>
          <h2 className="u-display mt-3 text-[length:var(--step-section)]">
            {title}
          </h2>
        </div>
      </div>

      <ThreadSeparator className="mt-10" />
    </header>
  );
}
