import React from 'react';
import { View } from 'react-native';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import {
  PricePointsWrapper,
  PriceSubText,
  PriceSubText2,
  PriceSubText3,
} from '../styles/PickupPageSkeleton.style.native';

const PickupPageSkeleton = () => {
  return (
    <View>
      <PricePointsWrapper>
        <PriceSubText>
          <LoaderSkelton />
        </PriceSubText>
      </PricePointsWrapper>
      <PricePointsWrapper>
        <PriceSubText2>
          <LoaderSkelton />
        </PriceSubText2>
      </PricePointsWrapper>
      <PricePointsWrapper>
        <PriceSubText3>
          <LoaderSkelton />
        </PriceSubText3>
      </PricePointsWrapper>
    </View>
  );
};

export default PickupPageSkeleton;
