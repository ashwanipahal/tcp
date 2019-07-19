import EMAIL_SIGNUP_CONSTANTS from './EmailSignupModal.constants';

export const validateEmail = payload => {
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.VALIDATE_EMAIL,
  };
};

export const setEmailValidationStatus = payload => {
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

export const togglerEmailSignupModal = payload => {
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_MODAL_TOGGLE,
  };
};

export const clearEmailSignupForm = payload => {
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.CLEAR_SUBSCRIPTION_FORM,
  };
};

export default {
  validateEmail,
  setEmailValidationStatus,
  submitEmailSignup,
  emailSignupStatus,
  clearEmailSignupForm,
};
