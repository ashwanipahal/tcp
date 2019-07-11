import EMAIL_SIGNUP_CONSTANTS from './EmailSignupModal.constants';

export const validateEmail = payload => {
  console.log('in the validate email action');
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
  console.log('submitEmailSignup', payload);
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

export const clearForm = payload => {
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
  clearForm,
};
