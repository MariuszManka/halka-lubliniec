import { HeroVariants } from "../HeroVariants";
import { getHeroVariantsPageCopy, getSharedContent } from "../../sanity/content";

export default async function HeroVariantsPage() {
  const [copy, shared] = await Promise.all([getHeroVariantsPageCopy(), getSharedContent()]);
  return <HeroVariants copy={copy} shared={shared} />;
}
