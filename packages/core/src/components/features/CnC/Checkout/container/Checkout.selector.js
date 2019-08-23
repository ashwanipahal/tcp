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

function getShippingDestinationValues() {
  // let {emailAddress} = state.Checkout.values.shipping;
  // const {method, ...result}  =  state.Checkout.values.shipping  // eslint-disable-line no-unused-vars
  //  For shipping address when user logged-in, override email address that of User.
  //  When user is guest, keep the address he specified in shipping section.
  // emailAddress = getUserEmail(state) || emailAddress;
  // return {
  //   emailAddress,
  //   ...result
  // };

  return {};
}

function getAddressBook(state, country, noBillingAddresses) {
  let addresses = [];

  if (!country) {
    if (noBillingAddresses) {
      addresses = state.addresses
        .getIn(['addressBook'])
        .filter(entry => entry.type !== constants.ADDREESS_TYPE.BILLING);
    } else {
      addresses = state.addresses.getIn(['addressBook']);
    }
  } else {
    const filtered = state.addresses
      .getIn(['addressBook'])
      .filter(
        entry =>
          entry.address.country === country &&
          (!noBillingAddresses || entry.type !== constants.ADDREESS_TYPE.BILLING)
      );
    const defaultAddress = filtered.find(addressEntry => addressEntry.isDefault);

    // REVIEW: if there's no default for the selected requested country (country filter might leave it out)
    // then flag the first one as default. Can't be on the abstractor,
    // unless we store different versions of the address book (per country)
    // but I'm not sure about location because storeviews trigger on everything and want to avoid unnecesary renders
    if (!defaultAddress) {
      addresses = filtered.map((entry, index) => {
        return {
          ...entry,
          isDefault: index === 0,
        };
      });
    } else {
      addresses = filtered;
    }
  }

  return addresses;
}

function getDefaultAddress(state, country, noBillingAddresses) {
  const countryFilteredAddresses = getAddressBook(state, country, noBillingAddresses);
  const defaultAddress = countryFilteredAddresses.find(addressEntry => addressEntry.isDefault);

  if (countryFilteredAddresses.length && !defaultAddress) {
    return countryFilteredAddresses[0];
  }
  return defaultAddress;
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
};
