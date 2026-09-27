// dump-project.mjs
// Recursively collects all source files in a Next.js project into code.txt.
// Usage: node dump-project.mjs

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative, extname, basename } from "node:path";

// ---------------- Configuration ----------------

const OUTPUT_FILE = "code.txt";
const ROOT = process.cwd();

// Directories to skip entirely (matched by name, at any depth)
const IGNORE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  ".turbo",
  ".vercel",
  ".swc",
  "dist",
  "build",
  "out",
  "coverage",
  ".idea",
  ".vscode",
  "public",        // remove if you want images/fonts listed
]);

// Files to skip by name
const IGNORE_FILES = new Set([
  ".DS_Store",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",
  "code.txt",
  ".env",
  ".env.local",
  ".env.production",
]);

// Only include these extensions (add/remove as you like)
// Set to null to include everything not ignored.
const ALLOWED_EXT = new Set([
  ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs",
  ".css", ".scss", ".sass", ".less",
  ".json", ".md", ".mdx", ".txt",
  ".html", ".svg",
  ".yml", ".yaml",
  ".prisma", ".graphql", ".gql",
]);

// Max file size to include (skip large generated/asset files)
const MAX_FILE_SIZE = 500 * 1024; // 500 KB

// ---------------- Helpers ----------------

function shouldIgnoreDir(name) {
  return IGNORE_DIRS.has(name) || name.startsWith(".");
}

function shouldIgnoreFile(name) {
  if (IGNORE_FILES.has(name)) return true;
  if (name.startsWith(".")) return true; // dotfiles
  if (ALLOWED_EXT && !ALLOWED_EXT.has(extname(name))) return true;
  return false;
}

function extToLang(ext) {
  const map = {
    ".js": "javascript", ".jsx": "jsx", ".ts": "typescript",
    ".tsx": "tsx", ".mjs": "javascript", ".cjs": "javascript",
    ".css": "css", ".scss": "scss", ".sass": "sass", ".less": "less",
    ".json": "json", ".md": "markdown", ".mdx": "mdx", ".txt": "text",
    ".html": "html", ".svg": "xml", ".yml": "yaml", ".yaml": "yaml",
    ".prisma": "prisma", ".graphql": "graphql", ".gql": "graphql",
  };
  return map[ext] || "";
}

// ---------------- Recursive walker ----------------

async function walk(dir, files = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (shouldIgnoreDir(entry.name)) continue;
      await walk(fullPath, files);
    } else if (entry.isFile()) {
      if (shouldIgnoreFile(entry.name)) continue;

      try {
        const info = await stat(fullPath);
        if (info.size > MAX_FILE_SIZE) continue;
      } catch {
        continue;
      }

      files.push(fullPath);
    }
  }
  return files;
}

// ---------------- File tree renderer ----------------

function buildTree(paths, root) {
  const tree = {};
  for (const p of paths) {
    const rel = relative(root, p).split(/[\\/]/);
    let node = tree;
    for (const part of rel) {
      if (!node[part]) node[part] = {};
      node = node[part];
    }
  }

  function render(node, prefix = "") {
    const keys = Object.keys(node).sort((a, b) => {
      const aIsDir = Object.keys(node[a]).length > 0;
      const bIsDir = Object.keys(node[b]).length > 0;
      if (aIsDir !== bIsDir) return aIsDir ? -1 : 1;
      return a.localeCompare(b);
    });

    let out = "";
    keys.forEach((key, i) => {
      const isLast = i === keys.length - 1;
      const branch = isLast ? "└── " : "├── ";
      const isDir = Object.keys(node[key]).length > 0;
      out += `${prefix}${branch}${key}${isDir ? "/" : ""}\n`;
      if (isDir) {
        out += render(node[key], prefix + (isLast ? "    " : "│   "));
      }
    });
    return out;
  }

  return render(tree);
}

// ---------------- Main ----------------

async function main() {
  console.log(`📂 Scanning project at: ${ROOT}`);

  const files = await walk(ROOT);
  files.sort((a, b) => a.localeCompare(b));

  console.log(`✅ Found ${files.length} source files.\n`);

  const projectName = basename(ROOT);
  const generated = new Date().toISOString();

  let output = "";
  output += `${"=".repeat(72)}\n`;
  output += `PROJECT: ${projectName}\n`;
  output += `GENERATED: ${generated}\n`;
  output += `FILES: ${files.length}\n`;
  output += `${"=".repeat(72)}\n\n`;

  // ---------- File tree ----------
  output += `PROJECT STRUCTURE\n`;
  output += `${"-".repeat(72)}\n`;
  output += `${projectName}/\n`;
  output += buildTree(files, ROOT);
  output += `\n`;

  // ---------- File contents ----------
  output += `${"=".repeat(72)}\n`;
  output += `FILE CONTENTS\n`;
  output += `${"=".repeat(72)}\n\n`;

  let totalBytes = 0;

  for (const file of files) {
    const rel = relative(ROOT, file);
    let content;

    try {
      content = await readFile(file, "utf8");
    } catch {
      content = "// [binary or unreadable file — skipped]";
    }

    totalBytes += Buffer.byteLength(content);

    output += `${"#".repeat(72)}\n`;
    output += `# FILE: ${rel}\n`;
    output += `${"#".repeat(72)}\n\n`;

    const lang = extToLang(extname(file));
    output += "```" + lang + "\n";
    output += content.replace(/\n?$/, "\n"); // ensure trailing newline
    output += "```\n\n";
  }

  await writeFile(OUTPUT_FILE, output, "utf8");

  const sizeKB = (Buffer.byteLength(output) / 1024).toFixed(2);
  console.log(`📝 Wrote ${OUTPUT_FILE}`);
  console.log(`   Files: ${files.length}`);
  console.log(`   Size : ${sizeKB} KB`);
  console.log(`   Code : ${(totalBytes / 1024).toFixed(2)} KB`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});