import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Row, Col, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  getLabelValue,
  getOrderStatusForNotification,
  validateDiffInDaysNotification,
} from '@tcp/core/src/utils/utils';

import styles from '../styles/OrderNotification.style';
import internalEndpoints from '../../common/internalEndpoints';
import constants from '../../OrderDetails/OrderDetails.constants';

/**
 * This function component use for Order Notification
 * can be passed in the component.
 */
const OrderNotification = ({
  className,
  labels,
  order,
  limitOfDaysToDisplayNotification,
  isTransactionNotificationsInMyAccountEnabled,
}) => {
  return (
    <>
      {isTransactionNotificationsInMyAccountEnabled &&
        order &&
        validateDiffInDaysNotification(order.orderDate, limitOfDaysToDisplayNotification) && (
          <Row fullBleed component="div" className={className}>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <BodyCopy
                component="div"
                className="elem-ml-MED elem-mr-MED elem-pt-LRG elem-pb-LRG separator-line"
              >
                <BodyCopy
                  color="white"
                  fontSize="fs18"
                  fontWeight="extrabold"
                  fontFamily="secondary"
                >
                  {getLabelValue(
                    labels,
                    getOrderStatusForNotification(order.status),
                    'OrderNotification'
                  )}
                </BodyCopy>

                <BodyCopy component="div" className="elem-mt-SM">
                  <BodyCopy component="span" color="white" fontSize="fs12" fontFamily="secondary">
                    {getLabelValue(labels, 'lbl_global_order', 'OrderNotification')}
                  </BodyCopy>

                  <Anchor
                    fontSizeVariation="medium"
                    underline
                    anchorVariation="primary"
                    fontSize="fs12"
                    dataLocator="order-number-value"
                    to={`${internalEndpoints.orderPage.link}&orderId=${order.orderNumber}`}
                    asPath={`${internalEndpoints.orderPage.path}/${order.orderNumber}`}
                    fontFamily="secondary"
                    className="view-order-link"
                  >
                    {order.orderNumber}
                  </Anchor>
                  <Anchor
                    fontSizeVariation="medium"
                    anchorVariation="secondary"
                    underline
                    className="view-order-link elem-ml-LRG"
                    to={`${internalEndpoints.orderPage.link}&orderId=${order.orderNumber}`}
                    asPath={`${internalEndpoints.orderPage.path}/${order.orderNumber}`}
                  >
                    {getLabelValue(labels, 'lbl_global_viewOrderDetails', 'OrderNotification')}
                  </Anchor>
                </BodyCopy>
                {order.trackingUrl && order.trackingUrl !== constants.STATUS_CONSTANTS.NA && (
                  <BodyCopy component="div" className="elem-mt-SM">
                    <BodyCopy component="span" color="white" fontSize="fs12" fontFamily="secondary">
                      {getLabelValue(labels, 'lbl_global_tracking', 'OrderNotification')}
                    </BodyCopy>
                    <Anchor
                      fontSizeVariation="medium"
                      anchorVariation="secondary"
                      underline
                      href={order.orderTrackingUrl}
                      className="view-order-link"
                      to={order.trackingUrl}
                      target="_blank"
                    >
                      {order.orderTracking}
                    </Anchor>
                  </BodyCopy>
                )}

                <BodyCopy
                  component="p"
                  className="elem-mt-SM"
                  color="white"
                  fontSize="fs12"
                  fontFamily="secondary"
                >
                  {`${getLabelValue(labels, 'lbl_global_orderedOn', 'OrderNotification')} ${
                    order.orderDate
                  }`}
                </BodyCopy>
              </BodyCopy>
            </Col>
          </Row>
        )}
    </>
  );
};
OrderNotification.propTypes = {
  className: PropTypes.string,
  order: PropTypes.shape({}),
  limitOfDaysToDisplayNotification: PropTypes.number.isRequired,
  labels: PropTypes.shape({}).isRequired,
  isTransactionNotificationsInMyAccountEnabled: PropTypes.bool.isRequired,
};

OrderNotification.defaultProps = {
  className: '',
  order: {},
};

export default withStyles(OrderNotification, styles);
export { OrderNotification as OrderNotificationVanilla };
