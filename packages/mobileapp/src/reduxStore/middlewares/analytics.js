/* eslint-disable  */
import { createMiddleware } from 'redux-beacon';
import logger from '@redux-beacon/logger';
// import eventMapping from '../../analytics/eventMapping';
import createTrackingTarget from '../../analytics/trackingTarget';

/**
 * Create the Redux-Beacon middleware instance.
 */

const eventMapping = {
  'analytics:TRACK_PAGE_VIEW': action => {
    console.log(action);
  },
};

function trackingTarget(events) {
  console.log(events);
}

export default function create() {
  return createMiddleware(
    eventMapping,
    trackingTarget,
    // Only use logger in dev mode
    process.env.NODE_ENV === 'development' && { logger }
  );
}
