import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { legalNav, primaryNav } from "./nav.ts";
import { localeSwitchTarget } from "./spanish.ts";
import { localizeNavLink, spanishHref, spanishLabel } from "./spanish-nav.ts";

/** Names and words that are the same in the Spanish menu. */
const UNTRANSLATED = new Set([
  "Edward Baumgartner Jr., MD",
  "Allison Turner, DNP",
  "Tatyana Baumgartner, CPA",
  "Ima's Home for Children",
  "'Kel Strong' Mabatah Foundation",
  "Houston Tennis Academy",
  "Humble (FM 1960)",
  "Blog",
]);

describe("spanish nav labels", () => {
  it("translates every menu label, or leaves an allowed name as written", () => {
    const labels = [
      ...primaryNav.flatMap((group) => [group.label, ...group.items.map((item) => item.label)]),
      "Contact",
      "Practice",
      "For Patients",
      "Schedule Appointment",
      "Reschedule Appointment",
      "All Services →",
      ...legalNav.map((item) => item.label),
    ];
    for (const label of labels) {
      const translated = spanishLabel(label);
      assert.equal(
        translated !== label || UNTRANSLATED.has(label),
        true,
        `missing Spanish label for ${label}`,
      );
      assert.equal(translated.includes("—") || translated.includes("–"), false, translated);
    }
  });

  it("uses the condition names already used on the Spanish pages", () => {
    assert.equal(spanishLabel("Neuropathic Pain"), "Dolor neuropático");
    assert.equal(spanishLabel("Sciatica"), "Ciática");
    assert.equal(spanishLabel("Herniated Discs"), "Hernia de disco");
    assert.equal(spanishLabel("Spinal Stenosis"), "Estenosis espinal");
    assert.equal(spanishLabel("Basivertebral Nerve Ablation (BVN)"), "Ablación del nervio basivertebral (BVN)");
  });

  it("points translated pages at their twins and leaves medical pages in English", () => {
    assert.equal(spanishHref("/"), "/es");
    assert.equal(spanishHref("/dr-edward-baumgartner"), "/es/dr-edward-baumgartner");
    assert.equal(spanishHref("/request-appointment"), "/es/request-appointment");
    assert.equal(spanishHref("/insurance"), "/es/insurance");
    assert.equal(spanishHref("/intracept-procedure"), "/es/intracept-procedure");
    assert.equal(spanishHref("/about-us"), "/es/about-us");
    assert.equal(spanishHref("/patients"), "/es/patients");
    assert.equal(spanishHref("/contact"), "/es/contact");
    assert.equal(spanishHref("/locations/spring-tx"), "/es/locations/spring-tx");
    assert.equal(spanishHref("/community/kel-strong-foundation"), "/es/community/kel-strong-foundation");
    assert.equal(spanishHref("/terms-of-use"), "/es/terms-of-use");
    assert.equal(spanishHref("/hipaa-notice"), "/es/hipaa-notice");
    assert.equal(spanishHref("/privacy"), "/privacy");
    assert.equal(spanishHref("/video-library"), "/video-library");
    assert.equal(spanishHref("/second-opinion"), "/second-opinion");
    assert.equal(spanishHref("/services"), "/services");
    assert.equal(spanishHref("/blog"), "/blog");
    assert.equal(spanishHref("/neuropathic-pain"), "/neuropathic-pain");
    assert.equal(localizeNavLink({ label: "About", href: "/about-us" }, false).label, "About");
    assert.equal(localizeNavLink({ label: "Our Story", href: "/about-us" }, true).href, "/es/about-us");
    assert.equal(localizeNavLink({ label: "Our Story", href: "/about-us" }, true).englishOnly, false);
    assert.equal(localizeNavLink({ label: "Insurance & Financing", href: "/insurance" }, true).href, "/es/insurance");
    assert.equal(localizeNavLink({ label: "Sciatica", href: "/sciatica" }, true).englishOnly, true);
    assert.equal(localizeNavLink({ label: "Video Library", href: "/video-library" }, true).englishOnly, true);
    assert.equal(localizeNavLink({ label: "Privacy", href: "/privacy" }, true).englishOnly, true);
  });
});

describe("locale switch targets", () => {
  it("sends EN from each Spanish page to the matching English page", () => {
    const pairs = [
      ["/es", "/"],
      ["/es/dr-edward-baumgartner", "/dr-edward-baumgartner"],
      ["/es/request-appointment", "/request-appointment"],
      ["/es/insurance", "/insurance"],
      ["/es/intracept-procedure", "/intracept-procedure"],
    ] as const;
    for (const [es, en] of pairs) {
      const target = localeSwitchTarget(es);
      assert.equal(target.isSpanish, true);
      assert.equal(target.enHref, en);
      assert.equal(target.esFallsBackToHome, false);
    }
  });

  it("maps a community page to its Spanish twin", () => {
    const target = localeSwitchTarget("/community/kel-strong-foundation");
    assert.equal(target.isSpanish, false);
    assert.equal(target.enHref, "/community/kel-strong-foundation");
    assert.equal(target.esHref, "/es/community/kel-strong-foundation");
    assert.equal(target.esFallsBackToHome, false);
    const back = localeSwitchTarget("/es/community/kel-strong-foundation");
    assert.equal(back.enHref, "/community/kel-strong-foundation");
    assert.equal(back.esFallsBackToHome, false);
  });

  it("keeps a medical page on the English notice", () => {
    const target = localeSwitchTarget("/sciatica");
    assert.equal(target.esHref, "/es");
    assert.equal(target.esFallsBackToHome, true);
    const privacy = localeSwitchTarget("/privacy");
    assert.equal(privacy.esFallsBackToHome, true);
  });
});
