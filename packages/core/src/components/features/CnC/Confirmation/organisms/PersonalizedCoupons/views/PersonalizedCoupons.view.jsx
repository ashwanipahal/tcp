import React from 'react';
import PropTypes from 'prop-types';
import PersonalizedCoupon from '../../../molecules/PersonalizedCoupon';

const PersonalizedCoupons = ({ coupons }) => {
  console.log('coupons------', coupons);
  return coupons.map(coupon => <PersonalizedCoupon coupon={coupon} />);
};

PersonalizedCoupons.propTypes = {
  coupons: PropTypes.shape([]).isRequired,
};

export default PersonalizedCoupons;
