import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Image, Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import LogOutPageContainer from '@tcp/core/src/components/features/account/Logout/container/LogOut.container';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { identifyBrand } from '@tcp/core/src/utils';
import Navigation from '../../../Navigation';
import BrandLogo from '../../../../../common/atoms/BrandLogo';
import config from '../../config';
import style from './HeaderMiddleNav.style';

const brand = identifyBrand();

/**
 * This function handles opening and closing for Navigation drawer on mobile and tablet viewport
 * @param {Function} openNavigationDrawer Function to dispatch open drawer action to store
 * @param {Function} closeNavigationDrawer  Function to dispatch close drawer action to store
 * @param {Boolean} isOpen Flag to determine if drawer is open
 */
const handleNavigationDrawer = (openNavigationDrawer, closeNavigationDrawer, isOpen) => () => {
  return isOpen ? closeNavigationDrawer('l1_drawer') : openNavigationDrawer('l1_drawer');
};

const onLinkClick = ({ e, openOverlay }) => {
  e.preventDefault();
  openOverlay({
    component: e.target.id,
    variation: 'primary',
  });
};

const HeaderMiddleNav = props => {
  const {
    className,
    openNavigationDrawer,
    closeNavigationDrawer,
    navigationDrawer,
    openOverlay,
    userName,
  } = props;

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
                onClick={e => onLinkClick({ e, openOverlay })}
              >
                {`Hi, ${userName}`}
              </BodyCopy>
              <LogOutPageContainer />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Anchor
                href="#"
                id="createAccount"
                className="leftLink"
                onClick={e => onLinkClick({ e, openOverlay })}
                fontSizeVariation="large"
                anchorVariation="primary"
              >
                Create Account
              </Anchor>
              <Anchor
                href="#"
                id="login"
                className="rightLink"
                onClick={e => onLinkClick({ e, openOverlay })}
                fontSizeVariation="large"
                anchorVariation="primary"
              >
                Login
              </Anchor>
            </React.Fragment>
          )}
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
    </React.Fragment>
  );
};

HeaderMiddleNav.propTypes = {
  className: PropTypes.string.isRequired,
  navigationDrawer: PropTypes.shape({}),
  openNavigationDrawer: PropTypes.func.isRequired,
  closeNavigationDrawer: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
};

HeaderMiddleNav.defaultProps = {
  navigationDrawer: {
    open: false,
  },
};

export { HeaderMiddleNav as HeaderMiddleNavVanilla };
export default withStyles(HeaderMiddleNav, style);
