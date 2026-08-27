import { access, copyFile, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const projectRoot = path.resolve(import.meta.dirname, "..");
const openaiDir = path.join(projectRoot, ".openai");
const activeHostingPath = path.join(openaiDir, "hosting.json");
const previewHostingPath = path.join(openaiDir, "hosting.json");
const productionHostingPath = path.join(openaiDir, "hosting.production.json");

const args = new Set(process.argv.slice(2));
const targetArg = [...args].find((value) => value.startsWith("--target="));
const target = targetArg ? targetArg.split("=")[1] : "preview";

const targetConfigMap = {
  preview: previewHostingPath,
  production: productionHostingPath,
};

const deployPrompts = {
  preview:
    "Publish the current site in this directory to the Sites project configured in .openai/hosting.json. Use the existing source in this folder, build if needed, and deploy it. Do not redesign or modify content unless deployment strictly requires it. Return the deployed URL or a clear blocker.",
  production:
    "Publish the current site in this directory to the production Sites project configured in .openai/hosting.json. Use the existing source in this folder, build if needed, and deploy it. Do not redesign or modify content unless deployment strictly requires it. Return the deployed URL or a clear blocker.",
};

function fail(message) {
  console.error(`\n[deploy] ${message}`);
  process.exit(1);
}

function run(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, {
    cwd: projectRoot,
    stdio: "inherit",
    shell: false,
    ...options,
  });

  if (result.error) {
    fail(`Nie udalo sie uruchomic polecenia \`${command}\`: ${result.error.message}`);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

async function ensureFileExists(filePath, label) {
  try {
    await access(filePath, constants.F_OK);
  } catch {
    fail(`Brakuje pliku ${label}: ${filePath}`);
  }
}

async function maybeSwitchHostingConfig(selectedConfigPath) {
  const [selectedContent, activeContent] = await Promise.all([
    readFile(selectedConfigPath, "utf8"),
    readFile(activeHostingPath, "utf8"),
  ]);

  if (selectedContent !== activeContent) {
    await copyFile(selectedConfigPath, activeHostingPath);
    console.log(`[deploy] Ustawiono hosting config dla targetu: ${target}`);
  }
}

async function main() {
  const selectedConfigPath = targetConfigMap[target];

  if (!selectedConfigPath) {
    fail("Nieznany target. Uzyj `preview` albo `production`.");
  }

  await ensureFileExists(activeHostingPath, ".openai/hosting.json");
  await ensureFileExists(selectedConfigPath, path.relative(projectRoot, selectedConfigPath));

  await maybeSwitchHostingConfig(selectedConfigPath);

  console.log(`[deploy] Start deploya dla targetu: ${target}`);
  console.log("[deploy] Buduje aktualna wersje strony...");
  run("cmd", ["/c", "npm", "run", "build"]);

  console.log("[deploy] Publikuje strone przez lokalnego Codexa...");
  run("codex", [
    "exec",
    "--cd",
    projectRoot,
    "--skip-git-repo-check",
    "--approve-for-me",
    deployPrompts[target],
  ]);
}

await main();
