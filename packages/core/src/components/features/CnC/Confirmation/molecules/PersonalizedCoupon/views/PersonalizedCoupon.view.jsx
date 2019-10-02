import React from 'react';
import PropTypes from 'prop-types';

const PersonalizedCoupon = ({ coupon }) => {
  return <div>{coupon.name}</div>;
};

PersonalizedCoupon.propTypes = {
  coupon: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default PersonalizedCoupon;
