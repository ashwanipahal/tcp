import LOGOUT_CONSTANTS from '../LogOut.constants';

export const logout = payload => {
  return {
    type: LOGOUT_CONSTANTS.LOGOUT_APP,
    payload,
  };
};

export const resetWalletAppState = () => {
  return {
    type: LOGOUT_CONSTANTS.USER_LOGOUT,
  };
};

export default LOGOUT_CONSTANTS;
