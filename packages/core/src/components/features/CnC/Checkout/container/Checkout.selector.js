/* eslint-disable max-lines */
import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
import {
  CHECKOUT_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import { constants as venmoConstants } from '@tcp/core/src/components/common/atoms/VenmoPaymentButton/container/VenmoPaymentButton.util';
import { getLocalStorage } from '@tcp/core/src/utils/localStorageManagement';
import { getAPIConfig, isMobileApp, getViewportInfo, getLabelValue } from '../../../../../utils';
/* eslint-disable extra-rules/no-commented-out-code */
import CheckoutUtils from '../util/utility';
import {
  getPersonalDataState,
  getUserName,
  getUserLastName,
  getUserPhoneNumber,
  getUserEmail,
} from '../../../account/User/container/User.selectors';
import constants from '../Checkout.constants';
import BagPageSelector from '../../BagPage/container/BagPage.selectors';
import { getAddressListState } from '../../../account/AddressBook/container/AddressBook.selectors';
import {
  getPickUpContactFormLabels,
  getGiftServicesFormData,
  getSyncError,
  getPaypalPaymentSettings,
} from './Checkout.selector.util';

// import { getAddressListState } from '../../../account/AddressBook/container/AddressBook.selectors';

function getRecalcOrderPointsInterval() {
  return 300000;
}

export const getCheckoutState = state => {
  return state[CHECKOUT_REDUCER_KEY];
};

export const getCheckoutUiFlagState = state => {
  return state[CHECKOUT_REDUCER_KEY].get('uiFlags');
};

export const getCheckoutValuesState = createSelector(
  getCheckoutState,
  state => state && state.get('values')
);

const getIsOrderHasShipping = createSelector(
  BagPageSelector.getOrderItems,
  cartItems => cartItems && cartItems.findIndex(item => !item.getIn(['miscInfo', 'store'])) > -1
);

const getIsOrderHasPickup = createSelector(
  BagPageSelector.getOrderItems,
  orderItems => orderItems && CheckoutUtils.isOrderHasPickup(orderItems)
);

export const isGuest = createSelector(
  getPersonalDataState,
  state => (state == null ? true : !!state.get('isGuest'))
);

function getIsMobile() {
  if (isMobileApp()) return true;
  if (typeof window === 'undefined')
    return {
      width: 0,
      height: 0,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  return getViewportInfo().isMobile;
}

export const isExpressCheckout = createSelector(
  getPersonalDataState,
  state => state && state.get('isExpressEligible')
);

export const getCheckoutStage = createSelector(
  getCheckoutUiFlagState,
  state => state && state.get('stage')
);

export const isRemembered = createSelector(
  getPersonalDataState,
  state => state && state.get('isRemembered')
);

// function getUserContactInfo(state) {
//   return state.User.getIn(['personalData', 'contactInfo']);
// }

export const getUserContactInfo = createSelector(
  getPersonalDataState,
  state => state && state.get('contactInfo')
);

function getShippingDestinationValues(state) {
  const { emailAddress, ...result } = JSON.parse(
    JSON.stringify(state.Checkout.getIn(['values', 'shipping']))
  );
  // For shipping address when user logged-in, override email address that of user.
  // When user is guest, keep the address he specified in shipping section.
  return {
    emailAddress: getUserEmail(state) || emailAddress,
    ...result,
  };
}

const getShippingAddressID = createSelector(
  getShippingDestinationValues,
  shippingDestinationValues => {
    const { onFileAddressId } = shippingDestinationValues;
    return onFileAddressId;
  }
);

const getShippingAddress = createSelector(
  getShippingDestinationValues,
  shippingDestinationValues => {
    const { address } = shippingDestinationValues;
    return address;
  }
);

const getAddEditResponseAddressId = state =>
  state.Checkout.getIn(['values', 'addEditResponseAddressId']);

// function getAddressBook(state, country, noBillingAddresses) {
//   let addresses = [];

//   if (!country) {
//     // if (noBillingAddresses) {
//     //   addresses = state.addresses.addressBook.filter(entry => entry.type !== ADDREESS_TYPE.BILLING);
//     // } else {
//     addresses = getAddressListState(state);
//     // }
//   } // else {
//   // let filtered = state.addresses.addressBook.filter(
//   //   entry =>
//   //     entry.address.country === country &&
//   //     (!noBillingAddresses || entry.type !== ADDREESS_TYPE.BILLING)
//   // );
//   // let defaultAddress = filtered.find(addressEntry => addressEntry.isDefault);

//   // // REVIEW: if there's no default for the selected requested country (country filter might leave it out)
//   // // then flag the first one as default. Can't be on the abstractor,
//   // // unless we store different versions of the address book (per country)
//   // // but I'm not sure about location because storeviews trigger on everything and want to avoid unnecesary renders
//   // if (!defaultAddress) {
//   //   addresses = filtered.map((entry, index) => {
//   //     return {
//   //       ...entry,
//   //       isDefault: index === 0,
//   //     };
//   //   });
//   // } else {
//   //   addresses = filtered;
//   // }
//   // }

//   return addresses;
// }

function getDefaultAddress(/* state, country, noBillingAddresses */) {
  return false;
  // const countryFilteredAddresses = getAddressBook(state, country, noBillingAddresses);
  // const defaultAddress = countryFilteredAddresses.find(
  //   addressEntry => addressEntry.get && addressEntry.get('primary')
  // );

  // if (countryFilteredAddresses.length && !defaultAddress) {
  //   return countryFilteredAddresses.get('0');
  // } else {
  //   return defaultAddress;
  // }
}

export const getPickupValues = createSelector(
  getCheckoutValuesState,
  state => state && state.get('pickUpContact')
);

// function getPickupValues(state) {
//   return state.Checkout.getIn(['values', 'pickUpContact']);
// }

export const getPickupAltValues = createSelector(
  getCheckoutValuesState,
  state => state && state.get('pickUpAlternative')
);
// function getPickupAltValues(state) {
//   return state.Checkout.getIn(['values', 'pickUpAlternative']);
// }

function getGiftWrappingValues(state) {
  return state.Checkout.getIn(['values', 'giftWrap']) || '';
}

function getCurrentSiteId() {
  return getAPIConfig().siteId;
}

function getIsSmsUpdatesEnabled() {
  return getAPIConfig().isSmsUpdatesEnabled || true;
}

export function isUsSite() {
  return getCurrentSiteId() === constants.ROUTING_CONST.siteIds.us;
}

function isSmsUpdatesEnabled() {
  return isUsSite() && getIsSmsUpdatesEnabled();
}

// function getCurrentPickupFormNumber(state) {
//   let phoneNumber = '';

//   try {
//     phoneNumber = state.form.getIn(['checkoutPickup', 'values', 'pickUpContact', 'phoneNumber']);
//   } catch (error) {
//     // Gobble...Gobble.
//   }

//   return phoneNumber;
// }
const getShippingGiftServicesField = state => {
  const selector = formValueSelector('checkoutShipping');
  return selector(state, 'giftServices');
};

const getShippingSmsSignUpFields = state => {
  const selector = formValueSelector('checkoutShipping');
  return selector(state, 'smsSignUp');
};

const getShipmentMethodsFields = state => {
  const selector = formValueSelector('checkoutShipping');
  return selector(state, 'shipmentMethods');
};

const getShippingPickupFields = state => {
  const selector = formValueSelector('checkoutPickup');
  return selector(state, 'pickUpContact');
};

const getSelectedShipmentId = createSelector(
  getShipmentMethodsFields,
  shipmentMethodsFields => shipmentMethodsFields && shipmentMethodsFields.shippingMethodId
);

const getShippingSendOrderUpdate = createSelector(
  getShippingSmsSignUpFields,
  smsSignUpFields => smsSignUpFields && smsSignUpFields.sendOrderUpdate
);

export const getGiftServicesSend = createSelector(
  getShippingGiftServicesField,
  giftServicesFields => giftServicesFields && giftServicesFields.sendGiftServices
);

const getSaveToAddressBook = state => {
  const selector = formValueSelector('checkoutShipping');
  return selector(state, 'saveToAddressBook');
};

const getOnFileAddressKey = state => {
  const selector = formValueSelector('checkoutShipping');
  return selector(state, 'onFileAddressKey');
};

const getAddressFields = state => {
  const selector = formValueSelector('checkoutShipping');
  return selector(state, 'address');
};

const getAddressPhoneNo = createSelector(
  getAddressFields,
  addressFields => addressFields && addressFields.phoneNumber
);

const getDefaultShipping = state => {
  const selector = formValueSelector('checkoutShipping');
  return selector(state, 'defaultShipping');
};

const getShippingPhoneAndEmail = createSelector(
  getShippingDestinationValues,
  shippingDestinationValues => {
    const { phoneNumber, emailAddress } = shippingDestinationValues;
    return { phoneNumber, emailAddress };
  }
);

const getCurrentPickupFormNumber = createSelector(
  getShippingPickupFields,
  pickUpContact => pickUpContact && pickUpContact.phoneNumber
);

const getBillingLabelValue = state =>
  state.Labels && state.Labels.checkout && state.Labels.checkout.billing;

const getBillingLabels = createSelector(
  getBillingLabelValue,
  billingLabel => {
    const labels = {};
    const labelKeys = [
      'lbl_billing_title',
      'lbl_billing_backLinkPickup',
      'lbl_billing_backLinkShipping',
      'lbl_billing_nextSubmit',
      'lbl_billing_billingAddress',
      'lbl_billing_sameAsShipping',
      'lbl_billing_paymentMethodTitle',
      'lbl_billing_saveToAccount',
      'lbl_billing_defaultPayment',
      'lbl_billing_default_card',
      'lbl_billing_addNewAddress',
      'lbl_billing_creditCard',
      'lbl_billing_selectFromCard',
      'lbl_billing_addCreditHeading',
      'lbl_billing_default',
      'lbl_billing_cardDetailsTitle',
      'lbl_billing_editBtn',
      'lbl_billing_creditCardEnd',
      'lbl_billing_addCreditBtn',
      'lbl_billing_paypal',
      'lbl_billing_venmo',
      'lbl_billing_selectCardTitle',
      'lbl_billing_select',
      'lbl_billing_cardEditCancel',
      'lbl_billing_cardEditSave',
      'lbl_billing_cvvCode',
      'lbl_billing_continueWith',
      'lbl_billing_cardEditUnSavedError',
      'lbl_billing_addCC',
    ];
    labelKeys.forEach(key => {
      labels[key] = getLabelValue(billingLabel, key);
    });
    const {
      lbl_billing_title: header,
      lbl_billing_backLinkPickup: backLinkPickup,
      lbl_billing_backLinkShipping: backLinkShipping,
      lbl_billing_nextSubmit: nextSubmitText,
      lbl_billing_billingAddress: billingAddress,
      lbl_billing_sameAsShipping: sameAsShipping,
      lbl_billing_default_card: defaultCard,
      lbl_billing_addNewAddress: addNewAddress,
      lbl_billing_paymentMethodTitle: paymentMethod,
      lbl_billing_saveToAccount: saveToAccount,
      lbl_billing_defaultPayment: defaultPayment,
      lbl_billing_creditCard: creditCard,
      lbl_billing_creditCardEnd: creditCardEnd,
      lbl_billing_selectFromCard: selectFromCard,
      lbl_billing_addCreditHeading: addCreditHeading,
      lbl_billing_default: defaultBadge,
      lbl_billing_cardDetailsTitle: cardDetailsTitle,
      lbl_billing_editBtn: edit,
      lbl_billing_addCreditBtn: addCreditBtn,
      lbl_billing_paypal: paypal,
      lbl_billing_venmo: venmo,
      lbl_billing_selectCardTitle: selectCardTitle,
      lbl_billing_select: select,
      lbl_billing_cvvCode: cvvCode,
      lbl_billing_cardEditCancel: cancelButtonText,
      lbl_billing_cardEditSave: saveButtonText,
      lbl_billing_continueWith: continueWith,
      lbl_billing_cardEditUnSavedError: cardEditUnSavedError,
      lbl_billing_addCC: addCreditCard,
    } = labels;
    return {
      header,
      backLinkShipping,
      backLinkPickup,
      nextSubmitText,
      billingAddress,
      sameAsShipping,
      defaultCard,
      addNewAddress,
      paymentMethod,
      saveButtonText,
      cardEditUnSavedError,
      cancelButtonText,
      saveToAccount,
      defaultPayment,
      creditCard,
      creditCardEnd,
      selectFromCard,
      addCreditHeading,
      defaultBadge,
      cardDetailsTitle,
      edit,
      addCreditBtn,
      paypal,
      venmo,
      selectCardTitle,
      select,
      cvvCode,
      continueWith,
      addCreditCard,
    };
  }
);

const getCreditFieldLabelsObj = state =>
  state.Labels && state.Labels.global && state.Labels.global.creditCardFields;

const getCreditFieldLabels = createSelector(
  getCreditFieldLabelsObj,
  creditFieldLabels => {
    const labels = {};
    const labelKeys = [
      'lbl_creditField_cardNumber',
      'lbl_creditField_expMonth',
      'lbl_creditField_expYear',
      'lbl_creditField_cvvCode',
      'lbl_creditField_cameraText',
    ];
    labelKeys.forEach(key => {
      labels[key] = getLabelValue(creditFieldLabels, key);
    });
    const {
      lbl_creditField_cardNumber: cardNumber,
      lbl_creditField_expMonth: expMonth,
      lbl_creditField_expYear: expYear,
      lbl_creditField_cvvCode: cvvCode,
      lbl_creditField_cameraText: cameraText,
    } = labels;
    return {
      cardNumber,
      expMonth,
      expYear,
      cvvCode,
      cameraText,
    };
  }
);

const getSmsSignUpLabels = state => {
  const {
    lbl_smsSignup_smsSignupText: smsSignupText,
    lbl_smsSignup_privacyPolicy: privacyPolicy,
    lbl_smsSignup_orderUpdates: orderUpdates,
  } = state.Labels.global && state.Labels.global.smsSignup;
  return {
    smsSignupText,
    privacyPolicy,
    orderUpdates,
  };
};

const getEmailSignUpLabels = state => {
  return {
    emailSignupHeading: getLabelValue(
      state.Labels,
      'lbl_pickup_emailSignupHeading',
      'pickup',
      'checkout'
    ),
    emailSignupSubHeading: getLabelValue(
      state.Labels,
      'lbl_pickup_emailSignupSubHeading',
      'pickup',
      'checkout'
    ),
    emailSignupSubSubHeading: getLabelValue(
      state.Labels,
      'lbl_pickup_emailSignupSubSubHeading',
      'pickup',
      'checkout'
    ),
    emailSignupContact: getLabelValue(
      state.Labels,
      'lbl_pickup_emailSignupContact',
      'pickup',
      'checkout'
    ),
  };
};

const getCheckoutProgressBarLabels = state => {
  return {
    pickupLabel: getLabelValue(
      state.Labels,
      'lbl_checkoutheader_pickup',
      'checkoutHeader',
      'checkout'
    ),
    shippingLabel: getLabelValue(
      state.Labels,
      'lbl_checkoutHeader_shipping',
      'checkoutHeader',
      'checkout'
    ),
    billingLabel: getLabelValue(
      state.Labels,
      'lbl_checkoutHeader_billing',
      'checkoutHeader',
      'checkout'
    ),
    reviewLabel: getLabelValue(
      state.Labels,
      'lbl_checkoutHeader_review',
      'checkoutHeader',
      'checkout'
    ),
  };
};

const getShipmentMethods = state => {
  return state.Checkout.getIn(['options', 'shippingMethods']);
};

const getShipmentLoadingStatus = state => {
  return state.Checkout.getIn(['values', 'isShippingFormLoading']);
};

const getDefaultShipmentID = createSelector(
  [getShipmentMethods, getShippingDestinationValues],
  (shipmentMethods, shippingDestinationValues) => {
    if (shippingDestinationValues && shippingDestinationValues.method) {
      const {
        method: { shippingMethodId },
      } = shippingDestinationValues;
      if (shippingMethodId) {
        const defaultShipment = shipmentMethods.find(method => method.id === shippingMethodId);
        return defaultShipment && defaultShipment.id;
      }
    }
    const defaultMethod = shipmentMethods.find(
      (method, index) => method.isDefault === true || index === 0
    );
    return defaultMethod && defaultMethod.id;
  }
);

const getSelectedShippingMethodDetails = createSelector(
  [getDefaultShipmentID, getShipmentMethods],
  (shippingID, method) => {
    const selectedMethod = method.filter(item => item.id === shippingID);
    return selectedMethod.length > 0 && selectedMethod[0];
  }
);

const getAlternateFormFields = state => {
  const selector = formValueSelector('checkoutPickup');
  return selector(state, 'pickUpAlternate');
};

export const isPickupAlt = createSelector(
  getPickupAltValues,
  pickUpAlternate => pickUpAlternate && !!pickUpAlternate.firstName
);

const getLabels = state => state.Labels;

export const getAlternateFormUpdate = createSelector(
  getAlternateFormFields,
  smsSignUpFields => smsSignUpFields && smsSignUpFields.hasAlternatePickup
);

const getSmsSignUpFields = state => {
  const selector = formValueSelector('checkoutPickup');
  return selector(state, 'smsSignUp');
};

export const getSendOrderUpdate = createSelector(
  getSmsSignUpFields,
  smsSignUpFields => smsSignUpFields && smsSignUpFields.sendOrderUpdate
);

const getSmsNumberForOrderUpdates = createSelector(
  getSmsSignUpFields,
  smsSignUpFields => smsSignUpFields && smsSignUpFields.phoneNumber
);

function getPickupInitialPickupSectionValues(state) {
  // let userContactInfo = userStoreView.getUserContactInfo(state);
  // values (if any) entered previously in the checkout process,
  // or reported as checkout defaults by backend
  const pickupValues = getPickupValues(state);
  const alternativeData = {
    ...{ hasAlternatePickup: isPickupAlt(state) },
    ...getPickupAltValues(state),
  };
  return {
    pickUpContact: {
      firstName: pickupValues.firstName || getUserName(state),
      lastName: pickupValues.lastName || getUserLastName(state),
      emailAddress: pickupValues.emailAddress || getUserEmail(state),
      phoneNumber: pickupValues.phoneNumber || getUserPhoneNumber(state),
    },
    smsSignUp: {
      sendOrderUpdate: !!getSmsNumberForOrderUpdates(state),
      phoneNumber: pickupValues.phoneNumber || getUserPhoneNumber(state),
    },
    hasAlternatePickup: isPickupAlt(state),
    pickUpAlternate: isPickupAlt(state) ? alternativeData : {},
  };
}

/**
 * Get if Pickup has values in the redux state
 * @param {object} state
 * @returns {boolean}
 */
const isPickupHasValues = state => {
  const pickupValues = getPickupInitialPickupSectionValues(state);
  return pickupValues && pickupValues.pickUpContact && pickupValues.pickUpContact.firstName;
};

function getIsPaymentDisabled(state) {
  const orderDetails = state.CartPageReducer.get('orderDetails');
  if (orderDetails) {
    return orderDetails.get('grandTotal') <= orderDetails.get('giftCardsTotal');
  }
  return false;
}

function getAddressByKey(state, onFileAddressKey) {
  const addressList = getAddressListState(state);
  if (addressList) {
    return addressList.find(address => address.nickName === onFileAddressKey);
  }
  return false;
}

function getBillingValues(state) {
  return state.Checkout.getIn(['values', 'billing']);
}

function getDetailedCreditCardById(state, id) {
  return JSON.parse(JSON.stringify(state.PaymentReducer.get('cardList'))).find(
    ({ creditCardId }) => (creditCardId && creditCardId.toString()) === id.toString()
  );
}

function isCardNotUpdated(state, cardId) {
  return getBillingValues(state).onFileCardId === cardId;
}

const getReviewLabels = state => {
  const getReviewLabelValue = label => getLabelValue(state.Labels, label, 'review', 'checkout');
  return {
    header: getReviewLabelValue('lbl_review_title'),
    backLinkBilling: getReviewLabelValue('lbl_review_backLinkBilling'),
    nextSubmitText: getReviewLabelValue('lbl_review_nextSubmit'),
    applyConditionPreText: getReviewLabelValue('lbl_review_applyConditionPreText'),
    applyConditionTermsText: getReviewLabelValue('lbl_review_applyConditionTermsText'),
    applyConditionAndText: getReviewLabelValue('lbl_review_applyConditionAndText'),
    applyConditionPolicyText: getReviewLabelValue('lbl_review_applyConditionPolicyText'),
    pickupSectionTitle: getReviewLabelValue('lbl_review_pickupSectionTitle'),
    shippingSectionTitle: getReviewLabelValue('lbl_review_shippingSectionTitle'),
    billingSectionTitle: getReviewLabelValue('lbl_review_billingSectionTitle'),
    ariaLabelReviewPageTitle: getReviewLabelValue('lbl_review_ariaLabelReviewPageTitle'),
    ariaLabelBackLink: getReviewLabelValue('lbl_review_ariaLabelBackLink'),
  };
};

const getCurrentOrderId = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'orderId']);
};

