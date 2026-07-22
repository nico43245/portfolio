import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { ProjectVisual } from "./ProjectVisual";

/**
 * Card de proiect (spec §5.2). Hover-ul (ridicare + hairline auriu + glow
 * salvie) e limitat la `pointer: fine` prin varianta Tailwind `pointer-fine:`,
 * ca să nu se declanșeze la atingere pe mobil.
 */
export function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const { title, tagline, description, stack, badges, visual, repo } = project;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-fine:hover:-translate-y-1 pointer-fine:hover:border-gold pointer-fine:hover:shadow-[0_0_0_1px_var(--color-gold),0_18px_40px_-24px_var(--color-sage)]"
    >
      <div className="aspect-[16/10] w-full overflow-hidden border-b border-border">
        <ProjectVisual visual={visual} alt={`${title} — ${tagline[locale]}`} />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-btn border border-sage/40 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-sage"
            >
              {badge}
            </span>
          ))}
        </div>

        <h3 className="u-display mt-4 text-2xl md:text-3xl">{title}</h3>
        <p className="mt-1 text-sm text-gold-soft">{tagline[locale]}</p>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">
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
            className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm text-gold transition-colors duration-300 hover:text-gold-soft"
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
