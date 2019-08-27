import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Image, Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import MiniBagContainer from '@tcp/web/src/components/features/CnC/MiniBag/container/MiniBag.container';
import { getCartItemCount } from '@tcp/core/src/utils/cookie.util';
import { getBrand, getIconPath, routerPush } from '@tcp/core/src/utils';
import Navigation from '../../../Navigation';
import BrandLogo from '../../../../../common/atoms/BrandLogo';
import config from '../../config';
import style from './HeaderMiddleNav.style';

/**
 * This function handles opening and closing for Navigation drawer on mobile and tablet viewport
 * @param {Function} openNavigationDrawer Function to dispatch open drawer action to store
 * @param {Function} closeNavigationDrawer  Function to dispatch close drawer action to store
 * @param {Boolean} isOpen Flag to determine if drawer is open
 */
const handleNavigationDrawer = (openNavigationDrawer, closeNavigationDrawer, isOpen) => () => {
  return isOpen ? closeNavigationDrawer('l1_drawer') : openNavigationDrawer('l1_drawer');
};

class HeaderMiddleNav extends React.PureComponent<Props> {
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
    const { isLoggedIn: prevLoggedInState } = prevState;
    const { isLoggedIn: nextLoggedInState } = nextProps;
    if (prevLoggedInState !== nextLoggedInState) {
      return { cartItemCount: getCartItemCount() };
    }
    return null;
  }

  onLinkClick = ({ e, openOverlay, userNameClick, triggerLoginCreateAccount }) => {
    e.preventDefault();
    if (userNameClick || triggerLoginCreateAccount) {
      openOverlay({
        component: e.target.id,
        variation: 'primary',
      });
    }
    this.setState({
      userNameClick: triggerLoginCreateAccount && userNameClick ? userNameClick : !userNameClick,
    });
  };

  toggleMiniBagModal = ({ e, isOpen }) => {
    e.preventDefault();
    if (window.innerWidth <= 1024) {
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

  render() {
    const {
      className,
      openNavigationDrawer,
      closeNavigationDrawer,
      navigationDrawer,
      openOverlay,
      userName,
    } = this.props;
    const brand = getBrand();
    const {
      isOpenMiniBagModal,
      userNameClick,
      triggerLoginCreateAccount,
      cartItemCount,
    } = this.state;

    return (
      <React.Fragment>
        <Row className={`${className} header-middle-nav`}>
          <Col
            colSize={{
              large: 4,
              medium: 8,
              small: 6,
            }}
          />
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
              className="hamburger-menu"
              onClick={handleNavigationDrawer(
                openNavigationDrawer,
                closeNavigationDrawer,
                navigationDrawer.open
              )}
              data-locator={navigationDrawer.open ? 'L1_menu_close_Btn' : 'menu_bar_icon'}
            />
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
            className="textRight"
          >
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
              <React.Fragment>
                <Anchor
                  href="#"
                  noLink
                  id="createAccount"
                  className="leftLink"
                  onClick={e => this.onLinkClick({ e, openOverlay, triggerLoginCreateAccount })}
                  fontSizeVariation="large"
                  anchorVariation="primary"
                >
                  Create Account
                </Anchor>
                <Anchor
                  href="#"
                  noLink
                  id="login"
                  className="rightLink"
                  onClick={e => this.onLinkClick({ e, openOverlay, triggerLoginCreateAccount })}
                  fontSizeVariation="large"
                  anchorVariation="primary"
                >
                  Login
                </Anchor>
              </React.Fragment>
            )}
            <Anchor
              to=""
              id="cartIcon"
              className="rightLink"
              onClick={e => this.toggleMiniBagModal({ e, isOpen: true })}
              fontSizeVariation="small"
              anchorVariation="primary"
              noLink
            >
              <Image
                alt="Product"
                className="product-image"
                src={getIconPath('cart-icon')}
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
        <Row
          fullBleed={{
            small: true,
            medium: true,
            large: true,
          }}
        >
          <Col
            className="header-middle-nav-bar"
            colSize={{
              large: 12,
              medium: 8,
              small: 6,
            }}
          >
            <Navigation
              openNavigationDrawer={navigationDrawer.open}
              closeNavigationDrawer={!navigationDrawer.open}
            />
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

HeaderMiddleNav.propTypes = {
  className: PropTypes.string.isRequired,
  navigationDrawer: PropTypes.shape({}),
  openNavigationDrawer: PropTypes.func.isRequired,
  closeNavigationDrawer: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  cartItemCount: PropTypes.func.isRequired,
};

HeaderMiddleNav.defaultProps = {
  navigationDrawer: {
    open: false,
  },
};

export { HeaderMiddleNav as HeaderMiddleNavVanilla };
export default withStyles(HeaderMiddleNav, style);
