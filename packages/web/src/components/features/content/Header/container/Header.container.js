import { connect } from 'react-redux';
import {
  openNavigationDrawer,
  closeNavigationDrawer,
  openMiniBag,
} from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import { setTrackOrderModalMountedState } from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.actions';
import { openOverlayModal } from '@tcp/core/src/components/features/OverlayModal/container/OverlayModal.actions';
import {
  getUserName,
  getUserLoggedInState,
} from '@tcp/core/src/components/features/account/User/container/User.selectors';
import BAGPAGE_SELECTORS from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.selectors';
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
    userName: getUserName(state),
    isLoggedIn: getUserLoggedInState(state),
    cartItemCount: getCartItemCount(),
    totalItems: BAGPAGE_SELECTORS.getTotalItems(state),
    labels: state.Labels.global,
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
      dispatch(BAG_PAGE_ACTIONS.getOrderDetails());
      dispatch(openMiniBag());
    },
    openOverlay: component => dispatch(openOverlayModal(component)),
    openTrackOrderOverlay: payload => dispatch(setTrackOrderModalMountedState(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderView);
