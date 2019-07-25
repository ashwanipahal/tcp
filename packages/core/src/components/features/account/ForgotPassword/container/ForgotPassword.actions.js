/**
 * These are temporary changes for a dummy login page
 */

import FORGOTPASSWORD_CONSTANTS from '../ForgotPassword.constants';

const resetPassword = payload => {
  return {
    type: FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD,
    payload,
  };
};

export default resetPassword;
