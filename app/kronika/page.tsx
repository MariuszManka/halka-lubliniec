import type { Metadata } from "next";
import { ChroniclePage } from "../ChroniclePage";

export const metadata: Metadata = {
  title: "Kronika zespołu | Halka Lubliniec",
  description: "Fotograficzna kronika koncertów, wyjazdów i spotkań Zespołu Pieśni i Tańca Halka z Lublińca.",
};

export default function Chronicle() {
  return <ChroniclePage />;
}
