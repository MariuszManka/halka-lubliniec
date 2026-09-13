import { HalkaHome } from "./HalkaHome";
import { getEventsPageContent, getGalleryEvents, getHomePageCopy, getSharedContent } from "../sanity/content";
import "./home-v2.css";
import "./home-responsive.css";

export default async function Home() {
  const [galleryEvents, copy, shared, eventsContent] = await Promise.all([
    getGalleryEvents(), getHomePageCopy(), getSharedContent(), getEventsPageContent(),
  ]);
  return <HalkaHome galleryEvents={galleryEvents} copy={copy} shared={shared} eventsContent={eventsContent} />;
}
