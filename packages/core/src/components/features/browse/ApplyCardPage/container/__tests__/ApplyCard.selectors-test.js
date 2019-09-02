import { fromJS } from 'immutable';
import { getUserContactInfo, getMailingAddress, getUserProfileData } from '../ApplyCard.selectors';
import { USER_REDUCER_KEY } from '../../../../../../constants/reducer.constants';

describe('#ApplyCard selector', () => {
  const stateObject = {
    personalData: {
      contactInfo: {
        firstName: 'first',
        lastName: 'last',
        emailAddress: 'first@abc.com',
        phoneNumber: '1111111111',
        profileAddress: {
          address: {
            addressLine1: '1103 campbell road',
            addressLine2: 'dublin, south america',
            city: 'bachholm',
            state: 'procalm',
            zipCode: '34325',
          },
          isComplete: true,
        },
      },
      isGuest: false,
      isPlcc: 'false',
      userBirthday: 'aug-8',
    },
  };
  const state = {
    [USER_REDUCER_KEY]: fromJS(stateObject),
  };

  it('#getUserContactInfo should retun contact infomation data', () => {
    expect(getUserContactInfo(state)).toEqual(fromJS(stateObject.personalData.contactInfo));
  });

  it('#getMailingAddress should return profileAddress', () => {
    expect(getMailingAddress(state)).toEqual(
      fromJS(stateObject.personalData.contactInfo.profileAddress)
    );
  });

  it('#getUserProfileData should return profile information data', () => {
    expect(getUserProfileData(state).firstName).toBe('first');
  });

  it('#getUserProfileData should return profile information data when no address being provided', () => {
    stateObject.personalData.contactInfo.profileAddress.address = {};
    const stateWithNoAddress = {
      [USER_REDUCER_KEY]: fromJS(stateObject),
    };
    expect(getUserProfileData(stateWithNoAddress).firstName).toBe('first');
  });

  it('#getUserProfileData should return null when user is a guest', () => {
    stateObject.personalData.isGuest = true;
    const stateGuestUser = {
      [USER_REDUCER_KEY]: fromJS(stateObject),
    };
    expect(getUserProfileData(stateGuestUser)).toBe(null);
  });
});
