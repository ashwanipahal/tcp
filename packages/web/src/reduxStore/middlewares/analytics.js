import { createMiddleware } from 'redux-beacon';
import logger from '@redux-beacon/logger';
import eventMapping from '../../analytics/eventMapping';
import createTrackingTarget from '../../analytics/trackingTarget';

/**
 * Create the Redux-Beacon middleware instance.
 */
export default function create() {
  return createMiddleware(
    eventMapping,
    createTrackingTarget(),
    // Only use logger in dev mode
    process.env.NODE_ENV === 'development' && { logger }
  );
}
