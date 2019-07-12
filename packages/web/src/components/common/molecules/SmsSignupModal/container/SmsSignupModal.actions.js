import EMAIL_SIGNUP_CONSTANTS from './SmsSignupModal.constants';

export const clearForm = payload => {
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.CLEAR_SUBSCRIPTION_FORM,
  };
};

export const submitSmsSignup = payload => {
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_SUBMIT,
  };
};

export const smsSignupStatus = payload => {
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_STATUS,
  };
};

export default {
  clearForm,
  submitSmsSignup,
  smsSignupStatus,
};
