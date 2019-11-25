import { createSelector } from 'reselect';
import {
  USER_REDUCER_KEY,
  ADDRESSBOOK_REDUCER_KEY,
  APPLY_PLCC_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';
import { fetchBillingOrShippingAddress } from '../utils/utility';
import getErrorList from '../../../CnC/BagPage/container/Errors.selector';
import CheckoutSelectors from '../../../CnC/Checkout/container/Checkout.selector';

const {
  getIsRtpsFlow,
  getCurrentCheckoutStage,
  getShippingDestinationValues,
  getBillingValues,
} = CheckoutSelectors;

export const getPersonalDataState = state => {
  return state[USER_REDUCER_KEY].get('personalData');
};

export const getApplyCardModuleXComposite = state => {
  return state[APPLY_PLCC_REDUCER_KEY].plccData;
};

export const isGuest = state => {
  const personalData = state[USER_REDUCER_KEY].get('personalData');
  return personalData && personalData.get('isGuest');
};

export const getAddressListState = state => {
  return state[ADDRESSBOOK_REDUCER_KEY];
};

export const getUserContactInfo = state => {
  const personalData = state[USER_REDUCER_KEY].get('personalData');
  return personalData && personalData.get('contactInfo');
};

export const getErrorMapping = state => {
  return getErrorList(state);
};

export const getUserId = state => {
  const personalData = state[USER_REDUCER_KEY].get('personalData');
  return personalData && personalData.get('userId');
};

export const getRtpsPreScreenData = state => {
  const preScreenCode =
    state[APPLY_PLCC_REDUCER_KEY] && state[APPLY_PLCC_REDUCER_KEY].pre_screen_code;
  const preeScreenEligible =
    state[APPLY_PLCC_REDUCER_KEY] && state[APPLY_PLCC_REDUCER_KEY].plccEligible;

  return {
    preScreenCode,
    preeScreenEligible,
  };
};

const getPlccAddress = (plccAddress, address = {}) => {
  const { addressLine, city, email1, firstName, lastName, phone1, state, zipCode } = plccAddress;
  const noCountryZip = zipCode;
  const addressLine1 = addressLine && addressLine[0];
  const addressLine2 = addressLine && addressLine[1];
  const emailAddress = email1;
  const phoneNumberWithAlt = phone1;
  const statewocountry = state;
  return {
    firstName,
    lastName,
    emailAddress,
    address,
    addressLine1,
    addressLine2,
    city,
    statewocountry,
    phoneNumberWithAlt,
    noCountryZip,
  };
};

const getRTPSPlccAddress = checkoutValues => {
  const { address, phoneNumber, emailAddress } = checkoutValues;
  if (address) {
    const { addressLine1, addressLine2, city, firstName, lastName, state, zipCode } = address;
    const noCountryZip = zipCode;
    const phoneNumberWithAlt = phoneNumber;
    const statewocountry = state;
    return {
      firstName,
      lastName,
      emailAddress,
      address,
      addressLine1,
      addressLine2,
      city,
      statewocountry,
      phoneNumberWithAlt,
      noCountryZip,
    };
  }
  return null;
};

const getEmailAddress = personalInformation =>
  personalInformation.get('emailAddress') && personalInformation.get('emailAddress').toLowerCase();

const getPhoneNumber = personalInformation =>
  personalInformation && personalInformation.get('phoneNumber');

const getUpdatedBillingValues = (shippingValues, billingValues, personalInformation) => {
  const emailAddress = getEmailAddress(personalInformation);
  let phoneNumber = getPhoneNumber(personalInformation);
  const updatedBillingValues = billingValues;
  if (shippingValues && shippingValues.phoneNumber) {
    ({ phoneNumber } = shippingValues);
  }
  updatedBillingValues.phoneNumber = phoneNumber;
  updatedBillingValues.emailAddress = emailAddress;
  return updatedBillingValues;
};

export const getUserProfileData = createSelector(
  getUserContactInfo,
  getPersonalDataState,
  getAddressListState,
  getIsRtpsFlow,
  getCurrentCheckoutStage,
  getShippingDestinationValues,
  getBillingValues,
  (
    personalInformation,
    userTypeInformation,
    mailingAddress,
    isRtps,
    currentCheckoutStage,
    shippingValues,
    billingValues
  ) => {
    let initialAddress;
    if (isRtps) {
      if (currentCheckoutStage === 'review') {
        const updatedBillingValues = getUpdatedBillingValues(
          shippingValues,
          billingValues,
          personalInformation
        );
        initialAddress = getRTPSPlccAddress(updatedBillingValues);
      } else initialAddress = getRTPSPlccAddress(shippingValues);
    }
    if (!initialAddress && userTypeInformation && !userTypeInformation.get('isGuest')) {
      const add = mailingAddress.get('list');
      const address = [];
      let i = 0;

      if (add && add.size) {
        while (i < add.size) {
          address.push(add.get(i));
          i += 1;
        }

        if (address.length) {
          const plccAddress = fetchBillingOrShippingAddress(address);
          return getPlccAddress(plccAddress, address);
        }
      }
      const emailAddress = getEmailAddress(personalInformation);

      return { emailAddress };
    }
    return initialAddress;
  }
);
