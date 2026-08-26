import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { getCliClient } from "sanity/cli";

const defaults = JSON.parse(readFileSync(new URL("../content/cms-defaults.json", import.meta.url), "utf8"));
const client = getCliClient({ apiVersion: "2026-08-26" });
const publicDir = join(process.cwd(), "public");

async function uploadImages(value) {
  if (Array.isArray(value)) return Promise.all(value.map(uploadImages));
  if (!value || typeof value !== "object") return value;

  if (typeof value.src === "string" && typeof value.alt === "string") {
    const sourcePath = join(publicDir, value.src.replace(/^\//, ""));
    if (!existsSync(sourcePath)) {
      console.warn(`Pominięto brakujące zdjęcie: ${value.src}`);
      return undefined;
    }
    const asset = await client.assets.upload("image", createReadStream(sourcePath), { filename: basename(sourcePath) });
    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: value.alt,
    };
  }

  const entries = await Promise.all(Object.entries(value).map(async ([key, nested]) => [key, await uploadImages(nested)]));
  return Object.fromEntries(entries.filter(([, nested]) => nested !== undefined));
}

for (const [key, value] of Object.entries(defaults)) {
  const documentId = key === "joinPage" ? "joinPage" : "invitePage";
  const document = await uploadImages(value);
  await client.createOrReplace({ _id: documentId, _type: documentId, ...document });
  console.log(`Zapisano dane startowe: ${documentId}`);
}

