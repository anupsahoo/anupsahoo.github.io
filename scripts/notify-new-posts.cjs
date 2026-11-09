/**
 * Notify subscribers: compares article-index.json between two commits and,
 * if new posts were added, creates a Buttondown email draft listing them.
 * Usage: BUTTONDOWN_API_KEY=... node scripts/notify-new-posts.cjs <before-sha> <after-sha>
 * Set BUTTONDOWN_STATUS=about_to_send to send immediately instead of drafting.
 */

const { execSync } = require("child_process");

const INDEX_PATH = "src/data/article-index.json";
const SITE = "https://anupsahoo.github.io";

function readIndex(sha) {
  try {
    return JSON.parse(execSync(`git show ${sha}:${INDEX_PATH}`, { encoding: "utf8" }));
  } catch {
    return null;
  }
}

function buildEmail(posts) {
  const subject = posts.length === 1 ? posts[0].title : `${posts.length} new posts on Beyond Models`;
  const items = posts.map(p => `## [${p.title}](${SITE}${p.href})\n\n${p.description}\n\n*${p.category} · ${p.readTime}*\n\n[Read the post →](${SITE}${p.href})`);
  const body = `New on Beyond Models:\n\n${items.join("\n\n---\n\n")}`;
  return { subject, body };
}

async function main() {
  const [before, after] = process.argv.slice(2);
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  const status = process.env.BUTTONDOWN_STATUS || "draft";

  if (!before || /^0+$/.test(before)) return console.log("No previous commit to compare against; skipping.");
  if (!apiKey) throw new Error("BUTTONDOWN_API_KEY is not set.");

  const oldIndex = readIndex(before) || [];
  const newIndex = readIndex(after);
  if (!newIndex) throw new Error(`Could not read ${INDEX_PATH} at ${after}.`);

  const known = new Set(oldIndex.map(a => a.href));
  const added = newIndex.filter(a => !known.has(a.href));
  if (!added.length) return console.log("No new posts.");

  const { subject, body } = buildEmail(added);
  const res = await fetch("https://api.buttondown.com/v1/emails", {
    method: "POST",
    headers: { Authorization: `Token ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ subject, body, status }),
  });
  if (!res.ok) throw new Error(`Buttondown API ${res.status}: ${await res.text()}`);
  console.log(`Created Buttondown email (${status}): "${subject}" with ${added.length} post(s).`);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
