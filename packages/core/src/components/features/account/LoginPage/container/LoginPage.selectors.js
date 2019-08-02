import { LOGINPAGE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { createSelector } from 'reselect';
import constants from '../LoginPage.constants';

const getLoginState = state => {
  return state[LOGINPAGE_REDUCER_KEY];
};

export const getUserLoggedInState = createSelector(
  getLoginState,
  loginState => loginState && loginState.get('isLoggedin')
);

export const getLoginError = createSelector(
  getLoginState,
  loginState => loginState && loginState.get('success') === false
);

export const getLoginErrorMessage = createSelector(
  getLoginState,
  loginState => loginState && loginState.get('errorMessage')
);

export const shouldShowRecaptcha = createSelector(
  getLoginState,
  loginState =>
    loginState &&
    parseInt(loginState.get('retriesCount') || 0, 10) > constants.FAILED_ATTEMPT_ALLOWED
);

export const getLabels = state => state.Labels.account;
