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

const OrdersListItem = ({ labels, orderItem, navigation, isPastOrder }) => {
  const { orderDate, orderNumber, orderStatus, orderTotal, isEcomOrder } = orderItem;
  const router = {
    query: {
      orderId: orderNumber,
    },
  };
  return (
    <>
      <OrdersListItemMainView isPastOrder={isPastOrder}>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderDate', 'orders')}
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="black"
          />
          <BodyCopy
            text={orderDate}
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
          />
        </OrdersListItemView>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderNumber', 'orders')}
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="black"
          />
          <OrdersNumberWrapper>
            <Anchor
              text={orderNumber}
              fontSizeVariation="large"
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
            fontSize="fs14"
            fontWeight="black"
          />
          <BodyCopy
            text={
              isEcomOrder
                ? getLabelValue(labels, 'lbl_orders_online', 'orders')
                : getLabelValue(labels, 'lbl_orders_pickupStore', 'orders')
            }
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
          />
        </OrdersListItemView>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderStatus', 'orders')}
            fontFamily="secondary"
            fontSize="fs14"
          />
          <BodyCopy
            text={getLabelValue(labels, orderStatus, 'orders')}
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
          />
        </OrdersListItemView>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderTotal', 'orders')}
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="black"
            textAlign={isPastOrder ? 'right' : 'left'}
          />
          <BodyCopy
            text={orderTotal}
            mobileFontFamily="secondary"
            fontSize="fs14"
            textAlign={isPastOrder ? 'right' : 'left'}
          />
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
  isPastOrder: PropTypes.bool.isRequired,
};

export default OrdersListItem;
export { OrdersListItem as OrdersListItemVanilla };
