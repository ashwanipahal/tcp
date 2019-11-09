/**
 * @module analytics/actions
 *
 * @description These are Redux action types and creators for the
 * most basic tracking events. We would use these only when there
 * are no existing Redux action available to associate with a
 * given tracking event.
 */

const ns = 'analytics';

export const TRACK_PAGE_VIEW = `${ns}:TRACK_PAGE_VIEW`;
export const TRACK_CLICK = `${ns}:TRACK_CLICK`;
export const SET_CLICK_PAYLOAD = `${ns}:SET_CLICK_PAYLOAD`;
export const RESET_CLICK_PAYLOAD = `${ns}:RESET_CLICK_PAYLOAD`;

export function trackPageView(payload) {
  return { type: TRACK_PAGE_VIEW, payload };
}

export function trackClick(payload) {
  return { type: TRACK_CLICK, payload };
}

export function setClickAnalyticsData(payload) {
  return { type: SET_CLICK_PAYLOAD, payload };
}

export function resetClickAnalyticsData() {
  return { type: RESET_CLICK_PAYLOAD };
}
