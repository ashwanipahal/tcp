import { LOGINPAGE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { createSelector } from 'reselect';
import constants from '../LoginPage.constants';

export const getLoginState = state => {
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

export const getUserName = createSelector(
  getLoginState,
  loginState => loginState && loginState.get('firstName')
);

export const getLabels = state => state.Labels.global;

export const getPointsToNextRewardState = createSelector(
  getLoginState,
  loginState => loginState && loginState.get('pointsToNextReward')
);

export const getCurrentPointsState = createSelector(
  getLoginState,
  loginState => loginState && loginState.get('currentPoints')
);

export const getTotalRewardsState = createSelector(
  getLoginState,
  loginState => loginState && loginState.get('totalRewards')
);

export const isPlccUser = createSelector(
  getLoginState,
  loginState => loginState && loginState.get('x_hasPLCC') === 'true'
);
