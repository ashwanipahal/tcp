import { TRACK_PAGE_VIEW } from '@tcp/core/src/analytics';
import { getActiveRoute } from './getActiveRoute';
/*eslint-disable */

export function getOnNavigationStateChange({ store, context }) {
  return {
    onNavigationStateChange: (prevState, currentState, action) => {
      const currentScreen = getActiveRoute(currentState);
      const prevScreen = getActiveRoute(prevState);
      if (prevScreen.routeName !== currentScreen.routeName) {
        // change the tracker here to use other Mobile analytics SDK.
        store.dispatch({
          type: TRACK_PAGE_VIEW,
          payload: {
            currentScreen: currentScreen.routeName,
            pageData: currentScreen.params && currentScreen.params.pageData,
          },
        });
        __DEV__
          ? console.info(`%cNow navigating to: ${currentScreen}`, 'background: #333; color: #fff')
          : null;
      }
    },
  };
}
