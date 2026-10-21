/**
 * Headless check of a local production server.
 *
 * Confirms the conversion-only install:
 * - no GTM loader and no gtag/js?id=AW-700388531
 * - no G-7LR9NYKKQ3, rmkt, 1p-user-list, or viewthroughconversion request
 * - page URLs echoed to Google keep only the ad/UTM allowlist
 * - the phone and booking conversions still fire, with the real labels
 *
 * Usage: ADS_BASE_URL=http://127.0.0.1:3456 node scripts/check-google-ads-urls.mjs
 * The server must already be running (next build && next start -p 3456).
 */

import { chromium } from "playwright-core";

const BASE = process.env.ADS_BASE_URL || "http://127.0.0.1:3456";
const DIRTY =
  "email=a%40b.com&name=Jane&phone=8325551212&gclid=test123&utm_source=test";
const REFERRER =
  "https://www.google.com/search?q=jane%40doe.com&phone=8325551212";

const ALLOWED = new Set([
  "gclid",
  "gbraid",
  "wbraid",
  "gad_source",
  "gad_campaignid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
]);

const PHI = ["a@b.com", "jane@doe.com", "8325551212", "name=jane", "email="];

const FORBIDDEN = [
  "g-7lr9nykkq3",
  "/rmkt/",
  "1p-user-list",
  "viewthroughconversion",
  "gtm.js",
  "gtag/js",
  "user_data",
  "aw-700388531",
];

function isMeasurementHost(hostname) {
  return (
    hostname === "google.com" ||
    hostname.endsWith(".google.com") ||
    hostname.endsWith("googleadservices.com") ||
    hostname.endsWith("googletagmanager.com") ||
    hostname.endsWith("google-analytics.com") ||
    hostname.endsWith("doubleclick.net") ||
    hostname.endsWith("googlesyndication.com")
  );
}

function problemsInUrl(raw) {
  const found = [];
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    // keep the raw string
  }
  const haystack = `${raw}\n${decoded}`.toLowerCase();
  for (const needle of PHI) {
    if (haystack.includes(needle)) found.push(`phi:${needle}`);
  }
  for (const needle of FORBIDDEN) {
    if (haystack.includes(needle)) found.push(`forbidden:${needle}`);
  }

  let url;
  try {
    url = new URL(raw);
  } catch {
    return found;
  }
  if (!isMeasurementHost(url.hostname)) return found;

  const echoed = ["dl", "url", "page_location", "dr", "ref", "document.location"];
  for (const key of echoed) {
    const value = url.searchParams.get(key);
    if (!value) continue;
    let inner;
    try {
      inner = new URL(value);
    } catch {
      continue;
    }
    for (const [param] of inner.searchParams) {
      if (!ALLOWED.has(param.toLowerCase())) {
        found.push(`query:${key}:${param}`);
      }
    }
  }
  return found;
}

function watch(page, bucket) {
  const onRequest = (request) => {
    const url = request.url();
    let host = "";
    try {
      host = new URL(url).hostname;
    } catch {
      return;
    }
    if (!isMeasurementHost(host)) return;
    bucket.push(url);
  };
  page.on("request", onRequest);
}

async function settle(page, ms) {
  await page.waitForTimeout(ms);
}

const failures = [];
function expect(cond, message) {
  if (!cond) failures.push(message);
}

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const context = await browser.newContext();
await context.route("https://book.nimblr.co/**", (route) => {
  route.fulfill({
    status: 200,
    contentType: "text/html",
    body: `<!doctype html><meta charset="utf-8"><title>scheduler</title>
<script>setInterval(function () {
  parent.postMessage({ a: "scheduled", i: "G-27RHPSC41Y", c: "check" }, "*");
}, 200);</script>`,
  });
});
await context.route("https://assets.nimblr.ai/**", (route) => {
  route.fulfill({ status: 200, contentType: "text/javascript", body: "/* stub */" });
});

const page = await context.newPage();
const hits = [];
watch(page, hits);

