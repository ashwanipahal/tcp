import React, { useEffect } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Drawer from '../molecules/Drawer';
import NavBar from '../organisms/NavBar';
import Footer from '../../Footer';
import style from '../Navigation.style';
import { filterParams, clearAll } from '../../../../../constants/constants';

const {
  FILTER_CATAGORY,
  FILTER_COLOR,
  FILTER_SIZE,
  FILTER_PRICE_RANGE,
  FILTER_FIT,
  FILTER_GENDER,
  FILTER_AGE,
} = filterParams;

const { CLEAR_ALL_SEARCH_FILTER, CLEAR_ALL_PLP_FILTER } = clearAll;
/**
 * This function closes Navigation Drawer on route change
 * @param {function} closeNavigationDrawer
 * @param {bool} isDrawerOpen
 */
const handleRouteChange = (closeNavigationDrawer, isDrawerOpen) => () => {
  if (isDrawerOpen) {
    closeNavigationDrawer();
  }
};

/**
 * This function scrolls page to top on route change complete
 */
// eslint-disable-next-line complexity
const handleRouteComplete = url => {
  const clearAllFilter =
    localStorage.getItem(CLEAR_ALL_SEARCH_FILTER) || localStorage.getItem(CLEAR_ALL_PLP_FILTER);
  const params = new URL(document.location).searchParams;
  const sortParam = params.has('sort');

  const filterParam =
    params.has(FILTER_CATAGORY) ||
    params.has(FILTER_COLOR) ||
    params.has(FILTER_SIZE) ||
    params.has(FILTER_PRICE_RANGE) ||
    params.has(FILTER_FIT) ||
    params.has(FILTER_GENDER) ||
    params.has(FILTER_AGE);

  /**
   * check if sort or filter param present in PLP page
   */
  const checkListingPageParam = url.match(/\/c\//g) && (sortParam || filterParam || clearAllFilter);

  /**
   * check if sort or filter param present in Search page
   */
  const checkSearchPageParam =
    url.match(/\/search\//g) && (sortParam || filterParam || clearAllFilter);

  if (!checkListingPageParam && !checkSearchPageParam) {
    window.scrollTo(0, 0);
  } else {
    localStorage.removeItem(CLEAR_ALL_SEARCH_FILTER);
    localStorage.removeItem(CLEAR_ALL_PLP_FILTER);
  }
};

/**
 * This function handler router change and complete events
 * @param {function} closeNavigationDrawer
 * @param {bool} isDrawerOpen
 */
const registerRouterChangeEvent = (closeNavigationDrawer, isDrawerOpen) => () => {
  Router.events.on('routeChangeStart', handleRouteChange(closeNavigationDrawer, isDrawerOpen));
  Router.events.on('routeChangeComplete', handleRouteComplete);

  return () => {
    Router.events.off('routeChangeStart', handleRouteChange(closeNavigationDrawer, isDrawerOpen));
    Router.events.off('routeChangeComplete', handleRouteComplete);
  };
};

const registerExtoleScript = () => {
  if (window.extole) {
    // Data hard coded with reference to extole 3rd party script
    window.extole.createZone({
      name: 'global_footer',
      element_id: 'extole_zone_global_navigation_footer',
      data: {
        email: 'abc@abc.com',
        first_name: 'test',
        last_name: 'abc',
        partner_user_id: '123',
        labels: 'us, en',
      },
    });
  }
  return () => {};
};

const Navigation = props => {
  const {
    openNavigationDrawer,
    className,
    userName,
    userPoints,
    userRewards,
    userNameClick,
    onLinkClick,
    triggerLoginCreateAccount,
    closeNavigationDrawer,
    hideNavigationFooter,
    showCondensedHeader,
    openOverlay,
    isDrawerOpen,
  } = props;

  useEffect(() => {
    registerRouterChangeEvent(closeNavigationDrawer, isDrawerOpen);
  }, [closeNavigationDrawer, isDrawerOpen]);
  useEffect(registerExtoleScript, [isDrawerOpen]);
  return (
    <Drawer
      id="l1_drawer"
      small
      medium
      userName={userName}
      userPoints={userPoints}
      userRewards={userRewards}
      userNameClick={userNameClick}
      onLinkClick={onLinkClick}
      triggerLoginCreateAccount={triggerLoginCreateAccount}
      open={openNavigationDrawer}
      close={closeNavigationDrawer}
      openOverlay={openOverlay}
      width={{
        small: '314px',
        medium: '314px',
        large: '100%',
      }}
      position={{
        top: !showCondensedHeader ? '155px' : '316px',
        left: 0,
        topMedium: '111px',
      }}
      renderOverlay
      drawerFooter={Footer}
      hideNavigationFooter={hideNavigationFooter}
      showCondensedHeader={showCondensedHeader}
    >
      <nav className={`${className} navigation nav-bar`}>
        <NavBar {...props} />
      </nav>
    </Drawer>
  );
};

Navigation.propTypes = {
  openNavigationDrawer: PropTypes.bool.isRequired,
  closeNavigationDrawer: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  hideNavigationFooter: PropTypes.bool.isRequired,
  showCondensedHeader: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userPoints: PropTypes.string.isRequired,
  userRewards: PropTypes.string.isRequired,
  userNameClick: PropTypes.bool.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  triggerLoginCreateAccount: PropTypes.bool.isRequired,
  openOverlay: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
};

export { Navigation as NavigationVanilla };
export default withStyles(Navigation, style);
