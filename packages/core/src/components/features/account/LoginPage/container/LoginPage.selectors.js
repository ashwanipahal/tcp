import { LOGINPAGE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { createSelector } from 'reselect';

const getLoginState = state => {
  return state[LOGINPAGE_REDUCER_KEY];
}

export const getUserLoggedInState = createSelector(getLoginState, loginState => loginState && loginState.get('isLoggedin'));

export const getLoginError = createSelector(getLoginState, loginState => loginState && loginState.get('error'));
