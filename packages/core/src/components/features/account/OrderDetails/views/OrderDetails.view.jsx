import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import config from '@tcp/core/src/config/orderConfig';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../styles/OrderDetails.style';
import OrderBasicDetails from '../organism/OrderBasicDetails';
import OrderShippingDetails from '../organism/OrderShippingDetails';
import OrderBillingDetails from '../organism/OrderBillingDetails';
import OrderSummaryDetails from '../organism/OrderSummaryDetails';
import OrderItemsList from '../organism/OrderItemsList';
import OrderStatus from '../organism/OrderStatus';
import OrderGroupHeader from '../organism/OrderGroupHeader';
import OrderGroupNotification from '../organism/OrderGroupNotification';
import constants from '../OrderDetails.constants';

import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';

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
      <Row fullBleed className="group-row">
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
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <OrderItemsList
            ordersLabels={ordersLabels}
            items={purchasedItems[0].items}
            currencySymbol={currencySymbol}
            isShowWriteReview={
              isBopisOrder ? true : orderStatus === constants.STATUS_CONSTANTS.ORDER_PICKED
            }
          />
        </Col>
      </Row>
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
      <Row fullBleed className="group-row">
        <OrderGroupHeader label={headerLabel} message={items.length} />
        <OrderGroupNotification message={notificationMessage} />
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <OrderItemsList
            ordersLabels={ordersLabels}
            items={items}
            currencySymbol={currencySymbol}
            isShowWriteReview={false}
          />
        </Col>
      </Row>
    )
  );
};
/**
 * This function component use for return the OrderDetailsView
 * can be passed in the component.
 * @param orderDetailsData - orderDetailsData object used for showing Order Details
 */

class OrderDetailsView extends PureComponent {
  render() {
    const { orderDetailsData, className, ordersLabels } = this.props;

    const {
      // orderNumber,
      // orderDate,
      // pickUpExpirationDate,
      // checkout,
      summary,
      // appliedGiftCards,
      // status,
      orderStatus,
      // pickedUpDate,
      purchasedItems,
      outOfStockItems,
      isBossOrder,
      canceledItems,
      isBopisOrder,
      // orderType,
      // bossMaxDate,
      // bossMinDate,
    } = orderDetailsData || {};

    const { currencySymbol } = summary || {};
    const notificationHeader = isBossOrder
      ? getLabelValue(ordersLabels, 'lbl_orders_noLongerAvailable')
      : getLabelValue(ordersLabels, 'lbl_orders_canceledItems');
    const notificationMessage = isBossOrder
      ? getLabelValue(ordersLabels, 'lbl_orders_isBossOrderCancelNotification')
      : getLabelValue(ordersLabels, 'lbl_orders_CancelNotification');
    return (
      <div className={className}>
        <FormPageHeadingComponent
          heading={getLabelValue(ordersLabels, 'lbl_orderDetails_heading')}
        />
        {orderDetailsData && (
          <>
            <Row fullBleed className="elem-mt-XL">
              <Col colSize={{ large: 6, medium: 4, small: 6 }}>
                <Row fullBleed>
                  <Col colSize={{ large: 6, medium: 8, small: 6 }}>
                    <OrderBasicDetails
                      orderDetailsData={orderDetailsData}
                      ordersLabels={ordersLabels}
                    />
                  </Col>
                  <Col colSize={{ large: 6, medium: 8, small: 6 }} className="margin-tablet">
                    <OrderShippingDetails
                      orderDetailsData={orderDetailsData}
                      ordersLabels={ordersLabels}
                    />
                  </Col>
                </Row>
              </Col>
              <Col colSize={{ large: 6, medium: 4, small: 6 }}>
                <Row fullBleed>
                  <Col colSize={{ large: 5, medium: 8, small: 6 }} className="margin-mobile">
                    <OrderBillingDetails
                      orderDetailsData={orderDetailsData}
                      ordersLabels={ordersLabels}
                    />
                  </Col>
                  <Col colSize={{ large: 7, medium: 8, small: 6 }} className="margin-tablet">
                    <OrderSummaryDetails
                      orderDetailsData={orderDetailsData}
                      ordersLabels={ordersLabels}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            {orderDetailsData.orderType === config.ORDER_ITEM_TYPE.ECOM &&
              purchasedItems &&
              purchasedItems.length > 0 &&
              purchasedItems.map((orderGroup, index) => (
                <Row fullBleed className="group-row">
                  <OrderStatus
                    status={orderGroup.orderStatus}
                    trackingNumber={orderGroup.trackingNumber}
                    trackingUrl={orderGroup.trackingUrl}
                    shippedDate={orderGroup.shippedDate}
                    isBopisOrder={isBopisOrder}
                    ordersLabels={ordersLabels}
                  />

                  <Col colSize={{ large: 12, medium: 8, small: 6 }}>
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
                  </Col>
                </Row>
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
          </>
        )}
      </div>
    );
  }
}

OrderDetailsView.propTypes = {
  className: PropTypes.string,
  orderDetailsData: PropTypes.shape({}),
  ordersLabels: PropTypes.shape({}),
};

OrderDetailsView.defaultProps = {
  className: '',
  ordersLabels: {},
  orderDetailsData: {},
};

export default withStyles(OrderDetailsView, styles);
export { OrderDetailsView as OrderDetailsViewVanilla };
