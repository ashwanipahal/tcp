import { connect } from 'react-redux';
import {
  openNavigationDrawer,
  closeNavigationDrawer,
} from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import { openOverlayModal } from '../../../../common/molecules/OverlayModal/container/OverlayModal.actions';
import HeaderView from '../views';

const mapStateToProps = state => {
  const { Header } = state;
  return {
    brandTabs: Header.brandTabs,
    promoMessageWrapper: Header.promoMessageWrapper,
    headerPromoArea: Header.promoTextBannerCarousel,
    navigationDrawer: Header.navigationDrawer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openNavigationDrawer: () => dispatch(openNavigationDrawer()),
    closeNavigationDrawer: () => dispatch(closeNavigationDrawer()),
    openOverlay: component => dispatch(openOverlayModal(component)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderView);
