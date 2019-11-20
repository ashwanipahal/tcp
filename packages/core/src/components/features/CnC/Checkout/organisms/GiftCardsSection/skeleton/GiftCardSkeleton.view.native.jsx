import React from 'react';
import { View } from 'react-native';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import {
  ParentWrapper,
  PricePointsWrapper,
  PriceSubText,
  PriceSubValue,
  // PriceSubText2,
  // PriceSubValue2,
  // PriceSubText3,
  // PriceSubValue3,
} from './GiftcardSkeleton.style.native';

const GiftCardSkeleton = () => {
  return (
    <View>
      <ParentWrapper>
        <PricePointsWrapper>
          <PriceSubText>
            <LoaderSkelton />
          </PriceSubText>
          <PriceSubValue>
            <LoaderSkelton />
          </PriceSubValue>
        </PricePointsWrapper>
      </ParentWrapper>
      <ParentWrapper>
        <PricePointsWrapper>
          <PriceSubText>
            <LoaderSkelton />
          </PriceSubText>
          <PriceSubValue>
            <LoaderSkelton />
          </PriceSubValue>
        </PricePointsWrapper>
      </ParentWrapper>
    </View>
  );
};

export default GiftCardSkeleton;
