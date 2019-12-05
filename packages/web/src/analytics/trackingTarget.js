/* eslint-disable no-underscore-dangle, no-console, consistent-return */
/**
 * Tracking target for the Redux-Beacon middleware
 * @see https://rangle.gitbook.io/redux-beacon/examples-and-recipes#how-to-create-your-own-target
 */
import { setProp } from '@tcp/core/src/analytics/utils';

// This would come from Launch
// This would be used for hotfixing
global._trackingMutation = event => {
  return event;
};

const passthru = event => event;

function transformEvent(event) {
  return (global._trackingMutation || passthru)(event);
}

function setCommonProps() {
  const { _dataLayer } = global;
  if (_dataLayer) {
    setProp('prop29', _dataLayer.favStoreId);
  }
}

function track(...args) {
  const satellite = global._satellite;
  if (!satellite) {
    console.warn('Analytics library is undefined.');
    return;
  }
  satellite.track(...args);
}

export default function create() {
  return events =>
    events.forEach(event => {
      // We need an event name
      if (!event.eventName) return;

      // Logic based on event.hitType (if needed)
      switch (event.hitType) {
        case 'pageView':
        case 'click':
        default:
          break;
      }
      setCommonProps();
      // By default, track w/ just the name and payload
      return track(event.eventName, transformEvent(event));
    });
}
