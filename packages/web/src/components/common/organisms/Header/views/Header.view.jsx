import React from 'react';
import { PropTypes } from 'prop-types';
import { Col, Row } from '@tcp/core/src/components/common/atoms';
import { brand } from '@tcp/core/src/utils';

import { HeaderTopNav } from '../../../molecules';
import config from '../config';
import headerStyles from '../Header.style';
import HomeLogo from './HomeLogo';

const { HeaderBrand, HeaderNav, DummyNav, HeaderPromo, HeaderLoyalty } = headerStyles;
const brandName = brand();

const Header = ({ headerTopNav }) => (
  <header>
    <HeaderTopNav className="header-topnav" dataTopNav={headerTopNav} />
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
            alt={config[brandName].alt}
            className="header-brand__home-logo--brand"
            dataLocator={config[brandName].dataLocator}
            imgSrc={config[brandName].imgSrc}
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
  headerTopNav: PropTypes.shape({}).isRequired,
};

export default Header;
