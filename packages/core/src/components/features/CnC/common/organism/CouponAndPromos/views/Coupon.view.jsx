import React from 'react';
import PropTypes from 'prop-types';
import CouponForm from '../../../molecules/CouponForm';

const CouponView = ({ isFetching, handleApplyCoupon }) => {
  return <CouponForm onSubmit={handleApplyCoupon} isFetching={isFetching} />;
};

CouponView.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  handleApplyCoupon: PropTypes.func.isRequired,
};

export default CouponView;
