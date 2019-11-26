import { TRACK_PAGE_VIEW } from '@tcp/core/src/analytics';
import { getActiveRoute } from './getActiveRoute';

/**
 * This function will be called on every route change in app and will trigger the page load event
 * with currentScreen name and pageData if available in route params.
 * @param { store } store - current store object
 * @param { context } context - context object
 */
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
      }
    },
  };
}
