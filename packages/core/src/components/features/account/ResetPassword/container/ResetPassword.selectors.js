import { createSelector } from 'reselect';
import { RESET_PASSWORD_REDUCER_KEY } from '../../../../../constants/reducer.constants';

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
  (resetState, labels) => {
    const errorCode = resetState && resetState.get('errorCode');
    if (errorCode && labels[`lbl_resetpassword_error_${errorCode}`]) {
      return labels[`lbl_resetpassword_error_${errorCode}`];
    }
    return (
      (resetState && resetState.getIn(['errorMessage', '_error'])) ||
      'labels.lbl_resetpassword_error'
    );
  }
);
