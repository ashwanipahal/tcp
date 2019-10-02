import { createSelector } from 'reselect';
import { FORGOTPASSWORD_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { getErrorSelector } from '../../../../../utils/utils';

export const getResetEmailResponse = state => {
  return state[FORGOTPASSWORD_REDUCER_KEY];
};

export const getForgotPasswordErrorResponse = state => {
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
  [getForgotPasswordErrorResponse, getForgotpasswordLabels],
  (state, labels) => {
    return getErrorSelector(state, labels, 'lbl_login_error');
  }
);

export const showCheckEmailSectionState = createSelector(
  getResetEmailResponse,
  resp => resp && resp.get('showCheckEmailSection')
);
