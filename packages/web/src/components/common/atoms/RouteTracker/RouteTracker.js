import { useEffect } from 'react';
/**
 * NOTE: Using `withRouter` or `useRouter` did not work
 * for this component because the `components` property
 * was not getting set as expected.
 */
import Router from 'next/router';

// TODO: Remove connect once react-redux@7 is in use
import { connect } from 'react-redux';
import { readCookie, setCookie } from '@tcp/core/src/utils/cookie.util';
import { API_CONFIG } from '@tcp/core/src/services/config';

function setPageCountCookie() {
  const { pageCountCookieKey } = API_CONFIG;
  const pageCount = parseInt(readCookie(pageCountCookieKey) || '0', 10) + 1;
  setCookie({
    key: pageCountCookieKey,
    value: pageCount,
  });
}

function setLandingSiteCookie(brandId) {
  const { landingSite, pageCountCookieKey } = API_CONFIG;
  const siteId = readCookie(landingSite) || '';
  if (readCookie(pageCountCookieKey) === '1' && !siteId) {
    setCookie({
      key: landingSite,
      value: brandId,
    });
  }
}

/**
 * A component that sets up cookie for number of
 * page visits and also sets the brand cookie
 * if already not present. It is for the initial
 * landing site only
 */
function RouteTracker(props) {
  const { brandId } = props;

  const handleChange = () => {
    setPageCountCookie();
    setLandingSiteCookie(brandId);
  };

  useEffect(() => {
    // Track current route on mount
    handleChange();

    // Track future route changes
    Router.events.on('routeChangeComplete', handleChange);

    // Stop tracking route changes on unmount
    return () => Router.events.off('routeChangeComplete', handleChange);
  }, [brandId]);

  return null;
}

export default connect()(RouteTracker);
