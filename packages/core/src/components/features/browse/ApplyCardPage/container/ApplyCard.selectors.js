import { createSelector } from 'reselect';
import { USER_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import userAddressData from '../utils/utility';

export const getPersonalDataState = state => {
  return state[USER_REDUCER_KEY].get('personalData');
};

export const getUserContactInfo = state => {
  const personalData = state[USER_REDUCER_KEY].get('personalData');
  return personalData && personalData.get('contactInfo');
};

export const getMailingAddress = state => {
  const personalData = state[USER_REDUCER_KEY].get('personalData');
  const contactInfo = personalData && personalData.get('contactInfo');
  return contactInfo && contactInfo.get('profileAddress');
};

export const getUserProfileData = createSelector(
  getUserContactInfo,
  getPersonalDataState,
  getMailingAddress,
  (personalInformation, userTypeInformation, mailingAddress) => {
    if (userTypeInformation && !userTypeInformation.get('isGuest')) {
      let firstName;
      let lastName;
      let emailAddress;
      let phoneNumberWithAlt;
      if (personalInformation) {
        firstName = personalInformation.get('firstName');
        lastName = personalInformation.get('lastName');
        phoneNumberWithAlt = personalInformation.get('phoneNumber');
        emailAddress =
          personalInformation.get('emailAddress') &&
          personalInformation.get('emailAddress').toLowerCase();

        const addressTemp = mailingAddress ? mailingAddress.get('address') : null;
        const address = addressTemp ? userAddressData(addressTemp) : null;
        const { addressLine1, addressLine2, city, state, zipCode } = address;
        const noCountryZip = zipCode;
        return {
          firstName,
          lastName,
          emailAddress,
          address,
          addressLine1,
          addressLine2,
          city,
          state,
          phoneNumberWithAlt,
          noCountryZip,
        };
      }
      return null;
    }
    return null;
  }
);
