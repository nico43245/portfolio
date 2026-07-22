import { useTranslations } from "next-intl";
import { projects } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectRow } from "./ProjectRow";

/**
 * Secțiunea Work — nucleul site-ului (spec §5.2).
 *
 * Direcția „editorial ivoriu": proiectele nu mai stau într-un grid de
 * carduri, ci ca articole de revistă — rânduri late, separate de
 * hairline-uri, cu imaginea alternând stânga/dreapta pe desktop.
 *
 * `Reveal` e client component, dar rândurile îi sunt pasate drept
 * `children` dintr-un server component, deci rămân randate pe server și
 * nu ajung în bundle-ul de client.
 */
export function Work({ locale }: { locale: Locale }) {
  const t = useTranslations("work");

  return (
    <section id="work" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full min-w-0 max-w-[1200px]">
        <SectionHeading number="01" eyebrow={t("eyebrow")} title={t("title")} />

        <ul className="mt-8 divide-y divide-border">
          {projects.map((project, i) => (
            <Reveal key={project.slug} as="li">
              <ProjectRow project={project} locale={locale} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
