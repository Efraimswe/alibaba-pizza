import type { Metadata } from "next";
import { SiteLayout, siteMetadata } from "@/app/site-layout";

export const metadata: Metadata = siteMetadata;

export default function FrLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteLayout lang="fr">{children}</SiteLayout>;
}
