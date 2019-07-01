import { connect } from 'react-redux';
import HeaderView from '../views';

const mapStateToProps = state => {
  return {
    headerTopNav: state.HeaderReducer.submodules.topNavWrapper,
    headerPromoArea: state.HeaderReducer.submodules.promoTextBannerCarousel,
  };
};

export default connect(mapStateToProps)(HeaderView);
