# Portofoliu — Nicolas Ghizu

Site personal, bilingv RO/EN, construit ca pagină statică.

**Live:** [nicolasghizu.vercel.app](https://nicolasghizu.vercel.app)

## Stack

| | |
|---|---|
| Framework | Next.js (App Router, prerandare statică) |
| Limbaj | TypeScript, strict |
| Stiluri | Tailwind CSS v4 — tokens în `src/styles/globals.css`, fără fișier de config JS |
| Traduceri | next-intl, rute `/[locale]` |
| Blog | MDX (`gray-matter` + `next-mdx-remote`) |
| Fonturi | Fraunces, Geist, Geist Mono — self-hosted prin `next/font` |

Animațiile sunt CSS, nu JavaScript. Nu există bibliotecă de animație în bundle.

## Dezvoltare

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de producție
```

Variabilele de mediu sunt documentate în [`.env.example`](.env.example). Niciuna nu e obligatorie ca să rulezi site-ul local.

## Cum e organizat

```
src/
  app/[locale]/      rute (pagina principală, blog)
  components/        UI, grupat pe secțiuni
  lib/
    projects.ts      datele proiectelor — un obiect per proiect
    site.ts          email, GitHub, URL — un singur loc de editat
    mdx.ts           citirea articolelor
  styles/globals.css design tokens + tipografie
content/blog/        articolele, în MDX
```

Un proiect nou = un obiect în `src/lib/projects.ts`. Un articol nou = un fișier `.mdx` în `content/blog/`.

Articolele marcate `draft: true` sunt vizibile în dezvoltare, dar excluse din build-ul de producție — împreună cu linkul de blog din navigație și ruta `/blog`, dacă nu rămâne niciun articol publicat.

## Decizii care par ciudate, dar sunt intenționate

**Conținutul nu depinde de JavaScript.** Stările ascunse ale animațiilor de intrare sunt prefixate cu `[data-js]` în CSS, iar atributul e pus de un script inline din `<head>`. Fără JavaScript atributul lipsește, deci nu se aplică nicio stare ascunsă și tot conținutul rămâne vizibil. Varianta obișnuită (`initial={{ opacity: 0 }}` cu o bibliotecă de animație) livrează `opacity: 0` în HTML și lasă pagina goală dacă scriptul nu rulează.

**Titlul din hero se animează doar cu `transform`, niciodată cu `opacity`.** Un element cu `opacity: 0` nu e considerat pictat, așa că animarea opacității pe elementul LCP întârzie metrica chiar dacă vizual nu se vede diferența.

**Marcajul care semnalează JavaScript e un atribut, nu o clasă.** React reconciliază `className`-ul lui `<html>` la hidratare, deci o clasă adăugată înainte de hidratare produce hydration mismatch. Un atribut pe care serverul nu l-a randat e ignorat.

## Accesibilitate

Toate perechile text/fundal sunt verificate WCAG AA înainte de a fi folosite. Lighthouse pe mobil: accesibilitate 100, best practices 100.

## Licență

Codul e MIT. Textele, imaginile și materialele de proiect nu — sunt ale mele.
