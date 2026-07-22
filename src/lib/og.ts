import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Fontul pentru imaginile Open Graph.
 *
 * Satori (motorul din `next/og`) nu citește woff2, formatul în care
 * `next/font` descarcă fonturile, iar variabila CSS `--font-fraunces` nu
 * există în contextul de generare a imaginii. De aceea ținem un TTF în
 * repo: build-ul nu depinde de rețea și rezultatul e identic de fiecare
 * dată.
 *
 * Fișierul e citit o singură dată per proces de build.
 */
let cached: ArrayBuffer | undefined;

export async function frauncesFont(): Promise<ArrayBuffer> {
  if (!cached) {
    const buffer = await readFile(
      path.join(process.cwd(), "src", "assets", "Fraunces.ttf"),
    );
    cached = buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    ) as ArrayBuffer;
  }
  return cached;
}

/** Aceleași valori ca tokenii din globals.css — imaginea trebuie să arate ca site-ul. */
export const OG = {
  size: { width: 1200, height: 630 },
  contentType: "image/png",
  bg: "#f7f4ec",
  text: "#1a1915",
  muted: "#5f5b4f",
  accent: "#7f6435",
} as const;
