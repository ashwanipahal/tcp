export function getRecalcOrderPointsInterval() {
  return 300000;
  // return state.session.siteDetails.recalcOrderPointsInterval;
}

function getHistory(state) {
  return state.mutable.history;
}

function getCurrentLocation(state) {
  const history = getHistory(state);
  return history && history.location;
}

function getIsOrderHasShipping() {
  return true;
  // state.cart.items.reduce((isShipToHome, item) => isShipToHome || !item.miscInfo.store, false);
}

function isGuest(state) {
  return state.user.personalData.isGuest;
}

function getIsMobile(state) {
  return state.session.siteDetails.isMobile;
}

function isRemembered(state) {
  return state.user.personalData.isRemembered;
}

function getUserContactInfo(state) {
  return state.user.personalData.contactInfo;
}

function getUserEmail(state) {
  return !isGuest(state) || isRemembered(state) ? getUserContactInfo(state).emailAddress : '';
}

function getShippingDestinationValues() {
  // let {emailAddress} = state.checkout.values.shipping;
  // const {method, ...result}  =  state.checkout.values.shipping  // eslint-disable-line no-unused-vars
  // // For shipping address when user logged-in, override email address that of user.
  // // When user is guest, keep the address he specified in shipping section.
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
      addresses = state.addresses.addressBook.filter(entry => entry.type !== 'BILLING');
    } else {
      addresses = state.addresses.addressBook;
    }
  } else {
    const filtered = state.addresses.addressBook.filter(
      entry =>
        entry.address.country === country &&
        (!noBillingAddresses || entry.type !== ADDREESS_TYPE.BILLING)
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

export default {
  getRecalcOrderPointsInterval,
  getIsOrderHasShipping,
  getShippingDestinationValues,
  getDefaultAddress,
  isGuest,
  getIsMobile,
  getCurrentLocation,
};
