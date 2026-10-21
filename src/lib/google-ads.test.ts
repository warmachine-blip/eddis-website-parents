import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  GOOGLE_ADS_BOOKING_LABEL,
  GOOGLE_ADS_CONVERSION_ENDPOINT,
  GOOGLE_ADS_PHONE_LABEL,
  GOOGLE_ADS_TRANSPORT,
  adsConversionRequestUrl,
  buildAdsConversionUrl,
  clickIdsFromCookieHeader,
  linkerCookieEntries,
  trackAdsBookingConversion,
  trackAdsPhoneConversion,
} from "./google-ads.ts";

const PIXEL = "/pagead/conversion/700388531/";

describe("GOOGLE_ADS_TRANSPORT", () => {
  it("is gtm so the container loads and this module does not send", () => {
    assert.equal(GOOGLE_ADS_TRANSPORT, "gtm");
  });

  it("builds no /pagead/conversion url for phone or booking when transport is gtm", () => {
    const input = {
      pageUrl: PAGE,
      referrer: "https://www.google.com/search?q=jane@doe.com",
      storedClickIds: { gclid: "test123", wbraid: "testWbraid1", gbraid: "testGbraid1" },
    };
    for (const label of [GOOGLE_ADS_PHONE_LABEL, GOOGLE_ADS_BOOKING_LABEL]) {
      assert.equal(adsConversionRequestUrl("gtm", { ...input, label }), null);
      const codeUrl = adsConversionRequestUrl("code", { ...input, label });
      assert.equal(codeUrl?.includes(PIXEL), true);
      assert.ok(codeUrl?.includes(`label=${label}`));
    }
  });

  it("does not request a pixel when the phone and booking trackers run", () => {
    const requested: string[] = [];
    const previousWindow = globalThis.window;
    const previousDocument = globalThis.document;
    const previousFetch = globalThis.fetch;
    const previousImage = globalThis.Image;
    globalThis.window = {
      location: { href: PAGE, protocol: "https:" },
    } as unknown as Window & typeof globalThis;
    globalThis.document = {
      referrer: "https://www.google.com/",
      cookie: "_gcl_aw=GCL.1.test123",
    } as unknown as Document;
    globalThis.fetch = ((url: string) => {
      requested.push(String(url));
      return Promise.resolve(new Response());
    }) as typeof fetch;
    globalThis.Image = class {
      set src(value: string) {
        requested.push(value);
      }
    } as unknown as typeof Image;

    try {
      trackAdsPhoneConversion();
      trackAdsBookingConversion();
    } finally {
      globalThis.window = previousWindow;
      globalThis.document = previousDocument;
      globalThis.fetch = previousFetch;
      globalThis.Image = previousImage;
    }

    assert.deepEqual(requested, []);
  });
});

const PAGE = "https://htxpaininstitute.com/lp/back-pain?email=a@b.com&name=Jane&phone=8325551212&gclid=test123&utm_source=test";

describe("linkerCookieEntries", () => {
  it("stores gclid, wbraid, and gbraid under the linker cookie names", () => {
    const url =
      "https://htxpaininstitute.com/?gclid=test123&wbraid=CjwKCAjw_test-1&gbraid=0AAAA-abc_def.1&email=a@b.com";
    assert.deepEqual(linkerCookieEntries(url, 1700000000), [
      { name: "_gcl_aw", value: "GCL.1700000000.test123" },
      { name: "_gcl_gb", value: "GCL.1700000000.CjwKCAjw_test-1" },
      { name: "_gcl_ag", value: "GCL.1700000000.0AAAA-abc_def.1" },
    ]);
  });

  it("does not store a click id that fails the value check", () => {
    const url = "https://htxpaininstitute.com/?gclid=a@b.com&email=a@b.com";
    assert.deepEqual(linkerCookieEntries(url, 1700000000), []);
  });
});

describe("clickIdsFromCookieHeader", () => {
  it("reads the linker cookies back", () => {
    assert.deepEqual(
      clickIdsFromCookieHeader("_gcl_aw=GCL.1700000000.test123; _gcl_ag=GCL.1700000000.braid1"),
      { gclid: "test123", gbraid: "braid1" },
    );
  });

  it("drops a cookie value that is not a click id", () => {
    assert.deepEqual(clickIdsFromCookieHeader("_gcl_aw=GCL.1700000000.a@b.com"), {});
  });
});

