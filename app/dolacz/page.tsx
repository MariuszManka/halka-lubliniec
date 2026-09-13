import type { Metadata } from "next";
import { JoinPage } from "../JoinPage";
import { getEventsPageContent, getJoinPageContent, getJoinUiCopy, getSharedContent } from "../../sanity/content";
import "../home-v2.css";
import "../join.css";
import "../join-responsive.css";

// Firebase Hosting serves a static export. Sanity is read while `next build` runs.
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getJoinUiCopy();
  return { title: copy["meta.title"], description: copy["meta.description"] };
}

export default async function JoinRoute() {
  const [content, ui, shared, events] = await Promise.all([getJoinPageContent(), getJoinUiCopy(), getSharedContent(), getEventsPageContent()]);
  return <JoinPage content={content} ui={ui} shared={shared} calendarEvents={events.calendarEvents} />;
}
