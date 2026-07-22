import { useTranslations } from "next-intl";
import { SITE, isPlaceholder } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const t = useTranslations("contact");
  const emailMissing = isPlaceholder(SITE.email);

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full min-w-0 max-w-[1200px]">
        <SectionHeading number="03" eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal index={1}>
            <div className="flex flex-col gap-6">
              <p className="max-w-[45ch] text-text-muted">{t("intro")}</p>

              <dl className="flex flex-col gap-4 text-sm">
                <div>
                  <dt className="u-eyebrow">{t("directEmail")}</dt>
                  <dd className="mt-1">
                    {emailMissing ? (
                      // Placeholder vizibil intenționat (spec §12) — nu-l
                      // transformăm în mailto ca să nu pară funcțional.
                      <span className="font-mono text-gold">{SITE.email}</span>
                    ) : (
                      <a
                        href={`mailto:${SITE.email}`}
                        className="text-gold transition-colors duration-300 hover:text-gold-soft"
                      >
                        {SITE.email}
                      </a>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="u-eyebrow">GitHub</dt>
                  <dd className="mt-1">
                    <a
                      href={SITE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold transition-colors duration-300 hover:text-gold-soft"
                    >
                      @{SITE.githubHandle}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
