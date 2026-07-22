# Portofoliu Nicolas Ghizu — Specificație de Proiect

> Document destinat **Claude Code** (VS Code). Conține tot contextul necesar pentru a construi site-ul de la zero. Citește-l integral înainte de a scrie cod. Unde apar `[DE COMPLETAT]`, cere-mi valoarea sau lasă un placeholder vizibil.

---

## 1. Obiectiv

Un **website de prezentare** care adună proiectele mele — aplicații, instrumente și interfețe. Simplu, curat, extensibil: proiecte noi se adaugă ușor pe viitor.

**Fără informații personale.** Site-ul NU menționează studii, statut de student, domeniu de activitate, biografie sau secțiune „despre mine". Este strict despre **muncă / proiecte**, nu despre persoană.

Impresia dorită la prima vizită: *„cineva cu gust, care construiește lucruri bine făcute."* Estetică **modernă, dar clasică** — rafinată, sobră, cu animații subtile.

**Principii nenegociabile**
- Zero costuri de operare (free tier peste tot).
- Fără template generic; fiecare decizie derivă din secțiunea 4.
- Performanță: Lighthouse ≥ 95 la toate categoriile pe mobil.
- Accesibilitate: focus vizibil pe tastatură, contrast AA, `prefers-reduced-motion` respectat.
- Bilingv RO / EN cu switcher.

---

## 2. Stack tehnic

| Componentă | Alegere | Motiv |
|---|---|---|
| Framework | **Next.js 15+** (App Router, RSC) | SSG + SEO bilingv |
| Limbaj | **TypeScript** (strict) | |
| Styling | **Tailwind CSS v4** | |
| Animații | **Framer Motion** | reveal la scroll, micro-interacțiuni |
| i18n | **next-intl** cu segment `[locale]` (`/ro`, `/en`) | URL-uri separate → SEO curat |
| Blog | **MDX** local (`content/blog/*.mdx`) + `next-mdx-remote` + `gray-matter` | conținut în repo, zero DB, zero cost |
| Formular contact | **Web3Forms** (free, fără backend) — alternativă: route handler + Resend free tier | |
| Fonturi | `next/font` (self-hosted, fără request extern) | |
| Iconuri | `lucide-react` | |
| Deploy | **Vercel** (free) | |

**Interzis:** orice dependență care cere API key plătit sau cont plătit în runtime.

---

## 3. Structura site-ului

Single-page cu ancore + pagini separate pentru blog. Navigație sticky discretă (apare la scroll în sus).

```
/[locale]
  #hero          → nume + o linie despre muncă + CTA
  #work          → proiectele (grid) — nucleul site-ului
  #blog          → ultimele 3 articole (preview) → link la /blog
  #contact       → formular funcțional
  footer         → linkuri, limbă, an
/[locale]/blog            → listă toate articolele
/[locale]/blog/[slug]     → articol individual (MDX)
```

Header: monogramă „NG" (stânga) · nav (Work / Blog / Contact) · switcher **RO|EN**.
(Fără buton de CV — nimic personal.)

---

## 4. Design system (sursa de adevăr vizuală)

Direcția: **dark minimalist, cald, cu accent auriu champagne + verde salvie.** Nu negru pur, nu verde-acid — evită clișeul „dark + acid green". Auriul dă o tușă premium, clasică; verdele salvie adaugă un accent viu, „de creștere". Referință de rafinament: layout editorial de arhitectură tradus în dark mode.

### 4.1 Culori (tokens — folosește exact acestea)

```css
--bg:            #0E100C;  /* charcoal cald, ușor verzui — NU negru pur */
--surface:       #16180F;  /* carduri, secțiuni ridicate */
--surface-2:     #1E2116;  /* hover / straturi */
--border:        #2B2E22;  /* hairline-uri */
--text:          #ECE9DD;  /* off-white cald */
--text-muted:    #9B9C8C;  /* subtitluri, captions */
--gold:          #C9A24B;  /* accent principal — champagne, muted */
--gold-soft:     #E0C588;  /* highlight, hover pe auriu */
--sage:          #7C9885;  /* accent secundar — verde salvie */
```

