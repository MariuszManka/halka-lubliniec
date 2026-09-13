import type { Metadata } from "next";
import { CostumesPage } from "../CostumesPage";
import { getCostumesPageContent, getSharedContent } from "../../sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getCostumesPageContent();
  return { title: copy["meta.title"], description: copy["meta.description"] };
}

export default async function Costumes() {
  const [content, shared] = await Promise.all([getCostumesPageContent(), getSharedContent()]);
  return <CostumesPage content={content} shared={shared} />;
}
