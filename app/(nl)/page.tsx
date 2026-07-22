import type { Metadata } from "next";
import Landing from "@/components/landing";
import { dictionaries } from "@/lib/i18n";

export const metadata: Metadata = {
  // "/" deelt hetzelfde route-segment als de root layout, dus title.template
  // daar wordt niet toegepast (enkel op child-segments zoals /en, /fr) — vandaar hier het volledige absolute title.
  title: "Pizza, Kebab, Pitta & Durum afhalen in Lichtaart — Alibaba Kebab Lichtaart",
  description:
    "Pizza, kebab, pitta, durum en schotels afhalen in Lichtaart, vlakbij Kasterlee en Olen. Vers bereid, elke dag open. Bel 014 / 41 40 47.",
  keywords: [
    "pizza Lichtaart",
    "kebab Lichtaart",
    "pitta Lichtaart",
    "durum Lichtaart",
    "schotel Lichtaart",
    "afhalen Kasterlee",
    "afhalen Olen",
    "Alibaba Kebab",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "nl-BE": "/",
      en: "/en",
      fr: "/fr",
      "x-default": "/",
    },
  },
  openGraph: {
    locale: "nl_BE",
  },
};

export const dynamic = "force-dynamic";

export default function Home() {
  return <Landing locale="nl" dict={dictionaries.nl} />;
}