const getSmsNumberForBillingOrderUpdates = state =>
  state.Checkout.getIn(['values', 'smsInfo', 'numberForUpdates']);

const getVenmoData = () => {
  const venmoDataString = getLocalStorage(venmoConstants.VENMO_STORAGE_KEY);
  return venmoDataString ? JSON.parse(venmoDataString) : {};
};

const getVenmoClientTokenData = state =>
  state[CHECKOUT_REDUCER_KEY].getIn(['values', 'venmoClientTokenData']);

const isVenmoPaymentInProgress = () => {
  const venmoProgressString = getLocalStorage(venmoConstants.VENMO_INPROGRESS_KEY);
  return venmoProgressString ? venmoProgressString === 'true' : false;
};

const isVenmoPickupBannerDisplayed = () => {
  const venmoPickupBanner = getLocalStorage(venmoConstants.VENMO_PICKUP_BANNER);
  return venmoPickupBanner ? venmoPickupBanner === 'true' : false;
};

const isVenmoShippingBannerDisplayed = () => {
  const venmoShippingBanner = getLocalStorage(venmoConstants.VENMO_SHIPPING_BANNER);
  return venmoShippingBanner ? venmoShippingBanner === 'true' : false;
};

const isVenmoPaymentSaveSelected = state =>
  state[CHECKOUT_REDUCER_KEY].getIn(['uiFlags', 'venmoPaymentOptionSave']);

