import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { ProjectVisual } from "./ProjectVisual";

/**
 * Un proiect ca rând editorial (spec §5.2, direcția „editorial ivoriu"):
 * figura lată pe o parte, coloana de text pe cealaltă, alternând
 * stânga/dreapta pe desktop. Hairline-urile dintre rânduri vin din
 * `divide-y` pe lista din Work.
 *
 * Hover-ul (imaginea se scalează fin, titlul primește underline bronz) e
 * limitat la `pointer: fine` — nu se declanșează la atingere pe mobil.
 */
export function ProjectRow({
  project,
  locale,
  index,
}: {
  project: Project;
  locale: Locale;
  index: number;
}) {
  const { title, tagline, description, stack, badges, visual, repo } = project;
  const flipped = index % 2 === 1;

  return (
    <article className="group grid grid-cols-1 gap-8 py-14 md:grid-cols-12 md:items-center md:gap-12 md:py-20">
      <figure
        className={`overflow-hidden rounded-card border border-border bg-surface shadow-(--shadow-card) md:col-span-7 ${
          flipped ? "md:order-2" : ""
        }`}
      >
        <div className="aspect-[16/10] w-full overflow-hidden">
          <ProjectVisual visual={visual} alt={`${title} — ${tagline[locale]}`} />
        </div>
      </figure>

      <div className={`min-w-0 md:col-span-5 ${flipped ? "md:order-1" : ""}`}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span
            aria-hidden="true"
            className="font-mono text-sm text-accent tabular-nums"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {badges.map((badge) => (
            <span
              key={badge}
              className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-text-muted"
            >
              {badge}
            </span>
          ))}
        </div>

        <h3 className="u-display mt-4 text-3xl md:text-4xl">
          <span className="bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-fine:group-hover:bg-[length:100%_1px]">
            {title}
          </span>
        </h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
          {tagline[locale]}
        </p>

        <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-relaxed text-text-muted">
          {description[locale]}
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
          {stack.map((tech) => (
            <li
              key={tech}
              className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-8 transition-colors duration-300 hover:text-accent-strong hover:decoration-accent-strong"
          >
            GitHub
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only">— {title}</span>
          </a>
        )}
      </div>
    </article>
  );
}
