import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
/* eslint-disable extra-rules/no-commented-out-code */
import { getAPIConfig } from '@tcp/core/src/utils';
import {
  getUserName,
  getUserLastName,
  getUserPhoneNumber,
} from '../../../account/User/container/User.selectors';
import constants from '../Checkout.constants';
// import bagPageSelectors from '../../BagPage/container/BagPage.selectors';
// import { getAddressListState } from '../../../account/AddressBook/container/AddressBook.selectors';

function getRecalcOrderPointsInterval() {
  return 300000;
  // return state.session.siteDetails.recalcOrderPointsInterval;
}

function getIsOrderHasShipping() {
  return true;
  // return state.CartPageReducer.getIn(['orderDetails', 'orderItems']).findIndex(
  //   item => !item.getIn(['miscInfo', 'storeId'])
  // );
}

function isGuest(state) {
  return state.User.getIn(['personalData', 'isGuest']);
}

function getIsMobile() {
  return getAPIConfig().isMobile;
}

function isExpressCheckout(state) {
  return !!state.User.getIn(['personalData', 'isExpressEligible']);
}

function getCheckoutStage(state) {
  return state.Checkout.getIn(['uiFlags', 'stage']);
}

function isRemembered(state) {
  return state.User.getIn(['personalData', 'isRemembered']);
}

function getUserContactInfo(state) {
  return state.User.getIn(['personalData', 'contactInfo']);
}

function getUserEmail(state) {
  return !isGuest(state) || isRemembered(state)
    ? getUserContactInfo(state) && getUserContactInfo(state).emailAddress
    : '';
}

function getShippingDestinationValues(state) {
  const { method, emailAddress, ...result } = JSON.parse(
    JSON.stringify(state.Checkout.getIn(['values', 'shipping']))
  );
  // For shipping address when user logged-in, override email address that of user.
  // When user is guest, keep the address he specified in shipping section.
  const email = getUserEmail(state) || emailAddress;
  return {
    emailAddress: email,
    ...result,
  };
}

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
  // let countryFilteredAddresses = getAddressBook(state, country, noBillingAddresses);
  // let defaultAddress = countryFilteredAddresses.find(
  //   addressEntry => addressEntry.get && addressEntry.get('primary')
  // );

  // if (countryFilteredAddresses.length && !defaultAddress) {
  //   return countryFilteredAddresses.get('0');
  // } else {
  //   return defaultAddress;
  // }
}

function getSmsNumberForOrderUpdates(state) {
  return state.Checkout.getIn(['values', 'smsInfo', 'numberForUpdates']);
}

function getPickupValues(state) {
  return state.Checkout.getIn(['values', 'pickUpContact']);
}

function isPickupAlt(state) {
  return (
    state.Checkout.getIn(['values', 'pickUpAlternative']) &&
    !!state.Checkout.getIn(['values', 'pickUpAlternative', 'firstName'])
  );
}

function getPickupAltValues(state) {
  return state.Checkout.getIn(['values', 'pickUpAlternative']);
}

function getInitialPickupSectionValues(state) {
  // let userContactInfo = userStoreView.getUserContactInfo(state);
  // values (if any) entered previously in the checkout process,
  // or reported as checkout defaults by backend
  const pickupValues = getPickupValues(state);

  return {
    pickUpContact: {
      firstName: pickupValues.firstName || getUserName(state),
      lastName: pickupValues.lastName || getUserLastName(state),
      emailAddress: pickupValues.emailAddress || getUserEmail(state),
      phoneNumber: pickupValues.phoneNumber || getUserPhoneNumber(state),
      smsInfo: {
        wantsSmsOrderUpdates: !!getSmsNumberForOrderUpdates(state),
        smsUpdateNumber: getSmsNumberForOrderUpdates(state) || getPickupValues(state).phoneNumber,
      },
    },
    hasAlternatePickup: isPickupAlt(state),
    pickUpAlternate: isPickupAlt(state) ? getPickupAltValues(state) : {},
  };
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

function getCurrentPickupFormNumber(state) {
  let phoneNumber = '';

  try {
    phoneNumber = state.form.getIn(['checkoutPickup', 'values', 'pickUpContact', 'phoneNumber']);
  } catch (error) {
    // Gobble...Gobble.
  }

  return phoneNumber;
}

const getSmsSignUpFields = state => {
  const selector = formValueSelector('checkoutShipping');
  return selector(state, 'smsSignUp');
};

const getShipmentMethodsFields = state => {
  const selector = formValueSelector('checkoutShipping');
  return selector(state, 'shipmentMethods');
};

const getSelectedShipmentId = createSelector(
  getShipmentMethodsFields,
  shipmentMethodsFields => shipmentMethodsFields && shipmentMethodsFields.shippingMethodId
);

const getSendOrderUpdate = createSelector(
  getSmsSignUpFields,
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

const getShippingLabels = state => {
  const { lbl_shipping_header: header, lbl_shipping_sectionHeader: sectionHeader } =
    state.Labels.checkout && state.Labels.checkout.shipping;
  return {
    header,
    sectionHeader,
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

export default {
  getRecalcOrderPointsInterval,
  getIsOrderHasShipping,
  getShippingDestinationValues,
  getDefaultAddress,
  isGuest,
  getIsMobile,
  getInitialPickupSectionValues,
  isSmsUpdatesEnabled,
  getCurrentPickupFormNumber,
  isExpressCheckout,
  getCheckoutStage,
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
};
