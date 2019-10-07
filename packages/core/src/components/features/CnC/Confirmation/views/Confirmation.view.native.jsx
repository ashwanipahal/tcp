import React from 'react';
import { BodyCopyWithSpacing } from '../../../../common/atoms/styledWrapper';
import CnCTemplate from '../../common/organism/CnCTemplate';
import { Wrapper, SMSWrapper } from '../styles/Confirmation.styles.native';
import ThankYouComponent from '../organisms/ThankYouComponent';
import {
  propTypes,
  defaultProps,
  checkIfShippingFullName,
  checkIfNotShippingFullName,
  checkIffullfillmentCenterMap,
} from './Confirmation.util';
import CONFIRMATION_CONSTANTS from '../Confirmation.constants';

/** The hard coded values are just to show the template. these will be removed once the components are are in place */
/**
 * @function ConfirmationView
 * @description component to render confirmation component.
 */
const ConfirmationView = ({
  updateOrderDetailsData,
  labels,
  isGuest,
  isOrderPending,
  emailAddress,
  encryptedEmailAddress,
  orderDetails,
  orderShippingDetails,
  orderNumbersByFullfillmentCenter,
}) => {
  const { date, orderNumber, trackingLink } = orderDetails || {};

  const isShowShippingMessage = !!orderNumber;
  let isShowBopisMessage;
  let isShowMixedMessage;
  let isBossInList;
  /* istanbul ignore else */
  if (orderNumbersByFullfillmentCenter) {
    isShowBopisMessage = !checkIfShippingFullName({ orderNumbersByFullfillmentCenter });
    isShowMixedMessage =
      checkIfShippingFullName({ orderNumbersByFullfillmentCenter }) &&
      checkIfNotShippingFullName({ orderNumbersByFullfillmentCenter });
    isBossInList = orderNumbersByFullfillmentCenter.fullfillmentCenterMap.find(
      store => store.orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.BOSS
    );
  }
  const { address, orderTotal, itemsCount } = orderShippingDetails || {};
  let fullfillmentCenterData = [];
  if (orderNumber) {
    fullfillmentCenterData = [
      {
        productsCount: itemsCount,
        shippingFullname: address.firstName,
        orderTotal,
        orderNumber,
        isGuest,
        orderDate: date,
        encryptedEmailAddress,
        orderLink: trackingLink,
        orderType: CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.ECOM,
      },
    ];
  } else if (checkIffullfillmentCenterMap(orderNumbersByFullfillmentCenter)) {
    fullfillmentCenterData = [...orderNumbersByFullfillmentCenter.fullfillmentCenterMap];
  }
  return (
    <Wrapper>
      <SMSWrapper>
        <BodyCopyWithSpacing
          textAlign="center"
          fontSize="fs16"
          mobileFontFamily="secondary"
          spacingStyles="margin-top-LRG margin-bottom-LRG"
          text="SMS SIGN UP"
        />
      </SMSWrapper>
      <ThankYouComponent
        emailAddress={emailAddress}
        isOrderPending={isOrderPending}
        isShowShippingMessage={isShowShippingMessage}
        isShowBopisMessage={isShowBopisMessage}
        isShowMixedMessage={isShowMixedMessage}
        labels={labels}
        fullfillmentCenterData={fullfillmentCenterData}
        isGuest={isGuest}
        updateOrderDetailsData={updateOrderDetailsData}
        orderNumbersByFullfillmentCenter={orderNumbersByFullfillmentCenter}
        isBossInList={isBossInList}
      />

      <CnCTemplate isConfirmationPage isGuest={isGuest} />
    </Wrapper>
  );
};
ConfirmationView.propTypes = propTypes;
ConfirmationView.defaultProps = defaultProps;
export default ConfirmationView;
