import type { Metadata } from "next";
import { HistoryPage } from "../HistoryPage";
import { sharedContentDefaults } from "../../content/page-copy-defaults";
import "../home-v2.css";
import "../history.css";

export const metadata: Metadata = {
  title: "Historia Halki | Wspólna opowieść od 1948 roku",
  description: "Historia Zespołu Pieśni i Tańca Halka z Lublińca. Archiwalne fotografie, teatr, podróże i jubileusze od 1948 do 2018 roku.",
};

export default function HistoryRoute() {
  return <HistoryPage shared={sharedContentDefaults} />;
}
