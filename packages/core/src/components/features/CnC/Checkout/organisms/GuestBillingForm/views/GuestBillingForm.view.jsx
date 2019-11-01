import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, change } from 'redux-form';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import AddNewCCForm from '../../AddNewCCForm';
import cvvInfo from '../../../molecules/CVVInfo';
import PaymentMethods from '../../../../common/molecules/PaymentMethods';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import CONSTANTS, { CHECKOUT_ROUTES } from '../../../Checkout.constants';
import CheckoutBillingAddress from '../../CheckoutBillingAddress';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import CheckoutFooter from '../../../molecules/CheckoutFooter';
import utility from '../../../util/utility';
import CREDIT_CARD_CONSTANTS from '../../BillingPaymentForm/container/CreditCard.constants';
import VenmoPaymentButton from '../../../../../../common/atoms/VenmoPaymentButton';
import CheckoutOrderInfo from '../../../molecules/CheckoutOrderInfoMobile';
import PayPalButton from '../../../../common/organism/PayPalButton';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/GuestBillingForm.styles';

class GuestBillingForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    shippingAddress: PropTypes.shape({}),
    className: PropTypes.string.isRequired,
    cvvCodeRichText: PropTypes.string,
    cardType: PropTypes.string,
    syncErrorsObj: PropTypes.shape({}),
    labels: PropTypes.shape({}),
    paymentMethodId: PropTypes.string,
    orderHasShipping: PropTypes.bool,
    addressLabels: PropTypes.shape({}).isRequired,
    isGuest: PropTypes.bool,
    isSameAsShippingChecked: PropTypes.bool,
    nextSubmitText: PropTypes.string,
    backLinkShipping: PropTypes.string,
    backLinkPickup: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    billingData: PropTypes.shape({}),
    creditFieldLabels: PropTypes.shape({}),
    showAccordian: PropTypes.bool,
    isPayPalEnabled: PropTypes.bool,
    isVenmoEnabled: PropTypes.bool, // Venmo Kill Switch, if Venmo enabled then true, else false.
    isPaymentDisabled: PropTypes.bool,
  };

  static defaultProps = {
    shippingAddress: null,
    cvvCodeRichText: '',
    cardType: null,
    syncErrorsObj: null,
    labels: {},
    paymentMethodId: null,
    orderHasShipping: true,
    isGuest: true,
    isSameAsShippingChecked: true,
    billingData: {},
    nextSubmitText: '',
    backLinkShipping: '',
    backLinkPickup: '',
    creditFieldLabels: {},
    isPayPalEnabled: false,
    showAccordian: true,
    isVenmoEnabled: false,
    isPaymentDisabled: false,
  };

  componentDidUpdate(prevProp) {
    const { cardType: prevCardType } = prevProp;
    const { cardType, dispatch } = this.props;
    /* istanbul ignore else */
    if (prevCardType !== cardType) {
      dispatch(change('checkoutBilling', 'cardType', cardType));
    }
  }

  getExpirationRequiredFlag = () => {
    const { cardType } = this.props;
    return !cardType || cardType !== CREDIT_CARD_CONSTANTS.ACCEPTED_CREDIT_CARDS.PLACE_CARD;
  };

  render() {
    const {
      cvvCodeRichText,
      cardType,
      syncErrorsObj,
      className,
      labels,
      paymentMethodId,
      isGuest,
      orderHasShipping,
      addressLabels,
      dispatch,
      shippingAddress,
      isSameAsShippingChecked,
      nextSubmitText,
      backLinkShipping,
      backLinkPickup,
      handleSubmit,
      billingData,
      creditFieldLabels,
      showAccordian,
      isPayPalEnabled,
      isVenmoEnabled,
      isPaymentDisabled,
    } = this.props;
    let cvvError;
    if (syncErrorsObj) {
      cvvError = syncErrorsObj.syncError.cvvCode;
    }
    const isExpirationRequired = this.getExpirationRequiredFlag();
    return (
      <form className={className} name="checkoutBilling" onSubmit={handleSubmit}>
        {!isPaymentDisabled && (
          <>
            <BodyCopy
              fontFamily="primary"
              fontSize="fs28"
              fontWeight="regular"
              dataLocator="paymentMethodLbl"
              className="elem-mb-XS elem-mt-MED"
            >
              {labels.paymentMethod}
            </BodyCopy>
            <PaymentMethods labels={labels} isVenmoEnabled={isVenmoEnabled} />
            {isPayPalEnabled && paymentMethodId === CONSTANTS.PAYMENT_METHOD_PAYPAL ? (
              <div className="payment-paypal-container hide-on-desktop hide-on-tablet">
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs16"
                  fontWeight="extrabold"
                  dataLocator="completePurchaseLblÎ"
                  className="paypal-complete-purchase"
                >
                  {labels.continueWithPayPal}
                </BodyCopy>
                <PayPalButton
                  className="billing-payPal-button"
                  containerId="billing-page-paypal-1"
                  isBillingPage
                />
              </div>
            ) : null}
            <div className="elem-mt-LRG elem-pb-XL">
              {paymentMethodId === CONSTANTS.PAYMENT_METHOD_CREDIT_CARD ? (
                <>
                  <AddNewCCForm
                    cvvInfo={cvvInfo({ cvvCodeRichText })}
                    cardType={cardType}
                    cvvError={cvvError}
                    labels={labels}
                    formName="checkoutBilling"
                    isExpirationRequired={isExpirationRequired}
                    isGuest={isGuest}
                    creditFieldLabels={creditFieldLabels}
                  />
                  <CheckoutBillingAddress
                    isGuest={isGuest}
                    orderHasShipping={orderHasShipping}
                    addressLabels={addressLabels}
                    dispatch={dispatch}
                    shippingAddress={shippingAddress}
                    isSameAsShippingChecked={isSameAsShippingChecked}
                    labels={labels}
                    billingData={billingData}
                    formName="checkoutBilling"
                  />
                </>
              ) : null}
              {paymentMethodId === CONSTANTS.PAYMENT_METHOD_VENMO && isVenmoEnabled && (
                <VenmoPaymentButton
                  className="venmo-container"
                  continueWithText={labels.continueWith}
                  onSuccess={handleSubmit}
                  isVenmoBlueButton
                />
              )}
            </div>
          </>
        )}
        <CheckoutOrderInfo isGuest={isGuest} showAccordian={showAccordian} />
        <CheckoutFooter
          hideBackLink
          backLinkHandler={() => utility.routeToPage(CHECKOUT_ROUTES.shippingPage)}
          nextButtonText={nextSubmitText}
          backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
          showVenmoSubmit={paymentMethodId === CONSTANTS.PAYMENT_METHOD_VENMO}
          showPayPalButton={isPayPalEnabled && paymentMethodId === CONSTANTS.PAYMENT_METHOD_PAYPAL}
          continueWithText={labels.continueWith}
          onVenmoSubmit={handleSubmit}
        />
      </form>
    );
  }
}

const validateMethod = createValidateMethod({
  address: AddressFields.addressValidationConfig,
  ...getStandardConfig(['cardNumber', 'cvvCode', 'expYear', 'expMonth']),
});
export default reduxForm({
  form: 'checkoutBilling', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(GuestBillingForm, styles));
export { GuestBillingForm as GuestBillingFormVanilla };
