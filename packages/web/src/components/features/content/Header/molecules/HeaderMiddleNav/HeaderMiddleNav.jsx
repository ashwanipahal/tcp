import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Image } from '@tcp/core/src/components/common/atoms';
import navMock from '@tcp/core/src/services/abstractors/bootstrap/navigation/mock';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { identifyBrand } from '@tcp/core/src/utils';
import Navigation from '../../../Navigation';
import BrandLogo from '../../../../../common/atoms/BrandLogo';
import HeaderLoginInfo from '../HeaderLoginInfo';
import config from '../../config';
import style from './HeaderMiddleNav.style';

const brand = identifyBrand();

const handleNavigationDrawer = (openNavigationDrawer, closeNavigationDrawer, isOpen) => () => {
  document.body.style.overflow = isOpen ? 'visible' : 'hidden';
  return isOpen ? closeNavigationDrawer() : openNavigationDrawer();
};

const HeaderMiddleNav = props => {
  const { className, openNavigationDrawer, closeNavigationDrawer, navigationDrawer, userName } = props;

  return (
    <React.Fragment>
      <Row className={`${className} header-middle-nav`}>
        <Col
          className="header-middle-nav-search"
          colSize={{
            large: 4,
            medium: 4,
            small: 3,
          }}
          offsetLeft={{
            large: 4,
            medium: 2,
            small: 0
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
        <Col colSize={{
          large: 4,
          medium: 2,
          small: 3
        }}
        >
          <HeaderLoginInfo userName={userName} />
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
  userName: PropTypes.string.isRequired
};

HeaderMiddleNav.defaultProps = {
  navigationDrawer: {
    open: false,
  },
};

export { HeaderMiddleNav as HeaderMiddleNavVanilla };
export default withStyles(HeaderMiddleNav, style);
