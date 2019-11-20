import React from 'react';
import { View } from 'react-native';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import {
  PricePointsWrapper,
  PriceSubText,
  PriceSubValue,
  PriceSubText2,
  PriceSubValue2,
  PriceSubText3,
  PriceSubValue3,
} from './AddedToBagSkeleton.style.native';

const AddedToBagSkeleton = () => {
  return (
    <View>
      <PricePointsWrapper>
        <PriceSubText>
          <LoaderSkelton />
        </PriceSubText>
        <PriceSubValue>
          <LoaderSkelton />
        </PriceSubValue>
      </PricePointsWrapper>
      <PricePointsWrapper>
        <PriceSubText2>
          <LoaderSkelton />
        </PriceSubText2>
        <PriceSubValue2>
          <LoaderSkelton />
        </PriceSubValue2>
      </PricePointsWrapper>
      <PricePointsWrapper>
        <PriceSubText3>
          <LoaderSkelton />
        </PriceSubText3>
        <PriceSubValue3>
          <LoaderSkelton />
        </PriceSubValue3>
      </PricePointsWrapper>
    </View>
  );
};

export default AddedToBagSkeleton;
