import { useEffect } from 'react';
// TODO: Find out why useRouter causes an error.
import { withRouter } from 'next/router';
import { trackPageViewed } from '../../../../utils/analytics';

function RouteTracker({ router }) {
  useEffect(() => {
    // Track current route on mount
    trackPageViewed(router.asPath);

    // Track future route changes
    router.events.on('routeChangeComplete', trackPageViewed);

    // Stop tracking route changes on unmount
    return () => router.events.off('routeChangeComplete', trackPageViewed);
  }, []);

  return null;
}

export default withRouter(RouteTracker);
