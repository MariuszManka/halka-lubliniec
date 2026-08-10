import { access, readFile, rm, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const siteRoot = process.cwd();
const assetsRoot = process.env.HALKA_ASSETS_DIR
  ? path.resolve(process.env.HALKA_ASSETS_DIR)
  : path.resolve(siteRoot, "..", "ASSETS");
const sessionRoot = path.join(assetsRoot, "Sesja zdjęciowa");
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

const output = `// Ten plik powstaje automatycznie przez npm run media:sync.\nexport const sessionImages = ${JSON.stringify(images, null, 2)} as const;\n`;
await writeFile(path.join(siteRoot, "content", "generated-session.ts"), output, "utf8");
console.log(`Gotowe: ${images.length} zdjęć z sesji.`);
