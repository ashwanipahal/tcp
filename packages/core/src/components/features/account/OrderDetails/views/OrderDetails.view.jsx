import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import config from '@tcp/core/src/utils/config/config';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../styles/OrderDetails.style';
import OrderBasicDetails from '../organism/OrderBasicDetails';
import OrderShippingDetails from '../organism/OrderShippingDetails';
import OrderBillingDetails from '../organism/OrderBillingDetails';
import OrderSummaryDetails from '../organism/OrderSummaryDetails';
import OrderItemsWithStatus from '../organism/OrderItemsWithStatus';

import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';

/**
 * This function component use for return the EarnPoints
 * can be passed in the component.
 * @param waysToEarn - waysToEarn object used for showing extra points details
 */

class OrderDetailsView extends PureComponent {
  render() {
    const { OrderDetailsData, className, OrdersLabels } = this.props;
    const { purchasedItems } = OrderDetailsData || {};

    console.log('------------------------------');
    console.log(purchasedItems);
    console.log('------------------------------');

    return (
      <div className={className}>
        <FormPageHeadingComponent heading={getLabelValue(OrdersLabels, 'lbl_orderDetails_heading')} />
        {OrderDetailsData && (
          <>
            <Row fullBleed className="elem-mt-XL">
              <Col colSize={{ large: 6, medium: 4, small: 6 }}>
                <Row fullBleed>
                  <Col colSize={{ large: 6, medium: 8, small: 6 }}>
                    <OrderBasicDetails
                      OrderDetailsData={OrderDetailsData}
                      OrdersLabels={OrdersLabels}
                    />
                  </Col>
                  <Col colSize={{ large: 6, medium: 8, small: 6 }}>
                    <OrderShippingDetails
                      OrderDetailsData={OrderDetailsData}
                      OrdersLabels={OrdersLabels}
                    />
                  </Col>
                </Row>
              </Col>
              <Col colSize={{ large: 6, medium: 4, small: 6 }}>
                <Row fullBleed>
                  <Col colSize={{ large: 6, medium: 8, small: 6 }}>
                    <OrderBillingDetails
                      OrderDetailsData={OrderDetailsData}
                      OrdersLabels={OrdersLabels}
                    />
                  </Col>
                  <Col colSize={{ large: 6, medium: 8, small: 6 }}>
                    <OrderSummaryDetails
                      OrderDetailsData={OrderDetailsData}
                      OrdersLabels={OrdersLabels}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            {purchasedItems && (
              <Row fullBleed className="purchasedItemsMargin">
                {OrderDetailsData.orderType === config.ORDER_ITEM_TYPE.ECOM &&
                  purchasedItems.length > 0 &&
                  purchasedItems.map((orderGroup, index) => (
                    <Col colSize={{ large: 6, medium: 3, small: 6 }}>
                      <OrderItemsWithStatus
                        key={index.toString()}
                        {...{ orderGroup }}
                        OrdersLabels={OrdersLabels}
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
  OrderDetailsData: PropTypes.shape([]),
  OrdersLabels: PropTypes.shape([]),
};

OrderDetailsView.defaultProps = {
  className: '',
  OrdersLabels: [],
  OrderDetailsData: [],
};

export default withStyles(OrderDetailsView, styles);
export { OrderDetailsView as OrderDetailsViewVanilla };
