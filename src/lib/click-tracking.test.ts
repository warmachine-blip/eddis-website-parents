import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { classifyTrackedClick, samePhone } from "./click-tracking.ts";

const PAGE = "https://htxpaininstitute.com/contact";
const PRACTICE = "tel:+18329607160";
const TRACKING = "tel:+18005550199";

describe("samePhone", () => {
  it("matches the practice number with or without the country code", () => {
    const allowed = [PRACTICE];
    assert.equal(samePhone("tel:+18329607160", allowed), true);
    assert.equal(samePhone("tel:8329607160", allowed), true);
    assert.equal(samePhone("TEL:+1-832-960-7160", allowed), true);
  });

  it("matches a configured tracking number and not an unrelated number", () => {
    const allowed = [PRACTICE, TRACKING];
    assert.equal(samePhone("tel:+18005550199", allowed), true);
    assert.equal(samePhone("tel:8005550199", allowed), true);
    assert.equal(samePhone("tel:+17135551212", allowed), false);
  });

  it("never matches 911, even if a caller adds it to the list", () => {
    assert.equal(samePhone("tel:911", [PRACTICE, "tel:911"]), false);
    assert.equal(samePhone("TEL:911", [PRACTICE]), false);
  });

  it("ignores a normal link", () => {
    assert.equal(samePhone("https://htxpaininstitute.com/contact", [PRACTICE]), false);
  });
});

describe("classifyTrackedClick", () => {
  it("counts the practice line and a tracking number, and not 911", () => {
    const allowed = [PRACTICE, TRACKING];
    assert.equal(classifyTrackedClick("tel:+18329607160", PAGE, allowed), "phone_click");
    assert.equal(classifyTrackedClick("tel:+18005550199", PAGE, allowed), "phone_click");
    assert.equal(classifyTrackedClick("tel:911", PAGE, allowed), null);
  });
});
