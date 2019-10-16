import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Row, Col, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue, getOrderGroupLabelAndMessage } from '@tcp/core/src/utils/utils';
import constants from '../../../OrderDetails.constants';

/**
 * This function component use for return the Order Status
 * can be passed in the component.
 * @param otherProps - otherProps object used pass params to other component
 */

const OrderStatus = props => {
  const { isBopisOrder, trackingNumber, trackingUrl, ordersLabels } = props;
  const { label, message } = getOrderGroupLabelAndMessage(props);
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
            <BodyCopy className="orderDetail-trackingNumber">
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
            </BodyCopy>
          </>
        )}
      </Col>

      {!isBopisOrder && trackingUrl && trackingUrl !== constants.STATUS_CONSTANTS.NA && (
        <Col className="button-container" colSize={{ large: 3, medium: 0, small: 6 }}>
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
};
OrderStatus.propTypes = {
  trackingNumber: PropTypes.string,
  trackingUrl: PropTypes.string,
  isBopisOrder: PropTypes.bool.isRequired,
  ordersLabels: PropTypes.shape({
    lbl_orderDetails_shipping: PropTypes.string,
  }),
};

OrderStatus.defaultProps = {
  trackingNumber: '',
  trackingUrl: '',
  ordersLabels: {
    lbl_orderDetails_shipping: '',
  },
};

export default OrderStatus;
