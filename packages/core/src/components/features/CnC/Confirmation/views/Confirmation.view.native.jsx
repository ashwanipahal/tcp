import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopyWithSpacing } from '../../../../common/atoms/styledWrapper';
import CnCTemplate from '../../common/organism/CnCTemplate';
import { Wrapper, SMSWrapper, InnerWrapper } from '../styles/Confirmation.styles.native';
import ThankYouComponent from '../organisms/ThankYouComponent';
import {
  checkIfShippingFullName,
  checkIfNotShippingFullName,
  checkIffullfillmentCenterMap,
} from './Confirmation.util';
import CONFIRMATION_CONSTANTS from '../Confirmation.constants';
import ConfirmationAccountFormContainer from '../../common/organism/ConfirmationAccountForm';

const renderAccountForm = isGuest => {
  return isGuest ? <ConfirmationAccountFormContainer /> : null;
};

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
      <InnerWrapper>
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
      </InnerWrapper>
      {renderAccountForm(isGuest)}
      <CnCTemplate isConfirmationPage isGuest={isGuest} pageCategory="confirmation" />
    </Wrapper>
  );
};

ConfirmationView.propTypes = {
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
  updateOrderDetailsData: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    lbl_confirmation_heading: PropTypes.string,
    lbl_confirmation_mixOrderMsg1: PropTypes.string,
    lbl_confirmation_shippingMsg: PropTypes.string,
    lbl_confirmation_items: PropTypes.string,
  }).isRequired,
  encryptedEmailAddress: PropTypes.string,
  orderShippingDetails: PropTypes.shape({
    address: PropTypes.string,
    orderTotal: PropTypes.number,
    itemsCount: PropTypes.number,
  }).isRequired,
};
ConfirmationView.defaultProps = {
  isGuest: true,
  isOrderPending: false,
  encryptedEmailAddress: '',
};
export default ConfirmationView;
