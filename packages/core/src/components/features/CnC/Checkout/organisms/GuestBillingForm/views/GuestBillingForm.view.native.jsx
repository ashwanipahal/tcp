import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, change } from 'redux-form';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import AddNewCCForm from '../../AddNewCCForm';
import cvvInfo from '../../../molecules/CVVInfo';
// import PaymentMethods from '../../../../common/molecules/PaymentMethods';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { getLabelValue } from '../../../../../../../utils';
import CheckoutBillingAddress from '../../CheckoutBillingAddress';
import CREDIT_CARD_CONSTANTS from '../../BillingPaymentForm/container/CreditCard.constants';
import GuestBillingFormWrapper from '../styles/GuestBillingForm.styles.native';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import CONSTANTS from '../../../Checkout.constants';
import AddressFields from '../../../../../../common/molecules/AddressFields';

class GuestBillingForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    shippingAddress: PropTypes.shape({}),
    cvvCodeRichText: PropTypes.string,
    cardType: PropTypes.string,
    syncErrorsObj: PropTypes.shape({}),
    labels: PropTypes.shape({}),
    orderHasShipping: PropTypes.bool,
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
      onSubmit
    } = this.props;
    let cvvError;
    if (syncErrorsObj) {
      cvvError = syncErrorsObj.syncError.cvvCode;
    }
    const isExpirationRequired = this.getExpirationRequiredFlag();
    return (
      <>
        <GuestBillingFormWrapper>
          <BodyCopy
            mobileFontFamily="primary"
            fontSize="fs26"
            fontWeight="regular"
            data-locator="billing-details"
            className="elem-mb-XS elem-mt-MED"
            text={getLabelValue(labels, 'lbl_billing_paymentMethodTitle')}
          />
          {/* <PaymentMethods labels={labels} /> */}
          {/* {paymentMethodId === CONSTANTS.PAYMENT_METHOD_CREDIT_CARD ? ( */}
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
          {/* ) : null} */}
          <CnCTemplate
            navigation={navigation}
            btnText={nextSubmitText}
            routeToPage=""
            onPress={handleSubmit(onSubmit)}
            backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
            onBackLinkPress={() =>
              navigation.navigate(
                orderHasShipping
                  ? CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_SHIPPING
                  : CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_PICKUP
              )
            }
          />
        </GuestBillingFormWrapper>
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
