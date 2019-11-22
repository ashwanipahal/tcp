import { TRACK_PAGE_VIEW, TRACK_CLICK } from '@tcp/core/src/analytics';
import { getActiveRouteName } from './getActiveRouteName';
/*eslint-disable */

export function getOnNavigationStateChange(store) {
  return {
    onNavigationStateChange: (prevState, currentState, action) => {
      const currentScreen = getActiveRouteName(currentState);
      const prevScreen = getActiveRouteName(prevState);
      if (prevScreen !== currentScreen) {
        // change the tracker here to use other Mobile analytics SDK.
        store.dispatch({
          type: TRACK_PAGE_VIEW,
          payload: {
            previousScreen: prevScreen,
            currentScreen,
            // appState: store.getState(),
            navState: currentState,
          },
        });
        __DEV__
          ? console.info(`%cNow navigating to: ${currentScreen}`, 'background: #333; color: #fff')
          : null;
      }
    },
  };
}
