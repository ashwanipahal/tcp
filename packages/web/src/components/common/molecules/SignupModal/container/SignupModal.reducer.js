import EMAIL_SIGNUP_CONSTANTS from './SignupModal.constants';

const EmailSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_SIGNUP_CONSTANTS.VALIDATE_EMAIL:
      return { ...state, ...action.payload };
    case EMAIL_SIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_SUBMIT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default EmailSignupReducer;
