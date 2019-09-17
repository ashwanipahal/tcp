/* eslint-disable max-lines */
import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
import { CHECKOUT_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

/* eslint-disable extra-rules/no-commented-out-code */
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

function isUsSite() {
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

const getCurrentPickupFormNumber = createSelector(
  getShippingPickupFields,
  pickUpContact => pickUpContact && pickUpContact.phoneNumber
);

const getBillingLabels = state => {
  const getBillingLabelValue = label => getLabelValue(state.Labels, label, 'billing', 'checkout');
  return {
    header: getBillingLabelValue('lbl_billing_title'),
    backLinkPickup: getBillingLabelValue('lbl_billing_backLinkPickup'),
    backLinkShipping: getBillingLabelValue('lbl_billing_backLinkShipping'),
    nextSubmitText: getBillingLabelValue('lbl_billing_nextSubmit'),
  };
};

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

const getAlternateFormFields = state => {
  const selector = formValueSelector('checkoutPickup');
  return selector(state, 'pickUpAlternate');
};

const isPickupAlt = createSelector(
  getAlternateFormFields,
  pickUpAlternate => pickUpAlternate && pickUpAlternate.firstName
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
      firstName: pickupValues.get('firstName') || getUserName(state),
      lastName: pickupValues.get('lastName') || getUserLastName(state),
      emailAddress: pickupValues.get('emailAddress') || getUserEmail(state),
      phoneNumber: pickupValues.get('phoneNumber') || getUserPhoneNumber(state),
    },
    smsSignUp: {
      sendOrderUpdate: !!getSmsNumberForOrderUpdates(state),
      phoneNumber: pickupValues.get('phoneNumber') || getUserPhoneNumber(state),
    },
    hasAlternatePickup: isPickupAlt(state),
    pickUpAlternate: isPickupAlt(state) ? alternativeData : {},
  };
}

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
    ({ creditCardId }) => (creditCardId && creditCardId.toString()) === id
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
  getBillingValues,
  getAddressByKey,
  isCardNotUpdated,
  getDetailedCreditCardById,
  getCheckoutProgressBarLabels,
  getSyncError,
  getGiftServicesFormData,
  getGiftServicesSend,
  getReviewLabels,
};
