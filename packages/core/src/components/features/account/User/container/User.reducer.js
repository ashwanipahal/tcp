import { fromJS } from 'immutable';
import USER_CONSTANTS from '../User.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  personalData: null,
  airmiles: null,
  rewards: null,
  survey: null,
});

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
    case USER_CONSTANTS.RESET_USER_INFO:
      return initialState;
    case USER_CONSTANTS.CLEAR_USER_INFO_TTL:
      return state.set(DEFAULT_REDUCER_KEY, null);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default UserReducer;
