import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import styles from '../styles/ThankYouTitleDisplay.styles';
import withStyles from '../../../../../../common/hoc/withStyles';

/**
 * @function ThankYouTitleDisplay
 * @description renders the thank you title component with description.
 */
const ThankYouTitleDisplay = ({
  className,
  labels,
  emailAddress,
  isOrderPending,
  isShowShippingMessage,
  isShowBopisMessage,
  isShowMixedMessage,
}) => {
  let confirmationMessage = '';
  if (isShowMixedMessage) {
    confirmationMessage = (
      <BodyCopy fontFamily="secondary" fontSize="fs18" textAlign="center">
        {`${labels.mixOrderMsg1} ${emailAddress} ${labels.mixOrderMsg2}`}
      </BodyCopy>
    );
  } else {
    confirmationMessage = (
      <BodyCopy fontFamily="secondary" fontSize="fs18" textAlign="center">
        {`${labels.orderMsg1} ${
          isShowShippingMessage ? labels.shippingMsg : isShowBopisMessage && labels.pickup
        }
        ${labels.orderMsg2} ${emailAddress}`}
      </BodyCopy>
    );
  }
  return (
    <div className={className}>
      <Row fullBleed>
        <Col
          colSize={{
            large: 12,
            medium: 6,
            small: 6,
          }}
          offsetLeft={{
            large: 0,
            medium: 1,
            small: 0,
          }}
          offsetRight={{
            large: 0,
            medium: 1,
            small: 0,
          }}
        >
          <BodyCopy
            className="thank-you-heading"
            fontFamily="primary"
            textAlign="center"
            fontWeight="black"
            fontSize={['fs36', 'fs36', 'fs38']}
          >
            {labels.thankYouHeading}
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed>
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
        >
          {isOrderPending && (
            <BodyCopy fontFamily="secondary" fontSize="fs18" textAlign="center">
              {labels.pendingOrderMsg}
            </BodyCopy>
          )}
        </Col>
      </Row>
      <Row fullBleed>
        <Col
          colSize={{
            large: 10,
            medium: 8,
            small: 6,
          }}
          offsetLeft={{
            large: 1,
            medium: 0,
            small: 0,
          }}
          offsetRight={{
            large: 1,
            medium: 0,
            small: 0,
          }}
        >
          {confirmationMessage}
        </Col>
      </Row>
    </div>
  );
};
ThankYouTitleDisplay.propTypes = {
  className: PropTypes.string,

  /** indicates order payment is processing */
  isOrderPending: PropTypes.bool,

  /** email address of the user that placed the order */
  emailAddress: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  orderShippingDetails: PropTypes.shape({}),
  isShowShippingMessage: PropTypes.bool,
  isShowBopisMessage: PropTypes.bool,
  isShowMixedMessage: PropTypes.bool,
};
ThankYouTitleDisplay.defaultProps = {
  className: '',
  isOrderPending: false,
  orderShippingDetails: null,
  isShowShippingMessage: false,
  isShowBopisMessage: false,
  isShowMixedMessage: false,
};

export default withStyles(ThankYouTitleDisplay, styles);
export { ThankYouTitleDisplay as ThankYouTitleDisplayVanilla };
