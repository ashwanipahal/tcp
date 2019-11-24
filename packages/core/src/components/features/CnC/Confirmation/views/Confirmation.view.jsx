import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/Confirmation.styles';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import CheckoutOrderInfo from '../../Checkout/molecules/CheckoutOrderInfoMobile';
import ThankYouComponent from '../organisms/ThankYouComponent';
import CONFIRMATION_CONSTANTS from '../Confirmation.constants';
import VenmoConfirmation from '../../common/molecules/VenmoConfirmation';
import ConfirmationAccountFormContainer from '../../common/organism/ConfirmationAccountForm';
import LoyaltyBanner from '../../LoyaltyBanner';
import {
  checkIfShippingFullName,
  checkIfNotShippingFullName,
  checkIffullfillmentCenterMap,
} from './Confirmation.util';
import { constants as VenmoConstants } from '../../../../common/atoms/VenmoPaymentButton/container/VenmoPaymentButton.util';
import SMSNotifications from '../organisms/SMSNotifications';

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

const renderSMSNotification = (labels, isGymboreeCanadaSite) => {
  return !isGymboreeCanadaSite ? (
    <Row fullBleed className="smsNotification">
      <Col colSize={{ small: 6, medium: 8, large: 12 }} />
      <SMSNotifications labels={labels} />
    </Row>
  ) : null;
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
  venmoUserName,
  pageCategory,
  isGymboreeCanadaSite,
}) => {
  const { date, orderNumber, trackingLink } = orderDetails || {};
  let venmoPayment = {};
  if (isVenmoPaymentInProgress) {
    venmoPayment = {
      userName: venmoUserName,
      ccBrand: VenmoConstants.VENMO,
      ccType: VenmoConstants.VENMO,
      defaultInd: true,
    };
  }
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
      {renderSMSNotification(labels, isGymboreeCanadaSite)}

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
            <VenmoConfirmation
              isVenmoPaymentInProgress={isVenmoPaymentInProgress}
              labels={labels}
            />
          )}
        </Col>
      </Row>
      <Row fullBleed className="placeholder loyalty-banner">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          {<LoyaltyBanner pageCategory="confirmation" />}
        </Col>
      </Row>
      <CheckoutOrderInfo
        isConfirmationPage
        isVenmoPaymentInProgress={isVenmoPaymentInProgress}
        venmoPayment={venmoPayment}
        labels={labels}
        pageCategory={pageCategory}
      />
      {renderAccountForm(isGuest)}
    </div>
  );
};

ConfirmationView.propTypes = {
  className: PropTypes.string,
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
  encryptedEmailAddress: PropTypes.string,
  orderShippingDetails: PropTypes.shape({}),
  isVenmoPaymentInProgress: PropTypes.bool,
  venmoUserName: PropTypes.string,
  pageCategory: PropTypes.string,
  isGymboreeCanadaSite: PropTypes.bool,
};
ConfirmationView.defaultProps = {
  className: '',
  isGuest: true,
  isOrderPending: false,
  updateOrderDetailsData: null,
  encryptedEmailAddress: '',
  orderShippingDetails: null,
  isVenmoPaymentInProgress: false,
  venmoUserName: '',
  pageCategory: '',
  isGymboreeCanadaSite: false,
};

export default withStyles(ConfirmationView, styles);
export { ConfirmationView as ConfirmationViewVanilla };
