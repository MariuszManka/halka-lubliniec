import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-08-26" });
const publicDir = join(process.cwd(), "public");

type SanityImage = {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
  alt: string;
};

async function imageFromCurrentPage(relativePath: string, alt: string): Promise<SanityImage> {
  const filename = basename(relativePath);
  const existingId = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );
  let assetId = existingId;
  if (!assetId) {
    const absolutePath = join(publicDir, relativePath);
    if (!existsSync(absolutePath)) throw new Error(`Brak zdjęcia używanego na stronie: ${absolutePath}`);
    assetId = (await client.assets.upload("image", createReadStream(absolutePath), { filename }))._id;
  }
  return { _type: "image", asset: { _type: "reference", _ref: assetId }, alt };
}

const page = await client.fetch<{
  hero: { imageAlt?: string };
  formats: { imageAlts?: string[]; items: Array<Record<string, unknown> & { _key: string }> };
  process: { activeImageAlt?: string };
}>(`*[_id == "invitePage"][0]{hero,formats,process}`);

const heroImage = await imageFromCurrentPage(
  "invite/invite-header-image2.webp",
  page.hero.imageAlt || "Tancerze Halki podczas wydarzenia plenerowego",
);
const formatPaths = [
  "gallery/dni-lublinca-2025/08.webp",
  "gallery/tydzien-kultury-beskidzkiej-2026/10.webp",
  "gallery/dni-lublinca-2025/14.webp",
];
const formatAltFallbacks = [
  "Para taneczna Halki podczas suity śląskiej",
  "Męska część chóru Halki podczas występu",
  "Wszystkie pokolenia Halki na jednej scenie",
];
const formatImages = await Promise.all(formatPaths.map((path, index) => imageFromCurrentPage(
  path,
  page.formats.imageAlts?.[index] || formatAltFallbacks[index],
)));
const processImage = await imageFromCurrentPage(
  "session/modal-cieszyn-male-02.webp",
  page.process.activeImageAlt || "Tancerze Halki ćwiczący w parach podczas warsztatów w Wiśle",
);

await client.patch("invitePage").set({
  skipLabel: "Przejdź do treści",
  "hero.image": heroImage,
  "formats.items": page.formats.items.map((item, index) => {
    const currentItem = { ...item };
    delete currentItem.icon;
    return { ...currentItem, _type: "performanceFormat", image: formatImages[index] };
  }),
  "process.image": processImage,
}).unset([
  "hero.titleSuffix",
  "hero.secondaryCtaLabel",
  "hero.imageAlt",
  "formats.imageAlts",
  "process.activeImageAlt",
]).commit();

console.log("Dokument „Zaproś Halkę” odpowiada aktywnym tekstom i zdjęciom strony.");
