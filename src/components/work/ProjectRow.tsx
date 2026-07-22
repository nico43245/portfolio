import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { hasCaseStudy, type Project } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { Tilt } from "@/components/motion/Tilt";
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
  const t = useTranslations("project");
  const { title, tagline, description, stack, badges, visual, repo } = project;
  const flipped = index % 2 === 1;
  const detail = hasCaseStudy(project) ? `/work/${project.slug}` : undefined;

  return (
    // `relative` ancorează ::after-ul linkului de titlu, care face tot
    // rândul clicabil.
    <article className="group relative grid grid-cols-1 gap-8 py-14 md:grid-cols-12 md:items-center md:gap-12 md:py-20">
      {/* Două straturi de transformare, ca să nu se calce reciproc:
          `Tilt` înclină după cursor pe wrapper, `u-settle` face așezarea
          la derulare pe figură. */}
      <Tilt className={`md:col-span-7 ${flipped ? "md:order-2" : ""}`}>
        <figure className="u-settle overflow-hidden rounded-card border border-border bg-surface shadow-(--shadow-card)">
          <div className="aspect-[16/10] w-full overflow-hidden">
            <ProjectVisual
              visual={visual}
              alt={`${title} — ${tagline[locale]}`}
            />
          </div>
        </figure>
      </Tilt>

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
          {detail ? (
            // Un singur link pe rând, întins peste tot cardul prin
            // ::after. Varianta anterioară — un al doilea link pe imagine,
            // ascuns cu aria-hidden — livra un link fără nume accesibil.
            <Link
              href={detail}
              className="bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] after:absolute after:inset-0 after:content-[''] pointer-fine:group-hover:bg-[length:100%_1px]"
            >
              {title}
            </Link>
          ) : (
            <span className="bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-fine:group-hover:bg-[length:100%_1px]">
              {title}
            </span>
          )}
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

        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
          {detail && (
            // Semn vizual că rândul e clicabil, nu un al doilea link:
            // linkul e titlul, întins peste card. Un link în plus către
            // aceeași țintă ar însemna încă o oprire la tastatură.
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-8 transition-colors duration-300 group-hover:text-accent-strong"
            >
              {t("readMore")}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          )}

          {repo && (
            // z-10: altfel ar sta sub ::after-ul linkului de titlu.
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex w-fit items-center gap-1.5 text-sm text-text-muted transition-colors duration-300 hover:text-text"
            >
              GitHub
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only">— {title}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
