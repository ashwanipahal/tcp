import EMAIL_SIGNUP_CONSTANTS from './SmsSignupModal.constants';

const EmailSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_STATUS:
      return { ...state, ...action.payload };
    case EMAIL_SIGNUP_CONSTANTS.CLEAR_SUBSCRIPTION_FORM:
      return {};
    default:
      return state;
  }
};

export default EmailSignupReducer;
