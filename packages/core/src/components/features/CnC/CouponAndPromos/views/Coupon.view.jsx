import React from 'react';
import PropTypes from 'prop-types';
import AvailableCouponSection from '../organism/AvailableCouponSection';

const CouponView = ({ labels }) => {
  return <AvailableCouponSection labels={labels} />;
};

CouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default CouponView;
