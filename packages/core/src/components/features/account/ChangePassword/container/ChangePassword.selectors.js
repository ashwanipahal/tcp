import { createSelector } from 'reselect';
import { CHANGE_PASSWORD_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import { getErrorSelector } from '../../../../../utils/utils';

const getState = state => state[CHANGE_PASSWORD_REDUCER_KEY];

export const getError = createSelector(
  getState,
  state => state && state.get('error')
);

export const getSuccess = createSelector(
  getState,
  state => state && state.get('success')
);

export const getChangePasswordLabels = state => {
  return (state && state.Labels.global.password) || {};
};

export const getChangeErrorResponse = state => {
  return state[CHANGE_PASSWORD_REDUCER_KEY].get('error');
};

export const getChangeErrorMessage = createSelector(
  [getChangeErrorResponse, getChangePasswordLabels],
  (state, labels) => {
    return getErrorSelector(state, labels, 'lbl_changePassword');
  }
);
