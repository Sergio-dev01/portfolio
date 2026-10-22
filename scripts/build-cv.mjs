// Genera il PDF del CV a partire da cv/cv.html usando Chrome in modalità headless.
// Uso: npm run cv   (se Chrome è in un percorso diverso, imposta CHROME_PATH)
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "cv/cv.html");
const output = resolve(root, "public/CV-Maselli-Sergio-Francesco.pdf");

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chrome non trovato: imposta la variabile CHROME_PATH con il percorso del browser.");
  process.exit(1);
}

execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--virtual-time-budget=10000",
  `--print-to-pdf=${output}`,
  pathToFileURL(source).href,
], { stdio: "pipe" }); // Chrome scrive avvisi irrilevanti su stderr: si vedono solo se fallisce

console.log(`CV generato: ${output}`);
