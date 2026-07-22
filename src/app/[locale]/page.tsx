import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <Hero />
      {/* Faza B: #work, #blog, #contact */}
    </main>
  );
}
