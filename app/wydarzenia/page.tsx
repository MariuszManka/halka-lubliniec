import type { Metadata } from "next";
import { EventsPage } from "../EventsPage";
import "../home-v2.css";
import "../events.css";

export const metadata: Metadata = {
  title: "Wydarzenia i próby | ZPiT Halka Lubliniec",
  description: "Kalendarz występów, warsztatów i regularnych prób Zespołu Pieśni i Tańca Halka z Lublińca.",
};

export default function EventsRoute() {
  return <EventsPage />;
}
