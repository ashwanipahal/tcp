import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
import { getLabelValue } from '@tcp/core/src/utils/utils';

export const getLoadingState = state => {
  return state.CreateAccountReducer.get('isLoading');
};

export const getIAgree = state => {
  const selector = formValueSelector('CreateAccountForm');
  return selector(state, 'iAgree');
};

export const getHideShowPwd = state => {
  const selector = formValueSelector('CreateAccountForm');
  return selector(state, 'hideShowPwd');
};

export const getConfirmHideShowPwd = state => {
  const selector = formValueSelector('CreateAccountForm');
  return selector(state, 'confirmHideShowPwd');
};

export const getError = state => {
  return state.CreateAccountReducer.get('error');
};

export const getLabels = state => {
  return state.Labels.global;
};

export const getPasswordLabels = createSelector(
  getLabels,
  labels => labels && labels.password
);

export const getCreateAccountLabels = createSelector(
  getLabels,
  labels => labels && labels.registration
);

export const getErrorMessage = createSelector(
  [getError, getCreateAccountLabels],
  (error, labels) => {
    const errorCode = error && error.get('errorCode');
    if (errorCode && labels[`lbl_createAccount_error_${errorCode}`]) {
      return labels[`lbl_createAccount_error_${errorCode}`];
    }
    return error
      ? error.getIn(['errorMessage', '_error']) || getLabelValue(labels, 'lbl_createAccount_error')
      : '';
  }
);
