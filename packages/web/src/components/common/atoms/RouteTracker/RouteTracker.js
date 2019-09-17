import { useEffect } from 'react';
// TODO: Find out why useRouter causes an error.
import { withRouter } from 'next/router';
import { usePageTracking } from '@tcp/core/src/analytics';

function RouteTracker({ router }) {
  const track = usePageTracking();

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

export default withRouter(RouteTracker);
