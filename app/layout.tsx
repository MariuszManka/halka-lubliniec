import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import "./site-header.css";
import { getHomePageCopy } from "../sanity/content";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  style: ["normal", "italic"],
});

const base = new URL("https://halkalubliniec.pl");

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getHomePageCopy();
  const title = copy["meta.title"];
  const description = copy["meta.description"];
  return {
    metadataBase: base,
    title,
    description,

  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
  },

  openGraph: {
    title,
    description,
    type: "website",
    locale: "pl_PL",
    images: [
      {
        url: "/og-home.png",
        width: 1734,
        height: 909,
        alt: "Od 1948 roku tańczymy razem — Zespół Pieśni i Tańca Halka",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-home.png"],
  },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${sans.variable} ${display.variable}`}>
        {children}
      </body>
    </html>
  );
}
