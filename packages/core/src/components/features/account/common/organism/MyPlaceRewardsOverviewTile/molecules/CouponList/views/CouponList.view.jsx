import React from 'react';
import PropTypes from 'prop-types';
import CouponTile from '../../../../../molecule/CouponTile';

export const CouponList = ({ coupons, sliceCount, labels }) => {
  return (
    <ul>
      {coupons.slice(0, sliceCount).map(coupon => {
        return (
          <CouponTile
            key={coupon.id}
            labels={labels}
            coupon={coupon}
          />
        );
      })}
    </ul>
)
};

CouponList.propTypes = {
  coupons: PropTypes.shape([]).isRequired,
  sliceCount: PropTypes.number.isRequired,
  labels: PropTypes.shape({}).isRequired
}

export default CouponList;
