import { connect } from 'react-redux';
import {
  openNavigationDrawer,
  closeNavigationDrawer,
} from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import HeaderView from '../views';
import { getUserName } from './Header.selectors';

const mapStateToProps = state => {
  const { Header } = state;
  return {
    brandTabs: Header.brandTabs,
    promoMessageWrapper: Header.promoMessageWrapper,
    headerPromoArea: Header.promoTextBannerCarousel,
    navigationDrawer: Header.navigationDrawer,
    userName: getUserName(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openNavigationDrawer: () => dispatch(openNavigationDrawer()),
    closeNavigationDrawer: () => dispatch(closeNavigationDrawer()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderView);
