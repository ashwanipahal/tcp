import { connect } from 'react-redux';
import {
  openNavigationDrawer,
  closeNavigationDrawer,
} from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import { setTrackOrderModalMountedState } from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.actions';
import { openOverlayModal } from '@tcp/core/src/components/features/OverlayModal/container/OverlayModal.actions';
import {
  getUserName,
  getUserLoggedInState,
} from '@tcp/core/src/components/features/account/User/container/User.selectors';
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
    openOverlay: component => dispatch(openOverlayModal(component)),
    openTrackOrderOverlay: payload => dispatch(setTrackOrderModalMountedState(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderView);
