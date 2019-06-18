/**
 * These are temporary changes for a dummy login page
 */

import { LOGINPAGE_CONSTANTS } from '../LoginPage.constants';

const initialState = {
  loginInfo: {},
};

export const LoginPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINPAGE_CONSTANTS.SET_LOGIN_INFO:
      return Object.assign({}, state, {
        loginInfo: action.payload,
      });
    default:
      return state;
  }
};
