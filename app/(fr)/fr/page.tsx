import type { Metadata } from "next";
import Landing from "@/components/landing";
import { dictionaries } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Pizza, Kebab, Pitta & Durum à emporter à Lichtaart",
  description:
    "Pizza, kebab, pitta, durum et plats à emporter à Lichtaart, près de Kasterlee et Olen. Préparé frais, ouvert tous les jours. Appelez le 014 / 41 40 47.",
  keywords: [
    "pizza Lichtaart",
    "kebab Lichtaart",
    "pitta Lichtaart",
    "durum Lichtaart",
    "schotel Lichtaart",
    "à emporter Kasterlee",
    "à emporter Olen",
    "Alibaba Kebab",
  ],
  alternates: {
    canonical: "/fr",
    languages: {
      "nl-BE": "/",
      en: "/en",
      fr: "/fr",
      "x-default": "/",
    },
  },
  openGraph: {
    locale: "fr_BE",
  },
};

export const dynamic = "force-dynamic";

export default function HomeFr() {
  return <Landing locale="fr" dict={dictionaries.fr} />;
}
