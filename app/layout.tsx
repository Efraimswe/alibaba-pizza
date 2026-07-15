import type { Metadata } from "next";
import { Space_Grotesk, Karla, Lobster } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/json-ld";
import { ClickPop } from "@/components/click-pop";
import { DetailsAnim } from "@/components/details-anim";
import { HopOnView } from "@/components/hop-on-view";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alibaba-pizza.vercel.app"),
  title: {
    template: "%s — Alibaba Kebab Lichtaart",
    default: "Alibaba Kebab Lichtaart — Pizza Pita Grill",
  },
  description:
    "Alibaba Kebab in Lichtaart: pizza, pitta, durum, schotels en meer. Leistraat 84, 2460 Lichtaart. Bel 014 / 41 40 47.",
  openGraph: {
    type: "website",
    siteName: "Alibaba Kebab Lichtaart",
    images: ["/img/hero-schotel.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "_zyNj1lWi6g7gxSfcfklV7ZO-fgdbDdbRNLgmZWQDTo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl-BE"
      className={`${spaceGrotesk.variable} ${karla.variable} ${lobster.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        {children}
        <JsonLd />
        <ClickPop />
        <DetailsAnim />
        <HopOnView />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
