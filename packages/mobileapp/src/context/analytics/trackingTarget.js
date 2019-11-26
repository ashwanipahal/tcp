import { TRACK_PAGE_VIEW } from '@tcp/core/src/analytics';
import { ACPCore } from '@adobe/react-native-acpcore';

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
