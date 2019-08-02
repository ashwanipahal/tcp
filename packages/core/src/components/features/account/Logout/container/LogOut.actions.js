import LOGOUT_CONSTANTS from '../LogOut.constants';

export const logout = payload => {
  return {
    type: LOGOUT_CONSTANTS.LOGOUT_APP,
    payload,
  };
};

export default LOGOUT_CONSTANTS;
