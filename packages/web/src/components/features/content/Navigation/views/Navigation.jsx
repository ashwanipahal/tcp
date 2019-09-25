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
 * @param {*} closeNavigationDrawer
 */
const handleRouteChange = closeNavigationDrawer => () => {
  closeNavigationDrawer();
};

/**
 * This function scrolls page to top on route change complete
 */
const handleRouteComplete = () => {
  window.scrollTo(0, 0);
};

/**
 * This function handler router change and complete events
 * @param {*} closeNavigationDrawer
 */
const registerRouterChangeEvent = closeNavigationDrawer => () => {
  Router.events.on('routeChangeStart', handleRouteChange(closeNavigationDrawer));
  Router.events.on('routeChangeComplete', handleRouteComplete);

  return () => {
    Router.events.off('routeChangeStart', handleRouteChange(closeNavigationDrawer));
    Router.events.off('routeChangeComplete', handleRouteComplete);
  };
};

const Navigation = props => {
  const {
    openNavigationDrawer,
    className,
    closeNavigationDrawer,
    hideNavigationFooter,
    showCondensedHeader,
  } = props;

  useEffect(registerRouterChangeEvent(closeNavigationDrawer));

  return (
    <Drawer
      id="l1_drawer"
      small
      medium
      open={openNavigationDrawer}
      close={closeNavigationDrawer}
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
};

export { Navigation as NavigationVanilla };
export default withStyles(Navigation, style);
