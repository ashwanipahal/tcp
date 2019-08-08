import React from 'react';
import { Text } from 'react-native';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/BagPage/organisms/OrderLedger';

const BagPage = () => {
  return (
    <React.Fragment>
      <Text>APP BAG PAGE</Text>
      <OrderLedgerContainer />
    </React.Fragment>
  );
};
export default BagPage;
