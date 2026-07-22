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
  // Preîncărcat, deși e folosit doar la text mic (eyebrow-uri, tag-uri,
  // comutatorul de limbă). În Faza B fusese `preload: false`, ca să nu
  // fure lățime de bandă de la Fraunces, elementul LCP. Costul s-a văzut
  // abia când am măsurat deplasările de layout: sosind târziu, schimba
  // lățimea etichetelor mono uppercase și mișca antetul și lista de
  // stack — 0.10 din CLS-ul de 0.11 al paginii de proiect.
  preload: true,
});

export const fontVariables = [
  fraunces.variable,
  geistSans.variable,
  geistMono.variable,
].join(" ");
