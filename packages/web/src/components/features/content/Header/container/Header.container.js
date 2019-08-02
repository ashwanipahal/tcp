import { connect } from 'react-redux';
import {
  openNavigationDrawer,
  closeNavigationDrawer,
} from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import { openOverlayModal } from '@tcp/core/src/components/features/OverlayModal/container/OverlayModal.actions';
import HeaderView from '../views';
import { getUserName } from './Header.selectors';

const mapStateToProps = state => {
  const { Header } = state;
  return {
    brandTabs: Header.brandTabs,
    promoMessageWrapper: Header.promoMessageWrapper,
    headerPromoArea: Header.promoTextBannerCarousel,
    navigationDrawer: Header.navigationDrawer,
    userName: getUserName(state),
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderView);
