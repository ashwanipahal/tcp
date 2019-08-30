import { createSelector } from 'reselect';
import { FORGOTPASSWORD_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getResetEmailResponse = state => {
  return state[FORGOTPASSWORD_REDUCER_KEY].get('error');
};

export const getLabels = state => state.Labels.global;

export const getForgotpasswordLabels = createSelector(
  getLabels,
  labels => labels && labels.login
);


export const getShowNotificationState = createSelector(
  getResetEmailResponse,
  resp => resp && resp.get('showNotification')
);

export const toggleSuccessfulEmailSection = createSelector(
  getResetEmailResponse,
  resp => resp && resp.get('toggleSuccessfulEmailSection')
);

export const getForgotPasswordErrorMessage = createSelector(
  [getResetEmailResponse , getForgotpasswordLabels],
  (loginState, labels) => {
    debugger
    const errorCode = loginState && loginState.get('errorCode');
    if (errorCode && labels[`lbl_login_error_${errorCode}`]) {
      return labels[`lbl_login_error_${errorCode}`];
    }
    return (loginState && loginState.getIn(['errorMessage', '_error'])) || labels.lbl_login_error;
  }
);

export const showCheckEmailSectionState = createSelector(
  getResetEmailResponse,
  resp => resp && resp.get('showCheckEmailSection')
);
