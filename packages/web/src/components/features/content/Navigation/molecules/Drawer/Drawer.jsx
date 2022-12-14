import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';
import {
  showOverlay,
  closeOverlay,
  enableBodyScroll,
  disableBodyScroll,
  removeBodyScrollLocks,
  isAndroidWeb,
} from '@tcp/core/src/utils';
import { Row } from '@tcp/core/src/components/common/atoms';
import AccountInfoSection from '../../../Header/molecules/AccountInfoSection/AccountInfoSection';
import style from './Drawer.style';

/**
 * Determines if Drawer is not required on all view ports
 * @param {Bool} small
 * @param {Bool} medium
 * @param {Bool} large
 */
const isDrawerNotRequiredOnAllViewports = (small, medium, large) => {
  return !(small && medium && large);
};

const hideOnViewport = viewport => {
  return `${!viewport.small ? 'display-small-none' : ''} ${
    !viewport.medium ? 'display-medium-none' : ''
  } ${!viewport.large ? 'display-large-none' : ''}`;
};

const showOnViewport = viewport => {
  return `${viewport.small ? 'display-small-none' : ''} ${
    viewport.medium ? 'display-medium-none' : ''
  } ${viewport.large ? 'display-large-none' : ''}`;
};

const renderDrawerFooter = (hideNavigationFooter, drawerFooter) => {
  const Footer = drawerFooter;
  let classToHide = '';
  if (hideNavigationFooter) {
    classToHide = 'is-hidden';
  }
  return (
    drawerFooter && <Footer className={`navigation-footer ${classToHide}`} isNavigationFooter />
  );
};

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.getDrawerStyle = this.getDrawerStyle.bind(this);
    this.closeNavOnOverlayClick = this.closeNavOnOverlayClick.bind(this);
  }

  componentDidMount() {
    if (this.drawerRef && isAndroidWeb()) {
      this.drawerRef.addEventListener('touchstart', this.handleInputBlur);
    }
  }

  componentDidUpdate() {
    this.init();
  }

  componentWillUnmount() {
    if (this.drawerRef && isAndroidWeb()) {
      this.drawerRef.removeEventListener('touchstart', this.handleInputBlur);
    }
    enableBodyScroll(this.scrollTargetElement);
  }

  /**
   * To hide the keyboard in case user scrolls through navigation menu.
   */
  handleInputBlur = () => {
    if (document.activeElement.nodeName === 'INPUT') {
      document.activeElement.blur();
    }
  };

  init = () => {
    const { open, renderOverlay } = this.props;
    if (!open) {
      removeBodyScrollLocks();
    }
    if (renderOverlay) {
      this.getDrawerStyle();
    }
    if (open) {
      document.body.addEventListener('click', this.closeNavOnOverlayClick);
    } else {
      document.body.removeEventListener('click', this.closeNavOnOverlayClick);
    }
    return null;
  };

  /* Set drawer ref */
  setDrawerRef = node => {
    this.drawerRef = node;
  };

  /* Method to close nav bar on click of dark overlay */
  closeNavOnOverlayClick = e => {
    const { close, open } = this.props;
    if (
      open &&
      this.drawerRef &&
      (!this.drawerRef.contains(e.target) ||
        (e.target.closest('.footer-middle') &&
          !e.target.classList.contains('navigation-footer'))) &&
      typeof close === 'function'
    ) {
      close();
      enableBodyScroll(this.scrollTargetElement);
      e.stopPropagation();
    }
  };

  handleUserName = userName => {
    return userName.length <= 15 ? userName : userName.substring(0, 15).concat('...');
  };

  handleUserRewards = userRewards => {
    return userRewards % 1 ? userRewards : Math.floor(userRewards);
  };

  disableScroll = drawer => {
    const { open } = this.props;
    this.scrollTargetElement = drawer;
    if (open && this.scrollTargetElement) {
      disableBodyScroll(this.scrollTargetElement);
    }
  };

  renderAccountInfoSectionInDrawer = () => {
    const {
      id,
      close,
      userName,
      userPoints,
      userRewards,
      userNameClick,
      onLinkClick,
      triggerLoginCreateAccount,
      openOverlay,
    } = this.props;
    return id === 'l1_drawer' ? (
      <Row>
        <AccountInfoSection
          userName={userName}
          userPoints={userPoints}
          userRewards={userRewards}
          openOverlay={openOverlay}
          userNameClick={userNameClick}
          onLinkClick={onLinkClick}
          closeDrawer={close}
          triggerLoginCreateAccount={triggerLoginCreateAccount}
        />
      </Row>
    ) : null;
  };

  /* Style for drawer to make it scrollable within */
  getDrawerStyle = () => {
    if (window) {
      const drawer = document.getElementById('tcp-nav-drawer');
      const headerTopNav = document.getElementsByClassName('header-topnav')[0];
      const middleNav = document.getElementsByClassName('header-middle-nav')[0];
      const condensedHeader = document.getElementById('condensedHeader');
      const userInfo = document.getElementById('sideNavUserInfo');
      const darkOverlay = document.getElementsByClassName('dark-overlay')[0];
      const userInfoHeight = userInfo ? userInfo.getBoundingClientRect().height : null;
      const wHeight = window.innerHeight;
      const {
        values: { lg },
      } = breakpoints;

      if (window.innerWidth < lg && drawer) {
        const headerTopNavComp = headerTopNav.getBoundingClientRect();
        const headerMiddleNavComp = middleNav.getBoundingClientRect();
        let headerHeight = headerTopNavComp.height + headerMiddleNavComp.height;

        if (headerTopNav && headerTopNavComp.top < 0) {
          headerHeight -= Math.abs(headerTopNavComp.top);
        }

        if (condensedHeader) {
          headerHeight = condensedHeader.getBoundingClientRect().height;
        }
        userInfo.style.top = `${headerHeight}px`;
        drawer.style.height = `${wHeight - (headerHeight + userInfoHeight)}px`;
        drawer.style.position = 'fixed';
        drawer.style.overflowY = 'scroll';
        drawer.style.top = `${headerHeight + userInfoHeight}px`;
        darkOverlay.style.top = `${headerHeight}px`;
        darkOverlay.style.position = 'fixed';

        this.disableScroll(drawer);
      }
    }
  };

  render() {
    const {
      children,
      className,
      small,
      medium,
      large,
      open,
      id,
      close,
      renderOverlay,
      drawerFooter,
      hideNavigationFooter,
      showCondensedHeader,
    } = this.props;

    let openDrawer = open;
    if (typeof open === 'string') {
      openDrawer = open === id;
    }
    if (close && renderOverlay) {
      closeOverlay();
    }
    if (openDrawer && renderOverlay) {
      showOverlay();
    }
    const classToOpen = openDrawer ? 'tcp-drawer__isOpen' : '';
    const condensedHeader = showCondensedHeader && 'tcp-condensed-drawer';
    const classToHideOnViewports = hideOnViewport({ small, medium, large });
    const classToShowOnViewports = showOnViewport({ small, medium, large });

    return (
      <div className={className} ref={this.setDrawerRef} id="drawer-wrapper">
        {// If Drawer is not required on all viewports then duplicate the DOM for the children without Drawer
        // User will have to handle display of this element with CSS
        isDrawerNotRequiredOnAllViewports(small, medium, large) && (
          <div className={`${classToShowOnViewports}`}>{children}</div>
        )}
        {openDrawer && (
          <React.Fragment>
            <aside
              className={`tcp-drawer ${classToOpen} ${condensedHeader} ${classToHideOnViewports}`}
            >
              {this.renderAccountInfoSectionInDrawer()}
              <div id="tcp-nav-drawer" className="tcp-drawer-content">
                {children}
                {renderDrawerFooter(hideNavigationFooter, drawerFooter)}
              </div>
            </aside>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Drawer.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string.isRequired,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  close: PropTypes.bool.isRequired,
  renderOverlay: PropTypes.bool,
  drawerFooter: PropTypes.element,
  hideNavigationFooter: PropTypes.bool,
  showCondensedHeader: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userPoints: PropTypes.string.isRequired,
  userRewards: PropTypes.string.isRequired,
  userNameClick: PropTypes.bool.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  triggerLoginCreateAccount: PropTypes.bool.isRequired,
  openOverlay: PropTypes.func.isRequired,
};

Drawer.defaultProps = {
  small: false,
  medium: false,
  large: false,
  renderOverlay: false,
  drawerFooter: '',
  hideNavigationFooter: false,
};

export { Drawer as DrawerVanilla };
export default withStyles(Drawer, style);
