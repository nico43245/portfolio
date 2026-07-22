import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Există un package-lock.json și în home-ul utilizatorului; fixăm rădăcina
  // explicit ca Next să nu o infereze greșit.
  turbopack: { root: __dirname },

  experimental: {
    // Necesar pentru <ViewTransition> din React, folosit ca să morfăm
    // figura unui proiect de pe pagina principală în imaginea mare de pe
    // pagina lui. În browserele fără suport navigarea merge normal, doar
    // fără animație.
    viewTransition: true,
  },
};

export default withNextIntl(nextConfig);
