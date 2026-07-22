import type { Metadata } from "next";
import Landing from "@/components/landing";
import { dictionaries } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Pizza, Kebab, Pitta & Durum Takeaway in Lichtaart",
  description:
    "Pizza, kebab, pitta, durum and platters for takeaway in Lichtaart, close to Kasterlee and Olen. Freshly made, open daily. Call 014 / 41 40 47.",
  keywords: [
    "pizza Lichtaart",
    "kebab Lichtaart",
    "pitta Lichtaart",
    "durum Lichtaart",
    "schotel Lichtaart",
    "takeaway Kasterlee",
    "takeaway Olen",
    "Alibaba Kebab",
  ],
  alternates: {
    canonical: "/en",
    languages: {
      "nl-BE": "/",
      en: "/en",
      fr: "/fr",
      "x-default": "/",
    },
  },
  openGraph: {
    locale: "en_GB",
  },
};

export default function HomeEn() {
  return <Landing locale="en" dict={dictionaries.en} />;
}
