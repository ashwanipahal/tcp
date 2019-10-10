import { ACPCore } from '@adobe/react-native-acpcore';
import { TRACK_PAGE_VIEW, TRACK_CLICK, trackPageView } from '@tcp/core/src/analytics';

// function trackPageview(action) {
//   const { payload } = action;
//   const { currentScreen, previousScreen, appState } = payload;
//   console.log(`Tracking PageView: ${previousScreen} -> ${currentScreen}`);
//   ACPCore.trackAction('pageView', { currentScreen, previousScreen });
// }

function trackClick(action) {
  const { payload } = action;
  ACPCore.trackAction('click', { msg: 'click' });
}

export const eventMapping = {
  [TRACK_PAGE_VIEW]: trackPageView(action => {
    const { payload } = action;
    const { currentScreen, previousScreen, appState } = payload;
    return {
      currentScreen,
      previousScreen,
      appState,
    };
  }),
  'testing array': action => [{ hitType: 'foo' }, { hitType: 'bar' }],
  TRACK_CLICK: trackClick,
};
