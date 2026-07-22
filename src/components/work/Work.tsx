import { useTranslations } from "next-intl";
import { projects } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "./ProjectCard";

/**
 * Secțiunea Work — nucleul site-ului (spec §5.2).
 *
 * `Reveal` e client component, dar cardurile îi sunt pasate drept `children`
 * dintr-un server component, deci rămân randate pe server și nu ajung în
 * bundle-ul de client.
 */
export function Work({ locale }: { locale: Locale }) {
  const t = useTranslations("work");

  return (
    <section id="work" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full min-w-0 max-w-[1200px]">
        <SectionHeading number="01" eyebrow={t("eyebrow")} title={t("title")} />

        <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.slug} index={i} as="li" className="h-full">
              <ProjectCard project={project} locale={locale} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
