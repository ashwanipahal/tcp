import React from 'react';
import PropTypes from 'prop-types';
import { FormSection, reduxForm, change } from 'redux-form';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import AddNewCCForm from '../../AddNewCCForm';
import cvvInfo from '../../../molecules/CVVInfo';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import CheckoutBillingAddress from '../../CheckoutBillingAddress';
import CREDIT_CARD_CONSTANTS from '../../BillingPaymentForm/container/CreditCard.constants';
import { PaymentMethodHeader, PayPalTextContainer } from '../styles/GuestBillingForm.styles.native';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import CONSTANTS from '../../../Checkout.constants';
import PaymentMethods from '../../../../common/molecules/PaymentMethods';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import { getExpirationRequiredFlag } from '../../../util/utility';

/**
 * @class GuestBillingForm
 * @extends {Component}
 * @description view component to render guest billing form.
 */
class GuestBillingForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    shippingAddress: PropTypes.shape({}),
    cvvCodeRichText: PropTypes.string,
    cardType: PropTypes.string,
    syncErrorsObj: PropTypes.shape({}),
    labels: PropTypes.shape({}),
    orderHasShipping: PropTypes.bool,
    isPaymentDisabled: PropTypes.bool.isRequired,
    addressLabels: PropTypes.shape({}).isRequired,
    isGuest: PropTypes.bool,
    isSameAsShippingChecked: PropTypes.bool,
    billingData: PropTypes.shape({}),
    nextSubmitText: PropTypes.string,
    backLinkShipping: PropTypes.string,
    backLinkPickup: PropTypes.string,
    navigation: PropTypes.shape({}).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    creditFieldLabels: PropTypes.shape({}),
    setCheckoutStage: PropTypes.func.isRequired,
    getPayPalSettings: PropTypes.shape({}),
    paymentMethodId: PropTypes.string,
    isPayPalEnabled: PropTypes.bool,
    isPayPalWebViewEnable: PropTypes.func,
  };

  static defaultProps = {
    shippingAddress: null,
    cvvCodeRichText: '',
    cardType: null,
    syncErrorsObj: null,
    labels: {},
    orderHasShipping: true,
    isGuest: true,
    isSameAsShippingChecked: true,
    billingData: {},
    nextSubmitText: '',
    backLinkShipping: '',
    backLinkPickup: '',
    creditFieldLabels: {},
    getPayPalSettings: {},
    paymentMethodId: null,
    isPayPalEnabled: false,
    isPayPalWebViewEnable: false,
  };

  /**
   * @function componentDidUpdate
   * @memberof GuestBillingForm
   * @description method to be called on update of component
   */
  componentDidUpdate(prevProp) {
    const { cardType: prevCardType } = prevProp;
    const { cardType, dispatch } = this.props;
    /* istanbul ignore else */
    if (prevCardType !== cardType) {
      dispatch(change('checkoutBilling', 'cardType', cardType));
    }
  }

  /**
   * @function render
   * @description render method to be called of component
   */
  render() {
    const {
      cvvCodeRichText,
      cardType,
      syncErrorsObj,
      labels,
      isGuest,
      orderHasShipping,
      addressLabels,
      dispatch,
      shippingAddress,
      isSameAsShippingChecked,
      billingData,
      backLinkShipping,
      backLinkPickup,
      navigation,
      nextSubmitText,
      handleSubmit,
      onSubmit,
      creditFieldLabels,
      isPaymentDisabled,
      setCheckoutStage,
      paymentMethodId,
      getPayPalSettings,
      isPayPalEnabled,
      isPayPalWebViewEnable,
    } = this.props;
    let cvvError;
    if (syncErrorsObj) {
      cvvError = syncErrorsObj.syncError.cvvCode;
    }
    const isExpirationRequired = getExpirationRequiredFlag({ cardType });
    const {
      PAYMENT_METHOD_CREDIT_CARD,
      PAYMENT_METHOD_PAY_PAL,
      PAYMENT_METHOD_VENMO,
    } = CREDIT_CARD_CONSTANTS;
    const paymentMethods = [
      { id: PAYMENT_METHOD_CREDIT_CARD, displayName: labels.creditCard },
      { id: PAYMENT_METHOD_PAY_PAL, displayName: labels.payPal },
      { id: PAYMENT_METHOD_VENMO, displayName: labels.venmo },
    ];
    return (
      <>
        {!isPayPalWebViewEnable && !isPaymentDisabled && (
          <>
            <PaymentMethodHeader>
              <BodyCopy
                mobileFontFamily="primary"
                fontSize="fs26"
                fontWeight="regular"
                dataLocator="paymentMethodLbl"
                className="elem-mb-XS elem-mt-MED"
                text={labels.paymentMethod}
              />
            </PaymentMethodHeader>
            <FormSection name="shipmentMethods">
              <PaymentMethods
                paymentMethods={paymentMethods}
                formName={CREDIT_CARD_CONSTANTS.GUEST_FORM_NAME}
                selectedPaymentId={paymentMethodId}
                dispatch={dispatch}
              />
            </FormSection>
            {isPayPalEnabled && paymentMethodId === CREDIT_CARD_CONSTANTS.PAYMENT_METHOD_PAY_PAL ? (
              <PayPalTextContainer>
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs16"
                  spacingStyles="margin-bottom-MED"
                  color="gray.900"
                  dataLocator="paymentMethodLbl"
                  text={labels.payPalLongText}
                />
              </PayPalTextContainer>
            ) : null}
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
                  dispatch={dispatch}
                  billingData={billingData}
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
          </>
        )}
        <CnCTemplate
          navigation={navigation}
          btnText={nextSubmitText}
          routeToPage=""
          onPress={handleSubmit(onSubmit)}
          backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
          onBackLinkPress={() =>
            orderHasShipping
              ? setCheckoutStage(CONSTANTS.SHIPPING_DEFAULT_PARAM)
              : setCheckoutStage(CONSTANTS.PICKUP_DEFAULT_PARAM)
          }
          pageCategory="guestBilling"
          showAccordian
          getPayPalSettings={getPayPalSettings}
          showPayPalButton={isPayPalEnabled && paymentMethodId === CONSTANTS.PAYMENT_METHOD_PAYPAL}
          isPayPalWebViewEnable={isPayPalWebViewEnable}
        />
      </>
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
})(GuestBillingForm);
export { GuestBillingForm as GuestBillingFormVanilla };
