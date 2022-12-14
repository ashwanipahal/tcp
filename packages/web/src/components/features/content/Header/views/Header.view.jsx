import React from 'react';
import { PropTypes } from 'prop-types';
import throttle from 'lodash/throttle';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary/errorBoundary';
import OverlayModal from '@tcp/core/src/components/features/account/OverlayModal';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import TrackOrder from '@tcp/core/src/components/features/account/TrackOrder';
import PickupStoreModal from '@tcp/core/src/components/common/organisms/PickupStoreModal';
import QuickViewModal from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.container';
import LoyaltyPromoBanner from '@tcp/core/src/components/common/molecules/LoyaltyPromoBanner';
import { getViewportInfo, getAPIConfig } from '@tcp/core/src/utils';
import { NAVIGATION_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { HeaderTopNav, HeaderPromo, HeaderMiddleNav, CondensedHeader } from '../molecules';
import style from '../Header.style';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showCondensedHeader: false,
      isAppWebView: getAPIConfig().isAppChannel,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line extra-rules/no-commented-out-code
    // this.addScrollListener();
    const { loadFavoriteStore } = this.props;
    loadFavoriteStore({});
    this.addScrollListener();
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this.removeScrollListener();
  }

  getStickyPosition = () => {
    const header = document.getElementById('header-middle-nav');
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

  handleScroll = sticky => {
    /**
     * Note:
     * 1. Condensed header is 'stuck' if scrolled past Navigation bar
     * and scrolling direction is down
     * 2. Condensed header is 'unstuck' when scrolling up till Navigation bar get visible
     */
    const { isAppWebView } = this.state;
    if (!isAppWebView) {
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
    }
  };

  render() {
    const {
      className,
      brandTabs,
      promoMessageWrapper,
      topPromoBanner,
      headerPromoTextArea,
      headerPromoHtmlArea,
      navigationDrawer,
      openNavigationDrawer,
      closeNavigationDrawer,
      isUserPlcc,
      isRememberedUser,
      userName,
      userPoints,
      userRewards,
      openOverlay,
      isOpenOverlay,
      openTrackOrderOverlay,
      isLoggedIn,
      cartItemCount,
      labels,
      openMiniBagDispatch,
      totalItems,
      favStore,
      isPickupModalOpen,
      loyaltyPromoBanner,
      setClickAnalyticsData,
      isQVModalOpen,
    } = this.props;
    const { showCondensedHeader, isAppWebView } = this.state;
    const { accessibility: { skipNavigation } = {} } = labels;
    return !isAppWebView ? (
      <header className={`${className} header-global`}>
        {topPromoBanner ? (
          <LoyaltyPromoBanner
            richTextList={[{ richText: topPromoBanner[0], link: null }]}
            className="header-promo__container top-promo-banner"
            cookieID="mprTopHead"
          />
        ) : null}

        <HeaderTopNav
          className="header-topnav"
          brandTabs={brandTabs}
          promoMessageWrapper={promoMessageWrapper}
          openOverlay={openTrackOrderOverlay}
          isUserLoggedIn={isLoggedIn}
          labels={labels}
          store={favStore}
        />

        <Anchor href="#overlayWrapper" noLink className="skip-main">
          {skipNavigation}
        </Anchor>

        <HeaderMiddleNav
          openNavigationDrawer={openNavigationDrawer}
          closeNavigationDrawer={closeNavigationDrawer}
          navigationDrawer={navigationDrawer}
          isUserPlcc={isUserPlcc}
          isRememberedUser={isRememberedUser}
          userName={userName}
          userPoints={userPoints}
          userRewards={userRewards}
          openOverlay={openOverlay}
          isOpenOverlay={isOpenOverlay}
          isLoggedIn={isLoggedIn}
          cartItemCount={cartItemCount}
          totalItems={totalItems}
          openMiniBagDispatch={openMiniBagDispatch}
          store={favStore}
          labels={labels}
          setClickAnalyticsData={setClickAnalyticsData}
        />
        <OverlayModal showCondensedHeader={showCondensedHeader} isLoggedIn={isLoggedIn} />
        <HeaderPromo
          mobileMarkup
          className="header__promo-area--mobile"
          dataTextPromo={headerPromoTextArea}
          dataHtmlPromo={headerPromoHtmlArea}
        />
        <HeaderPromo
          className="header__promo-area--desktop"
          dataTextPromo={headerPromoTextArea}
          dataHtmlPromo={headerPromoHtmlArea}
        />
        <LoyaltyPromoBanner
          richTextList={loyaltyPromoBanner}
          className="header-promo__container"
          cookieID="mprAboveHead"
        />
        {showCondensedHeader && (
          <CondensedHeader
            openNavigationDrawer={openNavigationDrawer}
            openMiniBagDispatch={openMiniBagDispatch}
            closeNavigationDrawer={closeNavigationDrawer}
            navigationDrawer={navigationDrawer}
            userName={userName}
            userPoints={userPoints}
            userRewards={userRewards}
            openOverlay={openOverlay}
            isLoggedIn={isLoggedIn}
            cartItemCount={cartItemCount}
            totalItems={totalItems}
            showCondensedHeader={showCondensedHeader}
            labels={labels}
          />
        )}
        <TrackOrder />
        {isPickupModalOpen ? <PickupStoreModal /> : null}
        {isQVModalOpen ? <QuickViewModal /> : null}
        <RenderPerf.Measure name={NAVIGATION_VISIBLE} />
      </header>
    ) : null;
  }
}

Header.propTypes = {
  className: PropTypes.string.isRequired,
  loyaltyPromoBanner: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  brandTabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  topPromoBanner: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  promoMessageWrapper: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  headerPromoTextArea: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  headerPromoHtmlArea: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigationDrawer: PropTypes.shape({}).isRequired,
  openNavigationDrawer: PropTypes.func.isRequired,
  closeNavigationDrawer: PropTypes.func.isRequired,
  isUserPlcc: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userPoints: PropTypes.string.isRequired,
  userRewards: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
  isOpenOverlay: PropTypes.bool.isRequired,
  openTrackOrderOverlay: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  cartItemCount: PropTypes.func.isRequired,
  openMiniBagDispatch: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  totalItems: PropTypes.string,
  favStore: PropTypes.shape({
    basicInfo: PropTypes.shape({}),
    hours: PropTypes.shape({
      regularHours: PropTypes.shape([]),
      regularAndHolidayHours: PropTypes.shape([]),
      holidayHours: PropTypes.shape([]),
    }),
    features: PropTypes.shape({}),
  }),
  loadFavoriteStore: PropTypes.func.isRequired,
  isPickupModalOpen: PropTypes.bool,
  isRememberedUser: PropTypes.bool,
  setClickAnalyticsData: PropTypes.func.isRequired,
  isQVModalOpen: PropTypes.bool,
};

Header.defaultProps = {
  labels: {
    trackOrder: {},
  },
  totalItems: 0,
  favStore: {
    basicInfo: {
      id: '',
      storeName: '',
      phone: '',
      coordinates: {},
      address: {},
    },
    hours: {
      regularHours: [],
      regularAndHolidayHours: [],
      holidayHours: [],
    },
    features: {},
  },
  isPickupModalOpen: false,
  isRememberedUser: false,
  isQVModalOpen: false,
};

export default withStyles(errorBoundary(Header), style);
