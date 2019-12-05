import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import PlaceCashBanner from '@tcp/core/src/components/features/CnC/PlaceCashBanner';
import ThankYouTitleDisplay from '../../../molecules/ThankYouTitleDisplay';
import ConfirmationFulfillmentCenterItemDisplay from '../../ConfirmationFulfillmentCenterItemDisplay';
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
  venmoOrderConfirmationContent,
  isVenmoPaymentInProgress,
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
          <BodyCopyWithSpacing
            spacingStyles="margin-top-XL margin-left-XS"
            fontSize="fs16"
            mobilefontFamily="primary"
            text={labels.nextHeading}
          />

          <BodyCopyWithSpacing
            spacingStyles="margin-top-XXS margin-left-XS margin-right-XS"
            fontSize="fs14"
            mobilefontFamily="secondary"
            text={isBossInList ? labels.nextDetailsBoss : labels.nextDetails}
          />
        </>
      )}
      <BorderWrapper />
      <PlaceCashBanner isOrderConfirmation />
      <BodyCopyWithSpacing
        spacingStyles="margin-top-XL margin-left-XS"
        fontSize="fs16"
        mobilefontFamily="primary"
        text={labels.updateOrderHeading}
      />
      {updateOrderDetailsData && (
        <Container>
          <RichTextContainer>
            <RichText source={{ html: updateOrderDetailsData }} />
          </RichTextContainer>
        </Container>
      )}
      {isVenmoPaymentInProgress && (
        <View>
          <BodyCopyWithSpacing
            spacingStyles="margin-top-XL margin-left-XS"
            fontSize="fs16"
            mobilefontFamily="primary"
            text={labels.venmoHeading}
          />
        </View>
      )}
      {isVenmoPaymentInProgress && (
        <Container>
          <RichTextContainer>
            <RichText source={{ html: venmoOrderConfirmationContent }} />
          </RichTextContainer>
        </Container>
      )}
    </>
  );
};
ThankYouComponent.propTypes = {
  isVenmoPaymentInProgress: PropTypes.bool.isRequired,
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
  }).isRequired,
  updateOrderDetailsData: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    nextHeading: PropTypes.string,
    nextDetailsBoss: PropTypes.string,
    nextDetails: PropTypes.string,
    updateOrderHeading: PropTypes.string,
  }).isRequired,
  isBossInList: PropTypes.bool,
  fullfillmentCenterData: PropTypes.shape([{}]).isRequired,
  isShowShippingMessage: PropTypes.bool,
  isShowBopisMessage: PropTypes.bool,
  isShowMixedMessage: PropTypes.bool,
  venmoOrderConfirmationContent: PropTypes.shape({}),
};
ThankYouComponent.defaultProps = {
  isGuest: true,
  isOrderPending: false,
  isBossInList: false,
  isShowShippingMessage: false,
  isShowBopisMessage: false,
  isShowMixedMessage: false,
  venmoOrderConfirmationContent: null,
};
export default ThankYouComponent;
