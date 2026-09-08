import { HalkaHome } from "./HalkaHome";
import { getGalleryEvents, getGalleryPageContent } from "../sanity/content";
import "./home-v2.css";
import "./home-responsive.css";

export default async function Home() {
  const [galleryEvents, galleryContent] = await Promise.all([getGalleryEvents(), getGalleryPageContent()]);
  return <HalkaHome galleryEvents={galleryEvents} galleryContent={galleryContent} />;
}
