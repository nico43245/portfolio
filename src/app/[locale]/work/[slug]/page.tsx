import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getProject, hasCaseStudy, projects } from "@/lib/projects";
import { Gallery } from "@/components/work/Gallery";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { Reveal } from "@/components/motion/Reveal";
import { ThreadSeparator } from "@/components/motion/ThreadSeparator";

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Doar proiectele care au ceva de spus primesc pagină — fără pagini goale. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects
      .filter(hasCaseStudy)
      .map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline[locale as Locale],
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: { ro: `/ro/work/${slug}`, en: `/en/work/${slug}` },
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project || !hasCaseStudy(project)) notFound();

  const t = await getTranslations({ locale, namespace: "project" });
  const lang = locale as Locale;

  return (
    <main id="main" className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <div className="mx-auto w-full min-w-0 max-w-[900px]">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-muted transition-colors duration-300 hover:text-text"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {t("back")}
        </Link>

        <header className="mt-8">
          <p className="u-eyebrow">{project.tagline[lang]}</p>
          <h1 className="u-display mt-4 text-[length:var(--step-section)]">
            {project.title}
          </h1>

          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <ThreadSeparator className="mt-8" />
        </header>

        {/* Vizualul principal — pentru proiectele fără galerie e singura
            imagine, deci merită să deschidă pagina. */}
        {!project.gallery && (
          <div className="mt-12 overflow-hidden rounded-card border border-border bg-surface shadow-(--shadow-card)">
            <div className="aspect-[16/10] w-full">
              <ProjectVisual
                visual={project.visual}
                alt={`${project.title} — ${project.tagline[lang]}`}
              />
            </div>
          </div>
        )}

        {/* Problema, cu inițială mare — punctul de intrare în text.
            NU se învelește în `Reveal`: e cel mai mare bloc de text de
            deasupra pliului, deci elementul LCP al paginii, iar `Reveal`
            îl livrează cu opacity 0 până se hidratează observerul. Un
            element transparent nu e considerat pictat — măsurat, asta
            adăuga ~2.3s la LCP. Aceeași regulă ca la titlul din hero. */}
        <section className="mt-16">
          <h2 className="u-eyebrow">{t("problem")}</h2>
          <p className="u-dropcap mt-6 text-[length:var(--step-lede)] leading-relaxed">
            {project.problem![lang]}
          </p>
        </section>

        {project.gallery && (
          <Reveal>
            <section className="mt-20">
              <h2 className="u-eyebrow">{t("gallery")}</h2>

              <Gallery
                images={project.gallery}
                locale={lang}
                title={project.title}
              />

              {/* Varianta fără JavaScript: aceleași imagini, pe verticală.
                  Lazy + ascunsă când JS rulează, deci nu se descarcă. */}
              <ul className="u-no-js-only mt-10 space-y-8">
                {project.gallery.map((image) => (
                  <li key={image.src}>
                    <figure>
                      <div className="overflow-hidden rounded-card border border-border">
                        <Image
                          src={image.src}
                          alt={`${project.title} — ${image.caption[lang]}`}
                          width={image.width}
                          height={image.height}
                          sizes="(max-width: 768px) 100vw, 60vw"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <figcaption className="mt-3 text-sm text-text-muted">
                        {image.caption[lang]}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        {project.decisions && (
          <section className="mt-20">
            <h2 className="u-eyebrow">{t("decisions")}</h2>

            <ol className="mt-8 divide-y divide-border border-t border-border">
              {project.decisions.map((decision, i) => (
                <Reveal key={decision.title.ro} as="li">
                  <article className="grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-8">
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm text-accent tabular-nums md:col-span-2"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="md:col-span-10">
                      <h3 className="u-display text-xl md:text-2xl">
                        {decision.title[lang]}
                      </h3>
                      <p className="mt-3 leading-relaxed text-text-muted">
                        {decision.body[lang]}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {project.repo && (
          <div className="mt-16">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-8 transition-colors duration-300 hover:text-accent-strong hover:decoration-accent-strong"
            >
              {t("viewCode")}
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only">— {project.title}</span>
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
