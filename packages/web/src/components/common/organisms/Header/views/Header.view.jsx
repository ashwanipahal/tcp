import React from 'react';
import { PropTypes } from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import utilMethods from '@tcp/core/src/utils/utilMethods';
import HeaderTopNav from '@tcp/web/src/components/common/molecules/HeaderTopNav';
import config from '../config';
import headerStyles from '../Header.style';
import HomeLogo from './HomeLogo';

const { HeaderBrand, HeaderNav, DummyNav, HeaderPromo, HeaderLoyalty } = headerStyles;
const brand = utilMethods.brand();

const Header = ({ className, headerData }) => (
  <header className={className}>
    <HeaderTopNav className="header-topnav" dataTopNav={headerData.header_top_nav} />
    <HeaderBrand className="header-brand">
      <Row>
        <Col
          className="header-brand__home-logo"
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
        >
          <HomeLogo
            alt={config[brand].alt}
            className="header-brand__home-logo--brand"
            dataLocator={config[brand].dataLocator}
            imgSrc={config[brand].imgSrc}
          />
        </Col>
      </Row>
    </HeaderBrand>
    <HeaderNav className="header-nav">
      <Row>
        <Col
          className="header-nav__nav-row"
          colSize={{
            large: 12,
            medium: 0,
            small: 0,
          }}
        >
          <DummyNav className="dummy-nav">
            <div>Girl</div>
            <div>Toddler Girl</div>
            <div>Boy</div>
            <div>Toddler Boy</div>
            <div>Baby</div>
            <div>Shoes</div>
            <div>Accessories</div>
            <div>Trending</div>
            <div>Gift Cards</div>
            <div>Clearance</div>
          </DummyNav>
        </Col>
      </Row>
    </HeaderNav>
    <HeaderPromo className="header-promo">
      <Row>
        <Col
          className="header-promo__promo-banner"
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
        >
          Promo banners
        </Col>
      </Row>
    </HeaderPromo>
    <HeaderLoyalty className="header-loyalty">
      <Row>
        <Col
          className="header-loyalty__promo-loyalty"
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
        >
          Loyalty Promo banners
        </Col>
      </Row>
    </HeaderLoyalty>
  </header>
);

Header.propTypes = {
  className: PropTypes.string.isRequired,
  headerData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
};

export default Header;
