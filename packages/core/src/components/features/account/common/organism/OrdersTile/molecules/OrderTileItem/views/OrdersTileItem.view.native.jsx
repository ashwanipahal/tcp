import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import OrdersTypeContainer from '../styles/OrdersTileItem.style.native';

export const OrdersTileItem = ({ labels, orderItem, navigation }) => {
  const { orderDate, orderNumber, orderStatus, orderTotal, isEcomOrder } = orderItem;
  const router = {
    query: {
      orderId: orderNumber,
    },
  };
  return (
    <ViewWithSpacing spacingStyles="margin-bottom-LRG">
      <OrdersTypeContainer>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={getLabelValue(labels, 'lbl_ordersTile_orderNum', 'orders')}
          color="gray.900"
        />
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text=": "
          color="gray.900"
        />
        <Anchor
          text={orderNumber}
          fontSizeVariation="large"
          underline
          noLink
          anchorVariation="primary"
          fontSize="fs14"
          dataLocator="order-number-value"
          fontFamily="secondary"
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
      </OrdersTypeContainer>
      <OrdersTypeContainer>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={getLabelValue(labels, 'lbl_orders_orderDate', 'orders')}
          color="gray.900"
        />
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text=": "
          color="gray.900"
        />
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={orderDate}
          color="gray.900"
        />
      </OrdersTypeContainer>
      <OrdersTypeContainer>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={getLabelValue(labels, 'lbl_ordersTile_purchase', 'orders')}
          color="gray.900"
        />
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text=": "
          color="gray.900"
        />
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={
            isEcomOrder
              ? getLabelValue(labels, 'lbl_orders_online', 'orders')
              : getLabelValue(labels, 'lbl_orders_pickupStore', 'orders')
          }
          color="gray.900"
        />
      </OrdersTypeContainer>
      <OrdersTypeContainer>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={getLabelValue(labels, 'lbl_orders_orderStatus', 'orders')}
          color="gray.900"
        />
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text=": "
          color="gray.900"
        />
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={getLabelValue(labels, orderStatus, 'orders')}
          color="gray.900"
        />
      </OrdersTypeContainer>
      <OrdersTypeContainer>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={getLabelValue(labels, 'lbl_orders_orderTotal', 'orders')}
          color="gray.900"
        />
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text=": "
          color="gray.900"
        />
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={orderTotal}
          color="gray.900"
        />
      </OrdersTypeContainer>
    </ViewWithSpacing>
  );
};

OrdersTileItem.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  orderItem: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default OrdersTileItem;
