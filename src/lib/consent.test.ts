import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { buildCollectQuery, GA_MEASUREMENT_ID, GA_SESSION_COOKIE, type CollectInput } from "./ga4-collect.ts";
import {
  ANALYTICS_STORAGE_DEFAULT,
  CONSENT_BANNER_TEXT,
  KNOWN_ANALYTICS_COOKIES,
  adsConversionAllowed,
  consentBootstrap,
  consentQuery,
  cookieWriteAllowed,
  readChoiceFromCookieHeader,
  resolveConsent,
  type ConsentSignals,
} from "./consent.ts";

const deniedAds: ConsentSignals = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

describe("default consent", () => {
  it("ships with analytics denied until a choice, as one constant", () => {
    assert.equal(ANALYTICS_STORAGE_DEFAULT, "denied");
  });

  it("denies ads and analytics, shows the banner, and encodes a cookieless ping", () => {
    const resolved = resolveConsent({ choice: null, globalPrivacyControl: false });
    assert.deepEqual(resolved.signals, deniedAds);
    assert.equal(resolved.showBanner, true);
    assert.equal(resolved.update, false);
    const query = consentQuery(resolved);
    assert.equal(query.gcs, "G100");
    assert.equal(query.gcd, "13p3p3p3p5l1");
    assert.equal(query.npa, "1");
  });
});

describe("Global Privacy Control", () => {
  it("opts out of ads and does not show the banner", () => {
    const resolved = resolveConsent({ choice: null, globalPrivacyControl: true });
    assert.deepEqual(resolved.signals, deniedAds);
    assert.equal(resolved.showBanner, false);
    assert.equal(resolved.update, false);
    assert.equal(resolved.globalPrivacyControl, true);
    const query = consentQuery(resolved);
    assert.equal(query.gcs, "G100");
    assert.equal(query.gcd, "13p3p3p3p5l1");
    assert.equal(query.npa, "1");
  });

  it("keeps ads denied when a stored accept meets the signal", () => {
    const resolved = resolveConsent({ choice: "accept", globalPrivacyControl: true });
    assert.equal(resolved.signals.ad_storage, "denied");
    assert.equal(resolved.signals.ad_user_data, "denied");
    assert.equal(resolved.signals.ad_personalization, "denied");
    assert.equal(resolved.signals.analytics_storage, "granted");
    assert.equal(resolved.showBanner, false);
    const query = consentQuery(resolved);
    assert.equal(query.gcs, "G101");
    assert.equal(query.gcd, "13q3r3q3q5l1");
    assert.equal(query.npa, "1");
    assert.equal(adsConversionAllowed(resolved), false);
  });
});

