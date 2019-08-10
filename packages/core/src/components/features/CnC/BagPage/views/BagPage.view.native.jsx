import React from 'react';
import { Text, View } from 'react-native';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/BagPage/organisms/OrderLedger';
import CartItemTileContainer from '../../CartItemTile/organisms/CartItemTileWrapper/container/CartItemTileWrapper.container';

const BagPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>APP BAG PAGE</Text>
      <CartItemTileContainer />
      <OrderLedgerContainer />
    </View>
  );
};
export default BagPage;
