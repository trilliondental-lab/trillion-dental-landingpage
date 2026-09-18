import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../dist/client/", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");
const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

test("exports a complete clinic website with correct search metadata", () => {
  assert.match(markup, /<html lang="en"/);
  assert.equal((markup.match(/<h1\b/g) || []).length, 1);
  assert.match(markup, /<title>Trillion Dental Lab \| Zirconia/);
  assert.match(markup, /rel="canonical" href="https:\/\/trilliondentallab\.netlify\.app\/?"/);
  assert.match(markup, /Pt 622, Villa Batutah/);
  assert.match(markup, /mailto:trilliondental@gmail\.com/);
  assert.doesNotMatch(markup, /MALAYSIA.S NO.1|Your site is taking shape/);
});

test("provides the supplied form and distinct enquiry actions", () => {
  const links = [...markup.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  const form = "https://drive.google.com/file/d/1XDgnwL7sAtKmMD6W72m4UL4IyDR1kBhH/view?usp=sharing";
  assert.ok(links.filter(url => url === form).length >= 4);
  assert.ok(links.includes("https://labtrack-trilliondental.netlify.app/"));
  const enquiries = [...new Set(links.filter(url => url.startsWith("https://wa.me/") && url.includes("?text=")))];
  assert.ok(enquiries.length >= 3, "New case, specifications and general enquiries should differ");
  for (const url of enquiries) assert.ok(new URL(url).searchParams.get("text").length > 30);
});

test("all internal anchor and asset references resolve in the export", async () => {
  const ids = new Set([...markup.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  const urls = [...markup.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  for (const url of new Set(urls)) {
    if (url.startsWith("#")) assert.ok(ids.has(url.slice(1)), `Missing anchor ${url}`);
    else if (url.startsWith("/") && url !== "/") await access(new URL(url.slice(1), root));
  }
  for (const cssUrl of urls.filter(url => url.endsWith(".css"))) {
    const css = await readFile(new URL(cssUrl.slice(1), root), "utf8");
    for (const match of css.matchAll(/url\(["']?(\/[^)"']+)["']?\)/g)) await access(new URL(match[1].slice(1), root));
  }
});

test("exports essential clinic information and labels demonstration data", async () => {
  for (const text of ["Your submission checklist", "Turnaround", "Collection", "Adjustments", "QC 1", "QC 2", "Sample cases, not live patient data"]) assert.ok(markup.includes(text), text);
  assert.equal((markup.match(/class="case-card/g) || []).length, 3);
  assert.match(await readFile(new URL("robots.txt", root), "utf8"), /Sitemap: https:\/\/trilliondentallab.netlify.app\/sitemap.xml/);
  await access(new URL("404.html", root));
  await access(new URL("mobile-preview.html", root));
});
