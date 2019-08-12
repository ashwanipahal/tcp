import React from 'react';
import { Text, ScrollView } from 'react-native';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/BagPage/organisms/OrderLedger';
import CouponAndPromos from '../../common/organism/CouponAndPromos';

const BagPage = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text>APP BAG PAGE</Text>
      <OrderLedgerContainer />
      <CouponAndPromos />
    </ScrollView>
  );
};
export default BagPage;
