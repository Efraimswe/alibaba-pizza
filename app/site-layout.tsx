import type { Metadata } from "next";
import { Golos_Text, Lobster } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/json-ld";
import { ClickPop } from "@/components/click-pop";
import { DetailsAnim } from "@/components/details-anim";
import { HopOnView } from "@/components/hop-on-view";
import "./globals.css";

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
});

export const siteMetadata: Metadata = {
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

// Gedeelde <html>/<body>-shell voor de drie root-layouts per taal:
// SSR geeft zo meteen de juiste <html lang> per route (nl-BE / en / fr).
export function SiteLayout({
  lang,
  children,
}: Readonly<{
  lang: string;
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={lang}
      className={`${golos.variable} ${lobster.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip font-sans">
        {/* рефреш всегда с верха страницы: не восстанавливать прошлый скролл */}
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration='manual'`,
          }}
        />
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
