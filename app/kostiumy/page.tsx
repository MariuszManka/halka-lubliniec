import type { Metadata } from "next";
import { CostumesPage } from "../CostumesPage";

export const metadata: Metadata = {
  title: "Kostiumy zespołu | Halka Lubliniec",
  description: "Poznaj kostiumy Zespołu Pieśni i Tańca Halka z Lublińca: sylwetki, hafty, koronki, dodatki i strój w ruchu.",
};

export default function Costumes() {
  return <CostumesPage />;
}
