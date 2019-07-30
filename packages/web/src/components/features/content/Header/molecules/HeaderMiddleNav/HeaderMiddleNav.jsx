import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Image, Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import navMock from '@tcp/core/src/services/abstractors/bootstrap/navigation/mock';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { identifyBrand } from '@tcp/core/src/utils';
import Navigation from '../../../Navigation';
import BrandLogo from '../../../../../common/atoms/BrandLogo';
import config from '../../config';
import style from './HeaderMiddleNav.style';

const brand = identifyBrand();

const handleNavigationDrawer = (openNavigationDrawer, closeNavigationDrawer, isOpen) => () => {
  document.body.style.overflow = isOpen ? 'visible' : 'hidden';
  return isOpen ? closeNavigationDrawer() : openNavigationDrawer();
};

const onLinkClick = ({ e, openOverlay }) => {
  e.preventDefault();
  openOverlay({
    e,
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
          className="header-middle-nav-search"
          colSize={{
            large: 7,
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
            large: 5,
            medium: 8,
            small: 6,
          }}
          className="hide-on-mobile hide-on-tablet"
        >
          {userName ? (
            <BodyCopy textAlign="right">{`Hi, ${userName}`}</BodyCopy>
          ) : (
            <React.Fragment>
              <Anchor
                href="#"
                id="createAccount"
                className="leftLink"
                onClick={e => onLinkClick({ e, openOverlay })}
                fontSizeVariation="small"
                anchorVariation="primary"
              >
                Create Account
              </Anchor>
              <Anchor
                href="#"
                id="login"
                className="rightLink "
                onClick={e => onLinkClick({ e, openOverlay })}
                fontSizeVariation="small"
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
          <Navigation openNavigationDrawer={navigationDrawer.open} nav={navMock.data.navigation} />
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