try {
  await page.goto(`${BASE}/contact?${DIRTY}`, {
    waitUntil: "domcontentloaded",
    referer: REFERRER,
  });
  await settle(page, 2500);

  const html = await page.content();
  expect(!html.includes("googletagmanager.com/gtm.js"), "GTM snippet is in the HTML");
  expect(!html.includes("gtag/js"), "gtag.js is in the HTML");
  expect(!html.includes("AW-700388531"), "combined tag id is in the HTML");

  const cookie = await page.evaluate(() => document.cookie);
  expect(cookie.includes("_gcl_aw="), `missing _gcl_aw cookie: ${cookie}`);
  expect(cookie.includes("test123"), `gclid was not stored: ${cookie}`);
  expect(!cookie.includes("_ga_7LR9NYKKQ3"), `G-7 cookie was set: ${cookie}`);

  const beforeClick = hits.length;
  expect(
    hits.some((url) => url.includes("/g/collect") && url.includes("en=page_view")),
    "GA4 page_view did not fire",
  );
  expect(
    !hits.some((url) => url.includes("/pagead/conversion/")),
    "a conversion fired on page load",
  );

  await page.locator('a[href="tel:+18329607160"]').first().evaluate((el) => {
    el.click();
  });
  await settle(page, 1500);

  const phoneHits = hits.slice(beforeClick).filter((url) => url.includes("/pagead/conversion/700388531/"));
  expect(phoneHits.length === 1, `expected 1 phone conversion, got ${phoneHits.length}`);
  if (phoneHits[0]) {
    const phone = new URL(phoneHits[0]);
    expect(phone.searchParams.get("label") === "sekFCNPF0ugcELOp_M0C", "phone label mismatch");
    expect(phone.searchParams.get("npa") === "1", "phone hit missing npa=1");
    expect(phone.searchParams.get("script") === "0", "phone hit is not a pixel");
    expect(phone.searchParams.get("gclaw") === "test123", "phone hit missing gclaw");
    expect(phone.searchParams.get("gclgb") === null, "gclid hit also sent gclgb");
    expect(phone.searchParams.get("wbraid") === null, "hit used a wbraid parameter");
    expect(phone.searchParams.get("gbraid") === null, "hit used a gbraid parameter");
    expect(
      phone.searchParams.get("url") ===
        "https://htxpaininstitute.com/contact?gclid=test123&utm_source=test" ||
        phone.searchParams.get("url") ===
          `${new URL(BASE).origin}/contact?gclid=test123&utm_source=test`,
      `phone url param: ${phone.searchParams.get("url")}`,
    );
    const ref = phone.searchParams.get("ref");
    expect(ref === "https://www.google.com", `phone ref: ${ref}`);
  }

  const gaPhone = hits.filter((url) => url.includes("en=phone_click"));
  expect(gaPhone.length === 1, `expected 1 GA4 phone_click, got ${gaPhone.length}`);

  const before911 = hits.length;
  await page.locator('a[href="tel:911"]').first().evaluate((el) => {
    el.click();
  });
  await settle(page, 1500);
  const emergency = hits.slice(before911).filter((url) => url.includes("/pagead/conversion/700388531/"));
  expect(emergency.length === 0, `911 must not send an Ads conversion, got ${emergency.length}`);
  const gaPhoneAfter = hits.filter((url) => url.includes("en=phone_click"));
  expect(gaPhoneAfter.length === 1, "911 was sent to GA4 as phone_click");

  async function expectBraid(query, gclgb) {
    const braidContext = await browser.newContext();
    const braidPage = await braidContext.newPage();
    const seen = [];
    watch(braidPage, seen);
    await braidPage.goto(`${BASE}/contact?${query}&email=a%40b.com&name=Jane&phone=8325551212`, {
      waitUntil: "domcontentloaded",
      referer: REFERRER,
    });
    await braidPage.locator('a[href="tel:+18329607160"]').first().evaluate((el) => {
      el.click();
    });
    await settle(braidPage, 1500);
    const conv = seen.filter((url) => url.includes("/pagead/conversion/700388531/"));
    expect(conv.length === 1, `${query}: expected 1 conversion, got ${conv.length}`);
    if (conv[0]) {
      const url = new URL(conv[0]);
      expect(url.searchParams.get("gclgb") === gclgb, `${query}: gclgb=${url.searchParams.get("gclgb")}`);
      expect(url.searchParams.get("wbraid") === null, `${query}: hit used a wbraid parameter`);
      expect(url.searchParams.get("gbraid") === null, `${query}: hit used a gbraid parameter`);
      expect(url.searchParams.get("gclaw") === null, `${query}: hit used gclaw`);
    }
    for (const url of seen) {
      const found = problemsInUrl(url);
      if (found.length) failures.push(`${found.join(", ")} in ${url.slice(0, 500)}`);
    }
    await braidContext.close();
  }

  await expectBraid("wbraid=testWbraid1", "testWbraid1");
  await expectBraid("gbraid=testGbraid1", "testGbraid1");
  await expectBraid("wbraid=testWbraid1&gbraid=testGbraid1", "testWbraid1.testGbraid1");

  const bookingPage = await context.newPage();
  const bookingHits = [];
  watch(bookingPage, bookingHits);
  await bookingPage.goto(`${BASE}/request-appointment?${DIRTY}`, {
    waitUntil: "domcontentloaded",
    referer: REFERRER,
  });
  await bookingPage.waitForRequest(
    (request) => request.url().includes("/pagead/conversion/700388531/") && request.url().includes("Yo8FCL7U-oodELOp_M0C"),
    { timeout: 15000 },
  );
  await settle(bookingPage, 1000);
  const booking = bookingHits.filter(
    (url) => url.includes("/pagead/conversion/700388531/") && url.includes("Yo8FCL7U-oodELOp_M0C"),
  );
  expect(booking.length === 1, `expected 1 booking conversion, got ${booking.length}`);

  const all = [...hits, ...bookingHits];
  for (const url of all) {
    const found = problemsInUrl(url);
    if (found.length) failures.push(`${found.join(", ")} in ${url.slice(0, 500)}`);
  }

  const joined = all.join("\n").toLowerCase();
  expect(joined.includes("gclid=test123") || joined.includes("gclid%3dtest123") || joined.includes("gclaw=test123"), "allowlisted gclid never reached Google");
  expect(joined.includes("utm_source=test") || joined.includes("utm_source%3dtest"), "allowlisted utm_source never reached Google");
} catch (error) {
  failures.push(error instanceof Error ? error.stack || error.message : String(error));
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("Google Ads URL check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Google Ads URL check passed.");
