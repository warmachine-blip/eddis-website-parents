import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CHAT_REFERRER_POLICY,
  isChatVendorHost,
  referrerForChat,
  sanitizeChatPayload,
  sanitizeChatRequestUrl,
} from "./chat-page-url.ts";

const ORIGIN = "https://htxpaininstitute.com";

/** The URL the task uses to check that a visit is not forwarded raw. */
const DIRTY = `${ORIGIN}/?q=back+pain&email=x@y.com&gclid=test#frag`;

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

  it("keeps gclid and utm_source and drops email", () => {
    const page = `${ORIGIN}/?gclid=test-click&utm_source=google&email=x@y.com#note`;
    const body = JSON.stringify({
      sessions: {
        url_params: { gclid: "test-click", utm_source: "google", email: "x@y.com" },
        page: { url: page, title: "Home" },
        keyword: "x@y.com",
        campaign: "",
      },
    });
    const sent = JSON.parse(sanitizeChatPayload(body));
    assert.equal(sent.sessions.page.url, `${ORIGIN}/?gclid=test-click&utm_source=google`);
    assert.deepEqual(sent.sessions.url_params, { gclid: "test-click", utm_source: "google" });
    assert.equal(sent.sessions.keyword, "");
    assert.equal(JSON.stringify(sent).includes("email"), false);
    assert.equal(JSON.stringify(sent).includes("#"), false);
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

  it("names the referrer policy used on a chat-vendor request", () => {
    assert.equal(CHAT_REFERRER_POLICY, "origin");
  });
});
