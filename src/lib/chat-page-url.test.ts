import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CHAT_REFERRER_POLICY,
  DOCUMENT_REFERRER_POLICY,
  addressBarHref,
  historyUrl,
  isChatVendorHost,
  isSafePageHash,
  referrerForChat,
  sanitizeChatPayload,
  sanitizeChatRequestUrl,
} from "./chat-page-url.ts";

const ORIGIN = "https://htxpaininstitute.com";

/** The URL the task uses to check that a visit is not forwarded raw. */
const DIRTY = `${ORIGIN}/?q=back+pain&email=x@y.com&gclid=test#frag`;

describe("addressBarHref", () => {
  it("keeps gclid, drops the other query params, and keeps a plain hash", () => {
    assert.equal(addressBarHref(DIRTY), `${ORIGIN}/?gclid=test#frag`);
  });

  it("drops a hash that is not a section id", () => {
    assert.equal(
      addressBarHref(`${ORIGIN}/contact?email=x@y.com#email=x@y.com`),
      `${ORIGIN}/contact`,
    );
    assert.equal(isSafePageHash("#schedule"), true);
    assert.equal(isSafePageHash("#services"), true);
    assert.equal(isSafePageHash("#main-content"), true);
    assert.equal(isSafePageHash("#email=x@y.com"), false);
    assert.equal(isSafePageHash("#q=back+pain"), false);
  });

  it("keeps an in-page hash on an otherwise clean URL", () => {
    assert.equal(addressBarHref(`${ORIGIN}/lp/back-pain#schedule`), null);
    assert.equal(addressBarHref(`${ORIGIN}/#services`), null);
  });

  it("keeps allowlisted utm params and drops a utm value that looks like contact data", () => {
    assert.equal(
      addressBarHref(
        `${ORIGIN}/lp/neck-pain?utm_source=google&utm_medium=cpc&utm_term=neck&utm_term=jane@x.com&phone=8325551212`,
      ),
      `${ORIGIN}/lp/neck-pain?utm_source=google&utm_medium=cpc&utm_term=neck`,
    );
  });

  it("returns null when nothing would change", () => {
    assert.equal(addressBarHref(`${ORIGIN}/contact?gclid=test`), null);
    assert.equal(addressBarHref(`${ORIGIN}/contact`), null);
  });

  it("returns null for a non-http URL", () => {
    assert.equal(addressBarHref("javascript:alert(1)"), null);
    assert.equal(addressBarHref("not a url"), null);
  });
});

describe("historyUrl", () => {
  const here = `${ORIGIN}/?gclid=test#frag`;

  it("rewrites a relative URL the router pushes after a client navigation", () => {
    assert.equal(
      historyUrl("/contact?email=x@y.com&q=back+pain&gclid=abc#schedule", here),
      "/contact?gclid=abc#schedule",
    );
  });

  it("leaves a clean relative URL alone", () => {
    assert.equal(historyUrl("/contact#schedule", here), null);
    assert.equal(historyUrl("/lp/back-pain", here), null);
  });

  it("rewrites an absolute URL and drops an unsafe hash", () => {
    assert.equal(
      historyUrl(`${ORIGIN}/contact?name=Jane#note=back`, here),
      `${ORIGIN}/contact`,
    );
  });
});

