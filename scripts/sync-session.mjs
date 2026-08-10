import { access, readFile, readdir, rm, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const siteRoot = process.cwd();
const assetsRoot = process.env.HALKA_ASSETS_DIR
  ? path.resolve(process.env.HALKA_ASSETS_DIR)
  : path.resolve(siteRoot, "..", "ASSETS");
const sessionRoot = path.join(assetsRoot, "Sesja zdjęciowa");
const curatedCostumesRoot = path.join(sessionRoot, "do użycia");
const outputRoot = path.join(siteRoot, "public", "session");

try {
  await access(sessionRoot);
} catch {
  console.log("Pominięto synchronizację sesji: lokalny folder ASSETS nie jest dostępny w tym środowisku.");
  process.exit(0);
}

const config = JSON.parse(
  await readFile(path.join(siteRoot, "content", "session.config.json"), "utf8"),
);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const images = [];
for (const item of config) {
  const source = path.join(sessionRoot, ...item.source.split("/"));
  const filename = `${item.name}.webp`;
  const info = await sharp(source)
    .rotate()
    .resize({ width: 2200, height: 2200, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(outputRoot, filename));
  images.push({
    name: item.name,
    src: `/session/${filename}`,
    alt: item.alt,
    width: info.width,
    height: info.height,
  });
}

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const costumeModalImages = {};

const syncCuratedCostumes = async (current) => {
  const entries = (await readdir(current, { withFileTypes: true }))
    .sort((a, b) => a.name.localeCompare(b.name, "pl", { numeric: true }));

  const relativeSegments = path.relative(curatedCostumesRoot, current).split(path.sep).filter(Boolean);
  const currentFolder = relativeSegments.at(-1) ?? "";
  const gender = /damski/i.test(currentFolder) ? "female" : /męski/i.test(currentFolder) ? "male" : null;

  if (gender) {
    const regionSegments = relativeSegments.slice(0, -1);
    const key = slugify(regionSegments.join("-"));
    const regionLabel = regionSegments.join(" — ");
    const files = entries.filter((entry) => entry.isFile() && /\.(jpe?g|png|webp)$/i.test(entry.name));
    costumeModalImages[key] ??= { female: [], male: [] };

    for (const [index, entry] of files.entries()) {
      const filename = `modal-${key}-${gender}-${String(index + 1).padStart(2, "0")}.webp`;
      const name = filename.replace(/\.webp$/, "");
      const info = await sharp(path.join(current, entry.name))
        .rotate()
        .resize({ width: 2200, height: 2200, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(path.join(outputRoot, filename));

      costumeModalImages[key][gender].push(name);
      images.push({
        name,
        src: `/session/${filename}`,
        alt: `${gender === "female" ? "Strój damski" : "Strój męski"} — ${regionLabel}, fotografia ${index + 1}`,
        width: info.width,
        height: info.height,
      });
    }
    return;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) await syncCuratedCostumes(path.join(current, entry.name));
  }
};

await syncCuratedCostumes(curatedCostumesRoot);

const output = `// Ten plik powstaje automatycznie przez npm run media:sync.\nexport const sessionImages = ${JSON.stringify(images, null, 2)} as const;\n`;
await writeFile(path.join(siteRoot, "content", "generated-session.ts"), output, "utf8");
const costumeModalOutput = `// Ten plik powstaje automatycznie przez npm run media:sync.\nexport const costumeModalImages = ${JSON.stringify(costumeModalImages, null, 2)} as const;\n`;
await writeFile(path.join(siteRoot, "content", "generated-costume-modal.ts"), costumeModalOutput, "utf8");
console.log(`Gotowe: ${images.length} zdjęć z sesji, w tym ${Object.values(costumeModalImages).reduce((sum, group) => sum + group.female.length + group.male.length, 0)} w modalach kostiumów.`);
