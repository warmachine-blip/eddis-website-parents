/**
 * Cookie choice and Google Consent Mode v2. This is an opt-out.
 *
 * Until the visitor clicks Reject, every signal stays granted and the
 * Google tags keep doing what they already do. Reject is what denies
 * analytics_storage, ad_storage, ad_user_data, and ad_personalization.
 *
 * Eddie: the switch is GPC_DENIES_ADS. It ships false, so Global Privacy
 * Control changes nothing. Banner copy is CONSENT_BANNER_TEXT.
 *
 * consentBootstrap() is rendered before any Google tag, including the
 * GTM container when GOOGLE_ADS_TRANSPORT is "gtm". On a first visit it
 * only sends a granted default. It does not set ads_data_redaction or
 * url_passthrough until a later update actually denies ads.
 */

export type ConsentState = "granted" | "denied";

export type ConsentChoice = "accept" | "reject";

export type ConsentSignals = {
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  analytics_storage: ConsentState;
};

/**
 * When true, a browser with Global Privacy Control denies ad storage,
 * ad user data, and ad personalization even if the visitor has not
 * clicked Reject. Analytics stays granted unless they also reject.
 * False (shipped): the signal is ignored, so PatientEdge remarketing
 * still runs for those visitors.
 */
export const GPC_DENIES_ADS = false;

/**
 * When true, Google may copy an ad click id onto later same-site links
 * while ad storage is denied. Off. Only sent with an update that denies ads.
 */
export const URL_PASSTHROUGH = false;

/** Redact ad click ids on Ads pings while ad storage is denied. */
export const ADS_DATA_REDACTION = true;

export const CONSENT_COOKIE = "htx_consent";

/** Six months. The choice is a first-party cookie, not a Google cookie. */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export const CONSENT_OPEN_EVENT = "htx-consent-open";
export const CONSENT_CHANGE_EVENT = "htx-consent-change";

/** Banner strings. Edit here, not in the component. */
export const CONSENT_BANNER_TEXT = {
  heading: "Cookies",
  body: "We use cookies to measure this site and our ads. Reject turns those cookies off. Scheduling and the rest of the site work either way.",
  accept: "Accept",
  reject: "Reject",
  privacyLabel: "Privacy policy",
  privacyHref: "/privacy",
  settings: "Cookie settings",
  gpc: "Your browser is asking sites not to share data for ads, so ad measurement stays off.",
  close: "Close",
} as const;

/** First-party names Google uses for ads. Prefix match in the cookie guard. */
export const AD_COOKIE_PREFIXES = ["_gcl_", "_gac_"] as const;

/** Removed when ad storage is denied, including cookies already set. */
export const KNOWN_AD_COOKIES = [
  "_gcl_au",
  "_gcl_aw",
  "_gcl_gb",
  "_gcl_ag",
  "_gcl_dc",
  "_gcl_gs",
] as const;

/** Removed when analytics storage is denied. */
export const KNOWN_ANALYTICS_COOKIES = [
  "_ga",
  "_gid",
  "_gat",
  "_ga_27RHPSC41Y",
  "_ga_7LR9NYKKQ3",
] as const;

const CONSENT_KEYS = [
  "ad_storage",
  "analytics_storage",
  "ad_user_data",
  "ad_personalization",
] as const;

type ConsentKey = (typeof CONSENT_KEYS)[number];

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean;
  }

  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __htxConsentQueued?: boolean;
  }
}

export type ResolvedConsent = {
  signals: ConsentSignals;
  /** A stored Accept or Reject. Global Privacy Control alone is not a stored choice. */
  choice: ConsentChoice | null;
  globalPrivacyControl: boolean;
  /**
   * Send a consent update. False while every signal is still the granted
   * default, including after Accept, so those hits stay on the default.
   */
  update: boolean;
  /** False when a choice is stored, or when GPC is denying ads. */
  showBanner: boolean;
};

export function defaultConsentSignals(): ConsentSignals {
  return {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  };
}

