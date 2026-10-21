import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildCollectQuery,
  GA_MEASUREMENT_ID,
  urlWithAllowedParams,
  type CollectInput,
} from "./ga4-collect.ts";

const ORIGIN = "https://example.com";

const BASE: CollectInput = {
  measurementId: GA_MEASUREMENT_ID,
  clientId: "123.456",
  sessionId: "1700000000",
  sessionNumber: 1,
  sessionEngaged: false,
  hitNumber: 1,
  pageId: 42,
  eventName: "page_view",
  pageLocation: `${ORIGIN}/`,
};

function hit(pageLocation: string, overrides: Partial<CollectInput> = {}) {
  return buildCollectQuery({ ...BASE, ...overrides, pageLocation });
}

function fields(pageLocation: string, overrides: Partial<CollectInput> = {}) {
  const body = hit(pageLocation, overrides);
  assert.ok(body, `expected a collect hit for ${pageLocation}`);
  return new URLSearchParams(body);
}

describe("urlWithAllowedParams", () => {
  it("keeps gclid and utm params on a landing URL", () => {
    const url = `${ORIGIN}/lp/chronic-pain?gclid=Cj0abc_-1&utm_source=google&utm_medium=cpc`;
    assert.equal(
      urlWithAllowedParams(url),
      `${ORIGIN}/lp/chronic-pain?gclid=Cj0abc_-1&utm_source=google&utm_medium=cpc`,
    );
  });

  it("keeps every allowlisted key and drops the rest", () => {
    const kept = [
      "gclid=Cj0abc_-1",
      "gbraid=0AAAA-abc_def.1",
      "wbraid=CjwKCAjw_test-1",
      "gad_source=1",
      "gad_campaignid=22",
      "utm_source=google",
      "utm_medium=cpc",
      "utm_campaign=fall-2026",
      "utm_term=knee",
      "utm_content=ad",
      "utm_id=99",
    ].join("&");
    const url = `${ORIGIN}/lp/chronic-pain?${kept}&fbclid=dropme&email=a@b.com`;
    assert.equal(urlWithAllowedParams(url), `${ORIGIN}/lp/chronic-pain?${kept}`);
  });

  it("keeps gbraid and wbraid", () => {
    const url = `${ORIGIN}/lp/back-pain?gbraid=0AAAA-abc_def.1&wbraid=CjwKCAjw_test-1`;
    assert.equal(
      urlWithAllowedParams(url),
      `${ORIGIN}/lp/back-pain?gbraid=0AAAA-abc_def.1&wbraid=CjwKCAjw_test-1`,
    );
  });

  it("drops every non-allowlisted query param", () => {
    const url = `${ORIGIN}/contact?email=a@b.com&name=Jane&phone=8325551212&dob=1990-01-01&message=hi&q=back+pain`;
    assert.equal(urlWithAllowedParams(url), `${ORIGIN}/contact`);
  });

  it("drops a utm value that looks like an email", () => {
    const url = `${ORIGIN}/lp/chronic-pain?utm_term=jane@x.com`;
    assert.equal(urlWithAllowedParams(url), `${ORIGIN}/lp/chronic-pain`);
  });

  it("drops a utm value with a 7-digit run and keeps a 6-digit one", () => {
    assert.equal(
      urlWithAllowedParams(`${ORIGIN}/lp/chronic-pain?utm_term=8325551212&utm_source=google`),
      `${ORIGIN}/lp/chronic-pain?utm_source=google`,
    );
    assert.equal(
      urlWithAllowedParams(`${ORIGIN}/lp/chronic-pain?utm_id=123456`),
      `${ORIGIN}/lp/chronic-pain?utm_id=123456`,
    );
    assert.equal(
      urlWithAllowedParams(`${ORIGIN}/lp/chronic-pain?utm_id=1234567`),
      `${ORIGIN}/lp/chronic-pain`,
    );
  });

  it("keeps a click id and a numeric ads campaign id that contain long digit runs", () => {
    const url = `${ORIGIN}/?gclid=Cj0KC1234567abc&gad_campaignid=12345678901&gad_source=1`;
    assert.equal(
      urlWithAllowedParams(url),
      `${ORIGIN}/?gclid=Cj0KC1234567abc&gad_campaignid=12345678901&gad_source=1`,
    );
  });

  it("lowercases the parameter name and keeps the first value", () => {
    assert.equal(
      urlWithAllowedParams(`${ORIGIN}/lp/neck-pain?GCLID=abc`),
      `${ORIGIN}/lp/neck-pain?gclid=abc`,
    );
    assert.equal(
      urlWithAllowedParams(`${ORIGIN}/?gclid=first&GCLID=second`),
      `${ORIGIN}/?gclid=first`,
    );
  });

  it("never includes the hash", () => {
    assert.equal(
      urlWithAllowedParams(`${ORIGIN}/lp/neck-pain?gclid=abc#section`),
      `${ORIGIN}/lp/neck-pain?gclid=abc`,
    );
    assert.equal(
      urlWithAllowedParams(`${ORIGIN}/lp/neck-pain#gclid=abc`),
      `${ORIGIN}/lp/neck-pain`,
    );
  });

  it("drops values outside the strict character set", () => {
    assert.equal(
      urlWithAllowedParams(`${ORIGIN}/?utm_term=back+pain&utm_source=google`),
      `${ORIGIN}/?utm_source=google`,
    );
    assert.equal(
      urlWithAllowedParams(`${ORIGIN}/?utm_campaign=${"a".repeat(201)}`),
      `${ORIGIN}/`,
    );
    assert.equal(urlWithAllowedParams(`${ORIGIN}/?utm_source=`), `${ORIGIN}/`);
  });

  it("returns an empty string for a non-http URL", () => {
    assert.equal(urlWithAllowedParams("javascript:alert(1)"), "");
    assert.equal(urlWithAllowedParams("file:///tmp/secret"), "");
    assert.equal(urlWithAllowedParams("not a url"), "");
  });
});

