import React from 'react';
import { PropTypes } from 'prop-types';
import { Col, Row } from '@tcp/core/src/components/common/atoms';
import { identifyBrand } from '@tcp/core/src/utils';

import { HeaderTopNav } from '../../../molecules';
import HeaderPromo from '../../../molecules/HeaderPromo';
import config from '../config';
import headerStyles from '../Header.style';
import HomeLogo from './HomeLogo';

const { HeaderBrand, HeaderNav, DummyNav, HeaderLoyalty } = headerStyles;
const brand = identifyBrand();

const Header = ({ brandTabs, promoMessageWrapper, headerPromoArea }) => {
  return (
    <header>
      <HeaderTopNav
        className="header-topnav"
        brandTabs={brandTabs}
        promoMessageWrapper={promoMessageWrapper}
      />
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
      <HeaderPromo
        mobileMarkup
        className="header__promo-area--mobile"
        dataPromo={headerPromoArea}
      />
      <HeaderPromo className="header__promo-area--desktop" dataPromo={headerPromoArea} />
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
};

Header.propTypes = {
  brandTabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  promoMessageWrapper: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  headerPromoArea: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Header;
