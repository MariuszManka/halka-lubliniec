import type { Metadata } from "next";
import { EventsPage } from "../EventsPage";
import "../home-v2.css";
import "../events.css";
import { getEventsPageContent, getSharedContent } from "../../sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getEventsPageContent();
  return { title: copy["meta.title"], description: copy["meta.description"] };
}

export default async function EventsRoute() {
  const [content, shared] = await Promise.all([getEventsPageContent(), getSharedContent()]);
  return <EventsPage content={content} shared={shared} />;
}
