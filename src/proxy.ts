import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// În Next 16 fișierul de middleware se numește `proxy.ts`.
// Se ocupă și de redirectul `/` → `/ro` (locale implicit, spec §6).
export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
