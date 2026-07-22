import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/**
 * Fonturi self-hosted (spec §2 — zero request extern la runtime).
 * next/font descarcă Fraunces la build time și o servește de pe domeniul
 * nostru; Geist vine deja împachetat local prin pachetul `geist`.
 */
export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"], // latin-ext pentru diacriticele românești
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

export const geistSans = GeistSans;
export const geistMono = GeistMono;

export const fontVariables = [
  fraunces.variable,
  GeistSans.variable,
  GeistMono.variable,
].join(" ");
