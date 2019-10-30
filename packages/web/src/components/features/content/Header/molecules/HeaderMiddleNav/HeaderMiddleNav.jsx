/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Image, Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import MiniBagContainer from '@tcp/web/src/components/features/CnC/MiniBag/container/MiniBag.container';
import { getCartItemCount } from '@tcp/core/src/utils/cookie.util';
import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';
import { getBrand, getIconPath, routerPush } from '@tcp/core/src/utils';
import SearchBar from '@tcp/core/src/components/common/molecules/SearchBar/index';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import Navigation from '../../../Navigation';
import BrandLogo from '../../../../../common/atoms/BrandLogo';
import config from '../../config';
import { keyboard } from '../../../../../../constants/constants';
import style, { customHeaderStyle } from './HeaderMiddleNav.style';
import StoreLocatorLink from '../StoreLocatorLink';
import LoggedInUserInfo from '../LoggedInUserInfo/view/LoggedInUserInfo';
import GuestUserInfo from '../GuestUserInfo/view/GuestUserInfo';

/**
 * This function handles opening and closing for Navigation drawer on mobile and tablet viewport
 * @param {Function} openNavigationDrawer Function to dispatch open drawer action to store
 * @param {Function} closeNavigationDrawer  Function to dispatch close drawer action to store
 * @param {Boolean} isOpen Flag to determine if drawer is open
 */
const handleNavigationDrawer = (openNavigationDrawer, closeNavigationDrawer, isOpen) => () => {
  return isOpen ? closeNavigationDrawer('l1_drawer') : openNavigationDrawer('l1_drawer');
};

class HeaderMiddleNav extends React.PureComponent {
  constructor(props) {
    super(props);
    const { isLoggedIn, cartItemCount } = props;
    this.state = {
      isSearchOpen: false,
      userNameClick: true,
      triggerLoginCreateAccount: true,
      isLoggedIn: isLoggedIn || false,
      cartItemCount,
      isFullSizeSearchModalOpen: false,
    };
    this.setSearchState = this.setSearchState.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  onCloseClick() {
    const { isFullSizeSearchModalOpen, isSearchOpen } = this.state;
    this.setState({
      isFullSizeSearchModalOpen: !isFullSizeSearchModalOpen,
      isSearchOpen: !isSearchOpen,
    });
  }

  setSearchState(currentStatus, cb = null) {
    this.setState({ isSearchOpen: currentStatus }, cb ? cb() : () => {});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isLoggedIn: prevLoggedInState, cartItemCount } = prevState;
    const { isLoggedIn: nextLoggedInState, totalItems } = nextProps;
    if (prevLoggedInState !== nextLoggedInState || totalItems !== cartItemCount) {
      return { cartItemCount: getCartItemCount() };
    }
    return null;
  }

  onLinkClick = ({ e, openOverlay, userNameClick, triggerLoginCreateAccount }, componentToOpen) => {
    e.stopPropagation();
    if (userNameClick || triggerLoginCreateAccount) {
      openOverlay({
        component: componentToOpen,
        variation: 'primary',
      });
    }
  };

  handleUserTypeColor = isUserPlcc => {
    return isUserPlcc ? 'blue.500' : 'orange.800';
  };

  renderAccountInfoSection = (userName, openOverlay, isUserPlcc, userPoints, userRewards) => {
    const { userNameClick, triggerLoginCreateAccount, isSearchOpen } = this.state;
    const { isOpenOverlay } = this.props;
    return userName && !isSearchOpen ? (
      <LoggedInUserInfo
        mainId="accountDrawer"
        userName={userName}
        userPoints={userPoints}
        userRewards={userRewards}
        userNameClick={userNameClick}
        openOverlay={openOverlay}
        isOpenOverlay={isOpenOverlay}
        onLinkClick={this.onLinkClick}
        isDrawer={false}
      />
    ) : (
      !isSearchOpen && (
        <GuestUserInfo
          createAccount="createAccount"
          login="login"
          triggerLoginCreateAccount={triggerLoginCreateAccount}
          onLinkClick={this.onLinkClick}
          openOverlay={openOverlay}
          isDrawer={false}
        />
      )
    );
  };

