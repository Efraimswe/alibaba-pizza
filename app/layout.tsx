import type { Metadata } from "next";
import { Space_Grotesk, Karla, Lobster } from "next/font/google";
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
  title: "Alibaba Kebab Lichtaart — Pizza Pita Grill",
  description:
    "Alibaba Kebab in Lichtaart: pizza, pitta, durum, schotels en meer. Leistraat 84, 2460 Lichtaart. Bel 014 / 41 40 47.",
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
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
