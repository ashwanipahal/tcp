import React from 'react';
import { PropTypes } from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BrandTabs from '@tcp/web/src/components/common/molecules/BrandTabs';
import utilMethods from '@tcp/web/src/utils/utilMethods';
import headerStyles from '../Header.style';
import HomeLogo from './HomeLogo';

const { HeaderTopnav, HeaderBrand, HeaderNav, DummyNav, HeaderPromo, HeaderLoyalty } = headerStyles;

const Header = ({ className, headerData }) => (
  <header className={className}>
    <HeaderTopnav className="header-topnav">
      <Row>
        <Col
          className="header-topnav__brand-tabs"
          colSize={{
            large: 3,
            medium: 3,
            small: 4,
          }}
        >
          <BrandTabs data={headerData.header_top_nav.brand_tabs} />
        </Col>
        <Col
          className="header-topnav__promo-area"
          colSize={{
            large: 6,
            medium: 2,
            small: 0,
          }}
        >
          Promo area
        </Col>
        <Col
          className="header-topnav__track-order"
          colSize={{
            large: 3,
            medium: 2,
            small: 2,
          }}
        >
          Track order
        </Col>
      </Row>
    </HeaderTopnav>
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
          {utilMethods.isTCPApp() ? (
            <HomeLogo
              className="tcp-brand-logo"
              dataLocator="global_TCPlink"
              imgSrc="/static/images/tcp-logo.svg"
              href="/"
              alt="The Children's Place"
              title="The Children's Place"
              width="172px"
            />
          ) : (
            <HomeLogo
              className="gymboree-brand-logo"
              dataLocator="global_Gymboreelink"
              imgSrc="/static/images/gymboree-logo.svg"
              href="/"
              alt="Gymboree"
              title="Gymboree"
              width="172px"
            />
          )}
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
