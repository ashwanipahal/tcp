/**
 * Common timer names used for measuring the performance
 * of key elements and interactions. These strings may
 * be configured in mPulse as custom timer values.
 *
 * @example
 * // For web, using the Performance API and Boomerang
 * performance.measure(HERO_VISIBLE)
 * // Later...
 * const entry = performance.getEntiresByName(HERO_VISIBLE)[0]
 * BOOMR.sendTimer(entry.name, entry.duration)
 *
 * @see https://childrensplace.atlassian.net/wiki/spaces/RDP/pages/797705180/Page-wise+measures+for+mPulse
 * @see https://community.akamai.com/customers/s/article/mPulse-Custom-and-Navigation-Timers
 */

// The time when the last (client-side) navigation change began
export const NAVIGATION_START = 'navigation_start';

// The time when the page is considered fully loaded
export const FULLY_LOADED = 'fully_loaded';

// The time when the page is considered completely visible to the end-user
export const FULLY_VISIBLE = 'fully_visible';

// The time of the first user interaction with the page during or after a navigation (such as scroll or click)
export const TIME_TO_USER_ACTION = 'time_to_user_action';

// The time when the primary visual media element is considered visible to the end-user
export const HERO_VISIBLE = 'hero_visible';

// The time when the primary call to action (such as a button) is considered visible to the end-user
export const CALL_TO_ACTION_VISIBLE = 'call_to_action_visible';

// The time when the primary navigation element is considered visible to the end-user
export const NAVIGATION_VISIBLE = 'navigation_visible';

// The time when the primary heading is considered visible to the end-user
export const HEADING_VISIBLE = 'heading_visible';

// The time when the primary pricing content is considered visible to the end-user
export const PRICING_VISIBLE = 'pricing_visible';

// The time when the primary control elements (such as size or color options) are considered visible to the end-user
export const CONTROLS_VISIBLE = 'controls_visible';

// The time when the primary list of results (such as a product listing) are considered visible to the end-user
export const RESULTS_VISIBLE = 'results_visible';

// The time when the primary promotional content (such as banners) are considered visible to the end-user
export const PROMOTION_VISIBLE = 'promotion_visible';

// The time when the primary (page-level) navigation element is considered visible to the end-user
export const PAGE_NAVIGATION_VISIBLE = 'page_navigation_visible';

// The time when the primary global branding element is considered visible to the end-user
export const BRAND_IDENTITY_VISIBLE = 'brand_identity_visible';

export const TIMER_NAMES = [
  NAVIGATION_START,
  FULLY_LOADED,
  FULLY_VISIBLE,
  TIME_TO_USER_ACTION,
  HERO_VISIBLE,
  CALL_TO_ACTION_VISIBLE,
  NAVIGATION_VISIBLE,
  HEADING_VISIBLE,
  PRICING_VISIBLE,
  CONTROLS_VISIBLE,
  RESULTS_VISIBLE,
  PROMOTION_VISIBLE,
  PAGE_NAVIGATION_VISIBLE,
  BRAND_IDENTITY_VISIBLE,
];
