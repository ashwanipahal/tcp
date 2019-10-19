import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';

import {
  OrdersListItemMainView,
  OrdersNumberWrapper,
  OrdersListItemView,
} from '../styles/OrdersListItem.style.native';

const OrdersListItem = ({ labels, orderItem, navigation }) => {
  const { orderDate, orderNumber, orderStatus, orderTotal, isEcomOrder } = orderItem;
  const router = {
    query: {
      orderId: orderNumber,
    },
  };

  return (
    <>
      <OrdersListItemMainView>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderDate', 'orders')}
            fontFamily="secondary"
            fontSize="fs12"
          />
          <BodyCopy text={orderDate} fontFamily="secondary" fontSize="fs12" fontWeight="regular" />
        </OrdersListItemView>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderNumber', 'orders')}
            fontFamily="secondary"
            fontSize="fs12"
          />
          <OrdersNumberWrapper>
            <Anchor
              text={orderNumber}
              fontSizeVariation="medium"
              noLink
              underline
              anchorVariation="primary"
              onPress={() =>
                navigation.navigate('OrderDetailPage', {
                  title: `${getLabelValue(
                    labels,
                    'lbl_orderDetail_heading',
                    'orders'
                  )} #${orderNumber}`,
                  router,
                })
              }
            />
          </OrdersNumberWrapper>
        </OrdersListItemView>
        <OrdersListItemView />
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderType', 'orders')}
            fontFamily="secondary"
            fontSize="fs12"
          />
          <BodyCopy
            text={
              isEcomOrder
                ? getLabelValue(labels, 'lbl_orders_online', 'orders')
                : getLabelValue(labels, 'lbl_orders_pickupStore', 'orders')
            }
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="regular"
          />
        </OrdersListItemView>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderStatus', 'orders')}
            fontFamily="secondary"
            fontSize="fs12"
          />
          <BodyCopy
            text={getLabelValue(labels, orderStatus, 'orders')}
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="regular"
          />
        </OrdersListItemView>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderTotal', 'orders')}
            fontFamily="secondary"
            fontSize="fs12"
          />
          <BodyCopy text={orderTotal} fontFamily="secondary" fontSize="fs12" fontWeight="regular" />
        </OrdersListItemView>
        <OrdersListItemView />
      </OrdersListItemMainView>
    </>
  );
};

OrdersListItem.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  orderItem: PropTypes.shape([]).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default OrdersListItem;
export { OrdersListItem as OrdersListItemVanilla };
