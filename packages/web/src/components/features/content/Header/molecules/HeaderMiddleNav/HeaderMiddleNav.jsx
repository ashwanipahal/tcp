import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Drawer, Image } from '@tcp/core/src/components/common/atoms';
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

const HeaderMiddleNav = props => {
  const { className, openNavigationDrawer, closeNavigationDrawer, navigationDrawer } = props;

  return (
    <React.Fragment>
      <Row className={`${className} header-middle-nav`}>
        <Col
          className="header-middle-nav-search"
          colSize={{
            large: 12,
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
      </Row>
      <Row
        fullBleed={{
          small: true,
          medium: true,
        }}
      >
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
        >
          <Drawer
            mobile
            tablet
            open={navigationDrawer.open}
            width={{
              small: '314px',
              medium: '314px',
              large: '100%',
            }}
          >
            <Navigation nav={navMock.data.navigation} />
          </Drawer>
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
};

HeaderMiddleNav.defaultProps = {
  navigationDrawer: {
    open: false,
  },
};

export default withStyles(HeaderMiddleNav, style);
