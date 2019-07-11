import React from 'react';
import { PropTypes } from 'prop-types';
import { Col, Row } from '@tcp/core/src/components/common/atoms';
import { identifyBrand } from '@tcp/core/src/utils';

import { HeaderTopNav } from '../../../molecules';
import HeaderPromo from '../../../molecules/HeaderPromo';
import config from '../config';
import headerStyles from '../Header.style';
import HomeLogo from './HomeLogo';

const { HeaderBrand, HeaderLoyalty } = headerStyles;
const brand = identifyBrand();

const Header = ({ headerTopNav, headerPromoArea }) => {
  return (
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
              alt={config[brand].alt}
              className="header-brand__home-logo--brand"
              dataLocator={config[brand].dataLocator}
              imgSrc={config[brand].imgSrc}
            />
          </Col>
        </Row>
      </HeaderBrand>
      <HeaderPromo
        mobileMarkup
        className="header__promo-area--mobile"
        dataPromo={headerPromoArea.composites.promoTextBanner}
      />
      <HeaderPromo
        className="header__promo-area--desktop"
        dataPromo={headerPromoArea.composites.promoTextBanner}
      />
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
  headerTopNav: PropTypes.shape({}).isRequired,
  headerPromoArea: PropTypes.shape({
    composites: PropTypes.shape({
      promoTextBanner: PropTypes.shape({}),
    }),
  }).isRequired,
};

export default Header;
