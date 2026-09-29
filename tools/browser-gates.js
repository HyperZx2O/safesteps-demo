/* SafeSteps browser gates. Development only, not a runtime dependency.
 *
 * The site ships with zero npm dependencies. This script needs Puppeteer and a
 * running local server, so it lives outside the shipped bundle and is run by
 * hand:
 *
 *   python -m http.server 8912 --bind 127.0.0.1
 *   npm install puppeteer          # in a scratch dir, not in this repo
 *   node tools/browser-gates.js
 *
 * It checks the floors that are easy to break and expensive to notice late:
 * horizontal scroll, touch target size, clickable text wrapping, heading
 * overflow, duplicate ids, and unlabelled controls. Every width that matters is
 * covered, including 320px, which is a real Android width and was the width
 * that shipped broken once already.
 */

"use strict";

const BASE = process.env.BASE || "http://127.0.0.1:8912";
const WIDTHS = [320, 360, 375, 414, 768, 1280];
const PAGES = ["index", "evidence", "report", "timeline", "404"];
const THEMES = ["dark", "light"];

let puppeteer;
try {
  puppeteer = require("puppeteer");
} catch (e) {
  console.error("This script needs Puppeteer. Install it in a scratch directory and run from there.");
  process.exit(2);
}

const findings = [];
function flag(width, page, theme, gate, detail) {
  findings.push({ width, page, theme, gate, detail });
}

async function audit(page, width, name, theme) {
  await page.goto(`${BASE}/${name}.html`, { waitUntil: "networkidle0" });
  await page.evaluate((t) => {
    document.documentElement.setAttribute("data-theme", t);
  }, theme);
  await page.evaluate(() => document.fonts.ready);

  const r = await page.evaluate(() => {
    const de = document.documentElement;
    const cs = getComputedStyle;

    const scroll = de.scrollWidth > de.clientWidth + 1;
    const overflowing = [];
    if (scroll) {
      document.querySelectorAll("body *").forEach((el) => {
        const box = el.getBoundingClientRect();
        if (box.right > de.clientWidth + 1) {
          overflowing.push(el.tagName + "." + String(el.className || "").split(" ")[0]);
        }
      });
    }

    const smallTargets = [];
    document.querySelectorAll("a[href], button, input, select, textarea").forEach((el) => {
      let box = el.getBoundingClientRect();
      if (!box.width && !box.height) return;
      const label = el.closest("label");
      if (label && (box.width < 24 || box.height < 24)) box = label.getBoundingClientRect();
      if (box.width < 24 || box.height < 24) {
        smallTargets.push(el.tagName + "." + String(el.className || "").split(" ")[0] + " " + Math.round(box.width) + "x" + Math.round(box.height));
      }
    });

    /* a clickable label must sit on one visual line.
       getClientRects can split one line into several rects, so count distinct
       row positions rather than raw rect count. */
    /* Visually hidden text still produces client rects, so a control that
       collapses to an icon on narrow screens would read as wrapped. Skip any
       text node that is not actually painted. */
    const isPainted = (node) => {
      let p = node.parentElement;
      while (p && p !== document.body) {
        const s = cs(p);
        if (s.display === "none" || s.visibility === "hidden" || s.opacity === "0") return false;
        if (p.getBoundingClientRect().width <= 1 && p.getBoundingClientRect().height <= 1) return false;
        p = p.parentElement;
      }
      return true;
    };

    const wrappedLabels = [];
    document.querySelectorAll("a.btn, .nav-cta, .nav-list a, .lang-toggle button, .btn-sm").forEach((el) => {
      if (!el.getClientRects().length) return;
      const rows = [];
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        if (node.textContent.trim() && isPainted(node)) {
          const range = document.createRange();
          range.selectNodeContents(node);
          for (const rect of range.getClientRects()) {
            if (!rows.some((y) => Math.abs(y - rect.y) < rect.height * 0.5)) rows.push(rect.y);
          }
        }
        node = walker.nextNode();
      }
      if (rows.length > 1) wrappedLabels.push(el.textContent.trim().slice(0, 24));
    });

    const badHeadings = [];
    document.querySelectorAll("h1, h2, h3").forEach((el) => {
      const style = cs(el);
      if (style.overflowWrap !== "anywhere" || style.minWidth !== "0px") {
        badHeadings.push(el.tagName);
      }
    });

    const seen = new Map();
    const dupes = [];
    document.querySelectorAll("[id]").forEach((el) => {
      if (seen.has(el.id)) dupes.push(el.id);
      seen.set(el.id, true);
    });

    const unlabelled = [];
    document.querySelectorAll("input, select, textarea").forEach((el) => {
      if (el.type === "hidden") return;
      if ((el.labels && el.labels.length) || el.getAttribute("aria-label") || el.getAttribute("aria-labelledby")) return;
      unlabelled.push(el.tagName + "#" + (el.id || ""));
    });

    const headings = [...document.querySelectorAll("h1, h2, h3, h4")].map((h) => +h.tagName[1]);
    let skip = null;
    let prev = 0;
    headings.forEach((level, i) => {
      if (prev && level > prev + 1) skip = "h" + prev + " to h" + level + " at " + i;
      prev = level;
    });

    return {
      scroll,
      overflowing: overflowing.slice(0, 5),
      htmlOverflowX: cs(de).overflowX,
      bodyOverflowX: cs(document.body).overflowX,
      smallTargets: smallTargets.slice(0, 5),
      wrappedLabels,
      badHeadings: badHeadings.length,
      dupes,
      unlabelled,
      skip,
      h1: document.querySelectorAll("h1").length,
    };
  });

  const where = `${width}px ${name} ${theme}`;
  if (r.scroll) flag(width, name, theme, "no horizontal scroll", r.overflowing.join(" | "));
  if (r.htmlOverflowX !== "clip" || r.bodyOverflowX !== "clip") {
    flag(width, name, theme, "overflow-x clip on html and body", `html=${r.htmlOverflowX} body=${r.bodyOverflowX}`);
  }
  if (r.smallTargets.length) flag(width, name, theme, "targets at least 24px", r.smallTargets.join(" | "));
  if (r.wrappedLabels.length) flag(width, name, theme, "clickable text on one line", r.wrappedLabels.join(" | "));
  if (r.badHeadings) flag(width, name, theme, "headings wrap long words", `${r.badHeadings} heading(s)`);
  if (r.dupes.length) flag(width, name, theme, "unique ids", r.dupes.join(" | "));
  if (r.unlabelled.length) flag(width, name, theme, "every control labelled", r.unlabelled.join(" | "));
  if (r.skip) flag(width, name, theme, "heading order", r.skip);
  if (r.h1 !== 1) flag(width, name, theme, "exactly one h1", String(r.h1));
  return where;
}

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  let checks = 0;

  for (const width of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    for (const name of PAGES) {
      for (const theme of THEMES) {
        await audit(page, width, name, theme);
        checks++;
      }
    }
    await page.close();
  }

  await browser.close();

  if (findings.length === 0) {
    console.log(`PASS: ${checks} page, theme and width combinations, every gate clean.`);
    console.log(`Widths: ${WIDTHS.join(", ")}`);
    process.exit(0);
  }

  console.log(`FAIL: ${findings.length} finding(s) across ${checks} combinations.`);
  const seen = new Set();
  for (const f of findings) {
    const key = `${f.gate}|${f.detail}`;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`  ${f.width}px ${f.page} ${f.theme}  ${f.gate}: ${f.detail}`);
  }
  process.exit(1);
})();