  handleKeyDown = (event, openNavigationDrawer, closeNavigationDrawer, isNavigationDrawerOpen) => {
    const { KEY_ENTER, KEY_SPACE } = keyboard;
    const { which } = event;
    if (which === KEY_ENTER || which === KEY_SPACE) {
      handleNavigationDrawer(openNavigationDrawer, closeNavigationDrawer, isNavigationDrawerOpen)();
    }
  };

  updateCartItemCount = () => {
    this.setState({
      cartItemCount: getCartItemCount(),
    });
  };

  openMiniBag = e => {
    if (e) e.preventDefault();
    if (window.innerWidth <= breakpoints.values.lg) {
      routerPush('/bag', '/bag');
    } else {
      const { openMiniBagDispatch } = this.props;
      openMiniBagDispatch();
    }
  };

  render() {
    const {
      className,
      openNavigationDrawer,
      closeNavigationDrawer,
      navigationDrawer,
      openOverlay,
      isUserPlcc,
      userName,
      userPoints,
      userRewards,
      store,
      labels,
    } = this.props;
    const { userNameClick, triggerLoginCreateAccount } = this.state;
    const brand = getBrand();
    const { cartItemCount, isSearchOpen, isFullSizeSearchModalOpen } = this.state;
    const {
      accessibility: { cartIconButton, closeIconButton, hamburgerMenu } = {},
      store: storeLabel = {},
    } = labels;

    return (
      <React.Fragment>
        <Row className="content-wrapper" fullBleed>
          <Row className={`${className} header-middle-nav`}>
            <Col
              colSize={{
                large: 4,
                medium: 8,
                small: 6,
              }}
              className="header-middle-nav-storelocator"
            >
              <StoreLocatorLink store={store} labels={storeLabel} />
            </Col>
            <Col
              className="header-middle-nav-search"
              colSize={{
                large: 4,
                medium: 8,
                small: 6,
              }}
            >
              <Image
                src={
                  navigationDrawer.open
                    ? '/static/images/mobile-close-dark.svg'
                    : '/static/images/menu.svg'
                }
                alt="hamburger menu"
                role="button"
                tabIndex="0"
                aria-label={navigationDrawer.open ? closeIconButton : hamburgerMenu}
                className="hamburger-menu"
                onClick={handleNavigationDrawer(
                  openNavigationDrawer,
                  closeNavigationDrawer,
                  navigationDrawer.open
                )}
                onKeyDown={e =>
                  this.handleKeyDown(
                    e,
                    openNavigationDrawer,
                    closeNavigationDrawer,
                    navigationDrawer.open
                  )
                }
                data-locator={navigationDrawer.open ? 'L1_menu_close_Btn' : 'menu_bar_icon'}
              />
              <StoreLocatorLink store={store} labels={storeLabel} />
              <BrandLogo
                alt={config[brand].alt}
                className="header-brand__home-logo--brand"
                dataLocator={config[brand].dataLocator}
                imgSrc={config[brand].imgSrc}
              />
            </Col>
            <Col
              colSize={{
                large: 4,
                medium: 8,
                small: 6,
              }}
              className={`textRight header-middle-login-section ${isSearchOpen && 'flexbox'}`}
            >
              {isFullSizeSearchModalOpen ? (
                <Modal
                  isOpen={isFullSizeSearchModalOpen}
                  onRequestClose={this.handleShowHideFullSizeModalClick}
                  overlayClassName="TCPModal__Overlay"
                  className="TCPModal__Content"
                  widthConfig={{ small: '375px', medium: '765px', large: '1023px' }}
                  heightConfig={{ height: '99%' }}
                  fixedWidth
                  inheritedStyles={customHeaderStyle}
                  headingAlign="center"
                  horizontalBar={false}
                  stickyCloseIcon
                  fullWidth
                  stickyHeader
                >
                  <SearchBar
                    className={!isSearchOpen}
                    setSearchState={this.setSearchState}
                    isSearchOpen={isSearchOpen}
                    onCloseClick={this.onCloseClick}
                    isFullSizeSearchModalOpen={isFullSizeSearchModalOpen}
                  />
                </Modal>
              ) : (
                <SearchBar
                  className={!isSearchOpen && 'leftLink'}
                  setSearchState={this.setSearchState}
                  isSearchOpen={isSearchOpen}
                  onCloseClick={this.onCloseClick}
                  isFullSizeSearchModalOpen={isFullSizeSearchModalOpen}
                />
              )}

              {this.renderAccountInfoSection(
                userName,
                openOverlay,
                isUserPlcc,
                userPoints,
                userRewards
              )}
              <Anchor
                to=""
                id="cartIcon"
                aria-label={`${cartIconButton} ${cartItemCount} item`}
                className=""
                onClick={e => this.openMiniBag(e)}
                fontSizeVariation="small"
                anchorVariation="primary"
                noLink
              >
                <Image
                  alt="Product"
                  className="product-image"
                  src={getIconPath('cart-icon-1')}
                  data-locator="addedtobag-bag-icon"
                />
                <BodyCopy
                  className="cartCount"
                  component="span"
                  fontWeight="semibold"
                  fontSize="fs10"
                  aria-hidden="true"
                  tabIndex="-1"
                >
                  {cartItemCount || 0}
                </BodyCopy>
              </Anchor>
            </Col>
          </Row>
        </Row>
        <Row
          fullBleed={{
            small: true,
            medium: true,
            large: true,
          }}
        >
          <Col
            className="header-middle-nav-bar"
            id="header-middle-nav"
            colSize={{
              large: 12,
              medium: 8,
              small: 6,
            }}
          >
            <Navigation
              openNavigationDrawer={navigationDrawer.open}
              closeNavigationDrawer={!navigationDrawer.open}
              closeNav={closeNavigationDrawer}
              userName={userName}
              userPoints={userPoints}
              userRewards={userRewards}
              userNameClick={userNameClick}
              onLinkClick={this.onLinkClick}
              triggerLoginCreateAccount={triggerLoginCreateAccount}
            />
          </Col>
        </Row>
        <MiniBagContainer userName={userName} updateCartItemCount={this.updateCartItemCount} />
      </React.Fragment>
    );
  }
}

