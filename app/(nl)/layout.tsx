import type { Metadata } from "next";
import { SiteLayout, siteMetadata } from "@/app/site-layout";

export const metadata: Metadata = siteMetadata;

export default function NlLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteLayout lang="nl-BE">{children}</SiteLayout>;
}
