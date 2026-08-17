import type { Metadata } from "next";
import { JoinPage } from "../JoinPage";
import "../home-v2.css";
import "../join.css";

export const metadata: Metadata = {
  title: "Dołącz do Halki | ZPiT Halka Lubliniec",
  description: "Nabór do czterech grup Zespołu Pieśni i Tańca Halka trwa przez cały rok. Zajęcia są bezpłatne, bez przesłuchań i bez wymaganego doświadczenia.",
};

export default function JoinRoute() {
  return <JoinPage />;
}
