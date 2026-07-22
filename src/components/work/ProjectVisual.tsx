import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Visual } from "@/lib/projects";
import { WisprDiagram } from "./diagrams/WisprDiagram";
import { DigestDiagram } from "./diagrams/DigestDiagram";

/**
 * Ilustrația unui proiect: captură reală acolo unde există interfață,
 * diagramă a mecanismului acolo unde nu (Wispr e aplicație de menu bar,
 * Digest e un bot de Telegram).
 *
 * Diagramele nu sunt decorative: descriu cum funcționează proiectul,
 * deci primesc o descriere accesibilă, nu `aria-hidden`.
 */
export function ProjectVisual({
  visual,
  alt,
}: {
  visual: Visual;
  alt: string;
}) {
  const t = useTranslations("diagram");

  if (visual.kind === "image") {
    return (
      <Image
        src={visual.src}
        alt={alt}
        width={visual.width}
        height={visual.height}
        sizes="(max-width: 768px) 100vw, 60vw"
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-fine:group-hover:scale-[1.02]"
      />
    );
  }

  return visual.name === "wispr" ? (
    <WisprDiagram label={t("wispr")} />
  ) : (
    <DigestDiagram label={t("digest")} />
  );
}
