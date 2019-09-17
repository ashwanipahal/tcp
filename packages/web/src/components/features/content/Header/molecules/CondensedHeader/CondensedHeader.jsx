import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Col, Row, Image, Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import MiniBagContainer from '@tcp/web/src/components/features/CnC/MiniBag/container/MiniBag.container';
import { getCartItemCount } from '@tcp/core/src/utils/cookie.util';
import { getBrand, getIconPath, routerPush } from '@tcp/core/src/utils';
import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';

import Navigation from '../../../Navigation';
import BrandLogo from '../../../../../common/atoms/BrandLogo';
import style from './CondensedHeader.style';
import config from '../../config';
import { keyboard } from '../../../../../../constants/constants';

const handleNavigationDrawer = (openNavigationDrawer, closeNavigationDrawer, isOpen) => () => {
  return isOpen ? closeNavigationDrawer('l1_drawer') : openNavigationDrawer('l1_drawer');
};

class CondensedHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    const { isLoggedIn, cartItemCount } = props;
    this.state = {
      isOpenMiniBagModal: false,
      userNameClick: true,
      triggerLoginCreateAccount: true,
      isLoggedIn: isLoggedIn || false,
      cartItemCount,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isLoggedIn: prevLoggedInState, cartItemCount } = prevState;
    const { isLoggedIn: nextLoggedInState, totalItems } = nextProps;
    if (prevLoggedInState !== nextLoggedInState || totalItems !== cartItemCount) {
      return { cartItemCount: getCartItemCount() };
    }
    return null;
  }

  toggleMiniBagModal = ({ e, isOpen, isRouting }) => {
    if (e) e.preventDefault();
    if (window.innerWidth <= breakpoints.values.lg && !isRouting) {
      routerPush('/bag', '/bag');
    } else {
      this.setState({ isOpenMiniBagModal: isOpen });
      if (!isOpen) {
        this.setState({
          cartItemCount: getCartItemCount(),
        });
      }
    }
  };

  onLinkClick = ({ e, openOverlay, userNameClick, triggerLoginCreateAccount }) => {
    e.preventDefault();
    if (userNameClick || triggerLoginCreateAccount) {
      openOverlay({
        component: 'login',
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
      showCondensedHeader,
      setSearchState,
      labels,
    } = this.props;
    const brand = getBrand();
    const {
      isOpenMiniBagModal,
      userNameClick,
      triggerLoginCreateAccount,
      cartItemCount,
    } = this.state;
    const {
      accountIconButton,
      cartIconButton,
      hamburgerMenu,
      searchIconButton,
    } = labels.accessibility;
    return (
      <React.Fragment>
        <Row className={`${className} condensed-header content-wrapper`}>
          <Col
            colSize={{
              large: 2,
              medium: 1,
              small: 1,
            }}
          >
            <BrandLogo
              alt={config[brand].alt}
              className="brand-logo-left"
              dataLocator={config[brand].dataLocator}
              imgSrc={config[brand].imgSrc}
            />
            <Image
              src={
                navigationDrawer.open
                  ? '/static/images/mobile-close-dark.svg'
                  : '/static/images/grey-menu.svg'
              }
              alt={hamburgerMenu}
              tabIndex="0"
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
          </Col>
          <Col
            className="navigation"
            colSize={{
              large: 8,
              medium: 2,
              small: 2,
            }}
            offsetLeft={{
              medium: 2,
            }}
          >
            <BrandLogo
              alt={config[brand].alt}
              className="brand-logo-middle"
              dataLocator={config[brand].dataLocator}
              imgSrc={config[brand].imgSrc}
            />
            <Navigation
              openNavigationDrawer={navigationDrawer.open}
              closeNavigationDrawer={!navigationDrawer.open}
              closeNav={closeNavigationDrawer}
            />
          </Col>
          <Col
            className="condensed-icons"
            colSize={{
              large: 2,
              medium: 2,
              small: 3,
            }}
            offsetLeft={{
              medium: 1,
            }}
          >
            <Image
              alt={searchIconButton}
              className="search-image icon`"
              onClick={setSearchState}
              src={getIconPath(`${showCondensedHeader ? 'search-icon-blue' : 'search-icon'}`)}
              data-locator="search-icon"
              height="25px"
            />

            {userName ? (
              <React.Fragment>
                <BodyCopy
                  id="accountDrawer"
                  textAlign="right"
                  className="username"
                  onClick={e => this.onLinkClick({ e, openOverlay, userNameClick })}
                >
                  {`Hi, ${userName}`}
                </BodyCopy>
              </React.Fragment>
            ) : (
              <Anchor
                href="#"
                noLink
                id="condensedLogin"
                className="leftLink"
                onClick={e => this.onLinkClick({ e, openOverlay, triggerLoginCreateAccount })}
                fontSizeVariation="large"
                anchorVariation="primary"
              >
                <Image
                  alt={accountIconButton}
                  className="rightLink"
                  src={getIconPath('user-icon-blue')}
                  data-locator="user-icon"
                />
              </Anchor>
            )}
            <Anchor
              to="#"
              id="cartIcon"
              className="rightLink"
              onClick={e => this.toggleMiniBagModal({ e, isOpen: true })}
              fontSizeVariation="small"
              anchorVariation="primary"
              noLink
            >
              <Image
                alt={cartIconButton}
                className="product-image"
                src={getIconPath('cart-icon-blue')}
                data-locator="addedtobag-bag-icon"
              />
              <BodyCopy
                className="cartCount"
                component="span"
                fontWeight="semibold"
                fontSize="fs10"
              >
                {cartItemCount || 0}
              </BodyCopy>
            </Anchor>
          </Col>
        </Row>
        <MiniBagContainer
          isOpen={isOpenMiniBagModal}
          toggleMiniBagModal={this.toggleMiniBagModal}
          userName={userName}
        />
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
  closeNavigationDrawer: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  cartItemCount: PropTypes.func.isRequired,
  showCondensedHeader: PropTypes.bool.isRequired,
  setSearchState: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    isOpenMiniBagModal: PropTypes.string.isRequired,
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
