import { ImageResponse } from "next/og";
import { routing, type Locale } from "@/i18n/routing";
import { getProject, hasCaseStudy, projects } from "@/lib/projects";
import { SITE } from "@/lib/site";
import { OG, frauncesFont } from "@/lib/og";

export const alt = SITE.name;
export const size = OG.size;
export const contentType = OG.contentType;

/** Aceleași rute ca pagina — fără imagini pentru pagini inexistente. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.filter(hasCaseStudy).map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}

/**
 * Previzualizarea unei pagini de proiect. Fără ea, distribuirea unui link
 * de proiect arăta imaginea generică a site-ului, deci toate cele patru
 * proiecte păreau la fel.
 */
export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  const font = await frauncesFont();
  const lang = locale as Locale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: OG.bg,
          padding: "72px 88px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            color: OG.accent,
            textTransform: "uppercase",
          }}
        >
          {project?.badges.join(" · ") ?? ""}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 92,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: OG.text,
            }}
          >
            {project?.title ?? SITE.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 30,
              lineHeight: 1.4,
              color: OG.muted,
              maxWidth: 860,
            }}
          >
            {project?.tagline[lang] ?? ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: OG.muted,
          }}
        >
          <span>{project?.stack.slice(0, 4).join("  ·  ") ?? ""}</span>
          <span style={{ color: OG.accent }}>{SITE.name}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: font, style: "normal", weight: 400 }],
    },
  );
}
