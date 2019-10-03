import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import GuestBillingPage from '../views';
import CONSTANTS from '../../../Checkout.constants';
import {
  getCardType,
  getSyncError,
  getPaymentMethodId,
  getSameAsShippingValue,
} from './GuestBillingForm.selectors';
import {
  submitBillingSection,
  setVenmoPaymentInProgress,
} from '../../../container/Checkout.action';
import CreditCardSelector from '../../BillingPaymentForm/container/CreditCard.selectors';

/**
 * @class GuestBillingContainer
 * @extends {Component}
 * @description container component to render guest user form.
 */
class GuestBillingContainer extends React.Component {
  /**
   * @function submitBillingData
   * @description submits the billing data
   */
  submitBillingData = data => {
    const { submitBilling, navigation, setVenmoProgress } = this.props;
    const { address, sameAsShipping, paymentMethodId } = data;
    let addressLine1;
    let addressLine2;
    let city;
    let country;
    let firstName;
    let lastName;
    let state;
    let zipCode;
    let onFileAddressKey;
    let onFileAddressId;
    let submitData = {};
    /* istanbul ignore else */
    if (address) {
      ({
        addressLine1,
        addressLine2,
        city,
        country,
        firstName,
        lastName,
        state,
        zipCode,
        onFileAddressKey,
        onFileAddressId,
      } = address);
    }
    if (paymentMethodId !== CONSTANTS.PAYMENT_METHOD_VENMO) {
      submitData = {
        cardNumber: data.cardNumber,
        cardType: data.cardType,
        cvv: data.cvvCode,
        emailAddress: undefined,
        expMonth: data.expMonth,
        expYear: data.expYear,
        address: {
          addressLine1,
          addressLine2: addressLine2 || '',
          city,
          country,
          firstName,
          lastName,
          state,
          zipCode,
          sameAsShipping,
          onFileAddressKey,
          onFileAddressId,
        },
        navigation,
      };
      setVenmoProgress(false); // Cancelling Venmo Progress for non venmo payment option
    } else {
      submitData = { paymentMethodId, navigation };
    }
    submitBilling(submitData);
  };

  /**
   * @function getAddressInitialValues
   * @description returns the initial values for address fields
   */
  getAddressInitialValues = () => {
    const { billingData } = this.props;
    if (billingData && billingData.address) {
      const { address } = billingData;
      const {
        addressLine1,
        addressLine2,
        city,
        country,
        firstName,
        lastName,
        state,
        zipCode,
        onFileAddressKey,
        onFileAddressId,
      } = address;
      return {
        addressLine1,
        addressLine2,
        city,
        country,
        firstName,
        lastName,
        state,
        zipCode,
        onFileAddressKey,
        onFileAddressId,
      };
    }

    return null;
  };

  /**
   * @function render
   * @description render method to be called of component
   */
  render() {
    const {
      billingData,
      orderHasShipping,
      syncErrors,
      shippingOnFileAddressKey,
      isVenmoPaymentInProgress,
    } = this.props;
    let cardNumber;
    let cardType;
    let expMonth;
    let expYear;
    let billingOnFileAddressKey;
    if (billingData && billingData.billing) {
      ({
        billing: { cardNumber, cardType, expMonth, expYear },
        address: { onFileAddressKey: billingOnFileAddressKey },
      } = billingData);
    }
    return (
      <GuestBillingPage
        {...this.props}
        initialValues={{
          paymentMethodId: isVenmoPaymentInProgress
            ? CONSTANTS.PAYMENT_METHOD_VENMO
            : CONSTANTS.PAYMENT_METHOD_CREDIT_CARD,
          sameAsShipping:
            orderHasShipping &&
            (isEmpty(billingData) || billingOnFileAddressKey === shippingOnFileAddressKey),
          address: this.getAddressInitialValues(),
          cardNumber,
          cardType,
          expMonth,
          expYear,
        }}
        onSubmit={this.submitBillingData}
        syncErrorsObj={syncErrors}
      />
    );
  }
}

export const mapStateToProps = state => {
  return {
    cardType: getCardType(state),
    syncErrors: getSyncError(state),
    paymentMethodId: getPaymentMethodId(state),
    isSameAsShippingChecked: getSameAsShippingValue(state),
    shippingOnFileAddressKey: CreditCardSelector.getShippingOnFileAddressKey(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    submitBilling: payload => {
      dispatch(submitBillingSection(payload));
    },
    setVenmoProgress: payload => {
      dispatch(setVenmoPaymentInProgress(payload));
    },
  };
};

GuestBillingContainer.propTypes = {
  cardType: PropTypes.string,
  syncErrors: PropTypes.shape({}),
  cvvCodeRichText: PropTypes.string,
  labels: PropTypes.shape({}),
  paymentMethodId: PropTypes.string,
  shippingAddress: PropTypes.shape({}),
  isSameAsShippingChecked: PropTypes.bool,
  billingData: PropTypes.shape({}),
  orderHasShipping: PropTypes.bool,
  submitBilling: PropTypes.func.isRequired,
  shippingOnFileAddressKey: PropTypes.string,
  navigation: PropTypes.shape({}),
  isVenmoPaymentInProgress: PropTypes.bool,
  setVenmoProgress: PropTypes.func.isRequired,
};

GuestBillingContainer.defaultProps = {
  cardType: null,
  syncErrors: null,
  cvvCodeRichText: '',
  labels: {},
  paymentMethodId: null,
  shippingAddress: null,
  isSameAsShippingChecked: true,
  billingData: {},
  orderHasShipping: true,
  shippingOnFileAddressKey: null,
  navigation: null,
  isVenmoPaymentInProgress: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestBillingContainer);
export { GuestBillingContainer as GuestBillingContainerVanilla };
