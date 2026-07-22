/**
 * Configurare de site — un singur loc de editat pentru date de contact.
 * Valorile TODO_ sunt placeholdere vizibile intenționat (spec §12):
 * apar ca atare în UI ca să nu treacă neobservate la publicare.
 */
export const SITE = {
  name: "Nicolas Ghizu",
  url: "https://nicolasghizu.vercel.app", // TODO: domeniul final

  /** TODO: înlocuiește cu adresa publică reală. */
  email: "TODO_EMAIL@example.com",

  github: "https://github.com/nico43245",
  githubHandle: "nico43245",

  /** Din .env.local — vezi .env.example. Fără ea formularul nu trimite. */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
} as const;

export const isPlaceholder = (value: string) => value.startsWith("TODO_");
