# GTM-PP5NDT4H inventory

Fetched from `https://www.googletagmanager.com/gtm.js?id=GTM-PP5NDT4H` on October 21, 2026. Account and public id `262413144`. The published container is about 435KB. Tag order below is the published tag index.

This file is the record of what the container does, what the combined Google tag adds on top of it, and what this repository now sends instead. It is not a live view of the Google tag settings. Those settings are outside the repo.

## Tags

| Index | tag_id | Type | What it does | When it fires |
| --- | --- | --- | --- | --- |
| 0 | 3 | `__gclidw` Conversion Linker | Writes the click-id cookies (`_gcl_aw`, `_gcl_gb`, `_gcl_ag`, `_gcl_gs`, and `_gcl_au`). Cross-domain linker domains are `htxpaincare.com, txpainspecialists.com`. URL passthrough is off. Cookie overrides are off. | `gtm.init` |
| 1 | 5 | `__awct` Google Ads conversion | Conversion id `700388531`, label `sekFCNPF0ugcELOp_M0C`. Conversion linker on, cookie prefix `_gcl`. Enhanced conversions checkbox is false. The page URL on the hit is the full page URL (macro 3). | A link click whose element URL contains `tel:`, after the link-click listener (trigger id `262413144_4`) is active. Any `tel:` link, including `tel:911`. It does not listen for the dataLayer event `phone_click`. |
| 2 | 7 | `__paused` (was `__awct`) | A conversion that would have fired when the path contains `thank-you` and the event is `gtm.js`. The label is stripped from the published container because the tag is paused. | Not firing. Not recreated. |
| 3 | 8 | `__googtag` Google tag | `vtp_tagId` is `AW-700388531`. No custom page location. This is the tag that loads the combined Google tag, remarketing, and the second destination below. | `gtm.init` (every page) |
| 4 | 11 | `__awct` Google Ads conversion | Conversion id `700388531`, label `Yo8FCL7U-oodELOp_M0C`. Enhanced conversions checkbox is false. Page URL is the full page URL (macro 3). | dataLayer event `appointment_confirmed` |
| 5 | 12 | `__lcl` link click listener | Unique trigger id `262413144_4`. Does not wait for tags. Does not check validation. | `gtm.js` |

No custom HTML tag. No GA4 tag. No Meta pixel, call tracking, PatientEdge, Nimblr, Holly, or chat tag inside this container. Those widgets are loaded by the site itself (LeadConnector, Nimblr, Birdeye, Google Maps, YouTube).

### Macros the firing rules use

| Index | Type | Value |
| --- | --- | --- |
| 0 | `__e` | event name |
| 1 | `__v` | `gtm.elementUrl` |
| 2 | `__v` | `gtm.triggers`, default `""` |
| 3 | `__u` | full page URL, used as the conversion page URL |
| 4 | `__u` | page path, used by the paused thank-you tag |

Host, referrer, and a second event macro are published and unused by the predicates.

### Rules

- `gtm.init` runs the conversion linker and the Google tag.
- A `tel:` link click runs the phone conversion.
- A path containing `thank-you` plus `gtm.js` would run the paused tag. It does not fire.
- `appointment_confirmed` runs the booking conversion.
- `gtm.js` installs the link click listener.

## dataLayer events this site pushes

| Event | Where | Payload | Does GTM consume it? |
| --- | --- | --- | --- |
| `appointment_request_click` | `pushClickEvent` in `src/lib/analytics.ts` | `location`, `label`, `page_path` (pathname only) | No |
| `phone_click` | same | same | No. The phone conversion listens for `tel:` clicks, not this event. |
| `appointment_confirmed` | `pushBookingConfirmed`, from the Nimblr `scheduled` message | event name only | Yes. Booking conversion, tag_id 11. |
| `gtm.js` / `gtm.start` | the GTM snippet itself | start time | Only if the snippet is rendered |

