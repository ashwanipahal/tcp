/**
 * @module analytics/events
 *
 * @description These definitions represent the specific payloads
 * for each tracking call. The payload shapes should match what
 * the analytics library needs to send, and can optionally be derived
 * from the current action and previous/next states. The logic
 * for deriving the payloads can live here or within the event
 * mapper logic (or in both places) for flexibility.
 *
 * @example
 * trackClick(action => ({
 *   name: action.payload.thingThatWasClicked
 * }))
 *
 * @example
 * trackPageView((action, prevState) => ({
 *   name: action.payload.routePath,
 *   prevPage: prevState.router.path
 * }))
 *
 * @see https://rangle.gitbook.io/redux-beacon/index-1/event-definition
 * @see https://rangle.gitbook.io/redux-beacon/index-1/events-mapper
 */

import TrackingEvent from './TrackingEvent';
import { TRACK_LINK_CLICK, TRACK_PAGE_VIEW } from './names';

function EventDefinition(action /* , prevState, nextState */) {
  return { ...action.payload };
}

export function trackPageView(eventDef = EventDefinition) {
  return (...args) =>
    TrackingEvent({
      hitType: 'pageView',
      eventName: TRACK_PAGE_VIEW,
      ...eventDef(...args),
    });
}

export function trackClick(eventDef = EventDefinition) {
  return (...args) =>
    TrackingEvent({
      hitType: 'click',
      eventName: TRACK_LINK_CLICK,
      ...eventDef(...args),
    });
}
