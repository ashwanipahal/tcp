import { createSelector } from 'reselect';
import { USER_REDUCER_KEY } from '../../../../../constants/reducer.constants';

export const getPersonalDataState = state => {
  return state[USER_REDUCER_KEY].get('personalData');
};

export const getUserContactInfo = createSelector(
  getPersonalDataState,
  state => state && state.get('contactInfo')
);

export const getMailingAddress = createSelector(
  getPersonalDataState,
  state => state && state.getIn(['contactInfo', 'profileAddress'])
);

const userAddressData = addressTemp => {
  return {
    addressLine1: addressTemp.get('addressLine1') || '',
    addressLine2: addressTemp.get('addressLine2') || '',
    city: addressTemp.get('city') || '',
    country: addressTemp.get('country') || '',
    state: addressTemp.get('state') || '',
    zipCode: addressTemp.get('zipCode'),
  };
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
      let phoneNumber;
      if (personalInformation) {
        firstName = personalInformation.get('firstName');
        lastName = personalInformation.get('lastName');
        phoneNumber = personalInformation.get('phoneNumber');
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
          phoneNumber,
          noCountryZip,
        };
      }
    }
    return null;
  }
);
