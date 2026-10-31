// Checks data/feeds.json and the README tables, or puts them in order.
//
//   node scripts/feeds.mjs --check   fail if anything is out of order or invalid (runs before every build)
//   node scripts/feeds.mjs --fix     sort feeds.json and every README table A to Z
//
// The rule: feeds are listed A to Z by name, ignoring case, in feeds.json and in each README table.
import { readFileSync, writeFileSync } from "node:fs";

const FEEDS = new URL("../data/feeds.json", import.meta.url);
const README = new URL("../README.md", import.meta.url);
const CATEGORIES = { crypto: "### ₿ Crypto", forex: "### 💱 Forex", stocks: "### 📈 Stocks", macro: "### 🌐 Macro" };

const byName = (a, b) => a.localeCompare(b, "en", { sensitivity: "base" });
const fix = process.argv.includes("--fix");

const feeds = JSON.parse(readFileSync(FEEDS, "utf8"));
const readme = readFileSync(README, "utf8").replace(/\r\n/g, "\n").split("\n");
const problems = [];

// --- feeds.json -------------------------------------------------------------
const seen = new Set();
for (const f of feeds) {
  const where = `feeds.json "${f.name}"`;
  if (!f.name || !f.url || !f.category || !Array.isArray(f.tags) || !f.description) problems.push(`${where}: missing a field`);
  if (!(f.category in CATEGORIES)) problems.push(`${where}: category must be one of ${Object.keys(CATEGORIES).join(", ")}`);
  if (!/^https:\/\//.test(f.url ?? "")) problems.push(`${where}: url must start with https://`);
  if ((f.tags ?? []).length > 3) problems.push(`${where}: at most 3 tags`);
  if ((f.tags ?? []).some((t) => t !== t.toLowerCase())) problems.push(`${where}: tags must be lowercase`);
  for (const key of [f.name?.toLowerCase(), f.url]) {
    if (seen.has(key)) problems.push(`${where}: duplicate name or url`);
    seen.add(key);
  }
}

const sorted = [...feeds].sort((a, b) => byName(a.name, b.name));
const outOfOrder = feeds.findIndex((f, i) => f !== sorted[i]);
if (outOfOrder >= 0) {
  problems.push(`feeds.json is not A to Z: "${feeds[outOfOrder].name}" is where "${sorted[outOfOrder].name}" should be`);
}

// --- README tables ----------------------------------------------------------
function tableRows(heading) {
  const start = readme.indexOf(heading);
  if (start < 0) return null;
  let i = start + 1;
  while (i < readme.length && !readme[i].startsWith("|")) i++;
  const header = i;
  while (i < readme.length && readme[i].startsWith("|")) i++;
  return { first: header + 2, end: i }; // skip the header and separator rows
}

const rowName = (row) => row.split("|")[1].trim();
const rowFor = (f) => `| ${f.name} | [RSS](${f.url}) | ${f.tags.map((t) => "`" + t + "`").join(" ")} |`;

for (const [category, heading] of Object.entries(CATEGORIES)) {
  const table = tableRows(heading);
  if (!table) {
    problems.push(`README.md: no "${heading}" table`);
    continue;
  }
  const rows = readme.slice(table.first, table.end);
  const names = rows.map(rowName);
  const expected = sorted.filter((f) => f.category === category);

  if (fix) {
    readme.splice(table.first, rows.length, ...expected.map(rowFor));
    continue;
  }
  const missing = expected.filter((f) => !names.includes(f.name)).map((f) => f.name);
  const extra = names.filter((n) => !expected.some((f) => f.name === n));
  if (missing.length) problems.push(`README.md ${heading}: missing ${missing.join(", ")}`);
  if (extra.length) problems.push(`README.md ${heading}: not in feeds.json under ${category}: ${extra.join(", ")}`);
  if (names.some((n, i) => i > 0 && byName(names[i - 1], n) > 0)) problems.push(`README.md ${heading}: rows are not A to Z`);
}

// --- result -----------------------------------------------------------------
if (fix) {
  writeFileSync(FEEDS, JSON.stringify(sorted, null, 4));
  writeFileSync(README, readme.join("\n"));
  const rest = problems.filter((p) => !p.includes("not A to Z"));
  console.log(`Sorted ${sorted.length} feeds A to Z in feeds.json and README.md.`);
  if (rest.length) {
    console.error(rest.map((p) => `  - ${p}`).join("\n"));
    process.exit(1);
  }
} else if (problems.length) {
  console.error(`Feed list check failed:\n${problems.map((p) => `  - ${p}`).join("\n")}`);
  console.error("Run `npm run feeds:sort` to put feeds.json and README.md in A to Z order.");
  process.exit(1);
} else {
  console.log(`Feed list OK: ${feeds.length} feeds, A to Z, README in sync.`);
}
