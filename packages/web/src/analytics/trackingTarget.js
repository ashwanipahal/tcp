/* eslint-disable no-underscore-dangle, no-console */
/**
 * Tracking target for the Redux-Beacon middleware
 * @see https://rangle.gitbook.io/redux-beacon/examples-and-recipes#how-to-create-your-own-target
 */

// This would come from Launch
global._trackingMutation = event => {
  console.log('TRANSFORMING', event);
  return event;
};

function transformEvent(event) {
  const transform = global._trackingMutation || (e => e);
  return transform(event);
}

function track(...args) {
  const satellite = global._satellite;
  if (!satellite) {
    console.warn('Analytics library is undefined.');
  }
  satellite.track(...args);
}

export default function create() {
  return events =>
    events.forEach(event => {
      switch (event.hitType) {
        case 'pageView':
          return track(event.eventName, transformEvent(event));

        case 'click':
          return track(event.eventName, transformEvent(event));

        default:
          break;
      }
      return true;
    });
}
