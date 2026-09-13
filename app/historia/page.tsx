import type { Metadata } from "next";
import { HistoryPage } from "../HistoryPage";
import "../home-v2.css";
import "../history.css";
import { getHistoryPageContent, getSharedContent } from "../../sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getHistoryPageContent();
  return { title: copy["meta.title"], description: copy["meta.description"] };
}

export default async function HistoryRoute() {
  const [content, shared] = await Promise.all([getHistoryPageContent(), getSharedContent()]);
  return <HistoryPage content={content} shared={shared} />;
}
