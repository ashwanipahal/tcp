import { LOGINPAGE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { createSelector } from 'reselect';
import { isMobileApp } from '../../../../../utils';
import constants from '../LoginPage.constants';

export const getLoginState = state => {
  return state[LOGINPAGE_REDUCER_KEY].get('error');
};

export const loginModalOpenState = state => {
  return state.LoginPageReducer.get('loginModalMountedState');
};

export const checkoutModalOpenState = state => {
  return state.LoginPageReducer.get('checkoutModalMountedState');
};

export const checkoutModalComponentType = state => {
  return state.LoginPageReducer.get('componentType');
};

export const getUserLoggedInState = createSelector(
  getLoginState,
  loginState => loginState && loginState.get('isLoggedin')
);

export const getLabels = state => state.Labels.global;

export const getLoginLabels = createSelector(
  getLabels,
  labels => labels && labels.login
);

export const getLoginError = createSelector(
  getLoginState,
  loginState => loginState && loginState.get('success') === false
);

export const getLoginErrorMessage = createSelector(
  [getLoginState, getLoginLabels],
  (loginState, labels) => {
    const errorCode = loginState && loginState.get('errorCode');
    if (errorCode && labels[`lbl_login_error_${errorCode}`]) {
      if (isMobileApp()) {
        return labels[`lbl_login_error_app_${errorCode}`];
      }
      return labels[`lbl_login_error_${errorCode}`];
    }
    return (
      (loginState && loginState.getIn(['errorMessage', '_error'])) ||
      (labels && getLabelValue(labels, 'lbl_login_error'))
    );
  }
);

export const shouldShowRecaptcha = createSelector(
  getLoginState,
  loginState =>
    loginState &&
    parseInt(loginState.get('retriesCount') || 0, 10) > constants.FAILED_ATTEMPT_ALLOWED
);
