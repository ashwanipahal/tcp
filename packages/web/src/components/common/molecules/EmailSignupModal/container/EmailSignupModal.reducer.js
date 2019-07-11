import EMAIL_SIGNUP_CONSTANTS from './EmailSignupModal.constants';

const EmailSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_SIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_STATUS:
      return { ...state, ...action.payload };
    case EMAIL_SIGNUP_CONSTANTS.EMAIL_VALIDATION_STATUS:
      return { ...state, ...action.payload };
    case EMAIL_SIGNUP_CONSTANTS.CLEAR_SUBSCRIPTION_FORM:
      console.log('comes here to clear the form');
      return {};
    default:
      return state;
  }
};

export default EmailSignupReducer;
