import React from 'react';
import { PropTypes } from 'prop-types';
import { Col, Row } from '@tcp/core/src/components/common/atoms';
import OverlayModal from '@tcp/core/src/components/features/OverlayModal';
import { HeaderTopNav, HeaderPromo, HeaderMiddleNav } from '../molecules';
import headerStyles from '../Header.style';

const { HeaderLoyalty } = headerStyles;

const Header = ({
  brandTabs,
  promoMessageWrapper,
  headerPromoArea,
  navigationDrawer,
  openNavigationDrawer,
  closeNavigationDrawer,
  userName,
  openOverlay,
}) => {
  return (
    <header>
      <HeaderTopNav
        className="header-topnav"
        brandTabs={brandTabs}
        promoMessageWrapper={promoMessageWrapper}
      />
      <HeaderMiddleNav
        openNavigationDrawer={openNavigationDrawer}
        closeNavigationDrawer={closeNavigationDrawer}
        navigationDrawer={navigationDrawer}
        userName={userName}
        openOverlay={openOverlay}
      />
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
      <OverlayModal />
    </header>
  );
};

Header.propTypes = {
  brandTabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  promoMessageWrapper: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  headerPromoArea: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigationDrawer: PropTypes.shape({}).isRequired,
  openNavigationDrawer: PropTypes.func.isRequired,
  closeNavigationDrawer: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
};

export default Header;
