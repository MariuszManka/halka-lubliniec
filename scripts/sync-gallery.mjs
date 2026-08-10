import { access, readdir, readFile, rm, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const siteRoot = process.cwd();
const assetsRoot = process.env.HALKA_ASSETS_DIR
  ? path.resolve(process.env.HALKA_ASSETS_DIR)
  : path.resolve(siteRoot, "..", "ASSETS");
const outputRoot = path.join(siteRoot, "public", "gallery");
const configPath = path.join(siteRoot, "content", "gallery.config.json");
const manifestPath = path.join(siteRoot, "content", "generated-gallery.ts");

try {
  await access(assetsRoot);
} catch {
  console.log("Pominięto synchronizację galerii: lokalny folder ASSETS nie jest dostępny w tym środowisku.");
  process.exit(0);
}

const config = JSON.parse(await readFile(configPath, "utf8"));
const overrides = new Map(config.map((event) => [event.folder, event]));

const folders = (await readdir(assetsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => name !== "Sesja zdjęciowa")
  .filter((name) => overrides.has(name) || /(?:20\d{2}[.-]\d{2}[.-]\d{2}|\d{2}[.-]\d{2}[.-]20\d{2})/.test(name))
  .sort((a, b) => a.localeCompare(b, "pl", { numeric: true }));

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const findImages = async (folder) => {
  const results = [];
  const walk = async (current) => {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(fullPath);
      if (entry.isFile() && /\.(jpe?g|png|webp)$/i.test(entry.name)) results.push(fullPath);
    }
  };
  await walk(path.join(assetsRoot, folder));
  return results.sort((a, b) => a.localeCompare(b, "pl", { numeric: true }));
};

const dateFromFolder = (folder) => {
  const iso = folder.match(/(20\d{2})[.-](\d{2})[.-](\d{2})/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const polish = folder.match(/(\d{2})[.-](\d{2})[.-](20\d{2})/);
  if (polish) return `${polish[3]}-${polish[2]}-${polish[1]}`;
  const year = folder.match(/(20\d{2})/);
  return year ? `${year[1]}-01-01` : "1948-01-01";
};

const titleFromFolder = (folder) =>
  folder
    .replace(/^\d{2,4}[.-]\d{2}[.-]\d{2,4}\s*-\s*/i, "")
    .replace(/^Halka\s*-\s*/i, "")
    .replace(/-1-001$/i, "")
    .trim();

const chooseIndexes = (count, maximum = 16) => {
  if (count <= maximum) return Array.from({ length: count }, (_, index) => index);
  return Array.from({ length: maximum }, (_, index) =>
    Math.round((index * (count - 1)) / (maximum - 1)),
  );
};

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const events = [];
for (const folder of folders) {
  const files = await findImages(folder);
  if (!files.length) continue;

  const override = overrides.get(folder) ?? {};
  const selectedIndexes = override.selected
    ? override.selected.map((number) => number - 1).filter((index) => files[index])
    : chooseIndexes(files.length);
  const slug = slugify(override.title ?? titleFromFolder(folder));
  const eventOutput = path.join(outputRoot, slug);
  await mkdir(eventOutput, { recursive: true });

  const images = [];
  for (const [position, sourceIndex] of selectedIndexes.entries()) {
    const source = files[sourceIndex];
    const filename = `${String(position + 1).padStart(2, "0")}.webp`;
    const target = path.join(eventOutput, filename);
    const pipeline = sharp(source).rotate().resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true });
    const info = await pipeline.webp({ quality: 80, effort: 5 }).toFile(target);
    images.push({
      src: `/gallery/${slug}/${filename}`,
      width: info.width,
      height: info.height,
      alt: `${override.title ?? titleFromFolder(folder)}, zdjęcie ${position + 1}`,
    });
  }

  const date = override.date ?? dateFromFolder(folder);
  events.push({
    id: slug,
    year: Number(date.slice(0, 4)),
    pinned: override.pinned ?? false,
    title: override.title ?? titleFromFolder(folder),
    date,
    location: override.location ?? "Lubliniec",
    description: override.description ?? "Wspomnienie zapisane w kronice zespołu.",
    credit: override.credit ?? "Archiwum zespołu",
    images,
  });
}

events.sort((a, b) => b.date.localeCompare(a.date));
const output = `// Ten plik powstaje automatycznie przez npm run gallery:sync.\nexport const galleryEvents = ${JSON.stringify(events, null, 2)} as const;\n`;
await writeFile(manifestPath, output, "utf8");
console.log(`Gotowe: ${events.length} wydarzenia, ${events.reduce((sum, event) => sum + event.images.length, 0)} zdjęć.`);
