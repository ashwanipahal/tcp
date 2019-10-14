import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { getCardListState } from '../../../../../account/Payment/container/Payment.selectors';
import BillingPaymentForm from '../views';
import CreditCardSelector from './CreditCard.selectors';
import constants from './CreditCard.constants';
import CheckoutSelectors from '../../../container/Checkout.selector';
import { updateCardData } from '../../../container/Checkout.action';

/**
 * @class GiftCardsContainer
 * @extends {PureComponent}
 * @description container component to render signed in user form.
 */
export class GiftCardsContainer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.initialValues = null;
  }

  /**
   * @function getCreditCardDefault
   * @description returns the default credit card of the user
   */
  getCreditCardDefault = cardList =>
    cardList &&
    cardList.size > 0 &&
    cardList.filter(
      card =>
        card.ccType !== constants.ACCEPTED_CREDIT_CARDS.GIFT_CARD &&
        card.ccType !== constants.ACCEPTED_CREDIT_CARDS.VENMO &&
        card.defaultInd
    );

  /**
   * @function getOnFileAddressId
   * @description returns the on file address id
   */
  getOnFileAddressId = ({ billingOnFileAddressId, shippingOnFileAddressId }) => {
    return billingOnFileAddressId || shippingOnFileAddressId;
  };

  /**
   * @function showAddressPrefilled
   * @description checks whether the address form needs to be prefilled or not
   */
  showAddressPrefilled = () => {
    const { userAddresses, orderHasShipping, billingData } = this.props;
    if (!orderHasShipping && this.isBillingIfoPresent()) {
      const {
        address: { onFileAddressId },
      } = billingData;
      /* istanbul ignore else */
      if (userAddresses && userAddresses.size > 0) {
        const selectedAddress = userAddresses.find(add => add.addressId === onFileAddressId);
        if (!selectedAddress) return true;
      } else return true;
    }
    return false;
  };

  /**
   * @function isBillingIfoPresent
   * @description checks whether cart item has billing info present or not
   */
  isBillingIfoPresent = () => {
    const { billingData, shippingAddress, orderHasShipping } = this.props;
    return (
      billingData.address &&
      !isEmpty(billingData) &&
      (!isEmpty(shippingAddress) || !orderHasShipping)
    );
  };

  /**
   * @function getPaymentMethodId
   * @description returns the initial payment method selected during billing page load.
   */
  getPaymentMethodId = () => {
    const { isVenmoPaymentInProgress } = this.props;
    return isVenmoPaymentInProgress
      ? constants.PAYMENT_METHOD_VENMO
      : constants.PAYMENT_METHOD_CREDIT_CARD;
  };

  /**
   * @function getInitialValues
   * @description returns the initial values for the billing form
   */
  getInitialValues = cardList => {
    const {
      billingData,
      orderHasShipping,
      shippingOnFileAddressKey,
      shippingOnFileAddressId,
    } = this.props;
    let billingOnFileAddressKey;
    let cardNumber;
    let cvvCode;
    let expMonth;
    let expYear;
    let billingOnFileAddressId;
    let cardType;
    let onFileCardId;
    let firstName;
    let lastName;
    let addressLine1;
    let addressLine2;
    let city;
    let state;
    let zipCode;
    let country;
    let address;
    if (this.isBillingIfoPresent()) {
      ({
        address = {
          onFileAddressKey: billingOnFileAddressKey,
          onFileAddressId: billingOnFileAddressId,
          firstName,
          lastName,
          addressLine1,
          addressLine2,
          city,
          state,
          zipCode,
          country,
        },
        billing: { cardNumber, cvvCode, expMonth, expYear, cardType },
        onFileCardId,
      } = billingData);
    }
    if (this.showAddressPrefilled()) {
      address = {
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        country,
      };
    }
    if (!cardList) {
      return {
        onFileCardKey: 0,
        paymentMethodId: this.getPaymentMethodId(),
        saveToAccount: true,
        sameAsShipping:
          orderHasShipping &&
          (isEmpty(billingData) || billingOnFileAddressKey === shippingOnFileAddressKey),
        cardNumber,
        cvvCode,
        expMonth,
        expYear,
        cardType,
        onFileAddressId: this.getOnFileAddressId({
          billingOnFileAddressId,
          shippingOnFileAddressId,
        }),
        address,
      };
    }

    return {
      onFileCardKey:
        onFileCardId || (cardList.size > 0 && cardList.get(0) && cardList.get(0).creditCardId),
      paymentMethodId: this.getPaymentMethodId(),
      saveToAccount: true,
      sameAsShipping: orderHasShipping && billingOnFileAddressKey === shippingOnFileAddressKey,
      cardNumber,
      cvvCode,
      expMonth,
      expYear,
      cardType,
      onFileAddressId: this.getOnFileAddressId({ billingOnFileAddressId, shippingOnFileAddressId }),
      address,
    };
  };

  /**
   * @function getSelectedCard
   * @description returns the selected card from the card list
   */
  getSelectedCard = (cardList, paymentId) => {
    return cardList.find(card => card.creditCardId === paymentId);
  };

  getAddressLine2 = addressLine2 => {
    return addressLine2 || '';
  };

  getNickName = selectedAddress =>
    selectedAddress && selectedAddress.get(0) && selectedAddress.get(0).nickName;

  /**
   * @function submitBillingData
   * @description submits the billing data
   */
  submitBillingData = data => {
    const { cardList, handleSubmit, userAddresses, navigation } = this.props;
    let onFileAddressKey;
    let addressLine1;
    let addressLine2;
    let city;
    let country;
    let firstName;
    let lastName;
    let state;
    let zipCode;
    let cardDetails = this.getSelectedCard(cardList, data.onFileCardKey);
    /* istanbul ignore else */
    if (!cardDetails) {
      /* istanbul ignore else */
      if (data.address) {
        ({
          addressLine1,
          addressLine2,
          city,
          country,
          firstName,
          lastName,
          state,
          zipCode,
        } = data.address);
      }
      cardDetails = {
        cardNumber: data.cardNumber,
        ccBrand: data.cardType,
        cvv: data.cvvCode,
        emailAddress: undefined,
        expMonth: data.expMonth,
        expYear: data.expYear,
        addressDetails: {
          addressLine1,
          addressLine2: this.getAddressLine2(addressLine2),
          city,
          country,
          firstName,
          lastName,
          state,
          zipCode,
        },
      };
    }
    /* istanbul ignore else */
    if (data.onFileAddressId) {
      const selectedAddress =
        userAddresses &&
        userAddresses.size > 0 &&
        userAddresses.filter(address => address.addressId === data.onFileAddressId);
      onFileAddressKey = this.getNickName(selectedAddress);
    }
    const isCardTypeRequired = cardDetails.ccBrand !== constants.ACCEPTED_CREDIT_CARDS.PLACE_CARD;
    handleSubmit({
      address: {
        ...cardDetails.addressDetails,
        onFileAddressId: data.onFileAddressId,
        onFileAddressKey,
        sameAsShipping: data.sameAsShipping,
      },
      cardNumber: cardDetails.cardNumber || cardDetails.accountNo,
      cardType: cardDetails.ccBrand,
      cvv: data.cvvCode,
      emailAddress: undefined,
      expMonth: cardDetails.expMonth,
      expYear: cardDetails.expYear,
      isCVVRequired: isCardTypeRequired,
      isExpirationRequired: isCardTypeRequired,
      paymentId: cardDetails.creditCardId,
      paymentMethod: data.paymentMethodId,
      phoneNumber: cardDetails.addressDetails && cardDetails.addressDetails.phone1,
      saveToAccount: data.saveToAccount,
      isDefault: data.defaultPayment || cardDetails.defaultInd,
      navigation,
      onFileCardId: data.onFileCardKey,
    });
  };

  /**
   * @function render
   * @description render method to be called of component
   */
  render() {
    const {
      cardList,
      labels,
      onFileCardKey,
      paymentMethodId,
      cvvCodeRichText,
      orderHasShipping,
      isGuest,
      backLinkPickup,
      backLinkShipping,
      nextSubmitText,
      formErrorMessage,
      isPaymentDisabled,
      shippingAddress,
      addressLabels,
      billingData,
      isSameAsShippingChecked,
      syncErrorsObj,
      cardType,
      isSaveToAccountChecked,
      userAddresses,
      selectedOnFileAddressId,
      isEditFormSameAsShippingChecked,
      editFormSelectedOnFileAddressId,
      navigation,
      creditFieldLabels,
      updateCardDetail,
      isVenmoEnabled,
      editFormCardType,
      isPLCCEnabled,
    } = this.props;
    this.initialValues = this.getInitialValues(this.getCreditCardDefault(cardList));
    return (
      <BillingPaymentForm
        cardList={cardList}
        labels={labels}
        onFileCardKey={onFileCardKey}
        initialValues={this.initialValues}
        paymentMethodId={paymentMethodId}
        cvvCodeRichText={cvvCodeRichText}
        onSubmit={this.submitBillingData}
        orderHasShipping={orderHasShipping}
        isGuest={isGuest}
        backLinkPickup={backLinkPickup}
        backLinkShipping={backLinkShipping}
        nextSubmitText={nextSubmitText}
        formErrorMessage={formErrorMessage}
        isPaymentDisabled={isPaymentDisabled}
        cardType={cardType}
        editFormCardType={editFormCardType}
        syncErrorsObj={syncErrorsObj}
        addressLabels={addressLabels}
        shippingAddress={shippingAddress}
        isSameAsShippingChecked={isSameAsShippingChecked}
        billingData={billingData}
        isSaveToAccountChecked={isSaveToAccountChecked}
        userAddresses={userAddresses}
        selectedOnFileAddressId={selectedOnFileAddressId}
        editFormSelectedOnFileAddressId={editFormSelectedOnFileAddressId}
        navigation={navigation}
        creditFieldLabels={creditFieldLabels}
        updateCardDetail={updateCardDetail}
        isEditFormSameAsShippingChecked={isEditFormSameAsShippingChecked}
        isVenmoEnabled={isVenmoEnabled}
        isPLCCEnabled={isPLCCEnabled}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cardList: getCardListState(state),
    onFileCardKey: CreditCardSelector.getOnFileCardKey(state, ownProps),
    paymentMethodId: CreditCardSelector.getPaymentMethodId(state, ownProps),
    formErrorMessage: CreditCardSelector.getFormValidationErrorMessages(state),
    isPaymentDisabled: CheckoutSelectors.getIsPaymentDisabled(state),
    syncErrorsObj: CreditCardSelector.getSyncError(state),
    cardType: CreditCardSelector.getCardType(state),
    editFormCardType: CreditCardSelector.getEditFormCardType(state),
    isSameAsShippingChecked: CreditCardSelector.getSameAsShippingValue(state),
    isEditFormSameAsShippingChecked: CreditCardSelector.getEditFormSameAsShippingValue(state),
    isSaveToAccountChecked: CreditCardSelector.getSaveToAccountValue(state),
    shippingOnFileAddressKey: CreditCardSelector.getShippingOnFileAddressKey(state),
    selectedOnFileAddressId: CreditCardSelector.getSelectedOnFileAddressId(state),
    editFormSelectedOnFileAddressId: CreditCardSelector.getEditFormSelectedOnFileAddressId(state),
    shippingOnFileAddressId: CreditCardSelector.getShippingOnFileAddressId(state),
    isPLCCEnabled: CreditCardSelector.getIsPLCCEnabled(state),
    isVenmoEnabled: CheckoutSelectors.getIsVenmoEnabled(state), // Venmo Kill Switch, if Venmo enabled then true, else false.
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCardDetail: payload => {
      dispatch(updateCardData(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftCardsContainer);
