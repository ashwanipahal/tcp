import EMAIL_SIGNUP_CONSTANTS from './SignupModal.constants';

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

export const submitSmsSignup = payload => {
  console.log('submitSmsSignup', payload);
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_SUBMIT,
  };
};

export const smsSignupStatus = payload => {
  console.log('payload in smsSignupStatus', payload);
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_STATUS,
  };
};

export default {
  validateEmail,
  setEmailValidationStatus,
  submitEmailSignup,
  emailSignupStatus,
  clearForm,
  submitSmsSignup,
  smsSignupStatus,
};
