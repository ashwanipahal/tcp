import { createSelector } from 'reselect';
import {
  USER_REDUCER_KEY,
  ADDRESSBOOK_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';
import { fetchBillingOrShippingAddress } from '../utils/utility';
import getErrorList from '../../../CnC/BagPage/container/Errors.selector';

export const getPersonalDataState = state => {
  return state[USER_REDUCER_KEY].get('personalData');
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

export const getUserProfileData = createSelector(
  getUserContactInfo,
  getPersonalDataState,
  getAddressListState,
  (personalInformation, userTypeInformation, mailingAddress) => {
    if (userTypeInformation && !userTypeInformation.get('isGuest')) {
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

          const {
            addressLine,
            city,
            email1,
            firstName,
            lastName,
            phone1,
            state,
            zipCode,
          } = plccAddress;
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
        }
      }
      const emailAddress =
        personalInformation.get('emailAddress') &&
        personalInformation.get('emailAddress').toLowerCase();
      return { emailAddress };
    }
    return null;
  }
);
