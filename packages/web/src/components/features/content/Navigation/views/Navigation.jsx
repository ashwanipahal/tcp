import React, { useEffect } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Drawer from '../molecules/Drawer';
import NavBar from '../organisms/NavBar';
import Footer from '../../Footer';
import style from '../Navigation.style';

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
const handleRouteComplete = url => {
  const params = new URL(document.location).searchParams;
  const sortParam = params.has('sort');
  const filterParam = params.has('categoryPath2_uFilter');

  /**
   * check if sort or filter param present in PLP page
   */
  const checkListingPageParam = url.match(/\/c\//g) && (sortParam || filterParam);

  /**
   * check if sort or filter param present in Search page
   */
  const checkSearchPageParam = url.match(/\/search\//g) && (sortParam || filterParam);

  if (!checkListingPageParam && !checkSearchPageParam) {
    window.scrollTo(0, 0);
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

const Navigation = props => {
  const {
    openNavigationDrawer,
    className,
    userName,
    userPoints,
    userRewards,
    closeNavigationDrawer,
    hideNavigationFooter,
    showCondensedHeader,
    openOverlay,
    isDrawerOpen,
  } = props;

  useEffect(registerRouterChangeEvent(closeNavigationDrawer, isDrawerOpen));

  return (
    <Drawer
      id="l1_drawer"
      small
      medium
      userName={userName}
      userPoints={userPoints}
      userRewards={userRewards}
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
  openOverlay: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
};

export { Navigation as NavigationVanilla };
export default withStyles(Navigation, style);
