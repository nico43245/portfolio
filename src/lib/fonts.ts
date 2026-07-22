import { Fraunces, Geist, Geist_Mono } from "next/font/google";

/**
 * Fonturi self-hosted (spec §2 — zero request extern la runtime).
 * next/font le descarcă la build și le servește de pe domeniul nostru.
 *
 * Încărcate prin next/font/google, nu prin pachetul `geist`, tocmai ca să
 * putem controla `preload` per font (vezi Geist Mono mai jos).
 */

export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"], // latin-ext pentru diacriticele românești
  // `swap`, conform §9. Am testat și `optional` ca să scad LCP-ul simulat:
  // câștigul a fost în marja de eroare, iar costul e real (titluri în
  // Georgia la prima vizită pe conexiuni lente). Nu merită schimbul.
  display: "swap",
  variable: "--font-fraunces",
  // Doar `opsz` (optical sizing, cerut de §4.2). Fiecare axă suplimentară
  // îngroașă fontul variabil: cu SOFT+WONK ajungea la ~224KB și întârzia
  // LCP-ul, fiindcă titlul din hero e elementul LCP.
  axes: ["opsz"],
});

export const geistSans = Geist({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist-sans",
});

export const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist-mono",
  // Folosit doar la eyebrow-uri, tag-uri și numere — text mic, niciodată
  // elementul LCP. Preîncărcarea lui fura lățime de bandă de la Fraunces,
  // care e chiar elementul LCP.
  preload: false,
});

export const fontVariables = [
  fraunces.variable,
  geistSans.variable,
  geistMono.variable,
].join(" ");
