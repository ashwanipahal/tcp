import { createSelector } from 'reselect';
import { CHANGE_PASSWORD_REDUCER_KEY } from '../../../../../constants/reducer.constants';

const getState = state => state[CHANGE_PASSWORD_REDUCER_KEY];

export const getError = createSelector(
  getState,
  state => state && state.get('error')
);

export const getSuccess = createSelector(
  getState,
  state => state && state.get('success')
);

export const getProfileLabels = state => {
  return (state && state.Labels.account.profile) || {};
};
