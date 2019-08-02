/**
 * These are temporary changes for a dummy login page
 */

import LOGOUT_CONSTANTS from '../LogOut.constants';

export const logout = payload => {
  return {
    type: LOGOUT_CONSTANTS.LOGOUT_APP,
    payload,
  };
};