const isGiftOptionsEnabled = state => {
  return state[CHECKOUT_REDUCER_KEY].getIn(['uiFlags', 'isGiftOptionsEnabled']);
};

/**
 * Mainly used to check for Venmo nonce expiry
 * @param state
 */
const isVenmoNonceNotExpired = state => {
  const venmoData = getVenmoData();
  const expiry = venmoConstants.VENMO_NONCE_EXPIRY_TIMEOUT;
  const { nonce, timestamp } = venmoData;
  const venmoClientTokenData = getVenmoClientTokenData(state);
  const venmoPaymentTokenAvailable = venmoClientTokenData
    ? venmoClientTokenData.venmoPaymentTokenAvailable
    : false;
  return venmoPaymentTokenAvailable === 'TRUE' || (nonce && Date.now() - timestamp <= expiry);
};

const isVenmoPaymentToken = state => {
  const venmoClientTokenData = getVenmoClientTokenData(state);
  const venmoPaymentTokenAvailable = venmoClientTokenData
    ? venmoClientTokenData.venmoPaymentTokenAvailable
    : false;
  return venmoPaymentTokenAvailable === 'TRUE';
};

const isVenmoNonceActive = state => {
  const venmoData = getVenmoData();
  const venmoPaymentInProgress = isVenmoPaymentInProgress();
  return (
    venmoData &&
    (venmoData.nonce || isVenmoPaymentToken(state)) &&
    venmoPaymentInProgress &&
    isVenmoNonceNotExpired(state)
  );
};

