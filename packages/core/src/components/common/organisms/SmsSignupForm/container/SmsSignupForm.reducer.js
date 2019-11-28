import SMS_SIGNUP_CONSTANTS from './SmsSignupForm.constants';

const SmsSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case SMS_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_STATUS:
      return { ...state, ...action.payload };
    case SMS_SIGNUP_CONSTANTS.CLEAR_SUBSCRIPTION_FORM:
      return { ...state, subscription: {} };
    default:
      return state;
  }
};

export default SmsSignupReducer;
