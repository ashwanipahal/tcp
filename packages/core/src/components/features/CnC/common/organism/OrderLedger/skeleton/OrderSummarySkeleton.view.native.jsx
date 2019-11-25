import React from 'react';
import { View } from 'react-native';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import LineComp from '../../../../../../common/atoms/Line';
import {
  PricePointsWrapper,
  PriceSubText,
  PriceSubValue,
  PriceSubText2,
  PriceSubValue2,
  PriceSubText3,
  PriceSubValue3,
  PriceSubText4,
  PriceSubValue4,
  PriceSubText5,
  PriceSubValue5,
  PriceSubText6,
  PriceSubValue6,
} from './OrderSummarySkeleton.style.native';

const OrderSummarySkeleton = () => {
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
      <PricePointsWrapper>
        <PriceSubText4>
          <LoaderSkelton />
        </PriceSubText4>
        <PriceSubValue4>
          <LoaderSkelton />
        </PriceSubValue4>
      </PricePointsWrapper>
      <LineComp borderColor="gray.600" borderWidth={1} marginTop={10} marginBottom={10} />
      <PricePointsWrapper>
        <PriceSubText5>
          <LoaderSkelton />
        </PriceSubText5>
        <PriceSubValue5>
          <LoaderSkelton />
        </PriceSubValue5>
      </PricePointsWrapper>
      <PricePointsWrapper>
        <PriceSubText6>
          <LoaderSkelton />
        </PriceSubText6>
        <PriceSubValue6>
          <LoaderSkelton />
        </PriceSubValue6>
      </PricePointsWrapper>
    </View>
  );
};

export default OrderSummarySkeleton;
