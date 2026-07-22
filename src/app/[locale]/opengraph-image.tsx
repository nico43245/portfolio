import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { OG, frauncesFont } from "@/lib/og";

export const alt = SITE.name;
export const size = OG.size;
export const contentType = OG.contentType;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Imaginea care apare când linkul e distribuit (WhatsApp, LinkedIn, Slack).
 * Reia compoziția hero-ului: eyebrow, nume pe două rânduri, linia de
 * cerneală, tagline — ca previzualizarea să semene cu site-ul.
 *
 * Satori acceptă doar un subset de CSS: fără `gap` pe blocuri, fără
 * unități relative complicate. Layout-ul e deliberat explicit.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const font = await frauncesFont();
  const [firstName, ...rest] = SITE.name.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: OG.bg,
          padding: "80px 88px",
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
          {t("eyebrow")}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            fontFamily: "Fraunces",
            fontSize: 116,
            lineHeight: 1.02,
            letterSpacing: -2,
            color: OG.text,
          }}
        >
          <span>{firstName}</span>
          <span>{rest.join(" ")}</span>
        </div>

        {/* Linia de cerneală — signature-ul din §4.5 */}
        <div
          style={{
            width: 420,
            height: 2,
            marginTop: 40,
            backgroundColor: OG.accent,
          }}
        />

        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            lineHeight: 1.45,
            color: OG.muted,
            maxWidth: 780,
          }}
        >
          {t("subtitle")}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: font, style: "normal", weight: 400 }],
    },
  );
}
