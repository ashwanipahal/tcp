/* eslint-disable  */
import { createMiddleware } from 'redux-beacon';
import eventMapping from '../../context/analytics/eventMapping';
import trackingTarget from '../../context/analytics/trackingTarget';
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

export default function create() {
  return createMiddleware(eventMapping, trackingTarget);
}
