import React from 'react';
import CardImage from '../../../../common/molecules/CardImage';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/Confirmation.styles';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import CheckoutOrderInfo from '../../Checkout/molecules/CheckoutOrderInfoMobile';
import ThankYouComponent from '../organisms/ThankYouComponent';
import CONFIRMATION_CONSTANTS from '../Confirmation.constants';
import VenmoConfirmation from '../../common/molecules/VenmoConfirmation';
import ConfirmationAccountFormContainer from '../../common/organism/ConfirmationAccountForm';
import {
  propTypes,
  defaultProps,
  checkIfShippingFullName,
  checkIfNotShippingFullName,
  checkIffullfillmentCenterMap,
} from './Confirmation.util';

const renderAccountForm = isGuest => {
  return (
    isGuest && (
      <Row fullBleed>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <ConfirmationAccountFormContainer />
        </Col>
      </Row>
    )
  );
};

/** The hard coded values are just to show the template. these will be removed once the components are are in place */
/**
 * @function ConfirmationView
 * @description component to render confirmation component.
 */
const ConfirmationView = ({
  className,
  updateOrderDetailsData,
  labels,
  isGuest,
  isOrderPending,
  emailAddress,
  encryptedEmailAddress,
  orderDetails,
  orderShippingDetails,
  orderNumbersByFullfillmentCenter,
  isVenmoPaymentInProgress,
  venmoPayment,
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
    <div className={className}>
      <Row fullBleed className="placeholder sms-sign-up">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div>SMS SIGN UP</div>
        </Col>
      </Row>
      <Row fullBleed className="thank-you-component">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
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
          {isVenmoPaymentInProgress && (
            <VenmoConfirmation isVenmoPaymentInProgress={isVenmoPaymentInProgress} />
          )}
          {isVenmoPaymentInProgress && venmoPayment && (
            <div>
              <section className="venmo-payment-method-wrapper">
                <CardImage card={venmoPayment} cardNumber={venmoPayment.userName} />
              </section>
            </div>
          )}
        </Col>
      </Row>
      <Row fullBleed className="placeholder loyalty-banner">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div>LOYALTY BANNER</div>
        </Col>
      </Row>
      {renderAccountForm(isGuest)}
      <CheckoutOrderInfo isConfirmationPage />
    </div>
  );
};

ConfirmationView.propTypes = propTypes;

ConfirmationView.defaultProps = defaultProps;

export default withStyles(ConfirmationView, styles);
export { ConfirmationView as ConfirmationViewVanilla };
