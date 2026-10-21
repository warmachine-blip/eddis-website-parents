# Preview test: one fake booking

This is a plan. It was not run. Do not run it until the site owner approves one fake booking. Do not merge or deploy from this plan.

Use one booking, on a preview of this branch (the Vercel preview for the pull request, or a local `next start` of this build). Do not use production if a preview is available. Do not enter a real patient's name, email, phone, date of birth, address, insurance id, or social security number.

The scheduler may still create an appointment in Nimblr. After the check, cancel that appointment from the front desk or from Nimblr's manage page. Do not put a real callback number on it.

## Page

Open this URL, with the made-up click id in the query string:

`/request-appointment?gclid=previewtest1`

`previewtest1` is letters and digits only. It is not a live Google click. The scheduler on this page is the iframe (`iframe=true`). Do not click "Open it in a new tab" in this session. That path does not send our Ads pixel, and mixing it in would make the count ambiguous.

`GOOGLE_ADS_TRANSPORT` in this branch is `"code"`. The HTML must not contain `GTM-PP5NDT4H`.

## Fake identity

Use these values for every free-text field that asks for them:

| Field | Value |
| --- | --- |
| Name | Test Booking |
| Email | test-booking@example.com |
| Phone | (555) 010-0199 |

`example.com` and the 555-0100 range are reserved for examples. If the form will not accept them, stop and ask the owner. Do not substitute a real email, a real phone, or a real address. If a date of birth is required, use `1990-01-01` and nothing else. If the form requires an insurance member id, stop. Do not invent one.

## What to watch

In the browser's network panel, turn on "Preserve log" and turn off the cache before loading the page. Keep the log for the whole session. These are the requests that matter:

| Watch for | Why |
| --- | --- |
| `https://www.googleadservices.com/pagead/conversion/700388531/` | Our Ads conversion pixel. The booking label is `Yo8FCL7U-oodELOp_M0C`. |
| `https://googleads.g.doubleclick.net/pagead/viewthroughconversion/` | Remarketing redirect. Must not appear. Our fetch uses `redirect: "manual"` so the browser does not follow it. |
| `https://www.google-analytics.com/g/collect` and `https://analytics.google.com/g/collect` | GA4. `tid` is the property. `en` is the event name. |
| `https://www.googletagmanager.com/gtm.js` | Our container would be `id=GTM-PP5NDT4H`. Nimblr's frame may load `id=GTM-NF63NFX`. |
| `https://www.googletagmanager.com/gtag/js` | Must not be `id=AW-700388531`. |
| `https://www.google.com/maps/conversion/collect` | Named in Nimblr's bundle (partner id `20000870`). Not our Ads conversion. Note whether it fires after the save. Do not treat it as a pass or a fail for `AW-700388531`. |
| Any URL containing `G-7LR9NYKKQ3`, `AW-700388531`, `700388531`, `GTM-PP5NDT4H`, `GTM-NF63NFX`, `G-XWCRHXNRQC`, or `G-27RHPSC41Y` | Separates our pixel, our GA4 property, and Nimblr's tag. |

Also watch the parent page's `dataLayer` (the console: `dataLayer.filter(e => e && (e.event === "scheduled" || e.event === "appointment_confirmed" || e[0] === "event"))`). `iframe.js` pushes gtag arguments, which look like `["event", "scheduled", ...]`, not `{ event: "scheduled" }`.

## Before the save

On first load, before typing into the scheduler:

- No request whose path is `/pagead/conversion/700388531/`.
- No `gtm.js?id=GTM-PP5NDT4H`.
- No `gtag/js?id=AW-700388531`.
- No URL containing `G-7LR9NYKKQ3`.
- No `en=scheduled` on any collect request.
- No `scheduled` entry in `dataLayer`.

A collect with `tid=G-27RHPSC41Y` and `en=page_view` may appear. That is our page view.

The scheduler frame may load `gtm.js?id=GTM-NF63NFX` and send collects with `tid=G-XWCRHXNRQC`. Those are Nimblr's page views on `book.nimblr.co`. Open each one. The URL must not contain `700388531` or `Yo8FCL7U-oodELOp_M0C`.

## One save

Fill the scheduler with the fake identity and save once. Wait until Nimblr shows the booking as saved. Do not submit again.

## Ads booking pixel fires once

After the save, count GET requests whose path is `/pagead/conversion/700388531/`.

Pass is exactly one, and its query contains all of these:

- `label=Yo8FCL7U-oodELOp_M0C`
- `script=0`
- `fmt=3`
- `npa=1`
- `gclaw=previewtest1`
- no `gclgb`, no `wbraid`, and no `gbraid` (this test used `gclid`, and the tag omits `gclgb` in that case)
- `url` is the request-appointment page with `gclid=previewtest1` and no other query keys

The `url` value must not contain `test-booking@example.com`, `555`, `0100199`, or `Test`.

Fail if any of these are true:

- A second request with `label=Yo8FCL7U-oodELOp_M0C`.
- `label=sekFCNPF0ugcELOp_M0C` (the phone conversion) unless someone also clicked the practice phone link. Do not click it during this test.
- Any URL contains `viewthroughconversion`, `/rmkt/`, `1p-user-list`, `user_data`, `G-7LR9NYKKQ3`, or `gtag/js?id=AW-700388531`.

## GA4 `scheduled` only after a real save

Search the log from before the save. `en=scheduled` must be absent, and `dataLayer` must not yet contain `scheduled`.

After the save succeeds:

- Our site sends one collect with `tid=G-27RHPSC41Y` and `en=appointment_confirmed`. That is the GA4 event this repository sends. It must not appear before the save, and it must appear once.
- Our collect does not use `en=scheduled`. This page has no code that sends that name.
- Nimblr's helper (`iframe.js`) may push `["event", "scheduled", ...]` onto the parent `dataLayer` when the message arrives. That push is not a Google request. It should appear only after the save, and only because the message arrived.
- An `en=scheduled` collect is allowed only after the save, and only if you can see that it came from Nimblr rather than from our page. In the iframe, Nimblr's bundle does not call gtag. It posts to the parent. If `en=scheduled` shows up, record its `tid`. `tid=G-XWCRHXNRQC` would be unexpected: the published `GTM-NF63NFX` container has no `scheduled` tag. `tid=G-27RHPSC41Y` with `en=scheduled` would mean some gtag for our property fired that event. Note the initiator. Our `buildCollectQuery` cannot emit `en=scheduled`, so that request is not from `src/lib/ga4-collect.ts`.

## Nimblr's GTM does not double-count our conversion

`GTM-NF63NFX` and `G-XWCRHXNRQC` may keep sending page views for `book.nimblr.co` during the booking. Pass is all of these:

- No request that loads `GTM-NF63NFX` or sends `tid=G-XWCRHXNRQC` also contains `700388531` or `Yo8FCL7U-oodELOp_M0C`.
- The count of `/pagead/conversion/700388531/` with the booking label is still 1 after those Nimblr requests are included.
- No second booking label appears on `google-analytics.com`, `analytics.google.com`, or `googletagmanager.com`.

## Afterward

Cancel the fake appointment. Do not run a second booking to see if the pixel fires again. A second save creates a second appointment. The once-per-page guard is already covered by the unit tests and by `npm run test:ads`, which stubs the message and does not book.

The new-tab link is out of scope for this session. A later session, still with fake data and owner approval, can open `https://book.nimblr.co/HTxPainInstitute` directly. Expect zero requests to `/pagead/conversion/700388531/` with the booking label from our origin. Nimblr may send `en=scheduled` to `G-27RHPSC41Y` from inside that tab. That is not our pixel.
