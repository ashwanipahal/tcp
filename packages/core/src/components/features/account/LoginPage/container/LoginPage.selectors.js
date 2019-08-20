import { LOGINPAGE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { createSelector } from 'reselect';
import constants from '../LoginPage.constants';

export const getLoginState = state => {
  return state[LOGINPAGE_REDUCER_KEY];
};

export const getLabels = state => state.Labels.global;

export const getLoginLabels = createSelector(getLabels, labels => labels && labels.login);

export const getLoginError = createSelector(
  getLoginState,
  loginState => loginState && loginState.get('success') === false
);

export const getLoginErrorMessage = createSelector(
  [getLoginState, getLoginLabels],
  (loginState, labels) => {
    if(loginState && loginState.get('errorCode') && labels[`lbl_login_${loginState.errorCode}`]) {
      return labels[`lbl_login_error_${loginState.get('errorCode')}`];
    }
    return (loginState && loginState.getIn(['errorMessage', '_error'])) || labels.lbl_login_error;
  }
);

export const shouldShowRecaptcha = createSelector(
  getLoginState,
  loginState =>
    loginState &&
    parseInt(loginState.get('retriesCount') || 0, 10) > constants.FAILED_ATTEMPT_ALLOWED
);


