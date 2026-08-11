import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const siteRoot = process.cwd();
const configPath = path.join(siteRoot, "content", "session.config.json");
const sourceFiles = [
  "app/HalkaSite.tsx",
  "app/CostumesPage.tsx",
  "app/ChroniclePage.tsx",
  "content/costumes.ts",
  "content/site-content.ts",
];

const source = (await Promise.all(sourceFiles.map(async (file) => {
  try { return await readFile(path.join(siteRoot, file), "utf8"); }
  catch { return ""; }
}))).join("\n");

const config = JSON.parse(await readFile(configPath, "utf8"));
const isReferenced = (name) =>
  source.includes(`"${name}"`) ||
  source.includes(`'${name}'`) ||
  source.includes(`/session/${name}.webp`);

const nextConfig = config.map((item) => ({
  ...item,
  enabled: isReferenced(item.name),
}));
const enabled = nextConfig.filter((item) => item.enabled).length;

await writeFile(configPath, `${JSON.stringify(nextConfig, null, 2)}\n`, "utf8");
console.log(`Gotowe: ${enabled} używanych zdjęć aktywnych, ${nextConfig.length - enabled} nieużywanych wyłączonych.`);
