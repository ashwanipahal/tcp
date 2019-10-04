import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

/**
 * @function ThankYouTitleDisplay
 * @description renders the thank you title component with description.
 */
const ThankYouTitleDisplay = ({
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
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs18"
        textAlign="center"
        text={`${labels.mixOrderMsg1} ${emailAddress} ${labels.mixOrderMsg2}`}
      />
    );
  } else {
    confirmationMessage = (
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs18"
        textAlign="center"
        text={`${labels.orderMsg1} ${
          isShowShippingMessage ? labels.shippingMsg : isShowBopisMessage && labels.pickup
        }
        ${labels.orderMsg2} ${emailAddress}`}
      />
    );
  }
  return (
    <>
      <BodyCopy
        fontFamily="primary"
        textAlign="center"
        fontWeight="black"
        fontSize={['fs36', 'fs36', 'fs38']}
        text={labels.thankYouHeading}
      />

      {isOrderPending && (
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs18"
          textAlign="center"
          text={labels.pendingOrderMsg}
        />
      )}

      <BodyCopy
        fontFamily="secondary"
        fontSize="fs18"
        textAlign="center"
        text={confirmationMessage}
      />
    </>
  );
};
ThankYouTitleDisplay.propTypes = {
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
  isOrderPending: false,
  orderShippingDetails: null,
  isShowShippingMessage: false,
  isShowBopisMessage: false,
  isShowMixedMessage: false,
};

export default ThankYouTitleDisplay;
