import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { parseTheme, THEME_COOKIE } from "@/lib/theme";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "High-Quality Digital Experiences",
  description:
    "insites builds premium websites, social media packages, and AI training programs for modern brands.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "insites — Digital Experiences & Growth Systems",
    description:
      "insites builds premium websites, social media packages, and AI training programs for modern brands.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "insites — Digital Experiences & Growth Systems",
    description:
      "insites builds premium websites, social media packages, and AI training programs for modern brands.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logos/insites-orb-eye.svg",
    shortcut: "/logos/insites-orb-eye.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = parseTheme(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <html lang="en" data-theme={theme}>
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
