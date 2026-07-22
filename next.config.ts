import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Există un package-lock.json și în home-ul utilizatorului; fixăm rădăcina
  // explicit ca Next să nu o infereze greșit.
  turbopack: { root: __dirname },
};

export default withNextIntl(nextConfig);