function isVenmoPaymentAvailable(state) {
  const venmoData = getVenmoData();
  const venmoPaymentInProgress = isVenmoPaymentInProgress();
  return venmoData && (venmoData.nonce || isVenmoPaymentToken(state)) && venmoPaymentInProgress;
}

/**
 * This method is used to decide if we need to show review page next based on order conditions.
 */
const hasVenmoReviewPageRedirect = state => {
  const isVenmoInProgress = isVenmoPaymentInProgress();
  const isVenmoShippingDisplayed = isVenmoShippingBannerDisplayed();
  const orderHasShipping = getIsOrderHasShipping(state);
  const orderHasPickup = getIsOrderHasPickup(state);
  const hasPickupValues = isPickupHasValues(state);
  const addressList = getAddressListState(state);
  const hasShippingAddress = addressList && addressList.size > 0;
  let reviewPageRedirect = false;
  if (!isVenmoInProgress || isVenmoShippingDisplayed) {
    return reviewPageRedirect;
  }
  if (orderHasShipping && orderHasPickup) {
    // Mix Cart
    reviewPageRedirect = hasShippingAddress && hasPickupValues;
  } else if (orderHasShipping) {
    // Ship to Home Item
    reviewPageRedirect = hasShippingAddress;
  } else if (orderHasPickup) {
    // Boss Bopis scenario
    reviewPageRedirect = hasPickupValues;
  }
  return reviewPageRedirect;
};

