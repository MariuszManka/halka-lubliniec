import type { Metadata } from "next";
import { HistoryPage } from "../HistoryPage";
import "../home-v2.css";
import "../history.css";

export const metadata: Metadata = {
  title: "Historia Zespołu Halka | Od 1948 roku",
  description: "Poznaj najważniejsze momenty w historii Zespołu Pieśni i Tańca Halka z Lublińca — od założenia w 1948 roku po współczesność.",
};

export default function HistoryRoute() {
  return <HistoryPage />;
}
