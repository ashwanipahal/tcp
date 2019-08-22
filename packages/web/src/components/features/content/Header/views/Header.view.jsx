import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import OverlayModal from '@tcp/core/src/components/features/OverlayModal';
import { HeaderTopNav, HeaderPromo, HeaderMiddleNav } from '../molecules';
import style from '../Header.style';

const Header = ({
  className,
  brandTabs,
  promoMessageWrapper,
  headerPromoArea,
  navigationDrawer,
  openNavigationDrawer,
  closeNavigationDrawer,
  userName,
  openOverlay,
  isLoggedIn,
}) => {
  return (
    <header className={className}>
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
        isLoggedIn={isLoggedIn}
      />
      <HeaderPromo
        mobileMarkup
        className="header__promo-area--mobile"
        dataPromo={headerPromoArea}
      />
      <HeaderPromo className="header__promo-area--desktop" dataPromo={headerPromoArea} />
      <OverlayModal />
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string.isRequired,
  brandTabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  promoMessageWrapper: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  headerPromoArea: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigationDrawer: PropTypes.shape({}).isRequired,
  openNavigationDrawer: PropTypes.func.isRequired,
  closeNavigationDrawer: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withStyles(Header, style);