export function parseConsentChoice(value: string | null | undefined): ConsentChoice | null {
  if (value === "accept" || value === "reject") return value;
  return null;
}

/** First matching htx_consent value. Anything else is treated as no choice. */
export function readChoiceFromCookieHeader(header: string | null | undefined): ConsentChoice | null {
  if (!header) return null;
  const parts = header.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    if (trimmed.slice(0, eq) !== CONSENT_COOKIE) continue;
    return parseConsentChoice(trimmed.slice(eq + 1));
  }
  return null;
}

export function resolveConsent(input: {
  choice: ConsentChoice | null;
  globalPrivacyControl: boolean;
  /** Defaults to GPC_DENIES_ADS. Tests pass the other value. */
  gpcDeniesAds?: boolean;
}): ResolvedConsent {
  const gpcDeniesAds = input.gpcDeniesAds ?? GPC_DENIES_ADS;
  const gpc = input.globalPrivacyControl === true;
  const choice = input.choice;
  const signals = defaultConsentSignals();

  if (choice === "reject") {
    signals.ad_storage = "denied";
    signals.ad_user_data = "denied";
    signals.ad_personalization = "denied";
    signals.analytics_storage = "denied";
  }
  if (gpcDeniesAds && gpc) {
    signals.ad_storage = "denied";
    signals.ad_user_data = "denied";
    signals.ad_personalization = "denied";
  }

  const baseline = defaultConsentSignals();
  const update = CONSENT_KEYS.some((key) => signals[key] !== baseline[key]);

  return {
    signals,
    choice,
    globalPrivacyControl: gpc,
    update,
    showBanner: choice === null && !(gpcDeniesAds && gpc),
  };
}

/**
 * gcs is G1 plus ad_storage then analytics_storage (1 granted, 0 denied).
 * gcd letters follow the order ad_storage, analytics_storage, ad_user_data,
 * ad_personalization. The baseline is granted: t = granted default with no
 * update, u = granted default then denied, v = granted again on update.
 * The 5l1 tail is the shape these four signals produce when the rest are unset.
 */
export function consentQuery(resolved: ResolvedConsent): {
  gcs: string;
  gcd: string;
  npa: "0" | "1";
} {
  const defaults = defaultConsentSignals();
  const letters = CONSENT_KEYS.map((key) => consentLetter(defaults[key], resolved, key));
  const ad = resolved.signals.ad_storage === "granted" ? "1" : "0";
  const analytics = resolved.signals.analytics_storage === "granted" ? "1" : "0";
  return {
    gcs: `G1${ad}${analytics}`,
    gcd: `13${letters[0]}3${letters[1]}3${letters[2]}3${letters[3]}5l1`,
    npa: resolved.signals.ad_personalization === "granted" ? "0" : "1",
  };
}

/** Fields for our own GA4 collect. Omitted while the granted default still holds. */
export function collectConsentFields(resolved: ResolvedConsent): {
  gcs?: string;
  gcd?: string;
  npa?: "0" | "1";
} {
  if (!resolved.update) return {};
  return consentQuery(resolved);
}

function consentLetter(fallback: ConsentState, resolved: ResolvedConsent, key: ConsentKey): string {
  const effective = resolved.signals[key];
  if (!resolved.update) return fallback === "granted" ? "t" : "p";
  if (fallback === "denied" && effective === "denied") return "q";
  if (fallback === "denied" && effective === "granted") return "r";
  if (fallback === "granted" && effective === "denied") return "u";
  return "v";
}

export type ConsentChangeDetail = {
  previousAnalytics: ConsentState;
  nextAnalytics: ConsentState;
};

export function readBrowserConsent(): ResolvedConsent {
  if (typeof document === "undefined") {
    return resolveConsent({ choice: null, globalPrivacyControl: false });
  }
  const gpc = typeof navigator !== "undefined" && navigator.globalPrivacyControl === true;
  return resolveConsent({
    choice: readChoiceFromCookieHeader(document.cookie),
    globalPrivacyControl: gpc,
  });
}

