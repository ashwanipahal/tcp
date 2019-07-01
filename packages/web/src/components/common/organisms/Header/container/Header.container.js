import { connect } from 'react-redux';
import HeaderView from '../views';

const mapStateToProps = state => {
  return {
    headerTopNav: state.HeaderReducer.submodules.topNavWrapper,
    headerPromoArea: state.HeaderReducer.header_promo_area,
  };
};

export default connect(mapStateToProps)(HeaderView);
