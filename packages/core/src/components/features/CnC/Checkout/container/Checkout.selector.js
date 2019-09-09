/* eslint-disable max-lines */
import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
import { CHECKOUT_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

/* eslint-disable extra-rules/no-commented-out-code */
import { getAPIConfig, isMobileApp, getViewportInfo, getLabelValue } from '@tcp/core/src/utils';
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
  const { method, emailAddress, ...result } = JSON.parse(
    JSON.stringify(state.Checkout.getIn(['values', 'shipping']))
  );
  // For shipping address when user logged-in, override email address that of user.
  // When user is guest, keep the address he specified in shipping section.
  return {
    emailAddress: getUserEmail(state) || emailAddress,
    ...result,
  };
}

function getDefaultAddress(/* state, country, noBillingAddresses */) {
  return false;
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
  return state.Checkout.getIn(['values', 'giftWrap']);
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

const getAddressFields = state => {
  const selector = formValueSelector('checkoutShipping');
  return selector(state, 'address');
};

const getAddressPhoneNo = createSelector(
  getAddressFields,
  addressFields => addressFields && addressFields.phoneNumber
);

const getCurrentPickupFormNumber = createSelector(
  getShippingPickupFields,
  pickUpContact => pickUpContact && pickUpContact.phoneNumber
);

const getBillingLabels = state => {
  return {
    header: getLabelValue(state.Labels, 'lbl_billing_title', 'billing', 'checkout'),
    backLinkPickup: getLabelValue(
      state.Labels,
      'lbl_billing_backLinkPickup',
      'billing',
      'checkout'
    ),
    backLinkShipping: getLabelValue(
      state.Labels,
      'lbl_billing_backLinkShipping',
      'billing',
      'checkout'
    ),
    nextSubmitText: getLabelValue(state.Labels, 'lbl_billing_nextSubmit', 'billing', 'checkout'),
  };
};

const getShippingLabels = state => {
  return {
    header: getLabelValue(state.Labels, 'lbl_shipping_header', 'shipping', 'checkout'),
    sectionHeader: getLabelValue(
      state.Labels,
      'lbl_shipping_sectionHeader',
      'shipping',
      'checkout'
    ),
    shipmentHeader: getLabelValue(
      state.Labels,
      'lbl_shipping_shipmentHeader',
      'shipping',
      'checkout'
    ),
    returnTo: getLabelValue(state.Labels, 'lbl_shipping_returnTo', 'shipping', 'checkout'),
    nextText: getLabelValue(state.Labels, 'lbl_shipping_nextText', 'shipping', 'checkout'),
    billingText: getLabelValue(state.Labels, 'lbl_shipping_backLinkText', 'shipping', 'checkout'),
    backLinkText: getLabelValue(state.Labels, 'lbl_shipping_billingText', 'shipping', 'checkout'),
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

const getPickUpContactFormLabels = state => {
  const {
    lbl_pickup_title: title,
    lbl_pickup_firstName: firstName,
    lbl_pickup_govIdText: govIdText,
    lbl_pickup_lastName: lastName,
    lbl_pickup_email: email,
    lbl_pickup_mobile: mobile,
    lbl_pickup_SMSHeading: SMSHeading,
    lbl_pickup_SMSLongText: SMSLongText,
    lbl_pickup_SMSPrivatePolicy: SMSPrivatePolicy,
    lbl_pickup_alternativeHeading: alternativeHeading,
    lbl_pickup_alternativeSubHeading: alternativeSubHeading,
    lbl_pickup_alternativeFirstName: alternativeFirstName,
    lbl_pickup_alternativeGovIdText: alternativeGovIdText,
    lbl_pickup_alternativeLastName: alternativeLastName,
    lbl_pickup_alternativeEmail: alternativeEmail,
    lbl_pickup_pickup_contact: pickupContactText,
    lbl_pickup_btn_cancel: btnCancel,
    lbl_pickup_btn_update: btnUpdate,
    lbl_pickup_btnSaveUpdate: btnSaveUpdate,
    lbl_pickup_titleEditPickUp: titleEditPickup,
    lbl_pickup_anchor_edit: anchorEdit,
    lbl_pickup_buttonText: pickupText,
    lbl_pickup_billingText: billingText,
    lbl_pickup_nextText: nextText,
    lbl_pickup_returnTo: returnTo,
  } = state.Labels.global && state.Labels.checkout.pickup;
  const { lbl_shipping_header: shippingText } =
    state.Labels.checkout && state.Labels.checkout.shipping;
  return {
    title: title.toUpperCase(),
    firstName,
    govIdText,
    lastName,
    email,
    mobile,
    SMSHeading,
    SMSLongText,
    SMSPrivatePolicy,
    alternativeHeading,
    alternativeSubHeading,
    alternativeFirstName,
    alternativeGovIdText,
    alternativeLastName,
    alternativeEmail,
    pickupContactText,
    btnCancel,
    btnUpdate,
    btnSaveUpdate,
    titleEditPickup,
    anchorEdit,
    pickupText,
    billingText,
    nextText,
    returnTo,
    shippingText,
  };
};

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
  getShippingLabels,
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
  getBillingLabels,
  getIsPaymentDisabled,
  getBillingValues,
  getAddressByKey,
  isCardNotUpdated,
  getDetailedCreditCardById,
  getCheckoutProgressBarLabels,
};
