import { useTranslations } from "next-intl";
import { SITE, isPlaceholder } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "./ContactForm";

/**
 * Formularul apare doar dacă există cheia Web3Forms. Fără ea rămân emailul
 * și GitHub-ul, pe o singură coloană — un formular care afișează o eroare
 * de configurare e mai rău decât absența lui. Adăugarea cheii în mediu îl
 * readuce singură, fără modificări de cod.
 */
export function Contact() {
  const t = useTranslations("contact");
  const emailMissing = isPlaceholder(SITE.email);
  const formEnabled = SITE.web3formsKey.length > 0;

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full min-w-0 max-w-[1200px]">
        <SectionHeading number="03" eyebrow={t("eyebrow")} title={t("title")} />

        <div
          className={`mt-14 grid grid-cols-1 gap-12 ${
            formEnabled ? "lg:grid-cols-[1fr_1fr] lg:gap-20" : ""
          }`}
        >
          <Reveal>
            <div className="flex flex-col gap-8">
              <p className="max-w-[40ch] text-[length:var(--step-lede)] leading-relaxed text-text-muted">
                {t("intro")}
              </p>

              <dl className="flex flex-col gap-5 text-sm">
                <div>
                  <dt className="u-eyebrow">{t("directEmail")}</dt>
                  <dd className="mt-1">
                    {emailMissing ? (
                      // Placeholder vizibil intenționat (spec §12) — nu-l
                      // transformăm în mailto ca să nu pară funcțional.
                      <span className="font-mono text-accent">{SITE.email}</span>
                    ) : (
                      <a
                        href={`mailto:${SITE.email}`}
                        className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-300 hover:text-accent-strong"
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
                      className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-300 hover:text-accent-strong"
                    >
                      @{SITE.githubHandle}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {formEnabled && (
            <Reveal index={1}>
              <ContactForm />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
