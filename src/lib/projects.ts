/**
 * Proiectele — nucleul site-ului (spec §5.2).
 *
 * A adăuga un proiect viitor = un obiect nou în acest array. Ordinea de
 * aici e ordinea de pe site.
 *
 * Datele sunt extrase din repo-urile reale, nu din descrieri aproximative.
 * Nu adăuga cifre sau realizări care nu se pot verifica în cod.
 */

export type Badge = "AI" | "Web" | "Automation" | "PWA" | "Local";

/** Cum se ilustrează cardul: imagine reală sau vizual desenat în cod. */
export type Visual =
  | { kind: "image"; src: string; width: number; height: number }
  | { kind: "terminal"; lines: string[] }
  | { kind: "telegram"; title: string; items: string[] };

export type Project = {
  slug: string;
  title: string;
  tagline: { ro: string; en: string };
  description: { ro: string; en: string };
  stack: string[];
  badges: Badge[];
  visual: Visual;
  /** Repo public, dacă există. Wispr local nu are. */
  repo?: string;
  /** Hook pentru viitoarele case-studies /work/[slug]. Nefolosit încă. */
  caseStudy?: boolean;
};

export const projects: Project[] = [
  {
    slug: "wispr-local",
    title: "Wispr local",
    tagline: {
      ro: "Dictare vocală offline pentru macOS",
      en: "Offline voice dictation for macOS",
    },
    description: {
      ro: "Transcriere cu Whisper rulată integral pe Apple Silicon. Captarea audio, transcrierea și inserarea textului se întâmplă pe device — nimic nu pleacă spre cloud. Configurat pentru română.",
      en: "Whisper transcription running entirely on Apple Silicon. Audio capture, transcription and text insertion all happen on-device — nothing leaves for the cloud. Set up for Romanian.",
    },
    stack: ["Python", "faster-whisper", "ctranslate2", "rumps"],
    badges: ["AI", "Local"],
    visual: {
      kind: "terminal",
      lines: [
        "$ python dictate.py",
        "model: whisper · device: mps (Apple Silicon)",
        "listening — hotkey activ, offline",
        "→ transcriere inserată în aplicația activă",
      ],
    },
  },
  {
    slug: "veris-residence",
    title: "Veris Residence",
    tagline: {
      ro: "Site de prezentare pentru un ansamblu rezidențial",
      en: "Presentation site for a residential development",
    },
    description: {
      ro: "Website bilingv pentru un ansamblu de 51 de apartamente din București. Tururi virtuale, hartă de cartier, timeline de construcție și un strat de detalii fine — film grain, scroll controlat, tranziții discrete.",
      en: "Bilingual website for a 51-apartment development in Bucharest. Virtual tours, neighbourhood map, construction timeline, and a layer of fine detail — film grain, controlled scrolling, quiet transitions.",
    },
    stack: ["Next.js", "TypeScript", "Framer Motion", "Lenis"],
    badges: ["Web"],
    visual: {
      kind: "image",
      src: "/work/veris-residence.webp",
      width: 1600,
      height: 1000,
    },
    repo: "https://github.com/nico43245/veris-residence",
  },
  {
    slug: "focus-garden",
    title: "Focus Garden",
    tagline: {
      ro: "Timer Pomodoro local-first, ca PWA instalabilă",
      en: "Local-first Pomodoro timer, as an installable PWA",
    },
    description: {
      ro: "Fiecare sesiune de focus terminată plantează o plantă generativă. Datele stau exclusiv pe device, în IndexedDB — fără cont, fără backend, fără sync. Funcționează offline și se instalează pe iPhone sau macOS.",
      en: "Every completed focus session plants a generative plant. Data lives only on the device, in IndexedDB — no account, no backend, no sync. Works offline and installs on iPhone or macOS.",
    },
    stack: ["Next.js", "Dexie", "Framer Motion", "Web Audio"],
    badges: ["Web", "PWA"],
    visual: {
      kind: "image",
      src: "/work/focus-garden.webp",
      width: 1600,
      height: 1000,
    },
    repo: "https://github.com/nico43245/focus-garden",
  },
  {
    slug: "digest-imobiliar",
    title: "Digest imobiliar",
    tagline: {
      ro: "Digest zilnic de știri, livrat pe Telegram",
      en: "Daily news digest, delivered on Telegram",
    },
    description: {
      ro: "Citește feed-uri RSS românești de imobiliare, păstrează doar articolele din ultimele 24 de ore, le rezumă cu un LLM pe free tier și trimite cel mult opt pe zi în Telegram. Rulează pe GitHub Actions — fără server, fără bază de date.",
      en: "Reads Romanian real-estate RSS feeds, keeps only the last 24 hours, summarises them with a free-tier LLM and sends at most eight a day to Telegram. Runs on GitHub Actions — no server, no database.",
    },
    stack: ["Python", "Groq", "Telegram API", "GitHub Actions"],
    badges: ["AI", "Automation"],
    visual: {
      kind: "telegram",
      title: "📍 Digest imobiliar",
      items: [
        "Piața rezidențială — evoluția prețurilor",
        "Autorizații de construire, date lunare",
        "Randamente în zonele periferice",
      ],
    },
    repo: "https://github.com/nico43245/digest-imobiliar-romania",
  },
];
