import React from 'react';
import PropTypes from 'prop-types';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
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
        mobilefontFamily="secondary"
        fontSize="fs18"
        textAlign="center"
        text={`${labels.mixOrderMsg1} ${emailAddress} ${labels.mixOrderMsg2}`}
      />
    );
  } else {
    confirmationMessage = (
      <BodyCopy
        mobilefontFamily="secondary"
        fontSize="fs18"
        textAlign="center"
        text={`${labels.orderMsg1} ${
          isShowShippingMessage ? labels.shippingMsg : isShowBopisMessage && labels.pickup
        }${labels.orderMsg2} ${emailAddress}`}
      />
    );
  }
  return (
    <>
      <ViewWithSpacing spacingStyles="margin-top-XS margin-bottom-XS margin-left-MED margin-right-MED">
        <BodyCopy
          fontFamily={['primary']}
          textAlign="center"
          fontWeight="black"
          fontSize="fs36"
          text={labels.thankYouHeading}
        />
      </ViewWithSpacing>

      <ViewWithSpacing spacingStyles="margin-top-SM margin-left-LRG margin-right-LRG">
        {isOrderPending && (
          <BodyCopy
            mobilefontFamily="secondary"
            fontSize="fs16"
            textAlign="center"
            text={labels.pendingOrderMsg}
          />
        )}

        <BodyCopy
          mobilefontFamily="secondary"
          fontSize="fs16"
          textAlign="center"
          text={confirmationMessage}
        />
      </ViewWithSpacing>
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
