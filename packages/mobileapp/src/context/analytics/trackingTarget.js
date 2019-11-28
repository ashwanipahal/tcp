import { createMiddleware } from 'redux-beacon';
import { TRACK_PAGE_VIEW, TRACK_CLICK, trackPageView, trackClick } from '@tcp/core/src/analytics';
import logger from '@redux-beacon/logger';
import { eventMapping } from './eventMapping';
import {
  ACPCore,
  ACPLifecycle,
  ACPIdentity,
  ACPSignal,
  ACPMobileLogLevel,
} from '@adobe/react-native-acpcore';
import { ACPAnalytics } from '@adobe/react-native-acpanalytics';

const app_id = 'dae3661a4c63/7bc47440747f/launch-8ca67ecb0da6-development';

export function trackingTarget(events) {
  events.forEach(event => {
    if (event.hitType === 'pageView') {
      const { previousScreen, currentScreen } = event;
      console.log(`Tracking PageView: ${previousScreen} -> ${currentScreen}`);
      ACPCore.trackAction(TRACK_PAGE_VIEW, { currentScreen, previousScreen });
    }
  });
}
