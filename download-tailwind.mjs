// download-tailwind.mjs
// Fetches the complete Tailwind CSS file and saves it to code.txt
// Requires Node.js 18+ (uses built-in fetch)

import { writeFile } from "node:fs/promises";

// ---- Choose your build target ----
const TARGETS = {
  // Tailwind v4 — full compiled browser bundle (includes everything)
  v4: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4/dist/index.global.js",

  // Tailwind v3 — full Play CDN script (JIT engine in browser)
  v3: "https://cdn.tailwindcss.com/3.4.16",

  // Tailwind v2 — full compiled CSS (utility classes baked in)
  v2: "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
};

// Change this to "v3" or "v2" if you need an older version
const VERSION = "v4";
const OUTPUT_FILE = "code.txt";

async function downloadTailwind() {
  const url = TARGETS[VERSION];
  if (!url) {
    console.error(`❌ Unknown version "${VERSION}". Use one of: ${Object.keys(TARGETS).join(", ")}`);
    process.exit(1);
  }

  console.log(`⬇️  Fetching Tailwind (${VERSION}) from:\n   ${url}\n`);

  try {
    const start = Date.now();
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const content = await res.text();
    const sizeKB = (Buffer.byteLength(content) / 1024).toFixed(2);
    const timeMs = Date.now() - start;

    // Add a small header so the file is self-documenting
    const header = `/* =========================================================
 * Tailwind CSS — ${VERSION}
 * Source: ${url}
 * Downloaded: ${new Date().toISOString()}
 * Size: ${sizeKB} KB
 * ========================================================= */

`;

    await writeFile(OUTPUT_FILE, header + content, "utf8");

    console.log(`✅ Saved to ${OUTPUT_FILE}`);
    console.log(`   Size: ${sizeKB} KB`);
    console.log(`   Time: ${timeMs} ms`);
  } catch (err) {
    console.error("❌ Download failed:", err.message);
    process.exit(1);
  }
}

downloadTailwind();