const getGiftWrapOptions = state => {
  return state.Checkout.getIn(['options', 'giftWrapOptions']);
};

const getSelectedGiftWrapDetails = state => {
  const orderDetails = state.CartPageReducer.get('orderDetails');
  const checkout = orderDetails.get('checkout');
  const optionId = checkout.getIn(['giftWrap', 'optionId']);
  const selectedOptionData = getGiftWrapOptions(state);
  if (selectedOptionData.body) {
    const selectedOption = selectedOptionData.body.giftOptions.filter(
      option => option.catEntryId === optionId
    );
    if (selectedOption.length === 1) return selectedOption[0];
  }

  return [];
};

/**
 * @function getInternationalCheckoutApiUrl
 * @description this selector gives borderFree url for iframe
 */
function getInternationalCheckoutApiUrl() {
  return getAPIConfig().borderFree;
}
/**
 * @function getInternationalCheckoutCommUrl
 * @description this selector gives borderFreeComm url for iframe
 */
function getInternationalCheckoutCommUrl() {
  return getAPIConfig().borderFreeComm;
}

/**
 *
 * @function getInternationalCheckoutUrl
 * @param {*} state
 * @description this selector gives international url from state.
 */
function getInternationalCheckoutUrl(state) {
  return state.Checkout.getIn(['options', 'internationalUrl']);
}

