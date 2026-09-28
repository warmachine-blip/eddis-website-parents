/**
 * The inline LeadConnector form the agency is sending for the ad landing pages.
 *
 * It is not here yet. Until `LEAD_FORM_SRC` has a value, <LeadForm /> renders
 * nothing, so the pages ship complete rather than with an empty box waiting on
 * a third party. Dropping the embed in is a one-line change: paste the src from
 * the LeadConnector "Embed form" dialog below, and set the height it gives you.
 *
 * Keep it an iframe. LeadConnector also offers a <script> embed that writes
 * into the page; that version is blocked by the Content-Security rules the site
 * relies on and would fail silently.
 */
export const LEAD_FORM_SRC = "";

/** Pixel height LeadConnector reports for the form. Only used when SRC is set. */
export const LEAD_FORM_HEIGHT = 560;

/** Heading above the form, where one renders. */
export const LEAD_FORM_TITLE = "Ask us a question";

export const leadFormConfigured = LEAD_FORM_SRC.length > 0;