GA4 events sent by site code, not by this container: `page_view`, `appointment_request_click`, `phone_click`, `appointment_confirmed`. Measurement id `G-27RHPSC41Y`. Those hits are built in `src/lib/ga4-collect.ts`. `dl` keeps the allowlist below. `dr` is origin and path. `ep.page_path` is the path only. The hash is never sent.

Allowlist: `gclid`, `gbraid`, `wbraid`, `gad_source`, `gad_campaignid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`. Values must match `/^[A-Za-z0-9._~-]{1,200}$/`. A `utm_*` value is also dropped when it contains `@` or a run of 7 or more digits. Click ids and `gad_campaignid` are not held to the digit rule. Keys are lowercased. The first value wins.

## The combined Google tag AW-700388531

Fetched as `https://www.googletagmanager.com/gtag/js?id=AW-700388531` on the same day. The published destination list is:

`G-7LR9NYKKQ3|GT-PJNQD84H|AW-700388531`

`GT-PJNQD84H` is the Google tag id. `AW-700388531` and `G-7LR9NYKKQ3` are destinations configured together. Calling `gtag('config', 'AW-700388531')`, or letting tag_id 8 load that script, installs both an Ads destination and a GA4 destination.

On init the script also installs:

- automatic user-provided data (`__ogt_1p_data_v2`, auto collection on, email, phone, and address, auto PII collection on)
- a pre-auto-PII CCD step on `AW-700388531`
- Google signals on `G-7LR9NYKKQ3`
- enhanced measurement on `G-7LR9NYKKQ3`: downloads, forms (including parameters), outbound clicks, history page views, scroll, site search (`q`, `s`, `search`, `query`, `keyword`), and video

Event rules inside that tag, aimed at the old domain `htxpaincare.com` (those hosts 301 to `htxpaininstitute.com`):

- `generate_lead` when a page view's location contains `https://htxpaincare.com/thank-you/`
- `appointment_booking` on form submit when the location contains `https://htxpaincare.com/request-appointment/` (published twice)
- `phone_call_click` when a clicked link URL contains `tel:`
- custom event `inbx_web_chat_lead_captured` (the published predicate has a trailing space, so it likely never matches)

No person names or comments are in the published container. Nothing in this repository references `G-7LR9NYKKQ3` or pushes `inbx_web_chat_lead_captured`. This site's GA4 property is `G-27RHPSC41Y`. The Nimblr scheduler frame measures `book.nimblr.co` under `G-XWCRHXNRQC` via container `GTM-NF63NFX`.

`inbx` matches an inbox or chat product. The site chat is the LeadConnector widget `66840b4e178c31f522476378` (`src/components/chat-widget.tsx`, loader `https://widgets.leadconnectorhq.com/loader.js`). If that widget pushes `inbx_web_chat_lead_captured` onto `dataLayer`, only a tag that is listening (GTM or G-7) would receive it. This repo does not.

### What a plain gtag config does not turn off

A local check of `gtag/js?id=AW-700388531` (headless Chrome, not this Next app) set `page_location` through the allowlist, set `page_referrer` to an origin, set `url_passthrough` false, and set `allow_ad_personalization_signals`, `allow_google_signals`, and `allow_enhanced_conversions` false before `gtag('js')`. Consent Mode was also tried with `ad_storage` granted and `ad_user_data`, `ad_personalization`, and `analytics_storage` denied.

The page URL on the Ads hit did follow the allowlist, and the referrer stayed an origin. `G-7LR9NYKKQ3` still fired, including enhanced measurement. The conversion hit still carried `ec_m` and `ec_sel` style selector metadata. With those flags and `send_page_view` false, a page view alone did not request `google.com/rmkt/collect` or `viewthroughconversion`. The conversion event still requested `googleads.g.doubleclick.net/pagead/viewthroughconversion/700388531/`.

A live audit of the production site (GTM loaded, no Consent Mode, `npa=0`, `gcd=13l3l3l3l1l1`) saw, on every page:

- `viewthroughconversion/700388531`
- `google.com/rmkt/collect`
- `pagead/1p-user-list`

Blocking those URLs from the page after the script loads is not the approach this repo takes. The script is not loaded.