describe("buildAdsConversionUrl", () => {
  it("sends the phone label, the allowlisted url, and npa=1", () => {
    const raw = buildAdsConversionUrl({
      label: GOOGLE_ADS_PHONE_LABEL,
      pageUrl: PAGE,
      referrer: "https://www.google.com/search?q=jane%40doe.com&phone=8325551212",
      nowMs: 1700000000000,
    });
    assert.ok(raw);
    const url = new URL(raw);
    assert.equal(url.origin + url.pathname, GOOGLE_ADS_CONVERSION_ENDPOINT);
    assert.equal(url.searchParams.get("label"), GOOGLE_ADS_PHONE_LABEL);
    assert.equal(url.searchParams.get("script"), "0");
    assert.equal(url.searchParams.get("npa"), "1");
    assert.equal(url.searchParams.get("gclaw"), "test123");
    assert.equal(url.searchParams.get("gclgb"), null);
    assert.equal(url.searchParams.get("wbraid"), null);
    assert.equal(url.searchParams.get("gbraid"), null);
    assert.equal(
      url.searchParams.get("url"),
      "https://htxpaininstitute.com/lp/back-pain?gclid=test123&utm_source=test",
    );
    assert.equal(url.searchParams.get("ref"), "https://www.google.com");
    const serialized = raw.toLowerCase();
    for (const forbidden of ["email", "jane", "8325551212", "g-7lr9", "viewthrough", "rmkt", "1p-user-list", "user_data", "ec_"]) {
      assert.equal(serialized.includes(forbidden), false, forbidden);
    }
  });

  it("uses a stored gclid after the landing query is gone", () => {
    const raw = buildAdsConversionUrl({
      label: GOOGLE_ADS_BOOKING_LABEL,
      pageUrl: "https://htxpaininstitute.com/request-appointment",
      storedClickIds: { gclid: "test123" },
      nowMs: 1700000000000,
    });
    assert.ok(raw);
    const url = new URL(raw);
    assert.equal(url.searchParams.get("label"), GOOGLE_ADS_BOOKING_LABEL);
    assert.equal(url.searchParams.get("gclaw"), "test123");
    assert.equal(url.searchParams.get("url"), "https://htxpaininstitute.com/request-appointment");
  });

  it("sends wbraid as gclgb when there is no gclid", () => {
    const raw = buildAdsConversionUrl({
      label: GOOGLE_ADS_PHONE_LABEL,
      pageUrl: "https://htxpaininstitute.com/contact?wbraid=testWbraid1&email=a@b.com",
      nowMs: 1700000000000,
    });
    assert.ok(raw);
    const url = new URL(raw);
    assert.equal(url.searchParams.get("gclgb"), "testWbraid1");
    assert.equal(url.searchParams.get("gclaw"), null);
    assert.equal(url.searchParams.get("wbraid"), null);
    assert.equal(url.searchParams.get("gbraid"), null);
  });

  it("sends gbraid as gclgb when there is no gclid", () => {
    const raw = buildAdsConversionUrl({
      label: GOOGLE_ADS_PHONE_LABEL,
      pageUrl: "https://htxpaininstitute.com/contact?gbraid=testGbraid1",
      nowMs: 1700000000000,
    });
    assert.ok(raw);
    const url = new URL(raw);
    assert.equal(url.searchParams.get("gclgb"), "testGbraid1");
    assert.equal(url.searchParams.get("gbraid"), null);
  });

  it("joins wbraid and gbraid into one gclgb value", () => {
    const raw = buildAdsConversionUrl({
      label: GOOGLE_ADS_BOOKING_LABEL,
      pageUrl: "https://htxpaininstitute.com/request-appointment?wbraid=testWbraid1&gbraid=testGbraid1",
      nowMs: 1700000000000,
    });
    assert.ok(raw);
    const url = new URL(raw);
    assert.equal(url.searchParams.get("gclgb"), "testWbraid1.testGbraid1");
    assert.equal(url.searchParams.get("gclaw"), null);
  });

  it("prefers gclaw and omits gclgb when a gclid is also present", () => {
    const raw = buildAdsConversionUrl({
      label: GOOGLE_ADS_PHONE_LABEL,
      pageUrl: "https://htxpaininstitute.com/?gclid=testGclid1&wbraid=testWbraid1",
      nowMs: 1700000000000,
    });
    assert.ok(raw);
    const url = new URL(raw);
    assert.equal(url.searchParams.get("gclaw"), "testGclid1");
    assert.equal(url.searchParams.get("gclgb"), null);
  });

  it("uses a stored wbraid after the landing query is gone", () => {
    const raw = buildAdsConversionUrl({
      label: GOOGLE_ADS_BOOKING_LABEL,
      pageUrl: "https://htxpaininstitute.com/request-appointment",
      storedClickIds: { wbraid: "testWbraid1" },
      nowMs: 1700000000000,
    });
    assert.ok(raw);
    const url = new URL(raw);
    assert.equal(url.searchParams.get("gclgb"), "testWbraid1");
  });

  it("does not invent a conversion label", () => {
    assert.equal(
      buildAdsConversionUrl({
        label: "not-a-real-label",
        pageUrl: "https://htxpaininstitute.com/",
      }),
      null,
    );
  });
});

