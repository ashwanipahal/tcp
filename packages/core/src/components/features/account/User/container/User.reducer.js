import { fromJS } from 'immutable';
import USER_CONSTANTS from '../User.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  personalData: null,
  airmiles: null,
  rewards: null,
  survey: null,
  children: null,
  favoriteStore: null,
  defaultStore: null,
  isRegisteredUserCallDone: false,
});
/* eslint-disable */

const getUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_CONSTANTS.SET_IS_EXPRESS_ELIGIBLE:
      return state.setIn(['personalData', 'isExpressEligible'], payload);
    case USER_CONSTANTS.SET_IS_REGISTERED_USER_CALL_DONE:
      return state.set('isRegisteredUserCallDone', true);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_CONSTANTS.GET_USER_INFO:
      return state.set('isRegisteredUserCallDone', false);
    case USER_CONSTANTS.SET_USER_INFO:
      return state
        .set(
          'personalData',
          fromJS({
            contactInfo: {
              firstName: payload.firstName,
              lastName: payload.lastName,
              emailAddress: payload.email,
              phoneNumber: payload.phone,
              profileAddress: payload.profileAddress,
            },
            userId: payload.userId,
            isGuest: !payload.isLoggedin,
            isRemembered: payload.isRemembered,
            contextAttributes: payload.contextAttributes,
            isPlcc: payload.isPlcc,
            userBirthday: payload.userBirthday,
            profileCompletion: payload.userProfileState.profileCompletion,
            isExpressEligible: payload.isExpressEligible,
            associateId: payload.associateId,
            hobbies: payload.hobbies,
          })
        )
        .set(
          'airmiles',
          fromJS({
            accountNumber: payload.airmilesAccountNumber,
          })
        )
        .set(
          'rewards',
          fromJS({
            accountNumber: payload.myPlaceNumber,
            rewardPoints: payload.currentPoints,
            rewardDollars: payload.currentMonthsRewards,
            rewardDollarsNextMonth: payload.nextMonthRewards,
            rewardPointsToNextReward: payload.pointsToNextReward,
          })
        )
        .set(
          'survey',
          fromJS({
            questions: null,
            answers: payload.surveyAnswers,
          })
        )
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(USER_CONSTANTS.GET_USER_INFO_TTL));
    case USER_CONSTANTS.SET_CHILDREN:
      return state.set('children', fromJS(payload.children));
    case USER_CONSTANTS.SET_GEO_COORDINATES:
      return state.set('geoLatLong', payload.geoLatLong);
    case USER_CONSTANTS.SET_FAVORITE_STORE:
      return state.set(
        'favoriteStore',
        fromJS({
          name: payload.favoriteStore.name,
          address: payload.favoriteStore.address1,
          phone: payload.favoriteStore.phone,
          state: payload.favoriteStore.state,
          zipCode: payload.favoriteStore.zipCode,
          city: payload.favoriteStore.city,
        })
      );
    case USER_CONSTANTS.RESET_USER_INFO:
      return initialState;
    case USER_CONSTANTS.CLEAR_USER_INFO_TTL:
      return state.set(DEFAULT_REDUCER_KEY, null);
    case USER_CONSTANTS.SET_DEFAULT_STORE:
      return state.set('defaultStore', payload);
    case USER_CONSTANTS.RESPONSE_PLCC_CARD_ID_INFORMATION:
      return state.setIn(['personalData', 'plccCardId'], payload);
    case USER_CONSTANTS.RESPONSE_SET_PLCC_INFORMATION:
      return state.setIn(['personalData', 'plccCardNumber'], payload);
    case USER_CONSTANTS.SET_SURVEY_QUESTIONS:
      return state.set(
        'survey',
        fromJS({
          questions: payload,
          answers: [],
        })
      );
    default:
      return getUserReducer(state, { type, payload });
  }
};

export default UserReducer;
