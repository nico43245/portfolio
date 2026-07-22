/**
 * Proiectele — nucleul site-ului (spec §5.2).
 *
 * A adăuga un proiect viitor = un obiect nou în acest array. Ordinea de
 * aici e ordinea de pe site.
 *
 * Datele sunt extrase din repo-urile reale, nu din descrieri aproximative.
 * Nu adăuga cifre sau realizări care nu se pot verifica în cod.
 *
 * Un proiect primește pagină proprie la /work/[slug] doar dacă are `problem`
 * — vezi `hasCaseStudy` mai jos. Restul rămân doar pe pagina principală,
 * ca să nu existe pagini goale.
 */

export type Badge = "AI" | "Web" | "Automation" | "PWA" | "Local";

type Bilingual = { ro: string; en: string };

/** Cum se ilustrează cardul: imagine reală sau vizual desenat în cod. */
export type Visual =
  | { kind: "image"; src: string; width: number; height: number }
  | { kind: "terminal"; lines: string[] }
  | { kind: "telegram"; title: string; items: string[] };

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  caption: Bilingual;
};

/** O decizie tehnică și motivul din spatele ei. */
export type Decision = {
  title: Bilingual;
  body: Bilingual;
};

export type Project = {
  slug: string;
  title: string;
  tagline: Bilingual;
  description: Bilingual;
  stack: string[];
  badges: Badge[];
  visual: Visual;
  /** Repo public, dacă există. */
  repo?: string;
  /** Anul, dacă e cunoscut cu certitudine. */
  year?: string;
  /** Prezența lui deschide pagina de detaliu. */
  problem?: Bilingual;
  decisions?: Decision[];
  gallery?: GalleryImage[];
};