describe("sanitizeChatPayload", () => {
  it("strips the raw query and hash from a msgsndr page-visit body and keeps gclid", () => {
    const body = JSON.stringify({
      sessions: {
        source: "google paid",
        referrer: "https://www.google.com/search?q=back+pain",
        keyword: "back pain",
        adSource: "adword",
        url_params: { q: "back pain", email: "x@y.com", gclid: "test" },
        page: { url: DIRTY, title: "HTx Pain Institute" },
        timestamp: 1,
        campaign: "secret-campaign",
        type: "page-visit",
        domain: "htxpaininstitute.com",
        version: "v3",
      },
      initialReferrer: "https://www.google.com/search?q=back+pain#frag",
      locationId: "loc",
      sessionId: "temp",
    });

    const sent = JSON.parse(sanitizeChatPayload(body));
    assert.equal(sent.sessions.page.url, `${ORIGIN}/?gclid=test`);
    assert.equal(sent.sessions.page.title, "HTx Pain Institute");
    assert.deepEqual(sent.sessions.url_params, { gclid: "test" });
    assert.equal(sent.sessions.referrer, "https://www.google.com/search");
    assert.equal(sent.initialReferrer, "https://www.google.com/search");
    assert.equal(sent.sessions.keyword, "");
    assert.equal(sent.sessions.campaign, "");
    assert.equal(sent.sessions.source, "google paid");
    assert.equal(sent.sessions.adSource, "adword");
    assert.equal(sent.locationId, "loc");
    assert.equal(JSON.stringify(sent).includes("email"), false);
    assert.equal(JSON.stringify(sent).includes("back"), false);
    assert.equal(JSON.stringify(sent).includes("#"), false);
    assert.equal(JSON.stringify(sent).includes("frag"), false);
  });

  it("keeps a utm keyword that survived the allowlist", () => {
    const page = `${ORIGIN}/lp/neck-pain?utm_source=google&utm_term=neck&utm_campaign=fall`;
    const body = JSON.stringify({
      sessions: {
        keyword: "neck",
        campaign: "fall",
        url_params: { utm_source: "google", utm_term: "neck", utm_campaign: "fall", email: "a@b.com" },
        page: { url: page },
      },
    });
    const sent = JSON.parse(sanitizeChatPayload(body));
    assert.equal(sent.sessions.page.url, page);
    assert.equal(sent.sessions.keyword, "neck");
    assert.equal(sent.sessions.campaign, "fall");
    assert.deepEqual(sent.sessions.url_params, {
      utm_source: "google",
      utm_term: "neck",
      utm_campaign: "fall",
    });
  });

  it("drops query params merged back onto a later hit from an older session", () => {
    const body = JSON.stringify({
      sessions: {
        page: { url: `${ORIGIN}/contact?gclid=test&email=x@y.com` },
        url_params: { gclid: "test", email: "x@y.com", q: "back pain" },
        keyword: "back pain",
      },
    });
    const sent = JSON.parse(sanitizeChatPayload(body));
    assert.equal(sent.sessions.page.url, `${ORIGIN}/contact?gclid=test`);
    assert.deepEqual(sent.sessions.url_params, { gclid: "test" });
    assert.equal(sent.sessions.keyword, "");
  });

  it("leaves the message the visitor typed, and still cleans eventData", () => {
    const body = JSON.stringify({
      name: "Jane",
      phone: "+18325551212",
      email: "jane@x.com",
      message: "my back hurts, email me at jane@x.com",
      locationId: "loc",
      eventData: {
        medium: "chat",
        referrer: "https://www.google.com/search?q=back+pain",
        keyword: "",
        url_params: { email: "jane@x.com" },
        page: {
          url: `${ORIGIN}/contact?email=jane@x.com#frag`,
          title: "Contact",
        },
      },
    });
    const sent = JSON.parse(sanitizeChatPayload(body));
    assert.equal(sent.name, "Jane");
    assert.equal(sent.phone, "+18325551212");
    assert.equal(sent.email, "jane@x.com");
    assert.equal(sent.message, "my back hurts, email me at jane@x.com");
    assert.equal(sent.eventData.page.url, `${ORIGIN}/contact`);
    assert.equal(sent.eventData.page.title, "Contact");
    assert.deepEqual(sent.eventData.url_params, {});
    assert.equal(sent.eventData.referrer, "https://www.google.com/search");
    assert.equal(sent.eventData.medium, "chat");
    assert.equal(JSON.stringify(sent.eventData).includes("frag"), false);
    assert.equal(JSON.stringify(sent.eventData).includes("jane@x.com"), false);
  });

  it("returns a non-JSON body unchanged", () => {
    assert.equal(sanitizeChatPayload("name=Jane&email=a@b.com"), "name=Jane&email=a@b.com");
    assert.equal(sanitizeChatPayload(""), "");
  });
});

describe("referrer and request URL", () => {
  it("reduces a referrer to origin and path", () => {
    assert.equal(
      referrerForChat("https://www.google.com/search?q=back+pain#frag"),
      "https://www.google.com/search",
    );
    assert.equal(referrerForChat(""), "");
  });

  it("sanitizes a page URL carried on a chat-vendor request, and ignores other hosts", () => {
    const request = sanitizeChatRequestUrl(
      `https://services.msgsndr.com/attribution_service/user_session_v3/create_session?page=${encodeURIComponent(DIRTY)}#frag`,
    );
    const url = new URL(request);
    assert.equal(url.hash, "");
    assert.equal(url.searchParams.get("page"), `${ORIGIN}/?gclid=test`);
    assert.equal(request.includes("email"), false);
    assert.equal(
      sanitizeChatRequestUrl(`https://www.google-analytics.com/g/collect?dl=${encodeURIComponent(DIRTY)}`),
      `https://www.google-analytics.com/g/collect?dl=${encodeURIComponent(DIRTY)}`,
    );
  });

  it("recognizes the chat vendor hosts and no one else", () => {
    assert.equal(isChatVendorHost("services.msgsndr.com"), true);
    assert.equal(isChatVendorHost("staging.services.msgsndr.com"), true);
    assert.equal(isChatVendorHost("widgets.leadconnectorhq.com"), true);
    assert.equal(isChatVendorHost("msgsndr.com.evil.example"), false);
    assert.equal(isChatVendorHost("www.google-analytics.com"), false);
  });

  it("names the referrer policies the widget and the document use", () => {
    assert.equal(CHAT_REFERRER_POLICY, "origin");
    assert.equal(DOCUMENT_REFERRER_POLICY, "strict-origin-when-cross-origin");
  });
});
