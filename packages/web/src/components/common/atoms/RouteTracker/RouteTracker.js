import { useEffect } from 'react';
// TODO: Find out why useRouter causes an error.
import { withRouter } from 'next/router';
// TODO: Remove connect once react-redux@7 is in use
import { connect } from 'react-redux';
import { usePageTracking } from '@tcp/core/src/analytics';

function RouteTracker({ router, dispatch }) {
  const track = usePageTracking(dispatch);

  useEffect(() => {
    // Track current route on mount
    track(router.asPath);

    // Track future route changes
    router.events.on('routeChangeComplete', track);

    // Stop tracking route changes on unmount
    return () => router.events.off('routeChangeComplete', track);
  }, []);

  return null;
}

export default connect()(withRouter(RouteTracker));
