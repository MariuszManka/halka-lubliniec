import type { Metadata } from "next";
import { HistoryPage } from "../HistoryPage";
import { sharedContentDefaults } from "../../content/page-copy-defaults";
import "../home-v2.css";
import "../history.css";

export const metadata: Metadata = {
  title: "Historia Halki | Wspólna opowieść od 1948 roku",
  description: "Historia Zespołu Pieśni i Tańca Halka z Lublińca. Archiwalne fotografie, podróże, jubileusze i żywa tradycja od 1948 roku do dziś.",
};

export default function HistoryRoute() {
  return <HistoryPage shared={sharedContentDefaults} />;
}
