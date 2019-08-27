import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import OverlayModal from '@tcp/core/src/components/features/OverlayModal';
import TrackOrder from '@tcp/core/src/components/features/account/TrackOrder';
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
  openTrackOrderOverlay,
  isLoggedIn,
  cartItemCount,
  labels
}) => {
  return (
    <header className={className}>
      <HeaderTopNav
        className="header-topnav"
        brandTabs={brandTabs}
        promoMessageWrapper={promoMessageWrapper}
        openOverlay={openTrackOrderOverlay}
        isUserLoggedIn={isLoggedIn}
        labels={labels}
      />
      <HeaderMiddleNav
        openNavigationDrawer={openNavigationDrawer}
        closeNavigationDrawer={closeNavigationDrawer}
        navigationDrawer={navigationDrawer}
        userName={userName}
        openOverlay={openOverlay}
        isLoggedIn={isLoggedIn}
        cartItemCount={cartItemCount}
      />
      <HeaderPromo
        mobileMarkup
        className="header__promo-area--mobile"
        dataPromo={headerPromoArea}
      />
      <HeaderPromo className="header__promo-area--desktop" dataPromo={headerPromoArea} />
      <OverlayModal />
      <TrackOrder />
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
  openTrackOrderOverlay: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  cartItemCount: PropTypes.func.isRequired,
  labels: PropTypes.shape({})
};

Header.defaultProps = {
  labels: {
    trackOrder:{}
  }
}

export default withStyles(Header, style);
