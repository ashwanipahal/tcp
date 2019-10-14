/* eslint-disable complexity */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { BodyCopy, Row, Col, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import constants from '../../../OrderDetails.constants';

/**
 * This function component use for return the OrderItemsWithStatus
 * can be passed in the component.
 * @param otherProps - otherProps object used pass params to other component
 */

class OrderStatus extends PureComponent {
  getLabelAndMessage = () => {
    let label;
    let message;
    const {
      status,
      shippedDate,
      pickUpExpirationDate,
      pickedUpDate,
      isBopisOrder,
      ordersLabels,
    } = this.props;

    switch (status) {
      case constants.STATUS_CONSTANTS.ORDER_IN_PROCESS:
      case constants.STATUS_CONSTANTS.ORDER_RECEIVED:
      case constants.STATUS_CONSTANTS.ORDER_USER_CALL_NEEDED:
        if (isBopisOrder) {
          label = getLabelValue(ordersLabels, 'lbl_orders_orderInProcess');
          message = getLabelValue(ordersLabels, 'lbl_orders_orderIsReadyForPickup');
          break;
        }
        label = getLabelValue(ordersLabels, 'lbl_orders_statusOrderReceived');
        message = getLabelValue(ordersLabels, 'lbl_orders_processing');
        break;
      case constants.STATUS_CONSTANTS.ORDER_SHIPPED:
      case constants.STATUS_CONSTANTS.ORDER_PARTIALLY_SHIPPED:
        label = getLabelValue(ordersLabels, 'lbl_orders_shippedOn');
        message = shippedDate === constants.STATUS_CONSTANTS.NA ? shippedDate : moment(shippedDate);
        break;
      case constants.STATUS_CONSTANTS.ORDER_CANCELED:
      case constants.STATUS_CONSTANTS.ORDER_EXPIRED:
        label = '';
        message = getLabelValue(ordersLabels, 'lbl_orders_orderCancelMessage');
        break;
      case constants.STATUS_CONSTANTS.ITEMS_RECEIVED:
        label = getLabelValue(ordersLabels, 'lbl_orders_orderInProcess');
        message = getLabelValue(ordersLabels, 'lbl_orders_orderIsReadyForPickup');
        break;
      case constants.STATUS_CONSTANTS.ITEMS_READY_FOR_PICKUP:
        label = getLabelValue(ordersLabels, 'lbl_orders_pleasePickupBy');
        message = moment(pickUpExpirationDate);
        break;
      case constants.STATUS_CONSTANTS.ITEMS_PICKED_UP:
        label = getLabelValue(ordersLabels, 'lbl_orders_pickedUpOn');
        message = moment(pickedUpDate);
        break;
      default:
        label = null;
        message = null;
        break;
    }

    return { label, message };
  };

  render() {
    const { isBopisOrder, trackingNumber, trackingUrl, ordersLabels } = this.props;
    const { label, message } = this.getLabelAndMessage();
    return (
      <Row fullBleed className="elem-mb-XL">
        <Col className="elem-pt-MED elem-pb-MED" colSize={{ large: 9, medium: 8, small: 6 }}>
          <BodyCopy component="span" fontSize="fs16" fontFamily="secondary">
            {label}
          </BodyCopy>

          <BodyCopy fontWeight="extrabold" component="span" fontSize="fs16" fontFamily="secondary">
            {message}
          </BodyCopy>

          {!isBopisOrder && trackingNumber && trackingNumber !== constants.STATUS_CONSTANTS.NA && (
            <>
              <BodyCopy className="orderDetail-trackingNumber-pipe" component="span">
                {' | '}
              </BodyCopy>
              <BodyCopy
                component="span"
                fontSize="fs16"
                fontWeight="extrabold"
                fontFamily="secondary"
              >
                {getLabelValue(ordersLabels, 'lbl_orders_trackingNumber')}
              </BodyCopy>
              <BodyCopy component="span" fontSize="fs16" fontFamily="secondary">
                {trackingNumber}
              </BodyCopy>
            </>
          )}
        </Col>

        {!isBopisOrder && trackingUrl && trackingUrl !== constants.STATUS_CONSTANTS.NA && (
          <Col className="button-Container" colSize={{ large: 3, medium: 0, small: 6 }}>
            <Anchor
              to={trackingUrl}
              anchorVariation="button"
              buttonVariation="fixed-width"
              fill="BLUE"
              centered
              className="button-track"
              dataLocator={trackingNumber}
            >
              {getLabelValue(ordersLabels, 'lbl_orders_trackit')}
            </Anchor>
          </Col>
        )}
      </Row>
    );
  }
}
OrderStatus.propTypes = {
  /** status of the order */
  status: PropTypes.string.isRequired,
  trackingNumber: PropTypes.string,
  trackingUrl: PropTypes.string,
  shippedDate: PropTypes.string,
  pickUpExpirationDate: PropTypes.string,
  pickedUpDate: PropTypes.string,
  isBopisOrder: PropTypes.bool.isRequired,
  ordersLabels: PropTypes.shape({
    lbl_orderDetails_shipping: PropTypes.string,
  }),
};

OrderStatus.defaultProps = {
  trackingNumber: '',
  trackingUrl: '',
  shippedDate: '',
  pickUpExpirationDate: '',
  pickedUpDate: '',
  ordersLabels: {
    lbl_orderDetails_shipping: '',
  },
};

export default OrderStatus;