export function consentCookieAssignment(choice: ConsentChoice, secure: boolean): string {
  const secureAttr = secure ? "; Secure" : "";
  return `${CONSENT_COOKIE}=${choice}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secureAttr}`;
}

export function expireCookieAssignment(name: string, secure: boolean): string {
  const secureAttr = secure ? "; Secure" : "";
  return `${name}=; Path=/; Max-Age=0; SameSite=Lax${secureAttr}`;
}

/** Names to delete for this state. Deletions use Max-Age=0, which the guard allows. */
export function cookiesToExpire(signals: ConsentSignals): string[] {
  const names: string[] = [];
  if (signals.analytics_storage !== "granted") names.push(...KNOWN_ANALYTICS_COOKIES);
  if (signals.ad_storage !== "granted") names.push(...KNOWN_AD_COOKIES);
  return names;
}

/**
 * False for Google analytics or ads cookies while the matching storage is
 * denied. The consent cookie and Max-Age=0 deletions are always allowed.
 * Every other cookie (the chat widget, for example) is left alone.
 */
export function cookieWriteAllowed(assignment: string, signals: ConsentSignals): boolean {
  const name = assignment.split("=")[0]?.trim() ?? "";
  if (!name || name === CONSENT_COOKIE) return true;
  if (/Max-Age=0/i.test(assignment)) return true;
  if (name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name === "_gat") {
    return signals.analytics_storage === "granted";
  }
  if (AD_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))) {
    return signals.ad_storage === "granted";
  }
  return true;
}

/**
 * In-code Ads conversions (GOOGLE_ADS_TRANSPORT "code") call this.
 * Granted, including the default, means the existing GET still fires.
 * Denied means it does not.
 */
export function adsConversionAllowed(resolved: ResolvedConsent): boolean {
  return resolved.signals.ad_storage === "granted";
}

export function pushConsentUpdate(signals: ConsentSignals) {
  if (typeof window === "undefined") return;
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  function gtag(..._args: unknown[]) {
    void _args;
    // Google's queue reads the Arguments object. A rest array is ignored.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  }
  if (signals.ad_storage !== "granted") {
    if (ADS_DATA_REDACTION) gtag("set", "ads_data_redaction", true);
    if (URL_PASSTHROUGH) gtag("set", "url_passthrough", true);
  }
  gtag("consent", "update", {
    ad_storage: signals.ad_storage,
    ad_user_data: signals.ad_user_data,
    ad_personalization: signals.ad_personalization,
    analytics_storage: signals.analytics_storage,
  });
}

/** Writes the choice, updates Consent Mode when a signal changes, and clears cookies that change no longer allows. */
export function applyConsentChoice(choice: ConsentChoice): ConsentChangeDetail {
  const previous = readBrowserConsent();
  const secure = typeof location !== "undefined" && location.protocol === "https:";
  document.cookie = consentCookieAssignment(choice, secure);
  const gpc = typeof navigator !== "undefined" && navigator.globalPrivacyControl === true;
  const next = resolveConsent({ choice, globalPrivacyControl: gpc });
  if (next.update) pushConsentUpdate(next.signals);
  for (const name of cookiesToExpire(next.signals)) {
    document.cookie = expireCookieAssignment(name, secure);
  }
  const detail: ConsentChangeDetail = {
    previousAnalytics: previous.signals.analytics_storage,
    nextAnalytics: next.signals.analytics_storage,
  };
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail }));
  return detail;
}

