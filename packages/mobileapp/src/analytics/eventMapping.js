import { ACPCore } from '@adobe/react-native-acpcore';
import { TRACK_PAGE_VIEW, TRACK_CLICK } from '@tcp/core/src/analytics';

function trackPageview(action) {
  const { payload } = action;
  const { currentScreen, previousScreen, appState } = payload;
  console.log(`Tracking PageView: ${previousScreen} -> ${currentScreen}`);
  ACPCore.trackAction('pageView', { currentScreen, previousScreen });
}

function trackClick(action) {
  const { payload } = action;
  ACPCore.trackAction('click', { msg: 'click' });
}

export const eventMapping = {
  [TRACK_PAGE_VIEW]: trackPageview,
  TRACK_CLICK: trackClick,
};
