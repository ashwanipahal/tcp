import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/BagPage/organisms/OrderLedger';
import ProductTileWrapper from '../../CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import CouponAndPromos from '../../common/organism/CouponAndPromos';

const BagPage = ({ labels }) => {
  return (
    <React.Fragment>
      <Text>APP BAG PAGE</Text>
      <ProductTileWrapper bagLabels={labels} />
      <OrderLedgerContainer />
      <CouponAndPromos />
    </React.Fragment>
  );
};

BagPage.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};
export default BagPage;
