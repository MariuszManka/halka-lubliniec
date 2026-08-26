import type { Metadata } from "next";
import { JoinPage } from "../JoinPage";
import { getJoinPageContent } from "../../sanity/content";
import "../home-v2.css";
import "../join.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dołącz do Halki | ZPiT Halka Lubliniec",
  description: "Nabór do czterech grup Zespołu Pieśni i Tańca Halka trwa przez cały rok. Zajęcia są bezpłatne, bez przesłuchań i bez wymaganego doświadczenia.",
};

export default async function JoinRoute() {
  const content = await getJoinPageContent();
  return <JoinPage content={content} />;
}
