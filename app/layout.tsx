import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3002";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const title = "Zespół Pieśni i Tańca Halka | Lubliniec";
  const description = "Poznaj Zespół Pieśni i Tańca Halka z Lublińca. Kronika koncertów, historia od 1948 roku, próby i kontakt.";

  return {
    metadataBase: base,
    title,
    description,
    icons: { icon: "/logo.jpg", shortcut: "/logo.jpg" },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pl_PL",
      images: [{ url: new URL("/og.png", base).toString(), width: 1734, height: 909, alt: "Halka, Zespół Pieśni i Tańca z Lublińca" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/og.png", base).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
