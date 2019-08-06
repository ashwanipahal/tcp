import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { applyCoupon } from './Coupon.actions';
import { getCouponFetchingState, getCouponsLabels } from './Coupon.selectors';
import Coupon from '../views/Coupon.view';

export const CouponContainer = ({ handleApplyCoupon, isFetching }) => (
  <Coupon isFetching={isFetching} handleApplyCoupon={handleApplyCoupon} />
);

CouponContainer.propTypes = {
  handleApplyCoupon: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  handleApplyCoupon: formData =>
    new Promise((resolve, reject) => {
      dispatch(applyCoupon({ formData, formPromise: { resolve, reject } }));
    }),
});

const mapStateToProps = state => ({
  isFetching: getCouponFetchingState(state),
  labels: getCouponsLabels(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponContainer);
