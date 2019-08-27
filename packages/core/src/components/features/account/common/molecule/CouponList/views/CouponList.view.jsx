import React from 'react';
import PropTypes from 'prop-types';
import CouponTile from '../../CouponTile';

export const CouponList = ({ coupons, sliceCount, labels, commonLabels }) => {
  return (
    <ul>
      {coupons.slice(0, sliceCount).map(coupon => {
        return (
          <CouponTile key={coupon.id} labels={labels} commonLabels={commonLabels} coupon={coupon} />
        );
      })}
    </ul>
  );
};

CouponList.propTypes = {
  coupons: PropTypes.shape([]).isRequired,
  sliceCount: PropTypes.number.isRequired,
  labels: PropTypes.shape({}).isRequired,
  commonLabels: PropTypes.shape({}).isRequired,
};

export default CouponList;
