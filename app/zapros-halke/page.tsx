import type { Metadata } from "next";
import { InvitePage } from "../InvitePage";
import { getInvitePageContent, getSharedContent } from "../../sanity/content";
import "../home-v2.css";
import "../invite.css";
import "../invite-responsive.css";

// Firebase Hosting serves a static export. Sanity is read while `next build` runs.
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getInvitePageContent();
  return { title: content.meta.title, description: content.meta.description };
}

export default async function InviteRoute() {
  const [content, shared] = await Promise.all([getInvitePageContent(), getSharedContent()]);
  return <InvitePage content={content} shared={shared} />;
}
