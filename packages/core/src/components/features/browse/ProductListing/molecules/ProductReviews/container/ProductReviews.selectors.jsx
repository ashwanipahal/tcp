import { USER_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { createSelector } from 'reselect';

export const getUserState = state => {
  return state[USER_REDUCER_KEY];
};

export const getPersonalDataState = state => {
  return state[USER_REDUCER_KEY].get('personalData');
};

export const getUserLoggedInState = createSelector(
  getPersonalDataState,
  state => state && state.get('isGuest')
);

export const isMprUser = createSelector(
  getPersonalDataState,
  state => state && state.get('isPlcc') !== 'true'
);

export const getUsedId = createSelector(
  getPersonalDataState,
  state => state && state.get('userId')
);
