import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
// import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';

import {
  OrdersListItemMainView,
  OrdersNumberWrapper,
  OrdersListItemView,
} from '../styles/OrdersListItem.style.native';

const OrdersListItem = ({ labels, orderItem, handleComponentChange }) => {
  const { orderDate, orderNumber, orderStatus, orderTotal, isEcomOrder } = orderItem;

  /**
   * @function handleOrderClick  to route to Order Details page based on order Number
   * @param    {Object} activeActivity The activity details of waysToEarn
   * @returns  {String} route for redirection mapping
   */
  const handleOrderClick = () => {
    const query = {
      orderId: orderNumber,
    };
    handleComponentChange('orderDetailsPageMobile', {}, { query });
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
              onPress={() => handleOrderClick()}
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
  handleComponentChange: PropTypes.func,
};
OrdersListItem.defaultProps = {
  handleComponentChange: () => {},
};

export default OrdersListItem;
export { OrdersListItem as OrdersListItemVanilla };
