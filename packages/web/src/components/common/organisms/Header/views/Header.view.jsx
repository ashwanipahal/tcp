import React from 'react';
import { PropTypes } from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import headerStyles from '../Header.style';
import HomeLogo from './HomeLogo';

const { HeaderTopnav, HeaderBrand, HeaderNav, DummyNav, HeaderPromo, HeaderLoyalty } = headerStyles;

const Header = ({ className }) => (
  <header className={className}>
    <HeaderTopnav className="header-topnav">
      <Row>
        <Col
          className="header-topnav__brand-tabs"
          colSize={{
            large: 2,
            medium: 2,
            small: 3,
          }}
        >
          Brand tabs
        </Col>
        <Col
          className="header-topnav__promo-area"
          colSize={{
            large: 8,
            medium: 4,
            small: 0,
          }}
        >
          Promo area
        </Col>
        <Col
          className="header-topnav__track-order"
          colSize={{
            large: 2,
            medium: 2,
            small: 3,
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
          <HomeLogo
            dataLocator="global_TCPlink tcp-logo"
            imgSrc="/static/images/tcp-logo.svg"
            href="/"
            alt="The Children's Place"
            title="The Children's Place"
            width="172px"
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
};

export default withStyles(Header, headerStyles);
export { Header as HeaderVanilla };