## What the site sends now

`GOOGLE_ADS_TRANSPORT` in `src/lib/google-ads.ts` is the only switch. Default is `"code"`.

| Mode | Loads GTM-PP5NDT4H | Sends the in-code conversion | Loads `gtag/js?id=AW-700388531` |
| --- | --- | --- | --- |
| `code` | No | Yes, on a `tel:` click and on a completed booking | No |
| `gtm` | Yes | No | Yes, because tag_id 8 is still in the container |

Do not enable both. The container cannot be edited from this repo, so the in-code hits and the container's copies of the same labels would both fire.

In `code` mode the hit is one GET to:

`https://www.googleadservices.com/pagead/conversion/700388531/?random=&guid=ON&script=0&fmt=3&label=LABEL&npa=1&url=SANITIZED&ref=ORIGIN`

plus `gclaw` when a gclid is present. wbraid and gbraid are not separate hit parameters. Checked against `gtag/js?id=AW-700388531` on 2026-10-21 (the conversion request was aborted in the browser before it was sent): a wbraid alone is `gclgb=<wbraid>`, a gbraid alone is `gclgb=<gbraid>`, and both with no gclid are `gclgb=<wbraid>.<gbraid>`. When a gclid is present, gtag sends `gclaw` and omits `gclgb`. iPhone clicks usually arrive as wbraid or gbraid without a gclid, so `gclgb` is what attributes them. Following that pixel's redirect loads `viewthroughconversion`, so the fetch uses `redirect: "manual"` and does not follow it. `script=0` and `fmt=3` ask for a pixel rather than the Google tag. `npa=1` is the personalization opt-out on this pixel. No `user_data`, no `em`, no `ec_*`.

Click ids are stored by `GoogleAdsLinker` as `GCL.<unixSeconds>.<id>` in `_gcl_aw` (gclid), `_gcl_gb` (wbraid), and `_gcl_ag` (gbraid), for 90 days. `_gcl_au` is not set. The conversion linker in GTM did set `_gcl_au` on every page. That stops while the container is not loaded.

Labels, unchanged:

- Phone, a link to the practice number in `src/lib/nav.ts` or a number in `practice.trackingPhoneHrefs`: `sekFCNPF0ugcELOp_M0C`. The published GTM tag fired on any `tel:` link, including 911. This branch does not. GA4 `phone_click` uses the same `samePhone()` check, so the two counts stay on the same numbers.
- Booking, Nimblr message `a === "scheduled"` from origin `https://book.nimblr.co`: `Yo8FCL7U-oodELOp_M0C`

`appointment_request_click` is not an Ads conversion. The paused thank-you tag is not recreated.

`gtag('set', {allow_ad_personalization_signals:false, allow_google_signals:false, ads_data_redaction:true})` and Consent Mode defaults that deny `ad_user_data` and `ad_personalization` are not installed. They only apply inside the combined script, and loading that script brings `G-7LR9NYKKQ3` back. Nothing is pushed onto `window.dataLayer` for consent, because Nimblr's iframe helper and a restored GTM container both read that array. There is no consent banner in this change.

## Where the GA4 event `scheduled` comes from

It is not sent by this repository.

Nimblr's scheduler bundle (`book.nimblr.co/js/chunk-6a92058f.111cbfc3.js`, loaded with the embed on 2026-10-21) calls `updateGAFlag` in `app.878cdd8d.js` when the scheduled step runs. The location API returns `config.idGA` = `G-27RHPSC41Y`. In an iframe, that function does not call gtag. It posts `{ i: "G-27RHPSC41Y", a: "scheduled", c: "holly" }` to the parent. Outside an iframe it calls `gtag("config", idGA)` and `gtag("event", "scheduled", ...)` inside `book.nimblr.co`.

On our page, `https://assets.nimblr.ai/js/iframe.js` (loaded by `src/components/nimblr-scheduler.tsx`) handles that message by defining its own `gtag()` and pushing `gtag("event", "scheduled", ...)` onto `window.dataLayer`. That function does not load gtag.js. This site does not define a real `window.gtag`, and it does not send a GA4 hit named `scheduled`. `pushBookingConfirmed` sends GA4 event `appointment_confirmed` on `G-27RHPSC41Y` and, in `code` mode, the Ads booking conversion.

