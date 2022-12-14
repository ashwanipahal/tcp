import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue, getOrderStatusForNotification } from '@tcp/core/src/utils/utils';
import { routerPush } from '@tcp/core/src/utils';
import internalEndpoints from '../../common/internalEndpoints';
import constants from '../../OrderDetails/OrderDetails.constants';
import styles from '../styles/OrderNotification.style';

const handleClick = (e, closedOverlay, orderNumber) => {
  e.preventDefault();
  closedOverlay();
  routerPush(
    `${internalEndpoints.orderPage.link}&orderId=${orderNumber}`,
    `${internalEndpoints.orderPage.path}/${orderNumber}`
  );
};

/**
 * This function component use for Order Notification
 * can be passed in the component.
 */
const OrderNotification = ({ className, labels, order, closedOverlay }) => {
  const orderStatus = order ? getOrderStatusForNotification(order.orderStatus) : '';
  return (
    <>
      {order && order.orderNumber && (
        <BodyCopy component="div" className={className}>
          <BodyCopy
            component="div"
            className="elem-ml-MED elem-mr-MED elem-pt-LRG elem-pb-LRG separator-line"
          >
            {orderStatus && (
              <BodyCopy
                className="elem-mb-SM"
                color="white"
                fontSize="fs18"
                fontWeight="extrabold"
                fontFamily="secondary"
              >
                {getLabelValue(labels, orderStatus, 'OrderNotification')}
              </BodyCopy>
            )}

            <BodyCopy component="div">
              <BodyCopy component="span" color="white" fontSize="fs12" fontFamily="secondary">
                {getLabelValue(labels, 'lbl_global_order', 'OrderNotification')}
              </BodyCopy>

              <Anchor
                fontSizeVariation="medium"
                underline
                anchorVariation="primary"
                fontSize="fs12"
                dataLocator="order-number-value"
                onClick={e => handleClick(e, closedOverlay, order.orderNumber)}
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
                onClick={e => handleClick(e, closedOverlay, order.orderNumber)}
              >
                {getLabelValue(labels, 'lbl_global_viewOrderDetails', 'OrderNotification')}
              </Anchor>
            </BodyCopy>
            {order.orderTrackingUrl && !order.isBOSSOrder && (
              <BodyCopy component="div" className="elem-mt-SM">
                <BodyCopy component="span" color="white" fontSize="fs12" fontFamily="secondary">
                  {getLabelValue(labels, 'lbl_global_tracking', 'OrderNotification')}
                </BodyCopy>

                {order.orderTrackingUrl !== constants.STATUS_CONSTANTS.NA ? (
                  <Anchor
                    fontSizeVariation="medium"
                    anchorVariation="secondary"
                    underline
                    className="view-order-link"
                    url={order.orderTrackingUrl}
                    target="_blank"
                  >
                    {order.orderTracking}
                  </Anchor>
                ) : (
                  <BodyCopy component="span" color="white" fontSize="fs12" fontFamily="secondary">
                    {order.orderTracking}
                  </BodyCopy>
                )}
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
        </BodyCopy>
      )}
    </>
  );
};
OrderNotification.propTypes = {
  order: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  closedOverlay: PropTypes.func.isRequired,
};

OrderNotification.defaultProps = {
  order: {},
  className: '',
};

export default withStyles(OrderNotification, styles);
export { OrderNotification as OrderNotificationVanilla };
