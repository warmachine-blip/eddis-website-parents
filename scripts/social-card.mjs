// Builds the link-preview card that iMessage, WhatsApp, Facebook, LinkedIn and
// Slack show when someone shares htxpaininstitute.com.
//
// Run by hand, not from the build — the card changes about as often as the
// branding does:
//
//   node scripts/social-card.mjs                  # the default, "physician"
//   node scripts/social-card.mjs --variant=clinicians
//   node scripts/social-card.mjs --variant=lobby
//   node scripts/social-card.mjs --all --out=/tmp/og   # all three, to compare
//
// Two things worth knowing before changing this.
//
// The filename is part of the cache strategy. Every platform caches a preview
// against the image URL, for weeks in some cases, so overwriting a card in
// place leaves everyone who already shared the link looking at the old one.
// Publish a NEW filename instead and point src/app/layout.tsx at it. The
// previous card stays in the repo on purpose: links shared before the change
// still resolve rather than showing a broken preview.
//
// Everything here is composited from the practice's own photography in
// public/images. Nothing is generated or synthesised — a link preview is the
// first thing a prospective patient sees of a real medical practice, and it
// should show the real one.
//
// The card is read at about 390px wide in an iMessage bubble, which is what the
// layout is tuned for: the logo and the italic line carry it at that size, and
// the smaller lines are texture rather than something anyone reads.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMG = join(ROOT, "public/images");

const W = 1200;
const H = 630;

/** From src/app/globals.css — keep in step with the site's palette. */
const NAVY_DEEP = "#0f1a2e";
const BRASS = "#c19960";
const BRASS_LIGHT = "#d4b27f";
const OFF_WHITE = "#f8f6f0";

/**
 * Cormorant Garamond is the site's display face but is not installed system
 * wide, and librsvg (which sharp renders SVG through) only sees system fonts.
 * Didot is the closest high-contrast serif macOS ships; the brand wordmark
 * itself comes from the real logo PNG, so the only thing this affects is the
 * one italic line.
 */
