import React from 'react';
import PropTypes from 'prop-types';
import AvailableCouponSection from '../organism/AvailableCouponSection';

const CouponView = ({ labels, couponList }) => {
  return (
    <AvailableCouponSection labels={labels} couponList={couponList} className="available_coupon" />
  );
};

CouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  couponList: PropTypes.shape([]).isRequired,
};

export default CouponView;
