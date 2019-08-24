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

function getRecalcOrderPointsInterval() {
  return 300000;
  // return state.session.siteDetails.recalcOrderPointsInterval;
}

function getIsOrderHasShipping() {
  return true;
  // state.cart.items.reduce((isShipToHome, item) => isShipToHome || !item.miscInfo.store, false);
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

// function getShippingDestinationValues() {
// let {emailAddress} = state.Checkout.values.shipping;
// const {method, ...result}  =  state.Checkout.values.shipping
//  For shipping address when user logged-in, override email address that of User.
//  When user is guest, keep the address he specified in shipping section.
// emailAddress = getUserEmail(state) || emailAddress;
// return {
//   emailAddress,
//   ...result
// };

// return {};
// }

// function getAddressBook(state, country, noBillingAddresses) {
//   let addresses = [];

//   if (!country) {
//     if (noBillingAddresses) {
//       addresses = state.addresses
//         .getIn(['addressBook'])
//         .filter(entry => entry.type !== constants.ADDREESS_TYPE.BILLING);
//     } else {
//       addresses = state.addresses.getIn(['addressBook']);
//     }
//   } else {
//     const filtered = state.addresses
//       .getIn(['addressBook'])
//       .filter(
//         entry =>
//           entry.address.country === country &&
//           (!noBillingAddresses || entry.type !== constants.ADDREESS_TYPE.BILLING)
//       );
//     const defaultAddress = filtered.find(addressEntry => addressEntry.isDefault);

//     // REVIEW: if there's no default for the selected requested country (country filter might leave it out)
//     // then flag the first one as default. Can't be on the abstractor,
//     // unless we store different versions of the address book (per country)
//     // but I'm not sure about location because storeviews trigger on everything and want to avoid unnecesary renders
//     if (!defaultAddress) {
//       addresses = filtered.map((entry, index) => {
//         return {
//           ...entry,
//           isDefault: index === 0,
//         };
//       });
//     } else {
//       addresses = filtered;
//     }
//   }

//   return addresses;
// }

// function getDefaultAddress(state, country, noBillingAddresses) {
//   const countryFilteredAddresses = getAddressBook(state, country, noBillingAddresses);
//   const defaultAddress = countryFilteredAddresses.find(addressEntry => addressEntry.isDefault);

//   if (countryFilteredAddresses.length && !defaultAddress) {
//     return countryFilteredAddresses[0];
//   }
//   return defaultAddress;
// }

function getPickupValues(state) {
  return state.Checkout.getIn(['values', 'pickUpContact']);
}

function getPickupAltValues(state) {
  return state.Checkout.getIn(['values', 'pickUpAlternative']);
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

export const getAlternateFormFields = state => {
  const selector = formValueSelector('checkoutPickup');
  return selector(state, 'pickUpAlternate');
};

export const isPickupAlt = createSelector(
  getAlternateFormFields,
  pickUpAlternate => pickUpAlternate && pickUpAlternate.firstName
);

export const getPickUpContactFormLabels = state => {
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
    lbl_pickup_emailSignupHeading: emailSignupHeading,
    lbl_pickup_emailSignupSubHeading: emailSignupSubHeading,
    lbl_pickup_emailSignupSubSubHeading: emailSignupSubSubHeading,
    lbl_pickup_emailSignupContact: emailSignupContact,
    lbl_pickup_pickup_contact: pickupContactText,
    lbl_pickup_btn_cancel: btnCancel,
    lbl_pickup_btn_update: btnUpdate,
    lbl_pickup_anchor_edit: anchorEdit,
  } = state.Labels.global && state.Labels.checkout.pickup;
  return {
    title,
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
    emailSignupHeading,
    emailSignupSubHeading,
    emailSignupSubSubHeading,
    emailSignupContact,
    pickupContactText,
    btnCancel,
    btnUpdate,
    anchorEdit,
  };
};

export const getAlternateFormUpdate = createSelector(
  getAlternateFormFields,
  smsSignUpFields => smsSignUpFields && smsSignUpFields.hasAlternatePickup
);

export const getSmsSignUpFields = state => {
  const selector = formValueSelector('checkoutPickup');
  return selector(state, 'smsSignUp');
};

export const getSendOrderUpdate = createSelector(
  getSmsSignUpFields,
  smsSignUpFields => smsSignUpFields && smsSignUpFields.sendOrderUpdate
);

export const getSmsNumberForOrderUpdates = createSelector(
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
    },
    smsInfo: {
      wantsSmsOrderUpdates: !!getSmsNumberForOrderUpdates(state),
      smsUpdateNumber: getSmsNumberForOrderUpdates(state) || getPickupValues(state).phoneNumber,
    },
    hasAlternatePickup: isPickupAlt(state),
    pickUpAlternate: isPickupAlt(state) ? getPickupAltValues(state) : {},
  };
}

export default {
  getRecalcOrderPointsInterval,
  getIsOrderHasShipping,
  // getShippingDestinationValues,
  // getDefaultAddress,
  isGuest,
  getIsMobile,
  getInitialPickupSectionValues,
  getPickupInitialPickupSectionValues,
  isSmsUpdatesEnabled,
  getCurrentPickupFormNumber,
  isExpressCheckout,
  getCheckoutStage,
  isUsSite,
  getUserContactInfo,
  getPickupAltValues,
  getCurrentSiteId,
  getIsSmsUpdatesEnabled,
};
