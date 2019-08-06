import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { applyCoupon } from './Coupon.actions';
import { getCouponFetchingState, getCouponsLabels } from './Coupon.selectors';
import Coupon from '../views/Coupon.view';

export const CouponContainer = ({ handleApplyCoupon, isFetching, labels }) => (
  <Coupon isFetching={isFetching} handleApplyCoupon={handleApplyCoupon} labels={labels} />
);

CouponContainer.propTypes = {
  handleApplyCoupon: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  labels: PropTypes.shape.isRequired,
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
