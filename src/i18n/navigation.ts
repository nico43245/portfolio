import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Navigație conștientă de locale. Folosește ACESTE exporturi peste tot,
 * nu cele din `next/link` / `next/navigation` — altfel se pierde prefixul
 * de limbă la navigare.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
