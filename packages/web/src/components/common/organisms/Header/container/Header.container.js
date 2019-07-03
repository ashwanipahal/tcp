import { connect } from 'react-redux';
import HeaderView from '../views';

const mapStateToProps = state => {
  return {
    headerTopNav: state.HeaderReducer.topNavWrapper,
    headerPromoArea: state.HeaderReducer.promoTextBannerCarousel,
  };
};

export default connect(mapStateToProps)(HeaderView);
