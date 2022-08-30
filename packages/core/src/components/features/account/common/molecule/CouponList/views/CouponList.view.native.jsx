import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CouponTile from '../../CouponTile';

export const CouponList = ({ coupons, sliceCount, commonLabels, labels }) => {
  return (
    <View>
      {coupons &&
        coupons.slice(0, sliceCount).map(coupon => {
          return (
            <CouponTile
              key={coupon.id}
              labels={labels}
              commonLabels={commonLabels}
              coupon={coupon}
            />
          );
        })}
    </View>
  );
};

CouponList.propTypes = {
  coupons: PropTypes.shape([]).isRequired,
  sliceCount: PropTypes.number.isRequired,
  labels: PropTypes.shape({}).isRequired,
  commonLabels: PropTypes.shape({}),
};

CouponList.defaultProps = {
  commonLabels: {},
};

export default CouponList;