/** Randările reale ale ansamblului, din repo-ul Veris. */
const verisGallery: GalleryImage[] = [
  {
    src: "/work/veris/render-01-fata.webp",
    width: 1600,
    height: 1000,
    caption: { ro: "Fațada principală", en: "Main façade" },
  },
  {
    src: "/work/veris/render-02-colt-dreapta.webp",
    width: 1600,
    height: 1000,
    caption: { ro: "Colț dreapta", en: "Right corner" },
  },
  {
    src: "/work/veris/render-03-colt-stanga.webp",
    width: 1600,
    height: 1000,
    caption: { ro: "Colț stânga", en: "Left corner" },
  },
  {
    src: "/work/veris/render-04-curte-interior-1.webp",
    width: 1600,
    height: 1000,
    caption: { ro: "Curtea interioară", en: "Inner courtyard" },
  },
  {
    src: "/work/veris/render-05-curte-interior-2.webp",
    width: 1600,
    height: 1000,
    caption: { ro: "Curtea interioară, a doua perspectivă", en: "Inner courtyard, second view" },
  },
  {
    src: "/work/veris/render-06-lateral-spate.webp",
    width: 1600,
    height: 1000,
    caption: { ro: "Lateral spate", en: "Rear side" },
  },
  {
    src: "/work/veris/render-07-lateral-fata-dreapta.webp",
    width: 1600,
    height: 1000,
    caption: { ro: "Lateral față, dreapta", en: "Front side, right" },
  },
  {
    src: "/work/veris/render-08-lateral-fata-stanga.webp",
    width: 1600,
    height: 1000,
    caption: { ro: "Lateral față, stânga", en: "Front side, left" },
  },
];

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
        "model: large-v3-turbo · int8 · arm64",
        "hotkey cmd+shift+d — activ, offline",
        "→ transcriere inserată în aplicația activă",
      ],
    },
    problem: {
      ro: "Aplicațiile de dictare trimit audio spre cloud ca să-l transcrie. Pentru dictarea zilnică pe un laptop personal, asta înseamnă că fiecare propoziție rostită pleacă la un server străin. Voiam același confort, dar fără ca sunetul să părăsească mașina.",
      en: "Dictation apps send audio to the cloud to transcribe it. For everyday dictation on a personal laptop, that means every sentence you speak leaves for someone else's server. I wanted the same convenience without the audio ever leaving the machine.",
    },
    decisions: [
      {
        title: { ro: "Modelul rulează local, pe CPU", en: "The model runs locally, on CPU" },
        body: {
          ro: "faster-whisper peste ctranslate2, cu modelul large-v3-turbo cuantizat pe int8. Cuantizarea e cea care face diferența: modelul intră în memorie și rulează suficient de repede pe CPU-ul ARM, fără GPU și fără server. Cerința de Apple Silicon vine de la wheel-ul nativ arm64 al lui ctranslate2.",
          en: "faster-whisper on top of ctranslate2, with the large-v3-turbo model quantised to int8. Quantisation is what makes it work: the model fits in memory and runs fast enough on the ARM CPU, with no GPU and no server. The Apple Silicon requirement comes from ctranslate2's native arm64 wheel.",
        },
      },
      {
        title: { ro: "Limba fixată, nu detectată", en: "Language pinned, not detected" },
        body: {
          ro: "Whisper e multilingv și încearcă să ghicească limba. Pe fragmente scurte de română ghicea uneori greșit, iar rezultatul ieșea în altă limbă. Fixarea pe „ro” elimină complet clasa asta de erori și ajută și la diacritice.",
          en: "Whisper is multilingual and tries to guess the language. On short Romanian fragments it sometimes guessed wrong and returned the text in another language. Pinning it to \"ro\" removes that whole class of error, and helps with diacritics too.",
        },
      },
      {
        title: { ro: "Din bara de meniu, nu din terminal", en: "From the menu bar, not the terminal" },
        body: {
          ro: "Un instrument pe care îl folosești de zeci de ori pe zi nu poate cere un terminal deschis. Rulează ca aplicație de menu bar prin rumps, cu o scurtătură globală (cmd+shift+d) care pornește și oprește dictarea, iar textul se inserează direct în aplicația activă.",
          en: "A tool you use dozens of times a day can't require an open terminal. It runs as a menu bar app through rumps, with a global shortcut (cmd+shift+d) that starts and stops dictation, and the text is inserted straight into whatever app is focused.",
        },
      },
      {
        title: { ro: "Tăierea liniștii înainte de transcriere", en: "Cutting silence before transcription" },
        body: {
          ro: "Un filtru de detecție a vocii elimină pauzele înainte ca modelul să le vadă. Fără el, modelul procesa și tăcerea dintre propoziții — timp pierdut și, ocazional, cuvinte inventate din zgomot de fond.",
          en: "A voice-activity filter strips pauses before the model ever sees them. Without it the model also processed the silence between sentences — wasted time, and occasionally words hallucinated out of background noise.",
        },
      },
    ],
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
    problem: {
      ro: "Un ansamblu rezidențial se vinde înainte să existe. Cumpărătorul trebuie să se hotărască pentru ceva ce încă nu poate vizita, iar singurele dovezi sunt randările, planurile și promisiunea unui termen. Site-ul trebuia să facă o clădire neconstruită credibilă.",
      en: "A residential development sells before it exists. Buyers have to decide on something they can't yet visit, and the only evidence is renders, floor plans and a promised deadline. The site had to make an unbuilt building believable.",
    },
    decisions: [
      {
        title: { ro: "Randările poartă tot", en: "The renders carry everything" },
        body: {
          ro: "Opt randări arhitecturale, tratate ca fotografii de revistă, nu ca ilustrații secundare: mari, la calitate maximă, cu spațiu în jur. Sunt singurul lucru care arată cum va arăta clădirea, deci primesc cel mai mult spațiu din pagină.",
          en: "Eight architectural renders, treated as magazine photography rather than secondary illustration: large, at full quality, with space around them. They're the only thing that shows what the building will look like, so they get the most room on the page.",
        },
      },
      {
        title: { ro: "Bilingv de la structură, nu prin traducere", en: "Bilingual by structure, not by translation" },
        body: {
          ro: "Cumpărătorii de apartamente noi din București includ și clienți care nu citesc română. Ambele limbi sunt rute separate, prerandate — nu un switcher care rescrie textul din JavaScript.",
          en: "Buyers of new apartments in Bucharest include people who don't read Romanian. Both languages are separate, prerendered routes — not a switcher that rewrites the text from JavaScript.",
        },
      },
      {
        title: { ro: "Context, nu doar apartamente", en: "Context, not just apartments" },
        body: {
          ro: "Tur virtual, hartă de cartier și timeline de construcție. Când cumperi ceva ce nu poți vizita, întrebările reale sunt „ce e în jur” și „când e gata” — nu doar câți metri pătrați are camera.",
          en: "Virtual tour, neighbourhood map and construction timeline. When you're buying something you can't visit, the real questions are \"what's around it\" and \"when is it ready\" — not just the square metres of a room.",
        },
      },
    ],
    gallery: verisGallery,
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
    problem: {
      ro: "Aplicațiile de focus cer un cont înainte să te lase să pornești un timer, și îți țin istoricul pe serverul lor. În plus, te răsplătesc cu cifre — serii, procente, grafice — care după câteva săptămâni nu mai înseamnă nimic. Voiam un timer care nu cere nimic și a cărui răsplată să se vadă.",
      en: "Focus apps ask for an account before they'll let you start a timer, and keep your history on their server. They also reward you with numbers — streaks, percentages, charts — which stop meaning anything after a few weeks. I wanted a timer that asks for nothing and whose reward you can actually see.",
    },
    decisions: [
      {
        title: { ro: "Datele nu pleacă de pe device", en: "Data never leaves the device" },
        body: {
          ro: "Dexie peste IndexedDB, fără backend și fără sincronizare. Nu există cont, deci nu există nimic de spart și nimic de exportat. Compromisul e real și asumat: dacă ștergi datele browserului, grădina dispare.",
          en: "Dexie on top of IndexedDB, with no backend and no sync. There's no account, so there's nothing to breach and nothing to export. The trade-off is real and deliberate: clear your browser data and the garden is gone.",
        },
      },
      {
        title: { ro: "O grădină în loc de un grafic", en: "A garden instead of a chart" },
        body: {
          ro: "Fiecare sesiune terminată plantează ceva. Progresul devine un peisaj care se schimbă, nu o coloană într-un grafic — iar o grădină pe care ai construit-o în două luni te ține mai bine decât un procent.",
          en: "Every completed session plants something. Progress becomes a landscape that changes rather than a bar on a chart — and a garden you spent two months growing holds you better than a percentage.",
        },
      },
      {
        title: { ro: "Instalabilă și offline", en: "Installable and offline" },
        body: {
          ro: "Service worker scris de mână, nu generat de un plugin, ca să știu exact ce se pune în cache. Se instalează pe iPhone și pe macOS și pornește fără rețea — un timer care are nevoie de internet ca să numere minute e o problemă de design.",
          en: "A hand-written service worker rather than a plugin-generated one, so I know exactly what gets cached. It installs on iPhone and macOS and starts with no network — a timer that needs the internet to count minutes is a design problem.",
        },
      },
    ],
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
    problem: {
      ro: "Ca să urmărești piața imobiliară din România trebuie să citești zilnic mai multe publicații, dintre care majoritatea repetă aceleași știri. Voiam rezumatul de dimineață fără abonament, fără server de întreținut și fără costuri lunare.",
      en: "Keeping up with the Romanian real-estate market means reading several publications daily, most of which repeat the same stories. I wanted the morning summary without a subscription, without a server to maintain and without a monthly bill.",
    },
    decisions: [
      {
        title: { ro: "GitHub Actions ca server", en: "GitHub Actions as the server" },
        body: {
          ro: "Un cron care pornește la 05:00 UTC — 08:00 ora României. Nu există mașină de întreținut, de actualizat sau de plătit: sarcina rulează câteva secunde pe zi și se oprește. Pentru ceva ce se execută o dată pe zi, un server care stă pornit non-stop e risipă.",
          en: "A cron that fires at 05:00 UTC — 08:00 Romanian time. There's no machine to maintain, patch or pay for: the job runs for a few seconds a day and stops. For something that executes once daily, a server sitting up around the clock is waste.",
        },
      },
      {
        title: { ro: "Un model mic, pe free tier", en: "A small model, on the free tier" },
        body: {
          ro: "Rezumarea unui articol de știri nu are nevoie de cel mai puternic model existent. Un model mic și rapid, pe free tier, face treaba — iar proiectul a trecut prin mai mulți furnizori până la varianta asta, care se încadrează în limite fără costuri.",
          en: "Summarising a news article doesn't need the most capable model available. A small, fast model on the free tier does the job — and the project moved through several providers before settling here, inside the limits and at no cost.",
        },
      },
      {
        title: { ro: "Un fișier în loc de bază de date", en: "A file instead of a database" },
        body: {
          ro: "Articolele deja trimise se rețin într-un fișier JSON comis înapoi în repo. Sună rudimentar, și e — dar starea are câteva sute de intrări și e nevoie de ea o dată pe zi. O bază de date ar fi însemnat încă un serviciu de administrat pentru un fișier care încape într-un commit.",
          en: "Articles already sent are remembered in a JSON file committed back to the repo. It sounds crude, and it is — but the state is a few hundred entries and it's needed once a day. A database would have meant another service to run for a file that fits in a commit.",
        },
      },
      {
        title: { ro: "Plafon zilnic, nu tot ce apare", en: "A daily cap, not everything published" },
        body: {
          ro: "Cel mult opt articole pe zi, doar din ultimele 24 de ore. Un digest care trimite tot ce apare devine exact zgomotul pe care trebuia să-l elimine.",
          en: "At most eight articles a day, only from the last 24 hours. A digest that forwards everything published becomes exactly the noise it was supposed to remove.",
        },
      },
    ],
  },
];

/** Proiectele cu pagină proprie — cele care au ceva de spus dincolo de card. */
export function hasCaseStudy(project: Project): boolean {
  return Boolean(project.problem);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
