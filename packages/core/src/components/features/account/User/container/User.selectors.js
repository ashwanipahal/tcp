import { USER_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { createSelector } from 'reselect';

export const getUserState = state => {
  return state[USER_REDUCER_KEY];
};

export const getPersonalDataState = state => {
  return state[USER_REDUCER_KEY].get('personalData');
};

export const getRewardsState = state => {
  return state[USER_REDUCER_KEY].get('rewards');
};

export const getUserLoggedInState = createSelector(
  getPersonalDataState,
  state => state && !state.get('isGuest')
);

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
  state => state && state.getIn(['contactInfo', 'emailAddress'])
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