const SERIF = "Didot, 'Hoefler Text', Georgia, serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const TAGLINE = "Precision. Lasting Relief.";
const CREDENTIAL = "Double board-certified interventional pain care";
const OFFICES = "HOUSTON  ·  HUMBLE";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The stacked type block: rule, tagline, credential line, offices. */
const typeBlock = (x) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect x="${x}" y="376" width="86" height="2" fill="${BRASS}"/>
    <text x="${x}" y="436" font-family="${SERIF}" font-size="38" font-style="italic" fill="${BRASS_LIGHT}">${esc(TAGLINE)}</text>
    <text x="${x}" y="490" font-family="${SANS}" font-size="19" letter-spacing="1.4" fill="${OFF_WHITE}" opacity="0.85">${esc(CREDENTIAL)}</text>
    <text x="${x}" y="532" font-family="${SANS}" font-size="16" letter-spacing="3.4" fill="${OFF_WHITE}" opacity="0.52">${esc(OFFICES)}</text>
  </svg>`);

const logoAt = (width) =>
  sharp(join(IMG, "htx-pain-institute-logo.png")).trim().resize({ width }).toBuffer();

const variants = {
  /**
   * Navy panel beside Dr. Baumgartner's studio portrait. The split is a hard
   * vertical seam with a brass hairline so it reads as a deliberate layout
   * rather than a photo pasted onto a colour.
   */
  async physician() {
    const PANEL = 672;
    const PHOTO = W - PANEL;
    const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stop-color="#22314f"/><stop offset="100%" stop-color="${NAVY_DEEP}"/>
      </linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/></svg>`);
    const seam = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <rect x="${PANEL - 2}" width="2" height="${H}" fill="${BRASS}" opacity="0.85"/></svg>`);
    // Crop from the top of the portrait so the frame keeps headroom and ends
    // around mid-thigh rather than cutting at the knee.
    const photo = await sharp(join(IMG, "dr-baumgartner.webp"))
      .extract({ left: 0, top: 110, width: 1023, height: Math.round((1023 * H) / PHOTO) })
      .resize(PHOTO, H, { fit: "cover", position: "top" })
      .toBuffer();
    return sharp(bg).composite([
      { input: photo, left: PANEL, top: 0 },
      { input: seam, left: 0, top: 0 },
      { input: await logoAt(330), left: 78, top: 152 },
      { input: typeBlock(78), left: 0, top: 0 },
    ]);
  },

  /**
   * Dr. Baumgartner and Allison Turner at the desk. Cropped tight: the full
   * frame includes ceiling tiles and sneakers, and the wall logo does the
   * branding so the card needs no logo of its own.
   */
  async clinicians() {
    const band = await sharp(join(IMG, "allison-turner-and-dr-baumgartner-front-desk.webp"))
      .flatten({ background: "#ffffff" })
      .extract({ left: 0, top: 95, width: 1160, height: 640 })
      .toBuffer();
    const photo = await sharp(band).resize(W, H, { fit: "cover", position: "centre" }).toBuffer();
    const bar = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${NAVY_DEEP}" stop-opacity="0"/>
        <stop offset="55%" stop-color="${NAVY_DEEP}" stop-opacity="0.62"/>
        <stop offset="100%" stop-color="${NAVY_DEEP}" stop-opacity="0.94"/>
      </linearGradient></defs>
      <rect y="300" width="${W}" height="330" fill="url(#b)"/>
      <text x="62" y="560" font-family="${SERIF}" font-size="35" font-style="italic" fill="${BRASS_LIGHT}">${esc(TAGLINE)}</text>
      <text x="${W - 62}" y="560" text-anchor="end" font-family="${SANS}" font-size="17" letter-spacing="3.2" fill="${OFF_WHITE}" opacity="0.75">${esc(OFFICES)}</text>
    </svg>`);
    return sharp(photo).composite([{ input: bar, left: 0, top: 0 }]);
  },

  /**
   * The waiting room. Cropped left of the reception wall, whose own logo is
   * partly hidden behind a column and would otherwise appear cut in half
   * beside the card's logo.
   */
  async lobby() {
    const photo = await sharp(join(IMG, "lobby.webp"))
      .extract({ left: 0, top: 36, width: 838, height: 660 })
      .resize(W, H, { fit: "cover", position: "centre" })
      .modulate({ brightness: 1.06 })
      .toBuffer();
    const scrim = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${NAVY_DEEP}" stop-opacity="0.95"/>
        <stop offset="38%" stop-color="${NAVY_DEEP}" stop-opacity="0.72"/>
        <stop offset="72%" stop-color="${NAVY_DEEP}" stop-opacity="0.10"/>
        <stop offset="100%" stop-color="${NAVY_DEEP}" stop-opacity="0"/>
      </linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#s)"/></svg>`);
    return sharp(photo).composite([
      { input: scrim, left: 0, top: 0 },
      { input: await logoAt(336), left: 80, top: 150 },
      { input: typeBlock(80), left: 0, top: 0 },
    ]);
  },
};

const args = process.argv.slice(2);
const arg = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
const outDir = arg("out") ?? join(IMG, "og");
const wanted = args.includes("--all") ? Object.keys(variants) : [arg("variant") ?? "physician"];

mkdirSync(outDir, { recursive: true });
for (const name of wanted) {
  if (!variants[name]) {
    console.error(`unknown variant "${name}" — expected one of ${Object.keys(variants).join(", ")}`);
    process.exit(1);
  }
  // The published card keeps a stable name; --all writes per-variant files for
  // comparing options side by side before one is chosen.
  const file = join(outDir, args.includes("--all") ? `card-${name}.jpg` : "htx-pain-institute-card.jpg");
  const pipeline = await variants[name]();
  await pipeline.jpeg({ quality: 92, mozjpeg: true }).toFile(file);
  console.log(`[social-card] ${name} -> ${file}`);
}
