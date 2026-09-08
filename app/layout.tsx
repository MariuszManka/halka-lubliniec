import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import "./site-header.css";

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

const title = "Zespół Pieśni i Tańca Halka | Lubliniec";

const description =
  "Zespół Pieśni i Tańca Halka z Lublińca. Dołącz do jednej z czterech grup albo zaproś zespół na swoje wydarzenie.";

export const metadata: Metadata = {
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
