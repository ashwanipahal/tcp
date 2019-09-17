/**
 * Tracking target for the Redux-Beacon middleware
 * @see https://rangle.gitbook.io/redux-beacon/examples-and-recipes#how-to-create-your-own-target
 */

function lib() {
  // eslint-disable-next-line no-underscore-dangle
  const satellite = global._satellite;
  if (!satellite) {
    console.warn('Analytics library is undefined.');
    return {};
  }
  return satellite;
}

export default function create() {
  return events => {
    events.forEach(event => {
      switch (event.hitType) {
        default:
          lib().track(event.eventName);
          break;
      }
    });
  };
}
