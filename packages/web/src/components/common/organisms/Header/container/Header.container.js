import { connect } from 'react-redux';
import HeaderView from '../views';

const mapStateToProps = state => {
  return {
    headerTopNav: state.HeaderReducer.header_top_nav,
    headerPromoArea: state.HeaderReducer.header_promo_area,
  };
};

export default connect(mapStateToProps)(HeaderView);
