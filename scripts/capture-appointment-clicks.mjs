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

const TARGETS = ["lang-en", "lang-es", "book-en", "book-es", "phone", "other"];

async function clickNamed(page, name) {
  const hits = [];
  const onRequest = (request) => {
    const reduced = reduceHit(request.url());
    if (reduced) hits.push(reduced);
  };
  page.on("request", onRequest);
  const result = await page.evaluate((targetName) => {
    const isLang = (anchor) =>
      Boolean(anchor.closest('[data-language-switch], nav[aria-label="Language"], nav[aria-label="Idioma"]'));
    const pathOf = (href) => {
      if (!href || href.startsWith("#") || href.startsWith("tel:")) return "";
      try {
        return new URL(href, location.href).pathname.replace(/\/$/, "") || "/";
      } catch {
        return "";
      }
    };
    const anchors = [...document.querySelectorAll("a[href]")];
    const matchers = {
      "lang-en": (anchor) => isLang(anchor) && anchor.getAttribute("hreflang") === "en",
      "lang-es": (anchor) => isLang(anchor) && anchor.getAttribute("hreflang") === "es",
      "book-en": (anchor) => !isLang(anchor) && pathOf(anchor.getAttribute("href")) === "/request-appointment",
      "book-es": (anchor) => !isLang(anchor) && pathOf(anchor.getAttribute("href")) === "/es/request-appointment",
      phone: (anchor) => (anchor.getAttribute("href") || "").startsWith("tel:+18329607160"),
      other: (anchor) => {
        const path = pathOf(anchor.getAttribute("href"));
        return !isLang(anchor) && anchor.closest("header") && (path === "/" || path === "/es");
      },
    };
    const anchor = anchors.find(matchers[targetName]);
    if (!anchor) return { found: false, pushed: [] };
    const captured = [];
    const dataLayer = (window.dataLayer = window.dataLayer || []);
    const original = dataLayer.push.bind(dataLayer);
    dataLayer.push = function (...args) {
      captured.push(args[0]);
      return original(...args);
    };
    anchor.click();
    return {
      found: true,
      href: anchor.getAttribute("href"),
      text: (anchor.innerText || "").replace(/\s+/g, " ").trim(),
      languageSwitch: isLang(anchor),
      pushed: captured,
    };
  }, name);
  await page.waitForTimeout(300);
  page.off("request", onRequest);
  return {
    name,
    href: result.href ?? null,
    text: result.text ?? null,
    languageSwitch: result.languageSwitch ?? false,
    found: result.found,
    added: siteEvents(result.pushed || []),
    hits,
  };
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

    await context.close();

    const clicks = [];
    for (const name of TARGETS) {
      const clickContext = await browser.newContext();
      const clickPage = await clickContext.newPage();
      await clickPage.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
      await clickPage.waitForRequest((request) => request.url().includes("en=page_view"), { timeout: 15000 });
      const recorded = await clickNamed(clickPage, name);
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
