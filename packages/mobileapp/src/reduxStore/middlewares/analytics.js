/* eslint-disable  */
import { createMiddleware } from 'redux-beacon';
import logger from '@redux-beacon/logger';
import { eventMapping } from '../../analytics/eventMapping';
import {
  ACPCore,
  ACPLifecycle,
  ACPIdentity,
  ACPSignal,
  ACPMobileLogLevel,
} from '@adobe/react-native-acpcore';
import { ACPAnalytics } from '@adobe/react-native-acpanalytics';

/**
 * Create the Redux-Beacon middleware instance.
 */

const app_id = 'dae3661a4c63/7bc47440747f/launch-8ca67ecb0da6-development';

ACPCore.setLogLevel(ACPMobileLogLevel.VERBOSE);
ACPCore.configureWithAppId(app_id);
ACPLifecycle.registerExtension();
ACPIdentity.registerExtension();
ACPSignal.registerExtension();
ACPAnalytics.registerExtension();
ACPCore.start();

function trackingTarget(events) {
  console.log('EVENTS', events);
}

export default function create() {
  return createMiddleware(
    eventMapping,
    trackingTarget,
    // Only use logger in dev mode
    process.env.NODE_ENV === 'development' && { logger }
  );
}
