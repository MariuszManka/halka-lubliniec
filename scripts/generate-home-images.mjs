import { access, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const siteRoot = process.cwd();
const sessionRoot = path.join(siteRoot, "public", "session");
const outputRoot = path.join(siteRoot, "public", "home-responsive");

const images = [
  { name: "dance-circle.webp", widths: [960, 1600] },
  { name: "children-group.webp", widths: [960] },
  { name: "2-grupowe-halka-wkf-7642.webp", widths: [960] },
  { name: "2-grupowe-halka-wkf-8263.webp", widths: [960] },
  { name: "2-grupowe-halka-wkf-0785.webp", widths: [960] },
  { name: "group.webp", widths: [960] },
  { name: "modal-zywiec-male-10.webp", widths: [960] },
  { name: "modal-zywiec-female-10.webp", widths: [960] },
  { name: "modal-lublin-female-13.webp", widths: [960] },
  { name: "modal-krakow-male-07.webp", widths: [960] },
  { name: "modal-lublin-female-06.webp", widths: [960] },
];

await mkdir(outputRoot, { recursive: true });

for (const image of images) {
  const source = path.join(sessionRoot, image.name);
  try {
    await access(source);
  } catch {
    console.warn(`Pominięto wariant responsywny: brak ${image.name}`);
    continue;
  }

  for (const width of image.widths) {
    const outputName = image.name.replace(/\.webp$/i, `-${width}.webp`);
    const output = path.join(outputRoot, outputName);
    try {
      const [sourceStat, outputStat] = await Promise.all([stat(source), stat(output)]);
      if (outputStat.mtimeMs >= sourceStat.mtimeMs) continue;
    } catch {
      // Brak aktualnego wariantu — generujemy go poniżej.
    }

    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(output);
  }
}

console.log("Warianty responsywne strony głównej są aktualne.");
