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

function EventDefinition(action /* , prevState, nextState */) {
  return { ...action.payload };
}

export function trackPageView(eventDef = EventDefinition) {
  return (...args) => {
    const { name } = eventDef(...args);
    return TrackingEvent({
      hitType: 'pageView',
      name,
      // TODO: Fill in rest of payload
    });
  };
}

export function trackClick(eventDef = EventDefinition) {
  return (...args) => {
    const { name } = eventDef(...args);
    return TrackingEvent({
      hitType: 'click',
      name,
      // TODO: Fill in rest of payload
    });
  };
}

export function trackServiceResponse(eventDef = EventDefinition) {
  return (...args) => {
    const { name } = eventDef(...args);
    return TrackingEvent({
      hitType: 'serviceResponse',
      name,
      // TODO: Fill in rest of payload
    });
  };
}
