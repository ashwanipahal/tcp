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

export function trackPageView(payload) {
  return { type: TRACK_PAGE_VIEW, payload };
}

export function trackClick(payload) {
  return { type: TRACK_CLICK, payload };
}
