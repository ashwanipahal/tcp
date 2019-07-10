import EMAIL_SIGNUP_CONSTANTS from './SignupModal.constants';

export const validateEmail = payload => {
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.VALIDATE_EMAIL,
  };
};

export const addSignup = payload => {
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.EMAIL_VALIDATION_STATUS,
  };
};

export const submitEmailSignup = payload => {
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_SUBMIT,
  };
};

export const emailSignupStatus = payload => {
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_STATUS,
  };
};
export default {
  validateEmail,
  addSignup,
};
