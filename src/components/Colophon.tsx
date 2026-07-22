import { useTranslations } from "next-intl";

/**
 * Colofon — nota tipografică de la finalul unei cărți: din ce e făcut
 * obiectul pe care tocmai l-ai citit.
 *
 * E un obicei de design editorial, nu o secțiune „despre mine": vorbește
 * despre site, nu despre autor, deci rămâne în regulile §1 (zero conținut
 * biografic).
 */
export function Colophon() {
  const t = useTranslations("colophon");

  const rows = [
    { term: t("typeface"), detail: "Fraunces · Geist · Geist Mono" },
    { term: t("built"), detail: "Next.js · TypeScript · Tailwind CSS" },
    { term: t("delivery"), detail: t("deliveryDetail") },
  ];

  return (
    <section
      aria-labelledby="colophon-title"
      className="border-t border-border px-6 py-12 md:px-10 md:py-16"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1200px]">
        <h2 id="colophon-title" className="u-eyebrow">
          {t("title")}
        </h2>

        <dl className="mt-6 grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-3">
          {rows.map((row) => (
            <div key={row.term}>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-muted">
                {row.term}
              </dt>
              <dd className="mt-1 text-sm">{row.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
