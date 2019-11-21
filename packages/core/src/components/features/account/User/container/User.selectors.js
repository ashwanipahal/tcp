import { USER_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { createSelector } from 'reselect';

export const getUserState = state => {
  return state[USER_REDUCER_KEY];
};

export const getPersonalDataState = state => {
  return state[USER_REDUCER_KEY].get('personalData');
};

export const getUserGeoCoordinates = state => {
  return state[USER_REDUCER_KEY].get('geoLatLong');
};

export const getFavoriteStore = state => {
  return state[USER_REDUCER_KEY].get('favoriteStore');
};

export const getAirmilesDataState = state => {
  return state[USER_REDUCER_KEY].get('airmiles');
};

export const getRewardsState = state => {
  return state[USER_REDUCER_KEY].get('rewards');
};

export const getIsRegisteredUserCallDone = state => {
  return state[USER_REDUCER_KEY].get('isRegisteredUserCallDone');
};

export const getSurveyState = state => {
  return state[USER_REDUCER_KEY].get('survey');
};

export const mprUserId = createSelector(
  getRewardsState,
  state => state && state.get('accountNumber')
);

export const getUserId = createSelector(
  getPersonalDataState,
  state => state && state.get('userId')
);

export const getplccCardId = state => {
  const personalData = state[USER_REDUCER_KEY].get('personalData');
  return personalData && personalData.get('plccCardId');
};

export const getplccCardNumber = state => {
  const personalData = state[USER_REDUCER_KEY].get('personalData');
  return personalData && personalData.get('plccCardNumber');
};

export const getUserLoggedInState = createSelector(
  getPersonalDataState,
  state => state && !state.get('isGuest')
);

export const getIsGuest = state => {
  const personalData = state[USER_REDUCER_KEY].get('personalData');
  return personalData && personalData.get('isGuest');
};

export const isPlccUser = createSelector(
  getPersonalDataState,
  state => state && state.get('isPlcc') === 'true'
);

export const getUserName = createSelector(
  getPersonalDataState,
  state => state && state.getIn(['contactInfo', 'firstName'])
);

export const getUserLastName = createSelector(
  getPersonalDataState,
  state => state && state.getIn(['contactInfo', 'lastName'])
);

export const getUserFullName = createSelector(
  getPersonalDataState,
  state => {
    return (
      state &&
      `${state.getIn(['contactInfo', 'firstName'])} ${state.getIn(['contactInfo', 'lastName'])}`
    );
  }
);

export const getUserEmail = createSelector(
  getPersonalDataState,
  state =>
    state &&
    state.getIn(['contactInfo', 'emailAddress']) &&
    state.getIn(['contactInfo', 'emailAddress']).toLowerCase()
);

export const getUserPhoneNumber = createSelector(
  getPersonalDataState,
  state => state && state.getIn(['contactInfo', 'phoneNumber'])
);

export const getPointsToNextRewardState = createSelector(
  getRewardsState,
  state => state && state.get('rewardPointsToNextReward')
);

export const getCurrentPointsState = createSelector(
  getRewardsState,
  state => state && state.get('rewardPoints')
);

export const getTotalRewardsState = createSelector(
  getRewardsState,
  state => state && state.get('rewardDollars')
);

export const getUserContactInfo = createSelector(
  getPersonalDataState,
  state => state && state.get('contactInfo')
);

export const getMailingAddress = createSelector(
  getPersonalDataState,
  state => state && state.getIn(['contactInfo', 'profileAddress'])
);

export const getUserBirthday = createSelector(
  getPersonalDataState,
  state => state && state.get('userBirthday')
);

export const getProfileCompletion = createSelector(
  getPersonalDataState,
  state => state && state.get('profileCompletion')
);

export const getAnswersList = createSelector(
  getSurveyState,
  state => state && state.get('answers')
);

export const getDefaultStore = createSelector(
  getPersonalDataState,
  state => state && state.get('hobbies')
);

export const getAssociateId = createSelector(
  getPersonalDataState,
  state => state && state.get('associateId')
);

/**
 * @function getChildren
 * This function will return the children information from the redux store
 */
export const getChildren = createSelector(
  getUserState,
  state => state && state.get('children')
);

export const getAirmilesDetails = createSelector(
  getAirmilesDataState,
  state => state && state.get('accountNumber')
);

export const getMyPlaceNumber = createSelector(
  getRewardsState,
  state => state && state.get('accountNumber')
);

export const getFavoriteStoreName = createSelector(
  getFavoriteStore,
  state => state && state.get('name')
);

export const getFavoriteStoreAddress = createSelector(
  getFavoriteStore,
  state => state && state.get('address')
);

export const getFavoriteStorePhone = createSelector(
  getFavoriteStore,
  state => state && state.get('phone')
);

export const getFavoriteStoreState = createSelector(
  getFavoriteStore,
  state => state && state.get('state')
);

export const getFavoriteStoreZipcode = createSelector(
  getFavoriteStore,
  state => state && state.get('zipCode')
);

export const getFavoriteStoreCity = createSelector(
  getFavoriteStore,
  state => state && state.get('city')
);

const userAddressData = (mailingAddress, addressTemp) => {
  return {
    addressLine1: addressTemp.get('addressLine1') || '',
    addressLine2: addressTemp.get('addressLine2') || '',
    city: addressTemp.get('city') || '',
    country: addressTemp.get('country') || '',
    state: addressTemp.get('state') || '',
    zipCode: addressTemp.get('zipCode'),
    isComplete: mailingAddress.get('isComplete') || false,
  };
};

export const getProfileInfoTileData = createSelector(
  getUserContactInfo,
  getMailingAddress,
  getRewardsState,
  (personalInformation, mailingAddress, rewards) => {
    let firstName;
    let lastName;
    let emailAddress;
    let phoneNumber;
    if (personalInformation) {
      firstName = personalInformation.get('firstName');
      lastName = personalInformation.get('lastName');
      phoneNumber = personalInformation.get('phoneNumber');
      emailAddress = personalInformation.get('emailAddress');
    }
    const rewardsAccountNumber = rewards ? rewards.get('accountNumber') : null;
    const addressTemp = mailingAddress ? mailingAddress.get('address') : null;
    const address = addressTemp ? userAddressData(mailingAddress, addressTemp) : null;
    return {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      rewardsAccountNumber,
      address,
    };
  }
);

export const getQuestionsList = createSelector(
  getSurveyState,
  state => state && state.get('questions')
);

export const getPercentageIncrement = () => ({
  percentageMailingAddress: 20,
  percentageUserSurvey: 20,
  percentageUserBirthday: 20,
  percentageFavStore: 20,
});

export const isRememberedUser = createSelector(
  getPersonalDataState,
  state => state && state.get('isRemembered')
);

export const getUserInfoFetchingState = createSelector(
  getUserState,
  state => state && state.get('isFetching')
);
