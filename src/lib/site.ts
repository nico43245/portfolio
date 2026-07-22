/**
 * Configurare de site — un singur loc de editat pentru date de contact.
 * Valorile TODO_ sunt placeholdere vizibile intenționat (spec §12):
 * apar ca atare în UI ca să nu treacă neobservate la publicare.
 */
export const SITE = {
  name: "Nicolas Ghizu",
  url: "https://nicolasghizu.vercel.app", // TODO: domeniul final

  email: "ghizunicolas@gmail.com",

  github: "https://github.com/nico43245",
  githubHandle: "nico43245",

  /**
   * Din variabilele de mediu (Vercel → Settings → Environment Variables,
   * sau .env.local pentru dezvoltare). Cât timp lipsește, secțiunea de
   * contact afișează doar email + GitHub, fără formular — adăugarea cheii
   * readuce formularul singură, fără modificări de cod.
   */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
} as const;

export const isPlaceholder = (value: string) => value.startsWith("TODO_");
