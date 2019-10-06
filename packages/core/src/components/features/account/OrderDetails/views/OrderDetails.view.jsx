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
import OrderItemsWithStatus from '../organism/OrderItemsWithStatus';

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
      // pickUpExpirationDate,
      // checkout,
      summary,
      // appliedGiftCards,
      // status,
      // pickedUpDate,
      purchasedItems,
      // outOfStockItems,
      // isBossOrder,
      // canceledItems,
      isBopisOrder,
      // orderType,
      // bossMaxDate,
      // bossMinDate,
    } = orderDetailsData || {};

    const { currencySymbol } = summary || {};

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
            {purchasedItems && (
              <Row fullBleed className="purchasedItemsMargin">
                {orderDetailsData.orderType === config.ORDER_ITEM_TYPE.ECOM &&
                  purchasedItems.length > 0 &&
                  purchasedItems.map((orderGroup, index) => (
                    <Col colSize={{ large: 6, medium: 3, small: 6 }}>
                      <OrderItemsWithStatus
                        key={index.toString()}
                        {...{ orderGroup }}
                        ordersLabels={ordersLabels}
                        isBopisOrder={isBopisOrder}
                        currencySymbol={currencySymbol}
                      />
                    </Col>
                  ))}
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
