import { HeroVariants } from "../HeroVariants";
import { getHeroVariantsPageCopy } from "../../sanity/content";

export default async function HeroVariantsPage() {
  return <HeroVariants copy={await getHeroVariantsPageCopy()} />;
}
