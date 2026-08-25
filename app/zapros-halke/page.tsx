import type { Metadata } from "next";
import { InvitePage } from "../InvitePage";
import "../home-v2.css";
import "../invite.css";

export const metadata: Metadata = {
  title: "Zaproś Halkę na wydarzenie | ZPiT Halka Lubliniec",
  description: "Poznaj gotowe suity i możliwe formaty występu Zespołu Pieśni i Tańca Halka. Zapytaj o dostępność zespołu i wspólnie ustal program wydarzenia.",
};

export default function InviteRoute() {
  return <InvitePage />;
}
