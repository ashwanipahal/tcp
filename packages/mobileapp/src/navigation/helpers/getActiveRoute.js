/**
 * This function will return the routeName and params for current active route.
 * @param { object } navigationState current navigation state
 */
export function getActiveRoute(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRoute(route);
  }
  const { routeName, params } = route || {};
  return {
    routeName,
    params,
  };
}
export default getActiveRoute;
