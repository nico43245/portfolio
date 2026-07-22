import { useFormatter, useTranslations } from "next-intl";

/** Linia de metadate a unui articol: dată + timp de citit + marcaj DRAFT. */
export function PostMeta({
  date,
  readingMinutes,
  draft,
}: {
  date: string;
  readingMinutes: number;
  draft?: boolean;
}) {
  const format = useFormatter();
  const t = useTranslations("blog");

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-text-muted">
      <time dateTime={date}>
        {format.dateTime(new Date(date), {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <span aria-hidden="true">·</span>
      <span>{t("readingTime", { minutes: readingMinutes })}</span>
      {draft && (
        <span className="rounded-btn border border-gold/50 px-2 py-0.5 uppercase tracking-[0.14em] text-gold">
          {t("draft")}
        </span>
      )}
    </div>
  );
}
