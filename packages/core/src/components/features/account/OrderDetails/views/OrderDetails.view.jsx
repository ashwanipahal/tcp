/* eslint-disable complexity */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import config from '@tcp/core/src/config/orderConfig';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../styles/OrderDetails.style';
import OrderBasicDetails from '../organism/OrderBasicDetails';
import OrderShippingDetails from '../organism/OrderShippingDetails';
import OrderBillingDetails from '../organism/OrderBillingDetails';
import OrderSummaryDetails from '../organism/OrderSummaryDetails';
// import OrderItemsWithStatus from '../organism/OrderItemsWithStatus';
import OrderItemsList from '../organism/OrderItemsList';
import OrderStatus from '../organism/OrderStatus';
import constants from '../OrderDetails.constants';

import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';

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
      pickUpExpirationDate,
      // checkout,
      summary,
      // appliedGiftCards,
      status,
      pickedUpDate,
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
    const notificationHeader = isBossOrder ? 'No Longer Available: ' : 'Canceled Items: ';
    const notificationMessage = isBossOrder
      ? 'The following has been removed from your order due to availability issues. The items will not be shipped. You will not be charged'
      : 'This order has been canceled and will not be shipped.';
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
                  <Col colSize={{ large: 6, medium: 8, small: 6 }}>
                    <OrderShippingDetails
                      orderDetailsData={orderDetailsData}
                      ordersLabels={ordersLabels}
                    />
                  </Col>
                </Row>
              </Col>
              <Col colSize={{ large: 6, medium: 4, small: 6 }}>
                <Row fullBleed>
                  <Col colSize={{ large: 6, medium: 8, small: 6 }}>
                    <OrderBillingDetails
                      orderDetailsData={orderDetailsData}
                      ordersLabels={ordersLabels}
                    />
                  </Col>
                  <Col colSize={{ large: 6, medium: 8, small: 6 }}>
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
                <Row fullBleed className="group-row purchasedItemsMargin">
                  <OrderStatus
                    status={orderGroup.status}
                    trackingNumber={orderGroup.trackingNumber}
                    trackingUrl={orderGroup.trackingUrl}
                    shippedDate={orderGroup.shippedDate}
                    isBopisOrder={isBopisOrder}
                  />
                  {/* <Col colSize={{ large: 12, medium: 8, small: 6 }}>
                    <Col className="elem-mb-MED" colSize={{ large: 12, medium: 8, small: 6 }}>
                      <BodyCopy component="span" fontSize="fs14" fontFamily="secondary">
                        {'Purchased Items: '}
                      </BodyCopy>

                      <BodyCopy
                        fontWeight="extrabold"
                        component="span"
                        fontSize="fs14"
                        fontFamily="secondary"
                      >
                        {summary.purchasedItems}
                      </BodyCopy>
                    </Col>
                  </Col> */}
                  <Col colSize={{ large: 12, medium: 8, small: 6 }}>
                    <OrderItemsList
                      key={index.toString()}
                      ordersLabels={ordersLabels}
                      items={orderGroup.items}
                      currencySymbol={currencySymbol}
                      isShowWriteReview={
                        orderGroup.status === constants.STATUS_CONSTANTS.ORDER_SHIPPED ||
                        status === constants.STATUS_CONSTANTS.ORDER_PARTIALLY_SHIPPED
                      }
                    />
                  </Col>
                </Row>
              ))}

            {(isBossOrder || isBopisOrder) && purchasedItems && purchasedItems.length > 0 && (
              <Row fullBleed className="group-row">
                {isBopisOrder && (
                  <OrderStatus
                    status={status}
                    pickUpExpirationDate={pickUpExpirationDate}
                    pickedUpDate={pickedUpDate}
                    isBopisOrder={isBopisOrder}
                  />
                )}
                <Col className="elem-mb-MED" colSize={{ large: 12, medium: 8, small: 6 }}>
                  <BodyCopy component="span" fontSize="fs14" fontFamily="secondary">
                    {'Purchased Items: '}
                  </BodyCopy>

                  <BodyCopy
                    component="span"
                    fontWeight="extrabold"
                    fontSize="fs14"
                    fontFamily="secondary"
                  >
                    {summary.purchasedItems}
                  </BodyCopy>
                </Col>
                <Col colSize={{ large: 12, medium: 8, small: 6 }}>
                  <OrderItemsList
                    ordersLabels={ordersLabels}
                    items={purchasedItems[0].items}
                    currencySymbol={currencySymbol}
                    isShowWriteReview={
                      isBopisOrder ? true : status === constants.STATUS_CONSTANTS.ORDER_PICKED
                    }
                  />
                </Col>
              </Row>
            )}

            {outOfStockItems && outOfStockItems.length > 0 && (
              <Row fullBleed className="group-row">
                <Col className="elem-mb-MED" colSize={{ large: 12, medium: 8, small: 6 }}>
                  <BodyCopy component="span" fontSize="fs16" fontFamily="secondary">
                    Out of Stock:
                  </BodyCopy>

                  <BodyCopy
                    fontWeight="extrabold"
                    component="span"
                    fontSize="fs16"
                    fontFamily="secondary"
                  >
                    {outOfStockItems.length}
                  </BodyCopy>
                </Col>
                <Col className="elem-mb-MED" colSize={{ large: 12, medium: 8, small: 6 }}>
                  <BodyCopy fontSize="fs14" fontFamily="secondary">
                    Unfortunately some items were out of stock and could not be shipped. You have
                    been fully refunded.
                  </BodyCopy>
                </Col>
                <Col colSize={{ large: 12, medium: 8, small: 6 }}>
                  <OrderItemsList
                    ordersLabels={ordersLabels}
                    items={outOfStockItems}
                    currencySymbol={currencySymbol}
                    isShowWriteReview={false}
                  />
                </Col>
              </Row>
            )}

            {canceledItems && canceledItems.length > 0 && (
              <Row fullBleed className="group-row">
                <Col className="elem-mb-MED" colSize={{ large: 12, medium: 8, small: 6 }}>
                  <BodyCopy component="span" fontSize="fs16" fontFamily="secondary">
                    {notificationHeader}
                  </BodyCopy>

                  <BodyCopy
                    fontWeight="extrabold"
                    component="span"
                    fontSize="fs16"
                    className="itemInfo_details_items_leftMargin"
                    fontFamily="secondary"
                  >
                    {canceledItems.length}
                  </BodyCopy>
                </Col>
                <Col className="elem-mb-MED" colSize={{ large: 12, medium: 8, small: 6 }}>
                  <BodyCopy fontSize="fs14" fontFamily="secondary">
                    {notificationMessage}
                  </BodyCopy>
                </Col>
                <Col colSize={{ large: 12, medium: 8, small: 6 }}>
                  <OrderItemsList
                    ordersLabels={ordersLabels}
                    items={canceledItems.items}
                    currencySymbol={currencySymbol}
                    isShowWriteReview={false}
                  />
                </Col>
              </Row>
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
