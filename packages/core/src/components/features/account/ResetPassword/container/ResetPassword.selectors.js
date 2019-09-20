import { createSelector } from 'reselect';
import { RESET_PASSWORD_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import { getErrorSelector } from '../../../../../utils/utils';

const getState = state => state[RESET_PASSWORD_REDUCER_KEY];

export const getError = createSelector(
  getState,
  state => state && state.get('error')
);

export const getSuccess = createSelector(
  getState,
  state => state && state.get('success')
);

export const getShowNotificationState = createSelector(
  getState,
  resp => resp && resp.get('showNotification')
);

export const getLabels = state => state.Labels.global;

export const getResetLabels = createSelector(
  getLabels,
  labels => labels && labels.login
);

export const getResetPasswordErrorMessage = createSelector(
  [getError, getResetLabels],
  (state, labels) => {
    return getErrorSelector(state, labels, 'lbl_resetpassword_error');
  }
);