/**
 * @function getIsVenmoEnabled
 * @description - Venmo Kill Switch Selector
 * @param {object} state
 * @returns {bool}
 */
const getIsVenmoEnabled = state => {
  return (
    getIsMobile() &&
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'VENMO_ENABLED']) === 'TRUE'
  );
};

const getCurrentLanguage = state => {
  return (
    (state.CountrySelector && state.CountrySelector.get('language')) || constants.DEFAULT_LANGUAGE
  );
};

const getReviewPageLabels = state =>
  state.Labels && state.Labels.checkout && state.Labels.checkout.review;

/**
 * @function getPickupSectionLabels
 * @param {Object} state
 * @description This selector provides the state of the review page labels.
 * @returns {Object}
 */
const getPickupSectionLabels = createSelector(
  getReviewPageLabels,
  reviewLabels => {
    const labels = {};
    const labelKeys = [
      'lbl_review_pickupSectionTitle',
      'lbl_review_sectionAnchor',
      'lbl_review_sectionPickupText',
      'lbl_review_sectionPickupItem',
      'lbl_review_sectionPickupItems',
      'lbl_review_sectionPickupToday',
      'lbl_review_sectionPickupAlternateHeading',
      'lbl_review_sectionPickupOrderTitle',
    ];
    labelKeys.forEach(key => {
      labels[key] = getLabelValue(reviewLabels, key);
    });
    return labels;
  }
);

