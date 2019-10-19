import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import config from '@tcp/core/src/config/orderConfig';

import OrderBasicDetails from '../organism/OrderBasicDetails';
import OrderShippingDetails from '../organism/OrderShippingDetails';
import OrderBillingDetails from '../organism/OrderBillingDetails';
import OrderSummaryDetails from '../organism/OrderSummaryDetails';

import OrderItemsList from '../organism/OrderItemsList';
import OrderStatus from '../organism/OrderStatus';
import OrderGroupHeader from '../organism/OrderGroupHeader';
import OrderGroupNotification from '../organism/OrderGroupNotification';
import constants from '../OrderDetails.constants';

/**
 * This function component use for rendering Bopis and Boss orders
 * can be passed in the component.
 * @param orderDetailsData - orderDetailsData object used for showing Order Details
 */

const renderBopisAndBossOrder = (orderDetailsData, ordersLabels) => {
  const {
    pickUpExpirationDate,
    summary,
    orderStatus,
    pickedUpDate,
    purchasedItems,
    isBossOrder,
    isBopisOrder,
  } = orderDetailsData || {};
  const { currencySymbol } = summary || {};
  return (
    (isBossOrder || isBopisOrder) &&
    purchasedItems &&
    purchasedItems.length > 0 && (
      <>
        {isBopisOrder && (
          <OrderStatus
            status={orderStatus}
            pickUpExpirationDate={pickUpExpirationDate}
            pickedUpDate={pickedUpDate}
            isBopisOrder={isBopisOrder}
            ordersLabels={ordersLabels}
          />
        )}
        <OrderGroupHeader
          label={getLabelValue(ordersLabels, 'lbl_orders_purchasedItems')}
          message={summary.purchasedItems}
        />
        <OrderItemsList
          ordersLabels={ordersLabels}
          items={purchasedItems[0].items}
          currencySymbol={currencySymbol}
          isShowWriteReview={
            isBopisOrder ? true : orderStatus === constants.STATUS_CONSTANTS.ORDER_PICKED
          }
        />
      </>
    )
  );
};

/**
 * This function component use for rendering Cancelled and Out of Stock orders
 * can be passed in the component.
 * @param orderDetailsData - orderDetailsData object used for showing Order Details
 */

const renderCancelledAndOutOfStockOrders = (
  items,
  ordersLabels,
  currencySymbol,
  headerLabel,
  notificationMessage
) => {
  return (
    items &&
    items.length > 0 && (
      <>
        <OrderGroupHeader label={headerLabel} message={items.length} />
        <OrderGroupNotification message={notificationMessage} />
        <OrderItemsList
          ordersLabels={ordersLabels}
          items={items}
          currencySymbol={currencySymbol}
          isShowWriteReview={false}
        />
      </>
    )
  );
};
export const OrderDetailsView = ({ orderDetailsData, ordersLabels }) => {
  const {
    summary,
    orderStatus,
    purchasedItems,
    isBopisOrder,
    canceledItems,
    outOfStockItems,
    isBossOrder,
  } = orderDetailsData || {};
  const { currencySymbol } = summary || {};
  const notificationHeader = isBossOrder
    ? getLabelValue(ordersLabels, 'lbl_orders_noLongerAvailable')
    : getLabelValue(ordersLabels, 'lbl_orders_canceledItems');
  const notificationMessage = isBossOrder
    ? getLabelValue(ordersLabels, 'lbl_orders_isBossOrderCancelNotification')
    : getLabelValue(ordersLabels, 'lbl_orders_CancelNotification');
  return (
    <ScrollView>
      {orderDetailsData && (
        <ViewWithSpacing spacingStyles="margin-left-MED margin-right-MED">
          <OrderBasicDetails orderDetailsData={orderDetailsData} ordersLabels={ordersLabels} />
          <OrderShippingDetails orderDetailsData={orderDetailsData} ordersLabels={ordersLabels} />
          <OrderBillingDetails orderDetailsData={orderDetailsData} ordersLabels={ordersLabels} />
          <OrderSummaryDetails orderDetailsData={orderDetailsData} ordersLabels={ordersLabels} />
          {orderDetailsData.orderType === config.ORDER_ITEM_TYPE.ECOM &&
            purchasedItems &&
            purchasedItems.length > 0 &&
            purchasedItems.map((orderGroup, index) => (
              <>
                <OrderStatus
                  status={orderGroup.orderStatus}
                  trackingNumber={orderGroup.trackingNumber}
                  trackingUrl={orderGroup.trackingUrl}
                  shippedDate={orderGroup.shippedDate}
                  isBopisOrder={isBopisOrder}
                  ordersLabels={ordersLabels}
                />

                <OrderItemsList
                  key={index.toString()}
                  ordersLabels={ordersLabels}
                  items={orderGroup.items}
                  currencySymbol={currencySymbol}
                  isShowWriteReview={
                    orderGroup.orderStatus === constants.STATUS_CONSTANTS.ORDER_SHIPPED ||
                    orderStatus === constants.STATUS_CONSTANTS.ORDER_PARTIALLY_SHIPPED
                  }
                />
              </>
            ))}

          {renderBopisAndBossOrder(orderDetailsData, ordersLabels)}
          {renderCancelledAndOutOfStockOrders(
            outOfStockItems,
            ordersLabels,
            currencySymbol,
            getLabelValue(ordersLabels, 'lbl_orders_outOfStock'),
            getLabelValue(ordersLabels, 'lbl_orders_outOfStockNotification')
          )}

          {renderCancelledAndOutOfStockOrders(
            canceledItems,
            ordersLabels,
            currencySymbol,
            notificationHeader,
            notificationMessage
          )}
        </ViewWithSpacing>
      )}
    </ScrollView>
  );
};

OrderDetailsView.propTypes = {
  orderDetailsData: PropTypes.shape({}),
  ordersLabels: PropTypes.shape({}),
};

OrderDetailsView.defaultProps = {
  ordersLabels: {},
  orderDetailsData: {},
};

export default OrderDetailsView;
