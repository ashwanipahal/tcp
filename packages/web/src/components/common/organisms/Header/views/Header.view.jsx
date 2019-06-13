import React from 'react';
import { PropTypes } from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Image from '@tcp/core/src/components/common/atoms/Image';
import utilMethods from '@tcp/core/src/utils/utilMethods';
import HeaderTopNav from '@tcp/web/src/components/common/molecules/HeaderTopNav';
import config from '../config';
import headerStyles from '../Header.style';
import HomeLogo from './HomeLogo';
import Slider from 'react-slick';
import { getIconPath } from '../../../../../utils';

const {
  HeaderBrand,
  HeaderNav,
  DummyNav,
  HeaderPromo,
  HeaderLoyalty,
  HeaderPromoItem,
  HeaderPromoItemIcon1,
  HeaderPromoItemIcon2,
  HeaderPromoItemIcon3,
  HeaderPromoItemContents,
  HeaderPromoItemBold,
  HeaderPromoItemBold2,
} = headerStyles;
const brand = utilMethods.brand();

const sliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 767,
      settings: 'unslick',
    },
  ],
};

const Header = ({ className, headerData }) => (
  <header className={className}>
    <componentCss />
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
          className="header-promo__promo-banner header-promo__promo-banner--slot1"
          colSize={{
            large: 4,
            medium: 8,
            small: 6,
          }}
        >
          <HeaderPromoItem>
            <HeaderPromoItemIcon1 className="header-promo-item__icon">
              <Image src={getIconPath('icon-clock')} alt="promotion" />
            </HeaderPromoItemIcon1>
            <HeaderPromoItemContents className="header-promo-item__contents">
              <HeaderPromoItemBold>Need it now?</HeaderPromoItemBold>
              buy it online, pick up in store
            </HeaderPromoItemContents>
          </HeaderPromoItem>
        </Col>
        <Col
          className="header-promo__promo-banner header-promo__promo-banner--slot2"
          colSize={{
            large: 4,
            medium: 8,
            small: 6,
          }}
        >
          <HeaderPromoItem>
            <HeaderPromoItemIcon2 className="header-promo-item__icon">
              <Image src={getIconPath('icon-dollar')} alt="promotion" />
            </HeaderPromoItemIcon2>
            <HeaderPromoItemContents className="header-promo-item__contents">
              <HeaderPromoItemBold2>Earn place cash!</HeaderPromoItemBold2>
              buy it online, pick up in store
            </HeaderPromoItemContents>
          </HeaderPromoItem>
        </Col>
        <Col
          className="header-promo__promo-banner header-promo__promo-banner--slot3"
          colSize={{
            large: 4,
            medium: 8,
            small: 6,
          }}
        >
          <HeaderPromoItem>
            <HeaderPromoItemIcon3 className="header-promo-item__icon">
              <Image src={getIconPath('icon-at')} alt="promotion" />
            </HeaderPromoItemIcon3>
            <HeaderPromoItemContents className="header-promo-item__contents">
              <HeaderPromoItemBold>Sign up and get $10 off!</HeaderPromoItemBold>
              Enter email
            </HeaderPromoItemContents>
          </HeaderPromoItem>
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
