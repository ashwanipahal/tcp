import { connect } from 'react-redux';
import {
  openNavigationDrawer,
  closeNavigationDrawer,
  openMiniBag,
} from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import { setTrackOrderModalMountedState } from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.actions';
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import { getOpenState } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.selectors';

import { getFavoriteStoreActn } from '@tcp/core/src/components/features/storeLocator/StoreLanding/container/StoreLanding.actions';
import {
  isPlccUser,
  getUserName,
  getUserLoggedInState,
  getCurrentPointsState,
  getTotalRewardsState,
} from '@tcp/core/src/components/features/account/User/container/User.selectors';
import BAGPAGE_SELECTORS from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.selectors';
import { getIsPickupModalOpen } from '@tcp/core/src/components/common/organisms/PickupStoreModal/container/PickUpStoreModal.selectors';
import BAG_PAGE_ACTIONS from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.actions';

import { getCartItemCount } from '@tcp/core/src/utils/cookie.util';
import HeaderView from '../views';

const mapStateToProps = state => {
  const { Header } = state;
  return {
    brandTabs: Header.brandTabs,
    promoMessageWrapper: Header.promoMessageWrapper,
    headerPromoArea: Header.promoTextBannerCarousel,
    navigationDrawer: Header.navigationDrawer,
    isUserPlcc: isPlccUser(state),
    userName: getUserName(state),
    userPoints: getCurrentPointsState(state),
    userRewards: getTotalRewardsState(state),
    isLoggedIn: getUserLoggedInState(state),
    cartItemCount: getCartItemCount(),
    totalItems: BAGPAGE_SELECTORS.getTotalItems(state),
    labels: state.Labels.global,
    favStore: state.User && state.User.get('defaultStore'),
    isPickupModalOpen: getIsPickupModalOpen(state),
    isOpenOverlay: getOpenState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openNavigationDrawer: id => {
      dispatch(openNavigationDrawer(id));
    },
    closeNavigationDrawer: () => {
      dispatch(closeNavigationDrawer());
    },
    openMiniBagDispatch: () => {
      dispatch(BAG_PAGE_ACTIONS.getOrderDetails({ isCartPage: true }));
      dispatch(openMiniBag());
    },
    openOverlay: component => dispatch(openOverlayModal(component)),
    openTrackOrderOverlay: payload => dispatch(setTrackOrderModalMountedState(payload)),
    loadFavoriteStore: payload => dispatch(getFavoriteStoreActn(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderView);