describe("buildCollectQuery page location", () => {
  it("puts the allowlisted params on dl and keeps ep.page_path path-only", () => {
    const params = fields(
      `${ORIGIN}/lp/chronic-pain?gclid=Cj0abc_-1&utm_source=google&utm_medium=cpc&email=a@b.com#form`,
    );
    assert.equal(
      params.get("dl"),
      `${ORIGIN}/lp/chronic-pain?gclid=Cj0abc_-1&utm_source=google&utm_medium=cpc`,
    );
    assert.equal(params.get("ep.page_path"), "/lp/chronic-pain");
    assert.equal(params.get("ep.page_path")?.includes("?"), false);
    assert.equal(params.get("dl")?.includes("#"), false);
    assert.equal(params.get("dl")?.includes("email"), false);
  });

  it("drops a PHI query string down to the path", () => {
    const params = fields(
      `${ORIGIN}/contact?email=a@b.com&name=Jane&phone=8325551212&dob=1990-01-01&message=hi&q=back+pain`,
    );
    assert.equal(params.get("dl"), `${ORIGIN}/contact`);
    assert.equal(params.get("ep.page_path"), "/contact");
  });

  it("drops utm_term when the value is an email", () => {
    const params = fields(`${ORIGIN}/lp/chronic-pain?utm_term=jane@x.com&utm_source=google`);
    assert.equal(params.get("dl"), `${ORIGIN}/lp/chronic-pain?utm_source=google`);
    assert.equal(params.get("ep.page_path"), "/lp/chronic-pain");
  });

  it("keeps a lowercased gclid", () => {
    const params = fields(`${ORIGIN}/lp/chronic-pain?GCLID=abc`);
    assert.equal(params.get("dl"), `${ORIGIN}/lp/chronic-pain?gclid=abc`);
  });

  it("leaves dr as origin and path only", () => {
    const params = fields(`${ORIGIN}/lp/chronic-pain?gclid=Cj0abc_-1`, {
      pageReferrer: "https://www.google.com/search?q=jane@x.com&q=back+pain#frag",
    });
    assert.equal(params.get("dr"), "https://www.google.com/search");
    assert.equal(params.get("dl"), `${ORIGIN}/lp/chronic-pain?gclid=Cj0abc_-1`);
  });

  it("returns null for a non-http page location", () => {
    assert.equal(hit("javascript:alert(1)"), null);
    assert.equal(hit("data:text/html,hello"), null);
    assert.equal(hit("not a url"), null);
  });
});
