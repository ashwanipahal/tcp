/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Row, Image, Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import { getCartItemCount } from '@tcp/core/src/utils/cookie.util';
import { getBrand, getIconPath, isGymboree, routerPush } from '@tcp/core/src/utils';
import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';
import SearchBar from '@tcp/core/src/components/common/molecules/SearchBar/index';
import BrandLogo from '../../../../../common/atoms/BrandLogo';
import style from './CondensedHeader.style';
import config from '../../config';
import { keyboard } from '../../../../../../constants/constants';
import { customHeaderStyle } from '../HeaderMiddleNav/HeaderMiddleNav.style';

const handleNavigationDrawer = (openNavigationDrawer, closeNavigationDrawer, isOpen) => () => {
  return isOpen ? closeNavigationDrawer('l1_drawer') : openNavigationDrawer('l1_drawer');
};

class CondensedHeader extends React.PureComponent {
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
      fromCondensedHeader: true,
    };
    this.setSearchState = this.setSearchState.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isLoggedIn: prevLoggedInState, cartItemCount } = prevState;
    const { isLoggedIn: nextLoggedInState, totalItems } = nextProps;
    if (prevLoggedInState !== nextLoggedInState || totalItems !== cartItemCount) {
      return { cartItemCount: getCartItemCount() };
    }
    return null;
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

  toggleMiniBagModal = ({ e, isOpen, isRouting }) => {
    if (e) e.preventDefault();
    if (window.innerWidth <= breakpoints.values.lg && !isRouting) {
      routerPush('/bag', '/bag');
    } else {
      const { openMiniBagDispatch } = this.props;
      openMiniBagDispatch();
      if (!isOpen) {
        this.setState({
          cartItemCount: getCartItemCount(),
        });
      }
    }
  };

  getComponentId = value => {
    return value === 'condensedLogin' ? 'login' : 'accountDrawer';
  };

  onLinkClick = ({ e, openOverlay, userNameClick, triggerLoginCreateAccount }) => {
    e.preventDefault();
    if (userNameClick || triggerLoginCreateAccount) {
      openOverlay({
        component: this.getComponentId(e.target.id),
        variation: 'primary',
      });
    }
    this.setState({
      userNameClick: triggerLoginCreateAccount && userNameClick ? userNameClick : !userNameClick,
    });
  };

  handleKeyDown = (event, openNavigationDrawer, closeNavigationDrawer, isNavigationDrawerOpen) => {
    const { KEY_ENTER, KEY_SPACE } = keyboard;
    const { which } = event;
    if (which === KEY_ENTER || which === KEY_SPACE) {
      handleNavigationDrawer(openNavigationDrawer, closeNavigationDrawer, isNavigationDrawerOpen)();
    }
  };

  render() {
    const {
      className,
      openNavigationDrawer,
      closeNavigationDrawer,
      navigationDrawer,
      openOverlay,
      userName,
      labels,
    } = this.props;
    const brand = getBrand();
    const {
      isSearchOpen,
      userNameClick,
      triggerLoginCreateAccount,
      cartItemCount,
      fromCondensedHeader,
      isFullSizeSearchModalOpen,
    } = this.state;
    const {
      accessibility: { accountIconButton, cartIconButton, closeIconButton, hamburgerMenu } = {},
    } = labels;
    return (
      <React.Fragment>
        <Row id="condensedHeader" className={`${className} condensed-header`}>
          <div className="content-wrapper">
            <div className="condensed-hamburger-menu">
              <Image
                src={
                  navigationDrawer.open
                    ? '/static/images/mobile-close-dark.svg'
                    : '/static/images/grey-menu.svg'
                }
                alt={hamburgerMenu}
                tabIndex="0"
                role="button"
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
            </div>
            <BrandLogo
              alt={config[brand].alt}
              className="condensed-brand-logo"
              dataLocator={config[brand].dataLocator}
              imgSrc={config[brand].imgSrc}
            />
            <div className="condensed-header-icons">
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
                    fromCondensedHeader={fromCondensedHeader}
                  />
                </Modal>
              ) : (
                <SearchBar
                  className={!isSearchOpen && 'rightLink search-icon'}
                  setSearchState={this.setSearchState}
                  isSearchOpen={isSearchOpen}
                  fromCondensedHeader={fromCondensedHeader}
                  onCloseClick={this.onCloseClick}
                  isFullSizeSearchModalOpen={isFullSizeSearchModalOpen}
                />
              )}

              {userName ? (
                <React.Fragment>
                  <BodyCopy
                    id="accountDrawer"
                    textAlign="right"
                    className="username"
                    onClick={e => this.onLinkClick({ e, openOverlay, userNameClick })}
                  >
                    <Image
                      alt={accountIconButton}
                      className="rightLink userIcon"
                      src={getIconPath('user-icon-blue')}
                      data-locator="user-icon"
                    />
                  </BodyCopy>
                </React.Fragment>
              ) : (
                <Anchor
                  href="#"
                  noLink
                  className="user-icon-link"
                  onClick={e => this.onLinkClick({ e, openOverlay, triggerLoginCreateAccount })}
                  fontSizeVariation="large"
                  anchorVariation="primary"
                >
                  <Image
                    alt={accountIconButton}
                    className="rightLink userIcon"
                    id="condensedLogin"
                    src={getIconPath(isGymboree() ? 'user-icon-gray' : 'user-icon-blue')}
                    data-locator="user-icon"
                  />
                </Anchor>
              )}
              <Anchor
                to="#"
                id="cartIcon"
                aria-label={`${cartIconButton} ${cartItemCount} item`}
                className="rightLink"
                onClick={e => this.toggleMiniBagModal({ e, isOpen: true })}
                fontSizeVariation="small"
                anchorVariation="primary"
                noLink
              >
                <Image
                  alt={cartIconButton}
                  className="product-image"
                  src={getIconPath(isGymboree() ? 'cart-icon-1' : 'cart-icon-blue')}
                  data-locator="addedtobag-bag-icon"
                />
                <BodyCopy
                  className="cartCount"
                  component="span"
                  fontWeight="semibold"
                  fontSize="fs10"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  {cartItemCount || 0}
                </BodyCopy>
              </Anchor>
            </div>
          </div>
        </Row>
        <Row className={`${className} condensed-border`} />
      </React.Fragment>
    );
  }
}

CondensedHeader.propTypes = {
  className: PropTypes.string.isRequired,
  navigationDrawer: PropTypes.shape({
    open: PropTypes.bool.isRequired,
  }),
  openNavigationDrawer: PropTypes.func.isRequired,
  openMiniBagDispatch: PropTypes.func.isRequired,
  closeNavigationDrawer: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  cartItemCount: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    userNameClick: PropTypes.string.isRequired,
    triggerLoginCreateAccount: PropTypes.string.isRequired,
    cartItemCount: PropTypes.string.isRequired,
  }).isRequired,
};

CondensedHeader.defaultProps = {
  navigationDrawer: {
    open: false,
  },
};

export { CondensedHeader as CondensedHeaderVanilla };
export default withStyles(CondensedHeader, style);
