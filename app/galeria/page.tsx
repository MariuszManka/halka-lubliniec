import type { Metadata } from "next";
import { ChroniclePage } from "../ChroniclePage";

export const metadata: Metadata = {
  title: "Galeria zespołu | Halka Lubliniec",
  description: "Galerie z koncertów, warsztatów, wyjazdów i spotkań Zespołu Pieśni i Tańca Halka z Lublińca.",
};

export default function Gallery() {
  return <ChroniclePage />;
}
