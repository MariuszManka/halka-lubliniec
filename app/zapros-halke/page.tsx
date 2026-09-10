import type { Metadata } from "next";
import { InvitePage } from "../InvitePage";
import { getInvitePageContent } from "../../sanity/content";
import "../home-v2.css";
import "../invite.css";
import "../invite-responsive.css";

// Firebase Hosting serves a static export. Sanity is read while `next build` runs.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Zaproś Halkę na wydarzenie | ZPiT Halka Lubliniec",
  description: "Poznaj gotowe suity i możliwe formaty występu Zespołu Pieśni i Tańca Halka. Zapytaj o dostępność zespołu i wspólnie ustal program wydarzenia.",
};

export default async function InviteRoute() {
  const content = await getInvitePageContent();
  return <InvitePage content={content} />;
}
