/* eslint-disable complexity */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import moment from 'moment';
import { BodyCopy, Row, Col, Anchor } from '@tcp/core/src/components/common/atoms';
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
    const { status, shippedDate, pickUpExpirationDate, pickedUpDate, isBopisOrder } = this.props;

    switch (status) {
      case constants.STATUS_CONSTANTS.ORDER_RECEIVED:
      case constants.STATUS_CONSTANTS.ORDER_USER_CALL_NEEDED:
        if (isBopisOrder) {
          label = 'Order in Process';
          message = '- We will notify you when your order is ready for pickup';
          break;
        }
        label = 'Order Received: ';
        message = 'Processing';
        break;
      case constants.STATUS_CONSTANTS.ORDER_SHIPPED:
      case constants.STATUS_CONSTANTS.ORDER_PARTIALLY_SHIPPED:
        label = 'Shipped on: ';
        message = shippedDate === 'N/A' ? shippedDate : moment(shippedDate).format('LL');
        break;
      case constants.STATUS_CONSTANTS.ORDER_CANCELED:
      case constants.STATUS_CONSTANTS.ORDER_EXPIRED:
        label = '';
        message = 'This order has been canceled.';
        break;
      case constants.STATUS_CONSTANTS.ITEMS_RECEIVED:
        label = 'Order in Process';
        message = '- We will notify you when your order is ready for pickup';
        break;
      case constants.STATUS_CONSTANTS.ITEMS_READY_FOR_PICKUP:
        label = 'Please pick up by: ';
        message = `${moment(pickUpExpirationDate).format('LL')}`;
        break;
      case constants.STATUS_CONSTANTS.ITEMS_PICKED_UP:
        label = 'Picked up on: ';
        message = `${moment(pickedUpDate).format('LL')}`;
        break;
      default:
        invariant(false, `${status} is not one of the expected values for the order status.`);
    }

    return { label, message };
  };

  render() {
    const { isBopisOrder, trackingNumber, trackingUrl } = this.props;
    const { label, message } = this.getLabelAndMessage();
    return (
      <Row fullBleed className="elem-mb-XL">
        {label && message && (
          <Col className="elem-pt-MED elem-pb-MED" colSize={{ large: 9, medium: 8, small: 6 }}>
            <BodyCopy component="span" fontSize="fs16" fontFamily="secondary">
              {label}
            </BodyCopy>

            <BodyCopy
              fontWeight="extrabold"
              component="span"
              fontSize="fs16"
              fontFamily="secondary"
            >
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
                  {'Tracking number: '}
                </BodyCopy>
                <BodyCopy component="span" fontSize="fs16" fontFamily="secondary">
                  {trackingNumber}
                </BodyCopy>
              </>
            )}
          </Col>
        )}
        {!isBopisOrder && trackingUrl && trackingUrl !== constants.STATUS_CONSTANTS.NA && (
          <Col className="button-Container" colSize={{ large: 3, medium: 0, small: 6 }}>
            <Anchor
              to={trackingUrl}
              // asPath={ctaPath}
              anchorVariation="button"
              buttonVariation="fixed-width"
              // fullWidth
              fill="BLUE"
              centered
              className="button-track"
              dataLocator={trackingNumber}
            >
              TRACK IT
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
};

OrderStatus.defaultProps = {
  trackingNumber: '',
  trackingUrl: '',
  shippedDate: '',
  pickUpExpirationDate: '',
  pickedUpDate: '',
};

export default OrderStatus;
