import { connect } from 'react-redux';
import { applyCoupon } from './Coupon.actions';
import getCouponFetchingState from './Coupon.selectors';
import Coupon from '../views/Coupon.view';

const mapDispatchToProps = dispatch => ({
  handleApplyCoupon: formData => dispatch(applyCoupon(formData)),
});

const mapStateToProps = state => ({
  isFetching: getCouponFetchingState(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coupon);
