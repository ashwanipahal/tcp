import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import OrdersTypeContainer from '../styles/OrdersTileItem.style.native';

export const OrdersTileItem = ({ labels, orderItem }) => {
  const { orderDate, orderNumber, orderStatus, orderTotal, isEcomOrder } = orderItem;
  return (
    <ViewWithSpacing spacingStyles="margin-bottom-MED">
      <OrdersTypeContainer>
        <Text>{getLabelValue(labels, 'lbl_ordersTile_orderNum', 'orders')}</Text>
        <Text>: </Text>
        <Anchor
          fontSizeVariation="large"
          underline
          anchorVariation="primary"
          fontSize="fs14"
          dataLocator="order-number-value"
          fontFamily="secondary"
        >
          <Text>{orderNumber}</Text>
        </Anchor>
      </OrdersTypeContainer>
      <OrdersTypeContainer>
        <Text>{getLabelValue(labels, 'lbl_orders_orderDate', 'orders')}</Text>
        <Text>: </Text>
        <Text>{orderDate}</Text>
      </OrdersTypeContainer>
      <OrdersTypeContainer>
        <Text>{getLabelValue(labels, 'lbl_ordersTile_purchase', 'orders')}</Text>
        <Text>: </Text>
        <Text>
          {isEcomOrder
            ? getLabelValue(labels, 'lbl_orders_online', 'orders')
            : getLabelValue(labels, 'lbl_orders_pickupStore', 'orders')}
        </Text>
      </OrdersTypeContainer>
      <OrdersTypeContainer>
        <Text>{getLabelValue(labels, 'lbl_orders_orderStatus', 'orders')}</Text>
        <Text>: </Text>
        <Text>{getLabelValue(labels, orderStatus, 'orders')}</Text>
      </OrdersTypeContainer>
      <OrdersTypeContainer>
        <Text>{getLabelValue(labels, 'lbl_orders_orderTotal', 'orders')}</Text>
        <Text>: </Text>
        <Text>{orderTotal}</Text>
      </OrdersTypeContainer>
    </ViewWithSpacing>
  );
};

OrdersTileItem.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  orderItem: PropTypes.shape({}).isRequired,
};

export default OrdersTileItem;
