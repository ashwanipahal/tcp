import React from 'react';
import { PropTypes } from 'prop-types';
import throttle from 'lodash/throttle';
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
      showCondensedHeader: false,
      isSearchOpen: false,
    };
  }

  componentDidMount() {
    this.addScrollListener();
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

  getStickyPosition = () => {
    const header = document.getElementById('header-middle-nav-bar');
    return header && header.offsetTop;
  };

  addScrollListener = () => {
    const stickyPos = this.getStickyPosition();
    window.addEventListener('scroll', throttle(this.handleScroll.bind(this, stickyPos), 100));
  };

  removeScrollListener = () => {
    const stickyPos = this.getStickyPosition();
    window.removeEventListener('scroll', throttle(this.handleScroll.bind(this, stickyPos), 100));
  };

  setSearchState = (currentStatus, cb = null) => {
    this.setState({ isSearchOpen: currentStatus }, cb ? cb() : () => {});
  };

  handleScroll = sticky => {
    /**
     * Note:
     * 1. Condensed header is 'stuck' if scrolled past Navigation bar
     * and scrolling direction is down
     * 2. Condensed header is 'unstuck' when scrolling up till Navigation bar get visible
     */
    if (
      (getViewportInfo().isDesktop && window.pageYOffset > sticky + 64) ||
      (!getViewportInfo().isDesktop && window.pageYOffset > sticky)
    ) {
      this.setState({ showCondensedHeader: true }, () => {
        const condensedHeader = document.getElementsByClassName('condensed-header')[0];
        condensedHeader.classList.add('show-condensed-header');
      });
    } else {
      this.setState({ showCondensedHeader: false });
    }
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

    const { showCondensedHeader } = this.state;
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
          showCondensedHeader={showCondensedHeader}
          setSearchState={this.setSearchState}
          isSearchOpen={isSearchOpen}
        />
        <SearchBar
          className={!isSearchOpen && 'rightLink'}
          setSearchState={this.setSearchState}
          isSearchOpen={isSearchOpen}
          showCondensedHeader={showCondensedHeader}
        />
        <HeaderPromo
          mobileMarkup
          className="header__promo-area--mobile"
          dataPromo={headerPromoArea}
        />
        <HeaderPromo className="header__promo-area--desktop" dataPromo={headerPromoArea} />
        {showCondensedHeader && (
          <CondensedHeader
            openNavigationDrawer={openNavigationDrawer}
            closeNavigationDrawer={closeNavigationDrawer}
            navigationDrawer={navigationDrawer}
            userName={userName}
            openOverlay={openOverlay}
            isLoggedIn={isLoggedIn}
            cartItemCount={cartItemCount}
            totalItems={totalItems}
            showCondensedHeader={showCondensedHeader}
            setSearchState={this.setSearchState}
            isSearchOpen={isSearchOpen}
            labels={labels}
          />
        )}
        <OverlayModal showCondensedHeader={showCondensedHeader} />
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
