/**
 * Capture appointment and phone click events on a local production server.
 *
 * Usage: node scripts/capture-appointment-clicks.mjs [baseUrl]
 * Prints one JSON object. Meant to be compared before and after the
 * Spanish booking path is included in appointment_request_click.
 */

import { chromium } from "playwright-core";

const BASE = process.argv[2] || "http://127.0.0.1:3460";
const PAGES = ["/", "/request-appointment", "/es", "/es/request-appointment"];

function normalizePath(href) {
  try {
    const url = new URL(href, BASE);
    const path = url.pathname.replace(/\/$/, "") || "/";
    if (url.protocol === "tel:") return href;
    return path;
  } catch {
    return href;
  }
}

function siteEvents(entries) {
  const out = [];
  for (const entry of entries) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
    const event = entry.event;
    if (
      event !== "appointment_request_click" &&
      event !== "phone_click" &&
      event !== "appointment_confirmed" &&
      event !== "page_view"
    ) {
      continue;
    }
    const keys = Object.keys(entry)
      .filter((key) => !key.startsWith("gtm."))
      .sort();
    out.push({
      event,
      location: entry.location ?? null,
      label: entry.label ?? null,
      page_path: entry.page_path ?? null,
      keys,
    });
  }
  return out;
}

function reduceHit(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    return raw.slice(0, 180);
  }
  if (url.hostname.includes("google-analytics.com") || url.pathname.includes("/g/collect")) {
    return {
      kind: "ga4",
      en: url.searchParams.get("en"),
      page_path: url.searchParams.get("ep.page_path"),
      location: url.searchParams.get("ep.location"),
      dlPath: (() => {
        try {
          return new URL(url.searchParams.get("dl") || "").pathname;
        } catch {
          return null;
        }
      })(),
    };
  }
  if (url.pathname.includes("/pagead/conversion/")) {
    return {
      kind: "ads-conversion",
      label: url.searchParams.get("label"),
    };
  }
  if (url.hostname.includes("googletagmanager.com")) {
    return { kind: "gtm", path: url.pathname, id: url.searchParams.get("id") };
  }
  if (url.hostname.includes("google")) {
    return { kind: "google", host: url.hostname, path: url.pathname };
  }
  return null;
}

async function readDataLayer(page) {
  return page.evaluate(() => window.dataLayer || []);
}

async function clickAndRecord(page, href) {
  const locator = page.locator(`a[href="${href}"]`);
  const count = await locator.count();
  if (count === 0) return { href, anchors: 0, added: [], hits: [] };
  const hits = [];
  const onRequest = (request) => {
    const reduced = reduceHit(request.url());
    if (reduced) hits.push(reduced);
  };
  page.on("request", onRequest);
  const pushed = await page.evaluate((targetHref) => {
    const captured = [];
    const dataLayer = (window.dataLayer = window.dataLayer || []);
    const original = dataLayer.push.bind(dataLayer);
    dataLayer.push = function (...args) {
      captured.push(args[0]);
      return original(...args);
    };
    const anchor = document.querySelector(`a[href="${targetHref}"]`);
    anchor.click();
    return captured;
  }, href);
  await page.waitForTimeout(300);
  page.off("request", onRequest);
  return { href, anchors: count, added: siteEvents(pushed), hits };
}

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const report = { base: BASE, pages: [] };

try {
  for (const path of PAGES) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loadHits = [];
    page.on("request", (request) => {
      const reduced = reduceHit(request.url());
      if (reduced) loadHits.push(reduced);
    });
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    await page.waitForRequest((request) => request.url().includes("en=page_view"), { timeout: 15000 });
    await page.evaluate(() => {
      document.addEventListener(
        "click",
        (event) => {
          const target = event.target;
          if (!(target instanceof Element)) return;
          if (target.closest("a")) event.preventDefault();
        },
        false,
      );
    });

    const html = await page.content();
    const markers = {
      gtmContainer: (html.match(/GTM-PP5NDT4H/g) || []).length,
      ga4PropertyG7: (html.match(/G-7LR9NYKKQ3/g) || []).length,
      adsId: (html.match(/AW-700388531/g) || []).length,
      gtmJs: html.includes("googletagmanager.com/gtm.js?id=GTM-PP5NDT4H"),
      gtagJs: html.includes("gtag/js"),
      consentDefault: html.includes("ad_storage") || html.includes("ad_user_data"),
    };

    const hrefs = await page.$$eval("a[href]", (anchors) => anchors.map((anchor) => anchor.getAttribute("href")));
    const wanted = [];
    const seen = new Set();
    let sampledOther = false;
    for (const href of hrefs) {
      if (!href || seen.has(href) || href.startsWith("#")) continue;
      const pathName = href.startsWith("tel:") ? href.split("?")[0] : normalizePath(href);
      const appointment = pathName === "/request-appointment" || pathName === "/es/request-appointment";
      const phone = href.startsWith("tel:+18329607160");
      const other = pathName === "/insurance" || pathName === "/es" || pathName === "/";
      if (!appointment && !phone && !other) continue;
      if (other) {
        if (sampledOther) continue;
        sampledOther = true;
      }
      seen.add(href);
      wanted.push(href);
    }

    await context.close();

    const clicks = [];
    for (const href of wanted) {
      const clickContext = await browser.newContext();
      const clickPage = await clickContext.newPage();
      await clickPage.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
      await clickPage.waitForRequest((request) => request.url().includes("en=page_view"), { timeout: 15000 });
      await clickPage.evaluate(() => {
        document.addEventListener(
          "click",
          (event) => {
            const target = event.target;
            if (!(target instanceof Element)) return;
            if (target.closest("a")) event.preventDefault();
          },
          false,
        );
      });
      const recorded = await clickAndRecord(clickPage, href);
      recorded.added = recorded.added.filter((entry) => entry.page_path === path);
      recorded.hits = recorded.hits.filter(
        (hit) =>
          hit.kind === "ga4" &&
          (hit.en === "appointment_request_click" || hit.en === "phone_click" || hit.en === "appointment_confirmed") &&
          hit.page_path === path,
      );
      clicks.push(recorded);
      await clickContext.close();
    }

    report.pages.push({
      path,
      markers,
      clicks,
    });
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(report, null, 2));