/**
 * @function getShippingSectionLabels
 * @param {Object} state
 * @description This selector provides the state of the review page labels.
 * @returns {Object}
 */
const getShippingSectionLabels = createSelector(
  getReviewPageLabels,
  reviewLabels => {
    const labels = {};
    const labelKeys = [
      'lbl_review_shippingSectionTitle',
      'lbl_review_sectionAnchor',
      'lbl_review_sectionShippingHeading',
      'lbl_review_sectionShippingAddressTitle',
      'lbl_review_sectionShippingMethodTitle',
      'lbl_review_sectionShippingGiftServiceTitle',
      'lbl_review_sectionShippingGiftServiceDefault',
    ];
    labelKeys.forEach(key => {
      labels[key] = getLabelValue(reviewLabels, key);
    });
    return labels;
  }
);

/**
 * @function getVenmoUserName
 * @description Gets the venmo username which is authorized from the app
 */
export const getVenmoUserName = () => {
  const venmoData = getVenmoData();
  const { details: { username } = {} } = venmoData || {};
  return username;
};

const getExpressReviewShippingSectionId = state => {
  const selector = formValueSelector('expressReviewPage');
  return selector(state, 'expressReviewShippingSection');
};

export default {
  getRecalcOrderPointsInterval,
  getIsOrderHasShipping,
  getShippingDestinationValues,
  getDefaultAddress,
  isGuest,
  getIsMobile,
  getPickupInitialPickupSectionValues,
  isSmsUpdatesEnabled,
  getCurrentPickupFormNumber,
  isUsSite,
  getUserContactInfo,
  getPickupAltValues,
  getCurrentSiteId,
  getIsSmsUpdatesEnabled,
  getSmsSignUpFields,
  getShipmentMethodsFields,
  getSelectedShipmentId,
  getSendOrderUpdate,
  getAddressFields,
  getAddressPhoneNo,
  getSmsSignUpLabels,
  getIsOrderHasPickup,
  getEmailSignUpLabels,
  getGiftWrappingValues,
  getSmsNumberForOrderUpdates,
  getShipmentMethods,
  getDefaultShipmentID,
  getShippingSendOrderUpdate,
  getAlternateFormUpdate,
  getPickUpContactFormLabels,
  getUserEmail,
  getSaveToAddressBook,
  getOnFileAddressKey,
  getShippingSmsSignUpFields,
  getShippingAddressID,
  getDefaultShipping,
  getAddEditResponseAddressId,
  getBillingLabels,
  getLabels,
  getShippingAddress,
  getIsPaymentDisabled,
  getShipmentLoadingStatus,
  getBillingValues,
  getAddressByKey,
  isCardNotUpdated,
  getDetailedCreditCardById,
  getCheckoutProgressBarLabels,
  getSyncError,
  getGiftServicesFormData,
  getGiftServicesSend,
  getReviewLabels,
  getPickupSectionLabels,
  getShippingSectionLabels,
  isGiftOptionsEnabled,
  getPaypalPaymentSettings,
  getSelectedGiftWrapDetails,
  getSelectedShippingMethodDetails,
  getCurrentOrderId,
  getSmsNumberForBillingOrderUpdates,
  getVenmoData,
  getVenmoClientTokenData,
  isVenmoPaymentAvailable,
  isVenmoNonceActive,
  isVenmoNonceNotExpired,
  isVenmoPaymentInProgress,
  isVenmoPaymentToken,
  getInternationalCheckoutCommUrl,
  getInternationalCheckoutApiUrl,
  getInternationalCheckoutUrl,
  getIsVenmoEnabled,
  getCurrentLanguage,
  isVenmoShippingBannerDisplayed,
  isVenmoPickupBannerDisplayed,
  isVenmoPaymentSaveSelected,
  hasVenmoReviewPageRedirect,
  getShippingPhoneAndEmail,
  getCreditFieldLabels,
  isPickupHasValues,
  getVenmoUserName,
  getExpressReviewShippingSectionId,
};
