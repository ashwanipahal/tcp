import React from 'react';
import PropTypes from 'prop-types';
import ThankYouTitleDisplay from '../../../molecules/ThankYouTitleDisplay';
import ConfirmationFulfillmentCenterItemDisplay from '../../ConfirmationFulfillmentCenterItemDisplay';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import RichText from '../../../../../../common/atoms/RichText';
import {
  Container,
  RichTextContainer,
  CashBannerWrapper,
  BorderWrapper,
} from '../styles/ThankYouComponent.style.native';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';
/**
 * @function ThankYouComponent
 * @description wrapper for thank you component.
 */
const ThankYouComponent = ({
  isBossInList,
  orderNumbersByFullfillmentCenter,
  updateOrderDetailsData,
  fullfillmentCenterData,
  isGuest,
  emailAddress,
  isOrderPending,
  isShowShippingMessage,
  isShowBopisMessage,
  isShowMixedMessage,
  labels,
}) => {
  return (
    <>
      <ThankYouTitleDisplay
        emailAddress={emailAddress}
        isOrderPending={isOrderPending}
        isShowShippingMessage={isShowShippingMessage}
        isShowBopisMessage={isShowBopisMessage}
        isShowMixedMessage={isShowMixedMessage}
        labels={labels}
      />
      {/* Shipping only and mixed orders are handled from one component */}

      {fullfillmentCenterData &&
        fullfillmentCenterData.map((center, index) => (
          <ConfirmationFulfillmentCenterItemDisplay
            key={center.orderNumber}
            center={center}
            index={index}
            isGuest={isGuest}
            labels={labels}
          />
        ))}

      {isGuest && (
        <CashBannerWrapper>
          <BodyCopyWithSpacing
            textAlign="center"
            fontSize="fs16"
            fontWeight="extrabold"
            mobileFontFamily="secondary"
            spacingStyles="margin-top-LRG margin-bottom-LRG"
            text="Place Cash Banner"
          />
        </CashBannerWrapper>
      )}

      {orderNumbersByFullfillmentCenter && (
        <>
          <BorderWrapper />
          <BodyCopy fontSize="fs16" mobilefontFamily="primary" text={labels.nextHeading} />

          <BodyCopy
            fontSize="fs14"
            mobilefontFamily="secondary"
            text={isBossInList ? labels.nextDetailsBoss : labels.nextDetails}
          />
        </>
      )}
      <BorderWrapper />
      <BodyCopyWithSpacing
        spacingStyles="margin-top-XL margin-left-XS"
        fontSize="fs16"
        mobilefontFamily="primary"
        text={labels.updateOrderHeading}
      />
      <Container>
        <RichTextContainer>
          <RichText source={{ html: updateOrderDetailsData }} />
        </RichTextContainer>
      </Container>
    </>
  );
};
ThankYouComponent.propTypes = {
  /** Flag indicates whether the user is a guest */
  isGuest: PropTypes.bool,

  /** indicates order payment is processing */
  isOrderPending: PropTypes.bool,

  /** email address of the user that placed the order */
  emailAddress: PropTypes.string.isRequired,

  /** shipped order only details */
  orderDetails: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    orderNumber: PropTypes.string.isRequired,
    trackingLink: PropTypes.string.isRequired,
  }).isRequired,

  /** Bopis order details */
  orderNumbersByFullfillmentCenter: PropTypes.shape({
    holdDate: PropTypes.instanceOf(Date).isRequired,
    fullfillmentCenterMap: PropTypes.shape([{}]),
  }).isRequired,
  updateOrderDetailsData: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
  orderShippingDetails: PropTypes.shape({}),
  isBossInList: PropTypes.bool,
  fullfillmentCenterData: PropTypes.shape([{}]),
  isShowShippingMessage: PropTypes.bool,
  isShowBopisMessage: PropTypes.bool,
  isShowMixedMessage: PropTypes.bool,
};
ThankYouComponent.defaultProps = {
  isGuest: true,
  isOrderPending: false,
  updateOrderDetailsData: null,
  orderShippingDetails: null,
  isBossInList: false,
  fullfillmentCenterData: null,
  isShowShippingMessage: false,
  isShowBopisMessage: false,
  isShowMixedMessage: false,
};
export default ThankYouComponent;