HeaderMiddleNav.propTypes = {
  className: PropTypes.string.isRequired,
  navigationDrawer: PropTypes.shape({}),
  openNavigationDrawer: PropTypes.func.isRequired,
  closeNavigationDrawer: PropTypes.func.isRequired,
  isUserPlcc: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userPoints: PropTypes.string.isRequired,
  userRewards: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
  isOpenOverlay: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  cartItemCount: PropTypes.func.isRequired,
  openMiniBagDispatch: PropTypes.func.isRequired,
  store: PropTypes.shape({
    basicInfo: PropTypes.shape({}),
    hours: PropTypes.shape({
      regularHours: PropTypes.shape([]),
      regularAndHolidayHours: PropTypes.shape([]),
      holidayHours: PropTypes.shape([]),
    }),
    features: PropTypes.shape({}),
  }),
  labels: PropTypes.shape({}).isRequired,
};

HeaderMiddleNav.defaultProps = {
  navigationDrawer: {
    open: false,
  },
  store: {
    basicInfo: {
      id: '',
      storeName: '',
      phone: '',
      coordinates: {},
      address: {},
    },
    hours: {
      regularHours: [],
      regularAndHolidayHours: [],
      holidayHours: [],
    },
    features: {},
  },
};

export { HeaderMiddleNav as HeaderMiddleNavVanilla };

export default withStyles(HeaderMiddleNav, style);
