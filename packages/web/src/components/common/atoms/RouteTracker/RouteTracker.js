import { useEffect } from 'react';
import { usePageTracking } from '@tcp/core/src/analytics';

/**
 * NOTE: Using `withRouter` or `useRouter` did not work
 * for this component because the `components` property
 * was not getting set as expected.
 */
import Router from 'next/router';

// TODO: Remove connect once react-redux@7 is in use
import { connect } from 'react-redux';

/**
 * Get the component properties of the current route.
 *
 * NOTE: this `components` property on the router is
 * not documented. We should consider this risky. The
 * main purpose of this is to associate the initial
 * props of a route component with the URL when the
 * router change events occur.
 *
 * @see https://nextjs.org/docs#routing
 * @see https://github.com/zeit/next.js/blob/canary/packages/next/next-server/lib/router/router.ts
 * @returns {Object} route component props
 */
function getRouteProps() {
  const { components, route } = Router;
  const { props = {} } = components[route] || {};
  return props;
}

/**
 * A component that sets up event handlers for when the
 * route changes, and dispatches Redux actions with
 * payloads containing the current URL and route
 * component properties.
 */
function RouteTracker({ dispatch }) {
  const track = usePageTracking(dispatch);
  const handleChange = url =>
    track({
      path: url,
      props: getRouteProps(),
    });

  useEffect(() => {
    // Track current route on mount
    handleChange(Router.asPath);

    // Track future route changes
    Router.events.on('routeChangeComplete', handleChange);

    // Stop tracking route changes on unmount
    return () => Router.events.off('routeChangeComplete', handleChange);
  }, []);

  return null;
}

export default connect()(RouteTracker);
