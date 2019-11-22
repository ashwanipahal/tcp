import { ACPCore } from '@adobe/react-native-acpcore';
import { TRACK_PAGE_VIEW, TRACK_CLICK, trackPageView, trackClick } from '@tcp/core/src/analytics';

// function trackPageview(action) {
//   const { payload } = action;
//   const { currentScreen, previousScreen, appState } = payload;
//   console.log(`Tracking PageView: ${previousScreen} -> ${currentScreen}`);
//   ACPCore.trackAction('pageView', { currentScreen, previousScreen });
// }

export const eventMapping = {
  [TRACK_PAGE_VIEW]: trackPageView(action => {
    const { payload } = action;
    const { currentScreen, previousScreen, context } = payload;
    return {
      currentScreen,
      previousScreen,
      context,
    };
  }),
  [TRACK_CLICK]: trackClick(action => {
    const { payload } = action;
    const { linkname } = payload;
    return {
      linkname,
    };
  }),
};
