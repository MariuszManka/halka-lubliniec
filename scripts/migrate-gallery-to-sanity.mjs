import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-08-26" });
const publicDir = join(process.cwd(), "public");
const pageDefaults = JSON.parse(readFileSync(new URL("../content/gallery-page-defaults.json", import.meta.url), "utf8"));
const generatedSource = readFileSync(new URL("../content/generated-gallery.ts", import.meta.url), "utf8");
const galleryEvents = JSON.parse(generatedSource.slice(generatedSource.indexOf("["), generatedSource.lastIndexOf("]") + 1));

async function uploadImage(image, key) {
  const sourcePath = join(publicDir, image.src.replace(/^\//, ""));
  if (!existsSync(sourcePath)) throw new Error(`Brakuje pliku: ${sourcePath}`);

  const asset = await client.assets.upload("image", createReadStream(sourcePath), {
    filename: basename(sourcePath),
    title: image.alt,
  });

  return {
    _key: key,
    _type: "galleryPhoto",
    asset: { _type: "reference", _ref: asset._id },
    alt: image.alt,
  };
}

async function createGalleryPage() {
  const existing = await client.getDocument("galleryPage");
  if (existing) {
    console.log("Teksty galerii już istnieją — pozostawiono je bez zmian.");
    return;
  }

  const heroImage = await uploadImage(pageDefaults.hero.image, "hero-image");
  await client.create({
    _id: "galleryPage",
    _type: "galleryPage",
    ...pageDefaults,
    hero: {
      ...pageDefaults.hero,
      image: { ...heroImage, _type: "image" },
    },
  });
  console.log("Dodano teksty strony galerii.");
}

async function createAlbum(event) {
  const documentId = `galleryAlbum-${event.id}`;
  if (await client.getDocument(documentId)) {
    console.log(`Pominięto istniejącą galerię: ${event.title}`);
    return;
  }

  const images = [];
  for (const [index, image] of event.images.entries()) {
    images.push(await uploadImage(image, `photo-${String(index + 1).padStart(3, "0")}`));
    process.stdout.write(`\r${event.title}: ${index + 1}/${event.images.length}`);
  }
  process.stdout.write("\n");

  await client.create({
    _id: documentId,
    _type: "galleryAlbum",
    title: event.title,
    slug: { _type: "slug", current: event.id },
    date: event.date,
    location: event.location,
    description: event.description,
    credit: event.credit,
    tags: [],
    featured: event.pinned,
    images,
  });
  console.log(`Dodano galerię: ${event.title}`);
}

await createGalleryPage();
for (const event of galleryEvents) await createAlbum(event);

console.log(`Migracja zakończona: ${galleryEvents.length} galerii, ${galleryEvents.reduce((sum, event) => sum + event.images.length, 0)} zdjęć.`);
