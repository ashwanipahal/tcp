import React from 'react';
import { View } from 'react-native';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import {
  ParentWrapper,
  PricePointsWrapper,
  PriceSubText,
  PriceSubText2,
  PriceSubText3,
} from '../styles/PickupPageSkeleton.style.native';

const PickupPageSkeleton = () => {
  return (
    <ParentWrapper>
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
    </ParentWrapper>
  );
};

export default PickupPageSkeleton;
