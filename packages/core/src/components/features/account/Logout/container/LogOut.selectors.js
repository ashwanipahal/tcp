import { LOGOUT_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { createSelector } from 'reselect';
import LOGOUT_CONSTANTS from '../LogOut.constants';

const getLogoutState = state => {
  return state[LOGOUT_REDUCER_KEY];
};

export const logoutState = createSelector(
  getLogoutState,
  loginState => logoutState && logoutState.get('logoutState')
);
