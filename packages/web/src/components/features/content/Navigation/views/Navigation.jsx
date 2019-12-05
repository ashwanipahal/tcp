import React, { useEffect } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { plpRoutingHandling } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Drawer from '../molecules/Drawer';
import NavBar from '../organisms/NavBar';
import Footer from '../../Footer';
import style from '../Navigation.style';
import { clearAll } from '../../../../../constants/constants';

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
  // document.getElementById(`default_spinner_overlay`).classList.add(`show-default-spinner`); /* TODO - Need to reformat the code so that we can use according to requirement   */
};

/**
 * This function scrolls page to top on route change complete
 */
// eslint-disable-next-line complexity
const handleRouteComplete = url => {
  const clearAllFilter =
    localStorage.getItem(CLEAR_ALL_SEARCH_FILTER) || localStorage.getItem(CLEAR_ALL_PLP_FILTER);
  const params = queryString.parse(document.location.search);
  const sortParam = params.sort !== undefined;
  // document.getElementById(`default_spinner_overlay`).classList.add(`hide-default-spinner`); /* TODO - Need to reformat the code so that we can use according to requirement   */
  const filterParam =
    params.FILTER_CATAGORY !== undefined ||
    params.FILTER_COLOR !== undefined ||
    params.FILTER_SIZE !== undefined ||
    params.FILTER_PRICE_RANGE !== undefined ||
    params.FILTER_FIT !== undefined ||
    params.FILTER_GENDER !== undefined ||
    params.FILTER_AGE !== undefined;

  /**
   * check if sort or filter param present in PLP page
   */
  const checkListingPageParam = url.match(/\/c\//g) && (sortParam || filterParam || clearAllFilter);

  /**
   * check if sort or filter param present in Search page
   */
  const checkSearchPageParam =
    url.match(/\/search\//g) && (sortParam || filterParam || clearAllFilter);
  const gethandleRemoveFilter = localStorage.getItem('handleRemoveFilter');
  const plpPageCheck = url.match(/\/c\//g);
  const filterId = document.getElementById('filterWrapper');
  if (!checkListingPageParam && !checkSearchPageParam) {
    if (document.getElementById('filterWrapper') && gethandleRemoveFilter) {
      plpRoutingHandling(filterId);
    } else if (!plpPageCheck) window.scrollTo(0, 0);
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
    isCondensedHeader,
    accessibilityLabels,
  } = props;

  useEffect(registerRouterChangeEvent(closeNavigationDrawer, isDrawerOpen), []);
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
      <nav
        className={`${className} navigation nav-bar`}
        aria-label={isCondensedHeader && accessibilityLabels.condensed_navigation_aria_label}
      >
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
  accessibilityLabels: PropTypes.shape({}).isRequired,
  isCondensedHeader: PropTypes.bool,
};

Navigation.defaultProps = {
  isCondensedHeader: false,
};

export { Navigation as NavigationVanilla };
export default withStyles(Navigation, style);
