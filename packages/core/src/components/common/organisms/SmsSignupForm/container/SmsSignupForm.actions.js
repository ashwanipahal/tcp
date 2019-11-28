import SMS_SIGNUP_CONSTANTS from './SmsSignupForm.constants';

export const clearSmsSignupForm = payload => {
  return {
    payload,
    type: SMS_SIGNUP_CONSTANTS.CLEAR_SUBSCRIPTION_FORM,
  };
};

export const submitSmsSignup = payload => {
  return {
    payload,
    type: SMS_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_SUBMIT,
  };
};

export const smsSignupStatus = payload => {
  return {
    payload,
    type: SMS_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_STATUS,
  };
};

export default {
  clearSmsSignupForm,
  submitSmsSignup,
  smsSignupStatus,
};