describe("accept and reject", () => {
  it("grants every signal on accept when Global Privacy Control is off", () => {
    const resolved = resolveConsent({ choice: "accept", globalPrivacyControl: false });
    assert.equal(resolved.showBanner, false);
    assert.equal(resolved.update, true);
    assert.deepEqual(resolved.signals, {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
    const query = consentQuery(resolved);
    assert.equal(query.gcs, "G111");
    assert.equal(query.gcd, "13r3r3r3r5l1");
    assert.equal(query.npa, "0");
    assert.equal(adsConversionAllowed(resolved), true);
  });

  it("denies every signal on reject", () => {
    const resolved = resolveConsent({ choice: "reject", globalPrivacyControl: false });
    assert.deepEqual(resolved.signals, deniedAds);
    assert.equal(resolved.showBanner, false);
    assert.equal(resolved.update, true);
    const query = consentQuery(resolved);
    assert.equal(query.gcs, "G100");
    assert.equal(query.gcd, "13q3q3q3q5l1");
    assert.equal(query.npa, "1");
    assert.equal(adsConversionAllowed(resolved), false);
  });

  it("reads only an exact stored choice", () => {
    assert.equal(readChoiceFromCookieHeader(""), null);
    assert.equal(readChoiceFromCookieHeader("htx_consent=accept"), "accept");
    assert.equal(readChoiceFromCookieHeader("foo=1; htx_consent=reject; _ga=GA1.1.1.1"), "reject");
    assert.equal(readChoiceFromCookieHeader("htx_consent=acceptx"), null);
    assert.equal(readChoiceFromCookieHeader("htx_consent=Accept"), null);
  });
});

describe("cookie guard", () => {
  it("blocks analytics and ads cookies while storage is denied", () => {
    assert.equal(cookieWriteAllowed("_ga=GA1.1.1.1", deniedAds), false);
    assert.equal(cookieWriteAllowed("_ga_27RHPSC41Y=GS1.1.1.1.0.1.0.0.0", deniedAds), false);
    assert.equal(cookieWriteAllowed("_gcl_aw=GCL.1.abc", deniedAds), false);
    assert.equal(cookieWriteAllowed("_gac_UA=1", deniedAds), false);
    assert.equal(cookieWriteAllowed("htx_consent=reject", deniedAds), true);
    assert.equal(cookieWriteAllowed("_ga=; Path=/; Max-Age=0", deniedAds), true);
    assert.equal(cookieWriteAllowed("leadconnector_id=abc", deniedAds), true);
  });

  it("allows analytics cookies only after analytics is granted, and ads cookies only after ad storage is granted", () => {
    const analyticsOnly: ConsentSignals = { ...deniedAds, analytics_storage: "granted" };
    assert.equal(cookieWriteAllowed("_ga=GA1.1.1.1", analyticsOnly), true);
    assert.equal(cookieWriteAllowed("_gcl_aw=GCL.1.abc", analyticsOnly), false);
    const ads: ConsentSignals = {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    };
    assert.equal(cookieWriteAllowed("_gcl_gb=GCL.1.wbraid", ads), true);
  });

  it("names the GA4 session cookie among the ones cleared when analytics is denied", () => {
    assert.ok(KNOWN_ANALYTICS_COOKIES.includes(GA_SESSION_COOKIE as (typeof KNOWN_ANALYTICS_COOKIES)[number]));
  });
});

describe("consent bootstrap", () => {
  function run(cookie: string, gpc: boolean) {
    const jar = { value: cookie };
    class Document {}
    Object.defineProperty(Document.prototype, "cookie", {
      configurable: true,
      enumerable: true,
      get() {
        return jar.value;
      },
      set(value: string) {
        const str = String(value);
        const pair = str.split(";")[0] ?? "";
        const name = pair.split("=")[0]?.trim() ?? "";
        const parts = jar.value
          ? jar.value.split(";").map((part) => part.trim()).filter(Boolean)
          : [];
        const kept = parts.filter((part) => part.split("=")[0] !== name);
        if (!/Max-Age=0/i.test(str)) {
          const val = pair.slice(name.length + 1);
          if (val) kept.push(`${name}=${val}`);
        }
        jar.value = kept.join("; ");
      },
    });
    const windowObj: { dataLayer?: { [index: number]: unknown; length: number }[] } = {};
    const sandbox = {
      window: windowObj,
      document: new Document(),
      navigator: { globalPrivacyControl: gpc },
      Document,
      location: { protocol: "https:" },
    };
    vm.runInNewContext(consentBootstrap(), sandbox);
    const commands = (windowObj.dataLayer ?? []).filter((entry) => entry[0] === "consent");
    return { jar, commands, document: sandbox.document as unknown as { cookie: string } };
  }

  function consentCommands(commands: { [index: number]: unknown }[]) {
    return commands.map((entry) => ({
      action: entry[1],
      params: entry[2] as ConsentSignals,
    }));
  }

  it("sets the denied default before any update, with no stored choice", () => {
    const { commands, jar } = run("_ga=GA1.1.1.1; _gcl_aw=GCL.1.abc", false);
    const parsed = consentCommands(commands);
    assert.equal(parsed[0]?.action, "default");
    assert.equal(parsed[0]?.params.ad_storage, "denied");
    assert.equal(parsed[0]?.params.ad_user_data, "denied");
    assert.equal(parsed[0]?.params.ad_personalization, "denied");
    assert.equal(parsed[0]?.params.analytics_storage, "denied");
    assert.equal(parsed.some((command) => command.action === "update"), false);
    assert.equal(jar.value.includes("_ga="), false);
    assert.equal(jar.value.includes("_gcl_aw="), false);
  });

  it("does not update consent when Global Privacy Control is the only signal", () => {
    const { commands } = run("", true);
    const parsed = consentCommands(commands);
    assert.equal(parsed.length, 1);
    assert.equal(parsed[0]?.action, "default");
    assert.equal(parsed[0]?.params.ad_storage, "denied");
  });

  it("updates to granted on a stored accept", () => {
    const { commands, document } = run("htx_consent=accept", false);
    const parsed = consentCommands(commands);
    assert.equal(parsed[1]?.action, "update");
    assert.equal(parsed[1]?.params.ad_storage, "granted");
    assert.equal(parsed[1]?.params.analytics_storage, "granted");
    document.cookie = "_gcl_aw=GCL.1.ok";
    document.cookie = "_ga=GA1.1.2.2";
    assert.match(document.cookie, /_gcl_aw=GCL\.1\.ok/);
    assert.match(document.cookie, /_ga=GA1\.1\.2\.2/);
  });

  it("updates to denied on a stored reject and keeps blocking ads cookies", () => {
    const { commands, document } = run("htx_consent=reject", false);
    const parsed = consentCommands(commands);
    assert.equal(parsed[1]?.action, "update");
    assert.equal(parsed[1]?.params.ad_storage, "denied");
    assert.equal(parsed[1]?.params.ad_user_data, "denied");
    assert.equal(parsed[1]?.params.ad_personalization, "denied");
    assert.equal(parsed[1]?.params.analytics_storage, "denied");
    document.cookie = "_gcl_aw=GCL.1.nope";
    document.cookie = "_ga=GA1.1.3.3";
    assert.equal(document.cookie.includes("_gcl_aw"), false);
    assert.equal(document.cookie.includes("_ga="), false);
  });

  it("blocks ads cookies when Global Privacy Control overrides a stored accept", () => {
    const { commands, document } = run("htx_consent=accept", true);
    const parsed = consentCommands(commands);
    assert.equal(parsed[1]?.params.ad_storage, "denied");
    assert.equal(parsed[1]?.params.ad_personalization, "denied");
    assert.equal(parsed[1]?.params.analytics_storage, "granted");
    document.cookie = "_ga=GA1.1.4.4";
    document.cookie = "_gcl_aw=GCL.1.nope";
    assert.match(document.cookie, /_ga=GA1\.1\.4\.4/);
    assert.equal(document.cookie.includes("_gcl_aw"), false);
  });
});

describe("banner copy", () => {
  it("stays plain, with accept, reject, and a way back to the choice", () => {
    const text = Object.values(CONSENT_BANNER_TEXT).join("\n");
    assert.equal(text.includes("\u2014"), false);
    assert.equal(text.includes("\u2013"), false);
    assert.equal(/compliant|ADA/i.test(text), false);
    assert.equal(CONSENT_BANNER_TEXT.accept, "Accept");
    assert.equal(CONSENT_BANNER_TEXT.reject, "Reject");
    assert.ok(CONSENT_BANNER_TEXT.settings.length > 0);
    assert.ok(CONSENT_BANNER_TEXT.body.length > 0);
  });
});

describe("document shell order", () => {
  it("places the consent default script before the Google tag", () => {
    const shell = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../components/document-shell.tsx"),
      "utf8",
    );
    const consent = shell.indexOf('id="consent-default"');
    const gtm = shell.indexOf('id="gtm-container"');
    assert.ok(consent > -1 && gtm > consent);
  });
});

describe("collect hit consent fields", () => {
  const base: CollectInput = {
    measurementId: GA_MEASUREMENT_ID,
    clientId: "123.456",
    sessionId: "1700000000",
    sessionNumber: 1,
    sessionEngaged: false,
    hitNumber: 1,
    pageId: 42,
    eventName: "page_view",
    pageLocation: "https://example.com/",
  };

  it("adds gcs, gcd, and npa when they are well formed", () => {
    const body = buildCollectQuery({
      ...base,
      gcs: "G100",
      gcd: "13p3p3p3p5l1",
      npa: "1",
    });
    assert.ok(body);
    const params = new URLSearchParams(body);
    assert.equal(params.get("gcs"), "G100");
    assert.equal(params.get("gcd"), "13p3p3p3p5l1");
    assert.equal(params.get("npa"), "1");
  });

  it("drops a malformed consent field", () => {
    const body = buildCollectQuery({ ...base, gcs: "G1xx", gcd: "nope", npa: "1" });
    assert.ok(body);
    const params = new URLSearchParams(body);
    assert.equal(params.get("gcs"), null);
    assert.equal(params.get("gcd"), null);
    assert.equal(params.get("npa"), "1");
  });
});
