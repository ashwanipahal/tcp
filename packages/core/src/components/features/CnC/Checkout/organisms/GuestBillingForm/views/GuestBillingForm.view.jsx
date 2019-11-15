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
import utility, { scrollToFirstError } from '../../../util/utility';
import CREDIT_CARD_CONSTANTS from '../../BillingPaymentForm/container/CreditCard.constants';
import VenmoPaymentButton from '../../../../../../common/atoms/VenmoPaymentButton';
import CheckoutOrderInfo from '../../../molecules/CheckoutOrderInfoMobile';
import BillingPayPalButton from '../../BillingPayPalButton';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';
import AddressSkeleton from '../../../../../../common/molecules/Address/skeleton/AddressSkeleton.view';

class GuestBillingForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    shippingAddress: PropTypes.shape({}),
    className: PropTypes.string.isRequired,
    cvvCodeRichText: PropTypes.string,
    cardType: PropTypes.string,
    syncErrorsObj: PropTypes.shape({
      syncError: PropTypes.shape({
        cvvCode: PropTypes.string,
      }),
    }),
    labels: PropTypes.shape({
      paymentMethod: PropTypes.string,
      continueWith: PropTypes.string,
    }),
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
    pageCategory: PropTypes.string,
    venmoError: PropTypes.string,
    isPayPalWebViewEnable: PropTypes.bool,
    bagLoading: PropTypes.bool,
  };

  static defaultProps = {
    shippingAddress: null,
    cvvCodeRichText: '',
    cardType: null,
    syncErrorsObj: {
      syncError: {
        cvvCode: '',
      },
    },
    labels: {
      paymentMethod: '',
      continueWith: '',
    },
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
    pageCategory: '',
    venmoError: '',
    isPayPalWebViewEnable: false,
    bagLoading: false,
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

  renderBillingPayPalButton = () => {
    const { isPayPalEnabled, paymentMethodId, labels } = this.props;
    return isPayPalEnabled && paymentMethodId === CONSTANTS.PAYMENT_METHOD_PAYPAL ? (
      <BillingPayPalButton labels={labels} containerId="billing-page-paypal-one" />
    ) : null;
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
      venmoError,
      pageCategory,
      isPayPalWebViewEnable,
      bagLoading,
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
            {this.renderBillingPayPalButton()}
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
                  {!bagLoading ? (
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
                  ) : (
                    <AddressSkeleton />
                  )}
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
              {venmoError && <ErrorMessage error={venmoError} className="checkout-page-error" />}
            </div>
          </>
        )}
        <CheckoutOrderInfo
          isGuest={isGuest}
          showAccordian={showAccordian}
          pageCategory={pageCategory}
        />
        <CheckoutFooter
          hideBackLink
          backLinkHandler={() =>
            orderHasShipping
              ? utility.routeToPage(CHECKOUT_ROUTES.shippingPage)
              : utility.routeToPage(CHECKOUT_ROUTES.pickupPage)
          }
          nextButtonText={nextSubmitText}
          backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
          showVenmoSubmit={paymentMethodId === CONSTANTS.PAYMENT_METHOD_VENMO}
          showPayPalButton={isPayPalEnabled && paymentMethodId === CONSTANTS.PAYMENT_METHOD_PAYPAL}
          continueWithText={labels.continueWith}
          onVenmoSubmit={handleSubmit}
          venmoError={venmoError}
          isPayPalWebViewEnable={isPayPalWebViewEnable}
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
  onSubmitFail: errors => scrollToFirstError(errors),
})(GuestBillingForm);
export { GuestBillingForm as GuestBillingFormVanilla };