Regulă: auriul e rar și intenționat (linkuri active, hairline hero, un cuvânt din titlu). Verdele salvie apare la accente „vii" (badge-uri de status). Restul e monocrom disciplinat.

### 4.2 Tipografie

| Rol | Font | Note |
|---|---|---|
| Display (titluri) | **Fraunces** (variable, serif) | clasic-modern, optical sizing; folosit cu restraint |
| Body | **Geist Sans** (sau Mona Sans) | curat, tehnic, lizibil |
| Utility / date-tech | **Geist Mono** (sau JetBrains Mono) | pentru tag-urile de stack, numere, eyebrow-uri |

Scală (fluid, `clamp`): hero display ~ `clamp(2.75rem, 7vw, 6rem)`, section title ~ `clamp(1.75rem, 3vw, 2.75rem)`, body `1.0625rem/1.7`. Titluri display cu `letter-spacing` ușor negativ; eyebrow-uri mono cu `letter-spacing: 0.18em` uppercase.

### 4.3 Layout & spacing

- Container max `1200px`, gutter generos, mult whitespace („liniște" clasică).
- Grid de 12 coloane; proiectele pe 2 coloane pe desktop, 1 pe mobil.
- `border-radius` mic și consistent (`8px` carduri, `4px` butoane). Fără rotunjimi mari.
- Hairline-uri de 1px (`--border`) ca element structural, nu decorativ.

### 4.4 Motion (vezi §8)

Subtil, orchestrat, niciodată gimmicky. Easing `cubic-bezier(0.22, 1, 0.36, 1)`, durate 400–700ms. Totul dezactivat sub `prefers-reduced-motion: reduce`.

### 4.5 Signature element

**Un fir auriu subțire care se „desenează" (SVG stroke-dashoffset) la load în hero și reapare ca separator între secțiuni, „crescând" la scroll.** Este firul conducător vizual care leagă proiectele. Singurul element „îndrăzneț"; restul rămâne quiet.

---

## 5. Conținut pe secțiuni

> Copy-ul e punct de plecare. Nu inventa realizări. Zero referințe la persoană/studii/domeniu.

### 5.1 Hero
- Eyebrow (mono): `SELECTED WORK`
- Titlu (display): **Nicolas Ghizu**
- Subtitlu (RO): „Proiecte la care lucrez — aplicații, instrumente și interfețe, construite cu grijă pentru detaliu."
- Subtitlu (EN): „Things I build — apps, tools and interfaces, made with care for detail."
- CTA principal: `Vezi proiectele` / `View work` (scroll la #work). CTA secundar: `Contact`.
- Fundal: `--bg` + firul auriu animat (signature). Fără imagine stock, fără bio.

### 5.2 Work — proiectele (nucleul site-ului)
Grid de carduri. Fiecare card: titlu (display), o linie de rezumat, 2–4 tag-uri de stack (mono), 1–2 fraze descriere, badge de tip (`AI`, `Web`, `Automation`, `PWA`). Hover: ridicare subtilă + hairline auriu care apare. (Opțional: pagină de detaliu `/work/[slug]` pentru case-studies — lasă hook-ul pregătit.)

Datele proiectelor stau tipizate în `lib/projects.ts`, câmpuri bilingve. **A adăuga un proiect viitor = un obiect nou în acest array.** Ordinea în array = ordinea pe site.

**1. Wispr local** — *Voice-to-text local pentru macOS*
- Tags: `Swift`, `Local model`, `macOS`, `Privacy-first`
- RO: „Dictare vocală care rulează integral offline pe Mac — transcriere rapidă, fără cloud și fără date trimise în afara device-ului."
- EN: „Voice dictation running fully offline on macOS — fast transcription, no cloud, no data leaving the device."
- Badge: `AI` · `Local`

**2. Veris Residence** — *Site premium de prezentare*
- Tags: `Next.js`, `Vercel`, `Framer Motion`, `UI premium`
- RO: „Website de prezentare pentru un client — UI premium, orientat pe conversie, cu animații fine și o structură clară."
- EN: „A presentation website for a client — premium, conversion-focused UI with fine animations and a clear structure."
- Badge: `Web`

**3. Focus Garden** — *Timer Pomodoro local-first (PWA)*
- Tags: `Next.js`, `PWA`, `IndexedDB`, `SVG generativ`
- RO: „Aplicație Pomodoro instalabilă care funcționează offline: fiecare sesiune de focus finalizată îți crește o grădină generativă. Zero cont, zero cloud."
- EN: „An installable Pomodoro app that works offline: each completed focus session grows a generative garden. No account, no cloud."
- Badge: `Web` · `PWA`

**4. Digest Zilnic** — *Bot de știri pe Telegram*
- Tags: `Python`, `Telegram`, `Groq`, `Automation`
- RO: „Bot care livrează zilnic un rezumat de știri dintr-un domeniu ales, direct pe Telegram, generat automat cu un LLM pe free tier — un flux de informație curat, fără efort manual."
- EN: „A bot delivering a daily news digest for a chosen topic straight to Telegram, auto-generated with a free-tier LLM — a clean information flow, zero manual work."
- Badge: `AI` · `Automation`

### 5.3 Blog
- Preview: ultimele 3 articole (titlu, dată, timp de citit, 1 rând excerpt).
- Sursă: `content/blog/*.mdx` cu frontmatter `title_ro`, `title_en`, `excerpt_ro`, `excerpt_en`, `date`, `slug`, `tags`.
- Include 2 articole demo `[DE COMPLETAT cu subiecte reale]` ca placeholder — subiecte despre proiecte/tehnologie, nu personale.

### 5.4 Contact
- Formular funcțional: nume, email, mesaj. Validare client-side, stări clare de succes/eroare (în vocea interfeței).
- Trimitere via **Web3Forms** (`NEXT_PUBLIC_WEB3FORMS_KEY` în `.env`, `[DE COMPLETAT]`). Anti-spam: honeypot.
- Lângă formular: email direct + GitHub `[DE COMPLETAT]`. (LinkedIn opțional — sari peste dacă expune profil personal.)

### 5.5 Footer
Monogramă, nav secundar, switcher limbă, GitHub, `© {an} Nicolas Ghizu`.

---

## 6. Internaționalizare (RO / EN)

- `next-intl`, rutare pe segment `[locale]` → `/ro/...` și `/en/...`. Locale implicit: `ro`. Redirect `/` → `/ro`.
- Toate textele în `messages/ro.json` și `messages/en.json`. Zero string hardcodat.
- Switcher-ul păstrează secțiunea/scroll-ul curent. `<html lang>` corect per locale. `hreflang` alternate în `<head>`.

---

## 7. Features (confirmate)

1. **Work / proiecte** — nucleul, §5.2. Extensibil pentru proiecte viitoare.
2. **Blog articole scurte** — MDX, §5.3.
3. **Formular de contact funcțional** — Web3Forms, §5.4.
4. **Bilingv RO/EN** — §6.

(Fără secțiune „About", fără timeline, fără CV — nimic personal.)

---

## 8. Animații (concret — implementează exact astea)

| Loc | Efect | Note |
|---|---|---|
| Load hero | firul auriu se desenează (`stroke-dashoffset`), apoi titlul urcă în fade (`y: 24→0`) | orchestrat, ~900ms |
| Scroll în secțiuni | reveal la intrarea în viewport (`opacity 0→1`, `y 24→0`), stagger 60ms | `viewport={{ once: true, margin: "-10%" }}` |
| Separatoare | hairline auriu care „crește" pe lățime la scroll | leagă signature-ul |
| Carduri proiecte | hover: `translateY(-4px)`, apariție hairline auriu + ușor glow salvie | doar pe `pointer:fine` |
| Nav | apare/dispare la direcția scroll-ului; underline auriu pe linkul activ | |
| Butoane | micro-interacțiune la hover/press (scale 0.98 la press) | |
| Switcher limbă | crossfade scurt pe conținut | |

**Reguli:** respectă `prefers-reduced-motion` (fallback = opacity instant sau nimic). Fără parallax agresiv, fără auto-play. „Less is more" — scoate orice efect care nu servește conținutul.

---

## 9. Performanță, SEO, accesibilitate

- SSG pentru toate paginile; `next/image` unde apar imagini; fonturi self-hosted cu `display: swap`.
- Metadata per pagină/locale (`generateMetadata`): title, description, `og:image` `[DE COMPLETAT]`, `hreflang`, canonical.
- `sitemap.ts` + `robots.ts` cu ambele locale.
- A11y: landmark-uri semantice, focus ring vizibil pe `--gold`, contrast verificat, `alt` peste tot, skip-link.
- Target Lighthouse mobil ≥ 95 la toate categoriile.

---

## 10. Structură de fișiere propusă

```
portfolio/
├─ app/
│  └─ [locale]/
│     ├─ layout.tsx          # <html lang>, providers, fonts
│     ├─ page.tsx            # hero + work + blog preview + contact
│     └─ blog/
│        ├─ page.tsx         # listă
│        └─ [slug]/page.tsx  # articol MDX
├─ components/
│  ├─ Header.tsx  LanguageSwitcher.tsx  Hero.tsx
│  ├─ Work.tsx    ProjectCard.tsx
│  ├─ BlogPreview.tsx  ContactForm.tsx  Footer.tsx
│  └─ motion/     (variants comune Framer Motion)
├─ content/blog/*.mdx
├─ messages/ro.json  messages/en.json
├─ lib/  (mdx.ts, projects.ts, i18n config)
├─ public/  (monogramă, og-image)
├─ styles/globals.css  (tokens din §4.1)
└─ next.config / tailwind config / tsconfig
```

---

## 11. Ordinea de build (pași pentru Claude Code)

1. Scaffold Next.js + TS + Tailwind v4; configurează tokens (§4.1) și fonturile (§4.2).
2. `next-intl` + rutare `[locale]`, dicționare `messages/*.json`, switcher, redirect `/`.
3. Layout + Header (nav sticky, switcher) + Footer.
4. Hero cu signature-ul auriu animat.
5. `lib/projects.ts` + Work grid + ProjectCard (cele 4 proiecte din §5.2).
6. Pipeline MDX + pagini blog + BlogPreview (2 articole demo).
7. ContactForm (Web3Forms + honeypot + stări).
8. Motion pass (§8) + `prefers-reduced-motion`.
9. SEO/metadata/sitemap/robots (§9).
10. Trecere de calitate: responsive mobil, focus states, Lighthouse. Auto-critică: scoate un efect în plus.
11. Deploy pe Vercel (vezi §13).

După pasul 1, oprește-te scurt și arată-mi propunerea de tokens + un preview de hero înainte să continui.

---

## 12. De completat de la Nicolas (`[DE COMPLETAT]`)

- Linkuri: email, GitHub (LinkedIn opțional).
- Web3Forms access key.
- Subiectele reale pentru cele 2 articole demo de blog.
- (Opțional) og-image / monogramă preferată.
- Confirmare/ajustare a descrierilor de proiect din §5.2.

---

## 13. Deploy pe Vercel

1. Push repo-ul pe GitHub.
2. Pe vercel.com → **Add New → Project** → importă repo-ul. Framework detectat automat: Next.js. Build implicit (`next build`).
3. **Environment Variables:** adaugă `NEXT_PUBLIC_WEB3FORMS_KEY`.
4. Deploy. URL live `*.vercel.app`. (Domeniu propriu ulterior din **Settings → Domains**, opțional.)
5. Fiecare push pe `main` → redeploy automat.

---

*Sfârșit specificație. Respectă tokenii și copy-ul; unde lipsește conținut real, lasă placeholder vizibil și cere-l, nu inventa. Nimic personal pe site.*
