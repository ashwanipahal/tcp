/**
 * @module analytics/TrackingEvent
 *
 * @description This is the base object for all tracking event
 * payloads. The property descriptors control which properties
 * will be present, their default values, and any getter/setter
 * flexibility we might need.
 *
 * @example
 * const myEvent = TrackingEvent({ eventName: "foo" })
 * myEvent.hitType      // "event"
 * myEvent.eventName    // "foo"
 * myEvent.customEvents // []
 * myEvent.products     // []
 */

const descriptors = {
  hitType: {
    enumerable: true,
    value: 'event',
    writable: true,
  },
  eventName: {
    enumerable: true,
    value: '',
    writable: true,
  },
  customEvents: {
    enumerable: true,
    value: [],
    writable: true,
  },
  products: {
    enumerable: true,
    value: [],
    writable: true,
  },
};

export default function TrackingEvent(props) {
  const base = Object.create({}, descriptors);
  return Object.assign(base, props);
}
