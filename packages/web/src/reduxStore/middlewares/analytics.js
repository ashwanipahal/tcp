import { createMiddleware } from 'redux-beacon';
import logger from '@redux-beacon/logger';
import eventMapping from '../../analytics/eventMapping';
import trackingTarget from '../../analytics/trackingTarget';

export default function create() {
  return createMiddleware(eventMapping, trackingTarget, {
    logger,
  });
}
