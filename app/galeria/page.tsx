import type { Metadata } from "next";
import { ChroniclePage } from "../ChroniclePage";
import { getGalleryEvents, getGalleryPageContent } from "../../sanity/content";
import "../gallery.css";

export const metadata: Metadata = {
  title: "Galeria zespołu | Halka Lubliniec",
  description: "Galerie z koncertów, warsztatów, wyjazdów i spotkań Zespołu Pieśni i Tańca Halka z Lublińca.",
};

export default async function Gallery() {
  const [galleryEvents, content] = await Promise.all([getGalleryEvents(), getGalleryPageContent()]);
  return <ChroniclePage galleryEvents={galleryEvents} content={content} />;
}