`GTM-PP5NDT4H` has no GA4 tag and no trigger for `scheduled`. Dropping that container does not stop a `scheduled` hit, because this page never sends one. The dataLayer push from `iframe.js` stays, and nothing here reads it.

Nimblr's own container `GTM-NF63NFX` (fetched the same day) has one tag: Google tag `G-XWCRHXNRQC`, page views only. It does not contain `AW-700388531`, `700388531`, or the string `scheduled`. The published tag for `G-XWCRHXNRQC` lists destinations `G-XWCRHXNRQC|GT-K5MPSL3` and does not list `AW-700388531`. The published tag for `G-27RHPSC41Y` lists `G-27RHPSC41Y|GT-WB23HXPL` and does not list `AW-700388531`. From those published files, the embedded scheduler's container would not also fire this Ads conversion.

The scheduler bundle also names a Google Maps conversion endpoint (`https://www.google.com/maps/conversion/collect`, partner id `20000870`). That is not `AW-700388531`. Whether a finished booking actually requests it, or calls any tag that is not in the published containers, needs a live test booking. So does confirming that the parent receives `{ a: "scheduled" }` only after a real appointment is saved. The Playwright check stubs that message. It does not complete a booking.

## New-tab booking fallback

`src/components/nimblr-scheduler.tsx` links "Open it in a new tab" to `https://book.nimblr.co/HTxPainInstitute`. That tab does not navigate back here, so `BookingConversion` never sees the message and no Ads conversion is sent. The link stays. In that tab, Nimblr's own code can still send GA4 event `scheduled` to `G-27RHPSC41Y` through the gtag it loads there. That does not depend on our GTM loader.

## Needs decision / outside this PR

1. **Double firing.** This branch avoids it by not loading `GTM-PP5NDT4H` while `GOOGLE_ADS_TRANSPORT` is `"code"`. The other way is for a GTM admin to pause the Ads tags (the Google tag, tag_id 8, and both conversion tags) and only then turn the container back on. Pausing only the two conversion tags is not enough: tag_id 8 still loads the combined tag, the full URL, remarketing, and `G-7LR9NYKKQ3`. Confirm which option should ship before merge. Flipping the switch back to `"gtm"` restores the container, including G-7, and turns the in-code hits off.

2. **Needs a Google tag settings change by an Ads admin.** In the Google tag (`GT-PJNQD84H` / `AW-700388531`), unlink destination `G-7LR9NYKKQ3` and turn off automatic collection of user-provided data (email, phone, and address), Google signals, and enhanced measurement. This repository cannot change those settings. Do not install `gtag/js?id=AW-700388531` until that is done. Code cannot suppress the second destination.

3. **No consent banner and no Consent Mode.** Production tags were observed firing as all-granted (`gcd=13l3l3l3l1l1`, `npa=0`). This PR does not add a banner. The in-code hit uses `npa=1` and sends no user data. That is not Consent Mode.

4. **LeadConnector receives the raw URL.** `src/components/chat-widget.tsx` loads the widget, and the widget sends the full URL and `url_params` to `services.msgsndr.com`. Not changed here. Sanitizing the address with `history.replaceState` before the widget loads is a separate follow-up PR.

5. **Privacy page, section 5.** The Ads sentence now matches the in-code conversion (call or booking, no audience, click-id cookies only when a click id is present, allowlisted page URL). It does not yet disclose `G-7LR9NYKKQ3`, remarketing, or that LeadConnector receives query parameters. A broader rewrite of section 5 needs the owner's ok. The effective date is October 21, 2026 because the Ads sentence changed.

6. **Chat lead measurement.** If anyone still needs `inbx_web_chat_lead_captured` inside `G-7LR9NYKKQ3`, it will not fire while the combined tag is unloaded. The site does not emit that event. Confirm it is not required.
