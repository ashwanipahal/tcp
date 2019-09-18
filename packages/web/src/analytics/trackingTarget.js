/**
 * Tracking target for the Redux-Beacon middleware
 * @see https://rangle.gitbook.io/redux-beacon/examples-and-recipes#how-to-create-your-own-target
 */

function lib() {
  // eslint-disable-next-line no-underscore-dangle
  const satellite = global._satellite;
  if (!satellite) {
    // eslint-disable-next-line no-console
    console.warn('Analytics library is undefined.');
    return {
      // TODO: Figure out if we want to mock this or not
      track() {},
    };
  }
  return satellite;
}

export default function create() {
  return events => {
    events.forEach(event => {
      switch (event.hitType) {
        case 'pageView':
        case 'click':
          lib().track(event.eventName, {});
          break;
        default:
          break;
      }
    });
  };
}
