import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import OverlayModal from '@tcp/core/src/components/features/OverlayModal';
import TrackOrder from '@tcp/core/src/components/features/account/TrackOrder';
import { getViewportInfo } from '@tcp/core/src/utils';
import { HeaderTopNav, HeaderPromo, HeaderMiddleNav, CondensedHeader } from '../molecules';
import style from '../Header.style';
import SearchBar from '../molecules/SearchBar/index';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCondensedHeaderOpen: false,
      isSearchOpen: false,
    };
  }

  componentDidMount() {
    window.onscroll = () => this.handleScroll();
  }

  setSearchState = (currentStatus, cb = null) => {
    this.setState({ isSearchOpen: currentStatus }, cb ? cb() : () => {});
  };

  handleScroll = () => {
    const header = document.getElementById('header-middle-nav-bar');
    const sticky = header && header.offsetTop;
    window.addEventListener('scroll', () => {
      const condensedHeader = document.getElementsByClassName('condensed-header')[0];
      if (
        (getViewportInfo().isDesktop && window.pageYOffset > sticky + 64) ||
        (!getViewportInfo().isDesktop && window.pageYOffset > sticky)
      ) {
        condensedHeader.classList.add('show-condensed-header');
        this.setState({ isCondensedHeaderOpen: true });
      } else {
        condensedHeader.classList.remove('show-condensed-header');
        this.setState({ isCondensedHeaderOpen: false });
      }
    });
  };

  render() {
    const {
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
      labels,
      totalItems,
    } = this.props;

    const { isSearchOpen } = this.state;

    const { isCondensedHeaderOpen } = this.state;
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
          totalItems={totalItems}
          isCondensedHeaderOpen={isCondensedHeaderOpen}
          setSearchState={this.setSearchState}
          isSearchOpen={isSearchOpen}
        />
        <CondensedHeader
          openNavigationDrawer={openNavigationDrawer}
          closeNavigationDrawer={closeNavigationDrawer}
          navigationDrawer={navigationDrawer}
          userName={userName}
          openOverlay={openOverlay}
          isLoggedIn={isLoggedIn}
          cartItemCount={cartItemCount}
          totalItems={totalItems}
          isCondensedHeaderOpen={isCondensedHeaderOpen}
          setSearchState={this.setSearchState}
          isSearchOpen={isSearchOpen}
        />
        <SearchBar
          className={!isSearchOpen && 'rightLink'}
          setSearchState={this.setSearchState}
          isSearchOpen={isSearchOpen}
          isCondensedHeaderOpen={isCondensedHeaderOpen}
        />
        <HeaderPromo
          mobileMarkup
          className="header__promo-area--mobile"
          dataPromo={headerPromoArea}
        />
        <HeaderPromo className="header__promo-area--desktop" dataPromo={headerPromoArea} />
        <OverlayModal isCondensedHeaderOpen={isCondensedHeaderOpen} />
        <TrackOrder />
      </header>
    );
  }
}

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
  labels: PropTypes.shape({}),
  totalItems: PropTypes.string,
};

Header.defaultProps = {
  labels: {
    trackOrder: {},
  },
  totalItems: 0,
};

export default withStyles(Header, style);