export function requestConsentSettings() {
  if (typeof window === "undefined") return;
  window.__htxConsentQueued = true;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/**
 * Parser-executed script for <head>, before any Google tag. Kept as one
 * string so the default and the cookie guard cannot drift from this file.
 */
export function consentBootstrap(gpcDeniesAds: boolean = GPC_DENIES_ADS): string {
  const adPrefixes = JSON.stringify(AD_COOKIE_PREFIXES);
  const analyticsCookies = JSON.stringify(KNOWN_ANALYTICS_COOKIES);
  const adCookies = JSON.stringify(KNOWN_AD_COOKIES);
  const gpcFlag = gpcDeniesAds ? "true" : "false";
  const redact = ADS_DATA_REDACTION ? "if(state.ads!=='granted')gtag('set','ads_data_redaction',true);" : "";
  const passthrough = URL_PASSTHROUGH ? "if(state.ads!=='granted')gtag('set','url_passthrough',true);" : "";

  return `(function(){
var COOKIE=${JSON.stringify(CONSENT_COOKIE)};
var GPC_DENIES_ADS=${gpcFlag};
var AD_PREFIXES=${adPrefixes};
var ANALYTICS_COOKIES=${analyticsCookies};
var AD_COOKIES=${adCookies};
function readChoice(){
  var parts=String(document.cookie||"").split(";");
  for(var i=0;i<parts.length;i++){
    var part=parts[i].replace(/^\\s+/,"");
    var eq=part.indexOf("=");
    if(eq===-1)continue;
    if(part.slice(0,eq)!==COOKIE)continue;
    var value=part.slice(eq+1);
    if(value==="accept"||value==="reject")return value;
  }
  return null;
}
function gpcOn(){return typeof navigator!=="undefined"&&navigator.globalPrivacyControl===true;}
function resolved(){
  var choice=readChoice();
  var ads="granted";
  var analytics="granted";
  if(choice==="reject"){ads="denied";analytics="denied";}
  if(GPC_DENIES_ADS&&gpcOn())ads="denied";
  return {choice:choice,ads:ads,analytics:analytics,update:ads!=="granted"||analytics!=="granted"};
}
window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments);}
window.gtag=window.gtag||gtag;
gtag("consent","default",{
  ad_storage:"granted",
  ad_user_data:"granted",
  ad_personalization:"granted",
  analytics_storage:"granted"
});
var state=resolved();
if(state.update){
  ${redact}
  ${passthrough}
  gtag("consent","update",{
    ad_storage:state.ads,
    ad_user_data:state.ads,
    ad_personalization:state.ads,
    analytics_storage:state.analytics
  });
}
var secure=(typeof location!=="undefined"&&location.protocol==="https:")?"; Secure":"";
var clear=[];
if(state.analytics!=="granted")clear=clear.concat(ANALYTICS_COOKIES);
if(state.ads!=="granted")clear=clear.concat(AD_COOKIES);
for(var c=0;c<clear.length;c++){
  document.cookie=clear[c]+"=; Path=/; Max-Age=0; SameSite=Lax"+secure;
}
try{
  var protos=[];
  if(typeof Document!=="undefined")protos.push(Document.prototype);
  if(typeof HTMLDocument!=="undefined"&&protos.indexOf(HTMLDocument.prototype)===-1)protos.push(HTMLDocument.prototype);
  for(var pi=0;pi<protos.length;pi++){
    var desc=Object.getOwnPropertyDescriptor(protos[pi],"cookie");
    if(!desc||!desc.get||!desc.set||!desc.configurable)continue;
    (function(proto,desc){
      Object.defineProperty(proto,"cookie",{
        configurable:true,
        enumerable:!!desc.enumerable,
        get:function(){return desc.get.call(this);},
        set:function(value){
          var str=String(value);
          var name=str.split("=")[0].replace(/^\\s+|\\s+$/g,"");
          var allow=true;
          if(name&&name!==COOKIE&&!/Max-Age=0/i.test(str)){
            var now=resolved();
            if(name==="_ga"||name.indexOf("_ga_")===0||name==="_gid"||name==="_gat"){
              allow=now.analytics==="granted";
            }else{
              for(var p=0;p<AD_PREFIXES.length;p++){
                if(name.indexOf(AD_PREFIXES[p])===0){allow=now.ads==="granted";break;}
              }
            }
          }
          if(!allow)return;
          desc.set.call(this,value);
        }
      });
    })(protos[pi],desc);
  }
}catch(e){}
})();`;
}
