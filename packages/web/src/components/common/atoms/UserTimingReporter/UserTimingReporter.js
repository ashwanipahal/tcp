import { useEffect } from 'react';
import Router from 'next/router';
import { NAVIGATION_START } from '@tcp/core/src/constants/rum.constants';

/**
 * On each route change, we must reset this performance
 * marker so that subsequent UX timers on the new route/page
 * can create measurements relative to the new value for
 * `NAVIGATION_START` (opposed to the initial SSR marker).
 */
function handleRouteChangeStart() {
  performance.clearMarks(NAVIGATION_START);
}

function handleBeforeHistoryChange() {
  performance.mark(NAVIGATION_START);
}

function teardownRouteHandlers() {
  Router.events.off('routeChangeStart', handleRouteChangeStart);
  Router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
}

function setupRouteHandlers() {
  Router.events.on('routeChangeStart', handleRouteChangeStart);
  Router.events.on('beforeHistoryChange', handleBeforeHistoryChange);
  return teardownRouteHandlers;
}

/**
 * This component encapsulates the logic for adding the
 * proper router event handlers for setting and clearing
 * the client-side navigation marker.
 *
 * Order of Router events:
 * 1. routeChangeStart
 * 2. beforeHistoryChange
 * 3. routeChangeComplete (not used in this module)
 *
 * @see https://nextjs.org/docs#router-events
 */
export default function UserTimingReporter(props) {
  useEffect(setupRouteHandlers, []);
  return props.children;
}

UserTimingReporter.defaultProps = {
  children: null,
};
