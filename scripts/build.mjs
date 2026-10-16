// Builds two copies of the game from src/index.html:
//   site/  the website (upload to Netlify). Loads Python and fonts from the internet.
//   www/   the Android app. Python engine and fonts are bundled, so it works offline.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const src = readFileSync(join(root, "src/index.html"), "utf8");
const nm = (p) => join(root, "node_modules", p);

// src/index.html starts with head material (title, meta, fonts, style) followed by the app markup.
const split = src.indexOf('<div id="app"');
if (split < 0) throw new Error('src/index.html must contain <div id="app">');
const headPart = src.slice(0, split).replace(/<meta name="claude:[^>]*>\s*/g, "");
const bodyPart = src.slice(split);

const page = (head, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Python Quest: learn Python by playing. 24 levels, real code, XP, streaks and trophies.">
<meta name="theme-color" content="#2E69B0">
<link rel="icon" href="icon.png">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
${head.trim()}
</head>
<body>
${body.trim()}
</body>
</html>
`;

function fresh(dir) { rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true }); }

/* ---------- website ---------- */
const site = join(root, "site");
fresh(site);
writeFileSync(join(site, "index.html"), page(headPart, bodyPart));
copyFileSync(join(root, "assets/icon-512.png"), join(site, "icon.png"));
const apk = join(root, "python-quest.apk");
if (existsSync(apk)) { copyFileSync(apk, join(site, "python-quest.apk")); console.log("site: included python-quest.apk"); }
else console.log("site: no python-quest.apk yet — the download card will say 'Coming soon' until you add it");

/* ---------- Android app ---------- */
const www = join(root, "www");
fresh(www);
mkdirSync(join(www, "vendor")); mkdirSync(join(www, "fonts"));
copyFileSync(nm("skulpt/dist/skulpt.min.js"), join(www, "vendor/skulpt.min.js"));
copyFileSync(nm("skulpt/dist/skulpt-stdlib.js"), join(www, "vendor/skulpt-stdlib.js"));

const fonts = [
  ["Bungee", "bungee", [400]],
  ["Nunito", "nunito", [400, 600, 700, 800]],
  ["JetBrains Mono", "jetbrains-mono", [400, 600]],
];
let css = "";
for (const [family, pkg, weights] of fonts) for (const w of weights) {
  const file = `${pkg}-latin-${w}-normal.woff2`;
  copyFileSync(nm(`@fontsource/${pkg}/files/${file}`), join(www, "fonts", file));
  css += `@font-face{font-family:"${family}";font-style:normal;font-weight:${w};font-display:swap;src:url(${file}) format("woff2")}\n`;
}
writeFileSync(join(www, "fonts/fonts.css"), css);

let appHead = headPart
  .replace(/<link rel="preconnect"[^>]*>\s*/g, "")
  .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, '<link rel="stylesheet" href="fonts/fonts.css">');
let appBody = bodyPart
  .replace("const IN_APP = false;", "const IN_APP = true;")
  .replace("https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js", "vendor/skulpt.min.js")
  .replace("https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js", "vendor/skulpt-stdlib.js");
for (const must of ["const IN_APP = true;", '"vendor/skulpt.min.js"', '"vendor/skulpt-stdlib.js"']) {
  if (!appBody.includes(must)) throw new Error("Android build: could not set " + must + " — did src/index.html change?");
}
if (!appHead.includes("fonts/fonts.css")) throw new Error("Android build: could not swap the Google Fonts link");
writeFileSync(join(www, "index.html"), page(appHead, appBody));
copyFileSync(join(root, "assets/icon-512.png"), join(www, "icon.png"));
console.log("built site/ (website) and www/ (Android app)");
