import { useEffect } from 'react';
// TODO: Find out why useRouter causes an error.
import { withRouter } from 'next/router';
import { trackPage } from '../../../../utils/analytics';

function RouteTracker({ router }) {
  useEffect(() => {
    // Track current route on mount
    trackPage(router.asPath);

    // Track future route changes
    router.events.on('routeChangeComplete', trackPage);

    // Stop tracking route changes on unmount
    return () => router.events.off('routeChangeComplete', trackPage);
  }, []);

  return null;
}

export default withRouter(RouteTracker);
