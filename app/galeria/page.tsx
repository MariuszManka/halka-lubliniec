import type { Metadata } from "next";
import { ChroniclePage } from "../ChroniclePage";
import { getGalleryEvents, getGalleryPageContent, getGalleryUiCopy, getSharedContent } from "../../sanity/content";
import "../gallery.css";

export async function generateMetadata(): Promise<Metadata> {
  const ui = await getGalleryUiCopy();
  return { title: ui["meta.title"], description: ui["meta.description"] };
}

export default async function Gallery() {
  const [galleryEvents, content, ui, shared] = await Promise.all([getGalleryEvents(), getGalleryPageContent(), getGalleryUiCopy(), getSharedContent()]);
  return <ChroniclePage galleryEvents={galleryEvents} content={content} ui={ui} shared={shared} />;
}
