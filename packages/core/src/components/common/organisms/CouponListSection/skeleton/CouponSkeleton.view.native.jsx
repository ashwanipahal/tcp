import React from 'react';
import { View } from 'react-native';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { CouponText } from './CouponSkeleton.style.native';

const CouponSkeleton = () => {
  return (
    <View>
      <CouponText>
        <LoaderSkelton />
      </CouponText>
    </View>
  );
};

export default CouponSkeleton;
